import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import SigninForm from "../components/SignupPage/SigninForm";
import { supabase } from "../utils/supabase";

export default function SigninPage() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["refresh-token"]);

  return (
    <div className="font-mono flex flex-col gap-4 items-center">
      <p> SigninPage</p>
      <SigninForm
        onSubmit={async (email, password) => {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (!error) {
            sessionStorage.setItem("scoreboard-access-token", data.session.access_token);
            setCookie(data.session.refresh_token, {
              expires: data.session.expires_at,
              maxAge: data.session.expires_in,
            });
            navigate("/match-control/1");
          }
        }}
      />
    </div>
  );
}
