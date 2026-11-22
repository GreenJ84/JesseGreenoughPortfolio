/** @format */

'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';

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
      await axios.post('/api/sendEmail', {
        name: data.get('senderName'), sender: data.get('senderEmail'),
        subject: data.get('subject'), message: data.get('message'), website: data.get('website'),
      });
      setStatus('Your message was sent. Thank you!');
      form.reset();
    } catch (error) {
      setStatus(axios.isAxiosError(error) && error.response?.status === 429
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
          X
        </button>
        <h1 id="contactTitle">Contact Me</h1>
        <p>
          Please No solicitations, advertizing, product endorsements, selling,
          or ill minded offers!
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
        <button type='submit' disabled={pending}>{pending ? 'Sending…' : 'Submit'}</button>
      </form>
    </div>
  );
};
export default ContactModal;
