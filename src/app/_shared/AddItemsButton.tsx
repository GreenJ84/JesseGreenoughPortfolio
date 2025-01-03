"use client";

import React from "react";

import { BsPlusCircleFill } from "react-icons/bs";

const css = require("./Layout.module.css");


const AddItemsButton = ({
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

export default AddItemsButton;