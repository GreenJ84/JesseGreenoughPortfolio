/** @format */

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import type { AppProps } from "next/app";

import Preloader from "../components/Layout/Preloader";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";

import "../styles/globals.css";
import { AppContextProvider } from "../Utils/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  const [initialLoad, setInitialLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //==== Initial loading theme setter && load animation
    const timer = setTimeout(() => {
      setInitialLoad(true);
    }, 1000);

    //==== Inter-Route loading handler set-up
    let body = document.getElementsByTagName("body")[0];
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
      clearTimeout(timer);
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  // Window Scroll handler for page transitions
  const { pathname } = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Head>
        <meta
          name="author"
          content="Jesse Grenough"
        />
        <link
          rel="preload"
          href="/assets/pre.svg"
          as="image"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link
          rel="icon"
          type="image/png"
          href="/assets/logo.png"
        ></link>
      </Head>
      <AppContextProvider>
        {!loading && initialLoad ? (
          <div className={"Scroll"}>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </div>
        ) : (
          <Preloader />
        )}
      </AppContextProvider>
    </>
  );
}
