import { findFlagUrlByIso2Code } from "country-flags-svg";
import React from "react";

export default function CountryFlagDisplay({ currentCountry }) {
  return (
    <div className={`flag  flex-shrink-0 cursor-pointer ${currentCountry ? "" : "bg-slate-500"}`}>
      {currentCountry ? (
        <img
          className="w-full h-full object-contain"
          src={findFlagUrlByIso2Code(currentCountry)}
          alt={currentCountry}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
