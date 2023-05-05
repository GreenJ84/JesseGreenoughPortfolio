/** @format */

import React from "react";
import Image from "next/image";

const loaderLogo = "/assets/pre.svg";
const css = require("./Preloader.module.css");

const Preloader = () => {
  return (
    <Image
      src={loaderLogo}
      alt="Loading Icon"
      width={100}
      height={100}
      className={css.preloader}
    />
  );
};

export default Preloader;
