import React from "react";
import ServeRadio from "./ServeRadio";

export default function PlayerRow({ pair, player, name, serve }) {
  return (
    <div className="flex gap-6 items-center w-full uppercase">
      <div className="flag bg-slate-500 flex-shrink-0"></div>
      <p className="player-name">{name}</p>
      {serve && <ServeRadio serve={serve} handleClick={() => {}} />}
    </div>
  );
}
