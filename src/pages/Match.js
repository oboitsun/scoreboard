import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerRowControl from "../components/PlayerRowControl";
import SetsRowControl from "../components/SetsRowControl";
import { handleChangeServeState } from "../utils/functions";
import { supabase } from "../utils/supabase";

export default function Match() {
  const { matchId } = useParams();
  const [match, setMatch] = useState({});
  const [game_p1, setGame_p1] = useState(0);
  const [game_p2, setGame_p2] = useState(0);
  async function fetchRowById() {
    try {
      const { data: row, error } = await supabase
        .from("scoreboard")
        .select("*")
        .eq("id", matchId)
        .single();

      if (error) {
        console.error("Error fetching row:", error.message);
        return;
      }

      console.log("Row:", row);
      setMatch(row);
      setGame_p1(row.game_p1);
      setGame_p2(row.game_p2);
      // Do something with the row data
    } catch (error) {
      console.error("Error fetching row:", error.message);
    }
  }
  useEffect(() => {
    fetchRowById();
  }, []);
  const handlePlayerNameChange = (pair, player, val) => {
    console.log(pair, player, val);
    const oldPairState = match?.[`pair${pair}`];
    setMatch((prev) => ({
      ...prev,
      [`pair${pair}`]: {
        ...oldPairState,
        [`player${player}`]: { ...oldPairState?.[`player${player}`], name: val },
      },
    }));
  };
  const handlePlayerServeChange = (pair, player) => {
    console.log("serve change");
    const newState = handleChangeServeState(match, pair, player);
    setMatch(newState);
    updateRow(newState);
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
      // Do something with the updated row data
    } catch (error) {
      console.error("Error updating row:", error.message);
    }
  };

  return (
    <div className="py-20">
      <div
        style={{ gridTemplateColumns: `90px 1fr repeat(${match?.sets?.length},80px) 212px` }}
        data-sets={match?.sets?.length}
        className="score-grid w-full">
        <div className="col-span-2 round text-left">{match?.round}</div>

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
            pair={1}
            player={1}
            name={match?.pair1?.player1?.name}
            serve={match?.pair1?.player1?.serve}
          />
          <PlayerRowControl
            handlePlayerNameChange={handlePlayerNameChange}
            handlePlayerServeChange={handlePlayerServeChange}
            pair={1}
            player={2}
            name={match?.pair1?.player2?.name}
            serve={match?.pair1?.player2?.serve}
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
            player={1}
            pair={2}
            name={match?.pair2?.player1?.name}
            serve={match?.pair2?.player1?.serve}
          />
          <PlayerRowControl
            handlePlayerNameChange={handlePlayerNameChange}
            handlePlayerServeChange={handlePlayerServeChange}
            player={2}
            pair={2}
            name={match?.pair2?.player2?.name}
            serve={match?.pair2?.player2?.serve}
          />
        </div>
        <SetsRowControl sets={match?.sets} pair={2} handleChange={handleSetScoreChange} />
        <div className="game-score">{game_p2}</div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={async () => {
            updateRow();
          }}
          className="text-5xl">
          UPDATE
        </button>
        <button
          onClick={async () => {
            console.log(match);
          }}
          className="text-5xl ml-4">
          show state
        </button>
        <button
          onClick={() => {
            if (match?.sets?.length < 5) {
              const newState = {
                ...match,
                sets: [...match.sets, { id: match?.sets?.length + 1, score: [0, 0] }],
              };
              setMatch({ ...newState });
              updateRow(newState);
            }
          }}
          className={`text-5xl`}>
          New Set
        </button>
      </div>
      <div className="w-full flex flex-col text-5xl">
        <div className="flex gap-4 items-center">
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
            onClick={() => {
              setGame_p1((prev) => prev + 1);
              updateGameScore({ game_p1: parseInt(game_p1) + 1, game_p2 });
            }}>
            +1
          </button>
        </div>
        <div className="flex gap-4 items-center">
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
            onClick={() => {
              setGame_p2((prev) => prev + 1);
              updateGameScore({ game_p2: parseInt(game_p2) + 1, game_p1 });
            }}>
            +1
          </button>
        </div>
        <button
          onClick={() => {
            updateGameScore({ game_p1, game_p2 });
          }}>
          Update Game Score
        </button>
        <button
          onClick={() => {
            setGame_p1(0);
            setGame_p2(0);
            updateGameScore({ game_p1: 0, game_p2: 0 });
          }}>
          Reset Game Score
        </button>
      </div>
    </div>
  );
}
