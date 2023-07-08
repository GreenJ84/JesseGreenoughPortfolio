/** @format */
import React from "react";
import { Properties } from "csstype";
import Tilt from "react-parallax-tilt";

const css = require("./Layout.module.css");

const FlipCard = ({
  style,
  frontDisplay,
  backDisplay,
}: {
  style: Properties<string | number, string>;
  frontDisplay: JSX.Element;
  backDisplay: JSX.Element;
}) => {
  return (
    <article
      style={style}
      className={css.flip_card + " flipCard"}
    >
      <div className={css.flip_card_inner}>
        <section className={css.flip_card_front}>{frontDisplay}</section>
        <Tilt
          className={css.flip_card_back}
          tiltReverse={true}
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          perspective={700}
        >
          <section id="flip_card_back">{backDisplay}</section>
        </Tilt>
      </div>
    </article>
  );
};

export default FlipCard;
