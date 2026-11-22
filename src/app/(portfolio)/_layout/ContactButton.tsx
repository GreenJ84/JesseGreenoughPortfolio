"use client";
import { useContext } from 'react';
import { AppContext } from '../../_utils/AppContext';
const css = require('./Layout.module.css');

const ContactButton = () => {
  const { toggleContactModal } = useContext(AppContext);


  return (
    <button
      className={`contactButton ${css.contactButton}`}
      onClick={() => {
        toggleContactModal()
      }}
    >
      Contact
    </button>
  );
};

export default ContactButton;
