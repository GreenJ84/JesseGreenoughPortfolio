/** @format */
import React from "react";

const css = require("../../components/ExperiencePage/Experience.module.css");


const FlipCard = ({frontDisplay, backDisplay}: {frontDisplay: JSX.Element, backDisplay: JSX.Element}) => {
  return (
    <article className={css.flip_card}>
      <div className={css.flip_card_inner}>
        <section className={css.flip_card_front}>
          {frontDisplay}
        </section>
        <section className={css.flip_card_back}>
          {backDisplay}
        </section>
      </div>
    </article>
  );
};

export default FlipCard;
