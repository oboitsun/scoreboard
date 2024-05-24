import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RELOGIN_PAGE, SIGNIN_PAGE } from "../constants";

export default function PrivateRoutes() {
  const location = useLocation();
  const [cookie] = useCookies("refresh_token");
  const access_token = sessionStorage.getItem("scoreboard-access-token");
  const refresh_token = cookie?.refresh_token;
  console.log({ cookie, access_token, refresh_token });
  return !access_token ? (
    <Outlet />
  ) : (
    <Navigate to={refresh_token ? RELOGIN_PAGE : SIGNIN_PAGE} replace state={{ from: location }} />
  );
}
