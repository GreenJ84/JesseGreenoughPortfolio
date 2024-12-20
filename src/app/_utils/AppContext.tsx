/** @format */
"use client";

import React, { useEffect, useState, createContext } from "react";
import useLocalStorage from "use-local-storage";
import ContactModal from "../_layout/ContactModal";

interface AppContextProps {
  theme: string;
  setTheme: Function;
  toggleContactModal: Function;
}

export const AppContext = createContext<AppContextProps>({
  theme: "dark",
  setTheme: () => { },
  toggleContactModal: () => {},
});

export const AppContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [contactModal, setContactModal] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  const switchThemeMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleContactModal = () => {
    console.log("Toggle Contact");
    setContactModal(!contactModal);
  }

  return (
    <AppContext.Provider
      value={{ theme, setTheme: switchThemeMode, toggleContactModal }}
    >
      {contactModal && <ContactModal />}
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
