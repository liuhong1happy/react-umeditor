(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.editor = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Dropdown = require('./Dropdown.react');

var _require = require('../constants/EditorConstants');

var ColorTypes = _require.ColorTypes;

var ColorDropdown = React.createClass({
	displayName: 'ColorDropdown',

	getInitialState: function getInitialState() {
		return {
			handle: function handle() {}
		};
	},
	open: function open(position, handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.open(position);
	},
	close: function close() {
		this.refs.root.close();
	},
	toggle: function toggle(position) {
		this.refs.root.toggle(position);
	},
	handleSelectColor: function handleSelectColor(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var color = target.getAttribute('data-color');
		if (this.state.handle) {
			this.state.handle(e, color);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	render: function render() {
		var handleSelectColor = this.handleSelectColor;
		return React.createElement(
			Dropdown,
			{ ref: 'root', className: 'color-dropdown' },
			React.createElement(
				'table',
				null,
				React.createElement(
					'tbody',
					null,
					React.createElement(
						'tr',
						{ className: 'title-row', key: "title-row" },
						React.createElement(
							'td',
							{ colSpan: 10 },
							'主题颜色'
						)
					),
					ColorTypes.themeColors.map(function (colors, pos) {
						var firstRow = pos == 0;
						return React.createElement(
							'tr',
							{ key: pos, className: firstRow ? "first-row" : "" },
							colors.map(function (color, index) {
								return React.createElement(
									'td',
									{ key: index },
									React.createElement('a', { className: 'color-anchor', 'data-color': color, style: { "backgroundColor": color }, onClick: handleSelectColor })
								);
							})
						);
					}),
					React.createElement(
						'tr',
						{ className: 'title-row', key: "title-row2" },
						React.createElement(
							'td',
							{ colSpan: 10 },
							'标准颜色'
						)
					),
					React.createElement(
						'tr',
						{ className: 'last-row', key: "last-row" },
						ColorTypes.standardColors.map(function (color, pos) {
							return React.createElement(
								'td',
								{ key: pos },
								React.createElement('a', { className: 'color-anchor', 'data-color': color, style: { "backgroundColor": color }, onClick: handleSelectColor })
							);
						})
					)
				)
			)
		);
	}
});

module.exports = ColorDropdown;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../constants/EditorConstants":13,"./Dropdown.react":3}],2:[function(require,module,exports){
(function (global){
"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

/**
* @width: 对话框宽度
* @height: 对话框高度
* @style: 样式
* @buttons: 对话框按钮组
* @title: 对话框标题
* @className: 对话框类名
**/
var Dialog = React.createClass({
	displayName: "Dialog",

	getInitialState: function getInitialState() {
		return {
			show: false
		};
	},
	open: function open() {
		this.setState({
			show: true
		});
	},
	close: function close() {
		this.setState({
			show: false
		});
	},
	toggle: function toggle() {
		this.setState({
			show: !this.state.show
		});
	},
	handleMouseDown: function handleMouseDown(e) {
		e = e || event;
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},
	render: function render() {
		var _props = this.props;

		var props = _objectWithoutProperties(_props, []);

		var className = _props.className;
		var buttons = _props.buttons;
		var title = _props.title;
		var style = _props.style;
		var width = _props.width;
		var height = _props.height;

		var style = style ? style : {};
		if (width) {
			style.width = width;
			style.marginLeft = -width / 2;
		}
		if (height) {
			style.height = height;
		}
		style.display = this.state.show ? "" : "none";
		var _className = "dialog" + (className ? " " + className : "");
		return React.createElement(
			"div",
			{ className: "dialog-container", ref: "root", onMouseDown: this.handleMouseDown },
			React.createElement(
				"div",
				{ className: _className, ref: "dialog", style: style },
				React.createElement(
					"div",
					{ className: "dialog-header", ref: "header" },
					React.createElement("a", { className: "dialog-close", onClick: this.props.onClose }),
					React.createElement(
						"h3",
						{ className: "dialog-title" },
						title
					)
				),
				React.createElement(
					"div",
					{ className: "dialog-body", ref: "body" },
					this.props.children
				),
				React.createElement(
					"div",
					{ className: "dialog-footer", ref: "footer" },
					buttons.map(function (ele, pos) {
						return React.createElement(
							"a",
							{ className: "dialog-button", key: pos, "data-name": ele.name, onClick: ele.onClick },
							ele.content
						);
					})
				)
			),
			React.createElement("div", { className: "dialog-backdrop", ref: "backdrop", style: { "display": this.state.show ? "" : "none" } })
		);
	}
});

module.exports = Dialog;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var Dropdown = React.createClass({
	displayName: "Dropdown",

	getInitialState: function getInitialState() {
		return {
			show: false,
			position: {
				x: 0,
				y: 0
			}
		};
	},
	componentDidMount: function componentDidMount() {
		window.addEventListener("click", this.close);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener("click", this.close);
	},
	open: function open(position) {
		this.setState({
			show: true,
			position: position
		});
	},
	close: function close() {
		this.setState({
			show: false
		});
	},
	toggle: function toggle(position) {
		this.setState({
			show: !this.state.show,
			position: position
		});
	},
	render: function render() {
		var _props = this.props;
		var className = _props.className;
		var style = _props.style;

		var props = _objectWithoutProperties(_props, ["className", "style"]);

		style = style || {};
		if (!this.state.show) {
			style["display"] = "none";
		} else {
			style["display"] = "";
		}
		if (this.state.position) {
			style["left"] = this.state.position.x;
			style["top"] = this.state.position.y;
		}

		return React.createElement(
			"div",
			_extends({ style: style, className: "dropdown" + (className ? " " + className : "") }, props),
			React.createElement("div", { className: "dropdown-caret" }),
			this.props.children
		);
	}
});

module.exports = Dropdown;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');
var EditorSelection = require('../utils/EditorSelection');

var EditorContentEditableDiv = React.createClass({
	displayName: 'EditorContentEditableDiv',

	getInitialState: function getInitialState() {
		return {
			content: ""
		};
	},
	componentDidMount: function componentDidMount(e) {
		window.addEventListener("mousedown", this.handleWindowMouseDown);
	},
	componentWillUpdate: function componentWillUpdate(e) {
		EditorSelection.addRange();
	},
	componentDidUpdate: function componentDidUpdate(e) {
		EditorSelection.addRange();
	},
	getContent: function getContent() {
		var target = ReactDOM.findDOMNode(this.refs.root);
		return target.innerHTML;
	},
	setContent: function setContent(content) {
		this.setState({
			content: content
		});
	},
	getName: function getName() {
		return "div";
	},
	handleWindowMouseDown: function handleWindowMouseDown(e) {
		EditorSelection.clearRange();
	},
	handleMouseDown: function handleMouseDown(e) {
		EditorSelection.clearRange();
		window.addEventListener("mouseup", this.handleMouseUp);
	},
	handleMouseUp: function handleMouseUp(e) {
		EditorSelection.createRange();
		window.removeEventListener("mouseup", this.handleMouseUp);

		if (this.props.onRangeChange) this.props.onRangeChange(e);
	},
	render: function render() {
		return React.createElement('div', { ref: 'root', className: 'editor-contenteditable-div',
			onMouseUp: this.handleMouseUp,
			onMouseDown: this.handleMouseDown,
			contentEditable: true, dangerouslySetInnerHTML: { __html: this.state.content } });
	}
});
module.exports = EditorContentEditableDiv;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utils/EditorSelection":17,"react-dom":undefined}],5:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');
/**
* @icon: 图标名称 string
* @disabled: 是否禁用 bool
* @onClick: 暴露点击事件 function
* @title: 提示 string
* @active: 是否选中 bool
* @showHtml: 是否当前是显示html属性
* @color: 前景色和背景色
**/
var EditorIcon = React.createClass({
	displayName: 'EditorIcon',

	componentDidMount: function componentDidMount() {
		this.updateStyle();
	},
	componentDidUpdate: function componentDidUpdate() {
		this.updateStyle();
	},
	updateStyle: function updateStyle() {
		var root = ReactDOM.findDOMNode(this.refs.root);
		var icon = this.props.icon;
		switch (this.props.icon) {
			case "forecolor":
			case "backcolor":
				var color = this.props.color ? this.props.color : "transparent";
				root.id = icon + "_" + new Date().valueOf();
				var style = root.childElementCount > 0 ? root.children[0] : document.createElement('style');
				style.innerHTML = ".icon-" + icon + "#" + root.id + ":before{content:'';border-bottom:3px solid " + color + ";}";
				if (root.childElementCount == 0) root.appendChild(style);
				break;
		}
	},
	handleClick: function handleClick(e) {
		var _props = this.props;
		var onClick = _props.onClick;

		var props = _objectWithoutProperties(_props, ['onClick']);

		if (this.props.onClick) {
			this.props.onClick(e, _extends({}, props));
		}
	},
	render: function render() {
		var _props2 = this.props;
		var icon = _props2.icon;
		var active = _props2.active;
		var disabled = _props2.disabled;
		var showHtml = _props2.showHtml;
		var onClick = _props2.onClick;

		var props = _objectWithoutProperties(_props2, ['icon', 'active', 'disabled', 'showHtml', 'onClick']);

		var _disabled = showHtml && icon != "source" && icon != "separator";
		return React.createElement('span', _extends({ ref: 'root', className: "editor-icon icon-" + icon + (active ? " active" : "") + (disabled || _disabled ? " disabled" : ""), onClick: this.handleClick }, props));
	}
});

module.exports = EditorIcon;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"react-dom":undefined}],6:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');

// resize context
var minWidth = 12;
var minHeight = 12;
var EditorResize = React.createClass({
	displayName: 'EditorResize',

	getInitialState: function getInitialState() {
		return {
			target: null,
			position: {
				x: 0, y: 0
			},
			width: 0,
			height: 0,
			startPosition: {
				x: 0, y: 0
			},
			curPosition: {
				x: 0, y: 0
			}
		};
	},
	setTarget: function setTarget(target) {
		var width = parseFloat(target.width || target.style.width);
		var height = parseFloat(target.height || target.style.height);
		var offsetLeft = target.offsetLeft + target.offsetParent.offsetLeft;
		var offsetTop = target.offsetTop + target.offsetParent.offsetTop;;
		this.setState({
			target: target,
			width: width,
			height: height,
			show: true,
			position: { x: offsetLeft, y: offsetTop }
		});
	},
	getTarget: function getTarget() {
		return this.state.target;
	},
	clearTarget: function clearTarget() {
		this.setState({
			target: null,
			show: false
		});
	},
	stopPropagation: function stopPropagation(e) {
		if (e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;
	},
	clearSelect: function clearSelect(e) {
		if (window.getSelection) {
			window.getSelection().removeAllRanges();
		} else {
			document.selection.empty();
		}
	},
	getMousePosition: function getMousePosition(e) {
		e = e || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;

		var x = parseFloat(e.pageX || e.clientX + scrollX);
		var y = parseFloat(e.pageY || e.clientY + scrollY);

		return { x: x, y: y };
	},
	handleMouseDown: function handleMouseDown(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var className = target.className;
		var startPosition = this.getMousePosition(e);
		this.clearSelect();
		if (className.indexOf("nw-resize") != -1) {
			this.setState({
				direction: "nw-resize",
				startPosition: startPosition
			});
		}
		if (className.indexOf("ne-resize") != -1) {
			this.setState({
				direction: "ne-resize",
				startPosition: startPosition
			});
		}
		if (className.indexOf("sw-resize") != -1) {
			this.setState({
				direction: "sw-resize",
				startPosition: startPosition
			});
		}
		if (className.indexOf("se-resize") != -1) {
			this.setState({
				direction: "se-resize",
				startPosition: startPosition
			});
		}

		window.removeEventListener("mouseup", this.handleMouseUp);
		window.removeEventListener("mousemove", this.handleMouseMove);
		window.addEventListener("mouseup", this.handleMouseUp);
		window.addEventListener("mousemove", this.handleMouseMove);

		this.stopPropagation(e);
	},
	handleMouseMove: function handleMouseMove(e) {
		if (!this.state.direction) return;
		this.clearSelect();
		e = e || event;
		var target = e.target || e.srcElement;
		var curPosition = this.getMousePosition(e);
		var startPosition = this.state.startPosition;
		var dx = curPosition.x - startPosition.x;
		var dy = curPosition.y - startPosition.y;
		var width = this.state.width;
		var height = this.state.height;

		switch (this.state.direction) {
			case "nw-resize":
				width -= dx;
				height -= dy;
				break;
			case "ne-resize":
				width += dx;
				height -= dy;
				break;
			case "sw-resize":
				width -= dx;
				height += dy;
				break;
			case "se-resize":
				width += dx;
				height += dy;
				break;
		}
		startPosition = curPosition;
		if (width < minWidth) width = minWidth;
		if (height < minHeight) height = minHeight;

		if (this.state.target) {
			this.state.target.style.width = width + "px";
			this.state.target.style.height = height + "px";
		}

		this.setState({
			startPosition: startPosition,
			width: width,
			height: height
		});

		this.stopPropagation(e);
	},
	handleMouseUp: function handleMouseUp(e) {
		if (!this.state.direction) return;
		this.clearSelect();
		e = e || event;
		var target = e.target || e.srcElement;
		var curPosition = this.getMousePosition(e);
		var startPosition = this.state.startPosition;
		var dx = curPosition.x - startPosition.x;
		var dy = curPosition.y - startPosition.y;
		var width = this.state.width;
		var height = this.state.height;

		switch (this.state.direction) {
			case "nw-resize":
				width -= dx;
				height -= dy;
				break;
			case "ne-resize":
				width += dx;
				height -= dy;
				break;
			case "sw-resize":
				width -= dx;
				height += dy;
				break;
			case "se-resize":
				width += dx;
				height += dy;
				break;
		}
		startPosition = curPosition;

		if (width < minWidth) width = minWidth;
		if (height < minHeight) height = minHeight;

		window.removeEventListener("mouseup", this.handleMouseUp);
		window.removeEventListener("mousemove", this.handleMouseMove);
		if (this.state.target) {
			this.state.target.style.width = width + "px";
			this.state.target.style.height = height + "px";
		}
		this.setState({
			startPosition: startPosition,
			height: height,
			width: width,
			direction: null
		});

		this.stopPropagation(e);
	},
	render: function render() {
		var style = {
			width: this.state.width,
			height: this.state.height,
			left: this.state.position.x,
			top: this.state.position.y,
			display: this.state.show ? "block" : "none",
			positoin: "absolute"
		};
		return React.createElement(
			'div',
			{ className: 'editor-resize', style: style },
			React.createElement('div', { className: 'block-resize nw-resize', onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp }),
			React.createElement('div', { className: 'block-resize ne-resize', onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp }),
			React.createElement('div', { className: 'block-resize sw-resize', onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp }),
			React.createElement('div', { className: 'block-resize se-resize', onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp })
		);
	}
});

module.exports = EditorResize;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"react-dom":undefined}],7:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');

var EditorTextArea = React.createClass({
	displayName: 'EditorTextArea',

	getInitialState: function getInitialState() {
		return {
			content: ""
		};
	},
	getContent: function getContent() {
		var target = ReactDOM.findDOMNode(this.refs.root);
		return target.value;
	},
	setContent: function setContent(content) {
		this.setState({
			content: content
		});
	},
	getName: function getName() {
		return "textarea";
	},
	handleChange: function handleChange() {
		var target = ReactDOM.findDOMNode(this.refs.root);
		this.setState({
			content: target.value
		});
	},
	render: function render() {
		return React.createElement('textarea', { ref: 'root', className: 'editor-textarea', value: this.state.content, onChange: this.handleChange });
	}
});
module.exports = EditorTextArea;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"react-dom":undefined}],8:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var EditorIcon = require('./EditorIcon.react');

var _require = require('../constants/EditorConstants');

var EditorIconTypes = _require.EditorIconTypes;

var EditorHistory = require('../utils/EditorHistory');

var EditorToolbar = React.createClass({
	displayName: 'EditorToolbar',

	getInitialState: function getInitialState() {
		// paragraph fontfamily fontsize  emotion video map print preview drafts link unlink
		return {
			icons: ["source | undo redo | bold italic underline strikethrough | superscript subscript | ", "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ", "cleardoc  | justifyleft justifycenter justifyright | horizontal | image formula | inserttable"],
			selection: null
		};
	},
	handleIconClick: function handleIconClick(e, state) {
		if (this.props.onIconClick) {
			this.props.onIconClick(e, state);
		}
	},
	getIcons: function getIcons() {
		var editorState = this.props.editorState;
		editorState.icons["undo"] = { disabled: !EditorHistory.canUndo() };
		editorState.icons["redo"] = { disabled: !EditorHistory.canRedo() };

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
			if (editorState.icons[_icons[i]]) {
				returnArray[i].disabled = !!editorState.icons[_icons[i]].disabled;
				returnArray[i].active = !!editorState.icons[_icons[i]].active;
				returnArray[i].color = editorState.icons[_icons[i]].color;
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../constants/EditorConstants":13,"../utils/EditorHistory":16,"./EditorIcon.react":5}],9:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');

var TabGroup = require('./TabGroup.react');
var Dropdown = require('./Dropdown.react');

var _require = require('../constants/EditorConstants');

var FormulaTypes = _require.FormulaTypes;

var FormulaIcons = React.createClass({
	displayName: 'FormulaIcons',

	handleClick: function handleClick(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var latex = target.getAttribute("data-latex");
		var id = 'mathquill-' + new Date().valueOf();
		if (this.props.onSelectFormula) {
			this.props.onSelectFormula(e, latex, id);
		}
	},
	render: function render() {
		var icons = this.props.icons;
		var handleClick = this.handleClick;
		return React.createElement(
			'ul',
			{ className: "formulas-icons " + this.props.name },
			icons.map(function (ele, pos) {
				return React.createElement('li', { className: 'latex-icon', key: pos, 'data-latex': ele.latex, style: { "backgroundPosition": ele.backgroundPosition }, onClick: handleClick });
			})
		);
	}
});

var FormulaDropdown = React.createClass({
	displayName: 'FormulaDropdown',

	getInitialState: function getInitialState() {
		return {
			handle: function handle() {}
		};
	},
	open: function open(position, handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.open(position);
	},
	close: function close() {
		this.refs.root.close();
	},
	toggle: function toggle(position) {
		this.refs.root.toggle(position);
	},
	handleSelectFormula: function handleSelectFormula(e, latex, id) {
		e = e || event;
		if (this.state.handle) {
			this.state.handle(e, latex, id);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	render: function render() {
		var tabs = [{ title: "常用公式", component: React.createElement(FormulaIcons, { icons: FormulaTypes.commonFormulas, name: 'common-formulas', onSelectFormula: this.handleSelectFormula }) }, { title: "符号", component: React.createElement(FormulaIcons, { icons: FormulaTypes.symbolFormulas, name: 'symbol-formulas', onSelectFormula: this.handleSelectFormula }) }, { title: "字母", component: React.createElement(FormulaIcons, { icons: FormulaTypes.arabicFormulas, name: 'arabic-formulas', onSelectFormula: this.handleSelectFormula }) }];

		return React.createElement(
			Dropdown,
			{ ref: 'root', className: 'formula-dropdown' },
			React.createElement(TabGroup, { tabs: tabs })
		);
	}
});

module.exports = FormulaDropdown;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../constants/EditorConstants":13,"./Dropdown.react":3,"./TabGroup.react":11,"react-dom":undefined}],10:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');

var Dialog = require('./Dialog.react');
var TabGroup = require('./TabGroup.react');
var Uploader = require('../utils/FileUpload');

var ImageUpload = React.createClass({
	displayName: 'ImageUpload',

	getInitialState: function getInitialState() {
		return {
			images: []
		};
	},
	handleChange: function handleChange(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var mask = ReactDOM.findDOMNode(this.refs.mask);
		var _self = this;
		var images = this.state.images;
		if (target.files.length > 0) {
			Uploader.uploadFile({
				file: target.files[0],
				onLoad: function onLoad(e) {
					mask.style.display = "block";
					mask.innerHTML = "Loading...";
				},
				onSuccess: function onSuccess(res) {
					mask.style.display = "block";
					mask.innerHTML = "Load Success";

					if (res && res.status == "success") {
						images.push({
							src: res.image_src
						});
						_self.setState({
							images: images
						});
						if (_self.props.onChange) _self.props.onChange(0, images);
					}
					setTimeout(function () {
						mask.style.display = "none";
					}, 200);
				},
				onError: function onError(e) {
					mask.style.display = "block";
					mask.innerHTML = "Load Error";
					setTimeout(function () {
						mask.style.display = "none";
					}, 200);
				}
			});
			// clear value
			target.value = "";
		}
	},
	getImages: function getImages() {
		return this.state.images;
	},
	clearImages: function clearImages() {
		this.setState({
			images: []
		});
	},
	handleRemoveImage: function handleRemoveImage(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var index = parseInt(target.getAttribute("data-index"));
		var images = this.state.images;
		images.splice(index, 1);
		this.setState({
			images: images
		});
		if (this.props.onChange) this.props.onChange(0, images);
	},
	render: function render() {
		var images = this.state.images;
		var handleRemoveImage = this.handleRemoveImage;
		var action = this.props.action ? this.props.action : "/upload";
		var showStyle = {
			"display": "block"
		};
		var hideStyle = {
			"display": "none"
		};
		var hasImages = images.length > 0;
		return React.createElement(
			'div',
			{ className: 'tab-panel' },
			React.createElement(
				'div',
				{ className: 'image-content' },
				images.map(function (ele, pos) {
					return React.createElement(
						'div',
						{ className: 'image-item' },
						React.createElement('div', { className: 'image-close', onClick: handleRemoveImage }),
						React.createElement('img', { src: ele.src, className: 'image-pic', height: '75', width: '120' })
					);
				}),
				React.createElement(
					'div',
					{ className: 'image-upload2', style: hasImages ? showStyle : hideStyle },
					React.createElement('span', { className: 'image-icon' }),
					React.createElement(
						'form',
						{ className: 'image-form', method: 'post', encType: 'multipart/form-data', target: 'up', action: action },
						React.createElement('input', { onChange: this.handleChange, style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', hidefocus: '', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'image-dragTip', style: hasImages ? hideStyle : showStyle },
				'支持图片拖拽上传'
			),
			React.createElement(
				'div',
				{ className: 'image-upload1', style: hasImages ? hideStyle : showStyle },
				React.createElement('span', { className: 'image-icon' }),
				React.createElement(
					'form',
					{ className: 'image-form', method: 'post', encType: 'multipart/form-data', target: 'up', action: action },
					React.createElement('input', { onChange: this.handleChange, style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', hidefocus: '', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
				)
			),
			React.createElement(
				'div',
				{ className: 'image-mask', ref: 'mask' },
				"Loading...."
			)
		);
	}
});

var ImageSearch = React.createClass({
	displayName: 'ImageSearch',

	getInitialState: function getInitialState() {
		return {
			images: []
		};
	},
	getImages: function getImages() {
		return this.state.images;
	},
	clearImages: function clearImages() {
		this.setState({
			images: []
		});
	},
	handleClick: function handleClick(e) {
		var text = ReactDOM.findDOMNode(this.refs.text);
		var src = text.value;
		var images = this.state.images;
		if (src && src.length > 0) {
			images.push({ src: src });
			this.setState({
				images: images
			});
			if (this.props.onChange) this.props.onChange(1, images);
			text.value = "";
		}
	},
	handleRemoveImage: function handleRemoveImage(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var index = parseInt(target.getAttribute("data-index"));
		var images = this.state.images;
		images.splice(index, 1);
		this.setState({
			images: images
		});
	},
	render: function render() {
		var images = this.state.images;
		var handleRemoveImage = this.handleRemoveImage;
		return React.createElement(
			'div',
			{ className: 'tab-panel' },
			React.createElement(
				'table',
				{ className: 'search-bar' },
				React.createElement(
					'tbody',
					null,
					React.createElement(
						'tr',
						null,
						React.createElement(
							'td',
							null,
							React.createElement('input', { className: 'image-searchTxt', type: 'text', ref: 'text' })
						),
						React.createElement(
							'td',
							null,
							React.createElement(
								'div',
								{ className: 'image-searchAdd', onClick: this.handleClick },
								'添加'
							)
						)
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'image-content' },
				images.map(function (ele, pos) {
					return React.createElement(
						'div',
						{ key: pos, className: 'image-item' },
						React.createElement('div', { className: 'image-close', 'data-index': pos, onClick: handleRemoveImage }),
						React.createElement('img', { src: ele.src, className: 'image-pic', height: '75', width: '120' })
					);
				})
			)
		);
	}
});

var ImageDialog = React.createClass({
	displayName: 'ImageDialog',

	getInitialState: function getInitialState() {
		return {
			images: [[], []],
			handle: function handle() {}
		};
	},
	open: function open(handle) {
		this.setState({
			handle: handle
		});
		this.refs.modal.open();
	},
	close: function close() {
		this.refs.modal.close();
		if (this.state.handle) {
			this.state.handle();
		}
		this.refs.image.clearImages();
	},
	toggle: function toggle() {
		this.refs.modal.toggle();
	},
	handleOkClick: function handleOkClick(e) {
		// 做相应的处理
		var tabIndex = this.refs.tab.getTabIndex();
		var images = this.state.images[tabIndex];
		var strImgs = "";
		if (images.length > 0 && this.state.handle) {
			for (var i = 0; i < images.length; i++) {
				var src = images[i].src;
				var str = "<img src='" + src + "' />";
				strImgs += str;
			}
			this.state.handle(e, strImgs);
		}
		this.close();
	},
	handleChange: function handleChange(index, imgs) {
		var images = this.state.images;
		images[index] = imgs;
		this.setState({
			images: images
		});
	},
	render: function render() {
		var buttons = [{ name: "btn-ok", content: "确定", onClick: this.handleOkClick }, { name: "btn-cancel", content: "取消", onClick: this.close }];
		var tabs = [{ title: "本地上传", component: React.createElement(ImageUpload, { ref: 'image', onChange: this.handleChange }) }, { title: "网络图片", component: React.createElement(ImageSearch, { ref: 'image', onChange: this.handleChange }) }];
		return React.createElement(
			Dialog,
			{ ref: 'modal', className: 'image-dialog', width: 700, height: 508, title: '图片', buttons: buttons, onClose: this.close },
			React.createElement(TabGroup, { tabs: tabs, ref: 'tab' })
		);
	}
});

module.exports = ImageDialog;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utils/FileUpload":18,"./Dialog.react":2,"./TabGroup.react":11,"react-dom":undefined}],11:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var TabGroup = React.createClass({
	displayName: "TabGroup",

	getInitialState: function getInitialState() {
		return {
			tabIndex: 0
		};
	},
	setTabIndex: function setTabIndex(index) {
		this.setState({
			tabIndex: index
		});
	},
	getTabIndex: function getTabIndex() {
		return this.state.tabIndex;
	},
	handleClick: function handleClick(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var index = parseInt(target.getAttribute("data-index"));
		this.setTabIndex(index);
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},
	render: function render() {
		var tabIndex = this.state.tabIndex;
		var tabs = this.props.tabs;
		var component = tabs[tabIndex].component;
		var handleClick = this.handleClick;
		return React.createElement(
			"div",
			{ className: "tab-group" },
			React.createElement(
				"ul",
				{ className: "tab-nav" },
				tabs.map(function (ele, pos) {
					return React.createElement(
						"li",
						{ key: pos, className: "tab-item" + (tabIndex == pos ? " active" : "") },
						React.createElement(
							"a",
							{ "data-index": pos, className: "tab-text", onClick: handleClick },
							ele.title
						)
					);
				})
			),
			React.createElement(
				"div",
				{ className: "tab-content" },
				component
			)
		);
	}
});

module.exports = TabGroup;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Dropdown = require('./Dropdown.react');

var TablePickerDropdown = React.createClass({
    displayName: 'TablePickerDropdown',

    getInitialState: function getInitialState() {
        return {
            row: 0,
            column: 0,
            handle: function handle() {},
            position: { x: 0, y: 0 }
        };
    },
    open: function open(position, handle) {
        this.setState({
            handle: handle,
            position: position
        });
        this.refs.root.open(position);
    },
    close: function close() {
        this.refs.root.close();
    },
    toggle: function toggle(position) {
        this.refs.root.toggle(position);
    },
    handleMouseEvent: function handleMouseEvent(e) {
        e = e || event;
        var target = e.target || e.srcElement;
        var parentPostion = target.getBoundingClientRect();
        var row = Math.ceil((e.clientX - parentPostion.left) / 22);
        var column = Math.ceil((e.clientY - parentPostion.top) / 22);
        if (row < 0) row = 0;
        if (column < 0) column = 0;

        if (row > 10) row = 10;
        if (column > 10) column = 10;
        this.setState({
            row: row,
            column: column
        });
    },
    handleMouseOut: function handleMouseOut(e) {
        this.setState({
            row: 0,
            column: 0
        });
    },
    handleClick: function handleClick(e) {
        // insert table
        var Table = document.createElement("table");
        Table.className = "editor-table";
        var TBody = Table.createTBody();
        for (var i = 0; i < this.state.row; i++) {
            var Tr = TBody.insertRow();
            for (var j = 0; j < this.state.column; j++) {
                var Td = Tr.insertCell();
                Td.width = 200;
            }
        }
        this.state.handle(e, Table.outerHTML);
        this.refs.root.close();
    },
    render: function render() {
        var row = this.state.row;
        var column = this.state.column;

        return React.createElement(
            Dropdown,
            { ref: 'root', className: 'tablepicker-dropdown' },
            React.createElement(
                'div',
                { className: 'infoarea' },
                ' ',
                React.createElement(
                    'span',
                    null,
                    column + "列 x " + row + "行"
                )
            ),
            React.createElement(
                'div',
                { className: 'pickarea', onMouseOver: this.handleMouseEvent, onMouseMove: this.handleMouseEvent,
                    onMouseOut: this.handleMouseOut, onClick: this.handleClick },
                React.createElement('div', { className: 'overlay', style: { width: row * 22, height: column * 22 } })
            )
        );
    }
});

module.exports = TablePickerDropdown;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Dropdown.react":3}],13:[function(require,module,exports){
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
	},
	"inserttable": {
		title: "插入表格",
		disabled: false
	}
};
var ColorTypes = {
	themeColors: [["#fff", "#000", "#eeece1", "#1f497d", "#4f81bd", "#c0504d", "#9bbb59", "#8064a2", "#4bacc6", "#f79646"], ["#f2f2f2", "7f7f7f", "#ddd9c3", "#c6d9f0", "#dbe5f1", "#f2dcdb", "#ebf1dd", "#e5e0ec", "#dbeef3", "#fdeada"], ["#d8d8d8", "#595959", "#c4bd97", "#8db3e2", "#b8cce4", "#e5b9b7", "#d7e3bc", "#ccc1d9", "#b7dde8", "#fbd5b5"], ["#bfbfbf", "#3f3f3f", "#938953", "#548dd4", "#95b3d7", "#d99694", "#c3d69b", "#b2a2c7", "#92cddc", "#fac08f"], ["#a5a5a5", "#262626", "#494429", "#17365d", "#366092", "#953734", "#76923c", "#5f497a", "#31859b", "#e36c09"], ["#7f7f7f", "#0c0c0c", "#1d1b10", "#0f243e", "#244061", "#632423", "#4f6128", "#3f3151", "#205867", "#974806"]],
	standardColors: ["#c00000", "#ff0000", "#ffc000", "#ffff00", "#92d050", "#00b050", "#00b0f0", "#0070c0", "#002060", "#7030a0"]
};

var FormulaTypes = {
	commonFormulas: [{ backgroundPosition: "-0px -0px", latex: "\\frac{ }{ }" }, { backgroundPosition: "-30px -0px", latex: "^{ }/_{ }" }, { backgroundPosition: "-60px -0px", latex: "x^{ }" }, { backgroundPosition: "-90px -0px", latex: "x_{ }" }, { backgroundPosition: "-120px -0px", latex: "x^{ }_{ }" }, { backgroundPosition: "-150px -0px", latex: "\\bar{ }" }, { backgroundPosition: "-180px -0px", latex: "\\sqrt{ }" }, { backgroundPosition: "-210px -0px", latex: "\\nthroot{ }{ }" }, { backgroundPosition: "-0px -30px", latex: "\\sum^{ }_{n=}" }, { backgroundPosition: "-60px -30px", latex: "\\log_{ }" }, { backgroundPosition: "-90px -30px", latex: "\\ln" }, { backgroundPosition: "-120px -30px", latex: "\\int_{ }^{ }" }, { backgroundPosition: "-150px -30px", latex: "\\oint_{ }^{ }" }],
	symbolFormulas: [{ backgroundPosition: "-0px -60px", latex: "+" }, { backgroundPosition: "-30px -60px", latex: "-" }, { backgroundPosition: "-60px -60px", latex: "\\pm" }, { backgroundPosition: "-90px -60px", latex: "\\times" }, { backgroundPosition: "-120px -60px", latex: "\\ast" }, { backgroundPosition: "-150px -60px", latex: "\\div" }, { backgroundPosition: "-180px -60px", latex: "/" }, { backgroundPosition: "-210px -60px", latex: "\\bigtriangleup" }, { backgroundPosition: "-0px -90px", latex: "=" }, { backgroundPosition: "-30px -90px", latex: "\\ne" }, { backgroundPosition: "-60px -90px", latex: "\\approx" }, { backgroundPosition: "-90px -90px", latex: ">" }, { backgroundPosition: "-120px -90px", latex: "<" }, { backgroundPosition: "-150px -90px", latex: "\\ge" }, { backgroundPosition: "-180px -90px", latex: "\\le" }, { backgroundPosition: "-210px -90px", latex: "\\infty" }, { backgroundPosition: "-0px -120px", latex: "\\cap" }, { backgroundPosition: "-30px -120px", latex: "\\cup" }, { backgroundPosition: "-60px -120px", latex: "\\because" }, { backgroundPosition: "-90px -120px", latex: "\\therefore" }, { backgroundPosition: "-120px -120px", latex: "\\subset" }, { backgroundPosition: "-150px -120px", latex: "\\supset" }, { backgroundPosition: "-180px -120px", latex: "\\subseteq" }, { backgroundPosition: "-210px -120px", latex: "\\supseteq" }, { backgroundPosition: "-0px -150px", latex: "\\nsubseteq" }, { backgroundPosition: "-30px -150px", latex: "\\nsupseteq" }, { backgroundPosition: "-60px -150px", latex: "\\in" }, { backgroundPosition: "-90px -150px", latex: "\\ni" }, { backgroundPosition: "-120px -150px", latex: "\\notin" }, { backgroundPosition: "-150px -150px", latex: "\\mapsto" }, { backgroundPosition: "-180px -150px", latex: "\\leftarrow" }, { backgroundPosition: "-210px -150px", latex: "\\rightarrow" }, { backgroundPosition: "-0px -180px", latex: "\\Leftarrow" }, { backgroundPosition: "-30px -180px", latex: "\\Rightarrow" }, { backgroundPosition: "-60px -180px", latex: "\\leftrightarrow" }, { backgroundPosition: "-90px -180px", latex: "\\Leftrightarrow" }],
	arabicFormulas: [{ backgroundPosition: "-0px -210px", latex: "\\alpha" }, { backgroundPosition: "-30px -210px", latex: "\\beta" }, { backgroundPosition: "-60px -210px", latex: "\\gamma" }, { backgroundPosition: "-90px -210px", latex: "\\delta" }, { backgroundPosition: "-120px -210px", latex: "\\varepsilon" }, { backgroundPosition: "-150px -210px", latex: "\\varphi" }, { backgroundPosition: "-180px -210px", latex: "\\lambda" }, { backgroundPosition: "-210px -210px", latex: "\\mu" }, { backgroundPosition: "-0px -240px", latex: "\\rho" }, { backgroundPosition: "-30px -240px", latex: "\\sigma" }, { backgroundPosition: "-60px -240px", latex: "\\omega" }, { backgroundPosition: "-90px -240px", latex: "\\Gamma" }, { backgroundPosition: "-120px -240px", latex: "\\Delta" }, { backgroundPosition: "-150px -240px", latex: "\\Theta" }, { backgroundPosition: "-180px -240px", latex: "\\Lambda" }, { backgroundPosition: "-210px -240px", latex: "\\Xi" }, { backgroundPosition: "-0px -270px", latex: "\\Pi" }, { backgroundPosition: "-30px -270px", latex: "\\Sigma" }, { backgroundPosition: "-60px -270px", latex: "\\Upsilon" }, { backgroundPosition: "-90px -270px", latex: "\\Phi" }, { backgroundPosition: "-120px -270px", latex: "\\Psi" }, { backgroundPosition: "-150px -270px", latex: "\\Omega" }]
};

module.exports = {
	EditorIconTypes: EditorIconTypes,
	ColorTypes: ColorTypes,
	FormulaTypes: FormulaTypes
};

},{}],14:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');

var _require = require('./constants/EditorConstants');

var EditorIconTypes = _require.EditorIconTypes;

// utlils
var EditorHistory = require('./utils/EditorHistory');
var EditorSelection = require('./utils/EditorSelection');
var EditorDOM = require('./utils/EditorDOM');
// dialog & dropdown
var ColorDropdown = require('./components/ColorDropdown.react');
var FormulaDropdown = require('./components/FormulaDropdown.react');
var TablePickerDropdown = require('./components/TablePickerDropdown.react');
var ImageDialog = require('./components/ImageDialog.react');
// image resize
var EditorResize = require('./components/EditorResize.react');
// base components
var EditorToolbar = require('./components/EditorToolbar.react');
var EditorTextArea = require('./components/EditorTextArea.react');
var EditorContentEditableDiv = require('./components/EditorContentEditableDiv.react');

var MQ = MathQuill.getInterface(2);

// key down context
var saveSceneTimer = null;
var maxInputCount = 20;
var lastKeyCode = null;
var keycont = 0;

/**
* 对外接口方法
* @findDOMNode: 获取"root","editarea","toolbar","color"的ref对象以及相应的dom对象
* @setContent: 设置html格式数据
* @getContent: 获取html格式数据
* @onFocus: 监听focus事件
* @focusEditor: 聚焦到Editor上
* @defaultValue: 默认内容
* @value: 编辑器的值
**/

var Editor = React.createClass({
	displayName: 'Editor',

	getInitialState: function getInitialState() {
		return {
			editorState: {
				showHtml: false,
				icons: {}
			},
			defaultValue: this.props.defaultValue ? this.props.defaultValue : "<p>This is an Editor</p>",
			value: this.props.value
		};
	},
	componentDidMount: function componentDidMount() {
		EditorHistory.clear();
		this.setContent(this.state.value ? this.state.value : this.state.defaultValue);
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		var isCollapsed = true;
		editarea.addEventListener('keydown', this.handleKeyDown);
		editarea.addEventListener('keyup', this.handleKeyUp);
	},
	autoSave: function autoSave() {
		EditorHistory.execCommand('autosave', false, null);
	},
	handleKeyDown: function handleKeyDown(evt) {
		evt = evt || event;
		var keyCode = evt.keyCode || evt.which;
		var autoSave = this.autoSave;
		if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
			if (EditorHistory.getCommandStack().length == 0) {
				autoSave();
				keycont = 0;
			}
			clearTimeout(saveSceneTimer);
			saveSceneTimer = setTimeout(function () {
				var interalTimer = setInterval(function () {
					autoSave();
					keycont = 0;
					clearInterval(interalTimer);
				}, 300);
			}, 200);
			lastKeyCode = keyCode;
			keycont++;
			if (keycont >= maxInputCount) {
				autoSave();
				keycont = 0;
			}
		}
	},
	handleKeyUp: function handleKeyUp(evt) {
		var keyCode = evt.keyCode || evt.which;
		if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
			// some handle
		}
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		// update value
		if (this.props.value != nextProps.value) {
			this.setContent(nextProps.value ? nextProps.value : nextProps.defaultValue);
		}
	},
	componentDidUpdate: function componentDidUpdate() {
		var editorState = this.state.editorState;
		switch (editorState.icon) {
			case "source":
				this.setContent(editorState.content);
				break;
			case "cleardoc":
				this.setContent(editorState.content);
				break;
		}
	},
	genEditArea: function genEditArea() {
		var showHtml = this.state.editorState.showHtml;
		if (showHtml) {
			return React.createElement(EditorTextArea, { ref: 'editarea' });
		} else {
			return React.createElement(EditorContentEditableDiv, { ref: 'editarea', onRangeChange: this.handleRangeChange });
		}
	},
	handleFocus: function handleFocus(e) {
		if (this.props.onFocus) {
			this.props.onFocus(e, this.findDOMNode('root'));
		}
	},
	exchangeRangeState: function exchangeRangeState(editorState) {
		var rangeState = EditorSelection.getRangeState();
		for (var icon in rangeState) {
			if (!editorState.icons[icon]) editorState.icons[icon] = rangeState[icon];else {
				switch (icon) {
					case "forecolor":
					case "backcolor":
						editorState.icons[icon].color = rangeState[icon].color;
						break;
				}
				editorState.icons[icon].active = rangeState[icon].active;
			}
		}
		return editorState;
	},
	handleRangeChange: function handleRangeChange(e) {
		e = e || event;
		if (e && e.type == "blur") return;
		var target = e ? e.target || e.srcElement : null;
		var selection = EditorSelection.getSelection();
		if (selection && selection.rangeCount > 0) {
			var editorState = this.state.editorState;
			editorState = this.exchangeRangeState(editorState);
			this.setState({
				editorState: editorState
			});
			this.refs.resize.clearTarget();
		} else if (target) {
			var tagName = target.tagName.toUpperCase();
			switch (tagName) {
				case "IMG":
					this.refs.resize.setTarget(target);
					break;
			}
		}
	},
	getOffsetRootParentPosition: function getOffsetRootParentPosition(target) {
		var position = { x: 0, y: 0, w: 0, h: 0 };
		var root = ReactDOM.findDOMNode(this.refs.root);
		position.w = target.offsetWidth;
		position.h = target.offsetHeight;
		position.x = target.offsetLeft;
		position.y = target.offsetTop;
		var offsetParent = target.offsetParent;
		while (offsetParent && offsetParent != root) {
			position.x += offsetParent.offsetLeft;
			position.y += offsetParent.offsetTop;
			offsetParent = offsetParent.offsetParent;
		}
		return position;
	},
	addFormula: function addFormula(id, latex) {
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		var htmlElement = document.getElementById(id);
		var config = {
			handlers: { edit: function edit() {} },
			restrictMismatchedBrackets: true
		};
		var mathField = MQ.MathField(htmlElement, config);
		mathField.latex(latex);
		var $htmlElement = $(htmlElement);

		$htmlElement.keydown(EditorDOM.stopPropagation);
		$htmlElement.keyup(EditorDOM.stopPropagation);
		$htmlElement.mouseup(function (e) {
			editarea.blur();
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.mousedown(EditorDOM.stopPropagation);
		$(editarea).mousedown(function (e) {
			mathField.blur();
		});
	},
	handleToolbarIconClick: function handleToolbarIconClick(e, state) {
		e = e || event;
		var target = e.target || e.srcElement;
		var offsetPosition = this.getOffsetRootParentPosition(target);

		var handleRangeChange = this.handleRangeChange;
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		var editorState = this.state.editorState;
		EditorSelection.addRange();
		switch (state.icon) {
			case "source":
				editorState.showHtml = !editorState.showHtml;
				state.active = editorState.showHtml;
				editorState.content = this.refs.editarea.getContent();
				break;
			case "undo":
				EditorHistory.undo();
				break;
			case "redo":
				EditorHistory.redo();
				break;
			case "bold":
			case "italic":
			case "underline":
			case "strikethrough":
			case "subscript":
			case "superscript":
			case "removeformat":
			case "insertorderedlist":
			case "insertunorderedlist":
			case "selectall":
			case "justifyleft":
			case "justifyright":
			case "justifycenter":
				EditorHistory.execCommand(state.icon, false, null);
				break;
			case "forecolor":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;
				this.refs.color.open(offsetPosition, function (e, color) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('forecolor', false, color);
					handleRangeChange();
				});
				break;
			case "backcolor":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;

				this.refs.color.open(offsetPosition, function (e, color) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('backcolor', false, color);
					handleRangeChange();
				});
				break;
			case "cleardoc":
				editorState.content = "<p><br/></p>";
				break;
			case "horizontal":
				EditorHistory.execCommand('inserthtml', false, "<hr/><p><br/></p>");
				break;
			case "image":
				EditorSelection.storeRange();
				this.refs.image.open(function (e, html) {
					editarea.focus();
					EditorSelection.restoreRange();

					if (html && html.length > 0) {
						if (EditorSelection.range) {
							EditorHistory.execCommand('inserthtml', false, html);
						} else {
							editarea.innerHTML += html;
						}
					}
				});
				break;
			case "formula":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;
				offsetPosition.x -= offsetPosition.w / 2;
				var _self = this;
				this.refs.formula.open(offsetPosition, function (e, latex, id) {
					editarea.focus();
					EditorSelection.restoreRange();

					if (latex && latex.length > 0) {
						var html = '<p>&nbsp;<span class="mathquill-embedded-latex" id="' + id + '"></span>&nbsp;</p>';
						if (EditorSelection.range) {
							EditorHistory.execCommand('inserthtml', false, html);
						} else {
							editarea.innerHTML += html;
						}
						setTimeout(function () {
							_self.addFormula(id, latex);
						}, 200);
						handleRangeChange();
					}
				});
				break;
			case "inserttable":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;
				offsetPosition.x -= offsetPosition.w / 2;
				this.refs.table.open(offsetPosition, function (e, html) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('inserthtml', false, html);
					handleRangeChange();
				});
				break;
		}
		// setState
		editorState.icons[state.icon] = state;
		editorState.icon = state.icon;
		EditorSelection.createRange();
		// range state
		editorState = this.exchangeRangeState(editorState);
		this.setState({
			editorState: editorState
		});

		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},
	findDOMNode: function findDOMNode(refName) {
		// 对外公布方法
		var keys = ["root", "editarea", "toolbar", "color"];
		if (keys.indexOf(refName) == -1) return { ref: null, dom: null };
		return {
			ref: this.refs[refName],
			dom: ReactDOM.findDOMNode(this.refs[refName])
		};
	},
	setContent: function setContent(content) {
		// 后续添加校验方法
		this.refs.editarea.setContent(content);
		// mathquill supports
		if (content.indexOf("mathquill-embedded-latex") != -1) {
			var _self = this;
			setTimeout(function () {
				var editarea = ReactDOM.findDOMNode(_self.refs.editarea);
				var elements = editarea.querySelectorAll('.mathquill-embedded-latex');
				for (var i = 0; i < elements.length; i++) {
					if (!elements[i].id) {
						var id = "mathquill-" + i + "-" + new Date().valueOf();
						var latex = elements[i].innerHTML;
						elements[i].id = id;
						_self.addFormula(id, latex);
					}
				}
			}, 200);
		}
	},
	getContent: function getContent() {
		return this.refs.editarea.getContent();
	},
	focusEditor: function focusEditor() {
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		editarea.focus();
	},
	render: function render() {
		var editArea = this.genEditArea();
		var _props = this.props;
		var onBlur = _props.onBlur;
		var className = _props.className;
		var id = _props.id;
		var onFocus = _props.onFocus;

		var props = _objectWithoutProperties(_props, ['onBlur', 'className', 'id', 'onFocus']);

		return React.createElement(
			'div',
			_extends({ ref: 'root', id: id, className: "editor-container editor-default" + (className ? " " + className : ""), onBlur: this.handleRangeChange, onFocus: this.handleFocus }, props),
			React.createElement(
				EditorToolbar,
				{ ref: 'toolbar', editorState: this.state.editorState, onIconClick: this.handleToolbarIconClick },
				React.createElement(ImageDialog, { ref: 'image' }),
				React.createElement(ColorDropdown, { ref: 'color' }),
				React.createElement(FormulaDropdown, { ref: 'formula' }),
				React.createElement(TablePickerDropdown, { ref: 'table' })
			),
			editArea,
			React.createElement(EditorResize, { ref: 'resize' })
		);
	}
});

module.exports = Editor;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/ColorDropdown.react":1,"./components/EditorContentEditableDiv.react":4,"./components/EditorResize.react":6,"./components/EditorTextArea.react":7,"./components/EditorToolbar.react":8,"./components/FormulaDropdown.react":9,"./components/ImageDialog.react":10,"./components/TablePickerDropdown.react":12,"./constants/EditorConstants":13,"./utils/EditorDOM":15,"./utils/EditorHistory":16,"./utils/EditorSelection":17,"react-dom":undefined}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
"use strict";

var EditorHistory = {
	curCommand: null,
	commandStack: [],
	commandIndex: -1,
	canUndo: function canUndo() {
		return this.commandStack.length > 0 && this.commandIndex != -1;
	},
	canRedo: function canRedo() {
		return this.commandStack.length > 0 && this.commandIndex != this.commandStack.length - 1;
	},
	undo: function undo() {
		if (this.canUndo()) {
			this.commandIndex = this.commandIndex - 1;
			this.curCommand = this.commandStack[this.commandIndex];
			document.execCommand("undo");
		}
		return this.canUndo();
	},
	redo: function redo() {
		if (this.canRedo()) {
			this.commandIndex = this.commandIndex + 1;
			this.curCommand = this.commandStack[this.commandIndex];
			document.execCommand("redo");
		}
		return this.canRedo();
	},
	execCommand: function execCommand(command, flag, args) {
		document.execCommand(command, flag, args);
		if (command == "selectall") return;
		this.commandIndex = this.commandIndex + 1;
		this.curCommand = { command: command, flag: flag, args: args };
		// 必需移除index后的command
		this.commandStack.splice(this.commandIndex, this.commandStack.length - this.commandIndex);
		this.commandStack[this.commandIndex] = { command: command, flag: flag, args: args };
	},
	getCurCommand: function getCurCommand() {
		return this.curCommand;
	},
	getCommandStack: function getCommandStack() {
		return this.commandStack;
	},
	getCommandIndex: function getCommandIndex() {
		return this.commandIndex;
	},
	clear: function clear() {
		this.curCommand = null;
		this.commandStack = [];
		this.commandIndex = -1;
	}
};
module.exports = EditorHistory;

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
'use strict';

var getError = function getError(options, xhr) {
    var msg = 'cannot post ' + options.url + ":" + xhr.status;
    var err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = options.url;
    return err;
};
var getBody = function getBody(xhr) {
    var text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
};
var Uploader = {
    post: function post(options) {
        if (typeof XMLHttpRequest === 'undefined') {
            return;
        }

        var xhr = new XMLHttpRequest();
        if (xhr.upload) {
            xhr.upload.onprogress = function (e) {
                if (e.total > 0) {
                    e.percent = e.loaded / e.total * 100;
                }
                options.onLoad(e);
            };
        }
        var formData = new FormData();
        formData.append(options.filename, options.file);
        if (options.data) {
            for (var i in options.data) {
                formData[i] = options.data[i];
            }
        }
        xhr.onerror = function (e) {
            options.onEnd(e);
            options.onError(e);
        };
        xhr.onload = function (e) {
            if (xhr.status !== 200) {
                options.onEnd(e);
                return options.onError(getError(options, xhr), getBody(xhr));
            }
            options.onEnd(e);
            options.onSuccess(getBody(xhr));
        };

        xhr.open('post', options.url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(formData);
    }
};

module.exports = {
    uploadFile: function uploadFile(options) {
        options.url = options.url || "/upload";
        options.filename = options.filename || "file";
        options.beforeUpload = options.beforeUpload || function (e) {
            return true;
        };
        options.onSuccess = options.onSuccess || function (e) {};
        options.onError = options.onError || function (e) {};
        options.onLoad = options.onLoad || function (e) {};
        options.onStart = options.onStart || function (e) {};
        options.onEnd = options.onEnd || function (e) {};

        if (options.beforeUpload(options)) {
            options.onStart(options);
            // 开始上传文件
            Uploader.post(options);
        }
    },
    uploadFiles: function uploadFiles(options) {}
};

},{}]},{},[14])(14)
});