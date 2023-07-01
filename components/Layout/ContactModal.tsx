/** @format */

import React from "react";
import axios from "axios";

const css = require("./Footer.module.css");

const ContactModal = ({ close }: { close: Function }) => {
  async function handleSubmit(form: any) {
    try {
      const response = await axios.post('/api/sendEmail', {
        name: form.senderName.value,
        sender: form.senderName.value,
        subject: form.subject.value,
        message: form.message.value,
      });
      console.log(response.data); // Email sent successfully
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={css.emailConnect}
    >
        <div onClick={() => close()}></div>
        <form
          className={css.contactForm}
          onSubmit={(e: React.SyntheticEvent) => {
            console.log('Form submitted');
            e.preventDefault();
            handleSubmit(e.target);
          }}
        >
        <button
          className={css.close}
          onClick={() => close()}
        >
          X
        </button>
        <h1>Contact Me</h1>
        <p>
          Please No solicitations, advertizing, prodect endorsments, sellling,
          or ill minded offers!
        </p>
          <label htmlFor="senderName">Name</label>
          <input
            name="senderName"
            type="text"
            required
          />

          <label htmlFor="senderEmail">Email</label>
          <input
            name="senderEmail"
            type="text"
            required
          />

          <label htmlFor="subject">Subject</label>
          <input
            name="subject"
            type="text"
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            cols={30}
            rows={6}
            required
          ></textarea>

          <button type="submit" >Submit</button>
        </form>
    </div>
  );
};

export default ContactModal;
