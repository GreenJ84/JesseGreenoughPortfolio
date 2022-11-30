import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';

import Preloader from '../components/layout/Preloader';
const css = require('./App.module.css')

export default function App({ Component, pageProps }: AppProps) {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
          <Component {...pageProps} />
      </div>
    </>)
}
