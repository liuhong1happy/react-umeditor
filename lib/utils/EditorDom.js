"use strict";

var EditorDOM = {
	stopPropagation: function stopPropagation(e) {
		e = e || event;
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	}
};
module.exports = EditorDOM;