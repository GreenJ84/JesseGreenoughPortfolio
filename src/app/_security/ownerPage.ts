import 'server-only';
import { redirect } from 'next/navigation';
import { currentAdmin } from './session';
import { authConfig } from './token';

export async function requireOwnerPage() {
  const session = await currentAdmin();
  if (!session || session.username !== authConfig().username || session.role !== 'admin') redirect('/admin/login');
  return session;
}
