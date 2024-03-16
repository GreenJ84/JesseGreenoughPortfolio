/** @format */

'use client';
import React, { useEffect, createContext } from "react";
import useLocalStorage from "use-local-storage";

interface AppContextProps {
  theme: string;
  setTheme: Function;
  toggleContactModal: Function;
}
export const AppContext = createContext<AppContextProps>({
  theme: "dark",
  setTheme: () => {  },
  toggleContactModal: () => {  },
});

export const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  // Grab User theme preference on initial app load
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");
  }, [setTheme]);

  // Theme change handling
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const switchThemeMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleContactModal = (style: any) => {
    document.getElementById("contactMe")!.classList.toggle(style);
  }

  return (
    <AppContext.Provider
      value={{ theme, setTheme: switchThemeMode, toggleContactModal }}
    >
      {children}
    </AppContext.Provider>
  );
};
