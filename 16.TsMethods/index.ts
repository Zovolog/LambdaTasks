interface Array<T> {
  all(e: T): boolean;
  any(e: T): boolean;
  average(): number;
  chunked(size: number): [];
  associateBy(key: string): Map<string, T>;
  distinctBy(): T;
  filter(callback: T): [];
  filterNot(callback: T): [];
  filterIndexed(callback: T): [];
  find(callback: T): T | null;
  findLast(callback: T): T | null;
  flatten(): [];
  maxBy(callback: T): number;
  minBy(callback: T): number;
  fold(f: T, acc: T): T;
  groupBy(keyFunction: Function): Object;
  count(key: T): T;
}

Array.prototype.all = function (e) {
  let count = 0;
  for (var i = 0; i < this.length; i++) {
    if (this[i] === e) {
      count++;
    }
  }
  if (count === this.length) {
    return true;
  }
  return false;
};

Array.prototype.any = function (e) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === e) {
      return true;
    }
  }
  return false;
};

Array.prototype.associateBy = function (key) {
  const res = new Map();

  for (let i = 0; i < this.length; i++) {
    res.set(this[i][key], Object.values(this[i]).join(" "));
  }
  return res;
};

Array.prototype.average = function () {
  let number = 0;
  for (var i = 0; i < this.length; i++) {
    number += this[i];
  }
  return number / this.length;
};

Array.prototype.chunked = function chunk(size) {
  let subarray: any = [];
  for (let i = 0; i < Math.ceil(this.length / size); i++) {
    subarray[i] = this.slice(i * size, i * size + size);
  }
  return subarray;
};

Array.prototype.distinctBy = function () {
  let arr = Array.from(new Set(this));
  return arr;
};

Array.prototype.filter = function (callback) {
  let res: any = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      res.push(this[i]);
    }
  }
  return res;
};

Array.prototype.filterNot = function (callback) {
  let res: any = [];
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i])) {
      res.push(this[i]);
    }
  }
  return res;
};

Array.prototype.filterIndexed = function (callback) {
  let res: any = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(i, this[i])) {
      res.push(this[i]);
    }
  }
  return res;
};

Array.prototype.find = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      return this[i];
    }
  }
  return null;
};
Array.prototype.findLast = function (callback) {
  let res = [];
  for (let i = this.length; i >= 0; i--) {
    if (callback(this[i])) {
      return this[i];
    }
  }
  return null;
};
Array.prototype.flatten = function () {
  return this.flat(Infinity);
};
Array.prototype.fold = function (f, ac) {
  return (this.length === 0 && ac) || this.slice(1).fold(f, f(ac, this[0]));
};
Array.prototype.maxBy = function (callback) {
  let arr: any = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(callback(this[i]));
  }
  arr.sort((a, b) => {
    return b - a;
  });
  return arr[0];
};

Array.prototype.minBy = function (callback) {
  let arr: any = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(callback(this[i]));
  }
  arr.sort((a, b) => {
    return a - b;
  });
  return arr[0];
};

Array.prototype.count = function (key) {
  let res = 0;
  for (let i = 0; i < this.length; i++) {
    res += this[i][key];
  }
  return res;
};
Array.prototype.groupBy = function (keyFunction) {
  var groups = {};
  this.forEach(function (el) {
    var key = keyFunction(el);
    if (key in groups == false) {
      groups[key] = [];
    }
    groups[key].push(el);
  });
  return Object.keys(groups).map(function (key) {
    return {
      key: key,
      values: groups[key],
    };
  });
};

let arr1: any = [1, 3, 4, 5, 2, 2, 2, 8];
let arr2: any = ["1", "1", "1"];
let arr3: any = ["1", "1", "1", "1", "2", "144", "", "55", "8"];
let object = [
  { me: "Yehor", age: 12 },
  { me: "Yehor543", age: 19 },
  { me: "Yehor", age: 12 },
];
// console.log(arr1.any(3));
// console.log(arr2.all("1"));
// console.log(arr1.average());
// console.log(obj.associateBy("me"));
// console.log(arr3.chunked(3));
// console.log(arr1.distinctBy());
console.log(arr1.filter((it: number) => it % 2 === 0));
console.log(arr1.filterNot((it: number) => it % 3 === 0));
console.log(arr1.filterIndexed((i, it: number) => i % it === 0));
console.log(arr1.find((it: number) => it % 2 === 0));
console.log(arr1.findLast((it: number) => it % 2 === 0));
console.log(arr1.fold((x, y) => x - y, 2));

console.log(object.groupBy((obj) => obj.me));
