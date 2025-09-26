/** @format */

'use client';
import React, { useContext } from 'react';
import axios from 'axios';

import { AppContext } from '../../_utils/AppContext';
const css = require('./Layout.module.css');

const ContactModal = () => {
  const { toggleContactModal } = useContext(AppContext);

  async function handleSubmit(form: any) {
    try {
      const response = await axios.post('/api/sendEmail', {
        name: form.senderName.value,
        sender: form.senderEmail.value,
        subject: form.subject.value,
        message: form.message.value,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={css.emailConnect}>
      <div onClick={() => toggleContactModal()}></div>
      <form
        className={css.contactForm}
        onSubmit={(e: React.SyntheticEvent) => {
          console.log('Form submitted');
          handleSubmit(e.target);
        }}
      >
        <button
          className={css.close}
          onClick={() => toggleContactModal()}
        >
          X
        </button>
        <h1>Contact Me</h1>
        <p>
          Please No solicitations, advertizing, product endorsements, selling,
          or ill minded offers!
        </p>
        <label htmlFor='senderName'>Name</label>
        <input
          name='senderName'
          type='text'
          required
        />

        <label htmlFor='senderEmail'>Email</label>
        <input
          name='senderEmail'
          type='text'
          required
        />

        <label htmlFor='subject'>Subject</label>
        <input
          name='subject'
          type='text'
          required
        />

        <label htmlFor='message'>Message</label>
        <textarea
          name='message'
          cols={30}
          rows={6}
          required
        ></textarea>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
export default ContactModal;

export const ContactButton = () => {
  const { toggleContactModal } = useContext(AppContext);


  return (
    <button
      className={`contactButton ${css.contactButton}`}
      onClick={() => {
        console.log("click");
        toggleContactModal()
      }}
    >
      Contact
    </button>
  );
};
