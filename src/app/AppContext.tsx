/** @format */
"use client";

import React, { useEffect, useState, createContext } from "react";
import useLocalStorage from "use-local-storage";
import ContactModal from "./_layout/ContactModal";

interface AppContextProps {
  theme: string;
  setTheme: Function;
  toggleContactModal: Function;
  mobile: boolean;
}

export const AppContext = createContext<AppContextProps>({
  theme: "dark",
  setTheme: () => { },
  toggleContactModal: () => {},
  mobile: false,
});

export const AppContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [contactModal, setContactModal] = useState(false);
  const [mobile, setMobile] = useState(false);

  // Initial context load data retrieval
  useEffect(() => {
    // Grab System theme preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    // Check if user is on mobile
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || window.innerWidth < 700
    ) {
      setMobile(true);
    }
  }, [setTheme, setMobile]);

  // Theme change handling
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  const switchThemeMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleContactModal = () => {
    setContactModal(!contactModal);
  }

  return (
    <AppContext.Provider
      value={{ theme, setTheme: switchThemeMode, mobile, toggleContactModal }}
    >
      {contactModal && <ContactModal toggleContactModal={toggleContactModal} />}
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
