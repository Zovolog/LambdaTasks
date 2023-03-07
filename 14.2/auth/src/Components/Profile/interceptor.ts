import axios from "axios";

axios.interceptors.response.use(
  function (config) {
    const status = localStorage.getItem("status");

    if (status === "token expired") {
      const refresh_token = localStorage.getItem("refresh_token");
      const instance = axios.create({
        baseURL: "http://142.93.134.108:1111",
        headers: { Authorization: `Bearer ${refresh_token}` },
      });

      instance.post("/refresh").then((response) => {
        localStorage.setItem("access_token", response.data.body.access_token);
        localStorage.setItem("refresh_token", response.data.body.refresh_token);
        const token = localStorage.getItem("access_token");
        axios({
          url: `http://142.93.134.108:1111/me`,
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          console.log(response.data);
          localStorage.setItem("status", response.data.body.message);
        });
      });
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
