/** @format */

import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import type { AppProps } from "next/app";
import Head from "next/head";

import Preloader from "../components/Layout/Preloader";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";

import { AppContextProvider } from "../Utils/AppContext";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [initialLoad, setInitialLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //==== Initial loading
    const timer = setTimeout(() => {
      setInitialLoad(true);
    }, 1500);

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
        <meta
          name="lang"
          content="en-US"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="robots"
          content="index, follow"
        />
        <meta
          property="og:image"
          content={"/assets/developerPortrait.jpeg"}
        />
        <meta
          name="twitter:image"
          content={"/assets/developerPortrait.jpeg"}
        />
        <meta
          property="og:url"
          content={"/assets/developerPortrait.jpeg"}
        />
        <meta
          property="og:type"
          content="website"
        />

        <link
          rel="preload"
          href="/assets/load_icon.svg"
          as="image"
        />
        <link
          rel="icon"
          type="image/png"
          href="/assets/TrippyFrensNFT_logo.png"
        ></link>
      </Head>
      <AppContextProvider>
        {!loading && initialLoad ? (
          <>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </>
        ) : (
          <Preloader />
        )}
      </AppContextProvider>
    </>
  );
}
