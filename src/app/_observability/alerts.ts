import 'server-only';
import { DB } from '../_utils/Database';
import { emailAddress } from '../_security/validation';
interface Alert { _id: string; kind: 'login-failures' | 'passkey-failures' | 'contact-delivery'; count: number; firstAt: Date; lastAt: Date }
const alerts = DB.collection<Alert>('adminOperationalAlerts');
export async function recordAlert(kind: Alert['kind'], threshold = 5) {
  try {
    const now = new Date();
    const hour = now.toISOString().slice(0, 13);
    const result = await alerts.findOneAndUpdate({ _id: `${hour}:${kind}` }, { $inc: { count: 1 }, $set: { lastAt: now }, $setOnInsert: { firstAt: now, kind } }, { upsert: true, returnDocument: 'after' });
    if (result?.count !== threshold) return;
    const recipient = process.env.ADMIN_ALERT_EMAIL && emailAddress(process.env.ADMIN_ALERT_EMAIL);
    const sender = process.env.USER_EMAIL && emailAddress(process.env.USER_EMAIL);
    const password = process.env.USER_PASS;
    if (!recipient || !sender || !password) return;
    const { default: nodemailer } = await import('nodemailer');
    const transport = nodemailer.createTransport({ service: 'gmail', auth: { user: sender, pass: password }, connectionTimeout: 5000, socketTimeout: 5000 });
    try { await transport.sendMail({ from: sender, to: recipient, subject: `Portfolio admin alert: ${kind}`, text: `${kind} reached ${threshold} events in one hour. Review the owner analytics page.` }); }
    finally { transport.close(); }
  } catch { console.error('Operational alert could not be recorded or sent'); }
}
export async function recentAlerts() {
  return alerts.find({}, { projection: { _id: 0 } }).sort({ lastAt: -1 }).limit(10).toArray();
}
