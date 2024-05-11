import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path={SIGNIN_PAGE} element={<SigninPage />} /> */}
        <Route index element={<MainLayout />}>
          {/* <Route path={"/current-match"} element={<Home />} /> */}
        </Route>
        {/* <Route index element={<FrameLayout />} /> */}

        {/* <Route element={<ControlLayout />}>
          <Route path={`${MATCH_PAGE}/:matchId`} element={<Match />} />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
