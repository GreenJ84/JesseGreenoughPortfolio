'use client'
import { useTransition } from 'react';
import { RiLogoutBoxRLine, RiLogoutBoxRFill } from "react-icons/ri";

import { logoutAction } from '../../_actions/auth';

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit() {
    startTransition(async () => {
      await logoutAction();
    })
  }

  return (
    <form action={handleSubmit}>
      <button type="submit" style={{all: 'unset', cursor: 'pointer', backgroundColor: 'transparent'}} disabled={isPending} title="Logout">
        {isPending ? <RiLogoutBoxRFill /> : <RiLogoutBoxRLine />} 
      </button>
    </form>
  )
}
export default LogoutButton;