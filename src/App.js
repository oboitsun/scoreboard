import { CookiesProvider } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./components/PrivateRoute";
import {
  RELOGIN_PAGE,
  SCREENS_PAGE,
  SCREEN_CONTROL_PAGE,
  SCREEN_PAGE,
  SIGNIN_PAGE,
  SIGNUP_PAGE,
} from "./constants/index";
import ControlLayout from "./layouts/ControlLayout";
import MainLayout from "./layouts/MainLayout";
import MatchLayout from "./layouts/MatchLayout";
import Home from "./pages/Home";
import MatchControlsPage from "./pages/MatchControlsPage";
import MatchPage from "./pages/MatchPage";
import ReLoginPage from "./pages/ReloginPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ScreensPage from "./pages/SreensPage";
function App() {
  return (
    <div className="App">
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <Routes>
          {/* <Route path={SIGNIN_PAGE} element={<SigninPage />} /> */}
          <Route element={<MainLayout />}>
            <Route path={SIGNUP_PAGE} element={<SignupPage />} />
            <Route path={SIGNIN_PAGE} element={<SigninPage />} />
            <Route path={RELOGIN_PAGE} element={<ReLoginPage />} />
          </Route>
          <Route element={<MatchLayout />}>
            <Route path={`${SCREEN_PAGE}/:screenId`} element={<MatchPage />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
            </Route>
            <Route element={<ControlLayout />}>
              <Route path={SCREENS_PAGE} element={<ScreensPage />} />
              <Route path={`${SCREEN_CONTROL_PAGE}/:screenId`} element={<MatchControlsPage />} />
            </Route>
          </Route>
        </Routes>
      </CookiesProvider>
    </div>
  );
}

export default App;
