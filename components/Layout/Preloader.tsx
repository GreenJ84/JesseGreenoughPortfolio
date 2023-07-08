/** @format */

import React from "react";
import Image from "next/image";

const loaderLogo = "/assets/pre.svg";
const css = require("./Layout.module.css");

const Preloader = () => {
  return (
    <main className={css.preloader}>
      <Image
        priority
        src={loaderLogo}
        alt="Loading Icon"
        width={100}
        height={100}
        className={css.loaderImage}
      />
    </main>
  );
};

export default Preloader;
