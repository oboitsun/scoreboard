import { ArrowPathIcon } from "@heroicons/react/20/solid";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchControls from "../components/MatchControls";
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
    resetGames();
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
            operation === "+"
              ? lastSet.score[pair - 1] + 1
              : Math.max(lastSet.score[pair - 1] - 1, 0);

          // Replace the last set with the updated set in the newSets array
          newSets[newSets.length - 1] = lastSet;
        }
      }
      updateRow({ sets: newSets, game_p1: 0, game_p2: 0 });

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
  const resetGames = () => {
    setGame_p1(0);
    setGame_p2(0);
  };

  const updateMatch = (newSets) => {
    setMatch((prev) => ({ ...prev, ...newSets }));
    updateRow(newSets);
  };

  const handleMatchReset = () => {
    const newMatchData = { ...newMatch };
    resetGames();
    setMatch(newMatchData);
    updateRow(newMatchData);
  };

  const handleCreateNewSet = () => {
    if (match?.sets?.length < 5) {
      const newSet = { id: match?.sets?.length + 1, score: [0, 0] };
      const newSets = {
        sets: [...match.sets, newSet],
        game_p1: 0,
        game_p2: 0,
      };
      resetGames();
      updateMatch(newSets);
    }
  };

  const handleRemoveSet = () => {
    if (match?.sets?.length > 1) {
      const updatedSets = match.sets.slice(0, -1);
      const newSets = {
        sets: updatedSets,
        game_p1: 0,
        game_p2: 0,
      };
      resetGames();
      updateMatch(newSets);
    }
  };
  const handlePairGameScore = (pair, score) => {
    const pairSetters = {
      1: setGame_p1,
      2: setGame_p2,
    };
    const oldGameStates = {
      1: game_p1,
      2: game_p2,
    };
    pairSetters?.[pair]((prev) => (score === 1 ? prev + 1 : score));
    updateGameScore({ [`game_p${pair}`]: score === 1 ? oldGameStates?.[pair] + 1 : score });
  };
  const handleResetGameScore = () => {
    resetGames();
    updateGameScore({ game_p1: 0, game_p2: 0 });
  };
  const handleStopWatchAction = (action) => {
    updateRow({ timer_status: action });
    setMatch({ ...match, timer_status: action });
  };
  return loaded ? (
    !error ? (
      <div className={`${match.id ? "opacity-100" : "opacity-0"} py-10 transition-all`}>
        <div data-sets={match?.sets?.length} className="score-grid w-full">
          <div className="col-span-2 round max-w-xs  ">
            <input
              value={match?.round}
              onChange={(e) => {
                hanleRoundNameChange(e.target.value);
              }}
              className="text-left  bg-white/10 outline-none uppercase px-4 "
            />
          </div>

          <div className="sets">
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
          </div>
          <div className="game">game</div>
        </div>

        <div className="score-grid w-full">
          <div className="col-span-2 flex flex-col justify-center  max-w-lg">
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

          <div className="sets">
            <SetsRowControl sets={match?.sets} pair={1} handleChange={handleSetScoreChange} />
          </div>
          <div className="game-score">{game_p1}</div>
        </div>
        <div className="score-grid w-full">
          <div className="col-span-2 flex flex-col justify-center max-w-lg ">
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
          <div className="sets">
            <SetsRowControl sets={match?.sets} pair={2} handleChange={handleSetScoreChange} />
          </div>

          <div className="game-score gray">{game_p2}</div>
        </div>
        <MatchControls
          match={match}
          handleMatchReset={handleMatchReset}
          handleCreateNewSet={handleCreateNewSet}
          handleRemoveSet={handleRemoveSet}
          handlePairGameScore={handlePairGameScore}
          handleResetGameScore={handleResetGameScore}
          handleStopWatchAction={handleStopWatchAction}
        />
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
