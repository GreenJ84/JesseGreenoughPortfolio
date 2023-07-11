/** @format */

import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";

const css = require("./Layout.module.css");

const AddItemButton = ({itemType, clickHandler}: {itemType: string, clickHandler: React.MouseEventHandler}) => {
  return (
    <button
      onClick={clickHandler}
      className={css.add_item_button}
    >
      <span>Load More { itemType }</span>
      <BsPlusCircleFill
      className={css.addIcon}
      />
    </button>
  );
};

export default AddItemButton;
