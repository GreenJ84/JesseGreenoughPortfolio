/** @format */

import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";

const logo1 = "/assets/logo.png";
const logo2 = "/assets/CyberHedera1.png";

const css = require("./NavBar.module.css");

const NavBarBrand = (props: { mode: Function; theme: String }) => {
  return (
    <Navbar.Brand id="navbarBrand" className={css.navBarBrand}>
      {props.theme === "dark" ? <p id="mode">🌞</p> : <p id="mode">🌙</p>}
      <Image
        src={props.theme === "dark" ? logo1 : logo2}
        className={css.themeLogo}
        alt="Theme changing Navigation logo"
        width={250}
        height={250}
        onMouseEnter={() => {
          document.getElementById("themeLogo")!.style.filter =
            "grayscale(100%) contrast(200%) opacity(0.1)";
          document.getElementById("mode")!.style.display = "block";
        }}
        onMouseLeave={() => {
          document.getElementById("mode")!.style.display = "none";
          document.getElementById("themeLogo")!.style.filter = "";
        }}
        onClick={(e: React.MouseEvent<HTMLImageElement>) => {
          e.preventDefault();
          props.mode();
        }}
      />
    </Navbar.Brand>
  );
};

export default NavBarBrand;
