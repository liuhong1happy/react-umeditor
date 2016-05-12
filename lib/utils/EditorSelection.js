"use strict";

var EditorSelection = {
	range: null,
	selection: null,
	storedRange: false,
	getSelection: function getSelection() {
		if (window.getSelection) return window.getSelection();else if (document.getSelection) return document.getSelection();else if (document.selection) return document.selection.createRange();else return null;
	},
	addRange: function addRange() {
		if (this.storedRange) return;
		this.selection = this.getSelection();
		this.selection.removeAllRanges();
		if (this.selection && this.range) {
			this.selection.addRange(this.range.cloneRange());
			this.range = this.range.cloneRange();
		}
	},
	createRange: function createRange() {
		if (this.storedRange) return;
		this.selection = this.getSelection();
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
		var rangeState = {};
		// init icons state
		var canActiveIcons = "bold italic underline strikethrough";
		var icons = canActiveIcons.split(" ");
		for (var i = 0; i < icons.length; i++) {
			rangeState[icons[i]] = { icon: icons[i], active: false };
		}
		// change  icons state
		if (this.range) {
			var parentElement = this.range.startContainer.parentElement;
			while (parentElement.tagName.toUpperCase() != "DIV") {
				switch (parentElement.tagName.toUpperCase()) {
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
						break;
					case "P":
						var textAlign = parentElement.style.textAlign ? parentElement.style.textAlign : "left";
						rangeState["justifycenter"] = { active: textAlign == "center", icon: "subscript" };
						rangeState["justifyleft"] = { active: textAlign == "left", icon: "subscript" };
						rangeState["justifyright"] = { active: textAlign == "right", icon: "subscript" };
						break;

				}
				parentElement = parentElement.parentElement;
			}
		}

		if (!rangeState["forecolor"]) rangeState["forecolor"] = { color: 'transparent', icon: "forecolor" };
		if (!rangeState["backcolor"]) rangeState["backcolor"] = { color: 'transparent', icon: "backcolor" };

		return rangeState;
	},
	storeRange: function storeRange() {
		this.storedRange = this.range ? this.range.cloneRange() : null;
	},
	restoreRange: function restoreRange() {
		this.range = this.storedRange ? this.storedRange.cloneRange() : null;
		this.storedRange = null;
		this.addRange();
	}
};
module.exports = EditorSelection;