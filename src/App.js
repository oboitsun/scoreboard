import { Route, Routes } from "react-router-dom";
import "./App.css";
import { MATCH_PAGE } from "./constants";
import ControlLayout from "./layouts/ControlLayout";
import FrameLayout from "./layouts/FrameLayout";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Match from "./pages/Match";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path={SIGNIN_PAGE} element={<SigninPage />} /> */}
        <Route element={<MainLayout />}>
          <Route path={"/current-match"} element={<Home />} />
        </Route>
        <Route index element={<FrameLayout />} />

        <Route element={<ControlLayout />}>
          <Route path={`${MATCH_PAGE}/:matchId`} element={<Match />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
