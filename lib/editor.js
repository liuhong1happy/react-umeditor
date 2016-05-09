'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');

var _require = require('./constants/EditorConstants');

var EditorIconTypes = _require.EditorIconTypes;

/**
* @icon: 图标名称 string
* @disabled: 是否禁用 bool
* @onClick: 暴露点击事件 function
* @title: 提示 string
* @active: 是否选中 bool
**/
var EditorIcon = React.createClass({
	displayName: 'EditorIcon',

	render: function render() {
		var _props = this.props;
		var icon = _props.icon;

		var props = _objectWithoutProperties(_props, ['icon']);

		return React.createElement('span', _extends({ className: "editor-icon icon-" + icon }, props));
	}
});

var EditorToolbar = React.createClass({
	displayName: 'EditorToolbar',

	getInitialState: function getInitialState() {
		return {
			icons: ["source | undo redo | bold italic underline strikethrough | superscript subscript | ", "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ", "cleardoc | paragraph fontfamily fontsize | justifyleft justifycenter justifyright | link unlink | ", "emotion image video | map | horizontal print preview drafts formula"],
			selection: null
		};
	},
	handleIconClick: function handleIconClick(e, state) {},
	getIcons: function getIcons() {
		var icons = this.state.icons;
		var _icons = icons.join(" ").replace(/\|/gm, "separator").split(" ");
		_icons = _icons.filter(function (ico) {
			return ico != "";
		});
		var returnArray = [];
		for (var i = 0; i < _icons.length; i++) {
			returnArray[i] = EditorIconTypes[_icons[i]];
			returnArray[i].onClick = this.handleIconClick;
			returnArray[i].icon = _icons[i];
		}
		// 加入选中对象的状态
		return returnArray;
	},
	render: function render() {
		var icons = this.getIcons();

		return React.createElement(
			'div',
			{ className: 'editor-toolbar' },
			icons.map(function (icon) {
				var props = icon;
				return React.createElement(EditorIcon, props);
			})
		);
	}
});

var EditorTextArea = React.createClass({
	displayName: 'EditorTextArea',

	render: function render() {
		return React.createElement('textarea', { className: 'editor-textarea', value: this.props.content });
	}
});

var EditorContentEditableDiv = React.createClass({
	displayName: 'EditorContentEditableDiv',

	render: function render() {
		return React.createElement('div', { className: 'editor-contenteditable-div', contentEditable: true, dangerouslySetInnerHTML: { __html: this.props.content } });
	}
});

var Editor = React.createClass({
	displayName: 'Editor',

	getInitialState: function getInitialState() {
		return {
			showHtml: false,
			content: "<p>This is an editor!</p>"
		};
	},
	genEditArea: function genEditArea() {
		var showHtml = this.state.showHtml;
		var content = this.state.content;
		if (showHtml) {
			return React.createElement(EditorTextArea, { content: content });
		} else {
			return React.createElement(EditorContentEditableDiv, { content: content });
		}
	},
	render: function render() {
		var editArea = this.genEditArea();
		return React.createElement(
			'div',
			{ className: 'editor-container editor-default' },
			React.createElement(EditorToolbar, null),
			editArea
		);
	}
});

module.exports = Editor;