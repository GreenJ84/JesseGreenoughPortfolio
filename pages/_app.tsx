import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

import Preloader from "../components/Layout/Preloader";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";

import "../styles/globals.css";
const css = require("./App.module.css");

export default function App({ Component, pageProps }: AppProps) {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      { load ? <div className={load ? css.noScroll : "Scroll" }>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </div> :
      <Preloader />}
    </>
  );
}
