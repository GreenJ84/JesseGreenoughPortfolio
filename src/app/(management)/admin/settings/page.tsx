import { currentAdmin } from '@/app/_security/session';
import { ownerPasskeys } from '@/app/_security/passkeys';
import { redirect } from 'next/navigation';
import Navigation from '../_components/Navigation';
import PasskeyButton from '../login/PasskeyButton';
export default async function SettingsPage() {
  if (!await currentAdmin()) redirect('/admin/login');
  const count = (await ownerPasskeys()).length;
  return <><Navigation /><main style={{ maxWidth: 720, margin: '2rem auto', padding: '1rem' }}>
    <h1>Owner security</h1>
    <p>{count} passkey{count === 1 ? '' : 's'} enrolled. Password login is disabled after the first passkey is enrolled.</p>
    <p>Keep a second passkey on a separate device as your recovery method. Only an active owner session can add one.</p>
    <PasskeyButton mode="register" />
  </main></>;
}
