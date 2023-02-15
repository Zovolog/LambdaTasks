import React from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../store";
import { logoutUser } from "../store/auth/actionCreators";

const Profile = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );
  return (
    <div>
      <h2>Chupapi</h2>
      <button
        onClick={() => {
          dispatch(logoutUser());
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
