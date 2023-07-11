/** @format */

import React from "react";
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
interface AppContextProps {
  windowWidth: WindowWidth;
  theme: string;
  setTheme: Function;
  mobile: boolean;
}

export const AppContext = React.createContext<AppContextProps>({
  windowWidth: WindowWidth.LARGE,
  theme: "dark",
  setTheme: () => {},
  mobile: false,
});

export const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [windowWidth, setWindowWidth] = React.useState(WindowWidth.LARGE);
  const [mobile, setMobile] = React.useState(false);

  // Grab User theme preference on initial app load
  React.useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");
  }, [setTheme]);

  // Theme change handling
  React.useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  const switchMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  React.useEffect(() => {
    // Check if viewing on mobile or desktop
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
    ) {
      setMobile(true);
    }

    // Responsive resizing handler
    const handleResize = () => {
      setWindowWidth(
        window.innerWidth < 600
          ? WindowWidth.SMALL
          : window.innerWidth < 1000
          ? WindowWidth.MEDIUM
          : WindowWidth.LARGE
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{ windowWidth, theme, setTheme: switchMode, mobile }}
    >
      {children}
    </AppContext.Provider>
  );
};
