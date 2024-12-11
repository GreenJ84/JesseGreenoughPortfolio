/** @format */

import React, { useEffect, useState, createContext } from "react";
import useLocalStorage from "use-local-storage";

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
export const AppContext = createContext<AppContextProps>({
  windowWidth: WindowWidth.LARGE,
  theme: "dark",
  setTheme: () => {},
  mobile: false,
});

export const AppContextProvider = ({ children }: { children: JSX.Element[]}) => {
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
  const switchThemeMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    // Check if viewing on mobile or desktop
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
    ) {
      setMobile(true);
    }

    // Responsive resizing handler
    const handleWindowResize = () => {
      setWindowWidth(
        window.innerWidth < 600
          ? WindowWidth.SMALL
          : window.innerWidth < 1000
          ? WindowWidth.MEDIUM
          : WindowWidth.LARGE
      );
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{ windowWidth, theme, setTheme: switchThemeMode, mobile }}
    >
      {children}
    </AppContext.Provider>
  );
};
