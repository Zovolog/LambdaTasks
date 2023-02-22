import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Registration.css";

const Regitsration: React.FC = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const sendData = (e: any) => {
    e.preventDefault();
    axios({
      url: `http://142.93.134.108:1111/sign_up`,
      method: "post",
      data: {
        email: login,
        password: password,
      },
    }).then(function (response) {
      console.log(response.data);
    });
  };

  return (
    <div className="form">
      <h1>Registration page</h1>
      <input
        placeholder="Type your login"
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        placeholder="Type your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="row-bts">
        <button className="bt-form" onClick={sendData}>
          Register
        </button>
        <Link to={"/login"}>
          <button className="bt-form">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Regitsration;
