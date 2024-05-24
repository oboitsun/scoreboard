import React from "react";
import SigninForm from "../components/SignupPage/SigninForm";
import { supabase } from "../utils/supabase";

export default function SignupPage() {
  return (
    <div className="font-mono flex flex-col gap-4 items-center">
      <p> SignupPage</p>
      <SigninForm
        signUp
        onSubmit={async (email, password) => {
          const res = await supabase.auth.signUp({ email, password });
          console.log(res);
        }}
      />
    </div>
  );
}
