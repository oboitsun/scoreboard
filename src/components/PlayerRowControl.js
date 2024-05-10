import React from "react";
import ServeRadio from "./ServeRadio";

export default function PlayerRowControl({
  handlePlayerNameChange,
  handlePlayerServeChange,
  pair,
  player,
  name,
  serve,
}) {
  return (
    <div className="flex gap-6 items-center w-full">
      <div className="flag bg-slate-500 flex-shrink-0"></div>
      <input
        placeholder="Player Name"
        onChange={(e) => {
          handlePlayerNameChange(pair, player, e.target.value);
        }}
        className="flex-shrink-0 bg-transparent border-2 player-name w-1/2 flex-grow"
        value={name}
      />
      <ServeRadio
        serve={serve}
        handleClick={() => {
          handlePlayerServeChange(pair, player);
        }}
      />
    </div>
  );
}
