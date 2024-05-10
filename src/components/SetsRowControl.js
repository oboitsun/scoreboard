import React from "react";

export default function SetsRowControl({ sets, pair, handleChange, disableControls = false }) {
  return [1, 2, 3, 4, 5].map((set, i) => {
    const isExist = sets?.[i]?.score;
    return isExist ? (
      <button key={set} className={`set-score relative`}>
        {isExist[pair - 1]}
        {set === sets?.length && !disableControls ? (
          <>
            <button
              onClick={() => {
                handleChange(pair, "-");
              }}
              className="absolute w-max h-max top-1/2 -translate-y-1/2 left-0 -translate-x-12 p-2 rounded-md bg-red-300 text-white text-7xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
              </svg>
            </button>
            <button
              onClick={() => {
                handleChange(pair, "+");
              }}
              className="absolute w-max h-max top-1/2 -translate-y-1/2 right-0 translate-x-12 p-2 rounded-md bg-green-300 text-white text-7xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </>
        ) : (
          ""
        )}
      </button>
    ) : (
      <></>
    );
  });
}
