/** @format */
"use client";

import React, { useEffect, useState, createContext, useCallback } from "react";
import ContactModal from "../_layout/ContactModal";

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    return initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};


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
  // Theme update handler
  const switchThemeMode = useCallback(() => {
    setTheme((prevTheme: string) => prevTheme === "dark" ? "light" : "dark");
  }, [setTheme]);
  // Initialize theme based on user preference
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");
  }, [setTheme]);
  // Theme update effect
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const [contactModal, setContactModal] = useState<boolean>(false);
  const toggleContactModal = useCallback(() => {
    setContactModal(prevState => !prevState);
  }, [setContactModal]);

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
