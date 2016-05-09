(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.editor = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var EditorIconTypes = {
	"source": {
		title: "源代码",
		disabled: false
	},
	"separator": {
		disabled: false
	},
	"undo": {
		title: "撤销",
		disabled: false
	},
	"redo": {
		title: "重做",
		disabled: false
	},
	"bold": {
		title: "加粗",
		disabled: false
	},
	"italic": {
		title: "斜线",
		disabled: false
	},
	"underline": {
		title: "下划线",
		disabled: false
	},
	"strikethrough": {
		title: "删除线",
		disabled: false
	},
	"superscript": {
		title: "上标",
		disabled: false
	},
	"subscript": {
		title: "下标",
		disabled: false
	},
	"forecolor": {
		title: "字体颜色",
		disabled: false
	},
	"backcolor": {
		title: "背景色",
		disabled: false
	},
	"removeformat": {
		title: "清除格式",
		disabled: false
	},
	"insertunorderedlist": {
		title: "无序列表",
		disabled: false
	},
	"insertorderedlist": {
		title: "有序列表",
		disabled: false
	},
	"selectall": {
		title: "全选",
		disabled: false
	},
	"cleardoc": {
		title: "清空文档",
		disabled: false
	},
	"paragraph": {
		title: "段落格式",
		disabled: false
	},
	"fontfamily": {
		title: "字体",
		disabled: false
	},
	"fontsize": {
		title: "字号",
		disabled: false
	},
	"justifyleft": {
		title: "居左对齐",
		disabled: false
	},
	"justifycenter": {
		title: "居中对齐",
		disabled: false
	},
	"justifyright": {
		title: "居右对齐",
		disabled: false
	},
	"link": {
		title: "超链接",
		disabled: false
	},
	"unlink": {
		title: "取消链接",
		disabled: false
	},
	"emotion": {
		title: "表情",
		disabled: false
	},
	"image": {
		title: "图片",
		disabled: false
	},
	"video": {
		title: "视频",
		disabled: false
	},
	"map": {
		title: "百度地图",
		disabled: false
	},
	"horizontal": {
		title: "分隔线",
		disabled: false
	},
	"print": {
		title: "打印",
		disabled: false
	},
	"preview": {
		title: "预览",
		disabled: false
	},
	"drafts": {
		title: "草稿箱",
		disabled: false
	},
	"formula": {
		title: "数学公式",
		disabled: false
	}
};
module.exports = {
	EditorIconTypes: EditorIconTypes
};

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./constants/EditorConstants":1}]},{},[2])(2)
});