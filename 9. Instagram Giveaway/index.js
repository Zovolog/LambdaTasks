const fs = require("fs");

console.time();

function uniqueValues() {
  let str = "";
  for (let i = 0; i < 20; i++) {
    str += `\n${fs.readFileSync(`data/out${i}.txt`, "utf8")}`;
  }
  let arr = str.split("\n");
  let popped = arr.pop();
  let res = new Set(arr).size;
  return res;
}

function existInAllFiles() {
  let str = "";
  for (let i = 0; i < 20; i++) {
    str += `\n${fs.readFileSync(`data/out${i}.txt`, "utf8")}`;
  }
  let arr = str.split("\n");
  let popped = arr.pop();
  let res = new Set(arr).size;
  return arr.length - res;
}

function existInAtLeastTen() {
  let str = "";
  for (let i = 0; i < 10; i++) {
    str += `\n${fs.readFileSync(`data/out${i}.txt`, "utf8")}`;
  }
  let arr = str.split("\n");
  let popped = arr.pop();
  let res = new Set(arr).size;
  return arr.length - res;
}
console.log(
  `Унікальних значень: ${uniqueValues()}`,
  `Неунікальних значень: ${existInAllFiles()}`,
  `Значень які повторюються в 10 файлах: ${existInAtLeastTen()}`
);

console.timeEnd();
