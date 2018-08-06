"use strict";

Date.prototype.Format = function (n) {
  var i = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  },
      t;
  /(y+)/.test(n) && (n = n.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
  for (t in i) {
    new RegExp("(" + t + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? i[t] : ("00" + i[t]).substr(("" + i[t]).length)));
  }return n;
};