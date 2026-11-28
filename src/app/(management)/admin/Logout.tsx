"use client";
import { useRef, useState } from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { logoutAction } from '../../_actions/auth';

export default function LogoutButton({ label, className }: { label?: string; className?: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const submitting = useRef(false);
  async function submit() {
    if (submitting.current) return;
    submitting.current = true;
    setPending(true);
    setError('');
    try {
      const result = await logoutAction();
      if (result) setError(result.message);
    } catch { setError('Logout unavailable. Please try again.'); }
    finally { submitting.current = false; setPending(false); }
  }
  return <form action={submit}>
    <button type="submit" className={className} style={className ? undefined : { all: 'unset', cursor: 'pointer', backgroundColor: 'transparent' }} disabled={pending} title="Logout">
      {label ?? <RiLogoutBoxRLine />}
    </button>
    {error && <p role="alert">{error}</p>}
  </form>;
}
