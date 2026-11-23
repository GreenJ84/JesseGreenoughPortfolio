import { recordAlert } from '../../_observability/alerts';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactInput, emailAddress, ValidationError } from '../../_security/validation';
import { boundedJson, BodyTooLargeError, UnsupportedMediaError } from '../../_security/request';
import { clientIdentity, rateLimit, RateLimitError } from '../../_security/rateLimit';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const respond = (message: string, status: number, retryAfter?: number) => NextResponse.json(
    { success: status === 201, message },
    { status, headers: { 'Cache-Control': 'no-store', ...(retryAfter ? { 'Retry-After': String(retryAfter) } : {}) } }
  );
  const origin = req.headers.get('origin');
  if ((origin && origin !== req.nextUrl.origin) || req.headers.get('sec-fetch-site') === 'cross-site') return respond('Request not allowed', 403);
  try {
    // Aggregate cap still applies when no trustworthy client address is available.
    await rateLimit('contact-global', 'contact', 20, 3600);
    const identity = clientIdentity(req.headers);
    if (identity) await rateLimit('contact-client', identity, 3, 900);
    const body = contactInput(await boundedJson(req));
    if (body.website) return respond('Email sent', 201); // Honeypot: no email is generated.
    await rateLimit('contact-sender', body.sender.toLowerCase(), 3, 900);
    let user: string;
    let recipient: string;
    try {
      user = emailAddress(process.env.USER_EMAIL);
      recipient = emailAddress(process.env.CONTACT_EMAIL);
    } catch { throw new Error('Mail configuration unavailable'); }
    const password = process.env.USER_PASS;
    if (!password) throw new Error('Mail configuration unavailable');
    const transporter = nodemailer.createTransport({
      service: 'gmail', auth: { user, pass: password },
      connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    });
    try {
      const result = await transporter.sendMail({
        from: user, to: recipient, replyTo: body.sender,
        subject: body.subject || `Portfolio Contact from ${body.name}`,
        // Plain text avoids interpreting untrusted HTML, links, and markup.
        text: `${body.message}\n\nFrom: ${body.name}\nEmail: ${body.sender}`,
        disableFileAccess: true, disableUrlAccess: true,
      });
      if (!result.accepted?.length || result.rejected?.length) throw new Error('Recipient not accepted');
    } finally { transporter.close(); }
    return respond('Email sent', 201);
  } catch (error) {
    if (error instanceof RateLimitError) return respond(error.message, 429, error.retryAfter);
    if (error instanceof BodyTooLargeError) return respond('Request body too large', 413);
    if (error instanceof UnsupportedMediaError) return respond('Use application/json', 415);
    if (error instanceof ValidationError) return respond('Invalid contact details', 400);
    // Never disclose SMTP credentials, provider errors, or database details.
    await recordAlert('contact-delivery', 1);
    return respond('Email could not be sent. Please try again later.', 503);
  }
}
