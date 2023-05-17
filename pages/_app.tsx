/** @format */

import React from "react";
import Head from "next/head";
import { Router } from "next/router";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

import Preloader from "../components/Layout/Preloader";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [initialLoad, setInitialLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  // Initial loading theme setter && load animation
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const timer = setTimeout(() => {
      setInitialLoad(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }
  });

  // Theme change handling
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  const switchMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Route loading handler set-up
  useEffect(() => {
    let body = document.getElementsByTagName('body')[0]
    const start = () => {
      setLoading(true);
      body.style.cursor = "wait";
    };
    const end = () => {
      setLoading(false);
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
  });

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/pre.svg" as="image" />
      </Head>
      {!loading && initialLoad ? (
        <div className={"Scroll"}>
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
