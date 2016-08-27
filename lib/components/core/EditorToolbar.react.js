'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var EditorIcon = require('./EditorIcon.react');

var _require = require('../../constants/EditorConstants');

var EditorIconTypes = _require.EditorIconTypes;

var EditorHistory = require('../../utils/EditorHistory');

var EditorToolbar = React.createClass({
	displayName: 'EditorToolbar',

	propTypes: {
		icons: React.PropTypes.array
	},
	getDefaultProps: function getDefaultProps() {
		return {
			icons: []
		};
	},
	handleIconClick: function handleIconClick(e, state) {

		if (this.props.onIconClick) {
			this.props.onIconClick(e, state);
		}
	},
	getNameByValue: function getNameByValue(arr, value) {
		var filterArr = arr.filter(function (ele, pos) {
			return ele.value == value;
		});
		if (filterArr.length > 0) {
			return filterArr[0].name;
		} else {
			return "";
		}
	},
	getIcons: function getIcons() {
		var editorState = this.props.editorState;
		editorState.icons["undo"] = { disabled: !EditorHistory.canUndo() };
		editorState.icons["redo"] = { disabled: !EditorHistory.canRedo() };
		if (editorState.icons["fontsize"]) editorState.icons["fontsize"].name = this.getNameByValue(this.props.fontsize, editorState.icons["fontsize"].value);
		if (editorState.icons["paragraph"]) editorState.icons["paragraph"].name = this.getNameByValue(this.props.paragraph, editorState.icons["paragraph"].value);
		if (editorState.icons["fontfamily"]) editorState.icons["fontfamily"].name = this.getNameByValue(this.props.fontfamily, editorState.icons["fontfamily"].value);

		var icons = this.props.icons;
		var _icons = icons.join(" ").replace(/\|/gm, "separator").split(" ");
		_icons = _icons.filter(function (ico) {
			return ico != "";
		});
		var returnArray = [];
		for (var i = 0; i < _icons.length; i++) {
			returnArray[i] = EditorIconTypes[_icons[i]];
			returnArray[i].onClick = this.handleIconClick;
			returnArray[i].icon = _icons[i];
			if (editorState.icons[_icons[i]]) {
				returnArray[i].disabled = !!editorState.icons[_icons[i]].disabled;
				returnArray[i].active = !!editorState.icons[_icons[i]].active;
				returnArray[i].color = editorState.icons[_icons[i]].color;
				returnArray[i].value = editorState.icons[_icons[i]].value;
				returnArray[i].name = editorState.icons[_icons[i]].name;
			}
			returnArray[i].showHtml = !!editorState.showHtml;
		}
		return returnArray;
	},
	render: function render() {
		var icons = this.getIcons();
		return React.createElement(
			'div',
			{ className: 'editor-toolbar' },
			icons.map(function (icon, pos) {
				var props = icon;
				return React.createElement(EditorIcon, _extends({ key: pos }, props));
			}),
			this.props.children
		);
	}
});

module.exports = EditorToolbar;