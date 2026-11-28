import { requireOwnerPage } from '@/app/_security/ownerPage';
import { ownerPasskeys } from '@/app/_security/passkeys';
import Navigation from '../_components/Navigation';
import PasskeyButton from '../login/PasskeyButton';
import css from './Settings.module.css';
export default async function SettingsPage() {
  await requireOwnerPage();
  const count = (await ownerPasskeys()).length;
  return <><Navigation /><main className={css.settings}>
    <h1>Owner security</h1>
    <p>{count} passkey{count === 1 ? '' : 's'} enrolled. Password login is disabled after the first passkey is enrolled.</p>
    <p>Keep a second passkey on a separate device as your recovery method. Only an active owner session can add one.</p>
    <PasskeyButton mode="register" />
  </main></>;
}
