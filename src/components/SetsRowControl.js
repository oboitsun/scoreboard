import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function SetsRowControl({ sets, pair, handleChange, disableControls = false }) {
  return [1, 2, 3, 4, 5].map((set, i) => {
    const isExist = sets?.[i]?.score;
    return isExist ? (
      <div key={set} className={`set-score relative`}>
        {isExist[pair - 1]}
        {set === sets?.length && !disableControls ? (
          <>
            <button
              onClick={() => {
                handleChange(pair, "-");
              }}
              className="absolute w-max h-max top-1/2 -translate-y-1/2 left-0 -translate-x-9 p-2 rounded-md bg-red-300 text-white text-7xl">
              <MinusIcon className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={() => {
                handleChange(pair, "+");
              }}
              className="absolute w-max h-max top-1/2 -translate-y-1/2 right-0 translate-x-12 p-2 rounded-md bg-green-300 text-white text-7xl">
              <PlusIcon className="w-8 h-8 text-white" />
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    ) : (
      <></>
    );
  });
}
