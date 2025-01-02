/** @format */
"use client";

import React from "react";
import Image from "next/image";

import { Properties } from "csstype";
import Tilt from "react-parallax-tilt";
import Typewriter from "typewriter-effect";
import { BsPlusCircleFill } from "react-icons/bs";

const css = require("./Layout.module.css");

// Universal Developer protrait component
const developerPortrait = "https://res.cloudinary.com/portfolio-g84/image/upload/v1690310921/personal/personal_portrait.jpg";
export const DeveloperPortrait = () => {
  return (
    <Tilt
      className={css.portraitTilt}
      perspective={700}
      glareEnable={true}
      glareMaxOpacity={0.85}
      glareBorderRadius="50%"
      scale={1.1}
    >
      <Image
        src={developerPortrait}
        alt="Developer Portrait"
        className={css.developerPortrait}
        width={400}
        height={400}
        priority
      />
    </Tilt>
  );
};

// Universal flippable data card
export const FlipCard = ({
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

// Universal filter component for selecting and filtering data items
interface DataFilterProps {
  titles: [string, string?];
  options: [string[], string[]?];
  firstHandler: Function;
  secondHandler?: Function;
}
export const DataFilter = ({
  titles,
  options,
  firstHandler,
  secondHandler,
}: DataFilterProps) => {
  const [firstOptions, secondOptions] = options;
  const [firstTitle, secondTitle] = titles;

  const changeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: string
  ) => {
    e.preventDefault();
    if (type === "first") {
      firstHandler(e.currentTarget.value);
    } else if (type === "second" && secondHandler) {
      secondHandler(e.currentTarget.value);
    }
  };

  return (
    <nav
      id="dataFilter"
      className={css.itemFilter}
    >
      <div>
        <h2>
          Filter by <span className="detail"> {firstTitle} </span>
        </h2>
        <select
          id="firstSelector"
          name="firstSelector"
          defaultValue="top"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            changeHandler(e, "first")
          }
        >
          <option disabled>...</option>
          {secondTitle! && secondOptions! && secondHandler && (
            <option value="top">Top 10</option>
          )}
          <option value="all">All</option>
          {[...firstOptions].map((option, idx) => (
            <option
              key={idx}
              value={option}
            >
              {option.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {secondTitle && secondOptions && secondHandler && (
        <div>
          <h2>
            Filter by <span className="detail">{secondTitle}</span>
          </h2>
          <select
            id="secondSelector"
            name="secondSelector"
            defaultValue="top"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              changeHandler(e, "second")
            }
          >
            <option disabled>...</option>
            <option value="top">Top 10</option>
            <option value="all">All</option>
            {[...secondOptions].map((option, idx) => (
              <option
                key={idx}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
};

// Universal button component for Adding data to item displays
export const AddItemButton = ({
  itemType,
  clickHandler,
}: {
  itemType: string;
  clickHandler: React.MouseEventHandler;
}) => {
  return (
    <li
      id="AddItem"
      aria-label={`Load More ${itemType} Items`}
    >
      <button
        aria-labelledby="AddItem"
        onClick={clickHandler}
        className={css.add_item_button}
      >
        <span>Load More {itemType}</span>
        <BsPlusCircleFill className={css.addIcon} />
      </button>
    </li>
  );
};

// Typewriter animation
interface typeProps {
  typePrompts: string[];
}

export const TypeWrite = (props: typeProps) => {
  return (
    <Typewriter
      options={{
        strings: props.typePrompts,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
};

