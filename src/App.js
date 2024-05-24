import { CookiesProvider } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./components/PrivateRoute";
import {
  MATCH_CONTROL_PAGE,
  MATCH_PAGE,
  RELOGIN_PAGE,
  SIGNIN_PAGE,
  SIGNUP_PAGE,
} from "./constants/index";
import ControlLayout from "./layouts/ControlLayout";
import MatchLayout from "./layouts/MatchLayout";
import MatchControlsPage from "./pages/MatchControlsPage";
import MatchPage from "./pages/MatchPage";
import ReLoginPage from "./pages/ReloginPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
function App() {
  return (
    <div className="App">
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <Routes>
          {/* <Route path={SIGNIN_PAGE} element={<SigninPage />} /> */}
          <Route element={<MatchLayout />}>
            <Route index element={<MatchPage />} />
            <Route path={SIGNUP_PAGE} element={<SignupPage />} />
            <Route path={SIGNIN_PAGE} element={<SigninPage />} />
            <Route path={RELOGIN_PAGE} element={<ReLoginPage />} />
          </Route>
          <Route element={<MatchLayout />}>
            <Route path={`${MATCH_PAGE}/:matchId`} element={<MatchPage />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route element={<ControlLayout />}>
              <Route path={`${MATCH_CONTROL_PAGE}/:matchId`} element={<MatchControlsPage />} />
            </Route>
          </Route>
        </Routes>
      </CookiesProvider>
    </div>
  );
}

export default App;
