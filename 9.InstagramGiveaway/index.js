const fs = require("fs");

console.time();

function uniqueValues() {
  let str = "";
  for (let i = 0; i < 20; i++) {
    str += `\n${fs.readFileSync(`data/out${i}.txt`, "utf8")}`;
  }
  let arr = str.split("\n");
  arr.pop();
  let res = new Set(arr).size;
  return res;
}

function existInAllFiles() {
  let count = 0;
  let arr = [];
  let result = {};
  for (let i = 0; i < 20; i++) {
    arr.push(
      ...Array.from(
        new Set(fs.readFileSync(`data/out${i}.txt`, "utf8").split("\n"))
      )
    );
  }
  arr.forEach(function (a) {
    if (result[a] != undefined) ++result[a];
    else result[a] = 1;
  });
  for (var key in result) {
    if (result[key] === 20) {
      count++;
    }
  }
  return count;
}

function existInAtLeastTen() {
  let count = 0;
  let arr = [];
  let result = {};
  for (let i = 0; i < 20; i++) {
    arr.push(
      ...Array.from(
        new Set(fs.readFileSync(`data/out${i}.txt`, "utf8").split("\n"))
      )
    );
  }
  arr.forEach(function (a) {
    if (result[a] != undefined) ++result[a];
    else result[a] = 1;
  });
  for (var key in result) {
    if (result[key] >= 10) {
      count++;
    }
  }
  return count;
}
console.log(
  `Унікальних значень: ${uniqueValues()}`,
  `Значень які повторюються в 10 файлах: ${existInAllFiles()}`,
  `Значень які повторюються в 10 файлах: ${existInAtLeastTen()}`
);

console.timeEnd();
