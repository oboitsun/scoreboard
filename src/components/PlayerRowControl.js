import React from "react";
import CountryFlagPicker from "./CountryFlagPicker";
import ServeRadio from "./ServeRadio";

export default function PlayerRowControl({
  handlePlayerNameChange,
  handlePlayerServeChange,
  handleCountryChange,
  pair,
  player,

  playerData,
}) {
  return (
    <div className="flex gap-6 items-center w-full">
      <CountryFlagPicker
        currentCountry={playerData?.country}
        handlePick={(iso2) => {
          handleCountryChange(iso2, pair, player);
        }}
      />
      <input
        placeholder="Player Name"
        onChange={(e) => {
          handlePlayerNameChange(pair, player, e.target.value);
        }}
        className="flex-shrink-0 bg-white/10 text-5xl my-0.5 px-2 player-name w-1/2 flex-grow"
        value={playerData?.name}
      />
      <ServeRadio
        serve={playerData?.serve}
        handleClick={() => {
          handlePlayerServeChange(pair, player);
        }}
      />
    </div>
  );
}
