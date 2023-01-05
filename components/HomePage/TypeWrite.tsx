/** @format */

import React from "react";
import Typewriter from "typewriter-effect";

interface typeProps {
  typePrompts: string[];
}

const TypeWrite = (props: typeProps) => {
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

export default TypeWrite;
