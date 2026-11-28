'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';

export default function PasskeyButton({ mode = 'login' }: { mode?: 'login' | 'register' }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const run = async () => {
    setPending(true);
    setMessage('');
    try {
      const url = '/api/admin/passkeys';
      const optionsResponse = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: `${mode}-options` }) });
      if (!optionsResponse.ok) throw new Error('Passkey unavailable. Sign in with your owner password to enroll your first passkey.');
      const options = await optionsResponse.json();
      const response = mode === 'login' ? await startAuthentication({ optionsJSON: options }) : await startRegistration({ optionsJSON: options });
      const verification = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: `${mode}-verify`, response }) });
      if (!verification.ok) throw new Error('Passkey verification failed. Please try again.');
      if (mode === 'login') { router.replace('/admin/dashboard'); router.refresh(); }
      else setMessage('Passkey enrolled. Use it for your next sign-in.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Passkey unavailable. Please try again.'); }
    finally { setPending(false); }
  };
  return <div>
    <button type="button" disabled={pending} onClick={() => { void run(); }}>{pending ? 'Waiting for passkey…' : mode === 'login' ? 'Sign in with passkey' : 'Add a passkey'}</button>
    {message && <p role="status">{message}</p>}
  </div>;
}
