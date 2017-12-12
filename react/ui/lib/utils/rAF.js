'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var lastTime = 0;
var vendors = ['webkit', 'moz'];
var rAF = undefined,
    cAF = undefined;

for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  rAF = window[vendors[x] + 'RequestAnimationFrame'];
  cAF = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
  window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!rAF) {
  rAF = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!cAF) {
  cAF = function (id) {
    clearTimeout(id);
  };
}

exports['default'] = {
  rAF: rAF,
  cAF: cAF
};
module.exports = exports['default'];