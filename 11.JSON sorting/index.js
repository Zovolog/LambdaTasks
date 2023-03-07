const fs = require("fs");
const axios = require("axios");
const path = require("path");
const urls = fs.readFileSync("url.txt", "utf8");

const arr = urls.split(`\n`);
function searchKeys(obj, nameOfKey) {
  let keys = Object.keys(obj);
  if (obj[nameOfKey] !== undefined) {
    return obj[nameOfKey];
  } else {
    for (let i = 0; i < keys.length; i++) {
      if (typeof obj[keys[i]] === "object") {
        const result = searchKeys(obj[keys[i]], nameOfKey);
        if (result !== undefined) {
          return result;
        }
      }
    }
  }
}
async function countingValues(arr) {
  let countTrue = 0;
  let countFalse = 0;
  for (let i = 0; i < arr.length; i++) {
    try {
      await axios(arr[i]).then(function (response) {
        if (searchKeys(response.data, "isDone")) {
          countTrue++;
        } else {
          countFalse++;
        }
      });
    } catch (err) {
      try {
        await axios(arr[i]).then(function (response) {
          if (searchKeys(response.data, "isDone")) {
            countTrue++;
          } else {
            countFalse++;
          }
        });
      } catch (err) {
        console.log(`Request ${i} wasn't good`);
      }
    }
  }
  console.log(`Значень True: ${countTrue},`, `\nЗначеень False: ${countFalse}`);
}

countingValues(arr);
