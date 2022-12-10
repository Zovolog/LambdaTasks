const fs = require("fs");
const axios = require("axios");

axios
  .get("https://jsonbase.com/lambdajson_type4/79")
  .then(function (response) {
    console.log(response.data);
  });
