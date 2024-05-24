import React from "react";

export default function Input({ valriant = "regular", ...rest }) {
  return (
    <input
      className="bg-white/10 rounded-lg px-5 py-2 outline-transparent focus-visible:outline-primary outline outline-[1px] w-full caret-primary text-white lg:text-xl z-0"
      {...rest}
    />
  );
}
