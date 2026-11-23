/** @format */

'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { AppContext } from '../../_utils/AppContext';
const css = require('./Layout.module.css');

const ContactModal = () => {
  const { toggleContactModal } = useContext(AppContext);

  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState('');
  const submitting = useRef(false);
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.current?.querySelector<HTMLElement>('input:not([tabindex="-1"])')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); toggleContactModal(); return; }
      if (event.key !== 'Tab' || !dialog.current) return;
      const focusable = [...dialog.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled])')];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); previous?.focus(); };
  }, [toggleContactModal]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    submitting.current = true;
    setPending(true);
    setStatus('');
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: data.get('senderName'), sender: data.get('senderEmail'), subject: data.get('subject'), message: data.get('message'), website: data.get('website') }),
      });
      if (!response.ok) throw new Error(response.status === 429 ? 'rate-limit' : 'delivery');
      setStatus('Your message was sent. Thank you!');
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error && error.message === 'rate-limit'
        ? 'Too many messages. Please try again later.'
        : 'Your message could not be sent. Please try again later.');
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <div ref={dialog} className={css.emailConnect} role="dialog" aria-modal="true" aria-labelledby="contactTitle">
      <div onClick={() => toggleContactModal()}></div>
      <form
        className={css.contactForm}
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          aria-label="Close contact form"
          className={css.close}
          onClick={() => toggleContactModal()}
        >
          ×
        </button>
        <h2 id="contactTitle">Let’s talk</h2>
        <p>
          Have a role, project, or thoughtful idea in mind? Send a note and I’ll get back to you.
        </p>
        <label htmlFor='senderName'>Name</label>
        <input
          id='senderName'
          maxLength={100}
          name='senderName'
          type='text'
          required
        />

        <label htmlFor='senderEmail'>Email</label>
        <input
          id='senderEmail'
          maxLength={254}
          name='senderEmail'
          type='email'
          required
        />

        <label htmlFor='subject'>Subject</label>
        <input
          id='subject'
          maxLength={200}
          name='subject'
          type='text'
          required
        />

        <label htmlFor='message'>Message</label>
        <textarea
          id='message'
          maxLength={5000}
          name='message'
          cols={30}
          rows={6}
          required
        ></textarea>

        <div hidden aria-hidden="true">
          <label htmlFor="contactWebsite">Leave this field empty</label>
          <input id="contactWebsite" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <p role="status" aria-live="polite">{status}</p>
        <button type='submit' disabled={pending}>{pending ? 'Sending…' : 'Send message'}</button>
      </form>
    </div>
  );
};
export default ContactModal;
