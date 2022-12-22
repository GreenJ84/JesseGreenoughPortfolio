import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import useLocalStorage from 'use-local-storage'


import Preloader from "../components/Layout/Preloader";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";

import "../styles/globals.css";
const css = require("./App.module.css");

export default function App({ Component, pageProps }: AppProps) {
  const [load, setLoad] = useState(false);
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    
    setTheme(matchMedia.matches ? 'light' : 'dark');
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])


  const switchMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      { load ? <div className={load ? css.noScroll : "Scroll" }>
        <NavBar mode={ () => switchMode() }/>
        <Component {...pageProps} />
        <Footer />
      </div> :
      <Preloader />}
    </>
  );
}
