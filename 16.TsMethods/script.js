Array.prototype.fold = function (f, ac) {
  return (this.length === 0 && ac) || this.slice(1).fold(f, f(ac, this[0]));
};
let ar = ["0", 0, 1, 2, 3, 4, 9];
console.log(ar.fold((x, y) => x + y, 1));

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

Array.prototype.count = function (key) {
  let res = 0;
  for (let i = 0; i < this.length; i++) {
    res += this[i][key];
  }
  return res;
};

const arra4 = [
  {
    a: 1,
    b: 4,
    c: 1,
  },
  {
    a: 4,
    b: "f",
    c: 7,
  },
  {
    a: 46,
    b: "fg",
    c: 70,
  },
  {
    a: 46,
    b: "i",
    c: 75,
  },
];

console.log(arra4.groupBy((el) => el.a));
