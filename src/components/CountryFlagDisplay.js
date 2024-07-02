import { findFlagUrlByIso2Code } from "country-flags-svg";
import React from "react";

export default function CountryFlagDisplay({ currentCountry }) {
  return (
    <div
      className={`flag  flex-shrink-0 items-stretch cursor-pointer ${
        currentCountry ? "" : "bg-slate-500"
      }`}>
      {currentCountry ? (
        <img
          className="w-full h-[3vw] object-contain"
          src={findFlagUrlByIso2Code(currentCountry)}
          alt={currentCountry}
        />
      ) : (
        <div className="h-[3vw] w-full"></div>
      )}
    </div>
  );
}
