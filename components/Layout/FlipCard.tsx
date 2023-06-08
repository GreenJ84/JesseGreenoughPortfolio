/** @format */
import React from "react";
import Tilt from "react-parallax-tilt";

const css = require("./FlipCard.module.css");

const FlipCard = ({
  frontDisplay,
  backDisplay,
}: {
  frontDisplay: JSX.Element;
  backDisplay: JSX.Element;
}) => {
  return (
    <article className={css.flip_card}>
      <div className={css.flip_card_inner}>
        <section className={css.flip_card_front}>{frontDisplay}</section>
        <Tilt
          className={css.flip_card_back}
          tiltReverse={true}
          tiltMaxAngleX={20}
          tiltMaxAngleY={30}
          perspective={700}
          glareEnable={true}
          glareBorderRadius="20px"
        >
          <section id="flip_card_back">
            <Tilt tiltEnable={false} perspective={0}>{backDisplay}</Tilt></section>
        </Tilt>
      </div>
    </article>
  );
};

export default FlipCard;
