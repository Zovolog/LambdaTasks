Array.prototype.all = function (e) {
    var count = 0;
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
    var res = new Map();
    for (var i = 0; i < this.length; i++) {
        res.set(this[i][key], Object.values(this[i]).join(" "));
    }
    return res;
};
Array.prototype.average = function () {
    var number = 0;
    for (var i = 0; i < this.length; i++) {
        number += this[i];
    }
    return number / this.length;
};
Array.prototype.chunked = function chunk(size) {
    var subarray = [];
    for (var i = 0; i < Math.ceil(this.length / size); i++) {
        subarray[i] = this.slice(i * size, i * size + size);
    }
    return subarray;
};
Array.prototype.distinctBy = function () {
    var arr = Array.from(new Set(this));
    return arr;
};
Array.prototype.filter = function (callback) {
    var res = [];
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            res.push();
        }
    }
    return res;
};
Array.prototype.filterNot = function (callback) {
    var res = [];
    for (var i = 0; i < this.length; i++) {
        if (!callback(this[i])) {
            res.push(this[i]);
        }
    }
    return res;
};
Array.prototype.filterIndexed = function (callback) {
    var res = [];
    for (var i = 0; i < this.length; i++) {
        if (callback(i, this[i])) {
            res.push(this[i]);
        }
    }
    return res;
};
Array.prototype.find = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            return this[i];
        }
    }
    return null;
};
Array.prototype.flatten = function () {
    return this.flat(Infinity);
};
Array.prototype.maxBy = function (callback) {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        arr.push(callback(this[i]));
    }
    arr.sort(function (a, b) {
        return b - a;
    });
    return arr[0];
};
var arr1 = [1, 3, 4, 5, 2];
var arr2 = ["1", "1", "1"];
console.log(arr1.any(3));
console.log(arr2.all("1"));
console.log(arr1.filter(function (it) { return it % 2 == 0; }));
