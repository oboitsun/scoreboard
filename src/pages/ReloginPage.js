import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

export default function ReLoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies("refresh-token");

  const refreshUserLogin = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: cookies.refresh_token,
      });
      if (!error) {
        setCookies(data.session.refresh_token, {
          expires: data.session.expires_at,
          maxAge: data.session.expires_in,
        });
        navigate(location?.state?.from ?? "/");
      } else {
        navigate("/signin");
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    refreshUserLogin();
  }, []);
  return (
    <div className="w-full h-full fixed top-0 left-0 flex text-7xl text-sakura-100 justify-center items-center">
      Trying to Relogin You...
    </div>
  );
}
