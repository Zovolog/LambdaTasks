import axios from "axios";
import React, { useEffect, useState } from "react";
import "./interceptor";
const Profile: React.FC = (props) => {
  const access_token = localStorage.getItem("access_token");

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios({
      url: `http://142.93.134.108:1111/me`,
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((response) => {
      if (response.data.body.message === "token expired") {
        localStorage.setItem("status", response.data.body.message);
      }
      setIsLoading(false);
      console.log(response.data);
    });
  }, []);

  return <div>{isLoading ? "Loading..." : <h1>Token is valid!</h1>}</div>;
};

export default Profile;
