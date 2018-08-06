"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var INTERVAL_MS = 1000 / 60;
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = function (callback) {
		setTimeout(callback, INTERVAL_MS);
	};
}

var timeouts = [];
var intervals = [];
var animites = [];
var running = false;
var count = 0;

var EditorTimer = {
	addCount: function addCount() {
		count = count + 1;
	},
	setTimeout: function setTimeout(callback, ms) {
		callback.prototype.ms = ms ? ms : INTERVAL_MS;
		callback.prototype.key = "timeout" + new Date().valueOf() + "-" + Math.round(Math.random() * 1000);
		callback.prototype.startTime = new Date().valueOf();
		callback.prototype.endTime = new Date().valueOf();
		timeouts.push(callback);
		return callback.prototype.key;
	},
	clearTimeout: function clearTimeout(key) {
		var _timeouts = timeouts.filter(function (ele, pos) {
			return ele.prototype.key == key;
		});
		if (_timeouts.length > 0) {
			var index = timeouts.indexOf(_timeouts[0]);
			if (index != -1) timeouts.disabled = true;
			return _timeouts[0];
		} else {
			return null;
		}
	},
	setInterval: function setInterval(callback, ms) {
		callback.prototype.ms = ms ? ms : INTERVAL_MS;
		callback.prototype.key = "interval" + new Date().valueOf() + "-" + Math.round(Math.random() * 1000);
		callback.prototype.startTime = new Date().valueOf();
		callback.prototype.endTime = new Date().valueOf();
		callback.prototype.lastTime = new Date().valueOf();
		intervals.push(callback);
		return callback.prototype.key;
	},
	clearInterval: function clearInterval(key) {
		var _intervals = intervals.filter(function (ele, pos) {
			return ele.prototype.key == key;
		});
		if (_intervals.length > 0) {
			var index = intervals.indexOf(_intervals[0]);
			if (index != -1) intervals.disabled = true;
			return _intervals[0];
		} else {
			return null;
		}
	},
	animate: function animate(callback) {
		window.requestAnimationFrame(EditorTimer.animate);
		if (running) {
			for (var i = 0; i < animites.length; i++) {
				animites[i]({
					count: count
				});
			}
			EditorTimer.addCount(); // count++
		}
		for (var i = 0; i < timeouts.length; i++) {
			timeouts[i].prototype.endTime = new Date().valueOf();
			if (timeouts[i].prototype.endTime - timeouts[i].prototype.startTime >= timeouts[i].prototype.ms && !timeouts[i].prototype.disabled) {
				timeouts[i].prototype.disabled = true;
				timeouts[i].call(timeouts[i].prototype, timeouts[i].prototype.endTime);
			}
		}
		for (var i = 0; i < intervals.length; i++) {
			intervals[i].prototype.endTime = new Date().valueOf();
			if (intervals[i].prototype.endTime - intervals[i].prototype.lastTime >= intervals[i].prototype.ms && !intervals[i].prototype.disabled) {
				intervals[i].prototype.lastTime = intervals[i].prototype.endTime;
				intervals[i].call(intervals[i].prototype, intervals[i].prototype.endTime);
			}
		}
		timeouts = timeouts.filter(function (ele, pos) {
			return !ele.prototype.disabled;
		});
		intervals = intervals.filter(function (ele, pos) {
			return !ele.prototype.disabled;
		});
	},
	startAnimation: function startAnimation() {
		running = true;
	},
	stopAnimation: function stopAnimation() {
		running = false;
	},
	addAnimationHandler: function addAnimationHandler(handler) {
		var _running = running;
		EditorTimer.stopAnimation(handler);
		window.requestAnimationFrame(function () {
			animites.push(handler);
			if (_running) EditorTimer.startAnimation(handler);
		});
	},
	removeAnimationHandler: function removeAnimationHandler(handler) {
		var _running = running;
		EditorTimer.stopAnimation(handler);
		window.requestAnimationFrame(function () {
			var index = animites.indexOf(handler);
			if (index != -1) animites.splice(handler, index);
			if (_running) EditorTimer.startAnimation(handler);
		});
	}
};

EditorTimer.animate();

exports.default = EditorTimer;