import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabase";

export default function Home() {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    async function getTodos() {
      let { data: scoreboards } = await supabase.from("scoreboard").select("*");
      setBoards(scoreboards);
      // let {
      //   data: { user: user },
      //   error,
      // } = await supabase.auth.getUser();
      // if (!error) {

      //   console.log(account);
      // }
    }
    getTodos();
  }, []);
  return (
    <div className="flex items-center justify-center flex-col gap-4 w-full max-w-24 mx-auto">
      {boards.map((b) => (
        <Link key={b.id} to={`screen/${b.id}`}>
          Match {b.id}
        </Link>
      ))}
      {/* <Link
        className="w-full text-center p-2 uppercase rounded-lg bg-green-400 text-xl"
        to={SIGNIN_PAGE}>
        Sign in
      </Link>
      <Link
        className="w-full text-center p-2 uppercase rounded-lg bg-green-400 text-xl"
        to={SIGNUP_PAGE}>
        Sign up
      </Link> */}
    </div>
  );
}
