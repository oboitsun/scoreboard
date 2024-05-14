import React from "react";
import CountryFlagDisplay from "./CountryFlagDisplay";
import ServeRadio from "./ServeRadio";

export default function PlayerRow({ playerData }) {
  const { country, name, serve } = playerData || {};
  return (
    <div className="player-row flex items-center w-full uppercase">
      <CountryFlagDisplay currentCountry={country} />
      <p className="player-name text-ellipsis whitespace-nowrap overflow-hidden">{name}</p>
      {serve && <ServeRadio serve={serve} handleClick={() => {}} />}
    </div>
  );
}
