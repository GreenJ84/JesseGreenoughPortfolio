/** @format */

import React from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";

import { Properties } from "csstype";
import Tilt from "react-parallax-tilt";
import { BsPlusCircleFill } from "react-icons/bs";

const css = require("./Layout.module.css");

// Loading recognition component
const loaderLogo = "/assets/load_icon.svg";
export const Preloader = () => {
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

// Universal page Head metadata component
export const MetaHead = ({
  title,
  description,
  keywords,
}: {
  title: string;
  description: string;
  keywords: string;
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        property="og:title"
        content={title}
      />
      <meta
        name="twitter:title"
        content={title}
      />
      <meta
        name="description"
        content={description}
        key="desc"
      />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta
        name="keywords"
        content={keywords}
      ></meta>
    </Head>
  );
};

// Universal Developer protrait component
const developerPortrait = "/assets/developerPortrait.jpeg";
export const DeveloperPortrait = () => {
  return (
    <Tilt className={css.portraitTilt}>
      <Image
        src={developerPortrait}
        alt="Developer Portrait"
        className={css.developerPortrait}
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
  firstHandler: Function;
  secondHandler?: Function;
  titles: [string, string?];
  options: [string[], string[]?];
}
export const DataFilter = ({
  firstHandler,
  secondHandler,
  titles,
  options,
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
          <option value="top">Top 10</option>
          {secondTitle && secondOptions && secondHandler && (
            <option value="all">All</option>
          )}
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
    <button
      onClick={clickHandler}
      className={css.add_item_button}
    >
      <span>Load More {itemType}</span>
      <BsPlusCircleFill className={css.addIcon} />
    </button>
  );
};

// Email contact modal component
export const ContactModal = ({ close }: { close: Function }) => {
  async function handleSubmit(form: any) {
    try {
      const response = await axios.post("/api/sendEmail", {
        name: form.senderName.value,
        sender: form.senderEmail.value,
        subject: form.subject.value,
        message: form.message.value,
      });
      console.log(response.data); // Email sent successfully
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={css.emailConnect}>
      <div onClick={() => close()}></div>
      <form
        className={css.contactForm}
        onSubmit={(e: React.SyntheticEvent) => {
          console.log("Form submitted");
          e.preventDefault();
          handleSubmit(e.target);
        }}
      >
        <button
          className={css.close}
          onClick={() => close()}
        >
          X
        </button>
        <h1>Contact Me</h1>
        <p>
          Please No solicitations, advertizing, prodect endorsments, sellling,
          or ill minded offers!
        </p>
        <label htmlFor="senderName">Name</label>
        <input
          name="senderName"
          type="text"
          required
        />

        <label htmlFor="senderEmail">Email</label>
        <input
          name="senderEmail"
          type="text"
          required
        />

        <label htmlFor="subject">Subject</label>
        <input
          name="subject"
          type="text"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          cols={30}
          rows={6}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
