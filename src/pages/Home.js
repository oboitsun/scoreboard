import React, { useEffect } from "react";
import { supabase } from "../utils/supabase";

export default function Home() {
  useEffect(() => {
    async function getTodos() {
      let {
        data: { user: user },
        error,
      } = await supabase.auth.getUser();
      if (!error) {
        let { data: account } = await supabase.from("Users").select().eq("id", user.id);
        console.log(account);
      }
    }
    getTodos();
  }, []);
  return (
    <div className="flex items-center justify-center flex-col gap-4 w-full max-w-24 mx-auto">
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
