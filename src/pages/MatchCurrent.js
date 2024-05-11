import React, { useEffect, useState } from "react";
import howden_logo from "../assets/howden-logo.svg";
import lignator_logo from "../assets/lignator-logo.png";
import PlayerRow from "../components/PlayerRow";
import SetsRowControl from "../components/SetsRowControl";
import TimeWatch from "../components/Time";
import { supabase } from "../utils/supabase";
import "./Home.scss";
export default function MatchCurrent() {
  const [match, setMatch] = useState({});
  useEffect(() => {
    async function getTodos() {
      let { data: scoreboard, error } = await supabase.from("scoreboard").select("*");

      console.log(scoreboard);
      if (scoreboard.length > 0) {
        setMatch(scoreboard[0]);
      }
    }

    getTodos();
  }, []);
  useEffect(() => {
    const channels = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "scoreboard", filter: "id=eq.1" },
        (payload) => {
          if (!payload.errors) {
            setMatch(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);
  return (
    <div className="w-full flex flex-col pt-16 flex-grow">
      {match?.id && (
        <>
          <div
            style={{ gridTemplateColumns: `90px 1fr repeat(${match?.sets?.length},80px) 212px` }}
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
            <div className="col-span-2 flex flex-col justify-center ">
              <PlayerRow playerData={match?.pair1?.player1} />
              <PlayerRow playerData={match?.pair1?.player2} />
            </div>
            <SetsRowControl sets={match?.sets} pair={1} disableControls />
            <div className="game-score">{match?.game_p1}</div>
          </div>
          <div
            style={{ gridTemplateColumns: `90px 1fr repeat(${match?.sets?.length},80px) 212px` }}
            className="score-grid w-full min-h-[212px]">
            <div className="col-span-2 flex flex-col justify-center ">
              <PlayerRow playerData={match?.pair2?.player1} />
              <PlayerRow playerData={match?.pair2?.player2} />
            </div>
            <SetsRowControl sets={match?.sets} pair={2} disableControls />
            <div className="game-score gray">{match?.game_p2}</div>
          </div>
          <div className="mt-auto flex justify-between items-end">
            <div className="flex flex-col">
              <p className="uppercase font-medium text-4xl text-left"> MÄNGUAEG</p>
              <div className="time">
                <TimeWatch />
              </div>
            </div>
            <div className="flex items-end gap-14">
              <img src={howden_logo} alt="howden" />
              <img src={lignator_logo} alt="lignator" />
              <img src={howden_logo} alt="howden" />
            </div>
          </div>
        </>
      )}
    </div>
    // <div className="flex flex-col gap-4 overflow-hidden h-auto ">
    //   {match.length > 0 ? (
    //     match.map((match) => (
    //       <Link to={`/match/${match.id}`} key={match.id} className="text-xl">
    //         <p>{match.round}</p>
    //       </Link>
    //     ))
    //   ) : (
    //     <p>No match has been created yet</p>
    //   )}
    // </div>
  );
}
