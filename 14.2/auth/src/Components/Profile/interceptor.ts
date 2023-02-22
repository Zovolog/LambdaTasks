import axios from "axios";

axios.interceptors.response.use(
  function (config) {
    const status = localStorage.getItem("status");
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    if (status === "token expired") {
      axios({
        url: `http://142.93.134.108:1111/refresh`,
        method: "post",
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      }).then((response) => {
        if (status === "token expired") {
          localStorage.setItem("access_token", response.data.body.access_token);
          localStorage.setItem(
            "refresh_token",
            response.data.body.refresh_token
          );
        }
      });
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
