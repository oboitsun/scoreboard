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
              className="set-control set-minus ">
              <MinusIcon className="" />
            </button>
            <button
              onClick={() => {
                handleChange(pair, "+");
              }}
              className="set-control set-plus">
              <PlusIcon className="" />
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
