import React from "react";
const css = require('./Preloader.module.css')

interface PreloaderProps{
    load: boolean
}

const Preloader = (props: PreloaderProps) => {
    return (
        <div id={props.load ? css.preloader : css.preloaderNone}></div>
    )}

export default Preloader;