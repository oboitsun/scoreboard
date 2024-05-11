import { PlusIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerRowControl from "../components/PlayerRowControl";
import SetsRowControl from "../components/SetsRowControl";
import { newMatch } from "../utils/dummyData";
import { handleChangeServeState, handleFlagChange, handleNameChange } from "../utils/functions";
import { supabase } from "../utils/supabase";

export default function Match() {
  const { matchId } = useParams();
  const [match, setMatch] = useState({});
  const [game_p1, setGame_p1] = useState(0);
  const [game_p2, setGame_p2] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  async function fetchRowById(from) {
    try {
      const { data: row, error } = await supabase
        .from(from ?? "scoreboard")
        .select("*")
        .eq("id", matchId)
        .single();

      if (error) {
        console.error("Error fetching row:", error.message);
        setError(error.message);
        setLoaded(true);
        return;
      }

      console.log("Row:", row);
      setMatch(row);
      setGame_p1(row.game_p1);
      setGame_p2(row.game_p2);
      setError(false);
      // Do something with the row data
    } catch (error) {
      console.error("Error fetching row:", error.message);
    }

    setLoaded(true);
  }
  useEffect(() => {
    fetchRowById("scoreboard");
  }, []);
  const handlePlayerNameChange = (pair, player, val) => {
    const newPairState = handleNameChange(match?.[`pair${pair}`], pair, player, val);
    setMatch((prev) => ({
      ...prev,
      ...newPairState,
    }));
    updateRow(newPairState);
  };
  const handleCountryChange = (iso2, pair, player) => {
    const newPairState = handleFlagChange(match?.[`pair${pair}`], pair, player, iso2);
    setMatch((prev) => ({
      ...prev,
      ...newPairState,
    }));
    updateRow(newPairState);
  };
  const handlePlayerServeChange = (pair, player) => {
    console.log("serve change");
    const newPairsState = handleChangeServeState(match, pair, player);
    setMatch((prev) => ({ ...prev, ...newPairsState }));
    updateRow(newPairsState);
  };
  const handleSetScoreChange = (pair, operation) => {
    setMatch((prevMatch) => {
      const newSets = [...prevMatch.sets];

      // Ensure the sets array is not empty before modifying the last set's score
      if (newSets.length > 0) {
        // Create a copy of the last set object
        const lastSet = { ...newSets[newSets.length - 1] };

        // Ensure the score array for the pair exists before modifying its value
        if (lastSet.score && lastSet.score.length >= pair) {
          // Update the score for the specified pair
          lastSet.score[pair - 1] =
            operation === "+" ? lastSet.score[pair - 1] + 1 : lastSet.score[pair - 1] - 1;

          // Replace the last set with the updated set in the newSets array
          newSets[newSets.length - 1] = lastSet;
        }
      }
      updateRow({ ...prevMatch, sets: newSets });

      return { ...prevMatch, sets: newSets };
    });
  };
  const updateRow = useCallback(
    async (newState) => {
      try {
        const { data, error } = await supabase
          .from("scoreboard")
          .update(newState ?? match)
          .eq("id", matchId);

        if (error) {
          console.error("Error updating row:", error.message);
          return;
        }

        console.log("Row updated successfully:", data);
        // Do something with the updated row data
      } catch (error) {
        console.error("Error updating row:", error.message);
      }
    },
    [match, matchId]
  );
  const updateGameScore = async ({ game_p1, game_p2 }) => {
    try {
      const { data, error } = await supabase
        .from("scoreboard")
        .update({ game_p1, game_p2 })
        .eq("id", matchId);
      if (error) {
        console.error("Error updating row:", error.message);
        return;
      }
      console.log("Row updated successfully:", data);
    } catch (error) {
      console.error("Error updating row:", error.message);
    }
  };
  const hanleRoundNameChange = (val) => {
    setMatch((prev) => ({ ...prev, round: val }));
    updateRow({ round: val });
  };
  return loaded ? (
    !error ? (
      <div className={`${match.id ? "opacity-100" : "opacity-0"} py-10 transition-all`}>
        <div
          style={{ gridTemplateColumns: `90px 1fr repeat(${match?.sets?.length},80px) 212px` }}
          data-sets={match?.sets?.length}
          className="score-grid w-full">
          <div className="col-span-2 round max-w-xs  ">
            <input
              value={match?.round}
              onChange={(e) => {
                hanleRoundNameChange(e.target.value);
              }}
              className="text-left  bg-white/10 outline-none uppercase px-4 "
            />
          </div>

          {[1, 2, 3, 4, 5].map((set, i) => {
            const isExist = match?.sets?.[i]?.score;
            return isExist ? (
              <button key={set} className={`set`}>
                set{set}
              </button>
            ) : (
              <></>
            );
          })}
          <div className="game">game</div>
        </div>

        <div
          style={{ gridTemplateColumns: `90px 1fr repeat(${match?.sets?.length},80px) 212px` }}
          className="score-grid w-full min-h-[212px]">
          <div className="col-span-2 flex flex-col justify-center max-w-[732px] ">
            <PlayerRowControl
              handlePlayerNameChange={handlePlayerNameChange}
              handlePlayerServeChange={handlePlayerServeChange}
              handleCountryChange={handleCountryChange}
              playerData={match?.pair1?.player1}
              pair={1}
              player={1}
            />
            <PlayerRowControl
              handlePlayerNameChange={handlePlayerNameChange}
              handlePlayerServeChange={handlePlayerServeChange}
              handleCountryChange={handleCountryChange}
              playerData={match?.pair1?.player2}
              pair={1}
              player={2}
            />
          </div>

          <SetsRowControl sets={match?.sets} pair={1} handleChange={handleSetScoreChange} />
          <div className="game-score">{game_p1}</div>
        </div>
        <div
          style={{ gridTemplateColumns: `90px 1fr repeat(${match?.sets?.length},80px) 212px` }}
          className="score-grid w-full min-h-[212px]">
          <div className="col-span-2 flex flex-col justify-center max-w-[732px] ">
            <PlayerRowControl
              handlePlayerNameChange={handlePlayerNameChange}
              handlePlayerServeChange={handlePlayerServeChange}
              handleCountryChange={handleCountryChange}
              playerData={match?.pair2?.player1}
              player={1}
              pair={2}
            />
            <PlayerRowControl
              handlePlayerNameChange={handlePlayerNameChange}
              handlePlayerServeChange={handlePlayerServeChange}
              handleCountryChange={handleCountryChange}
              playerData={match?.pair2?.player2}
              player={2}
              pair={2}
            />
          </div>
          <SetsRowControl sets={match?.sets} pair={2} handleChange={handleSetScoreChange} />
          <div className="game-score gray">{game_p2}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="  w-full">
            <div className="flex items-start gap-4 justify-between  *:uppercase">
              {/* <button
    onClick={async () => {
      updateRow();
    }}
    className="text-5xl">
    UPDATE
  </button> */}
              <div className="w-1/3 bg-white/10 p-3 rounded-xl">
                <p className="text-4xl underline  mt-3 text-center">Debugging</p>
                <button
                  onClick={async () => {
                    console.log(match);
                  }}
                  className="text-5xl ">
                  show state
                </button>
              </div>
              <div className="w-1/3 bg-white/10 p-3 rounded-xl flex flex-col ">
                <p className="text-4xl underline mt-3 ">Match control</p>
                <button
                  onClick={() => {
                    if (match?.sets?.length < 5) {
                      setGame_p1(0);
                      setGame_p2(0);
                      setMatch({ ...newMatch });
                      updateRow(newMatch);
                    }
                  }}
                  className={`text-5xl`}>
                  Reset Match
                </button>
              </div>
              <div className="w-1/3 bg-white/10 p-3 rounded-xl flex flex-col hover:*:underline">
                <p className="text-4xl underline mt-3">Set control</p>
                <button
                  onClick={() => {
                    if (match?.sets?.length < 5) {
                      const newSets = {
                        sets: [...match.sets, { id: match?.sets?.length + 1, score: [0, 0] }],
                        game_p1: 0,
                        game_p2: 0,
                      };
                      console.log(newSets);
                      setGame_p1(0);
                      setGame_p2(0);
                      setMatch((prev) => ({ ...prev, ...newSets }));
                      updateRow(newSets);
                    }
                  }}
                  className={`text-5xl`}>
                  New Set
                </button>
                <button
                  disabled={match?.sets?.length <= 1}
                  onClick={() => {
                    if (match?.sets?.length > 1) {
                      const pop = [...match.sets];
                      pop.pop();
                      const newSets = {
                        sets: pop,
                        game_p1: 0,
                        game_p2: 0,
                      };
                      setGame_p1(0);
                      setGame_p2(0);
                      setMatch((prev) => ({ ...prev, ...newSets }));
                      updateRow(newSets);
                    }
                  }}
                  className={`text-5xl`}>
                  Remove Set
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col text-5xl gap-2 bg-black  p-4 rounded-lg items-center">
            <h5 className="underline">Game Score control</h5>
            <div className="flex gap-4 items-center bg-primary p-4 rounded-lg text-black">
              <p>Pair1</p>
              {[0, 15, 30, 40, "AD"].map((score, i) => (
                <button
                  onClick={() => {
                    setGame_p1(score);
                    updateGameScore({ game_p1: score, game_p2 });
                  }}
                  key={`pair1_${score}`}>
                  {score}
                </button>
              ))}
              <button
                className="flex items-center"
                onClick={() => {
                  setGame_p1((prev) => prev + 1);
                  updateGameScore({ game_p1: parseInt(game_p1) + 1, game_p2 });
                }}>
                <PlusIcon className="w-4 h-4 text-black stroke-black stroke-2" />1
              </button>
            </div>
            <div className="flex gap-4 items-center bg-secondary p-4 rounded-lg text-black">
              <p>Pair2</p>
              {[0, 15, 30, 40, "AD"].map((score, i) => (
                <button
                  onClick={() => {
                    setGame_p2(score);
                    updateGameScore({ game_p2: score, game_p1 });
                  }}
                  key={`pair2_${score}`}>
                  {score}
                </button>
              ))}
              <button
                className="flex items-center"
                onClick={() => {
                  setGame_p2((prev) => prev + 1);
                  updateGameScore({ game_p2: parseInt(game_p2) + 1, game_p1 });
                }}>
                <PlusIcon className="w-4 h-4 text-black stroke-black stroke-2" />1
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  updateGameScore({ game_p1, game_p2 });
                }}>
                Update
              </button>
              <button
                onClick={() => {
                  setGame_p1(0);
                  setGame_p2(0);
                  updateGameScore({ game_p1: 0, game_p2: 0 });
                }}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col m-auto text-5xl gap-4">
        <p>Something went wrong</p>
        <button
          className="text-5xl uppercase bg-primary text-black text center py-4 px-8 rounded-lg"
          onClick={async () => {
            setLoaded(false);
            await fetchRowById();
          }}>
          Refetch
        </button>
      </div>
    )
  ) : (
    <div className="m-auto flex flex-col justify-center items-center gap-4">
      <ArrowPathIcon className="w-24 h-24 text-primary animate-spin" />
      <p className="text-5xl uppercase"> Loading Match Data...</p>
    </div>
  );
}
