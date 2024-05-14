import React from "react";
import GameControlRow from "./GameControlRow";

export default function MatchControls({
  match,
  handleMatchReset,
  handleCreateNewSet,
  handleRemoveSet,
  handlePairGameScore,
  handleResetGameScore,
  handleStopWatchAction,
}) {
  return (
    <div className="w-full flex  gap-4 mt-4">
      {/* <button
onClick={async () => {
updateRow();
}}
className="text-5xl">
UPDATE
</button> */}

      <div className="w-1/3 bg-white/10 p-3 rounded-xl">
        <p className="text-4xl underline  mt-3 text-center">Stopwatch</p>
        <div className="grid grid-cols-2 gap-4 text-4xl  mt-2">
          <button
            onClick={() => {
              handleStopWatchAction(match?.timer_status === "started" ? "paused" : "started");
            }}
            className={`${
              match?.timer_status === "started" ? "bg-yellow-400" : "bg-green-400"
            } rounded-lg p-4 uppercase`}>
            {match?.timer_status === "started" ? "pause" : "start"}
          </button>
          <button
            onClick={() => {
              handleStopWatchAction("reset");
            }}
            className="bg-red-400 rounded-lg p-4 uppercase">
            reset
          </button>
        </div>
        {/* <button
          onClick={async () => {
            console.log(match);
          }}
          className="text-5xl ">
          show state
        </button> */}
      </div>
      <div className="w-1/3 bg-white/10 p-3 rounded-xl flex flex-col ">
        <p className="text-4xl underline mt-3 ">Match control</p>
        <button onClick={handleMatchReset} className={`text-5xl`}>
          Reset Match
        </button>
      </div>
      <div className="w-1/3 bg-white/10 p-3 rounded-xl flex flex-col hover:*:underline">
        <p className="text-4xl underline mt-3">Set control</p>
        <button onClick={handleCreateNewSet} className={`text-5xl`}>
          New Set
        </button>
        <button
          disabled={match?.sets?.length <= 1}
          onClick={handleRemoveSet}
          className={`text-5xl`}>
          Remove Set
        </button>
      </div>

      <div className="w-fit ml-auto  flex flex-col text-5xl gap-2 bg-white/10  p-4 rounded-lg items-center">
        <h5 className="underline">Game Score control</h5>
        <GameControlRow pair={1} bgClass={"bg-primary"} handleScore={handlePairGameScore} />
        <GameControlRow pair={2} bgClass={"bg-secondary"} handleScore={handlePairGameScore} />
        <div className="flex items-center gap-4">
          <button onClick={handleResetGameScore}>Reset</button>
        </div>
      </div>
    </div>
  );
}
