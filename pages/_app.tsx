/** @format */

import Head from "next/head";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Preloader } from "../components/Layout/LayoutExtras";
import NavBar from "../components/Layout/NavBar";
const Footer = dynamic(() => import("../components/Layout/Footer"));

import { AppContextProvider } from "../utils/AppContext";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [initialLoad, setInitialLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

    setInitialLoad(true);
    return () => {
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
        />
        <meta
          name="robots"
          content="index, follow"
        />
        <meta
          property="og:image"
          content={"https://res.cloudinary.com/portfolio-g84/image/upload/v1690310921/personal/personal_portrait.jpg"}
        />
        <meta
          name="twitter:image"
          content={"https://res.cloudinary.com/portfolio-g84/image/upload/v1690310921/personal/personal_portrait.jpg"}
        />
        <meta
          property="og:url"
          content={"https://jesse-greenough-portfolio.vercel.app/"}
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
          type="image/jpg"
          href="https://res.cloudinary.com/portfolio-g84/image/upload/v1690310979/personal/TrippyFrens1.jpg"
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
