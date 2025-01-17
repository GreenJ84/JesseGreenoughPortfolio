"use client";

import React from "react";

const css = require("./Shared.module.css");

interface DataFilterProps {
  titles: [string, string?];
  options: [string[], string[]?];
  firstHandler: Function;
  secondHandler?: Function;
}
const DataFilter = ({
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

export default DataFilter;