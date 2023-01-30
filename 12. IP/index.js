import express from "express";
import * as fs from 'fs';

const urls = fs.readFileSync("IP2LOCATION-LITE-DB1.CSV", "utf8");
const app = express();

let elements = urls.split("\n");

function conversionIp(ipAdress) {
  let ipAddressInArray = ipAdress.split(".");
  let result = 0;
  for (let i = 0; i < ipAddressInArray.length; i++) {
    let power = 3 - i;
    let ip = Number(ipAddressInArray[i]);
    result += ip * Math.pow(256, power);
  }
  return result;
}

function normalViewIp(num) {
  let first = Math.trunc(num / Math.pow(256, 3));
  let second = Math.trunc((num - first * Math.pow(256, 3)) / Math.pow(256, 2));
  let third = Math.trunc(
    (num - first * Math.pow(256, 3) - second * Math.pow(256, 2)) / 256
  );
  let fourth = Math.trunc(
    num - first * Math.pow(256, 3) - second * Math.pow(256, 2) - third * 256
  );
  let res = [first, second, third, fourth];
  return res.join(".");
}

function finding(arr, ip) {
  let num = conversionIp(ip);
  let res = {};
  res.ip = ip;
  for (let i = 0; i < arr.length; i++) {
    let elem = arr[i].replace(/["]/g, "").split(",");
    if (num >= Number(elem[0]) && num <= Number(elem[1])) {
      res.ranges = {
        first: normalViewIp(elem[0]),
        second: normalViewIp(elem[1]),
      };
      res.tag = elem[2];
      res.country = elem[3];
    }
  }
  console.log(res);
}

app.get("/", (req, res) => {
  res.send("<h1></h2>");
  var ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  finding(elements, ip);
});

app.listen(3000, () => {
  console.log("Server is done");
});
