import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { IRootState } from "../../store";
import Form from "../Form/Form";
import "./Authorization.css";

const Authorization = () => {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );
  return (
    <div>{isLoggedIn ? <Navigate to="/me" replace={true} /> : <Form />}</div>
  );
};

export default Authorization;
