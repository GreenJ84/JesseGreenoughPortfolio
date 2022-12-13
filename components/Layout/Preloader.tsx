import React from "react";
import Image from "next/image";

import loaderLogo from '../../public/assets/pre.svg'
const css = require('./Preloader.module.css')


const Preloader = () => {
    return (
        <Image 
        src={loaderLogo}
        alt='Loading Icon'
        width={100}
        height={100}
        className={css.preloader}/>
    )}

export default Preloader;