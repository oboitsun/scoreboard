import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerRow from "../components/PlayerRow";
import SetsRowControl from "../components/SetsRowControl";
import TimeWatch from "../components/Time";
import ScoreLogo from "../components/UI/ScoreLogo";
import { supabase } from "../utils/supabase";

export default function MatchPage() {
  const gameRef = useRef();
  useEffect(() => {
    import("./Home.scss");
  }, []);
  const params = useParams();
  const [match, setMatch] = useState({});
  useEffect(() => {
    console.log(params);
    async function getTodos() {
      let { data: scoreboard, error } = await supabase
        .from("scoreboard")
        .select()
        .eq("id", params?.screenId ?? 1);
      console.log(scoreboard);
      if (scoreboard?.length > 0) {
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
        {
          event: "*",
          schema: "public",
          table: "scoreboard",
          filter: `id=eq.${params?.screenId ?? 1}`,
        },
        (payload) => {
          if (!payload.errors) {
            setMatch((prev) => ({ ...prev, ...payload.new }));
          }
        }
      )
      .subscribe();
    return () => {
      channels.unsubscribe();
    };
  }, []);
  return (
    <div className="bg-[#292929] w-full min-h-screen relative flex flex-col items-center  font-black leading-none overflow-hidden">
      {/* <img className="absolute z-0 top-0 left-0 w-full h-full object-cover" src={bg} alt="Back" /> */}
      <div className="w-[95%] relative z-10 py-16 flex flex-col h-1/2 flex-grow">
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col gap-2.5 items-start">
            <p id="top-title" class="text-base lg:text-3xl font-bold leading-none uppercase">
              {match.title}
            </p>
            <h1 id="match-title" class="uppercase tracking-[-0.01em]  font-black">
              {match.round}
            </h1>
          </div>
          <div className="competition-logo">
            <ScoreLogo />
          </div>
        </div>
        <div className="w-full flex flex-col pt-16 flex-grow">
          {match && (
            <>
              <div className="score-grid w-full">
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
                <div style={{ width: gameRef?.current?.clientWidth }} className="game">
                  <span>game</span>
                </div>
              </div>
              <div className="score-grid w-full ">
                <div className="col-span-2 flex flex-col justify-center ">
                  <PlayerRow playerData={match?.pair1?.player1} />
                  <PlayerRow playerData={match?.pair1?.player2} />
                </div>
                <SetsRowControl sets={match?.sets} pair={1} disableControls />
                <div ref={gameRef} className="game-score">
                  {match?.game_p1}
                </div>
              </div>
              <div className="score-grid w-full ">
                <div className="col-span-2 flex flex-col justify-center ">
                  <PlayerRow playerData={match?.pair2?.player1} />
                  <PlayerRow playerData={match?.pair2?.player2} />
                </div>
                <SetsRowControl sets={match?.sets} pair={2} disableControls />
                <div className="game-score gray">{match?.game_p2}</div>
              </div>
              <div className="mt-auto flex justify-between items-end">
                <div className="flex flex-col">
                  <p className="uppercase font-medium text-4xl text-left"> Timer</p>
                  <div className="time">
                    <TimeWatch timer_status={match.timer_status} />
                  </div>
                </div>
                <div className="flex items-end justify-end w-1/2  *:object-contain max-w-max text-[2vw] gap-4 text-center uppercase opacity-45">
                  <p>Sponsor Name</p>
                  <p>Sponsor Name</p>
                  <p>Sponsor Name</p>
                </div>
              </div>
            </>
          )}
        </div>
        {/* <div className="flex flex-col gap-4 overflow-hidden h-auto ">
      {match.length > 0 ? (
        match.map((match) => (
          <Link to={`/match/${match.id}`} key={match.id} className="text-xl">
            <p>{match.round}</p>
          </Link>
        ))
      ) : (
        <p>No match has been created yet</p>
      )}
    </div> */}
      </div>
    </div>
  );
}
