"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var EditorDom = {
	stopPropagation: function stopPropagation(e) {
		e = e || event;
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},
	isTextNode: function isTextNode(node) {
		if (!node) return false;
		return node.nodeType == 3 || node.nodeName == "#text";
	},
	isSpanNode: function isSpanNode(node) {
		if (!node) return false;
		return node.nodeType == 1 && node.nodeName == "SPAN";
	},
	isNullOfTextNode: function isNullOfTextNode(node) {
		if (this.isTextNode(node)) {
			return node.nodeValue == "";
		} else {
			return false;
		}
	},
	getOffsetRootParentPosition: function getOffsetRootParentPosition(target, root) {
		var rootRect = root.getBoundingClientRect();
		var targetRect = target.getBoundingClientRect();

		return {
			x: targetRect.x - rootRect.x,
			y: targetRect.y - rootRect.y,
			w: targetRect.width,
			h: targetRect.height
		};
	},
	isEditorDom: function isEditorDom(target, root) {
		var parentNode = target.parentNode;
		while (parentNode && parentNode != root) {
			parentNode = parentNode.parentNode;
		}
		return parentNode == root;
	},
	createTextNode: function createTextNode(text) {
		return document.createTextNode(text);
	},
	createNodeByTag: function createNodeByTag(tag, html) {
		var node = document.createElement(tag);
		node.innerHTML = html;
		return node;
	},
	createHR: function createHR() {
		var node = document.createElement('hr');
		return node;
	},
	createBR: function createBR() {
		var node = document.createElement('br');
		return node;
	},
	focusNode: function focusNode(node) {
		var scrollTop = node.scrollTop;
		var scrollLeft = node.scrollLeft;
		node.focus && node.focus();
		node.scrollTo(scrollLeft, scrollTop);
	}
};

exports.default = EditorDom;