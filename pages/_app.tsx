/** @format */

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

import Preloader from "../components/Layout/Preloader";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";

import "../styles/globals.css";
import { Router } from "next/router";
const css = require("./App.module.css");

export default function App({ Component, pageProps }: AppProps) {
  const [load, setLoad] = useState(true);
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

    setTheme(matchMedia.matches ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    // Initial App loading display
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }
  }, [theme]);

  const switchMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    let body = document.getElementsByTagName('body')[0]
    const start = () => {
      console.log("start");
      setLoad(true);
      body.style.cursor = "wait";
    };
    const end = () => {
      console.log("finished");
      setLoad(false);
      body.style.cursor = "default";
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      {!load ? (
        <div className={load ? css.noScroll : "Scroll"}>
          <NavBar
            theme={theme}
            mode={() => switchMode()}
          />
          <Component {...pageProps} />
          <Footer />
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
}
