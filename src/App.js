import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path={SIGNIN_PAGE} element={<SigninPage />} /> */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
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
