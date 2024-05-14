import { PlusIcon } from "@heroicons/react/20/solid";
import React from "react";

const ScoreButtons = ({ pair, handleScore }) => {
  return (
    <>
      {[0, 15, 30, 40, "AD"].map((score) => (
        <button
          className="hover:underline"
          onClick={() => handleScore(pair, score)}
          key={`pair${pair}_${score}`}>
          {score}
        </button>
      ))}
      <button className="flex items-center" onClick={() => handleScore(pair, 1)}>
        <PlusIcon className="w-4 h-4 text-black stroke-black stroke-2" />1
      </button>
    </>
  );
};

export default function GameControlRow({ pair, bgClass, handleScore }) {
  return (
    <div className={`flex gap-4 items-center ${bgClass} p-4 rounded-lg text-black`}>
      <p>Pair{pair}</p>
      <ScoreButtons pair={pair} handleScore={handleScore} />
    </div>
  );
}
