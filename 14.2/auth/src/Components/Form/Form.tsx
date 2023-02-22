import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Form.css";

const Form: React.FC = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginning = (e: any) => {
    e.preventDefault();
    axios({
      url: `http://142.93.134.108:1111/login?email=${login}&password=${password}`,
      method: "post",
    }).then(function (response) {
      localStorage.setItem("access_token", response.data.body.access_token);
      localStorage.setItem("refresh_token", response.data.body.refresh_token);

      navigate("/me");
    });
  };
  return (
    <div className="form">
      <h1>Login page</h1>
      <input onChange={(e) => setLogin(e.target.value)} placeholder="Login" />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div className="row-bts">
        <Link to={"/register"}>
          <button className="bt-form">Sign up</button>
        </Link>
        <button className="bt-form" onClick={loginning}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Form;
