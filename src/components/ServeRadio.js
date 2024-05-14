import React from "react";

export default function ServeRadio({ serve, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className={`${
        serve ? "bg-yellow-300" : "bg-slate-500"
      } serve rounded-full flex-shrink-0 `}></button>
  );
}
