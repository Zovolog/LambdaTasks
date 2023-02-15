import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Authorization from "./Components/Authorization/Authorization";
import Profile from "./Components/Profile";

import { IRootState, useAppDispatch } from "./store";
import { getProfile } from "./store/auth/actionCreators";

function App() {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<Authorization />}></Route>
        <Route
          path="/me"
          element={isLoggedIn ? <Profile /> : <Navigate to="/" />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
