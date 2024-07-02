import { XMarkIcon } from "@heroicons/react/16/solid";
import { countries } from "country-flags-svg";
import React, { useState } from "react";
import CountryFlagDisplay from "./CountryFlagDisplay";
export default function CountryFlagPicker({ currentCountry, handlePick }) {
  const [show, setShow] = useState(false);
  const [searchStr, setSearchStr] = useState("");

  return (
    <div className=" flex-shrink-0 relative">
      <button
        onClick={() => {
          setShow(!show);
        }}>
        <CountryFlagDisplay currentCountry={currentCountry} />
      </button>
      {show ? (
        <div
          className={`absolute top-full left-0 translate-y-2 w-max h-auto max-h-[300px] overflow-y-auto  bg-slate-800 text-white rounded-lg z-10 flex-col ${
            show ? "flex" : "hidden"
          }`}>
          <div className="relative w-full">
            <input
              className="bg-slate-900 text-white font-mono py-3 w-full border-b border-b-white outline-none px-4"
              type="text"
              placeholder="Type Country name"
              value={searchStr}
              onChange={(e) => {
                setSearchStr(e.target.value);
              }}
            />
            {searchStr?.length > 0 ? (
              <XMarkIcon className="text-white w-4 x-4 absolute top-1/2 right-4 -translate-y-1/2 z-10" />
            ) : (
              <></>
            )}
          </div>
          {countries
            .filter((c) => c.name.toLocaleLowerCase().includes(searchStr))
            .map((country) => (
              <button
                onClick={() => {
                  handlePick(country.iso2);
                  setSearchStr("");
                  setShow(false);
                }}
                key={country.iso2}
                className="p-4 py-2 hover:bg-white/10 flex items-center gap-2 font-mono">
                <img className="w-10 h-auto object-contain" src={country.flag} alt={country.iso2} />
                <p>{country.name}</p>
              </button>
            ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
