'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var EditorEventEmitter = assign({}, EventEmitter.prototype, {
	editorSum: 0,
	editorStack: [],
	isStart: false,
	startTime: null,
	addStartListener: function addStartListener(type, callback) {
		if (this.editorStack.length == 0 && this.isStart == false) {
			this.startTime = this.startTime || new Date();
		}
		this.editorSum = this.editorSum + 1;
		this.editorStack.push(type);
		this.on(type, callback);

		this.emitNextListener();
	},
	removeStartListener: function removeStartListener(type, callback) {
		this.removeListener(type, callback);
		var index = this.editorStack.indexOf(type);
		this.editorStack.splice(index, 1);
	},
	mountEditorSuccess: function mountEditorSuccess() {
		this.isStart = false;
		this.emitNextListener();
	},
	emitNextListener: function emitNextListener() {
		if (this.editorStack.length == 0) this.isStart = false;else if (this.isStart == false) {
			this.isStart = true;
			var type = this.editorStack.shift();
			this.emit(type);
			var mountTime = new Date();
			this.startTime = this.startTime || new Date();
			console.log("emitNextListener:" + type + " " + (mountTime.valueOf() - this.startTime.valueOf()) + "ms");
		}
	}
});
EditorEventEmitter.setMaxListeners(1000);
module.exports = EditorEventEmitter;