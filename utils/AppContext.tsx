/** @format */

import React, { createContext, useState, useEffect } from "react";
import { MongoClient } from "mongodb";
import useLocalStorage from "use-local-storage";


// Database connection
const DB_CLIENT = new MongoClient(process.env.DB_CONN_STRING!);
export const DB = DB_CLIENT.db(process.env.DB_NAME);

export enum WindowWidth {
  SMALL,
  MEDIUM,
  LARGE,
}
export interface AppContextProps {
  windowWidth: WindowWidth;
  setWindowWidth: React.Dispatch<React.SetStateAction<WindowWidth>>;
  theme: string;
  setTheme: Function;
  mobile: boolean;
}

export const AppContext = createContext<AppContextProps>({
  windowWidth: WindowWidth.LARGE,
  setWindowWidth: () => {},
  theme: "dark",
  setTheme: () => { },
  mobile: false,
});

export const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [windowWidth, setWindowWidth] = useState(WindowWidth.LARGE);
  const [mobile, setMobile] = useState(false);

  // Grab User theme preference on initial app load
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");
  }, [setTheme]);

  // Theme change handling
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  const switchMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
    ) {
      setMobile(true);
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth < 600 ? WindowWidth.SMALL : window.innerWidth < 1000 ? WindowWidth.MEDIUM : WindowWidth.LARGE);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{ windowWidth, setWindowWidth, theme, setTheme: switchMode, mobile }}
    >
      {children}
    </AppContext.Provider>
  );
};
