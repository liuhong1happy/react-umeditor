"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _EditorDOM = require("./EditorDOM");

var _EditorDOM2 = _interopRequireDefault(_EditorDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

NodeList.prototype.toArray = function () {
	var nodes = [];
	for (var i = 0; i < this.length; i++) {
		nodes.push(this[i]);
	}
	return nodes;
};

var EditorSelection = {
	range: null,
	selection: null,
	storedRange: false,
	customIcons: [],
	getSelection: function getSelection() {
		if (window.getSelection) return window.getSelection();else if (document.getSelection) return document.getSelection();else if (document.selection) return document.selection.createRange();else return null;
	},
	cloneRange: function cloneRange() {
		// cloneRange
		if (this.storedRange) return;
		this.selection = this.getSelection();
		this.selection.removeAllRanges();
		if (this.selection && this.range) {
			this.selection.addRange(this.range.cloneRange());
			this.range = this.range.cloneRange();
		}
	},
	getTextNodes: function getTextNodes() {
		if (!this.range) return [];
		if (this.range.collapsed) return [];
		var parent = this.range.commonAncestorContainer;
		var startNode = this.range.startContainer;
		var startOffset = this.range.startOffset;
		var endNode = this.range.endContainer;
		var endOffset = this.range.endOffset;
		var textNodes = [];

		if (startNode === endNode && _EditorDOM2.default.isTextNode(startNode)) {
			textNodes.push({
				childNode: startNode,
				startOffset: startOffset,
				endOffset: endOffset
			});
		} else {
			var childNodes = parent.childNodes.toArray(),
			    startFlag = false;
			var childNode = childNodes.shift();
			while (childNode) {
				if (_EditorDOM2.default.isTextNode(childNode)) {
					if (childNode === startNode) {
						textNodes.push({
							childNode: childNode,
							startOffset: startOffset,
							endOffset: childNode.length
						});
						startFlag = true;
					} else if (childNode === endNode) {
						textNodes.push({
							childNode: childNode,
							startOffset: 0,
							endOffset: endOffset
						});
					} else if (textNodes.length > 0) {
						textNodes.push({
							childNode: childNode,
							startOffset: 0,
							endOffset: childNode.length
						});
					}
				}
				if (childNode == endNode) {
					break;
				}
				var newChildNodes = childNode.childNodes.toArray();

				childNodes = newChildNodes.concat(childNodes);
				childNode = childNodes.shift();
			}
		}
		return textNodes;
	},
	getSpanNodes: function getSpanNodes() {
		if (!this.range) return [];
		if (this.range.collapsed) return [];
		var parent = this.range.commonAncestorContainer;
		if (parent.nodeType == 3) parent = parent.parentNode;
		var startNode = this.range.startContainer;
		var endNode = this.range.endContainer;
		var spanNodes = [];

		if (_EditorDOM2.default.isSpanNode(parent)) {
			spanNodes.push(parent);
		}
		if (startNode === endNode && _EditorDOM2.default.isSpanNode(startNode)) {
			spanNodes.push(startNode);
		} else {
			var childNodes = parent.childNodes.toArray(),
			    i = 0,
			    startFlag = false;
			var childNode = childNodes.shift();
			while (childNode) {
				if (childNode === startNode) {
					startFlag = true;
					if (_EditorDOM2.default.isSpanNode(childNode.parentNode)) {
						spanNodes.push(childNode.parentNode);
					}
				}
				if (_EditorDOM2.default.isSpanNode(childNode) && startFlag) {
					spanNodes.push(childNode);
				}
				if (childNode == endNode) {
					break;
				}
				var newChildNodes = childNode.childNodes.toArray();

				childNodes = newChildNodes.concat(childNodes);
				childNode = childNodes.shift();
			}
		}

		var resultNodes = [];
		for (var i = 0; i < spanNodes.length; i++) {
			if (resultNodes.indexOf(spanNodes[i]) == -1) {
				resultNodes.push(spanNodes[i]);
			}
		}

		return resultNodes;
	},
	getParagraphs: function getParagraphs() {
		var textNodes = this.getTextNodes();
		var parents = [];
		for (var i = 0; i < textNodes.length; i++) {
			var currentNode = null;
			var tagName = textNodes[i].childNode.parentNode.tagName || textNodes[i].childNode.parentNode.nodeName;
			switch (tagName.toUpperCase()) {
				case "FONT":
					currentNode = textNodes[i].childNode.parentNode;
					break;
				default:
					currentNode = textNodes[i].childNode;
					break;
			}

			if (parents.indexOf(currentNode.parentNode) == -1) parents.push(currentNode.parentNode);
		}
		return parents;
	},
	getCommonAncestor: function getCommonAncestor() {
		if (this.range.collapsed) return null;
		var parent = this.range.commonAncestorContainer;
		return parent;
	},
	addRange: function addRange(startContainer, startOffset, endContainer, endOffset) {
		// addRange
		this.selection = this.getSelection();
		this.selection.removeAllRanges();
		if (this.selection && this.range && startContainer instanceof Node && endContainer instanceof Node) {
			this.range.setStart(startContainer, startOffset);
			this.range.setEnd(endContainer, endOffset);
			this.selection.addRange(this.range.cloneRange());
			this.range = this.range.cloneRange();
		}
	},
	validateSelection: function validateSelection(selection) {
		var selection = selection || this.selection;
		var anchorNode = selection.anchorNode;
		if (!anchorNode) return false;
		var parentNode = anchorNode.parentNode;
		if (!parentNode) return false;
		if (anchorNode.offsetParent && anchorNode.offsetParent.className == "editor-toolbar") return false;
		if (parentNode.offsetParent && parentNode.offsetParent.className == "editor-toolbar") return false;
		return true;
	},
	validateRange: function validateRange(parentNode, range) {
		var rangeParentNode = range.startContainer.parentNode;
		if (rangeParentNode == parentNode) {
			return true;
		} else {
			var findClass = 'find-range-node-' + Math.random().toFixed(10).replace('.', '-');
			rangeParentNode.classList.add(findClass);
			var item = parentNode.querySelector('.' + findClass);
			rangeParentNode.classList.remove(findClass);
			return !!item;
		}
	},
	createRange: function createRange() {
		if (this.storedRange) return;
		this.selection = this.getSelection();
		if (!this.validateSelection()) return;
		if (this.selection && this.selection.rangeCount > 0) {
			this.range = this.selection.getRangeAt(0).cloneRange();
		} else {
			this.range = null;
		}
	},
	clearRange: function clearRange() {
		if (this.storedRange) return;
		this.selection = this.getSelection();
		this.selection.removeAllRanges();
	},
	getRangeState: function getRangeState() {
		var _this = this;

		var rangeState = {};
		// init icons state
		var canActiveIcons = "bold italic underline strikethrough fontborder superscript subscript justifycenter justifyleft justifyright";
		var icons = canActiveIcons.split(" ");
		for (var i = 0; i < icons.length; i++) {
			rangeState[icons[i]] = { icon: icons[i], active: false };
		}
		// change  icons state
		if (this.range) {
			// IE 没有parentElement 固修改成parentNode

			this.customIcons.forEach(function (cIcon) {
				if (cIcon && cIcon.mapRangeState) {
					rangeState = cIcon.mapRangeState(rangeState, _this);
				}
			});

			var parentElement = this.range.startContainer.parentNode;
			while ((parentElement.tagName || parentElement.nodeName).toUpperCase() != "DIV") {
				var tagName = parentElement.tagName || parentElement.nodeName;
				switch (tagName.toUpperCase()) {
					case "I":
						rangeState["italic"] = { active: true, icon: "italic" };
						break;
					case "B":
						rangeState["bold"] = { active: true, icon: "bold" };
						break;
					case "U":
						rangeState["underline"] = { active: true, icon: "underline" };
						break;
					case "STRIKE":
						rangeState["strikethrough"] = { active: true, icon: "strikethrough" };
						break;
					case "SUP":
						rangeState["superscript"] = { active: true, icon: "superscript" };
						break;
					case "SUB":
						rangeState["subscript"] = { active: true, icon: "subscript" };
						break;
					case "FONT":
						rangeState["forecolor"] = { color: parentElement.color, icon: "forecolor" };
						rangeState["backcolor"] = { color: parentElement.style.backgroundColor, icon: "backcolor" };
						rangeState["fontsize"] = { value: parentElement.size, icon: "fontsize" };
						rangeState["fontfamily"] = { value: parentElement.face, icon: "fontfamily" };
						break;
					case "P":
					case "H1":
					case "H2":
					case "H3":
					case "H5":
					case "H6":
						var textAlign = parentElement.style.textAlign ? parentElement.style.textAlign : "left";
						var fontFamily = parentElement.style.fontFamily ? parentElement.style.fontFamily : "宋体,SimSun";
						var fontSize = parentElement.style.fontSize ? parentElement.style.fontSize : "12px";
						rangeState["justifycenter"] = { active: textAlign == "center", icon: "subscript" };
						rangeState["justifyleft"] = { active: textAlign == "left", icon: "subscript" };
						rangeState["justifyright"] = { active: textAlign == "right", icon: "subscript" };
						rangeState["paragraph"] = { value: parentElement.tagName.toLowerCase(), icon: "paragraph" };
						break;
					case "BLOCKQUOTE":
						rangeState["indent"] = { active: true, icon: "indent" };
						rangeState["outdent"] = { active: false, icon: "outdent" };
						break;
					case "SPAN":
						var className = parentElement.className || "";
						if (className.indexOf("font-border") != -1) {
							rangeState["fontborder"] = { active: true, icon: "fontborder" };
						}
						break;
				}
				parentElement = parentElement.parentNode;
			}
		}

		if (!rangeState["forecolor"]) rangeState["forecolor"] = { color: 'transparent', icon: "forecolor" };
		if (!rangeState["backcolor"]) rangeState["backcolor"] = { color: 'transparent', icon: "backcolor" };
		if (!rangeState["fontsize"] || !rangeState["fontsize"].value) rangeState["fontsize"] = { value: "3", icon: "fontsize" };
		if (!rangeState["paragraph"] || !rangeState["paragraph"].value) rangeState["paragraph"] = { value: "p", icon: "fontsize" };
		if (!rangeState["fontfamily"] || !rangeState["fontfamily"].value) rangeState["fontfamily"] = { value: "宋体, SimSun", icon: "fontfamily" };
		if (!rangeState["indent"]) {
			rangeState["outdent"] = { active: true, icon: "outdent" };
			rangeState["indent"] = { active: false, icon: "indent" };
		}
		return rangeState;
	},
	storeRange: function storeRange() {
		this.storedRange = this.range ? this.range.cloneRange() : null;
	},
	restoreRange: function restoreRange() {
		this.range = this.storedRange ? this.storedRange.cloneRange() : null;
		this.storedRange = null;
		this.cloneRange();
	},
	insertNode: function insertNode(node) {

		if (this.range) {
			EditorSelection.range.insertNode(node);
			var lastNode = node.lastChild || node;
			if (lastNode) {
				// this.range.setEndAfter(lastNode);
				this.range.setStartAfter(lastNode);
				this.range.setEndAfter(lastNode);
			}
			this.selection.removeAllRanges();
			this.selection.addRange(this.range);
		}
	}
};
exports.default = EditorSelection;