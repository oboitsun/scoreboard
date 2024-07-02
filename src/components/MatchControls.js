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
    <div className=" match-controls">
      {/* <button
onClick={async () => {
updateRow();
}}
className="text-5xl">
UPDATE
</button> */}

      <div className=" bg-white/10 p-3 rounded-xl time-control">
        <p className="control-title underline   text-center">Stopwatch</p>
        <div className="grid grid-cols-2 gap-4 ">
          <button
            onClick={() => {
              handleStopWatchAction(match?.timer_status === "started" ? "paused" : "started");
            }}
            className={`${
              match?.timer_status === "started" ? "bg-yellow-400" : "bg-green-400"
            } rounded-full py-2 px-6 uppercase`}>
            {match?.timer_status === "started" ? "pause" : "start"}
          </button>
          <button
            onClick={() => {
              handleStopWatchAction("reset");
            }}
            className="bg-red-400 rounded-full py-2 px-6 uppercase">
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
      <div className=" bg-white/10 p-3 rounded-xl flex flex-col items-stretch sets-control">
        <p className="control-titleunderline ">Match control</p>
        <button onClick={handleMatchReset} className={`rounded-full py-2 px-6 bg-red-400`}>
          Reset Match
        </button>
      </div>
      <div className=" bg-white/10 p-3 rounded-xl flex flex-col hover:*:underline">
        <p className="control-title underline ">Set control</p>
        <button onClick={handleCreateNewSet} className={`rounded-full py-2 px-6 bg-green-400`}>
          New Set
        </button>
        <button
          disabled={match?.sets?.length <= 1}
          onClick={handleRemoveSet}
          className={`rounded-full py-2 px-6 bg-red-400`}>
          Remove Set
        </button>
      </div>

      <div className="  flex flex-col  gap-2 bg-white/10  p-4 rounded-lg items-center game-control">
        <h5 className="underline">Game Score control</h5>
        <GameControlRow pair={1} bgClass={"bg-slate-300"} handleScore={handlePairGameScore} />
        <GameControlRow pair={2} bgClass={"bg-slate-500"} handleScore={handlePairGameScore} />
        <div className="flex items-center gap-4">
          <button onClick={handleResetGameScore}>Reset</button>
        </div>
      </div>
    </div>
  );
}
