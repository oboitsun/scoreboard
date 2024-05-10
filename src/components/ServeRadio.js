import React from "react";

export default function ServeRadio({ serve, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className={`${serve ? "bg-yellow-300" : "bg-slate-500"} w-10 h-10 rounded-full`}></button>
  );
}
