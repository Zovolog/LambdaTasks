import React, { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { loginUser } from "../../store/auth/actionCreators";

import "./Form.css";

const Form: React.FC = (props) => {
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginUser({ login, password }));
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <input
          placeholder="Email"
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <input
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="row-bts">
          <button onClick={handleSubmit}>login</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
