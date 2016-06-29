require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');

var ComboBox = React.createClass({
	displayName: "ComboBox",

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
		if (!this.state.show) return;
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
			_extends({ style: style, className: "combobox" + (className ? " " + className : "") }, props),
			this.props.children
		);
	}
});

module.exports = ComboBox;

},{"react":undefined}],2:[function(require,module,exports){
"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');

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
	componentDidMount: function componentDidMount() {
		window.addEventListener("click", this.close);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener("click", this.close);
	},
	open: function open() {
		this.setState({
			show: true
		});
	},
	close: function close() {
		if (!this.state.show) return;
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

},{"react":undefined}],3:[function(require,module,exports){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');

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
		if (!this.state.show) return;
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

},{"react":undefined}],4:[function(require,module,exports){
"use strict";

var React = require('react');

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

},{"react":undefined}],5:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var EditorSelection = require('../../utils/EditorSelection');
var EditorDOM = require('../../utils/EditorDOM');

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
	componentWillUnmount: function componentWillUnmount(e) {
		window.removeEventListener("mousedown", this.handleWindowMouseDown);
	},
	componentWillUpdate: function componentWillUpdate(e) {
		EditorSelection.cloneRange();
	},
	componentDidUpdate: function componentDidUpdate(e) {
		EditorSelection.cloneRange();
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
		EditorDOM.stopPropagation(e);
	},
	handleMouseUp: function handleMouseUp(e) {
		EditorSelection.createRange();
		window.removeEventListener("mouseup", this.handleMouseUp);

		if (this.props.onRangeChange) this.props.onRangeChange(e);
		EditorDOM.stopPropagation(e);
	},
	render: function render() {
		return React.createElement('div', { ref: 'root', className: 'editor-contenteditable-div',
			onMouseUp: this.handleMouseUp,
			onMouseDown: this.handleMouseDown,
			contentEditable: true, dangerouslySetInnerHTML: { __html: this.state.content } });
	}
});
module.exports = EditorContentEditableDiv;

},{"../../utils/EditorDOM":19,"../../utils/EditorSelection":22,"react":undefined,"react-dom":undefined}],6:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
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
		var _className = "editor-icon icon-" + icon + (active ? " active" : "") + (disabled || _disabled ? " disabled" : "");
		if (icon == "fontsize" || icon == "fontfamily" || icon == "paragraph") {
			return React.createElement(
				'span',
				_extends({ ref: 'root', className: _className, onClick: this.handleClick }, props),
				React.createElement(
					'span',
					{ className: 'icon-label' },
					props.name
				),
				React.createElement('span', { className: 'icon-caret' })
			);
		} else {
			return React.createElement('span', _extends({ ref: 'root', className: _className, onClick: this.handleClick }, props));
		}
	}
});

module.exports = EditorIcon;

},{"react":undefined,"react-dom":undefined}],7:[function(require,module,exports){
'use strict';

var React = require('react');
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

},{"react":undefined,"react-dom":undefined}],8:[function(require,module,exports){
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
		// video map print preview drafts link unlink
		return {
			icons: ["source | undo redo | bold italic underline strikethrough fontborder | paragraph fontfamily fontsize | superscript subscript | ", "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ", "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | horizontal date time  | image emotion formula spechars | inserttable"]
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

},{"../../constants/EditorConstants":18,"../../utils/EditorHistory":20,"./EditorIcon.react":6,"react":undefined}],9:[function(require,module,exports){
'use strict';

var React = require('react');
var Dropdown = require('../base/Dropdown.react');

var _require = require('../../constants/EditorConstants');

var ColorTypes = _require.ColorTypes;

var EditorDOM = require('../../utils/EditorDOM');
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
		this.close();
		EditorDOM.stopPropagation(e);
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

},{"../../constants/EditorConstants":18,"../../utils/EditorDOM":19,"../base/Dropdown.react":3,"react":undefined}],10:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TabGroup = require('../base/TabGroup.react');
var Dialog = require('../base/Dialog.react');

var _require = require('../../constants/EditorConstants');

var EmotionImages = _require.EmotionImages;

var EmotionPanel = React.createClass({
	displayName: 'EmotionPanel',

	handleClick: function handleClick(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var url = target.getAttribute("data-url");
		var title = target.getAttribute("data-title");

		if (this.props.onSelectImage) {
			this.props.onSelectImage(e, '<img src="' + url + '" title="' + title + '" />');
		}
	},
	render: function render() {
		var images = this.props.images;
		var handleClick = this.handleClick;
		return React.createElement(
			'ul',
			{ className: "emotion-images " + this.props.name },
			images.map(function (ele, pos) {
				return React.createElement(
					'li',
					{ className: 'emotion-image', key: pos, 'data-url': ele.url, 'data-title': ele.title, onClick: handleClick },
					React.createElement('img', { src: ele.url, title: ele.title, 'data-url': ele.url, 'data-title': ele.title })
				);
			})
		);
	}
});

var EmotionDialog = React.createClass({
	displayName: 'EmotionDialog',

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
	handleSelectImage: function handleSelectImage(e, char) {
		e = e || event;
		if (this.state.handle) {
			this.state.handle(e, char);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	getEmotionTabs: function getEmotionTabs() {
		var EmotionTabs = EmotionImages.EmotionTabs;
		var BaseUrl = EmotionImages.BaseUrl;
		var SmileyInfor = EmotionImages.SmileyInfor;

		var tabs = [];
		for (var key in EmotionTabs) {
			var tab = { title: EmotionTabs[key].name };
			var images = [];
			var titles = SmileyInfor[key];
			for (var i = 0; i < titles.length; i++) {
				var index = (i + 1).toString();
				index = index.length == 1 ? "0" + index : index;
				var image = {
					title: titles[i],
					url: BaseUrl + EmotionTabs[key].path + EmotionTabs[key].prefix + index + ".gif?v=1.1"
				};
				images.push(image);
			}
			tab.images = images;
			tabs.push(tab);
		}
		return tabs;
	},
	render: function render() {
		var tabs = [];
		var EmotionTabs = this.getEmotionTabs();

		for (var i = 0; i < EmotionTabs.length; i++) {
			tabs.push({
				title: EmotionTabs[i].title,
				images: EmotionTabs[i].images,
				component: React.createElement(EmotionPanel, { images: EmotionTabs[i].images, name: 'common-images', onSelectImage: this.handleSelectImage })
			});
		}
		var buttons = [];
		return React.createElement(
			Dialog,
			{ ref: 'root', className: 'emotion-dropdwon', width: 700, height: 508, title: '表情', buttons: buttons, onClose: this.close },
			React.createElement(TabGroup, { tabs: tabs })
		);
	}
});

module.exports = EmotionDialog;

},{"../../constants/EditorConstants":18,"../base/Dialog.react":2,"../base/TabGroup.react":4,"react":undefined,"react-dom":undefined}],11:[function(require,module,exports){
'use strict';

var React = require('react');
var ComboBox = require('../base/ComboBox.react');

var FontFamilyDropdown = React.createClass({
	displayName: 'FontFamilyDropdown',

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
	handleSelect: function handleSelect(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var value = target.getAttribute('data-value');
		if (this.state.handle) {
			this.state.handle(e, value);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	render: function render() {
		var handleSelect = this.handleSelect;
		var fontfamily = this.props.fontfamily ? this.props.fontfamily : [];
		var props = this.props;
		return React.createElement(
			ComboBox,
			{ ref: 'root', className: 'color-combobox' },
			React.createElement(
				'ul',
				null,
				fontfamily.map(function (ele, pos) {
					return React.createElement(
						'li',
						{ className: ele.value == props.value ? "active" : "", key: pos, 'data-value': ele.value, onClick: handleSelect },
						React.createElement(
							'span',
							{ 'data-value': ele.value, style: { "fontFamily": ele.value } },
							ele.name
						)
					);
				})
			)
		);
	}
});

module.exports = FontFamilyDropdown;

},{"../base/ComboBox.react":1,"react":undefined}],12:[function(require,module,exports){
'use strict';

var React = require('react');
var ComboBox = require('../base/ComboBox.react');

var FontSizeDropdown = React.createClass({
	displayName: 'FontSizeDropdown',

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
	handleSelect: function handleSelect(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var value = target.getAttribute('data-value');
		if (this.state.handle) {
			this.state.handle(e, value);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	render: function render() {
		var handleSelect = this.handleSelect;
		var fontsize = this.props.fontsize ? this.props.fontsize : [];
		var props = this.props;
		return React.createElement(
			ComboBox,
			{ ref: 'root', className: 'color-combobox' },
			React.createElement(
				'ul',
				null,
				fontsize.map(function (ele, pos) {
					return React.createElement(
						'li',
						{ className: ele.value == props.value ? "active" : "", key: pos, 'data-value': ele.value, onClick: handleSelect },
						React.createElement(
							'span',
							{ 'data-value': ele.value, style: { "fontSize": ele.value } },
							ele.name
						)
					);
				})
			)
		);
	}
});

module.exports = FontSizeDropdown;

},{"../base/ComboBox.react":1,"react":undefined}],13:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TabGroup = require('../base/TabGroup.react');
var Dropdown = require('../base/Dropdown.react');

var _require = require('../../constants/EditorConstants');

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

},{"../../constants/EditorConstants":18,"../base/Dropdown.react":3,"../base/TabGroup.react":4,"react":undefined,"react-dom":undefined}],14:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Dialog = require('../base/Dialog.react');
var TabGroup = require('../base/TabGroup.react');
var Uploader = require('../../utils/FileUpload');

var ImageUpload = React.createClass({
	displayName: 'ImageUpload',

	getInitialState: function getInitialState() {
		return {
			images: [],
			dragEnter: false
		};
	},
	handleUploadFile: function handleUploadFile(file) {
		var _self = this;
		var images = this.state.images;
		var mask = ReactDOM.findDOMNode(this.refs.mask);
		var uploader = this.props.customUploader ? this.props.customUploader : Uploader;
		uploader.uploadFile({
			file: file,
			filename: this.props.name,
			url: this.props.url,
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
	},
	handleChange: function handleChange(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		if (target.files.length > 0) {
			this.handleUploadFile(target.files[0]);
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
	handleDrop: function handleDrop(e) {
		e.preventDefault();
		var files = e.dataTransfer.files;
		if (files.length > 0) {
			this.handleUploadFile(files[0]);
		}
		this.setState({
			dragEnter: false
		});
		console.log(e.type);
	},
	handleDragOver: function handleDragOver(e) {
		e.preventDefault();
		console.log(e.type);
	},
	handleDragEnter: function handleDragEnter(e) {
		this.setState({
			dragEnter: true
		});
		console.log(e.type);
	},
	handleDragLeave: function handleDragLeave(e) {
		this.setState({
			dragEnter: false
		});
		console.log(e.type);
	},
	render: function render() {
		var images = this.state.images;
		var dragEnter = this.state.dragEnter;
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
				{ className: "image-content" + (dragEnter ? " drag-enter" : ""), onDrop: this.handleDrop,
					onDragOver: this.handleDragOver,
					onDragEnter: this.handleDragEnter,
					onDragLeave: this.handleDragLeave,
					onDragEnd: this.handleDragLeave,
					onDragStart: this.handleDragEnter },
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
	propTypes: {
		uploader: React.PropTypes.object,
		customUploader: React.PropTypes.object
	},
	getDefaultProps: function getDefaultProps() {
		return {
			uploader: {
				url: "/upload",
				name: "file"
			},
			customUploader: null
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
		var uploader = this.props.uploader;
		var buttons = [{ name: "btn-ok", content: "确定", onClick: this.handleOkClick }, { name: "btn-cancel", content: "取消", onClick: this.close }];
		var tabs = [{ title: "本地上传", component: React.createElement(ImageUpload, { ref: 'image', onChange: this.handleChange, name: uploader.name, url: uploader.url }) }, { title: "网络图片", component: React.createElement(ImageSearch, { ref: 'image', onChange: this.handleChange }) }];
		return React.createElement(
			Dialog,
			{ ref: 'modal', className: 'image-dialog', width: 700, height: 508, title: '图片', buttons: buttons, onClose: this.close },
			React.createElement(TabGroup, { tabs: tabs, ref: 'tab' })
		);
	}
});

module.exports = ImageDialog;

},{"../../utils/FileUpload":24,"../base/Dialog.react":2,"../base/TabGroup.react":4,"react":undefined,"react-dom":undefined}],15:[function(require,module,exports){
'use strict';

var React = require('react');
var ComboBox = require('../base/ComboBox.react');

var ParagraphDropdown = React.createClass({
	displayName: 'ParagraphDropdown',

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
	handleSelect: function handleSelect(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var value = target.getAttribute('data-value');
		if (this.state.handle) {
			this.state.handle(e, value);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	render: function render() {
		var handleSelect = this.handleSelect;
		var paragraph = this.props.paragraph ? this.props.paragraph : [];
		var props = this.props;
		return React.createElement(
			ComboBox,
			{ ref: 'root', className: 'color-combobox' },
			React.createElement(
				'ul',
				null,
				paragraph.map(function (ele, pos) {
					return React.createElement(
						'li',
						{ className: ele.value == props.value ? "active" : "", key: pos, 'data-value': ele.value, onClick: handleSelect },
						React.createElement(ele.value, { "data-value": ele.value }, ele.name)
					);
				})
			)
		);
	}
});

module.exports = ParagraphDropdown;

},{"../base/ComboBox.react":1,"react":undefined}],16:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TabGroup = require('../base/TabGroup.react');
var Dialog = require('../base/Dialog.react');

var _require = require('../../constants/EditorConstants');

var SpecialChars = _require.SpecialChars;

var SCChars = React.createClass({
	displayName: 'SCChars',

	handleClick: function handleClick(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var char = target.getAttribute("data-char");
		var id = 'char-' + new Date().valueOf();
		if (this.props.onSelectChar) {
			this.props.onSelectChar(e, char);
		}
	},
	render: function render() {
		var chars = this.props.chars;
		var handleClick = this.handleClick;
		return React.createElement(
			'ul',
			{ className: "special-chars " + this.props.name },
			chars.map(function (ele, pos) {
				return React.createElement(
					'li',
					{ className: 'special-char', key: pos, 'data-char': ele, onClick: handleClick },
					ele
				);
			})
		);
	}
});

var SpecialCharsDialog = React.createClass({
	displayName: 'SpecialCharsDialog',

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
	handleSelectChar: function handleSelectChar(e, char) {
		e = e || event;
		if (this.state.handle) {
			this.state.handle(e, char);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	render: function render() {
		var tabs = [];
		for (var i = 0; i < SpecialChars.length; i++) {
			tabs.push({
				title: SpecialChars[i].title,
				chars: SpecialChars[i].chars,
				component: React.createElement(SCChars, { chars: SpecialChars[i].chars, name: 'common-chars', onSelectChar: this.handleSelectChar })
			});
		}
		var buttons = [];
		return React.createElement(
			Dialog,
			{ ref: 'root', className: 'special-chars-dialog', width: 700, height: 508, title: '特殊字符', buttons: buttons, onClose: this.close },
			React.createElement(TabGroup, { tabs: tabs })
		);
	}
});

module.exports = SpecialCharsDialog;

},{"../../constants/EditorConstants":18,"../base/Dialog.react":2,"../base/TabGroup.react":4,"react":undefined,"react-dom":undefined}],17:[function(require,module,exports){
'use strict';

var React = require('react');
var Dropdown = require('../base/Dropdown.react');

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

},{"../base/Dropdown.react":3,"react":undefined}],18:[function(require,module,exports){
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
	},
	"touppercase": {
		title: "转换大写",
		disabled: false
	},
	"tolowercase": {
		title: "转换小写",
		disabled: false
	},
	"indent": {
		title: "增加缩进",
		disabled: false
	},
	"outdent": {
		title: "减少缩进",
		disabled: false
	},
	"spechars": {
		title: "特殊符号",
		disabled: false
	},
	"fontborder": {
		title: "字体边框",
		disabled: false
	},
	"date": {
		title: "插入日期",
		disabled: false
	},
	"time": {
		title: "插入时间",
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
var toArray = function toArray(str) {
	return str.split(",");
};
var SpecialChars = [{ name: "tsfh", title: "特殊字符", chars: toArray("、,。,·,ˉ,ˇ,¨,〃,々,—,～,‖,…,‘,’,“,”,〔,〕,〈,〉,《,》,「,」,『,』,〖,〗,【,】,±,×,÷,∶,∧,∨,∑,∏,∪,∩,∈,∷,√,⊥,∥,∠,⌒,⊙,∫,∮,≡,≌,≈,∽,∝,≠,≮,≯,≤,≥,∞,∵,∴,♂,♀,°,′,″,℃,＄,¤,￠,￡,‰,§,№,☆,★,○,●,◎,◇,◆,□,■,△,▲,※,→,←,↑,↓,〓,〡,〢,〣,〤,〥,〦,〧,〨,〩,㊣,㎎,㎏,㎜,㎝,㎞,㎡,㏄,㏎,㏑,㏒,㏕,︰,￢,￤,℡,ˊ,ˋ,˙,–,―,‥,‵,℅,℉,↖,↗,↘,↙,∕,∟,∣,≒,≦,≧,⊿,═,║,╒,╓,╔,╕,╖,╗,╘,╙,╚,╛,╜,╝,╞,╟,╠,╡,╢,╣,╤,╥,╦,╧,╨,╩,╪,╫,╬,╭,╮,╯,╰,╱,╲,╳,▁,▂,▃,▄,▅,▆,▇,�,█,▉,▊,▋,▌,▍,▎,▏,▓,▔,▕,▼,▽,◢,◣,◤,◥,☉,⊕,〒,〝,〞") }, { name: "lmsz", title: "罗马字符", chars: toArray("ⅰ,ⅱ,ⅲ,ⅳ,ⅴ,ⅵ,ⅶ,ⅷ,ⅸ,ⅹ,Ⅰ,Ⅱ,Ⅲ,Ⅳ,Ⅴ,Ⅵ,Ⅶ,Ⅷ,Ⅸ,Ⅹ,Ⅺ,Ⅻ") }, { name: "szfh", title: "数学字符", chars: toArray("⒈,⒉,⒊,⒋,⒌,⒍,⒎,⒏,⒐,⒑,⒒,⒓,⒔,⒕,⒖,⒗,⒘,⒙,⒚,⒛,⑴,⑵,⑶,⑷,⑸,⑹,⑺,⑻,⑼,⑽,⑾,⑿,⒀,⒁,⒂,⒃,⒄,⒅,⒆,⒇,①,②,③,④,⑤,⑥,⑦,⑧,⑨,⑩,㈠,㈡,㈢,㈣,㈤,㈥,㈦,㈧,㈨,㈩") }, { name: "rwfh", title: "日文字符", chars: toArray("ぁ,あ,ぃ,い,ぅ,う,ぇ,え,ぉ,お,か,が,き,ぎ,く,ぐ,け,げ,こ,ご,さ,ざ,し,じ,す,ず,せ,ぜ,そ,ぞ,た,だ,ち,ぢ,っ,つ,づ,て,で,と,ど,な,に,ぬ,ね,の,は,ば,ぱ,ひ,び,ぴ,ふ,ぶ,ぷ,へ,べ,ぺ,ほ,ぼ,ぽ,ま,み,む,め,も,ゃ,や,ゅ,ゆ,ょ,よ,ら,り,る,れ,ろ,ゎ,わ,ゐ,ゑ,を,ん,ァ,ア,ィ,イ,ゥ,ウ,ェ,エ,ォ,オ,カ,ガ,キ,ギ,ク,グ,ケ,ゲ,コ,ゴ,サ,ザ,シ,ジ,ス,ズ,セ,ゼ,ソ,ゾ,タ,ダ,チ,ヂ,ッ,ツ,ヅ,テ,デ,ト,ド,ナ,ニ,ヌ,ネ,ノ,ハ,バ,パ,ヒ,ビ,ピ,フ,ブ,プ,ヘ,ベ,ペ,ホ,ボ,ポ,マ,ミ,ム,メ,モ,ャ,ヤ,ュ,ユ,ョ,ヨ,ラ,リ,ル,レ,ロ,ヮ,ワ,ヰ,ヱ,ヲ,ン,ヴ,ヵ,ヶ") }, { name: "xlzm", title: "希腊字符", chars: toArray("Α,Β,Γ,Δ,Ε,Ζ,Η,Θ,Ι,Κ,Λ,Μ,Ν,Ξ,Ο,Π,Ρ,Σ,Τ,Υ,Φ,Χ,Ψ,Ω,α,β,γ,δ,ε,ζ,η,θ,ι,κ,λ,μ,ν,ξ,ο,π,ρ,σ,τ,υ,φ,χ,ψ,ω") }, { name: "ewzm", title: "俄文字符", chars: toArray("А,Б,В,Г,Д,Е,Ё,Ж,З,И,Й,К,Л,М,Н,О,П,Р,С,Т,У,Ф,Х,Ц,Ч,Ш,Щ,Ъ,Ы,Ь,Э,Ю,Я,а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я") }, { name: "pyzm", title: "拼音字母", chars: toArray("ā,á,ǎ,à,ē,é,ě,è,ī,í,ǐ,ì,ō,ó,ǒ,ò,ū,ú,ǔ,ù,ǖ,ǘ,ǚ,ǜ,ü") }, { name: "yyyb", title: "英语音标", chars: toArray("i:,i,e,æ,ʌ,ə:,ə,u:,u,ɔ:,ɔ,a:,ei,ai,ɔi,əu,au,iə,εə,uə,p,t,k,b,d,g,f,s,ʃ,θ,h,v,z,ʒ,ð,tʃ,tr,ts,dʒ,dr,dz,m,n,ŋ,l,r,w,j,") }, { name: "zyzf", title: "其它", chars: toArray("ㄅ,ㄆ,ㄇ,ㄈ,ㄉ,ㄊ,ㄋ,ㄌ,ㄍ,ㄎ,ㄏ,ㄐ,ㄑ,ㄒ,ㄓ,ㄔ,ㄕ,ㄖ,ㄗ,ㄘ,ㄙ,ㄚ,ㄛ,ㄜ,ㄝ,ㄞ,ㄟ,ㄠ,ㄡ,ㄢ,ㄣ,ㄤ,ㄥ,ㄦ,ㄧ,ㄨ") }];

var EmotionImages = {
	DemoUrl: "http://img.baidu.com/hi/tsj/t_0001.gif",
	BaseUrl: "http://img.baidu.com/hi/",
	SmileyInfor: {
		tab0: ['Kiss', 'Love', 'Yeah', '啊！', '背扭', '顶', '抖胸', '88', '汗', '瞌睡', '鲁拉', '拍砖', '揉脸', '生日快乐', '大笑', '瀑布汗~', '惊讶', '臭美', '傻笑', '抛媚眼', '发怒', '打酱油', '俯卧撑', '气愤', '?', '吻', '怒', '胜利', 'HI', 'KISS', '不说', '不要', '扯花', '大心', '顶', '大惊', '飞吻', '鬼脸', '害羞', '口水', '狂哭', '来', '发财了', '吃西瓜', '套牢', '害羞', '庆祝', '我来了', '敲打', '晕了', '胜利', '臭美', '被打了', '贪吃', '迎接', '酷', '微笑', '亲吻', '调皮', '惊恐', '耍酷', '发火', '害羞', '汗水', '大哭', '', '加油', '困', '你NB', '晕倒', '开心', '偷笑', '大哭', '滴汗', '叹气', '超赞', '??', '飞吻', '天使', '撒花', '生气', '被砸', '吓傻', '随意吐'],
		tab1: ['Kiss', 'Love', 'Yeah', '啊！', '背扭', '顶', '抖胸', '88', '汗', '瞌睡', '鲁拉', '拍砖', '揉脸', '生日快乐', '摊手', '睡觉', '瘫坐', '无聊', '星星闪', '旋转', '也不行', '郁闷', '正Music', '抓墙', '撞墙至死', '歪头', '戳眼', '飘过', '互相拍砖', '砍死你', '扔桌子', '少林寺', '什么？', '转头', '我爱牛奶', '我踢', '摇晃', '晕厥', '在笼子里', '震荡'],
		tab2: ['大笑', '瀑布汗~', '惊讶', '臭美', '傻笑', '抛媚眼', '发怒', '我错了', 'money', '气愤', '挑逗', '吻', '怒', '胜利', '委屈', '受伤', '说啥呢？', '闭嘴', '不', '逗你玩儿', '飞吻', '眩晕', '魔法', '我来了', '睡了', '我打', '闭嘴', '打', '打晕了', '刷牙', '爆揍', '炸弹', '倒立', '刮胡子', '邪恶的笑', '不要不要', '爱恋中', '放大仔细看', '偷窥', '超高兴', '晕', '松口气', '我跑', '享受', '修养', '哭', '汗', '啊~', '热烈欢迎', '打酱油', '俯卧撑', '?'],
		tab3: ['HI', 'KISS', '不说', '不要', '扯花', '大心', '顶', '大惊', '飞吻', '鬼脸', '害羞', '口水', '狂哭', '来', '泪眼', '流泪', '生气', '吐舌', '喜欢', '旋转', '再见', '抓狂', '汗', '鄙视', '拜', '吐血', '嘘', '打人', '蹦跳', '变脸', '扯肉', '吃To', '吃花', '吹泡泡糖', '大变身', '飞天舞', '回眸', '可怜', '猛抽', '泡泡', '苹果', '亲', '', '骚舞', '烧香', '睡', '套娃娃', '捅捅', '舞倒', '西红柿', '爱慕', '摇', '摇摆', '杂耍', '招财', '被殴', '被球闷', '大惊', '理想', '欧打', '呕吐', '碎', '吐痰'],
		tab4: ['发财了', '吃西瓜', '套牢', '害羞', '庆祝', '我来了', '敲打', '晕了', '胜利', '臭美', '被打了', '贪吃', '迎接', '酷', '顶', '幸运', '爱心', '躲', '送花', '选择'],
		tab5: ['微笑', '亲吻', '调皮', '惊讶', '耍酷', '发火', '害羞', '汗水', '大哭', '得意', '鄙视', '困', '夸奖', '晕倒', '疑问', '媒婆', '狂吐', '青蛙', '发愁', '亲吻', '', '爱心', '心碎', '玫瑰', '礼物', '哭', '奸笑', '可爱', '得意', '呲牙', '暴汗', '楚楚可怜', '困', '哭', '生气', '惊讶', '口水', '彩虹', '夜空', '太阳', '钱钱', '灯泡', '咖啡', '蛋糕', '音乐', '爱', '胜利', '赞', '鄙视', 'OK'],
		tab6: ['男兜', '女兜', '开心', '乖乖', '偷笑', '大笑', '抽泣', '大哭', '无奈', '滴汗', '叹气', '狂晕', '委屈', '超赞', '??', '疑问', '飞吻', '天使', '撒花', '生气', '被砸', '口水', '泪奔', '吓傻', '吐舌头', '点头', '随意吐', '旋转', '困困', '鄙视', '狂顶', '篮球', '再见', '欢迎光临', '恭喜发财', '稍等', '我在线', '恕不议价', '库房有货', '货在路上']
	},
	EmotionTabs: {
		tab0: { name: "精选", prefix: "j_00", path: "jx2/" },
		tab1: { name: "兔斯基", prefix: "t_00", path: "tsj/" },
		tab2: { name: "绿豆蛙", prefix: "w_00", path: "ldw/" },
		tab3: { name: "BOBO", prefix: "B_00", path: "bobo/" },
		tab4: { name: "baby猫", prefix: "C_00", path: "babycat/" },
		tab5: { name: "泡泡", prefix: "i_f", path: "face/" },
		tab6: { name: "有啊", prefix: "y_00", path: "youa/" }
	}
};

module.exports = {
	EditorIconTypes: EditorIconTypes,
	ColorTypes: ColorTypes,
	FormulaTypes: FormulaTypes,
	SpecialChars: SpecialChars,
	EmotionImages: EmotionImages
};

},{}],19:[function(require,module,exports){
"use strict";

var EditorDOM = {
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
	}
};
module.exports = EditorDOM;

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
'use strict';

var React = require('react');
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

},{"react":undefined,"react-dom":undefined}],22:[function(require,module,exports){
"use strict";

var EditorDOM = require('./EditorDOM');

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
		if (this.range.collapsed) return [];
		var parent = this.range.commonAncestorContainer;
		var startNode = this.range.startContainer;
		var startOffset = this.range.startOffset;
		var endNode = this.range.endContainer;
		var endOffset = this.range.endOffset;
		var textNodes = [];

		if (startNode === endNode && EditorDOM.isTextNode(startNode)) {
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
				if (EditorDOM.isTextNode(childNode)) {
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
		if (this.range.collapsed) return [];
		var parent = this.range.commonAncestorContainer;
		var startNode = this.range.startContainer;
		var endNode = this.range.endContainer;
		var spanNodes = [];

		if (startNode === endNode && EditorDOM.isSpanNode(startNode)) {
			spanNodes.push(startNode);
		} else {
			var childNodes = parent.childNodes.toArray(),
			    i = 0,
			    startFlag = false;
			var childNode = childNodes.shift();
			while (childNode) {
				if (childNode === startNode) {
					startFlag = true;
					if (EditorDOM.isSpanNode(childNode.parentNode)) {
						spanNodes.push(childNode.parentNode);
					}
				}
				if (EditorDOM.isSpanNode(childNode) && startFlag) {
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
		return spanNodes;
	},
	getParagraphs: function getParagraphs() {
		var textNodes = this.getTextNodes();
		var parents = [];
		for (var i = 0; i < textNodes.length; i++) {
			if (parents.indexOf(textNodes[i].childNode.parentElement) == -1) parents.push(textNodes[i].childNode.parentElement);
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
		if (this.selection && this.range) {
			this.range.setStart(startContainer, startOffset);
			this.range.setEnd(endContainer, endOffset);
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
		var canActiveIcons = "bold italic underline strikethrough superscript subscript justifycenter justifyleft justifyright";
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
						rangeState["outdent"] = { active: false, icon: "indent" };
						break;
				}
				parentElement = parentElement.parentElement;
			}
		}

		if (!rangeState["forecolor"]) rangeState["forecolor"] = { color: 'transparent', icon: "forecolor" };
		if (!rangeState["backcolor"]) rangeState["backcolor"] = { color: 'transparent', icon: "backcolor" };
		if (!rangeState["fontsize"] || !rangeState["fontsize"].value) rangeState["fontsize"] = { value: "3", icon: "fontsize" };
		if (!rangeState["paragraph"] || !rangeState["paragraph"].value) rangeState["paragraph"] = { value: "p", icon: "fontsize" };
		if (!rangeState["fontfamily"] || !rangeState["fontfamily"].value) rangeState["fontfamily"] = { value: "宋体, SimSun", icon: "fontfamily" };
		if (!rangeState["indent"]) {
			rangeState["outdent"] = { active: true, icon: "indent" };
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
	}
};
module.exports = EditorSelection;

},{"./EditorDOM":19}],23:[function(require,module,exports){
"use strict";

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
				timeouts[i].call(timeouts[i].prototype, timeouts[i].prototype.endTime);
				timeouts[i].prototype.disabled = true;
			}
		}
		for (var i = 0; i < intervals.length; i++) {
			intervals[i].prototype.endTime = new Date().valueOf();
			if (intervals[i].prototype.endTime - intervals[i].prototype.lastTime >= intervals[i].prototype.ms && !intervals[i].prototype.disabled) {
				intervals[i].call(intervals[i].prototype, intervals[i].prototype.endTime);
				intervals[i].prototype.lastTime = intervals[i].prototype.endTime;
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

module.exports = EditorTimer;

},{}],24:[function(require,module,exports){
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

},{}],"react-umeditor":[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');

var _require = require('./constants/EditorConstants');

var EditorIconTypes = _require.EditorIconTypes;

// utlils
var EditorHistory = require('./utils/EditorHistory');
var EditorSelection = require('./utils/EditorSelection');
var EditorDOM = require('./utils/EditorDOM');
var EditorResize = require('./utils/EditorResize.react');
var EditorTimer = require('./utils/EditorTimer');
// dialog & dropdown
var ColorDropdown = require('./components/plugins/ColorDropdown.react');
var FormulaDropdown = require('./components/plugins/FormulaDropdown.react');
var TablePickerDropdown = require('./components/plugins/TablePickerDropdown.react');
// combobox
var FontSizeComboBox = require('./components/plugins/FontSizeComboBox.react');
var FontFamilyComboBox = require('./components/plugins/FontFamilyComboBox.react');
var ParagraphComboBox = require('./components/plugins/ParagraphComboBox.react');
// dialog
var EmotionDialog = require('./components/plugins/EmotionDialog.react');
var SpecialCharsDialog = require('./components/plugins/SpecialCharsDialog.react');
var ImageDialog = require('./components/plugins/ImageDialog.react');

// base components
var EditorToolbar = require('./components/core/EditorToolbar.react');
var EditorTextArea = require('./components/core/EditorTextArea.react');
var EditorContentEditableDiv = require('./components/core/EditorContentEditableDiv.react');

// 需要外部引用MathQuill
var MQ = MathQuill.getInterface(2);

// key down context
var saveSceneTimer = null;
var maxInputCount = 20;
var lastKeyCode = null;
var keycont = 0;

if (!Date.prototype.Format) {
	Date.prototype.Format = function (n) {
		var i = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			S: this.getMilliseconds()
		},
		    t;
		/(y+)/.test(n) && (n = n.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
		for (t in i) new RegExp("(" + t + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? i[t] : ("00" + i[t]).substr(("" + i[t]).length)));
		return n;
	};
}

/**
* 对外接口方法
* @findDOMNode: 获取"root","editarea","toolbar","color"的ref对象以及相应的dom对象
* @setContent: 设置html格式数据
* @getContent: 获取html格式数据
* @onFocus: 监听focus事件
* @focusEditor: 聚焦到Editor上
* @defaultValue: 默认内容
* @value: 编辑器的值
* @icons: 工具条上需要显示的图标
**/

var Editor = React.createClass({
	displayName: 'Editor',

	// init & update
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
	propTypes: {
		"plugins": React.PropTypes.object,
		"fontFamily": React.PropTypes.array,
		"fontSize": React.PropTypes.array,
		"paragraph": React.PropTypes.array
	},
	getDefaultProps: function getDefaultProps() {
		return {
			"plugins": {
				"image": {
					"uploader": {
						name: "file",
						url: "/upload"
					},
					"customUploader": null
				}
			},
			"fontFamily": [{ "name": "宋体", value: "宋体, SimSun", defualt: true }, { "name": "隶书", value: "隶书, SimLi" }, { "name": "楷体", value: "楷体, SimKai" }, { "name": "微软雅黑", value: "微软雅黑, Microsoft YaHei" }, { "name": "黑体", value: "黑体, SimHei" }, { "name": "arial", value: "arial, helvetica, sans-serif" }, { "name": "arial black", value: "arial black, avant garde" }, { "name": "omic sans ms", value: "omic sans ms" }, { "name": "impact", value: "impact, chicago" }, { "name": "times new roman", value: "times new roman" }, { "name": "andale mono", value: "andale mono" }],
			"fontSize": [{ "name": "10px", value: "1" }, { "name": "12px", value: "2" }, { "name": "16px", value: "3", defualt: true }, { "name": "18px", value: "4" }, { "name": "24px", value: "5" }, { "name": "32px", value: "6" }, { "name": "38px", value: "7" }],
			"paragraph": [{ "name": "段落", value: "p", defualt: true }, { "name": "标题1", value: "h1" }, { "name": "标题2", value: "h2" }, { "name": "标题3", value: "h3" }, { "name": "标题4", value: "h4" }, { "name": "标题5", value: "h5" }, { "name": "标题6", value: "h6" }]
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
	componentWillUnmont: function componentWillUnmont() {
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		editarea.removeEventListener('keydown', this.handleKeyDown);
		editarea.removeEventListener('keyup', this.handleKeyUp);
	},
	// event handler
	handleKeyDown: function handleKeyDown(evt) {
		evt = evt || event;
		var target = evt.target || evt.srcElement;
		if (target.className && target.className.indexOf('editor-contenteditable-div') != -1) {
			var keyCode = evt.keyCode || evt.which;
			var autoSave = this.autoSave;
			if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
				if (EditorHistory.getCommandStack().length == 0) {
					autoSave();
					keycont = 0;
				}
				clearTimeout(saveSceneTimer);
				saveSceneTimer = EditorTimer.setTimeout(function () {
					var interalTimer = EditorTimer.setInterval(function () {
						autoSave();
						keycont = 0;
						EditorTimer.clearInterval(interalTimer);
					}, 300);
				}, 200);
				lastKeyCode = keyCode;
				keycont++;
				if (keycont >= maxInputCount) {
					autoSave();
					keycont = 0;
				}
			}
		}
		EditorDOM.stopPropagation(evt);
	},
	handleKeyUp: function handleKeyUp(evt) {
		evt = evt || event;
		var target = evt.target || evt.srcElement;
		if (target.className && target.className.indexOf('editor-contenteditable-div') != -1) {
			var keyCode = evt.keyCode || evt.which;
			if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
				// some handle
			}
		}
		EditorDOM.stopPropagation(evt);
	},
	handleFocus: function handleFocus(e) {
		if (this.props.onFocus) {
			this.props.onFocus(e, this.findDOMNode('root'));
		}
		EditorDOM.stopPropagation(e);
	},
	handleClick: function handleClick(e) {
		EditorDOM.stopPropagation(e);
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
					case "paragraph":
					case "fontfamily":
					case "fontsize":
						editorState.icons[icon].value = rangeState[icon].value;
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
	handleToolbarIconClick: function handleToolbarIconClick(e, state) {
		e = e || event;
		var target = e.target || e.srcElement;
		var offsetPosition = this.getOffsetRootParentPosition(target);

		var handleRangeChange = this.handleRangeChange;
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		var editorState = this.state.editorState;
		EditorSelection.cloneRange();
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
			case "removeformat":
				EditorHistory.execCommand(state.icon, false, null);
				EditorSelection.storeRange();
				var spanNodes = EditorSelection.getSpanNodes();
				for (var i = 0; i < spanNodes.length; i++) {
					switch (spanNodes[i].className) {
						case "font-border":
							var spanNode = spanNodes[i];
							var parentNode = spanNode.parentNode;
							var nextSibling = spanNode.nextSibling;

							for (var c = 0; c < spanNode.childNodes.length; c++) {
								parentNode.insertBefore(spanNode.childNodes[c].cloneNode(), nextSibling);
							}
							parentNode.removeChild(spanNodes[i]);
							break;
					}
				}
				EditorSelection.restoreRange();
				break;
			case "bold":
			case "italic":
			case "underline":
			case "strikethrough":
			case "subscript":
			case "superscript":
			case "insertorderedlist":
			case "insertunorderedlist":
			case "selectall":
			case "justifyleft":
			case "justifyright":
			case "justifycenter":
			case "indent":
			case "outdent":
				EditorHistory.execCommand(state.icon, false, null);
				break;
			case "touppercase":
			case "tolowercase":
				EditorSelection.storeRange();
				var textNodes = EditorSelection.getTextNodes();
				for (var i = 0; i < textNodes.length; i++) {
					var node = textNodes[i].childNode;
					var start = textNodes[i].startOffset;
					var end = textNodes[i].endOffset;
					node.nodeValue = node.nodeValue.substring(0, start) + (state.icon == "touppercase" ? node.nodeValue.substring(start, end).toUpperCase() : node.nodeValue.substring(start, end).toLowerCase()) + node.nodeValue.substring(end, node.length);
				}
				EditorHistory.execCommand(state.icon, false, null);
				EditorSelection.restoreRange();
				break;
			case "fontborder":
				var textNodes = EditorSelection.getTextNodes();
				var startNode = null,
				    endNode = null,
				    startOffset = 0,
				    endOffset = 0;
				for (var i = 0; i < textNodes.length; i++) {
					// 获取
					var node = textNodes[i].childNode;
					var start = textNodes[i].startOffset;
					var end = textNodes[i].endOffset;
					// 拷贝
					var cloneNode = node.cloneNode();
					var startText = cloneNode.nodeValue.substring(0, start);
					var endText = cloneNode.nodeValue.substring(end, cloneNode.length);
					var borderText = cloneNode.nodeValue.substring(start, end);
					var span = null;
					var textParentNode = textNodes[i].childNode.parentNode;
					if (textParentNode && textParentNode.className && textParentNode.className == "font-border") {
						if (i == 0) {
							startNode = textNodes[i].childNode;
							startOffset = start;
						}
						if (i == textNodes.length - 1) {
							endNode = textNodes[i].childNode;
							endOffset = end;
						}
					} else {
						// 重新赋值
						node.nodeValue = startText;
						span = document.createElement("span");
						span.className = "font-border";
						span.innerHTML = borderText;
						span.style.border = "1px solid #000";
						node.parentNode.insertBefore(span, node.nextSibling);
						if (endText != "") {
							node.parentNode.insertBefore(document.createTextNode(endText), span.nextSibling);
						}
						if (i == 0) startNode = span.childNodes[0];
						if (i == textNodes.length - 1) {
							endNode = span.childNodes[0];
							endOffset = span.childNodes[0].length;
						}
					}
				}
				EditorSelection.addRange(startNode, startOffset, endNode, endOffset);
				// 合并相同font-border元素
				var spanNodes = EditorSelection.getSpanNodes();
				for (var i = 0; i < spanNodes.length - 1; i++) {
					var spanNode = spanNodes[i];
					var parentNode = spanNodes[i].parentNode;

					if (EditorDOM.isNullOfTextNode(spanNode.nextSibling)) {
						// 移除空元素
						parentNode.removeChild(spanNode.nextSibling);
					}
					if (spanNode.nextSibling === spanNodes[i + 1]) {
						var nextSiblingChildNodes = spanNodes[i + 1].childNodes;
						for (var c = 0; c < nextSiblingChildNodes.length; c++) {
							spanNode.appendChild(nextSiblingChildNodes[c].cloneNode());
						}
						// 移除老元素
						parentNode.removeChild(spanNodes[i + 1]);
						// 删除过后，重新指向
						spanNodes[i + 1] = spanNodes[i];
					}
				}
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
			case "fontsize":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;

				this.refs.fontsize.open(offsetPosition, function (e, fontsize) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('fontsize', false, fontsize);
					handleRangeChange();
				});
				break;
			case "fontfamily":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;

				this.refs.fontfamily.open(offsetPosition, function (e, fontfamily) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('fontname', false, fontfamily);
					handleRangeChange();
				});
				break;
			case "paragraph":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;

				this.refs.paragraph.open(offsetPosition, function (e, paragraph) {
					editarea.focus();
					EditorSelection.restoreRange();
					var paragraphs = EditorSelection.getParagraphs();
					for (var i = 0; i < paragraphs.length; i++) {
						switch (paragraphs[i].tagName.toUpperCase()) {
							case "TD":
							case "TH":
							case "DIV":
								var childNodes = paragraphs[i].childNodes;
								var paraElement = document.createElement(paragraph);
								for (var j = 0; j < childNodes.length; j++) {
									paraElement.appendChild(childNodes[j]);
								}
								paragraphs[i].appendChild(paraElement);
								break;
							case "P":
							case "H1":
							case "H2":
							case "H3":
							case "H4":
							case "H5":
							case "H6":
								var parentElement = paragraphs[i];
								var childNodes = paragraphs[i].childNodes;
								var paraElement = document.createElement(paragraph);
								var parentNode = parentElement.parentNode;
								parentNode.insertBefore(paraElement, parentElement.nextSibling);
								for (var j = 0; j < childNodes.length; j++) {
									paraElement.appendChild(childNodes[j]);
								}
								parentNode.removeChild(parentElement);
								break;
							default:
								break;
						}
					}
					EditorHistory.execCommand('paragraph', false, paragraph);
					handleRangeChange();
				});
				break;
			case "cleardoc":
				editorState.content = "<p><br/></p>";
				break;
			case "horizontal":
				EditorHistory.execCommand('inserthtml', false, "<hr/><p><br/></p>");
				break;
			case "date":
				var strDate = new Date().Format("yyyy-MM-dd");
				EditorHistory.execCommand('inserthtml', false, strDate);
				break;
			case "time":
				var strTime = new Date().Format('hh:mm:ss');
				EditorHistory.execCommand('inserthtml', false, strTime);
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
						EditorTimer.setTimeout(function () {
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
			case "spechars":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;
				offsetPosition.x -= offsetPosition.w / 2;
				this.refs.special.open(offsetPosition, function (e, char) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('inserthtml', false, char);
					handleRangeChange();
				});
				break;
			case "emotion":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;
				this.refs.emotion.open(offsetPosition, function (e, html) {
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
		EditorDOM.stopPropagation(e);
	},
	// utils
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
		$htmlElement.keydown(function (e) {
			mathField.focus();
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.keyup(function (e) {
			mathField.focus();
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.mouseup(function (e) {
			mathField.focus();
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.mousedown(function (e) {
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.mousemove(function (e) {
			EditorDOM.stopPropagation(e);
		});
		$(editarea).mousedown(function (e) {
			mathField.blur();
			EditorDOM.stopPropagation(e);
		});
		$(editarea).mousemove(function (e) {
			EditorDOM.stopPropagation(e);
		});
	},
	autoSave: function autoSave() {
		EditorHistory.execCommand('autosave', false, null);
	},
	// public functions
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
			EditorTimer.setTimeout(function () {
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
	// render functions 
	genEditArea: function genEditArea() {
		var showHtml = this.state.editorState.showHtml;
		if (showHtml) {
			return React.createElement(EditorTextArea, { ref: 'editarea' });
		} else {
			return React.createElement(EditorContentEditableDiv, { ref: 'editarea', onRangeChange: this.handleRangeChange });
		}
	},
	render: function render() {
		var editArea = this.genEditArea();
		var _props = this.props;
		var onBlur = _props.onBlur;
		var className = _props.className;
		var id = _props.id;
		var onFocus = _props.onFocus;
		var onClick = _props.onClick;

		var props = _objectWithoutProperties(_props, ['onBlur', 'className', 'id', 'onFocus', 'onClick']);

		var editorState = this.state.editorState;
		var _props2 = this.props;
		var fontSize = _props2.fontSize;
		var paragraph = _props2.paragraph;
		var fontFamily = _props2.fontFamily;

		return React.createElement(
			'div',
			_extends({ ref: 'root', id: id, className: "editor-container editor-default" + (className ? " " + className : ""), onClick: this.handleClick, onBlur: this.handleRangeChange, onFocus: this.handleFocus }, props),
			React.createElement(
				EditorToolbar,
				{ ref: 'toolbar', editorState: editorState, onIconClick: this.handleToolbarIconClick, icons: this.props.icons, paragraph: this.props.paragraph, fontsize: this.props.fontSize, fontfamily: this.props.fontFamily },
				React.createElement(ImageDialog, { ref: 'image', uploader: this.props.plugins.image.uploader, customUploader: this.props.plugins.image.customUploader }),
				React.createElement(ColorDropdown, { ref: 'color' }),
				React.createElement(FormulaDropdown, { ref: 'formula' }),
				React.createElement(TablePickerDropdown, { ref: 'table' }),
				React.createElement(SpecialCharsDialog, { ref: 'special' }),
				React.createElement(EmotionDialog, { ref: 'emotion' }),
				React.createElement(FontSizeComboBox, { ref: 'fontsize', fontsize: this.props.fontSize, value: editorState.icons["fontsize"] ? editorState.icons["fontsize"].value : fontSize[0].value }),
				React.createElement(FontFamilyComboBox, { ref: 'fontfamily', fontfamily: this.props.fontFamily, value: editorState.icons["fontfamily"] ? editorState.icons["fontfamily"].value : fontFamily[0].value }),
				React.createElement(ParagraphComboBox, { ref: 'paragraph', paragraph: this.props.paragraph, value: editorState.icons["paragraph"] ? editorState.icons["paragraph"].value : paragraph[0].value })
			),
			editArea,
			React.createElement(EditorResize, { ref: 'resize' })
		);
	}
});

module.exports = Editor;

},{"./components/core/EditorContentEditableDiv.react":5,"./components/core/EditorTextArea.react":7,"./components/core/EditorToolbar.react":8,"./components/plugins/ColorDropdown.react":9,"./components/plugins/EmotionDialog.react":10,"./components/plugins/FontFamilyComboBox.react":11,"./components/plugins/FontSizeComboBox.react":12,"./components/plugins/FormulaDropdown.react":13,"./components/plugins/ImageDialog.react":14,"./components/plugins/ParagraphComboBox.react":15,"./components/plugins/SpecialCharsDialog.react":16,"./components/plugins/TablePickerDropdown.react":17,"./constants/EditorConstants":18,"./utils/EditorDOM":19,"./utils/EditorHistory":20,"./utils/EditorResize.react":21,"./utils/EditorSelection":22,"./utils/EditorTimer":23,"react":undefined,"react-dom":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2xpdWhvbmcvd29ya2Rpci9yZWFjdC1lZGl0b3Ivc3JjL2NvbXBvbmVudHMvYmFzZS9Db21ib0JveC5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL2Jhc2UvRGlhbG9nLnJlYWN0LmpzIiwiL1VzZXJzL2xpdWhvbmcvd29ya2Rpci9yZWFjdC1lZGl0b3Ivc3JjL2NvbXBvbmVudHMvYmFzZS9Ecm9wZG93bi5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL2Jhc2UvVGFiR3JvdXAucmVhY3QuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvY29tcG9uZW50cy9jb3JlL0VkaXRvckNvbnRlbnRFZGl0YWJsZURpdi5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL2NvcmUvRWRpdG9ySWNvbi5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL2NvcmUvRWRpdG9yVGV4dEFyZWEucmVhY3QuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvY29tcG9uZW50cy9jb3JlL0VkaXRvclRvb2xiYXIucmVhY3QuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvY29tcG9uZW50cy9wbHVnaW5zL0NvbG9yRHJvcGRvd24ucmVhY3QuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvY29tcG9uZW50cy9wbHVnaW5zL0Vtb3Rpb25EaWFsb2cucmVhY3QuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvY29tcG9uZW50cy9wbHVnaW5zL0ZvbnRGYW1pbHlDb21ib0JveC5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL3BsdWdpbnMvRm9udFNpemVDb21ib0JveC5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL3BsdWdpbnMvRm9ybXVsYURyb3Bkb3duLnJlYWN0LmpzIiwiL1VzZXJzL2xpdWhvbmcvd29ya2Rpci9yZWFjdC1lZGl0b3Ivc3JjL2NvbXBvbmVudHMvcGx1Z2lucy9JbWFnZURpYWxvZy5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL3BsdWdpbnMvUGFyYWdyYXBoQ29tYm9Cb3gucmVhY3QuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvY29tcG9uZW50cy9wbHVnaW5zL1NwZWNpYWxDaGFyc0RpYWxvZy5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL3BsdWdpbnMvVGFibGVQaWNrZXJEcm9wZG93bi5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb25zdGFudHMvRWRpdG9yQ29uc3RhbnRzLmpzIiwiL1VzZXJzL2xpdWhvbmcvd29ya2Rpci9yZWFjdC1lZGl0b3Ivc3JjL3V0aWxzL0VkaXRvckRPTS5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy91dGlscy9FZGl0b3JIaXN0b3J5LmpzIiwiL1VzZXJzL2xpdWhvbmcvd29ya2Rpci9yZWFjdC1lZGl0b3Ivc3JjL3V0aWxzL0VkaXRvclJlc2l6ZS5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy91dGlscy9FZGl0b3JTZWxlY3Rpb24uanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvdXRpbHMvRWRpdG9yVGltZXIuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvdXRpbHMvRmlsZVVwbG9hZC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9lZGl0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRTdCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUNoQyxnQkFBZSxFQUFDLDJCQUFVO0FBQ3pCLFNBQU87QUFDTixPQUFJLEVBQUMsS0FBSztBQUNWLFdBQVEsRUFBQztBQUNSLEtBQUMsRUFBQyxDQUFDO0FBQ0gsS0FBQyxFQUFDLENBQUM7SUFDSDtHQUNELENBQUE7RUFDRDtBQUNELGtCQUFpQixFQUFDLDZCQUFVO0FBQzNCLFFBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQzVDO0FBQ0QscUJBQW9CLEVBQUMsZ0NBQVU7QUFDOUIsUUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDL0M7QUFDRCxLQUFJLEVBQUMsY0FBUyxRQUFRLEVBQUM7QUFDdEIsTUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLE9BQUksRUFBQyxJQUFJO0FBQ1QsV0FBUSxFQUFDLFFBQVE7R0FDakIsQ0FBQyxDQUFBO0VBQ0Y7QUFDRCxNQUFLLEVBQUMsaUJBQVU7QUFDZixNQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTztBQUM1QixNQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsT0FBSSxFQUFDLEtBQUs7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LFVBQVEsRUFBQyxLQUFLO0VBQ2Q7QUFDRCxlQUFjLEVBQUM7QUFDZCxPQUFLLEVBQUMsTUFBTTtBQUNaLFVBQVEsRUFBQyxLQUFLO0VBQ2Q7QUFDRCxPQUFNLEVBQUM7QUFDTixPQUFLLEVBQUMsS0FBSztBQUNYLFVBQVEsRUFBQyxLQUFLO0VBQ2Q7QUFDRCxTQUFRLEVBQUM7QUFDUixPQUFLLEVBQUMsTUFBTTtBQUNaLFVBQVEsRUFBQyxLQUFLO0VBQ2Q7QUFDRCxVQUFTLEVBQUM7QUFDVCxPQUFLLEVBQUMsSUFBSTtBQUNWLFVBQVEsRUFBQyxLQUFLO0VBQ2Q7QUFDRCxRQUFPLEVBQUM7QUFDUCxPQUFLLEVBQUMsSUFBSTtBQUNWLFVBQVEsRUFBQyxLQUFLO0VBQ2Q7QUFDRCxRQUFPLEVBQUM7QUFDUCxPQUFLLEVBQUMsSUFBSTtBQUNWLFVBQVEsRUFBQyxLQUFLO0VBQ2Q7QUFDRCxNQUFLLEVBQUM7QUFDTCxPQUFLLEVBQUMsTUFBTTtBQUNaLFVBQVEsRUFBQyxLQUFLO0VBQ2Q7QUFDRCxhQUFZLEVBQUM7QUFDWixPQUFLLEVBQUMsS0FBSztBQUNYLFVBQVEsRUFBQyxLQUFLO0VBQ2Q7QUFDRCxRQUFPLEVBQUM7QUFDUCxPQUFLLEVBQUMsSUFBSTtBQUNWLFVBQVEsRUFBQyxLQUFLO0VBQ2Q7QUFDRCxVQUFTLEVBQUM7QUFDVCxPQUFLLEVBQUMsSUFBSTtBQUNWLFVBQVEsRUFBQyxLQUFLO0VBQ2Q7QUFDRCxTQUFRLEVBQUM7QUFDUixPQUFLLEVBQUMsS0FBSztBQUNYLFVBQVEsRUFBQyxLQUFLO0VBQ2Q7QUFDRCxVQUFTLEVBQUM7QUFDVCxPQUFLLEVBQUMsTUFBTTtBQUNaLFVBQVEsRUFBQyxLQUFLO0VBQ2Q7QUFDRSxjQUFhLEVBQUM7QUFDaEIsT0FBSyxFQUFDLE1BQU07QUFDWixVQUFRLEVBQUMsS0FBSztFQUNYO0FBQ0osY0FBYSxFQUFDO0FBQ2IsT0FBSyxFQUFDLE1BQU07QUFDWixVQUFRLEVBQUMsS0FBSztFQUNkO0FBQ0QsY0FBYSxFQUFDO0FBQ2IsT0FBSyxFQUFDLE1BQU07QUFDWixVQUFRLEVBQUMsS0FBSztFQUNkO0FBQ0QsU0FBUSxFQUFDO0FBQ1IsT0FBSyxFQUFDLE1BQU07QUFDWixVQUFRLEVBQUMsS0FBSztFQUNkO0FBQ0QsVUFBUyxFQUFDO0FBQ1QsT0FBSyxFQUFDLE1BQU07QUFDWixVQUFRLEVBQUMsS0FBSztFQUNkO0FBQ0QsV0FBVSxFQUFDO0FBQ1YsT0FBSyxFQUFDLE1BQU07QUFDWixVQUFRLEVBQUMsS0FBSztFQUNkO0FBQ0QsYUFBWSxFQUFDO0FBQ1osT0FBSyxFQUFDLE1BQU07QUFDWixVQUFRLEVBQUMsS0FBSztFQUNkO0FBQ0UsT0FBTSxFQUFDO0FBQ0gsT0FBSyxFQUFDLE1BQU07QUFDWixVQUFRLEVBQUMsS0FBSztFQUNqQjtBQUNELE9BQU0sRUFBQztBQUNILE9BQUssRUFBQyxNQUFNO0FBQ1osVUFBUSxFQUFDLEtBQUs7RUFDakI7Q0FDSixDQUFBO0FBQ0QsSUFBSSxVQUFVLEdBQUc7QUFDaEIsWUFBVyxFQUFDLENBQ1gsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLENBQUMsRUFDL0YsQ0FBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLENBQUMsRUFDcEcsQ0FBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLENBQUMsRUFDckcsQ0FBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLENBQUMsRUFDckcsQ0FBQyxTQUFTLEVBQUMsU0FBUyxF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RUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQztBQUN2Z0IsTUFBSSxFQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDO0FBQzdRLE1BQUksRUFBQyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQztBQUNqVixNQUFJLEVBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztBQUM5WCxNQUFJLEVBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0FBQzlILE1BQUksRUFBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7QUFDM1MsTUFBSSxFQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO0VBQ2xRO0FBQ0QsWUFBVyxFQUFDO0FBQ1gsTUFBSSxFQUFDLEVBQUUsSUFBSSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxNQUFNLEVBQUM7QUFDN0MsTUFBSSxFQUFDLEVBQUUsSUFBSSxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxF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Q0FBQyxRQUFRLEVBQUUsQ0FBQztHQUN2QjtBQUNELE9BQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQ2pDLFdBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDckQsT0FBRyxBQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUM7QUFDL0gsWUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEUsWUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3RDO0dBQ0Q7QUFDRCxPQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztBQUNsQyxZQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3RELE9BQUcsQUFBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVB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QyxDQUFDLEtBQUssQUFBQyxHQUFFO0lBQ3RKO0dBQ2YsUUFBUTtHQUNULG9CQUFDLFlBQVksSUFBQyxHQUFHLEVBQUMsUUFBUSxHQUFHO0dBQ3ZCLENBQUM7RUFDVDtDQUNELENBQUMsQ0FBQTs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgQ29tYm9Cb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRzaG93OmZhbHNlLFxuXHRcdFx0cG9zaXRpb246e1xuXHRcdFx0XHR4OjAsXG5cdFx0XHRcdHk6MFxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQ6ZnVuY3Rpb24oKXtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5jbG9zZSk7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50OmZ1bmN0aW9uKCl7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuY2xvc2UpO1xuXHR9LFxuXHRvcGVuOmZ1bmN0aW9uKHBvc2l0aW9uKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNob3c6dHJ1ZSxcblx0XHRcdHBvc2l0aW9uOnBvc2l0aW9uXG5cdFx0fSlcblx0fSxcblx0Y2xvc2U6ZnVuY3Rpb24oKXtcblx0XHRpZighdGhpcy5zdGF0ZS5zaG93KSByZXR1cm47XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzaG93OmZhbHNlXG5cdFx0fSlcblx0fSxcblx0dG9nZ2xlOmZ1bmN0aW9uKHBvc2l0aW9uKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNob3c6IXRoaXMuc3RhdGUuc2hvdyxcblx0XHRcdHBvc2l0aW9uOnBvc2l0aW9uXG5cdFx0fSlcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHtjbGFzc05hbWUsc3R5bGUsLi4ucHJvcHN9ID0gdGhpcy5wcm9wcztcblx0XHRzdHlsZSA9IHN0eWxlIHx8IHt9O1xuXHRcdGlmKCF0aGlzLnN0YXRlLnNob3cpe1xuXHRcdFx0IHN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuXHRcdH1lbHNle1xuXHRcdFx0c3R5bGVbXCJkaXNwbGF5XCJdID0gXCJcIjtcdCBcblx0XHR9XG5cdFx0aWYodGhpcy5zdGF0ZS5wb3NpdGlvbil7XG5cdFx0XHRzdHlsZVtcImxlZnRcIl0gPSB0aGlzLnN0YXRlLnBvc2l0aW9uLng7XG5cdFx0XHRzdHlsZVtcInRvcFwiXSA9IHRoaXMuc3RhdGUucG9zaXRpb24ueTtcblx0XHR9XG5cdFx0XHQgXG5cdFx0cmV0dXJuICg8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtcImNvbWJvYm94XCIrKGNsYXNzTmFtZT9cIiBcIitjbGFzc05hbWU6XCJcIil9IHsuLi5wcm9wc30+XG5cdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHQ8L2Rpdj4pXG5cdH1cbn0pXG5cdFx0XG5tb2R1bGUuZXhwb3J0cyA9IENvbWJvQm94OyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbi8qKlxuKiBAd2lkdGg6IOWvueivneahhuWuveW6plxuKiBAaGVpZ2h0OiDlr7nor53moYbpq5jluqZcbiogQHN0eWxlOiDmoLflvI9cbiogQGJ1dHRvbnM6IOWvueivneahhuaMiemSrue7hFxuKiBAdGl0bGU6IOWvueivneahhuagh+mimFxuKiBAY2xhc3NOYW1lOiDlr7nor53moYbnsbvlkI1cbioqL1xudmFyIERpYWxvZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNob3c6ZmFsc2Vcblx0XHR9XG5cdH0sXG5cdGNvbXBvbmVudERpZE1vdW50OmZ1bmN0aW9uKCl7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuY2xvc2UpO1xuXHR9LFxuXHRjb21wb25lbnRXaWxsVW5tb3VudDpmdW5jdGlvbigpe1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLmNsb3NlKTtcblx0fSxcblx0b3BlbjpmdW5jdGlvbigpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0c2hvdzp0cnVlXG5cdFx0fSlcblx0fSxcblx0Y2xvc2U6ZnVuY3Rpb24oKXtcblx0XHRpZighdGhpcy5zdGF0ZS5zaG93KSByZXR1cm47XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzaG93OmZhbHNlXG5cdFx0fSlcblx0fSxcblx0dG9nZ2xlOmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzaG93OiF0aGlzLnN0YXRlLnNob3dcblx0XHR9KVxuXHR9LFxuXHRoYW5kbGVNb3VzZURvd246ZnVuY3Rpb24oZSl7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0aWYoZS5zdG9wUHJvcGFnYXRpb24pe1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdH1lbHNle1xuXHRcdFx0ZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuXHRcdH1cblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHsuLi5wcm9wcyxjbGFzc05hbWUsYnV0dG9ucyx0aXRsZSxzdHlsZSx3aWR0aCxoZWlnaHR9ID0gdGhpcy5wcm9wcztcblx0XHR2YXIgc3R5bGUgPSBzdHlsZT9zdHlsZTp7fTtcblx0XHQgaWYod2lkdGgpe1xuXHRcdFx0c3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdHN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLzI7XG5cdFx0fVxuXHRcdGlmKGhlaWdodCl7XG5cdFx0XHRzdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0fVxuXHRcdHN0eWxlLmRpc3BsYXkgPSB0aGlzLnN0YXRlLnNob3cgPyBcIlwiIDogXCJub25lXCI7XG5cdFx0dmFyIF9jbGFzc05hbWUgPSBcImRpYWxvZ1wiKyhjbGFzc05hbWU/XCIgXCIrY2xhc3NOYW1lOlwiXCIpO1xuXHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctY29udGFpbmVyXCIgICByZWY9XCJyb290XCIgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e19jbGFzc05hbWV9IHJlZj1cImRpYWxvZ1wiIHN0eWxlPXtzdHlsZX0+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctaGVhZGVyXCIgcmVmPVwiaGVhZGVyXCI+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJkaWFsb2ctY2xvc2VcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xvc2V9PjwvYT5cblx0XHRcdCBcdFx0XHQ8aDMgY2xhc3NOYW1lPVwiZGlhbG9nLXRpdGxlXCI+XG5cdFx0XHQgXHRcdFx0XHR7dGl0bGV9XG5cdFx0XHQgXHRcdFx0PC9oMz5cblx0XHRcdCBcdFx0PC9kaXY+XG5cdFx0XHQgXHRcdDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWJvZHlcIiByZWY9XCJib2R5XCI+XG5cdFx0XHQgXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdCBcdFx0PC9kaXY+XG5cdFx0XHQgXHRcdDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWZvb3RlclwiIHJlZj1cImZvb3RlclwiPlxuXHRcdFx0IFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0YnV0dG9ucy5tYXAoZnVuY3Rpb24oZWxlLHBvcyl7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuICg8YSBjbGFzc05hbWU9XCJkaWFsb2ctYnV0dG9uXCIga2V5PXtwb3N9IGRhdGEtbmFtZT17ZWxlLm5hbWV9IG9uQ2xpY2s9e2VsZS5vbkNsaWNrfT57ZWxlLmNvbnRlbnR9PC9hPilcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdCBcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1iYWNrZHJvcFwiIHJlZj1cImJhY2tkcm9wXCIgc3R5bGU9e3tcImRpc3BsYXlcIjp0aGlzLnN0YXRlLnNob3c/XCJcIjpcIm5vbmVcIn19PjwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj4pXG5cdH1cbn0pXG5cdFx0XHQgXG5tb2R1bGUuZXhwb3J0cyA9IERpYWxvZzsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgRHJvcGRvd24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRzaG93OmZhbHNlLFxuXHRcdFx0cG9zaXRpb246e1xuXHRcdFx0XHR4OjAsXG5cdFx0XHRcdHk6MFxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQ6ZnVuY3Rpb24oKXtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5jbG9zZSk7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50OmZ1bmN0aW9uKCl7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuY2xvc2UpO1xuXHR9LFxuXHRvcGVuOmZ1bmN0aW9uKHBvc2l0aW9uKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNob3c6dHJ1ZSxcblx0XHRcdHBvc2l0aW9uOnBvc2l0aW9uXG5cdFx0fSlcblx0fSxcblx0Y2xvc2U6ZnVuY3Rpb24oKXtcblx0XHRpZighdGhpcy5zdGF0ZS5zaG93KSByZXR1cm47XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzaG93OmZhbHNlXG5cdFx0fSlcblx0fSxcblx0dG9nZ2xlOmZ1bmN0aW9uKHBvc2l0aW9uKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNob3c6IXRoaXMuc3RhdGUuc2hvdyxcblx0XHRcdHBvc2l0aW9uOnBvc2l0aW9uXG5cdFx0fSlcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHtjbGFzc05hbWUsc3R5bGUsLi4ucHJvcHN9ID0gdGhpcy5wcm9wcztcblx0XHRzdHlsZSA9IHN0eWxlIHx8IHt9O1xuXHRcdGlmKCF0aGlzLnN0YXRlLnNob3cpe1xuXHRcdFx0IHN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuXHRcdH1lbHNle1xuXHRcdFx0c3R5bGVbXCJkaXNwbGF5XCJdID0gXCJcIjtcdCBcblx0XHR9XG5cdFx0aWYodGhpcy5zdGF0ZS5wb3NpdGlvbil7XG5cdFx0XHRzdHlsZVtcImxlZnRcIl0gPSB0aGlzLnN0YXRlLnBvc2l0aW9uLng7XG5cdFx0XHRzdHlsZVtcInRvcFwiXSA9IHRoaXMuc3RhdGUucG9zaXRpb24ueTtcblx0XHR9XG5cdFx0XHQgXG5cdFx0cmV0dXJuICg8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtcImRyb3Bkb3duXCIrKGNsYXNzTmFtZT9cIiBcIitjbGFzc05hbWU6XCJcIil9IHsuLi5wcm9wc30+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duLWNhcmV0XCI+PC9kaXY+XHRcdFxuXHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0PC9kaXY+KVxuXHR9XG59KVxuXHRcdFxubW9kdWxlLmV4cG9ydHMgPSBEcm9wZG93bjsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgVGFiR3JvdXAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHR0YWJJbmRleDowXG5cdFx0fVxuXHR9LFxuXHRzZXRUYWJJbmRleDpmdW5jdGlvbihpbmRleCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHR0YWJJbmRleDppbmRleFxuXHRcdH0pXG5cdH0sXG5cdGdldFRhYkluZGV4OmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUudGFiSW5kZXg7XG5cdH0sXG5cdGhhbmRsZUNsaWNrOmZ1bmN0aW9uKGUpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cdFx0dmFyIGluZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIikpO1xuXHRcdHRoaXMuc2V0VGFiSW5kZXgoaW5kZXgpO1xuXHRcdGlmKGUuc3RvcFByb3BhZ2F0aW9uKXtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKClcblx0XHR9ZWxzZXtcblx0XHRcdGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciB0YWJJbmRleCA9IHRoaXMuc3RhdGUudGFiSW5kZXg7XG5cdFx0dmFyIHRhYnMgPSB0aGlzLnByb3BzLnRhYnM7XG5cdFx0dmFyIGNvbXBvbmVudCA9IHRhYnNbdGFiSW5kZXhdLmNvbXBvbmVudDtcblx0XHR2YXIgaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrO1xuXHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJ0YWItZ3JvdXBcIj5cblx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cInRhYi1uYXZcIj5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0YWJzLm1hcChmdW5jdGlvbihlbGUscG9zKXtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICg8bGkga2V5PXtwb3N9IGNsYXNzTmFtZT17XCJ0YWItaXRlbVwiKyh0YWJJbmRleD09cG9zP1wiIGFjdGl2ZVwiOlwiXCIpfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YSBkYXRhLWluZGV4PXtwb3N9IGNsYXNzTmFtZT1cInRhYi10ZXh0XCIgb25DbGljaz17aGFuZGxlQ2xpY2t9PntlbGUudGl0bGV9PC9hPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPilcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRhYi1jb250ZW50XCI+XG5cdFx0XHRcdFx0e2NvbXBvbmVudH1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj4pXG5cdH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gVGFiR3JvdXA7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xudmFyIEVkaXRvclNlbGVjdGlvbiA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0VkaXRvclNlbGVjdGlvbicpO1xudmFyIEVkaXRvckRPTSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0VkaXRvckRPTScpO1xuXG52YXIgRWRpdG9yQ29udGVudEVkaXRhYmxlRGl2ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y29udGVudDpcIlwiXG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbihlKXtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLHRoaXMuaGFuZGxlV2luZG93TW91c2VEb3duKTtcblx0fSxcblx0Y29tcG9uZW50V2lsbFVubW91bnQ6ZnVuY3Rpb24oZSl7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIix0aGlzLmhhbmRsZVdpbmRvd01vdXNlRG93bik7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxVcGRhdGU6ZnVuY3Rpb24oZSl7XG5cdFx0RWRpdG9yU2VsZWN0aW9uLmNsb25lUmFuZ2UoKTtcblx0fSxcblx0Y29tcG9uZW50RGlkVXBkYXRlOmZ1bmN0aW9uKGUpe1xuXHRcdEVkaXRvclNlbGVjdGlvbi5jbG9uZVJhbmdlKCk7XG5cdH0sXG5cdGdldENvbnRlbnQ6ZnVuY3Rpb24oKXtcblx0XHR2YXIgdGFyZ2V0ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnJvb3QpO1xuXHRcdHJldHVybiB0YXJnZXQuaW5uZXJIVE1MO1xuXHR9LFxuXHRzZXRDb250ZW50OmZ1bmN0aW9uKGNvbnRlbnQpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y29udGVudDpjb250ZW50XG5cdFx0fSlcblx0fSxcblx0Z2V0TmFtZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiBcImRpdlwiO1xuXHR9LFxuXHRoYW5kbGVXaW5kb3dNb3VzZURvd246ZnVuY3Rpb24oZSl7XG5cdFx0RWRpdG9yU2VsZWN0aW9uLmNsZWFyUmFuZ2UoKTtcblx0fSxcblx0aGFuZGxlTW91c2VEb3duOmZ1bmN0aW9uKGUpe1xuXHRcdEVkaXRvclNlbGVjdGlvbi5jbGVhclJhbmdlKCk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsdGhpcy5oYW5kbGVNb3VzZVVwKTtcblx0XHRFZGl0b3JET00uc3RvcFByb3BhZ2F0aW9uKGUpO1xuXHR9LFxuXHRoYW5kbGVNb3VzZVVwOmZ1bmN0aW9uKGUpe1xuXHRcdEVkaXRvclNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMuaGFuZGxlTW91c2VVcCk7XG5cdFx0XG5cdFx0aWYodGhpcy5wcm9wcy5vblJhbmdlQ2hhbmdlKSBcblx0XHRcdHRoaXMucHJvcHMub25SYW5nZUNoYW5nZShlKTtcblx0XHRFZGl0b3JET00uc3RvcFByb3BhZ2F0aW9uKGUpO1xuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKDxkaXYgcmVmPVwicm9vdFwiIGNsYXNzTmFtZT1cImVkaXRvci1jb250ZW50ZWRpdGFibGUtZGl2XCIgXG5cdFx0XHRcdG9uTW91c2VVcD17dGhpcy5oYW5kbGVNb3VzZVVwfSBcblx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufVxuXHRcdFx0XHRjb250ZW50RWRpdGFibGU9e3RydWV9IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOnRoaXMuc3RhdGUuY29udGVudH19PjwvZGl2Pilcblx0fVxufSlcbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yQ29udGVudEVkaXRhYmxlRGl2OyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbi8qKlxuKiBAaWNvbjog5Zu+5qCH5ZCN56ewIHN0cmluZ1xuKiBAZGlzYWJsZWQ6IOaYr+WQpuemgeeUqCBib29sXG4qIEBvbkNsaWNrOiDmmrTpnLLngrnlh7vkuovku7YgZnVuY3Rpb25cbiogQHRpdGxlOiDmj5DnpLogc3RyaW5nXG4qIEBhY3RpdmU6IOaYr+WQpumAieS4rSBib29sXG4qIEBzaG93SHRtbDog5piv5ZCm5b2T5YmN5piv5pi+56S6aHRtbOWxnuaAp1xuKiBAY29sb3I6IOWJjeaZr+iJsuWSjOiDjOaZr+iJslxuKiovXG52YXIgRWRpdG9ySWNvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Y29tcG9uZW50RGlkTW91bnQ6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnVwZGF0ZVN0eWxlKCk7XG5cdH0sXG5cdGNvbXBvbmVudERpZFVwZGF0ZTpmdW5jdGlvbigpe1xuXHRcdHRoaXMudXBkYXRlU3R5bGUoKTtcblx0fSxcblx0dXBkYXRlU3R5bGU6ZnVuY3Rpb24oKXtcblx0XHR2YXIgcm9vdCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5yb290KTtcblx0XHR2YXIgaWNvbiA9IHRoaXMucHJvcHMuaWNvbjtcblx0XHRzd2l0Y2godGhpcy5wcm9wcy5pY29uKXtcblx0XHRcdGNhc2UgXCJmb3JlY29sb3JcIjpcblx0XHRcdGNhc2UgXCJiYWNrY29sb3JcIjpcblx0XHRcdFx0dmFyIGNvbG9yID0gdGhpcy5wcm9wcy5jb2xvcj90aGlzLnByb3BzLmNvbG9yOlwidHJhbnNwYXJlbnRcIjtcblx0XHRcdFx0cm9vdC5pZCA9IGljb24rXCJfXCIrbmV3IERhdGUoKS52YWx1ZU9mKCk7XG5cdFx0XHRcdHZhciBzdHlsZSA9IHJvb3QuY2hpbGRFbGVtZW50Q291bnQ+MD8gcm9vdC5jaGlsZHJlblswXTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0XHRcdFx0c3R5bGUuaW5uZXJIVE1MID0gXCIuaWNvbi1cIitpY29uK1wiI1wiK3Jvb3QuaWQrXCI6YmVmb3Jle2NvbnRlbnQ6Jyc7Ym9yZGVyLWJvdHRvbTozcHggc29saWQgXCIrY29sb3IrXCI7fVwiO1xuXHRcdFx0XHRpZihyb290LmNoaWxkRWxlbWVudENvdW50PT0wKSBcblx0XHRcdFx0XHRyb290LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9LFxuXHRoYW5kbGVDbGljazpmdW5jdGlvbihlKXtcblx0XHR2YXIge29uQ2xpY2ssLi4ucHJvcHN9ID0gdGhpcy5wcm9wcztcblx0XHRpZih0aGlzLnByb3BzLm9uQ2xpY2spe1xuXHRcdFx0dGhpcy5wcm9wcy5vbkNsaWNrKGUsey4uLnByb3BzfSlcblx0XHR9XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciB7aWNvbixhY3RpdmUsZGlzYWJsZWQsc2hvd0h0bWwsb25DbGljaywuLi5wcm9wc30gPSB0aGlzLnByb3BzO1xuXHRcdHZhciBfZGlzYWJsZWQgPSBzaG93SHRtbCAmJiAoaWNvbiE9XCJzb3VyY2VcIiAmJiBpY29uIT1cInNlcGFyYXRvclwiKTtcblx0XHR2YXIgX2NsYXNzTmFtZSA9IFwiZWRpdG9yLWljb24gaWNvbi1cIiArIGljb24gKyAoYWN0aXZlID8gXCIgYWN0aXZlXCIgOiBcIlwiKSArIChkaXNhYmxlZCB8fCBfZGlzYWJsZWQgPyBcIiBkaXNhYmxlZFwiIDogXCJcIik7XG5cdFx0aWYoaWNvbj09XCJmb250c2l6ZVwiIHx8IGljb249PVwiZm9udGZhbWlseVwiIHx8IGljb24gPT0gXCJwYXJhZ3JhcGhcIil7XG5cdFx0XHRyZXR1cm4gKDxzcGFuIHJlZj1cInJvb3RcIiBjbGFzc05hbWU9e19jbGFzc05hbWV9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IHsuLi5wcm9wc30+IFxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uLWxhYmVsXCI+e3Byb3BzLm5hbWV9PC9zcGFuPlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uLWNhcmV0XCI+PC9zcGFuPlxuXHRcdFx0XHQ8L3NwYW4+KVxuXHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gKDxzcGFuIHJlZj1cInJvb3RcIiBjbGFzc05hbWU9e19jbGFzc05hbWV9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IHsuLi5wcm9wc30+PC9zcGFuPilcblx0XHR9XG5cdH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9ySWNvbjsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBFZGl0b3JUZXh0QXJlYSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvbnRlbnQ6XCJcIlxuXHRcdH1cblx0fSxcblx0Z2V0Q29udGVudDpmdW5jdGlvbigpe1xuXHRcdHZhciB0YXJnZXQgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMucm9vdCk7XG5cdFx0cmV0dXJuIHRhcmdldC52YWx1ZTtcblx0fSxcblx0c2V0Q29udGVudDpmdW5jdGlvbihjb250ZW50KXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGNvbnRlbnQ6Y29udGVudFxuXHRcdH0pXG5cdH0sXG5cdGdldE5hbWU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gXCJ0ZXh0YXJlYVwiO1xuXHR9LFxuXHRoYW5kbGVDaGFuZ2U6ZnVuY3Rpb24oKXtcblx0XHR2YXIgdGFyZ2V0ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnJvb3QpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y29udGVudDp0YXJnZXQudmFsdWVcblx0XHR9KVxuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKDx0ZXh0YXJlYSByZWY9XCJyb290XCIgY2xhc3NOYW1lPVwiZWRpdG9yLXRleHRhcmVhXCIgdmFsdWU9e3RoaXMuc3RhdGUuY29udGVudH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfT48L3RleHRhcmVhPilcblx0fVxufSlcbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yVGV4dEFyZWE7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBFZGl0b3JJY29uID0gcmVxdWlyZSgnLi9FZGl0b3JJY29uLnJlYWN0Jyk7XG52YXIgeyBcblx0RWRpdG9ySWNvblR5cGVzXG59ID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL0VkaXRvckNvbnN0YW50cycpO1xudmFyIEVkaXRvckhpc3RvcnkgPSByZXF1aXJlKCcuLi8uLi91dGlscy9FZGl0b3JIaXN0b3J5Jyk7XG5cbnZhciBFZGl0b3JUb29sYmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6e1xuXHRcdGljb25zOlJlYWN0LlByb3BUeXBlcy5hcnJheVxuXHR9LFxuXHRnZXREZWZhdWx0UHJvcHM6ZnVuY3Rpb24oKXtcblx0XHQvLyB2aWRlbyBtYXAgcHJpbnQgcHJldmlldyBkcmFmdHMgbGluayB1bmxpbmtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aWNvbnM6W1xuXHRcdFx0XHRcInNvdXJjZSB8IHVuZG8gcmVkbyB8IGJvbGQgaXRhbGljIHVuZGVybGluZSBzdHJpa2V0aHJvdWdoIGZvbnRib3JkZXIgfCBwYXJhZ3JhcGggZm9udGZhbWlseSBmb250c2l6ZSB8IHN1cGVyc2NyaXB0IHN1YnNjcmlwdCB8IFwiLFxuXHRcdFx0XHRcImZvcmVjb2xvciBiYWNrY29sb3IgfCByZW1vdmVmb3JtYXQgfCBpbnNlcnRvcmRlcmVkbGlzdCBpbnNlcnR1bm9yZGVyZWRsaXN0IHwgc2VsZWN0YWxsIHwgXCIsXG5cdFx0XHRcdFwiY2xlYXJkb2MgIHwgaW5kZW50IG91dGRlbnQgfCBqdXN0aWZ5bGVmdCBqdXN0aWZ5Y2VudGVyIGp1c3RpZnlyaWdodCB8IHRvdXBwZXJjYXNlIHRvbG93ZXJjYXNlIHwgaG9yaXpvbnRhbCBkYXRlIHRpbWUgIHwgaW1hZ2UgZW1vdGlvbiBmb3JtdWxhIHNwZWNoYXJzIHwgaW5zZXJ0dGFibGVcIlxuXHRcdCAgICBdXG5cdFx0fVxuXHR9LFxuXHRoYW5kbGVJY29uQ2xpY2s6ZnVuY3Rpb24oZSxzdGF0ZSl7XG5cdFx0aWYodGhpcy5wcm9wcy5vbkljb25DbGljayl7XG5cdFx0XHR0aGlzLnByb3BzLm9uSWNvbkNsaWNrKGUsc3RhdGUpXG5cdFx0fVxuXHR9LFxuXHRnZXROYW1lQnlWYWx1ZTpmdW5jdGlvbihhcnIsdmFsdWUpe1xuXHRcdHZhciBmaWx0ZXJBcnIgPSBhcnIuZmlsdGVyKGZ1bmN0aW9uKGVsZSxwb3Mpe1xuXHRcdFx0cmV0dXJuIGVsZS52YWx1ZSA9PSB2YWx1ZTtcblx0XHR9KVxuXHRcdGlmKGZpbHRlckFyci5sZW5ndGg+MCl7XG5cdFx0XHRyZXR1cm4gZmlsdGVyQXJyWzBdLm5hbWU7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gXCJcIjtcblx0XHR9XG5cdH0sXG5cdGdldEljb25zOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIGVkaXRvclN0YXRlID0gdGhpcy5wcm9wcy5lZGl0b3JTdGF0ZTtcblx0XHRlZGl0b3JTdGF0ZS5pY29uc1tcInVuZG9cIl0gPSB7IGRpc2FibGVkOiFFZGl0b3JIaXN0b3J5LmNhblVuZG8oKX1cblx0XHRlZGl0b3JTdGF0ZS5pY29uc1tcInJlZG9cIl0gPSB7IGRpc2FibGVkOiFFZGl0b3JIaXN0b3J5LmNhblJlZG8oKX1cblx0XHRpZihlZGl0b3JTdGF0ZS5pY29uc1tcImZvbnRzaXplXCJdKSBlZGl0b3JTdGF0ZS5pY29uc1tcImZvbnRzaXplXCJdLm5hbWUgPSB0aGlzLmdldE5hbWVCeVZhbHVlKHRoaXMucHJvcHMuZm9udHNpemUsZWRpdG9yU3RhdGUuaWNvbnNbXCJmb250c2l6ZVwiXS52YWx1ZSk7XG5cdFx0aWYoZWRpdG9yU3RhdGUuaWNvbnNbXCJwYXJhZ3JhcGhcIl0pIGVkaXRvclN0YXRlLmljb25zW1wicGFyYWdyYXBoXCJdLm5hbWUgPSB0aGlzLmdldE5hbWVCeVZhbHVlKHRoaXMucHJvcHMucGFyYWdyYXBoLGVkaXRvclN0YXRlLmljb25zW1wicGFyYWdyYXBoXCJdLnZhbHVlKTtcblx0XHRpZihlZGl0b3JTdGF0ZS5pY29uc1tcImZvbnRmYW1pbHlcIl0pIGVkaXRvclN0YXRlLmljb25zW1wiZm9udGZhbWlseVwiXS5uYW1lID0gdGhpcy5nZXROYW1lQnlWYWx1ZSh0aGlzLnByb3BzLmZvbnRmYW1pbHksZWRpdG9yU3RhdGUuaWNvbnNbXCJmb250ZmFtaWx5XCJdLnZhbHVlKTtcblx0XHRcblx0XHR2YXIgaWNvbnMgPSB0aGlzLnByb3BzLmljb25zO1xuXHRcdHZhciBfaWNvbnMgPSBpY29ucy5qb2luKFwiIFwiKS5yZXBsYWNlKC9cXHwvZ20sXCJzZXBhcmF0b3JcIikuc3BsaXQoXCIgXCIpO1xuXHRcdF9pY29ucyA9IF9pY29ucy5maWx0ZXIoZnVuY3Rpb24oaWNvKXsgcmV0dXJuIGljbyE9XCJcIn0pO1xuXHRcdHZhciByZXR1cm5BcnJheSA9IFtdO1xuXHRcdGZvcih2YXIgaT0wO2k8X2ljb25zLmxlbmd0aDtpKyspe1xuXHRcdFx0cmV0dXJuQXJyYXlbaV0gID0gRWRpdG9ySWNvblR5cGVzW19pY29uc1tpXV07XG5cdFx0XHRyZXR1cm5BcnJheVtpXS5vbkNsaWNrID0gdGhpcy5oYW5kbGVJY29uQ2xpY2s7XG5cdFx0XHRyZXR1cm5BcnJheVtpXS5pY29uID0gX2ljb25zW2ldO1xuXHRcdFx0aWYoZWRpdG9yU3RhdGUuaWNvbnNbX2ljb25zW2ldXSl7XG5cdFx0XHRcdHJldHVybkFycmF5W2ldLmRpc2FibGVkID0gISFlZGl0b3JTdGF0ZS5pY29uc1tfaWNvbnNbaV1dLmRpc2FibGVkO1xuXHRcdFx0XHRyZXR1cm5BcnJheVtpXS5hY3RpdmUgPSAhIWVkaXRvclN0YXRlLmljb25zW19pY29uc1tpXV0uYWN0aXZlO1xuXHRcdFx0XHRyZXR1cm5BcnJheVtpXS5jb2xvciA9IGVkaXRvclN0YXRlLmljb25zW19pY29uc1tpXV0uY29sb3I7XG5cdFx0XHRcdHJldHVybkFycmF5W2ldLnZhbHVlID0gZWRpdG9yU3RhdGUuaWNvbnNbX2ljb25zW2ldXS52YWx1ZTtcblx0XHRcdFx0cmV0dXJuQXJyYXlbaV0ubmFtZSA9IGVkaXRvclN0YXRlLmljb25zW19pY29uc1tpXV0ubmFtZTtcblx0XHRcdH1cblx0XHRcdHJldHVybkFycmF5W2ldLnNob3dIdG1sID0gISEgZWRpdG9yU3RhdGUuc2hvd0h0bWw7XG5cdFx0fVxuXHRcdHJldHVybiByZXR1cm5BcnJheTtcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIGljb25zID0gdGhpcy5nZXRJY29ucygpO1xuXHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJlZGl0b3ItdG9vbGJhclwiPntcblx0XHRcdFx0XHRpY29ucy5tYXAoZnVuY3Rpb24oaWNvbixwb3Mpe1xuXHRcdFx0XHRcdFx0dmFyIHByb3BzID0gaWNvbjtcblx0XHRcdFx0XHRcdHJldHVybig8RWRpdG9ySWNvbiBrZXk9e3Bvc30gey4uLnByb3BzfSAvPilcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+KVxuXHR9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvclRvb2xiYXI7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBEcm9wZG93biA9IHJlcXVpcmUoJy4uL2Jhc2UvRHJvcGRvd24ucmVhY3QnKTtcbnZhciB7Q29sb3JUeXBlc30gPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvRWRpdG9yQ29uc3RhbnRzJyk7XG52YXIgRWRpdG9yRE9NID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvRWRpdG9yRE9NJyk7XG52YXIgQ29sb3JEcm9wZG93biA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhhbmRsZTpmdW5jdGlvbigpe31cblx0XHR9XG5cdH0sXG5cdG9wZW46ZnVuY3Rpb24ocG9zaXRpb24saGFuZGxlKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGhhbmRsZTpoYW5kbGVcblx0XHR9KVxuXHRcdHRoaXMucmVmcy5yb290Lm9wZW4ocG9zaXRpb24pO1xuXHR9LFxuXHRjbG9zZTpmdW5jdGlvbigpe1xuXHRcdHRoaXMucmVmcy5yb290LmNsb3NlKCk7XG5cdH0sXG5cdHRvZ2dsZTpmdW5jdGlvbihwb3NpdGlvbil7XG5cdFx0dGhpcy5yZWZzLnJvb3QudG9nZ2xlKHBvc2l0aW9uKTtcblx0fSxcblx0aGFuZGxlU2VsZWN0Q29sb3I6ZnVuY3Rpb24oZSl7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblx0XHR2YXIgY29sb3IgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbG9yJyk7XG5cdFx0aWYodGhpcy5zdGF0ZS5oYW5kbGUpe1xuXHRcdFx0dGhpcy5zdGF0ZS5oYW5kbGUoZSxjb2xvcik7XG5cdFx0fVxuXHRcdHRoaXMuY2xvc2UoKTtcblx0XHRFZGl0b3JET00uc3RvcFByb3BhZ2F0aW9uKGUpO1xuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHR2YXIgaGFuZGxlU2VsZWN0Q29sb3IgPSB0aGlzLmhhbmRsZVNlbGVjdENvbG9yO1xuXHRcdHJldHVybiAoPERyb3Bkb3duIHJlZj1cInJvb3RcIiBjbGFzc05hbWU9XCJjb2xvci1kcm9wZG93blwiPlxuXHRcdFx0XHQ8dGFibGU+XG5cdFx0XHRcdFx0PHRib2R5PlxuXHRcdFx0XHRcdDx0ciBjbGFzc05hbWU9XCJ0aXRsZS1yb3dcIiBrZXk9e1widGl0bGUtcm93XCJ9PlxuXHRcdFx0XHRcdFx0PHRkIGNvbFNwYW49ezEwfT7kuLvpopjpopzoibI8L3RkPlxuXHRcdFx0XHRcdDwvdHI+XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Q29sb3JUeXBlcy50aGVtZUNvbG9ycy5tYXAoZnVuY3Rpb24oY29sb3JzLHBvcyl7XG5cdFx0XHRcdFx0XHRcdHZhciBmaXJzdFJvdyA9IHBvcz09MDtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICg8dHIga2V5PXtwb3N9IGNsYXNzTmFtZT17Zmlyc3RSb3c/XCJmaXJzdC1yb3dcIjpcIlwifT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbG9ycy5tYXAoZnVuY3Rpb24oY29sb3IsaW5kZXgpe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICg8dGQga2V5PXtpbmRleH0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwiY29sb3ItYW5jaG9yXCIgIGRhdGEtY29sb3I9e2NvbG9yfSBzdHlsZT17e1wiYmFja2dyb3VuZENvbG9yXCI6Y29sb3J9fSBvbkNsaWNrPXtoYW5kbGVTZWxlY3RDb2xvcn0+PC9hPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90ZD4pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0PC90cj4pXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQ8dHIgY2xhc3NOYW1lPVwidGl0bGUtcm93XCIga2V5PXtcInRpdGxlLXJvdzJcIn0+XG5cdFx0XHRcdFx0XHQ8dGQgY29sU3Bhbj17MTB9Puagh+WHhuminOiJsjwvdGQ+XG5cdFx0XHRcdFx0PC90cj5cdFxuXHRcdFx0XHRcdDx0ciBjbGFzc05hbWU9XCJsYXN0LXJvd1wiIGtleT17XCJsYXN0LXJvd1wifT5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRDb2xvclR5cGVzLnN0YW5kYXJkQ29sb3JzLm1hcChmdW5jdGlvbihjb2xvcixwb3Mpe1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoPHRkIGtleT17cG9zfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwiY29sb3ItYW5jaG9yXCIgIGRhdGEtY29sb3I9e2NvbG9yfSBzdHlsZT17e1wiYmFja2dyb3VuZENvbG9yXCI6Y29sb3J9fSBvbkNsaWNrPXtoYW5kbGVTZWxlY3RDb2xvcn0+PC9hPlxuXHRcdFx0XHRcdFx0XHRcdDwvdGQ+KVxuXHRcdFx0XHRcdFx0fSlcdFx0ICBcblx0XHRcdFx0ICAgIH1cblx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHRcdDwvdGJvZHk+XG5cdFx0XHRcdDwvdGFibGU+XG5cdFx0PC9Ecm9wZG93bj4pXG5cdH1cbn0pXG5cdFx0XG5tb2R1bGUuZXhwb3J0cyA9IENvbG9yRHJvcGRvd247IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdERPTSA9ICByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxudmFyIFRhYkdyb3VwID0gcmVxdWlyZSgnLi4vYmFzZS9UYWJHcm91cC5yZWFjdCcpO1xudmFyIERpYWxvZyA9IHJlcXVpcmUoJy4uL2Jhc2UvRGlhbG9nLnJlYWN0Jyk7XG52YXIge0Vtb3Rpb25JbWFnZXN9ID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL0VkaXRvckNvbnN0YW50cycpO1xuXG52YXIgRW1vdGlvblBhbmVsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRoYW5kbGVDbGljazpmdW5jdGlvbihlKXtcblx0XHRlID0gZSB8fCBldmVudDtcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXHRcdHZhciB1cmwgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS11cmxcIik7XG5cdFx0dmFyIHRpdGxlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtdGl0bGVcIik7XG5cdFx0XG5cdFx0aWYodGhpcy5wcm9wcy5vblNlbGVjdEltYWdlKXtcblx0XHRcdHRoaXMucHJvcHMub25TZWxlY3RJbWFnZShlLCc8aW1nIHNyYz1cIicrdXJsKydcIiB0aXRsZT1cIicrdGl0bGUrJ1wiIC8+Jyk7XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHR2YXIgaW1hZ2VzID0gdGhpcy5wcm9wcy5pbWFnZXM7XG5cdFx0dmFyIGhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljaztcblx0XHRyZXR1cm4gKDx1bCBjbGFzc05hbWU9e1wiZW1vdGlvbi1pbWFnZXMgXCIrdGhpcy5wcm9wcy5uYW1lfSA+XG5cdFx0XHR7XG5cdFx0XHRcdGltYWdlcy5tYXAoZnVuY3Rpb24oZWxlLHBvcyl7XG5cdFx0XHRcdFx0cmV0dXJuICg8bGkgY2xhc3NOYW1lPVwiZW1vdGlvbi1pbWFnZVwiIGtleT17cG9zfSBkYXRhLXVybD17ZWxlLnVybH0gZGF0YS10aXRsZT17ZWxlLnRpdGxlfSBvbkNsaWNrPXtoYW5kbGVDbGlja30+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz17ZWxlLnVybH0gdGl0bGU9e2VsZS50aXRsZX0gZGF0YS11cmw9e2VsZS51cmx9IGRhdGEtdGl0bGU9e2VsZS50aXRsZX0vPlxuXHRcdFx0XHRcdFx0XHQ8L2xpPilcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHQ8L3VsPilcblx0fVxufSlcblxudmFyIEVtb3Rpb25EaWFsb2cgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRoYW5kbGU6ZnVuY3Rpb24oKXt9XG5cdFx0fVxuXHR9LFxuXHRvcGVuOmZ1bmN0aW9uKHBvc2l0aW9uLGhhbmRsZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRoYW5kbGU6aGFuZGxlXG5cdFx0fSlcblx0XHR0aGlzLnJlZnMucm9vdC5vcGVuKHBvc2l0aW9uKTtcblx0fSxcblx0Y2xvc2U6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnJlZnMucm9vdC5jbG9zZSgpO1xuXHR9LFxuXHR0b2dnbGU6ZnVuY3Rpb24ocG9zaXRpb24pe1xuXHRcdHRoaXMucmVmcy5yb290LnRvZ2dsZShwb3NpdGlvbik7XG5cdH0sXG5cdGhhbmRsZVNlbGVjdEltYWdlOmZ1bmN0aW9uKGUsY2hhcil7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0aWYodGhpcy5zdGF0ZS5oYW5kbGUpe1xuXHRcdFx0dGhpcy5zdGF0ZS5oYW5kbGUoZSxjaGFyKTtcblx0XHR9XG5cdFx0aWYoZS5zdG9wUHJvcGFnYXRpb24pe1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0ZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuXHRcdH1cblx0XHR0aGlzLmNsb3NlKCk7XG5cdH0sXG5cdGdldEVtb3Rpb25UYWJzOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHtFbW90aW9uVGFicyxCYXNlVXJsLFNtaWxleUluZm9yfSA9IEVtb3Rpb25JbWFnZXM7XG5cdFx0dmFyIHRhYnMgPSBbXTtcblx0XHRmb3IodmFyIGtleSBpbiBFbW90aW9uVGFicyl7XG5cdFx0XHR2YXIgdGFiID0geyB0aXRsZTogRW1vdGlvblRhYnNba2V5XS5uYW1lIH07XG5cdFx0XHR2YXIgaW1hZ2VzID0gW107XG5cdFx0XHR2YXIgdGl0bGVzID0gU21pbGV5SW5mb3Jba2V5XTtcblx0XHRcdGZvcih2YXIgaT0wO2k8dGl0bGVzLmxlbmd0aDtpKyspe1xuXHRcdFx0XHR2YXIgaW5kZXggPSAoaSsxKS50b1N0cmluZygpO1xuXHRcdFx0XHRpbmRleCA9IGluZGV4Lmxlbmd0aD09MT9cIjBcIitpbmRleDogaW5kZXg7XG5cdFx0XHRcdHZhciBpbWFnZSA9IHtcblx0XHRcdFx0XHR0aXRsZTogdGl0bGVzW2ldLFxuXHRcdFx0XHRcdHVybDogQmFzZVVybCArIEVtb3Rpb25UYWJzW2tleV0ucGF0aCArIEVtb3Rpb25UYWJzW2tleV0ucHJlZml4K2luZGV4K1wiLmdpZj92PTEuMVwiXG5cdFx0XHRcdH1cblx0XHRcdFx0aW1hZ2VzLnB1c2goaW1hZ2UpO1xuXHRcdFx0fVxuXHRcdFx0dGFiLmltYWdlcyA9IGltYWdlcztcblx0XHRcdHRhYnMucHVzaCh0YWIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGFicztcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHRhYnMgPSBbXTtcblx0XHR2YXIgRW1vdGlvblRhYnMgPSB0aGlzLmdldEVtb3Rpb25UYWJzKCk7XG5cdFx0XG5cdFx0Zm9yKHZhciBpPTA7aTxFbW90aW9uVGFicy5sZW5ndGg7aSsrKXtcblx0XHRcdHRhYnMucHVzaCh7XG5cdFx0XHRcdHRpdGxlOkVtb3Rpb25UYWJzW2ldLnRpdGxlLFxuXHRcdFx0XHRpbWFnZXM6RW1vdGlvblRhYnNbaV0uaW1hZ2VzLFxuXHRcdFx0XHRjb21wb25lbnQ6KDxFbW90aW9uUGFuZWwgaW1hZ2VzPXtFbW90aW9uVGFic1tpXS5pbWFnZXN9IG5hbWU9XCJjb21tb24taW1hZ2VzXCIgb25TZWxlY3RJbWFnZT17dGhpcy5oYW5kbGVTZWxlY3RJbWFnZX0gLz4pXG5cdFx0XHR9KVxuXHRcdH1cblx0XHR2YXIgYnV0dG9ucyA9IFtdO1xuXHRcdHJldHVybiAoPERpYWxvZyByZWY9XCJyb290XCIgY2xhc3NOYW1lPVwiZW1vdGlvbi1kcm9wZHdvblwiIHdpZHRoPXs3MDB9IGhlaWdodD17NTA4fSB0aXRsZT1cIuihqOaDhVwiIGJ1dHRvbnM9e2J1dHRvbnN9IG9uQ2xvc2U9e3RoaXMuY2xvc2V9PlxuXHRcdFx0XHQ8VGFiR3JvdXAgdGFicz17dGFic30gLz5cblx0XHQ8L0RpYWxvZz4pXG5cdH1cbn0pXG5cdFx0XG5tb2R1bGUuZXhwb3J0cyA9IEVtb3Rpb25EaWFsb2c7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBDb21ib0JveCA9IHJlcXVpcmUoJy4uL2Jhc2UvQ29tYm9Cb3gucmVhY3QnKTtcblxudmFyIEZvbnRGYW1pbHlEcm9wZG93biA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhhbmRsZTpmdW5jdGlvbigpe31cblx0XHR9XG5cdH0sXG5cdG9wZW46ZnVuY3Rpb24ocG9zaXRpb24saGFuZGxlKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGhhbmRsZTpoYW5kbGVcblx0XHR9KVxuXHRcdHRoaXMucmVmcy5yb290Lm9wZW4ocG9zaXRpb24pO1xuXHR9LFxuXHRjbG9zZTpmdW5jdGlvbigpe1xuXHRcdHRoaXMucmVmcy5yb290LmNsb3NlKCk7XG5cdH0sXG5cdHRvZ2dsZTpmdW5jdGlvbihwb3NpdGlvbil7XG5cdFx0dGhpcy5yZWZzLnJvb3QudG9nZ2xlKHBvc2l0aW9uKTtcblx0fSxcblx0aGFuZGxlU2VsZWN0OmZ1bmN0aW9uKGUpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cdFx0dmFyIHZhbHVlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpO1xuXHRcdGlmKHRoaXMuc3RhdGUuaGFuZGxlKXtcblx0XHRcdHRoaXMuc3RhdGUuaGFuZGxlKGUsdmFsdWUpO1xuXHRcdH1cblx0XHRpZihlLnN0b3BQcm9wYWdhdGlvbil7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1lbHNle1xuXHRcdFx0ZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuXHRcdH1cblx0XHR0aGlzLmNsb3NlKCk7XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciBoYW5kbGVTZWxlY3QgPSB0aGlzLmhhbmRsZVNlbGVjdDtcblx0XHR2YXIgZm9udGZhbWlseSA9IHRoaXMucHJvcHMuZm9udGZhbWlseT90aGlzLnByb3BzLmZvbnRmYW1pbHk6W107XG5cdFx0dmFyIHByb3BzID0gdGhpcy5wcm9wcztcblx0XHRyZXR1cm4gKDxDb21ib0JveCByZWY9XCJyb290XCIgY2xhc3NOYW1lPVwiY29sb3ItY29tYm9ib3hcIj5cblx0XHRcdDx1bD5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZvbnRmYW1pbHkubWFwKGZ1bmN0aW9uKGVsZSxwb3Mpe1xuXHRcdFx0XHRcdFx0cmV0dXJuICg8bGkgY2xhc3NOYW1lPXtlbGUudmFsdWU9PXByb3BzLnZhbHVlP1wiYWN0aXZlXCI6XCJcIn0ga2V5PXtwb3N9IGRhdGEtdmFsdWU9e2VsZS52YWx1ZX0gb25DbGljaz17aGFuZGxlU2VsZWN0fT5cblx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBkYXRhLXZhbHVlPXtlbGUudmFsdWV9IHN0eWxlPXt7XCJmb250RmFtaWx5XCI6ZWxlLnZhbHVlfX0+e2VsZS5uYW1lfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHQ8L2xpPilcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHQ8L3VsPlxuXHRcdDwvQ29tYm9Cb3g+KVxuXHR9XG59KVxuXHRcdFxubW9kdWxlLmV4cG9ydHMgPSBGb250RmFtaWx5RHJvcGRvd247IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBDb21ib0JveCA9IHJlcXVpcmUoJy4uL2Jhc2UvQ29tYm9Cb3gucmVhY3QnKTtcblxudmFyIEZvbnRTaXplRHJvcGRvd24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRoYW5kbGU6ZnVuY3Rpb24oKXt9XG5cdFx0fVxuXHR9LFxuXHRvcGVuOmZ1bmN0aW9uKHBvc2l0aW9uLGhhbmRsZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRoYW5kbGU6aGFuZGxlXG5cdFx0fSlcblx0XHR0aGlzLnJlZnMucm9vdC5vcGVuKHBvc2l0aW9uKTtcblx0fSxcblx0Y2xvc2U6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnJlZnMucm9vdC5jbG9zZSgpO1xuXHR9LFxuXHR0b2dnbGU6ZnVuY3Rpb24ocG9zaXRpb24pe1xuXHRcdHRoaXMucmVmcy5yb290LnRvZ2dsZShwb3NpdGlvbik7XG5cdH0sXG5cdGhhbmRsZVNlbGVjdDpmdW5jdGlvbihlKXtcblx0XHRlID0gZSB8fCBldmVudDtcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXHRcdHZhciB2YWx1ZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKTtcblx0XHRpZih0aGlzLnN0YXRlLmhhbmRsZSl7XG5cdFx0XHR0aGlzLnN0YXRlLmhhbmRsZShlLHZhbHVlKTtcblx0XHR9XG5cdFx0aWYoZS5zdG9wUHJvcGFnYXRpb24pe1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9ZWxzZXtcblx0XHRcdGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcblx0XHR9XG5cdFx0dGhpcy5jbG9zZSgpO1xuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHR2YXIgaGFuZGxlU2VsZWN0ID0gdGhpcy5oYW5kbGVTZWxlY3Q7XG5cdFx0dmFyIGZvbnRzaXplID0gdGhpcy5wcm9wcy5mb250c2l6ZT90aGlzLnByb3BzLmZvbnRzaXplOltdO1xuXHRcdHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG5cdFx0cmV0dXJuICg8Q29tYm9Cb3ggcmVmPVwicm9vdFwiIGNsYXNzTmFtZT1cImNvbG9yLWNvbWJvYm94XCI+XG5cdFx0XHQ8dWw+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmb250c2l6ZS5tYXAoZnVuY3Rpb24oZWxlLHBvcyl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKDxsaSBjbGFzc05hbWU9e2VsZS52YWx1ZT09cHJvcHMudmFsdWU/XCJhY3RpdmVcIjpcIlwifSBrZXk9e3Bvc30gZGF0YS12YWx1ZT17ZWxlLnZhbHVlfSBvbkNsaWNrPXtoYW5kbGVTZWxlY3R9PlxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gZGF0YS12YWx1ZT17ZWxlLnZhbHVlfSBzdHlsZT17e1wiZm9udFNpemVcIjplbGUudmFsdWV9fT57ZWxlLm5hbWV9PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+KVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdDwvdWw+XG5cdFx0PC9Db21ib0JveD4pXG5cdH1cbn0pXG5cdFx0XG5tb2R1bGUuZXhwb3J0cyA9IEZvbnRTaXplRHJvcGRvd247IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdERPTSA9ICByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxudmFyIFRhYkdyb3VwID0gcmVxdWlyZSgnLi4vYmFzZS9UYWJHcm91cC5yZWFjdCcpO1xudmFyIERyb3Bkb3duID0gcmVxdWlyZSgnLi4vYmFzZS9Ecm9wZG93bi5yZWFjdCcpO1xudmFyIHtGb3JtdWxhVHlwZXN9ID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL0VkaXRvckNvbnN0YW50cycpO1xuXG52YXIgRm9ybXVsYUljb25zID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRoYW5kbGVDbGljazpmdW5jdGlvbihlKXtcblx0XHRlID0gZSB8fCBldmVudDtcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXHRcdHZhciBsYXRleCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWxhdGV4XCIpO1xuXHRcdHZhciBpZCA9ICdtYXRocXVpbGwtJytuZXcgRGF0ZSgpLnZhbHVlT2YoKTtcblx0XHRpZih0aGlzLnByb3BzLm9uU2VsZWN0Rm9ybXVsYSl7XG5cdFx0XHR0aGlzLnByb3BzLm9uU2VsZWN0Rm9ybXVsYShlLGxhdGV4LGlkKTtcblx0XHR9XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciBpY29ucyA9IHRoaXMucHJvcHMuaWNvbnM7XG5cdFx0dmFyIGhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljaztcblx0XHRyZXR1cm4gKDx1bCBjbGFzc05hbWU9e1wiZm9ybXVsYXMtaWNvbnMgXCIrdGhpcy5wcm9wcy5uYW1lfSA+XG5cdFx0XHR7XG5cdFx0XHRcdGljb25zLm1hcChmdW5jdGlvbihlbGUscG9zKXtcblx0XHRcdFx0XHRyZXR1cm4gKDxsaSBjbGFzc05hbWU9XCJsYXRleC1pY29uXCIga2V5PXtwb3N9IGRhdGEtbGF0ZXg9e2VsZS5sYXRleH0gc3R5bGU9e3tcImJhY2tncm91bmRQb3NpdGlvblwiOiBlbGUuYmFja2dyb3VuZFBvc2l0aW9ufX0gb25DbGljaz17aGFuZGxlQ2xpY2t9PjwvbGk+KVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdDwvdWw+KVxuXHR9XG59KVxuXG52YXIgRm9ybXVsYURyb3Bkb3duID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aGFuZGxlOmZ1bmN0aW9uKCl7fVxuXHRcdH1cblx0fSxcblx0b3BlbjpmdW5jdGlvbihwb3NpdGlvbixoYW5kbGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aGFuZGxlOmhhbmRsZVxuXHRcdH0pXG5cdFx0dGhpcy5yZWZzLnJvb3Qub3Blbihwb3NpdGlvbik7XG5cdH0sXG5cdGNsb3NlOmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5yZWZzLnJvb3QuY2xvc2UoKTtcblx0fSxcblx0dG9nZ2xlOmZ1bmN0aW9uKHBvc2l0aW9uKXtcblx0XHR0aGlzLnJlZnMucm9vdC50b2dnbGUocG9zaXRpb24pO1xuXHR9LFxuXHRoYW5kbGVTZWxlY3RGb3JtdWxhOmZ1bmN0aW9uKGUsbGF0ZXgsaWQpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdGlmKHRoaXMuc3RhdGUuaGFuZGxlKXtcblx0XHRcdHRoaXMuc3RhdGUuaGFuZGxlKGUsbGF0ZXgsaWQpO1xuXHRcdH1cblx0XHRpZihlLnN0b3BQcm9wYWdhdGlvbil7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG5cdFx0fVxuXHRcdHRoaXMuY2xvc2UoKTtcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHRhYnMgPSBbXG5cdFx0XHR7dGl0bGU6XCLluLjnlKjlhazlvI9cIixjb21wb25lbnQ6KDxGb3JtdWxhSWNvbnMgaWNvbnM9e0Zvcm11bGFUeXBlcy5jb21tb25Gb3JtdWxhc30gbmFtZT1cImNvbW1vbi1mb3JtdWxhc1wiIG9uU2VsZWN0Rm9ybXVsYT17dGhpcy5oYW5kbGVTZWxlY3RGb3JtdWxhfS8+KX0sXG5cdFx0XHR7dGl0bGU6XCLnrKblj7dcIixjb21wb25lbnQ6KDxGb3JtdWxhSWNvbnMgaWNvbnM9e0Zvcm11bGFUeXBlcy5zeW1ib2xGb3JtdWxhc30gbmFtZT1cInN5bWJvbC1mb3JtdWxhc1wiIG9uU2VsZWN0Rm9ybXVsYT17dGhpcy5oYW5kbGVTZWxlY3RGb3JtdWxhfS8+KX0sXG5cdFx0XHR7dGl0bGU6XCLlrZfmr41cIixjb21wb25lbnQ6KDxGb3JtdWxhSWNvbnMgaWNvbnM9e0Zvcm11bGFUeXBlcy5hcmFiaWNGb3JtdWxhc30gbmFtZT1cImFyYWJpYy1mb3JtdWxhc1wiIG9uU2VsZWN0Rm9ybXVsYT17dGhpcy5oYW5kbGVTZWxlY3RGb3JtdWxhfS8+KX1cblx0XHRdXG5cblx0XHRyZXR1cm4gKDxEcm9wZG93biByZWY9XCJyb290XCIgY2xhc3NOYW1lPVwiZm9ybXVsYS1kcm9wZG93blwiPlxuXHRcdFx0XHQ8VGFiR3JvdXAgdGFicz17dGFic30gLz5cblx0XHQ8L0Ryb3Bkb3duPilcblx0fVxufSlcblx0XHRcbm1vZHVsZS5leHBvcnRzID0gRm9ybXVsYURyb3Bkb3duOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSAgcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBEaWFsb2cgPSByZXF1aXJlKCcuLi9iYXNlL0RpYWxvZy5yZWFjdCcpO1xudmFyIFRhYkdyb3VwID0gcmVxdWlyZSgnLi4vYmFzZS9UYWJHcm91cC5yZWFjdCcpO1xudmFyIFVwbG9hZGVyID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvRmlsZVVwbG9hZCcpO1xuXG52YXIgSW1hZ2VVcGxvYWQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRpbWFnZXM6W10sXG5cdFx0XHRkcmFnRW50ZXI6ZmFsc2Vcblx0XHR9XG5cdH0sXG5cdGhhbmRsZVVwbG9hZEZpbGU6ZnVuY3Rpb24oZmlsZSl7XG5cdFx0dmFyIF9zZWxmID0gdGhpcztcblx0XHR2YXIgaW1hZ2VzID0gdGhpcy5zdGF0ZS5pbWFnZXM7XG5cdFx0dmFyIG1hc2sgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMubWFzayk7XG5cdFx0dmFyIHVwbG9hZGVyID0gdGhpcy5wcm9wcy5jdXN0b21VcGxvYWRlcj8gdGhpcy5wcm9wcy5jdXN0b21VcGxvYWRlcjogVXBsb2FkZXI7XG5cdFx0dXBsb2FkZXIudXBsb2FkRmlsZSh7XG5cdFx0XHRcdGZpbGU6ZmlsZSxcblx0XHRcdFx0ZmlsZW5hbWU6dGhpcy5wcm9wcy5uYW1lLFxuXHRcdFx0XHR1cmw6dGhpcy5wcm9wcy51cmwsXG5cdFx0XHRcdG9uTG9hZDpmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRtYXNrLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0XHRcdFx0bWFzay5pbm5lckhUTUwgPSBcIkxvYWRpbmcuLi5cIjtcblx0XHRcdFx0fSxcblx0XHRcdFx0b25TdWNjZXNzOmZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0bWFzay5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdFx0XHRcdG1hc2suaW5uZXJIVE1MID0gXCJMb2FkIFN1Y2Nlc3NcIjtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpZihyZXMgJiYgcmVzLnN0YXR1cz09XCJzdWNjZXNzXCIpe1xuXHRcdFx0XHRcdFx0aW1hZ2VzLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRzcmM6cmVzLmltYWdlX3NyY1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdF9zZWxmLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdFx0aW1hZ2VzOmltYWdlc1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdGlmKF9zZWxmLnByb3BzLm9uQ2hhbmdlKVxuXHRcdFx0XHRcdFx0XHRfc2VsZi5wcm9wcy5vbkNoYW5nZSgwLGltYWdlcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdG1hc2suc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0XHRcdH0sMjAwKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkVycm9yOmZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdG1hc2suc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRcdFx0XHRtYXNrLmlubmVySFRNTCA9IFwiTG9hZCBFcnJvclwiO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdG1hc2suc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0XHRcdH0sMjAwKVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fSxcblx0aGFuZGxlQ2hhbmdlOmZ1bmN0aW9uKGUpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cdFx0aWYodGFyZ2V0LmZpbGVzLmxlbmd0aD4wKXtcblx0XHRcdHRoaXMuaGFuZGxlVXBsb2FkRmlsZSh0YXJnZXQuZmlsZXNbMF0pXG5cdFx0XHQvLyBjbGVhciB2YWx1ZVxuXHRcdFx0dGFyZ2V0LnZhbHVlID0gXCJcIjtcblx0XHR9XG5cdH0sXG5cdGdldEltYWdlczpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLnN0YXRlLmltYWdlcztcblx0fSxcblx0Y2xlYXJJbWFnZXM6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGltYWdlczpbXVxuXHRcdH0pXG5cdH0sXG5cdGhhbmRsZVJlbW92ZUltYWdlOmZ1bmN0aW9uKGUpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cdFx0dmFyIGluZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIikpO1xuXHRcdHZhciBpbWFnZXMgPSB0aGlzLnN0YXRlLmltYWdlcztcblx0XHRpbWFnZXMuc3BsaWNlKGluZGV4LDEpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aW1hZ2VzOmltYWdlc1xuXHRcdH0pXG5cdFx0aWYodGhpcy5wcm9wcy5vbkNoYW5nZSlcblx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UoMCxpbWFnZXMpO1xuXHR9LFxuXHRoYW5kbGVEcm9wOmZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgZmlsZXMgPSBlLmRhdGFUcmFuc2Zlci5maWxlcztcblx0XHRpZihmaWxlcy5sZW5ndGg+MCl7XG5cdFx0XHR0aGlzLmhhbmRsZVVwbG9hZEZpbGUoZmlsZXNbMF0pO1xuXHRcdH1cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGRyYWdFbnRlcjpmYWxzZVxuXHRcdH0pXG5cdFx0Y29uc29sZS5sb2coZS50eXBlKTtcblx0fSxcblx0aGFuZGxlRHJhZ092ZXI6ZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnNvbGUubG9nKGUudHlwZSk7XG5cdH0sXG5cdGhhbmRsZURyYWdFbnRlcjpmdW5jdGlvbihlKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGRyYWdFbnRlcjp0cnVlXG5cdFx0fSlcblx0XHRjb25zb2xlLmxvZyhlLnR5cGUpO1xuXHR9LFxuXHRoYW5kbGVEcmFnTGVhdmU6ZnVuY3Rpb24oZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRkcmFnRW50ZXI6ZmFsc2Vcblx0XHR9KVxuXHRcdGNvbnNvbGUubG9nKGUudHlwZSk7XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGltYWdlcyA9IHRoaXMuc3RhdGUuaW1hZ2VzO1xuXHRcdFx0dmFyIGRyYWdFbnRlciA9IHRoaXMuc3RhdGUuZHJhZ0VudGVyO1xuXHRcdFx0dmFyIGhhbmRsZVJlbW92ZUltYWdlID0gdGhpcy5oYW5kbGVSZW1vdmVJbWFnZTtcblx0XHRcdHZhciBhY3Rpb24gPSB0aGlzLnByb3BzLmFjdGlvbj90aGlzLnByb3BzLmFjdGlvbjpcIi91cGxvYWRcIjtcblx0XHRcdHZhciBzaG93U3R5bGUgPSB7XG5cdFx0XHRcdFwiZGlzcGxheVwiOlwiYmxvY2tcIlxuXHRcdFx0fVxuXHRcdFx0dmFyIGhpZGVTdHlsZSA9IHtcblx0XHRcdFx0XCJkaXNwbGF5XCI6XCJub25lXCJcblx0XHRcdH1cblxuXHRcdFx0dmFyIGhhc0ltYWdlcyA9IGltYWdlcy5sZW5ndGggPiAwO1xuXHRcdFx0cmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYW5lbFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e1wiaW1hZ2UtY29udGVudFwiICsoZHJhZ0VudGVyP1wiIGRyYWctZW50ZXJcIjpcIlwiKX0gIG9uRHJvcD17dGhpcy5oYW5kbGVEcm9wfSBcblx0XHRcdFx0XHRcdFx0XHRcdG9uRHJhZ092ZXI9e3RoaXMuaGFuZGxlRHJhZ092ZXJ9IFxuXHRcdFx0XHRcdFx0XHRcdFx0b25EcmFnRW50ZXI9e3RoaXMuaGFuZGxlRHJhZ0VudGVyfSBcblx0XHRcdFx0XHRcdFx0XHRcdG9uRHJhZ0xlYXZlPXt0aGlzLmhhbmRsZURyYWdMZWF2ZX1cblx0XHRcdFx0XHRcdFx0XHRcdG9uRHJhZ0VuZD17dGhpcy5oYW5kbGVEcmFnTGVhdmV9IFxuXHRcdFx0XHRcdFx0XHRcdFx0b25EcmFnU3RhcnQ9e3RoaXMuaGFuZGxlRHJhZ0VudGVyfT5cblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGltYWdlcy5tYXAoZnVuY3Rpb24oZWxlLHBvcyl7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2UtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2UtY2xvc2VcIiBvbkNsaWNrPXtoYW5kbGVSZW1vdmVJbWFnZX0+PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e2VsZS5zcmN9IGNsYXNzTmFtZT1cImltYWdlLXBpY1wiIGhlaWdodD1cIjc1XCIgd2lkdGg9XCIxMjBcIiAvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj4pXG5cdFx0XHRcdFx0XHRcdCAgIH0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbWFnZS11cGxvYWQyXCIgc3R5bGU9eyBoYXNJbWFnZXM/c2hvd1N0eWxlOmhpZGVTdHlsZSB9PlxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImltYWdlLWljb25cIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0PGZvcm0gY2xhc3NOYW1lPVwiaW1hZ2UtZm9ybVwiICBtZXRob2Q9XCJwb3N0XCIgZW5jVHlwZT1cIm11bHRpcGFydC9mb3JtLWRhdGFcIiB0YXJnZXQ9XCJ1cFwiIGFjdGlvbj17YWN0aW9ufSA+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSBzdHlsZT17eyBmaWx0ZXI6IFwiYWxwaGEob3BhY2l0eT0wKVwiIH19IGNsYXNzTmFtZT1cImltYWdlLWZpbGVcIiB0eXBlPVwiZmlsZVwiIGhpZGVmb2N1cz1cIlwiIG5hbWU9XCJmaWxlXCIgYWNjZXB0PVwiaW1hZ2UvZ2lmLGltYWdlL2pwZWcsaW1hZ2UvcG5nLGltYWdlL2pwZyxpbWFnZS9ibXBcIiAvPlxuXHRcdFx0XHRcdFx0XHRcdDwvZm9ybT5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2UtZHJhZ1RpcFwiIHN0eWxlPXsgaGFzSW1hZ2VzP2hpZGVTdHlsZTpzaG93U3R5bGUgfT7mlK/mjIHlm77niYfmi5bmi73kuIrkvKA8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2UtdXBsb2FkMVwiIHN0eWxlPXsgaGFzSW1hZ2VzP2hpZGVTdHlsZTpzaG93U3R5bGUgfT5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaW1hZ2UtaWNvblwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PGZvcm0gY2xhc3NOYW1lPVwiaW1hZ2UtZm9ybVwiIG1ldGhvZD1cInBvc3RcIiBlbmNUeXBlPVwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiIHRhcmdldD1cInVwXCIgYWN0aW9uPXthY3Rpb259ID5cblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSBzdHlsZT17eyBmaWx0ZXI6XCJhbHBoYShvcGFjaXR5PTApXCJ9fSBjbGFzc05hbWU9XCJpbWFnZS1maWxlXCIgdHlwZT1cImZpbGVcIiBoaWRlZm9jdXM9XCJcIiBuYW1lPVwiZmlsZVwiIGFjY2VwdD1cImltYWdlL2dpZixpbWFnZS9qcGVnLGltYWdlL3BuZyxpbWFnZS9qcGcsaW1hZ2UvYm1wXCIgLz5cblx0XHRcdFx0XHRcdFx0PC9mb3JtPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImltYWdlLW1hc2tcIiByZWY9XCJtYXNrXCI+XG5cdFx0XHRcdFx0XHRcdFx0e1wiTG9hZGluZy4uLi5cIn1cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2Pilcblx0fVxufSlcblxudmFyIEltYWdlU2VhcmNoID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW1hZ2VzOltdXG5cdFx0fVxuXHR9LFxuXHRnZXRJbWFnZXM6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5pbWFnZXM7XG5cdH0sXG5cdGNsZWFySW1hZ2VzOmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpbWFnZXM6W11cblx0XHR9KVxuXHR9LFxuXHRoYW5kbGVDbGljazpmdW5jdGlvbihlKXtcblx0XHR2YXIgdGV4dCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy50ZXh0KTtcblx0XHR2YXIgc3JjID0gdGV4dC52YWx1ZTtcblx0XHR2YXIgaW1hZ2VzID0gdGhpcy5zdGF0ZS5pbWFnZXM7XG5cdFx0aWYoc3JjICYmIHNyYy5sZW5ndGg+MCl7XG5cdFx0XHRpbWFnZXMucHVzaCh7c3JjfSlcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpbWFnZXM6aW1hZ2VzXG5cdFx0XHR9KVxuXHRcdFx0aWYodGhpcy5wcm9wcy5vbkNoYW5nZSlcblx0XHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSgxLGltYWdlcyk7XG5cdFx0XHR0ZXh0LnZhbHVlID0gXCJcIjtcblx0XHR9IFxuXHR9LFxuXHRoYW5kbGVSZW1vdmVJbWFnZTpmdW5jdGlvbihlKXtcblx0XHRlID0gZSB8fCBldmVudDtcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXHRcdHZhciBpbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIpKTtcblx0XHR2YXIgaW1hZ2VzID0gdGhpcy5zdGF0ZS5pbWFnZXM7XG5cdFx0aW1hZ2VzLnNwbGljZShpbmRleCwxKTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGltYWdlczppbWFnZXNcblx0XHR9KVxuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHR2YXIgaW1hZ2VzID0gdGhpcy5zdGF0ZS5pbWFnZXM7XG5cdFx0dmFyIGhhbmRsZVJlbW92ZUltYWdlID0gdGhpcy5oYW5kbGVSZW1vdmVJbWFnZTtcblx0XHRyZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhbmVsXCI+XG5cdFx0XHRcdDx0YWJsZSBjbGFzc05hbWU9XCJzZWFyY2gtYmFyXCI+XG5cdFx0XHRcdFx0PHRib2R5PlxuXHRcdFx0XHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0XHRcdFx0PHRkPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3NOYW1lPVwiaW1hZ2Utc2VhcmNoVHh0XCIgdHlwZT1cInRleHRcIiByZWY9XCJ0ZXh0XCIgLz5cblx0XHRcdFx0XHRcdFx0XHQ8L3RkPlxuXHRcdFx0XHRcdFx0XHRcdDx0ZD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbWFnZS1zZWFyY2hBZGRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT7mt7vliqA8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8L3RkPlxuXHRcdFx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHRcdDwvdGJvZHk+XG5cdFx0XHRcdDwvdGFibGU+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2UtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpbWFnZXMubWFwKGZ1bmN0aW9uKGVsZSxwb3Mpe1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoPGRpdiBrZXk9e3Bvc30gY2xhc3NOYW1lPVwiaW1hZ2UtaXRlbVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImltYWdlLWNsb3NlXCIgZGF0YS1pbmRleD17cG9zfSBvbkNsaWNrPXtoYW5kbGVSZW1vdmVJbWFnZX0+PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXtlbGUuc3JjfSBjbGFzc05hbWU9XCJpbWFnZS1waWNcIiBoZWlnaHQ9XCI3NVwiIHdpZHRoPVwiMTIwXCIgIC8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj4pXG5cdFx0XHRcdFx0XHQgICB9KVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2Pilcblx0fVxufSlcblxudmFyIEltYWdlRGlhbG9nID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW1hZ2VzOltbXSxbXV0sXG5cdFx0XHRoYW5kbGU6ZnVuY3Rpb24oKXt9XG5cdFx0fVxuXHR9LFxuXHRwcm9wVHlwZXM6e1xuXHRcdHVwbG9hZGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cdFx0Y3VzdG9tVXBsb2FkZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuXHR9LFxuXHRnZXREZWZhdWx0UHJvcHM6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dXBsb2FkZXI6e1xuXHRcdFx0XHR1cmw6XCIvdXBsb2FkXCIsXG5cdFx0XHRcdG5hbWU6XCJmaWxlXCJcblx0XHRcdH0sXG5cdFx0XHRjdXN0b21VcGxvYWRlcjpudWxsXG5cdFx0fVxuXHR9LFxuXHRvcGVuOmZ1bmN0aW9uKGhhbmRsZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRoYW5kbGU6aGFuZGxlXG5cdFx0fSlcblx0XHR0aGlzLnJlZnMubW9kYWwub3BlbigpO1xuXHR9LFxuXHRjbG9zZTpmdW5jdGlvbigpe1xuXHRcdHRoaXMucmVmcy5tb2RhbC5jbG9zZSgpO1xuXHRcdGlmKHRoaXMuc3RhdGUuaGFuZGxlKXtcblx0XHRcdHRoaXMuc3RhdGUuaGFuZGxlKCk7XG5cdFx0fVxuXHRcdHRoaXMucmVmcy5pbWFnZS5jbGVhckltYWdlcygpO1xuXHR9LFxuXHR0b2dnbGU6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnJlZnMubW9kYWwudG9nZ2xlKCk7XG5cdH0sXG5cdGhhbmRsZU9rQ2xpY2s6ZnVuY3Rpb24oZSl7XG5cdFx0Ly8g5YGa55u45bqU55qE5aSE55CGXG5cdFx0dmFyIHRhYkluZGV4ID0gdGhpcy5yZWZzLnRhYi5nZXRUYWJJbmRleCgpO1xuXHRcdHZhciBpbWFnZXMgPSB0aGlzLnN0YXRlLmltYWdlc1t0YWJJbmRleF07XG5cdFx0dmFyIHN0ckltZ3MgPSBcIlwiO1xuXHRcdGlmKGltYWdlcy5sZW5ndGg+MCAmJiB0aGlzLnN0YXRlLmhhbmRsZSl7XG5cdFx0XHRmb3IodmFyIGk9MDtpPGltYWdlcy5sZW5ndGg7aSsrKXtcblx0XHRcdFx0dmFyIHNyYyA9IGltYWdlc1tpXS5zcmM7XG5cdFx0XHRcdHZhciBzdHIgPSBcIjxpbWcgc3JjPSdcIitzcmMrXCInIC8+XCI7XG5cdFx0XHRcdHN0ckltZ3MgKz0gc3RyO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zdGF0ZS5oYW5kbGUoZSxzdHJJbWdzKTtcblx0XHR9XG5cdFx0dGhpcy5jbG9zZSgpO1xuXHR9LFxuXHRoYW5kbGVDaGFuZ2U6ZnVuY3Rpb24oaW5kZXgsaW1ncyl7XG5cdFx0dmFyIGltYWdlcyA9IHRoaXMuc3RhdGUuaW1hZ2VzO1xuXHRcdGltYWdlc1tpbmRleF0gPSBpbWdzO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aW1hZ2VzOmltYWdlc1xuXHRcdH0pXG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciB1cGxvYWRlciA9IHRoaXMucHJvcHMudXBsb2FkZXI7XG5cdFx0dmFyIGJ1dHRvbnMgPSBbXG5cdFx0XHR7IG5hbWU6XCJidG4tb2tcIiwgY29udGVudDpcIuehruWumlwiLCBvbkNsaWNrOnRoaXMuaGFuZGxlT2tDbGlja30sXG5cdFx0XHR7IG5hbWU6XCJidG4tY2FuY2VsXCIsIGNvbnRlbnQ6XCLlj5bmtohcIiwgb25DbGljazp0aGlzLmNsb3NlfVxuXHRcdF07XG5cdFx0dmFyIHRhYnMgPSBbXG5cdFx0XHR7dGl0bGU6XCLmnKzlnLDkuIrkvKBcIixjb21wb25lbnQ6KDxJbWFnZVVwbG9hZCByZWY9XCJpbWFnZVwiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gbmFtZT17dXBsb2FkZXIubmFtZX0gdXJsPXt1cGxvYWRlci51cmx9Lz4pfSxcblx0XHRcdHt0aXRsZTpcIue9kee7nOWbvueJh1wiLGNvbXBvbmVudDooPEltYWdlU2VhcmNoIHJlZj1cImltYWdlXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+KX0sXHRcdFxuXHRcdF1cblx0XHRyZXR1cm4gKDxEaWFsb2cgcmVmPVwibW9kYWxcIiBjbGFzc05hbWU9XCJpbWFnZS1kaWFsb2dcIiB3aWR0aD17NzAwfSBoZWlnaHQ9ezUwOH0gdGl0bGU9XCLlm77niYdcIiBidXR0b25zPXtidXR0b25zfSBvbkNsb3NlPXt0aGlzLmNsb3NlfT5cblx0XHRcdFx0PFRhYkdyb3VwIHRhYnM9e3RhYnN9IHJlZj1cInRhYlwiLz5cblx0XHRcdDwvRGlhbG9nPilcblx0fVxufSlcblx0XHRcbm1vZHVsZS5leHBvcnRzID0gSW1hZ2VEaWFsb2c7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBDb21ib0JveCA9IHJlcXVpcmUoJy4uL2Jhc2UvQ29tYm9Cb3gucmVhY3QnKTtcblxudmFyIFBhcmFncmFwaERyb3Bkb3duID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aGFuZGxlOmZ1bmN0aW9uKCl7fVxuXHRcdH1cblx0fSxcblx0b3BlbjpmdW5jdGlvbihwb3NpdGlvbixoYW5kbGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aGFuZGxlOmhhbmRsZVxuXHRcdH0pXG5cdFx0dGhpcy5yZWZzLnJvb3Qub3Blbihwb3NpdGlvbik7XG5cdH0sXG5cdGNsb3NlOmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5yZWZzLnJvb3QuY2xvc2UoKTtcblx0fSxcblx0dG9nZ2xlOmZ1bmN0aW9uKHBvc2l0aW9uKXtcblx0XHR0aGlzLnJlZnMucm9vdC50b2dnbGUocG9zaXRpb24pO1xuXHR9LFxuXHRoYW5kbGVTZWxlY3Q6ZnVuY3Rpb24oZSl7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblx0XHR2YXIgdmFsdWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJyk7XG5cdFx0aWYodGhpcy5zdGF0ZS5oYW5kbGUpe1xuXHRcdFx0dGhpcy5zdGF0ZS5oYW5kbGUoZSx2YWx1ZSk7XG5cdFx0fVxuXHRcdGlmKGUuc3RvcFByb3BhZ2F0aW9uKXtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fWVsc2V7XG5cdFx0XHRlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG5cdFx0fVxuXHRcdHRoaXMuY2xvc2UoKTtcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIGhhbmRsZVNlbGVjdCA9IHRoaXMuaGFuZGxlU2VsZWN0O1xuXHRcdHZhciBwYXJhZ3JhcGggPSB0aGlzLnByb3BzLnBhcmFncmFwaD90aGlzLnByb3BzLnBhcmFncmFwaDpbXTtcblx0XHR2YXIgcHJvcHMgPSB0aGlzLnByb3BzO1xuXHRcdHJldHVybiAoPENvbWJvQm94IHJlZj1cInJvb3RcIiBjbGFzc05hbWU9XCJjb2xvci1jb21ib2JveFwiPlxuXHRcdFx0PHVsPlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cGFyYWdyYXBoLm1hcChmdW5jdGlvbihlbGUscG9zKXtcblx0XHRcdFx0XHRcdHJldHVybiAoPGxpIGNsYXNzTmFtZT17ZWxlLnZhbHVlPT1wcm9wcy52YWx1ZT9cImFjdGl2ZVwiOlwiXCJ9IGtleT17cG9zfSBkYXRhLXZhbHVlPXtlbGUudmFsdWV9IG9uQ2xpY2s9e2hhbmRsZVNlbGVjdH0+XG5cdFx0XHRcdFx0XHRcdFx0XHR7UmVhY3QuY3JlYXRlRWxlbWVudChlbGUudmFsdWUse1wiZGF0YS12YWx1ZVwiOiBlbGUudmFsdWV9LGVsZS5uYW1lKX1cblx0XHRcdFx0XHRcdFx0XHQ8L2xpPilcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHQ8L3VsPlxuXHRcdDwvQ29tYm9Cb3g+KVxuXHR9XG59KVxuXHRcdFxubW9kdWxlLmV4cG9ydHMgPSBQYXJhZ3JhcGhEcm9wZG93bjsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0RE9NID0gIHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuXG52YXIgVGFiR3JvdXAgPSByZXF1aXJlKCcuLi9iYXNlL1RhYkdyb3VwLnJlYWN0Jyk7XG52YXIgRGlhbG9nID0gcmVxdWlyZSgnLi4vYmFzZS9EaWFsb2cucmVhY3QnKTtcbnZhciB7U3BlY2lhbENoYXJzfSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9FZGl0b3JDb25zdGFudHMnKTtcblxudmFyIFNDQ2hhcnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGhhbmRsZUNsaWNrOmZ1bmN0aW9uKGUpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cdFx0dmFyIGNoYXIgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jaGFyXCIpO1xuXHRcdHZhciBpZCA9ICdjaGFyLScrbmV3IERhdGUoKS52YWx1ZU9mKCk7XG5cdFx0aWYodGhpcy5wcm9wcy5vblNlbGVjdENoYXIpe1xuXHRcdFx0dGhpcy5wcm9wcy5vblNlbGVjdENoYXIoZSxjaGFyKTtcblx0XHR9XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciBjaGFycyA9IHRoaXMucHJvcHMuY2hhcnM7XG5cdFx0dmFyIGhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljaztcblx0XHRyZXR1cm4gKDx1bCBjbGFzc05hbWU9e1wic3BlY2lhbC1jaGFycyBcIit0aGlzLnByb3BzLm5hbWV9ID5cblx0XHRcdHtcblx0XHRcdFx0Y2hhcnMubWFwKGZ1bmN0aW9uKGVsZSxwb3Mpe1xuXHRcdFx0XHRcdHJldHVybiAoPGxpIGNsYXNzTmFtZT1cInNwZWNpYWwtY2hhclwiIGtleT17cG9zfSBkYXRhLWNoYXI9e2VsZX0gb25DbGljaz17aGFuZGxlQ2xpY2t9PntlbGV9PC9saT4pXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0PC91bD4pXG5cdH1cbn0pXG5cbnZhciBTcGVjaWFsQ2hhcnNEaWFsb2cgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRoYW5kbGU6ZnVuY3Rpb24oKXt9XG5cdFx0fVxuXHR9LFxuXHRvcGVuOmZ1bmN0aW9uKHBvc2l0aW9uLGhhbmRsZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRoYW5kbGU6aGFuZGxlXG5cdFx0fSlcblx0XHR0aGlzLnJlZnMucm9vdC5vcGVuKHBvc2l0aW9uKTtcblx0fSxcblx0Y2xvc2U6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnJlZnMucm9vdC5jbG9zZSgpO1xuXHR9LFxuXHR0b2dnbGU6ZnVuY3Rpb24ocG9zaXRpb24pe1xuXHRcdHRoaXMucmVmcy5yb290LnRvZ2dsZShwb3NpdGlvbik7XG5cdH0sXG5cdGhhbmRsZVNlbGVjdENoYXI6ZnVuY3Rpb24oZSxjaGFyKXtcblx0XHRlID0gZSB8fCBldmVudDtcblx0XHRpZih0aGlzLnN0YXRlLmhhbmRsZSl7XG5cdFx0XHR0aGlzLnN0YXRlLmhhbmRsZShlLGNoYXIpO1xuXHRcdH1cblx0XHRpZihlLnN0b3BQcm9wYWdhdGlvbil7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG5cdFx0fVxuXHRcdHRoaXMuY2xvc2UoKTtcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHRhYnMgPSBbXTtcblx0XHRmb3IodmFyIGk9MDtpPFNwZWNpYWxDaGFycy5sZW5ndGg7aSsrKXtcblx0XHRcdHRhYnMucHVzaCh7XG5cdFx0XHRcdHRpdGxlOlNwZWNpYWxDaGFyc1tpXS50aXRsZSxcblx0XHRcdFx0Y2hhcnM6U3BlY2lhbENoYXJzW2ldLmNoYXJzLFxuXHRcdFx0XHRjb21wb25lbnQ6KDxTQ0NoYXJzIGNoYXJzPXtTcGVjaWFsQ2hhcnNbaV0uY2hhcnN9IG5hbWU9XCJjb21tb24tY2hhcnNcIiBvblNlbGVjdENoYXI9e3RoaXMuaGFuZGxlU2VsZWN0Q2hhcn0gLz4pXG5cdFx0XHR9KVxuXHRcdH1cblx0XHR2YXIgYnV0dG9ucyA9IFtdO1xuXHRcdHJldHVybiAoPERpYWxvZyByZWY9XCJyb290XCIgY2xhc3NOYW1lPVwic3BlY2lhbC1jaGFycy1kaWFsb2dcIiB3aWR0aD17NzAwfSBoZWlnaHQ9ezUwOH0gdGl0bGU9XCLnibnmrorlrZfnrKZcIiBidXR0b25zPXtidXR0b25zfSBvbkNsb3NlPXt0aGlzLmNsb3NlfT5cblx0XHRcdFx0PFRhYkdyb3VwIHRhYnM9e3RhYnN9IC8+XG5cdFx0PC9EaWFsb2c+KVxuXHR9XG59KVxuXHRcdFxubW9kdWxlLmV4cG9ydHMgPSBTcGVjaWFsQ2hhcnNEaWFsb2c7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBEcm9wZG93biA9IHJlcXVpcmUoJy4uL2Jhc2UvRHJvcGRvd24ucmVhY3QnKTtcblxudmFyIFRhYmxlUGlja2VyRHJvcGRvd24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3c6MCxcbiAgICAgICAgICAgIGNvbHVtbjowLFxuICAgICAgICAgICAgaGFuZGxlOmZ1bmN0aW9uKCl7fSxcbiAgICAgICAgICAgIHBvc2l0aW9uOnt4OjAseTowfVxuICAgICAgICB9XG4gICAgfSxcblx0b3BlbjpmdW5jdGlvbihwb3NpdGlvbixoYW5kbGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aGFuZGxlOmhhbmRsZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOnBvc2l0aW9uXG5cdFx0fSlcblx0XHR0aGlzLnJlZnMucm9vdC5vcGVuKHBvc2l0aW9uKTtcblx0fSxcblx0Y2xvc2U6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnJlZnMucm9vdC5jbG9zZSgpO1xuXHR9LFxuXHR0b2dnbGU6ZnVuY3Rpb24ocG9zaXRpb24pe1xuXHRcdHRoaXMucmVmcy5yb290LnRvZ2dsZShwb3NpdGlvbik7XG5cdH0sXG4gICAgaGFuZGxlTW91c2VFdmVudDpmdW5jdGlvbihlKXtcbiAgICAgICAgZSA9IGUgfHwgZXZlbnQ7XG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblx0XHR2YXIgcGFyZW50UG9zdGlvbiA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHJvdyA9TWF0aC5jZWlsKChlLmNsaWVudFggLSBwYXJlbnRQb3N0aW9uLmxlZnQpIC8gMjIpO1xuICAgICAgICB2YXIgY29sdW1uID1NYXRoLmNlaWwoKGUuY2xpZW50WSAtIHBhcmVudFBvc3Rpb24udG9wKSAvIDIyKTtcbiAgICAgICAgaWYocm93PDApIHJvdyA9IDA7XG4gICAgICAgIGlmKGNvbHVtbjwwKSBjb2x1bW4gPSAwO1xuICAgICAgICBcbiAgICAgICAgaWYocm93PjEwKSByb3cgPSAxMDtcbiAgICAgICAgaWYoY29sdW1uPjEwKSBjb2x1bW4gPSAxMDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICByb3c6cm93LFxuICAgICAgICAgICAgY29sdW1uOmNvbHVtblxuICAgICAgICB9KVxuICAgIH0sXG4gICAgaGFuZGxlTW91c2VPdXQ6ZnVuY3Rpb24oZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcm93OjAsXG4gICAgICAgICAgICBjb2x1bW46MFxuICAgICAgICB9KVxuICAgIH0sXG4gICAgaGFuZGxlQ2xpY2s6ZnVuY3Rpb24oZSl7XG4gICAgICAgIC8vIGluc2VydCB0YWJsZVxuICAgICAgICB2YXIgVGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG5cdFx0VGFibGUuY2xhc3NOYW1lID0gXCJlZGl0b3ItdGFibGVcIjtcbiAgICAgICAgdmFyIFRCb2R5ID0gVGFibGUuY3JlYXRlVEJvZHkoKTtcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLnN0YXRlLnJvdztpKyspe1xuICAgICAgICAgICAgdmFyIFRyID0gVEJvZHkuaW5zZXJ0Um93KCk7XG4gICAgICAgICAgICBmb3IodmFyIGo9MDtqPHRoaXMuc3RhdGUuY29sdW1uO2orKyl7XG4gICAgICAgICAgICAgICAgdmFyIFRkID0gVHIuaW5zZXJ0Q2VsbCgpO1xuICAgICAgICAgICAgICAgIFRkLndpZHRoID0gMjAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuaGFuZGxlKGUsVGFibGUub3V0ZXJIVE1MKTtcbiAgICAgICAgdGhpcy5yZWZzLnJvb3QuY2xvc2UoKTtcbiAgICB9LFxuICAgIHJlbmRlcjpmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcm93ID0gdGhpcy5zdGF0ZS5yb3c7XG4gICAgICAgIHZhciBjb2x1bW4gPSB0aGlzLnN0YXRlLmNvbHVtbjtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoPERyb3Bkb3duIHJlZj1cInJvb3RcIiBjbGFzc05hbWU9XCJ0YWJsZXBpY2tlci1kcm9wZG93blwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluZm9hcmVhXCI+IDxzcGFuPntjb2x1bW4rXCLliJcgeCBcIityb3crXCLooYxcIn08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGlja2FyZWFcIiBvbk1vdXNlT3Zlcj17dGhpcy5oYW5kbGVNb3VzZUV2ZW50fSAgb25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VFdmVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlT3V0PXt0aGlzLmhhbmRsZU1vdXNlT3V0fSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJsYXlcIiBzdHlsZT17e3dpZHRoOnJvdyoyMixoZWlnaHQ6Y29sdW1uKjIyfX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvRHJvcGRvd24+KVxuICAgIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gVGFibGVQaWNrZXJEcm9wZG93bjsiLCJ2YXIgRWRpdG9ySWNvblR5cGVzID0ge1xuXHRcInNvdXJjZVwiOntcblx0XHR0aXRsZTpcIua6kOS7o+eggVwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwic2VwYXJhdG9yXCI6e1xuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwidW5kb1wiOntcblx0XHR0aXRsZTpcIuaSpOmUgFwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwicmVkb1wiOntcblx0XHR0aXRsZTpcIumHjeWBmlwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiYm9sZFwiOntcblx0XHR0aXRsZTpcIuWKoOeyl1wiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiaXRhbGljXCI6e1xuXHRcdHRpdGxlOlwi5pac57q/XCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJ1bmRlcmxpbmVcIjp7XG5cdFx0dGl0bGU6XCLkuIvliJLnur9cIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcInN0cmlrZXRocm91Z2hcIjp7XG5cdFx0dGl0bGU6XCLliKDpmaTnur9cIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcInN1cGVyc2NyaXB0XCI6e1xuXHRcdHRpdGxlOlwi5LiK5qCHXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJzdWJzY3JpcHRcIjp7XG5cdFx0dGl0bGU6XCLkuIvmoIdcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcImZvcmVjb2xvclwiOntcblx0XHR0aXRsZTpcIuWtl+S9k+minOiJslwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiYmFja2NvbG9yXCI6e1xuXHRcdHRpdGxlOlwi6IOM5pmv6ImyXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJyZW1vdmVmb3JtYXRcIjp7XG5cdFx0dGl0bGU6XCLmuIXpmaTmoLzlvI9cIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcImluc2VydHVub3JkZXJlZGxpc3RcIjp7XG5cdFx0dGl0bGU6XCLml6Dluo/liJfooahcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcImluc2VydG9yZGVyZWRsaXN0XCI6e1xuXHRcdHRpdGxlOlwi5pyJ5bqP5YiX6KGoXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJzZWxlY3RhbGxcIjp7XG5cdFx0dGl0bGU6XCLlhajpgIlcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcImNsZWFyZG9jXCI6e1xuXHRcdHRpdGxlOlwi5riF56m65paH5qGjXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJwYXJhZ3JhcGhcIjp7XG5cdFx0dGl0bGU6XCLmrrXokL3moLzlvI9cIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcImZvbnRmYW1pbHlcIjp7XG5cdFx0dGl0bGU6XCLlrZfkvZNcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcImZvbnRzaXplXCI6e1xuXHRcdHRpdGxlOlwi5a2X5Y+3XCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJqdXN0aWZ5bGVmdFwiOntcblx0XHR0aXRsZTpcIuWxheW3puWvuem9kFwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwianVzdGlmeWNlbnRlclwiOntcblx0XHR0aXRsZTpcIuWxheS4reWvuem9kFwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwianVzdGlmeXJpZ2h0XCI6e1xuXHRcdHRpdGxlOlwi5bGF5Y+z5a+56b2QXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJsaW5rXCI6e1xuXHRcdHRpdGxlOlwi6LaF6ZO+5o6lXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJ1bmxpbmtcIjp7XG5cdFx0dGl0bGU6XCLlj5bmtojpk77mjqVcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcImVtb3Rpb25cIjp7XG5cdFx0dGl0bGU6XCLooajmg4VcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcImltYWdlXCI6e1xuXHRcdHRpdGxlOlwi5Zu+54mHXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJ2aWRlb1wiOntcblx0XHR0aXRsZTpcIuinhumikVwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwibWFwXCI6e1xuXHRcdHRpdGxlOlwi55m+5bqm5Zyw5Zu+XCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJob3Jpem9udGFsXCI6e1xuXHRcdHRpdGxlOlwi5YiG6ZqU57q/XCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJwcmludFwiOntcblx0XHR0aXRsZTpcIuaJk+WNsFwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwicHJldmlld1wiOntcblx0XHR0aXRsZTpcIumihOiniFwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiZHJhZnRzXCI6e1xuXHRcdHRpdGxlOlwi6I2J56i/566xXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJmb3JtdWxhXCI6e1xuXHRcdHRpdGxlOlwi5pWw5a2m5YWs5byPXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcbiAgICBcImluc2VydHRhYmxlXCI6e1xuXHRcdHRpdGxlOlwi5o+S5YWl6KGo5qC8XCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2VcbiAgICB9LFxuXHRcInRvdXBwZXJjYXNlXCI6e1xuXHRcdHRpdGxlOlwi6L2s5o2i5aSn5YaZXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJ0b2xvd2VyY2FzZVwiOntcblx0XHR0aXRsZTpcIui9rOaNouWwj+WGmVwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiaW5kZW50XCI6e1xuXHRcdHRpdGxlOlwi5aKe5Yqg57yp6L+bXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJvdXRkZW50XCI6e1xuXHRcdHRpdGxlOlwi5YeP5bCR57yp6L+bXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJzcGVjaGFyc1wiOntcblx0XHR0aXRsZTpcIueJueauiuespuWPt1wiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiZm9udGJvcmRlclwiOntcblx0XHR0aXRsZTpcIuWtl+S9k+i+ueahhlwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG4gICAgXCJkYXRlXCI6e1xuICAgICAgICB0aXRsZTpcIuaPkuWFpeaXpeacn1wiLFxuICAgICAgICBkaXNhYmxlZDpmYWxzZVxuICAgIH0sXG4gICAgXCJ0aW1lXCI6e1xuICAgICAgICB0aXRsZTpcIuaPkuWFpeaXtumXtFwiLFxuICAgICAgICBkaXNhYmxlZDpmYWxzZVxuICAgIH0sXG59XG52YXIgQ29sb3JUeXBlcyA9IHtcblx0dGhlbWVDb2xvcnM6W1xuXHRcdFtcIiNmZmZcIixcIiMwMDBcIixcIiNlZWVjZTFcIixcIiMxZjQ5N2RcIixcIiM0ZjgxYmRcIixcIiNjMDUwNGRcIixcIiM5YmJiNTlcIixcIiM4MDY0YTJcIixcIiM0YmFjYzZcIixcIiNmNzk2NDZcIl0sXG5cdFx0W1wiI2YyZjJmMlwiLFwiN2Y3ZjdmXCIsXCIjZGRkOWMzXCIsXCIjYzZkOWYwXCIsXCIjZGJlNWYxXCIsXCIjZjJkY2RiXCIsXCIjZWJmMWRkXCIsXCIjZTVlMGVjXCIsXCIjZGJlZWYzXCIsXCIjZmRlYWRhXCJdLFxuXHRcdFtcIiNkOGQ4ZDhcIixcIiM1OTU5NTlcIixcIiNjNGJkOTdcIixcIiM4ZGIzZTJcIixcIiNiOGNjZTRcIixcIiNlNWI5YjdcIixcIiNkN2UzYmNcIixcIiNjY2MxZDlcIixcIiNiN2RkZThcIixcIiNmYmQ1YjVcIl0sXG5cdFx0W1wiI2JmYmZiZlwiLFwiIzNmM2YzZlwiLFwiIzkzODk1M1wiLFwiIzU0OGRkNFwiLFwiIzk1YjNkN1wiLFwiI2Q5OTY5NFwiLFwiI2MzZDY5YlwiLFwiI2IyYTJjN1wiLFwiIzkyY2RkY1wiLFwiI2ZhYzA4ZlwiXSxcblx0XHRbXCIjYTVhNWE1XCIsXCIjMjYyNjI2XCIsXCIjNDk0NDI5XCIsXCIjMTczNjVkXCIsXCIjMzY2MDkyXCIsXCIjOTUzNzM0XCIsXCIjNzY5MjNjXCIsXCIjNWY0OTdhXCIsXCIjMzE4NTliXCIsXCIjZTM2YzA5XCJdLFxuXHRcdFtcIiM3ZjdmN2ZcIixcIiMwYzBjMGNcIixcIiMxZDFiMTBcIixcIiMwZjI0M2VcIixcIiMyNDQwNjFcIixcIiM2MzI0MjNcIixcIiM0ZjYxMjhcIixcIiMzZjMxNTFcIixcIiMyMDU4NjdcIixcIiM5NzQ4MDZcIl1cblx0XSxcblx0c3RhbmRhcmRDb2xvcnM6W1wiI2MwMDAwMFwiLFwiI2ZmMDAwMFwiLFwiI2ZmYzAwMFwiLFwiI2ZmZmYwMFwiLFwiIzkyZDA1MFwiLFwiIzAwYjA1MFwiLFwiIzAwYjBmMFwiLFwiIzAwNzBjMFwiLFwiIzAwMjA2MFwiLFwiIzcwMzBhMFwiXVxufVxudmFyIEZvcm11bGFUeXBlcyA9IHtcblx0Y29tbW9uRm9ybXVsYXM6W1xuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMHB4IC0wcHhcIixsYXRleDpcIlxcXFxmcmFjeyB9eyB9XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMzBweCAtMHB4XCIsbGF0ZXg6XCJeeyB9L197IH1cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi02MHB4IC0wcHhcIixsYXRleDpcInheeyB9XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItOTBweCAtMHB4XCIsbGF0ZXg6XCJ4X3sgfVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTEyMHB4IC0wcHhcIixsYXRleDpcInheeyB9X3sgfVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTE1MHB4IC0wcHhcIixsYXRleDpcIlxcXFxiYXJ7IH1cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xODBweCAtMHB4XCIsbGF0ZXg6XCJcXFxcc3FydHsgfVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTIxMHB4IC0wcHhcIixsYXRleDpcIlxcXFxudGhyb290eyB9eyB9XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMHB4IC0zMHB4XCIsbGF0ZXg6XCJcXFxcc3VtXnsgfV97bj19XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItNjBweCAtMzBweFwiLGxhdGV4OlwiXFxcXGxvZ197IH1cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi05MHB4IC0zMHB4XCIsbGF0ZXg6XCJcXFxcbG5cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xMjBweCAtMzBweFwiLGxhdGV4OlwiXFxcXGludF97IH1eeyB9XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTUwcHggLTMwcHhcIixsYXRleDpcIlxcXFxvaW50X3sgfV57IH1cIn1cblx0XSxcblx0c3ltYm9sRm9ybXVsYXM6W1xuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMHB4IC02MHB4XCIsbGF0ZXg6XCIrXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMzBweCAtNjBweFwiLGxhdGV4OlwiLVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTYwcHggLTYwcHhcIixsYXRleDpcIlxcXFxwbVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTkwcHggLTYwcHhcIixsYXRleDpcIlxcXFx0aW1lc1wifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTEyMHB4IC02MHB4XCIsbGF0ZXg6XCJcXFxcYXN0XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTUwcHggLTYwcHhcIixsYXRleDpcIlxcXFxkaXZcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xODBweCAtNjBweFwiLGxhdGV4OlwiL1wifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTIxMHB4IC02MHB4XCIsbGF0ZXg6XCJcXFxcYmlndHJpYW5nbGV1cFwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTBweCAtOTBweFwiLGxhdGV4OlwiPVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTMwcHggLTkwcHhcIixsYXRleDpcIlxcXFxuZVwifSxcblx0XHRcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTYwcHggLTkwcHhcIixsYXRleDpcIlxcXFxhcHByb3hcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi05MHB4IC05MHB4XCIsbGF0ZXg6XCI+XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTIwcHggLTkwcHhcIixsYXRleDpcIjxcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xNTBweCAtOTBweFwiLGxhdGV4OlwiXFxcXGdlXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTgwcHggLTkwcHhcIixsYXRleDpcIlxcXFxsZVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTIxMHB4IC05MHB4XCIsbGF0ZXg6XCJcXFxcaW5mdHlcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0wcHggLTEyMHB4XCIsbGF0ZXg6XCJcXFxcY2FwXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMzBweCAtMTIwcHhcIixsYXRleDpcIlxcXFxjdXBcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi02MHB4IC0xMjBweFwiLGxhdGV4OlwiXFxcXGJlY2F1c2VcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi05MHB4IC0xMjBweFwiLGxhdGV4OlwiXFxcXHRoZXJlZm9yZVwifSxcblx0XHRcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTEyMHB4IC0xMjBweFwiLGxhdGV4OlwiXFxcXHN1YnNldFwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTE1MHB4IC0xMjBweFwiLGxhdGV4OlwiXFxcXHN1cHNldFwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTE4MHB4IC0xMjBweFwiLGxhdGV4OlwiXFxcXHN1YnNldGVxXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMjEwcHggLTEyMHB4XCIsbGF0ZXg6XCJcXFxcc3Vwc2V0ZXFcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0wcHggLTE1MHB4XCIsbGF0ZXg6XCJcXFxcbnN1YnNldGVxXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMzBweCAtMTUwcHhcIixsYXRleDpcIlxcXFxuc3Vwc2V0ZXFcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi02MHB4IC0xNTBweFwiLGxhdGV4OlwiXFxcXGluXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItOTBweCAtMTUwcHhcIixsYXRleDpcIlxcXFxuaVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTEyMHB4IC0xNTBweFwiLGxhdGV4OlwiXFxcXG5vdGluXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTUwcHggLTE1MHB4XCIsbGF0ZXg6XCJcXFxcbWFwc3RvXCJ9LFxuXHRcdFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTgwcHggLTE1MHB4XCIsbGF0ZXg6XCJcXFxcbGVmdGFycm93XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMjEwcHggLTE1MHB4XCIsbGF0ZXg6XCJcXFxccmlnaHRhcnJvd1wifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTBweCAtMTgwcHhcIixsYXRleDpcIlxcXFxMZWZ0YXJyb3dcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0zMHB4IC0xODBweFwiLGxhdGV4OlwiXFxcXFJpZ2h0YXJyb3dcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi02MHB4IC0xODBweFwiLGxhdGV4OlwiXFxcXGxlZnRyaWdodGFycm93XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItOTBweCAtMTgwcHhcIixsYXRleDpcIlxcXFxMZWZ0cmlnaHRhcnJvd1wifSxcblx0XSxcblx0YXJhYmljRm9ybXVsYXM6W1xuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMHB4IC0yMTBweFwiLGxhdGV4OlwiXFxcXGFscGhhXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMzBweCAtMjEwcHhcIixsYXRleDpcIlxcXFxiZXRhXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItNjBweCAtMjEwcHhcIixsYXRleDpcIlxcXFxnYW1tYVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTkwcHggLTIxMHB4XCIsbGF0ZXg6XCJcXFxcZGVsdGFcIn0sXG5cdFx0XG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xMjBweCAtMjEwcHhcIixsYXRleDpcIlxcXFx2YXJlcHNpbG9uXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTUwcHggLTIxMHB4XCIsbGF0ZXg6XCJcXFxcdmFycGhpXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTgwcHggLTIxMHB4XCIsbGF0ZXg6XCJcXFxcbGFtYmRhXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMjEwcHggLTIxMHB4XCIsbGF0ZXg6XCJcXFxcbXVcIn0sXG5cdFx0XG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0wcHggLTI0MHB4XCIsbGF0ZXg6XCJcXFxccmhvXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMzBweCAtMjQwcHhcIixsYXRleDpcIlxcXFxzaWdtYVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTYwcHggLTI0MHB4XCIsbGF0ZXg6XCJcXFxcb21lZ2FcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi05MHB4IC0yNDBweFwiLGxhdGV4OlwiXFxcXEdhbW1hXCJ9LFxuXHRcdFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTIwcHggLTI0MHB4XCIsbGF0ZXg6XCJcXFxcRGVsdGFcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xNTBweCAtMjQwcHhcIixsYXRleDpcIlxcXFxUaGV0YVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTE4MHB4IC0yNDBweFwiLGxhdGV4OlwiXFxcXExhbWJkYVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTIxMHB4IC0yNDBweFwiLGxhdGV4OlwiXFxcXFhpXCJ9LFxuXHRcdFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMHB4IC0yNzBweFwiLGxhdGV4OlwiXFxcXFBpXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMzBweCAtMjcwcHhcIixsYXRleDpcIlxcXFxTaWdtYVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTYwcHggLTI3MHB4XCIsbGF0ZXg6XCJcXFxcVXBzaWxvblwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTkwcHggLTI3MHB4XCIsbGF0ZXg6XCJcXFxcUGhpXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTIwcHggLTI3MHB4XCIsbGF0ZXg6XCJcXFxcUHNpXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTUwcHggLTI3MHB4XCIsbGF0ZXg6XCJcXFxcT21lZ2FcIn0sXG5cdF1cbn1cbnZhciB0b0FycmF5ID0gZnVuY3Rpb24oc3RyKXtcblx0cmV0dXJuIHN0ci5zcGxpdChcIixcIik7XG59XG52YXIgU3BlY2lhbENoYXJzID0gW1xuICAgIHsgbmFtZTpcInRzZmhcIiwgdGl0bGU6XCLnibnmrorlrZfnrKZcIiwgY2hhcnM6dG9BcnJheShcIuOAgSzjgIIswrcsy4ksy4cswqgs44CDLOOAhSzigJQs772eLOKAlizigKYs4oCYLOKAmSzigJws4oCdLOOAlCzjgJUs44CILOOAiSzjgIos44CLLOOAjCzjgI0s44COLOOAjyzjgJYs44CXLOOAkCzjgJEswrEsw5csw7cs4oi2LOKIpyziiKgs4oiRLOKIjyziiKos4oipLOKIiCziiLcs4oiaLOKKpSziiKUs4oigLOKMkiziipks4oirLOKIriziiaEs4omMLOKJiCziiL0s4oidLOKJoCziia4s4omvLOKJpCziiaUs4oieLOKItSziiLQs4pmCLOKZgCzCsCzigLIs4oCzLOKEgyzvvIQswqQs77+gLO+/oSzigLAswqcs4oSWLOKYhizimIUs4peLLOKXjyzil44s4peHLOKXhizilqEs4pagLOKWsyzilrIs4oC7LOKGkizihpAs4oaRLOKGkyzjgJMs44ChLOOAoizjgKMs44CkLOOApSzjgKYs44CnLOOAqCzjgKks44qjLOOOjizjjo8s446cLOOOnSzjjp4s446hLOOPhCzjj44s44+RLOOPkizjj5Us77iwLO+/oizvv6Qs4oShLMuKLMuLLMuZLOKAkyzigJUs4oClLOKAtSzihIUs4oSJLOKGlizihpcs4oaYLOKGmSziiJUs4oifLOKIoyziiZIs4ommLOKJpyziir8s4pWQLOKVkSzilZIs4pWTLOKVlCzilZUs4pWWLOKVlyzilZgs4pWZLOKVmizilZss4pWcLOKVnSzilZ4s4pWfLOKVoCzilaEs4pWiLOKVoyzilaQs4pWlLOKVpizilacs4pWoLOKVqSzilaos4pWrLOKVrCzila0s4pWuLOKVryzilbAs4pWxLOKVsizilbMs4paBLOKWgiziloMs4paELOKWhSziloYs4paHLO+/vX8s4paILOKWiSziloos4paLLOKWjCzilo0s4paOLOKWjyzilpMs4paULOKWlSzilrws4pa9LOKXoizil6Ms4pekLOKXpSzimIks4oqVLOOAkizjgJ0s44CeXCIpfSxcbiAgICB7IG5hbWU6XCJsbXN6XCIsIHRpdGxlOlwi572X6ams5a2X56ymXCIsIGNoYXJzOnRvQXJyYXkoXCLihbAs4oWxLOKFsizihbMs4oW0LOKFtSzihbYs4oW3LOKFuCzihbks4oWgLOKFoSzihaIs4oWjLOKFpCzihaUs4oWmLOKFpyzihags4oWpLOKFqizihatcIil9LFxuICAgIHsgbmFtZTpcInN6ZmhcIiwgdGl0bGU6XCLmlbDlrablrZfnrKZcIiwgY2hhcnM6dG9BcnJheShcIuKSiCzikoks4pKKLOKSiyzikows4pKNLOKSjiziko8s4pKQLOKSkSzikpIs4pKTLOKSlCzikpUs4pKWLOKSlyzikpgs4pKZLOKSmizikpss4pG0LOKRtSzikbYs4pG3LOKRuCzikbks4pG6LOKRuyzikbws4pG9LOKRvizikb8s4pKALOKSgSzikoIs4pKDLOKShCzikoUs4pKGLOKShyzikaAs4pGhLOKRoizikaMs4pGkLOKRpSzikaYs4pGnLOKRqCzikaks44igLOOIoSzjiKIs44ijLOOIpCzjiKUs44imLOOIpyzjiKgs44ipXCIpfSxcbiAgICB7IG5hbWU6XCJyd2ZoXCIsIHRpdGxlOlwi5pel5paH5a2X56ymXCIsIGNoYXJzOnRvQXJyYXkoXCLjgYEs44GCLOOBgyzjgYQs44GFLOOBhizjgYcs44GILOOBiSzjgYos44GLLOOBjCzjgY0s44GOLOOBjyzjgZAs44GRLOOBkizjgZMs44GULOOBlSzjgZYs44GXLOOBmCzjgZks44GaLOOBmyzjgZws44GdLOOBnizjgZ8s44GgLOOBoSzjgaIs44GjLOOBpCzjgaUs44GmLOOBpyzjgags44GpLOOBqizjgass44GsLOOBrSzjga4s44GvLOOBsCzjgbEs44GyLOOBsyzjgbQs44G1LOOBtizjgbcs44G4LOOBuSzjgbos44G7LOOBvCzjgb0s44G+LOOBvyzjgoAs44KBLOOCgizjgoMs44KELOOChSzjgoYs44KHLOOCiCzjgoks44KKLOOCiyzjgows44KNLOOCjizjgo8s44KQLOOCkSzjgpIs44KTLOOCoSzjgqIs44KjLOOCpCzjgqUs44KmLOOCpyzjgqgs44KpLOOCqizjgqss44KsLOOCrSzjgq4s44KvLOOCsCzjgrEs44KyLOOCsyzjgrQs44K1LOOCtizjgrcs44K4LOOCuSzjgros44K7LOOCvCzjgr0s44K+LOOCvyzjg4As44OBLOODgizjg4Ms44OELOODhSzjg4Ys44OHLOODiCzjg4ks44OKLOODiyzjg4ws44ONLOODjizjg48s44OQLOODkSzjg5Is44OTLOODlCzjg5Us44OWLOODlyzjg5gs44OZLOODmizjg5ss44OcLOODnSzjg54s44OfLOODoCzjg6Es44OiLOODoyzjg6Qs44OlLOODpizjg6cs44OoLOODqSzjg6os44OrLOODrCzjg60s44OuLOODryzjg7As44OxLOODsizjg7Ms44O0LOODtSzjg7ZcIil9LFxuICAgIHsgbmFtZTpcInhsem1cIiwgdGl0bGU6XCLluIzohYrlrZfnrKZcIiwgY2hhcnM6dG9BcnJheShcIs6RLM6SLM6TLM6ULM6VLM6WLM6XLM6YLM6ZLM6aLM6bLM6cLM6dLM6eLM6fLM6gLM6hLM6jLM6kLM6lLM6mLM6nLM6oLM6pLM6xLM6yLM6zLM60LM61LM62LM63LM64LM65LM66LM67LM68LM69LM6+LM6/LM+ALM+BLM+DLM+ELM+FLM+GLM+HLM+ILM+JXCIpfSxcbiAgICB7IG5hbWU6XCJld3ptXCIsIHRpdGxlOlwi5L+E5paH5a2X56ymXCIsIGNoYXJzOnRvQXJyYXkoXCLQkCzQkSzQkizQkyzQlCzQlSzQgSzQlizQlyzQmCzQmSzQmizQmyzQnCzQnSzQnizQnyzQoCzQoSzQoizQoyzQpCzQpSzQpizQpyzQqCzQqSzQqizQqyzQrCzQrSzQrizQryzQsCzQsSzQsizQsyzQtCzQtSzRkSzQtizQtyzQuCzQuSzQuizQuyzQvCzQvSzQvizQvyzRgCzRgSzRgizRgyzRhCzRhSzRhizRhyzRiCzRiSzRiizRiyzRjCzRjSzRjizRj1wiKX0sXG4gICAgeyBuYW1lOlwicHl6bVwiLCB0aXRsZTpcIuaLvOmfs+Wtl+avjVwiLCBjaGFyczp0b0FycmF5KFwixIEsw6Esx44sw6AsxJMsw6ksxJssw6gsxKssw60sx5Asw6wsxY0sw7Msx5Isw7Isxassw7osx5Qsw7ksx5Ysx5gsx5osx5wsw7xcIil9LFxuICAgIHsgbmFtZTpcInl5eWJcIiwgdGl0bGU6XCLoi7Hor63pn7PmoIdcIiwgY2hhcnM6dG9BcnJheShcImk6LGksZSzDpizKjCzJmTosyZksdTosdSzJlDosyZQsYTosZWksYWksyZRpLMmZdSxhdSxpyZkszrXJmSx1yZkscCx0LGssYixkLGcsZixzLMqDLM64LGgsdix6LMqSLMOwLHTKgyx0cix0cyxkypIsZHIsZHosbSxuLMWLLGwscix3LGosXCIpfSxcbiAgICB7IG5hbWU6XCJ6eXpmXCIsIHRpdGxlOlwi5YW25a6DXCIsIGNoYXJzOnRvQXJyYXkoXCLjhIUs44SGLOOEhyzjhIgs44SJLOOEiizjhIss44SMLOOEjSzjhI4s44SPLOOEkCzjhJEs44SSLOOEkyzjhJQs44SVLOOElizjhJcs44SYLOOEmSzjhJos44SbLOOEnCzjhJ0s44SeLOOEnyzjhKAs44ShLOOEoizjhKMs44SkLOOEpSzjhKYs44SnLOOEqFwiKX1cbl07XG5cbnZhciBFbW90aW9uSW1hZ2VzID0ge1xuXHREZW1vVXJsOlwiaHR0cDovL2ltZy5iYWlkdS5jb20vaGkvdHNqL3RfMDAwMS5naWZcIixcblx0QmFzZVVybDpcImh0dHA6Ly9pbWcuYmFpZHUuY29tL2hpL1wiLFxuXHRTbWlsZXlJbmZvcjp7XG5cdFx0dGFiMDpbJ0tpc3MnLCAnTG92ZScsICdZZWFoJywgJ+WViu+8gScsICfog4zmia0nLCAn6aG2JywgJ+aKluiDuCcsICc4OCcsICfmsZcnLCAn556M552hJywgJ+mygeaLiScsICfmi43noJYnLCAn5o+J6IS4JywgJ+eUn+aXpeW/q+S5kCcsICflpKfnrJEnLCAn54CR5biD5rGXficsICfmg4rorrYnLCAn6Iet576OJywgJ+WCu+eskScsICfmipvlqprnnLwnLCAn5Y+R5oCSJywgJ+aJk+mFseayuScsICfkv6/ljafmkpEnLCAn5rCU5oSkJywgJz8nLCAn5ZC7JywgJ+aAkicsICfog5zliKknLCAnSEknLCAnS0lTUycsICfkuI3or7QnLCAn5LiN6KaBJywgJ+aJr+iKsScsICflpKflv4MnLCAn6aG2JywgJ+Wkp+aDiicsICfpo57lkLsnLCAn6ay86IS4JywgJ+Wus+e+nicsICflj6PmsLQnLCAn54uC5ZOtJywgJ+adpScsICflj5HotKLkuoYnLCAn5ZCD6KW/55OcJywgJ+Wll+eJoicsICflrrPnvp4nLCAn5bqG56WdJywgJ+aIkeadpeS6hicsICfmlbLmiZMnLCAn5pmV5LqGJywgJ+iDnOWIqScsICfoh63nvo4nLCAn6KKr5omT5LqGJywgJ+i0quWQgycsICfov47mjqUnLCAn6YW3JywgJ+W+rueskScsICfkurLlkLsnLCAn6LCD55quJywgJ+aDiuaBkCcsICfogI3phbcnLCAn5Y+R54GrJywgJ+Wus+e+nicsICfmsZfmsLQnLCAn5aSn5ZOtJywgJycsICfliqDmsrknLCAn5ZuwJywgJ+S9oE5CJywgJ+aZleWAkicsICflvIDlv4MnLCAn5YG356yRJywgJ+Wkp+WTrScsICfmu7TmsZcnLCAn5Y+55rCUJywgJ+i2hei1nicsICc/PycsICfpo57lkLsnLCAn5aSp5L2/JywgJ+aSkuiKsScsICfnlJ/msJQnLCAn6KKr56C4JywgJ+WQk+WCuycsICfpmo/mhI/lkJAnXSxcblx0XHR0YWIxOlsnS2lzcycsICdMb3ZlJywgJ1llYWgnLCAn5ZWK77yBJywgJ+iDjOaJrScsICfpobYnLCAn5oqW6IO4JywgJzg4JywgJ+axlycsICfnnoznnaEnLCAn6bKB5ouJJywgJ+aLjeeglicsICfmj4nohLgnLCAn55Sf5pel5b+r5LmQJywgJ+aRiuaJiycsICfnnaHop4knLCAn55ir5Z2QJywgJ+aXoOiBiicsICfmmJ/mmJ/pl6onLCAn5peL6L2sJywgJ+S5n+S4jeihjCcsICfpg4Hpl7cnLCAn5q2jTXVzaWMnLCAn5oqT5aKZJywgJ+aSnuWimeiHs+atuycsICfmrarlpLQnLCAn5oiz55y8JywgJ+mjmOi/hycsICfkupLnm7jmi43noJYnLCAn56CN5q275L2gJywgJ+aJlOahjOWtkCcsICflsJHmnpflr7onLCAn5LuA5LmI77yfJywgJ+i9rOWktCcsICfmiJHniLHniZvlpbYnLCAn5oiR6LiiJywgJ+aRh+aZgycsICfmmZXljqUnLCAn5Zyo56y85a2Q6YeMJywgJ+mch+iNoSddLFxuXHRcdHRhYjI6WyflpKfnrJEnLCAn54CR5biD5rGXficsICfmg4rorrYnLCAn6Iet576OJywgJ+WCu+eskScsICfmipvlqprnnLwnLCAn5Y+R5oCSJywgJ+aIkemUmeS6hicsICdtb25leScsICfmsJTmhKQnLCAn5oyR6YCXJywgJ+WQuycsICfmgJInLCAn6IOc5YipJywgJ+WnlOWxiCcsICflj5fkvKQnLCAn6K+05ZWl5ZGi77yfJywgJ+mXreWYtCcsICfkuI0nLCAn6YCX5L2g546p5YS/JywgJ+mjnuWQuycsICfnnKnmmZUnLCAn6a2U5rOVJywgJ+aIkeadpeS6hicsICfnnaHkuoYnLCAn5oiR5omTJywgJ+mXreWYtCcsICfmiZMnLCAn5omT5pmV5LqGJywgJ+WIt+eJmScsICfniIbmj40nLCAn54K45by5JywgJ+WAkueriycsICfliK7og6HlrZAnLCAn6YKq5oG255qE56yRJywgJ+S4jeimgeS4jeimgScsICfniLHmgYvkuK0nLCAn5pS+5aSn5LuU57uG55yLJywgJ+WBt+eqpScsICfotoXpq5jlhbQnLCAn5pmVJywgJ+advuWPo+awlCcsICfmiJHot5EnLCAn5Lqr5Y+XJywgJ+S/ruWFuycsICflk60nLCAn5rGXJywgJ+WVin4nLCAn54Ot54OI5qyi6L+OJywgJ+aJk+mFseayuScsICfkv6/ljafmkpEnLCAnPyddLFxuXHRcdHRhYjM6WydISScsICdLSVNTJywgJ+S4jeivtCcsICfkuI3opoEnLCAn5omv6IqxJywgJ+Wkp+W/gycsICfpobYnLCAn5aSn5oOKJywgJ+mjnuWQuycsICfprLzohLgnLCAn5a6z576eJywgJ+WPo+awtCcsICfni4Llk60nLCAn5p2lJywgJ+azquecvCcsICfmtYHms6onLCAn55Sf5rCUJywgJ+WQkOiIjCcsICfllpzmrKInLCAn5peL6L2sJywgJ+WGjeingScsICfmipPni4InLCAn5rGXJywgJ+mEmeinhicsICfmi5wnLCAn5ZCQ6KGAJywgJ+WYmCcsICfmiZPkuronLCAn6Lmm6LezJywgJ+WPmOiEuCcsICfmia/ogoknLCAn5ZCDVG8nLCAn5ZCD6IqxJywgJ+WQueazoeazoeezlicsICflpKflj5jouqsnLCAn6aOe5aSp6IieJywgJ+WbnuecuCcsICflj6/mgJwnLCAn54yb5oq9JywgJ+azoeazoScsICfoi7nmnpwnLCAn5LqyJywgJycsICfpqproiJ4nLCAn54On6aaZJywgJ+edoScsICflpZflqIPlqIMnLCAn5o2F5o2FJywgJ+iInuWAkicsICfopb/nuqLmn78nLCAn54ix5oWVJywgJ+aRhycsICfmkYfmkYYnLCAn5p2C6ICNJywgJ+aLm+i0oicsICfooqvmrrQnLCAn6KKr55CD6Ze3JywgJ+Wkp+aDiicsICfnkIbmg7MnLCAn5qyn5omTJywgJ+WRleWQkCcsICfnoo4nLCAn5ZCQ55ewJ10sXG5cdFx0dGFiNDpbJ+WPkei0ouS6hicsICflkIPopb/nk5wnLCAn5aWX54miJywgJ+Wus+e+nicsICfluobnpZ0nLCAn5oiR5p2l5LqGJywgJ+aVsuaJkycsICfmmZXkuoYnLCAn6IOc5YipJywgJ+iHree+jicsICfooqvmiZPkuoYnLCAn6LSq5ZCDJywgJ+i/juaOpScsICfphbcnLCAn6aG2JywgJ+W5uOi/kCcsICfniLHlv4MnLCAn6LqyJywgJ+mAgeiKsScsICfpgInmi6knXSxcblx0XHR0YWI1Olsn5b6u56yRJywgJ+S6suWQuycsICfosIPnmq4nLCAn5oOK6K62JywgJ+iAjemFtycsICflj5HngasnLCAn5a6z576eJywgJ+axl+awtCcsICflpKflk60nLCAn5b6X5oSPJywgJ+mEmeinhicsICflm7AnLCAn5aS45aWWJywgJ+aZleWAkicsICfnlpHpl64nLCAn5aqS5amGJywgJ+eLguWQkCcsICfpnZLom5knLCAn5Y+R5oSBJywgJ+S6suWQuycsICcnLCAn54ix5b+DJywgJ+W/g+eijicsICfnjqvnkbAnLCAn56S854mpJywgJ+WTrScsICflpbjnrJEnLCAn5Y+v54ixJywgJ+W+l+aEjycsICflkbLniZknLCAn5pq05rGXJywgJ+almualmuWPr+aAnCcsICflm7AnLCAn5ZOtJywgJ+eUn+awlCcsICfmg4rorrYnLCAn5Y+j5rC0JywgJ+W9qeiZuScsICflpJznqbonLCAn5aSq6ZizJywgJ+mSsemSsScsICfnga/ms6EnLCAn5ZKW5ZWhJywgJ+ibi+ezlScsICfpn7PkuZAnLCAn54ixJywgJ+iDnOWIqScsICfotZ4nLCAn6YSZ6KeGJywgJ09LJ10sXG5cdFx0dGFiNjpbJ+eUt+WFnCcsICflpbPlhZwnLCAn5byA5b+DJywgJ+S5luS5licsICflgbfnrJEnLCAn5aSn56yRJywgJ+aKveazoycsICflpKflk60nLCAn5peg5aWIJywgJ+a7tOaxlycsICflj7nmsJQnLCAn54uC5pmVJywgJ+WnlOWxiCcsICfotoXotZ4nLCAnPz8nLCAn55aR6ZeuJywgJ+mjnuWQuycsICflpKnkvb8nLCAn5pKS6IqxJywgJ+eUn+awlCcsICfooqvnoLgnLCAn5Y+j5rC0JywgJ+azquWllCcsICflkJPlgrsnLCAn5ZCQ6IiM5aS0JywgJ+eCueWktCcsICfpmo/mhI/lkJAnLCAn5peL6L2sJywgJ+WbsOWbsCcsICfphJnop4YnLCAn54uC6aG2JywgJ+evrueQgycsICflho3op4EnLCAn5qyi6L+O5YWJ5Li0JywgJ+aBreWWnOWPkei0oicsICfnqI3nrYknLCAn5oiR5Zyo57q/JywgJ+aBleS4jeiuruS7tycsICflupPmiL/mnInotKcnLCAn6LSn5Zyo6Lev5LiKJ11cblx0fSxcblx0RW1vdGlvblRhYnM6e1xuXHRcdHRhYjA6eyBuYW1lOlwi57K+6YCJXCIsIHByZWZpeDpcImpfMDBcIiwgcGF0aDpcImp4Mi9cIn0sXG5cdFx0dGFiMTp7IG5hbWU6XCLlhZTmlq/ln7pcIiwgcHJlZml4OlwidF8wMFwiLCBwYXRoOlwidHNqL1wifSxcblx0XHR0YWIyOnsgbmFtZTpcIue7v+ixhuibmVwiLCBwcmVmaXg6XCJ3XzAwXCIsIHBhdGg6XCJsZHcvXCJ9LFxuXHRcdHRhYjM6eyBuYW1lOlwiQk9CT1wiLCBwcmVmaXg6XCJCXzAwXCIsIHBhdGg6XCJib2JvL1wifSxcblx0XHR0YWI0OnsgbmFtZTpcImJhYnnnjKtcIiwgcHJlZml4OlwiQ18wMFwiLCBwYXRoOlwiYmFieWNhdC9cIn0sXG5cdFx0dGFiNTp7IG5hbWU6XCLms6Hms6FcIiwgcHJlZml4OlwiaV9mXCIsIHBhdGg6XCJmYWNlL1wifSxcblx0XHR0YWI2OnsgbmFtZTpcIuacieWVilwiLCBwcmVmaXg6XCJ5XzAwXCIsIHBhdGg6XCJ5b3VhL1wifSxcblx0fVxufVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdEVkaXRvckljb25UeXBlczpFZGl0b3JJY29uVHlwZXMsXG5cdENvbG9yVHlwZXM6Q29sb3JUeXBlcyxcblx0Rm9ybXVsYVR5cGVzOkZvcm11bGFUeXBlcyxcblx0U3BlY2lhbENoYXJzOlNwZWNpYWxDaGFycyxcblx0RW1vdGlvbkltYWdlczpFbW90aW9uSW1hZ2VzXG59IiwidmFyIEVkaXRvckRPTSA9IHtcblx0c3RvcFByb3BhZ2F0aW9uOmZ1bmN0aW9uKGUpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdGlmKGUuc3RvcFByb3BhZ2F0aW9uKXtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fWVsc2V7XG5cdFx0XHRlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG5cdFx0fVxuXHR9LFxuXHRpc1RleHROb2RlOmZ1bmN0aW9uKG5vZGUpe1xuXHRcdGlmKCFub2RlKSByZXR1cm4gZmFsc2U7XG5cdFx0cmV0dXJuIG5vZGUubm9kZVR5cGU9PTMgfHwgbm9kZS5ub2RlTmFtZT09XCIjdGV4dFwiXG5cdH0sXG5cdGlzU3Bhbk5vZGU6ZnVuY3Rpb24obm9kZSl7XG5cdFx0aWYoIW5vZGUpIHJldHVybiBmYWxzZTtcblx0XHRyZXR1cm4gbm9kZS5ub2RlVHlwZT09MSAmJiBub2RlLm5vZGVOYW1lPT1cIlNQQU5cIlxuXHR9LFxuXHRpc051bGxPZlRleHROb2RlOmZ1bmN0aW9uKG5vZGUpe1xuXHRcdGlmKHRoaXMuaXNUZXh0Tm9kZShub2RlKSl7XG5cdFx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWU9PVwiXCI7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG59XG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvckRPTTtcbiIsInZhciBFZGl0b3JIaXN0b3J5ID0ge1xuXHRjdXJDb21tYW5kOm51bGwsXG5cdGNvbW1hbmRTdGFjazpbXSxcblx0Y29tbWFuZEluZGV4Oi0xLFxuXHRjYW5VbmRvOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuY29tbWFuZFN0YWNrLmxlbmd0aD4wICYmIHRoaXMuY29tbWFuZEluZGV4IT0tMTtcblx0fSxcblx0Y2FuUmVkbzpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmNvbW1hbmRTdGFjay5sZW5ndGg+MCAmJiB0aGlzLmNvbW1hbmRJbmRleCE9KHRoaXMuY29tbWFuZFN0YWNrLmxlbmd0aC0xKTtcblx0fSxcblx0dW5kbzpmdW5jdGlvbigpe1xuXHRcdGlmKHRoaXMuY2FuVW5kbygpKXtcblx0XHRcdHRoaXMuY29tbWFuZEluZGV4ID0gdGhpcy5jb21tYW5kSW5kZXgtMTtcblx0XHRcdHRoaXMuY3VyQ29tbWFuZCA9IHRoaXMuY29tbWFuZFN0YWNrW3RoaXMuY29tbWFuZEluZGV4XTtcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKFwidW5kb1wiKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY2FuVW5kbygpO1xuXHR9LFxuXHRyZWRvOmZ1bmN0aW9uKCl7XG5cdFx0aWYodGhpcy5jYW5SZWRvKCkpe1xuXHRcdFx0dGhpcy5jb21tYW5kSW5kZXggPSB0aGlzLmNvbW1hbmRJbmRleCsxO1xuXHRcdFx0dGhpcy5jdXJDb21tYW5kID0gdGhpcy5jb21tYW5kU3RhY2tbdGhpcy5jb21tYW5kSW5kZXhdO1xuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJyZWRvXCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jYW5SZWRvKCk7XG5cdH0sXG5cdGV4ZWNDb21tYW5kOmZ1bmN0aW9uKGNvbW1hbmQsZmxhZyxhcmdzKXtcblx0XHRkb2N1bWVudC5leGVjQ29tbWFuZChjb21tYW5kLGZsYWcsYXJncyk7XG5cdFx0aWYoY29tbWFuZD09XCJzZWxlY3RhbGxcIikgXG5cdFx0XHRyZXR1cm47XG5cdFx0dGhpcy5jb21tYW5kSW5kZXggPSB0aGlzLmNvbW1hbmRJbmRleCsxO1xuXHRcdHRoaXMuY3VyQ29tbWFuZCA9IHtjb21tYW5kLGZsYWcsYXJnc307XG5cdFx0Ly8g5b+F6ZyA56e76ZmkaW5kZXjlkI7nmoRjb21tYW5kXG5cdFx0dGhpcy5jb21tYW5kU3RhY2suc3BsaWNlKHRoaXMuY29tbWFuZEluZGV4LHRoaXMuY29tbWFuZFN0YWNrLmxlbmd0aC10aGlzLmNvbW1hbmRJbmRleCk7XG5cdFx0dGhpcy5jb21tYW5kU3RhY2tbdGhpcy5jb21tYW5kSW5kZXhdID0ge2NvbW1hbmQsZmxhZyxhcmdzfTtcblx0fSxcblx0Z2V0Q3VyQ29tbWFuZDpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmN1ckNvbW1hbmQ7XG5cdH0sXG5cdGdldENvbW1hbmRTdGFjazpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmNvbW1hbmRTdGFjaztcblx0fSxcblx0Z2V0Q29tbWFuZEluZGV4OmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuY29tbWFuZEluZGV4O1xuXHR9LFxuXHRjbGVhcjpmdW5jdGlvbigpe1xuXHRcdHRoaXMuY3VyQ29tbWFuZCA9IG51bGw7XG5cdFx0dGhpcy5jb21tYW5kU3RhY2sgPSBbXTtcblx0XHR0aGlzLmNvbW1hbmRJbmRleCA9IC0xO1xuXHR9XG59XHRcdFxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JIaXN0b3J5OyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxuLy8gcmVzaXplIGNvbnRleHRcbnZhciBtaW5XaWR0aCA9IDEyO1xudmFyIG1pbkhlaWdodCA9IDEyO1xudmFyIEVkaXRvclJlc2l6ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRhcmdldDpudWxsLFxuXHRcdFx0cG9zaXRpb246e1xuXHRcdFx0XHR4OjAseTowXG5cdFx0XHR9LFxuXHRcdFx0d2lkdGg6MCxcblx0XHRcdGhlaWdodDowLFxuXHRcdFx0c3RhcnRQb3NpdGlvbjp7XG5cdFx0XHRcdHg6MCx5OjBcblx0XHRcdH0sXG5cdFx0XHRjdXJQb3NpdGlvbjp7XG5cdFx0XHRcdHg6MCx5OjBcblx0XHRcdH1cblx0XHR9XHRcblx0fSxcblx0c2V0VGFyZ2V0OmZ1bmN0aW9uKHRhcmdldCl7XG5cdFx0dmFyIHdpZHRoID1wYXJzZUZsb2F0KHRhcmdldC53aWR0aCB8fCB0YXJnZXQuc3R5bGUud2lkdGgpO1xuXHRcdHZhciBoZWlnaHQgPSBwYXJzZUZsb2F0KHRhcmdldC5oZWlnaHQgfHwgdGFyZ2V0LnN0eWxlLmhlaWdodCk7XG5cdFx0dmFyIG9mZnNldExlZnQgPSB0YXJnZXQub2Zmc2V0TGVmdCt0YXJnZXQub2Zmc2V0UGFyZW50Lm9mZnNldExlZnQ7XG5cdFx0dmFyIG9mZnNldFRvcCA9IHRhcmdldC5vZmZzZXRUb3ArdGFyZ2V0Lm9mZnNldFBhcmVudC5vZmZzZXRUb3A7O1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0dGFyZ2V0OnRhcmdldCxcblx0XHRcdHdpZHRoOndpZHRoLFxuXHRcdFx0aGVpZ2h0OmhlaWdodCxcblx0XHRcdHNob3c6dHJ1ZSxcblx0XHRcdHBvc2l0aW9uOnt4Om9mZnNldExlZnQseTpvZmZzZXRUb3B9XG5cdFx0fSlcblx0fSxcblx0Z2V0VGFyZ2V0OmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUudGFyZ2V0O1xuXHR9LFxuXHRjbGVhclRhcmdldDpmdW5jdGlvbigpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0dGFyZ2V0Om51bGwsXG5cdFx0XHRzaG93OmZhbHNlXG5cdFx0fSlcblx0fSxcblx0c3RvcFByb3BhZ2F0aW9uOmZ1bmN0aW9uKGUpe1xuXHRcdCAgaWYoZS5zdG9wUHJvcGFnYXRpb24pXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0ICBlbHNlXG5cdFx0XHRcdGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcblx0fSxcblx0Y2xlYXJTZWxlY3Q6ZnVuY3Rpb24oZSl7XG5cdFx0aWYod2luZG93LmdldFNlbGVjdGlvbil7XG5cdFx0XHRcdHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcblx0XHR9ZWxzZXtcblx0XHRcdGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSgpO1xuXHRcdH1cblx0fSxcblx0Z2V0TW91c2VQb3NpdGlvbjpmdW5jdGlvbihlKXtcblx0XHRlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG5cdFx0dmFyIHNjcm9sbFggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG5cdFx0dmFyIHNjcm9sbFkgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuXG5cdFx0dmFyIHggPSBwYXJzZUZsb2F0KGUucGFnZVggfHwgZS5jbGllbnRYICtzY3JvbGxYKTtcblx0XHR2YXIgeSA9IHBhcnNlRmxvYXQoZS5wYWdlWSB8fCBlLmNsaWVudFkgK3Njcm9sbFkpO1xuXG5cdFx0cmV0dXJuIHt4OngseTp5fTtcblx0fSxcblx0aGFuZGxlTW91c2VEb3duOmZ1bmN0aW9uKGUpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cdFx0dmFyIGNsYXNzTmFtZSA9IHRhcmdldC5jbGFzc05hbWU7XG5cdFx0dmFyIHN0YXJ0UG9zaXRpb24gPSB0aGlzLmdldE1vdXNlUG9zaXRpb24oZSk7XG5cdFx0dGhpcy5jbGVhclNlbGVjdCgpO1xuXHRcdGlmKGNsYXNzTmFtZS5pbmRleE9mKFwibnctcmVzaXplXCIpIT0tMSl7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0ZGlyZWN0aW9uOlwibnctcmVzaXplXCIsXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb246c3RhcnRQb3NpdGlvblxuXHRcdFx0fSlcblx0XHR9XG5cdFx0aWYoY2xhc3NOYW1lLmluZGV4T2YoXCJuZS1yZXNpemVcIikhPS0xKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRkaXJlY3Rpb246XCJuZS1yZXNpemVcIixcblx0XHRcdFx0c3RhcnRQb3NpdGlvbjpzdGFydFBvc2l0aW9uXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRpZihjbGFzc05hbWUuaW5kZXhPZihcInN3LXJlc2l6ZVwiKSE9LTEpe1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGRpcmVjdGlvbjpcInN3LXJlc2l6ZVwiLFxuXHRcdFx0XHRzdGFydFBvc2l0aW9uOnN0YXJ0UG9zaXRpb25cblx0XHRcdH0pXG5cdFx0fVxuXHRcdGlmKGNsYXNzTmFtZS5pbmRleE9mKFwic2UtcmVzaXplXCIpIT0tMSl7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0ZGlyZWN0aW9uOlwic2UtcmVzaXplXCIsXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb246c3RhcnRQb3NpdGlvblxuXHRcdFx0fSlcblx0XHR9XG5cdFx0XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsdGhpcy5oYW5kbGVNb3VzZVVwKTtcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLmhhbmRsZU1vdXNlVXApO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuXG5cdFx0dGhpcy5zdG9wUHJvcGFnYXRpb24oZSk7XG5cdH0sXG5cdGhhbmRsZU1vdXNlTW92ZTpmdW5jdGlvbihlKXtcblx0XHRpZighdGhpcy5zdGF0ZS5kaXJlY3Rpb24pIHJldHVybjtcblx0XHR0aGlzLmNsZWFyU2VsZWN0KCk7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblx0XHR2YXIgY3VyUG9zaXRpb24gPSB0aGlzLmdldE1vdXNlUG9zaXRpb24oZSk7XG5cdFx0dmFyICBzdGFydFBvc2l0aW9uID0gdGhpcy5zdGF0ZS5zdGFydFBvc2l0aW9uO1xuXHRcdHZhciBkeCA9IGN1clBvc2l0aW9uLngtc3RhcnRQb3NpdGlvbi54O1xuXHRcdHZhciBkeSA9IGN1clBvc2l0aW9uLnktc3RhcnRQb3NpdGlvbi55O1xuXHRcdHZhciB3aWR0aCA9IHRoaXMuc3RhdGUud2lkdGg7XG5cdFx0dmFyIGhlaWdodCA9IHRoaXMuc3RhdGUuaGVpZ2h0O1xuXHRcdFxuXHRcdHN3aXRjaCh0aGlzLnN0YXRlLmRpcmVjdGlvbil7XG5cdFx0XHRjYXNlIFwibnctcmVzaXplXCI6XG5cdFx0XHRcdHdpZHRoIC09IGR4O1xuXHRcdFx0XHRoZWlnaHQgLT0gZHk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIm5lLXJlc2l6ZVwiOlxuXHRcdFx0XHR3aWR0aCArPSBkeDtcblx0XHRcdFx0aGVpZ2h0IC09IGR5O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJzdy1yZXNpemVcIjpcblx0XHRcdFx0d2lkdGggLT0gZHg7XG5cdFx0XHRcdGhlaWdodCArPSBkeTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwic2UtcmVzaXplXCI6XG5cdFx0XHRcdHdpZHRoICs9IGR4O1xuXHRcdFx0XHRoZWlnaHQgKz0gZHk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRzdGFydFBvc2l0aW9uID0gY3VyUG9zaXRpb247XG5cdFx0aWYod2lkdGg8bWluV2lkdGgpIHdpZHRoID0gbWluV2lkdGg7XG5cdFx0aWYoaGVpZ2h0PG1pbkhlaWdodCkgaGVpZ2h0ID0gbWluSGVpZ2h0O1xuXHRcdFxuXHRcdGlmKHRoaXMuc3RhdGUudGFyZ2V0KXtcblx0XHRcdHRoaXMuc3RhdGUudGFyZ2V0LnN0eWxlLndpZHRoID0gd2lkdGgrXCJweFwiO1xuXHRcdFx0dGhpcy5zdGF0ZS50YXJnZXQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0K1wicHhcIjtcblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzdGFydFBvc2l0aW9uOnN0YXJ0UG9zaXRpb24sXG5cdFx0XHR3aWR0aDp3aWR0aCxcblx0XHRcdGhlaWdodDpoZWlnaHRcblx0XHR9KVxuXG5cdFx0dGhpcy5zdG9wUHJvcGFnYXRpb24oZSk7XG5cdH0sXG5cdGhhbmRsZU1vdXNlVXA6ZnVuY3Rpb24oZSl7XG5cdFx0aWYoIXRoaXMuc3RhdGUuZGlyZWN0aW9uKSByZXR1cm47XG5cdFx0dGhpcy5jbGVhclNlbGVjdCgpO1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cdFx0dmFyIGN1clBvc2l0aW9uID0gdGhpcy5nZXRNb3VzZVBvc2l0aW9uKGUpO1xuXHRcdHZhciAgc3RhcnRQb3NpdGlvbiA9IHRoaXMuc3RhdGUuc3RhcnRQb3NpdGlvbjtcblx0XHR2YXIgZHggPSBjdXJQb3NpdGlvbi54LXN0YXJ0UG9zaXRpb24ueDtcblx0XHR2YXIgZHkgPSBjdXJQb3NpdGlvbi55LXN0YXJ0UG9zaXRpb24ueTtcblx0XHR2YXIgd2lkdGggPSB0aGlzLnN0YXRlLndpZHRoO1xuXHRcdHZhciBoZWlnaHQgPSB0aGlzLnN0YXRlLmhlaWdodDtcblx0XHRcblx0XHRzd2l0Y2godGhpcy5zdGF0ZS5kaXJlY3Rpb24pe1xuXHRcdFx0Y2FzZSBcIm53LXJlc2l6ZVwiOlxuXHRcdFx0XHR3aWR0aCAtPSBkeDtcblx0XHRcdFx0aGVpZ2h0IC09IGR5O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJuZS1yZXNpemVcIjpcblx0XHRcdFx0d2lkdGggKz0gZHg7XG5cdFx0XHRcdGhlaWdodCAtPSBkeTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwic3ctcmVzaXplXCI6XG5cdFx0XHRcdHdpZHRoIC09IGR4O1xuXHRcdFx0XHRoZWlnaHQgKz0gZHk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInNlLXJlc2l6ZVwiOlxuXHRcdFx0XHR3aWR0aCArPSBkeDtcblx0XHRcdFx0aGVpZ2h0ICs9IGR5O1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdFx0c3RhcnRQb3NpdGlvbiA9IGN1clBvc2l0aW9uO1xuXHRcdFxuXHRcdGlmKHdpZHRoPG1pbldpZHRoKSB3aWR0aCA9IG1pbldpZHRoO1xuXHRcdGlmKGhlaWdodDxtaW5IZWlnaHQpIGhlaWdodCA9IG1pbkhlaWdodDtcblx0XHRcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLmhhbmRsZU1vdXNlVXApO1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuXHRcdGlmKHRoaXMuc3RhdGUudGFyZ2V0KXtcblx0XHRcdHRoaXMuc3RhdGUudGFyZ2V0LnN0eWxlLndpZHRoID0gd2lkdGgrXCJweFwiO1xuXHRcdFx0dGhpcy5zdGF0ZS50YXJnZXQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0K1wicHhcIjtcblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzdGFydFBvc2l0aW9uOnN0YXJ0UG9zaXRpb24sXG5cdFx0XHRoZWlnaHQ6aGVpZ2h0LFxuXHRcdFx0d2lkdGg6d2lkdGgsXG5cdFx0XHRkaXJlY3Rpb246bnVsbCxcblx0XHR9KVxuXHRcdFxuXHRcdHRoaXMuc3RvcFByb3BhZ2F0aW9uKGUpO1xuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHR2YXIgc3R5bGUgPSB7XG5cdFx0XHR3aWR0aDp0aGlzLnN0YXRlLndpZHRoLFxuXHRcdFx0aGVpZ2h0OnRoaXMuc3RhdGUuaGVpZ2h0LFxuXHRcdFx0bGVmdDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXG5cdFx0XHR0b3A6dGhpcy5zdGF0ZS5wb3NpdGlvbi55LFxuXHRcdFx0ZGlzcGxheTp0aGlzLnN0YXRlLnNob3c/XCJibG9ja1wiOlwibm9uZVwiLFxuXHRcdFx0cG9zaXRvaW46XCJhYnNvbHV0ZVwiXG5cdFx0fTtcdFx0XG5cdFx0cmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cImVkaXRvci1yZXNpemVcIiBzdHlsZT17c3R5bGV9PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLXJlc2l6ZSBudy1yZXNpemVcIiBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259IG9uTW91c2VNb3ZlPXt0aGlzLmhhbmRsZU1vdXNlTW92ZX0gb25Nb3VzZVVwPXt0aGlzLmhhbmRsZU1vdXNlVXB9PjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLXJlc2l6ZSBuZS1yZXNpemVcIiBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259IG9uTW91c2VNb3ZlPXt0aGlzLmhhbmRsZU1vdXNlTW92ZX0gb25Nb3VzZVVwPXt0aGlzLmhhbmRsZU1vdXNlVXB9PjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLXJlc2l6ZSBzdy1yZXNpemVcIiBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259IG9uTW91c2VNb3ZlPXt0aGlzLmhhbmRsZU1vdXNlTW92ZX0gb25Nb3VzZVVwPXt0aGlzLmhhbmRsZU1vdXNlVXB9PjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLXJlc2l6ZSBzZS1yZXNpemVcIiBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259IG9uTW91c2VNb3ZlPXt0aGlzLmhhbmRsZU1vdXNlTW92ZX0gb25Nb3VzZVVwPXt0aGlzLmhhbmRsZU1vdXNlVXB9PjwvZGl2PlxuXHRcdDwvZGl2Pilcblx0fVxufSlcdFx0XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yUmVzaXplOyIsInZhciBFZGl0b3JET00gPSByZXF1aXJlKCcuL0VkaXRvckRPTScpO1xuXG5Ob2RlTGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciBub2RlcyA9IFtdO1xuXHRmb3IodmFyIGk9MDtpPHRoaXMubGVuZ3RoO2krKyl7XG5cdFx0bm9kZXMucHVzaCh0aGlzW2ldKTtcblx0fVxuXHRyZXR1cm4gbm9kZXM7XG59XG5cbnZhciBFZGl0b3JTZWxlY3Rpb24gPSB7XG5cdHJhbmdlOm51bGwsXG5cdHNlbGVjdGlvbjpudWxsLFxuXHRzdG9yZWRSYW5nZTpmYWxzZSxcblx0Z2V0U2VsZWN0aW9uOmZ1bmN0aW9uKCl7XG5cdFx0aWYod2luZG93LmdldFNlbGVjdGlvbikgcmV0dXJuIHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0XHRlbHNlIGlmKGRvY3VtZW50LmdldFNlbGVjdGlvbikgcmV0dXJuIGRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xuXHRcdGVsc2UgaWYoZG9jdW1lbnQuc2VsZWN0aW9uKSByZXR1cm4gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG5cdFx0ZWxzZSByZXR1cm4gbnVsbDtcblx0fSxcblx0Y2xvbmVSYW5nZTpmdW5jdGlvbigpeyAvLyBjbG9uZVJhbmdlXG5cdFx0aWYodGhpcy5zdG9yZWRSYW5nZSkgcmV0dXJuO1xuXHRcdHRoaXMuc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcblx0XHR0aGlzLnNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcblx0XHRpZih0aGlzLnNlbGVjdGlvbiAmJiB0aGlzLnJhbmdlKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGlvbi5hZGRSYW5nZSh0aGlzLnJhbmdlLmNsb25lUmFuZ2UoKSk7XG5cdFx0XHR0aGlzLnJhbmdlID0gdGhpcy5yYW5nZS5jbG9uZVJhbmdlKCk7XG5cdFx0fVxuXHR9LFxuXHRnZXRUZXh0Tm9kZXM6ZnVuY3Rpb24oKXtcblx0XHRpZih0aGlzLnJhbmdlLmNvbGxhcHNlZCkgcmV0dXJuIFtdO1xuXHRcdHZhciBwYXJlbnQgPSB0aGlzLnJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuXHRcdHZhciBzdGFydE5vZGUgPSB0aGlzLnJhbmdlLnN0YXJ0Q29udGFpbmVyO1xuXHRcdHZhciBzdGFydE9mZnNldCA9IHRoaXMucmFuZ2Uuc3RhcnRPZmZzZXQ7XG5cdFx0dmFyIGVuZE5vZGUgPSB0aGlzLnJhbmdlLmVuZENvbnRhaW5lcjtcblx0XHR2YXIgZW5kT2Zmc2V0ID0gdGhpcy5yYW5nZS5lbmRPZmZzZXQ7XG5cdFx0dmFyIHRleHROb2RlcyA9IFtdO1xuXG5cdFx0aWYoc3RhcnROb2RlPT09ZW5kTm9kZSAmJiBFZGl0b3JET00uaXNUZXh0Tm9kZShzdGFydE5vZGUpKXtcblx0XHRcdHRleHROb2Rlcy5wdXNoKHtcblx0XHRcdFx0Y2hpbGROb2RlOnN0YXJ0Tm9kZSxcblx0XHRcdFx0c3RhcnRPZmZzZXQ6c3RhcnRPZmZzZXQsXG5cdFx0XHRcdGVuZE9mZnNldDplbmRPZmZzZXRcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR2YXIgY2hpbGROb2RlcyA9IHBhcmVudC5jaGlsZE5vZGVzLnRvQXJyYXkoKSxzdGFydEZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBjaGlsZE5vZGUgPSBjaGlsZE5vZGVzLnNoaWZ0KCk7XG5cdFx0XHR3aGlsZShjaGlsZE5vZGUpe1xuXHRcdFx0XHRpZihFZGl0b3JET00uaXNUZXh0Tm9kZShjaGlsZE5vZGUpKXtcblx0XHRcdFx0XHRpZihjaGlsZE5vZGU9PT1zdGFydE5vZGUpe1xuXHRcdFx0XHRcdFx0dGV4dE5vZGVzLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRjaGlsZE5vZGU6Y2hpbGROb2RlLFxuXHRcdFx0XHRcdFx0XHRzdGFydE9mZnNldDpzdGFydE9mZnNldCxcblx0XHRcdFx0XHRcdFx0ZW5kT2Zmc2V0OmNoaWxkTm9kZS5sZW5ndGhcblx0XHRcdFx0XHRcdH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydEZsYWcgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKGNoaWxkTm9kZT09PWVuZE5vZGUpe1xuXHRcdFx0XHRcdFx0dGV4dE5vZGVzLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRjaGlsZE5vZGU6Y2hpbGROb2RlLFxuXHRcdFx0XHRcdFx0XHRzdGFydE9mZnNldDowLFxuXHRcdFx0XHRcdFx0XHRlbmRPZmZzZXQ6ZW5kT2Zmc2V0XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH1lbHNlIGlmKHRleHROb2Rlcy5sZW5ndGg+MCl7XG5cdFx0XHRcdFx0XHR0ZXh0Tm9kZXMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdGNoaWxkTm9kZTpjaGlsZE5vZGUsXG5cdFx0XHRcdFx0XHRcdHN0YXJ0T2Zmc2V0OjAsXG5cdFx0XHRcdFx0XHRcdGVuZE9mZnNldDpjaGlsZE5vZGUubGVuZ3RoXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZihjaGlsZE5vZGU9PWVuZE5vZGUpe1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgdmFyIG5ld0NoaWxkTm9kZXMgPSBjaGlsZE5vZGUuY2hpbGROb2Rlcy50b0FycmF5KClcbiAgICAgICAgICAgICAgICBcblx0XHRcdFx0Y2hpbGROb2RlcyA9IG5ld0NoaWxkTm9kZXMuY29uY2F0KGNoaWxkTm9kZXMpO1xuXHRcdFx0XHRjaGlsZE5vZGUgPSBjaGlsZE5vZGVzLnNoaWZ0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0ZXh0Tm9kZXM7XG5cdH0sXG5cdGdldFNwYW5Ob2RlczpmdW5jdGlvbigpe1xuXHRcdGlmKHRoaXMucmFuZ2UuY29sbGFwc2VkKSByZXR1cm4gW107XG5cdFx0dmFyIHBhcmVudCA9IHRoaXMucmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XG5cdFx0dmFyIHN0YXJ0Tm9kZSA9IHRoaXMucmFuZ2Uuc3RhcnRDb250YWluZXI7XG5cdFx0dmFyIGVuZE5vZGUgPSB0aGlzLnJhbmdlLmVuZENvbnRhaW5lcjtcblx0XHR2YXIgc3Bhbk5vZGVzID0gW107XG5cblx0XHRpZihzdGFydE5vZGU9PT1lbmROb2RlICYmIEVkaXRvckRPTS5pc1NwYW5Ob2RlKHN0YXJ0Tm9kZSkpe1xuXHRcdFx0c3Bhbk5vZGVzLnB1c2goc3RhcnROb2RlKVxuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0dmFyIGNoaWxkTm9kZXMgPSBwYXJlbnQuY2hpbGROb2Rlcy50b0FycmF5KCksaT0wLHN0YXJ0RmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGNoaWxkTm9kZSA9IGNoaWxkTm9kZXMuc2hpZnQoKTtcblx0XHRcdHdoaWxlKGNoaWxkTm9kZSl7XG5cdFx0XHRcdGlmKGNoaWxkTm9kZT09PXN0YXJ0Tm9kZSl7XG5cdFx0XHRcdFx0c3RhcnRGbGFnID0gdHJ1ZTtcblx0XHRcdFx0XHRpZihFZGl0b3JET00uaXNTcGFuTm9kZShjaGlsZE5vZGUucGFyZW50Tm9kZSkpe1xuXHRcdFx0XHRcdFx0c3Bhbk5vZGVzLnB1c2goY2hpbGROb2RlLnBhcmVudE5vZGUpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKEVkaXRvckRPTS5pc1NwYW5Ob2RlKGNoaWxkTm9kZSkgJiYgc3RhcnRGbGFnKXtcblx0XHRcdFx0XHRzcGFuTm9kZXMucHVzaChjaGlsZE5vZGUpXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoY2hpbGROb2RlPT1lbmROb2RlKXtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuICAgICAgICAgICAgICAgIHZhciBuZXdDaGlsZE5vZGVzID0gY2hpbGROb2RlLmNoaWxkTm9kZXMudG9BcnJheSgpXG4gICAgICAgICAgICAgICAgXG5cdFx0XHRcdGNoaWxkTm9kZXMgPSBuZXdDaGlsZE5vZGVzLmNvbmNhdChjaGlsZE5vZGVzKTtcblx0XHRcdFx0Y2hpbGROb2RlID0gY2hpbGROb2Rlcy5zaGlmdCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3Bhbk5vZGVzO1xuXHR9LFxuXHRnZXRQYXJhZ3JhcGhzOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHRleHROb2RlcyA9IHRoaXMuZ2V0VGV4dE5vZGVzKCk7XG5cdFx0dmFyIHBhcmVudHMgPSBbXTtcblx0XHRmb3IodmFyIGk9MDtpPHRleHROb2Rlcy5sZW5ndGg7aSsrKXtcblx0XHRcdGlmKHBhcmVudHMuaW5kZXhPZih0ZXh0Tm9kZXNbaV0uY2hpbGROb2RlLnBhcmVudEVsZW1lbnQpPT0tMSlcblx0XHRcdFx0cGFyZW50cy5wdXNoKHRleHROb2Rlc1tpXS5jaGlsZE5vZGUucGFyZW50RWxlbWVudCk7XG5cdFx0fVxuXHRcdHJldHVybiBwYXJlbnRzO1xuXHR9LFxuXHRnZXRDb21tb25BbmNlc3RvcjpmdW5jdGlvbigpe1xuXHRcdGlmKHRoaXMucmFuZ2UuY29sbGFwc2VkKSByZXR1cm4gbnVsbDtcblx0XHR2YXIgcGFyZW50ID0gdGhpcy5yYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcblx0XHRyZXR1cm4gcGFyZW50O1xuXHR9LFxuXHRhZGRSYW5nZTpmdW5jdGlvbihzdGFydENvbnRhaW5lcixzdGFydE9mZnNldCxlbmRDb250YWluZXIsZW5kT2Zmc2V0KXsgIC8vIGFkZFJhbmdlXG5cdFx0dGhpcy5zZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xuXHRcdHRoaXMuc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuXHRcdGlmKHRoaXMuc2VsZWN0aW9uICYmIHRoaXMucmFuZ2Upe1xuXHRcdFx0dGhpcy5yYW5nZS5zZXRTdGFydChzdGFydENvbnRhaW5lcixzdGFydE9mZnNldCk7XG5cdFx0XHR0aGlzLnJhbmdlLnNldEVuZChlbmRDb250YWluZXIsZW5kT2Zmc2V0KTtcblx0XHRcdHRoaXMuc2VsZWN0aW9uLmFkZFJhbmdlKHRoaXMucmFuZ2UuY2xvbmVSYW5nZSgpKTtcblx0XHRcdHRoaXMucmFuZ2UgPSB0aGlzLnJhbmdlLmNsb25lUmFuZ2UoKTtcblx0XHR9XG5cdH0sXG5cdGNyZWF0ZVJhbmdlOmZ1bmN0aW9uKCl7XG5cdFx0aWYodGhpcy5zdG9yZWRSYW5nZSkgcmV0dXJuO1xuXHRcdHRoaXMuc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKVxuXHRcdGlmKHRoaXMuc2VsZWN0aW9uICYmIHRoaXMuc2VsZWN0aW9uLnJhbmdlQ291bnQ+MCkge1xuXHRcdFx0dGhpcy5yYW5nZSA9IHRoaXMuc2VsZWN0aW9uLmdldFJhbmdlQXQoMCkuY2xvbmVSYW5nZSgpO1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5yYW5nZSA9IG51bGw7XG5cdFx0fVxuXHR9LFxuXHRjbGVhclJhbmdlOmZ1bmN0aW9uKCl7XG5cdFx0aWYodGhpcy5zdG9yZWRSYW5nZSkgcmV0dXJuO1xuXHRcdHRoaXMuc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcblx0XHR0aGlzLnNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcblx0fSxcblx0Z2V0UmFuZ2VTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHZhciByYW5nZVN0YXRlID0ge307IFxuXHRcdC8vIGluaXQgaWNvbnMgc3RhdGVcblx0XHR2YXIgY2FuQWN0aXZlSWNvbnMgPSBcImJvbGQgaXRhbGljIHVuZGVybGluZSBzdHJpa2V0aHJvdWdoIHN1cGVyc2NyaXB0IHN1YnNjcmlwdCBqdXN0aWZ5Y2VudGVyIGp1c3RpZnlsZWZ0IGp1c3RpZnlyaWdodFwiO1xuXHRcdHZhciBpY29ucyA9IGNhbkFjdGl2ZUljb25zLnNwbGl0KFwiIFwiKTtcblx0XHRmb3IodmFyIGk9MDtpPGljb25zLmxlbmd0aDtpKyspe1xuXHRcdFx0cmFuZ2VTdGF0ZVtpY29uc1tpXV0gPSB7aWNvbjppY29uc1tpXSxhY3RpdmU6ZmFsc2V9XG5cdFx0fVxuXHRcdC8vIGNoYW5nZSAgaWNvbnMgc3RhdGVcblx0XHRpZih0aGlzLnJhbmdlKXtcblx0XHRcdHZhciBwYXJlbnRFbGVtZW50ID0gdGhpcy5yYW5nZS5zdGFydENvbnRhaW5lci5wYXJlbnRFbGVtZW50O1xuXHRcdFx0d2hpbGUocGFyZW50RWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCkhPVwiRElWXCIpe1xuXHRcdFx0XHRzd2l0Y2gocGFyZW50RWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCkpe1xuXHRcdFx0XHRcdGNhc2UgXCJJXCI6XG5cdFx0XHRcdFx0XHRyYW5nZVN0YXRlW1wiaXRhbGljXCJdID0geyBhY3RpdmU6dHJ1ZSxpY29uOlwiaXRhbGljXCJ9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiQlwiOlxuXHRcdFx0XHRcdFx0cmFuZ2VTdGF0ZVtcImJvbGRcIl0gPSB7IGFjdGl2ZTp0cnVlLGljb246XCJib2xkXCJ9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiVVwiOlxuXHRcdFx0XHRcdFx0cmFuZ2VTdGF0ZVtcInVuZGVybGluZVwiXSA9IHsgYWN0aXZlOnRydWUsaWNvbjpcInVuZGVybGluZVwifVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIlNUUklLRVwiOlxuXHRcdFx0XHRcdFx0cmFuZ2VTdGF0ZVtcInN0cmlrZXRocm91Z2hcIl0gPSB7IGFjdGl2ZTp0cnVlLGljb246XCJzdHJpa2V0aHJvdWdoXCJ9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiU1VQXCI6XG5cdFx0XHRcdFx0XHRyYW5nZVN0YXRlW1wic3VwZXJzY3JpcHRcIl0gPSB7IGFjdGl2ZTp0cnVlLGljb246XCJzdXBlcnNjcmlwdFwifVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIlNVQlwiOlxuXHRcdFx0XHRcdFx0cmFuZ2VTdGF0ZVtcInN1YnNjcmlwdFwiXSA9IHsgYWN0aXZlOnRydWUsaWNvbjpcInN1YnNjcmlwdFwifVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIkZPTlRcIjpcblx0XHRcdFx0XHRcdHJhbmdlU3RhdGVbXCJmb3JlY29sb3JcIl0gPSB7Y29sb3I6IHBhcmVudEVsZW1lbnQuY29sb3IsIGljb246XCJmb3JlY29sb3JcIn1cblx0XHRcdFx0XHRcdHJhbmdlU3RhdGVbXCJiYWNrY29sb3JcIl0gPSB7Y29sb3I6IHBhcmVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yLCBpY29uOlwiYmFja2NvbG9yXCJ9XG5cdFx0XHRcdFx0XHRyYW5nZVN0YXRlW1wiZm9udHNpemVcIl0gPSB7dmFsdWU6IHBhcmVudEVsZW1lbnQuc2l6ZSwgaWNvbjpcImZvbnRzaXplXCJ9XG5cdFx0XHRcdFx0XHRyYW5nZVN0YXRlW1wiZm9udGZhbWlseVwiXSA9IHt2YWx1ZTogcGFyZW50RWxlbWVudC5mYWNlLCBpY29uOlwiZm9udGZhbWlseVwifVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIlBcIjpcblx0XHRcdFx0XHRjYXNlIFwiSDFcIjpcblx0XHRcdFx0XHRjYXNlIFwiSDJcIjpcblx0XHRcdFx0XHRjYXNlIFwiSDNcIjpcblx0XHRcdFx0XHRjYXNlIFwiSDVcIjpcblx0XHRcdFx0XHRjYXNlIFwiSDZcIjpcblx0XHRcdFx0XHRcdHZhciB0ZXh0QWxpZ24gPSBwYXJlbnRFbGVtZW50LnN0eWxlLnRleHRBbGlnbj9wYXJlbnRFbGVtZW50LnN0eWxlLnRleHRBbGlnbjpcImxlZnRcIjtcblx0XHRcdFx0XHRcdHZhciBmb250RmFtaWx5ID0gcGFyZW50RWxlbWVudC5zdHlsZS5mb250RmFtaWx5P3BhcmVudEVsZW1lbnQuc3R5bGUuZm9udEZhbWlseTpcIuWui+S9kyxTaW1TdW5cIjtcblx0XHRcdFx0XHRcdHZhciBmb250U2l6ZSA9IHBhcmVudEVsZW1lbnQuc3R5bGUuZm9udFNpemU/cGFyZW50RWxlbWVudC5zdHlsZS5mb250U2l6ZTpcIjEycHhcIjtcblx0XHRcdFx0XHRcdHJhbmdlU3RhdGVbXCJqdXN0aWZ5Y2VudGVyXCJdID0geyBhY3RpdmU6dGV4dEFsaWduPT1cImNlbnRlclwiLGljb246XCJzdWJzY3JpcHRcIn1cblx0XHRcdFx0XHRcdHJhbmdlU3RhdGVbXCJqdXN0aWZ5bGVmdFwiXSA9IHsgYWN0aXZlOnRleHRBbGlnbj09XCJsZWZ0XCIsaWNvbjpcInN1YnNjcmlwdFwifVxuXHRcdFx0XHRcdFx0cmFuZ2VTdGF0ZVtcImp1c3RpZnlyaWdodFwiXSA9IHsgYWN0aXZlOnRleHRBbGlnbj09XCJyaWdodFwiLGljb246XCJzdWJzY3JpcHRcIn1cblx0XHRcdFx0XHRcdHJhbmdlU3RhdGVbXCJwYXJhZ3JhcGhcIl0gPSB7dmFsdWU6cGFyZW50RWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCksaWNvbjpcInBhcmFncmFwaFwifVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIkJMT0NLUVVPVEVcIjpcblx0XHRcdFx0XHRcdHJhbmdlU3RhdGVbXCJpbmRlbnRcIl0gPSB7IGFjdGl2ZTp0cnVlLGljb246XCJpbmRlbnRcIn1cblx0XHRcdFx0XHRcdHJhbmdlU3RhdGVbXCJvdXRkZW50XCJdID0geyBhY3RpdmU6ZmFsc2UsaWNvbjpcImluZGVudFwifVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0cGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0aWYoIXJhbmdlU3RhdGVbXCJmb3JlY29sb3JcIl0pIHJhbmdlU3RhdGVbXCJmb3JlY29sb3JcIl0gPSB7Y29sb3I6ICd0cmFuc3BhcmVudCcsIGljb246XCJmb3JlY29sb3JcIn1cblx0XHRpZighcmFuZ2VTdGF0ZVtcImJhY2tjb2xvclwiXSkgcmFuZ2VTdGF0ZVtcImJhY2tjb2xvclwiXSA9IHtjb2xvcjogJ3RyYW5zcGFyZW50JywgaWNvbjpcImJhY2tjb2xvclwifVxuXHRcdGlmKCFyYW5nZVN0YXRlW1wiZm9udHNpemVcIl0gfHwgIXJhbmdlU3RhdGVbXCJmb250c2l6ZVwiXS52YWx1ZSkgcmFuZ2VTdGF0ZVtcImZvbnRzaXplXCJdID0ge3ZhbHVlOiBcIjNcIiwgaWNvbjpcImZvbnRzaXplXCJ9XG5cdFx0aWYoIXJhbmdlU3RhdGVbXCJwYXJhZ3JhcGhcIl0gfHwgIXJhbmdlU3RhdGVbXCJwYXJhZ3JhcGhcIl0udmFsdWUpIHJhbmdlU3RhdGVbXCJwYXJhZ3JhcGhcIl0gPSB7dmFsdWU6IFwicFwiLCBpY29uOlwiZm9udHNpemVcIn1cblx0XHRpZighcmFuZ2VTdGF0ZVtcImZvbnRmYW1pbHlcIl0gfHwgIXJhbmdlU3RhdGVbXCJmb250ZmFtaWx5XCJdLnZhbHVlKSByYW5nZVN0YXRlW1wiZm9udGZhbWlseVwiXSA9IHt2YWx1ZTogXCLlrovkvZMsIFNpbVN1blwiLCBpY29uOlwiZm9udGZhbWlseVwifVxuXHRcdGlmKCFyYW5nZVN0YXRlW1wiaW5kZW50XCJdKSB7XG5cdFx0XHRyYW5nZVN0YXRlW1wib3V0ZGVudFwiXSA9IHsgYWN0aXZlOnRydWUsaWNvbjpcImluZGVudFwifVxuXHRcdFx0cmFuZ2VTdGF0ZVtcImluZGVudFwiXSA9IHsgYWN0aXZlOmZhbHNlLGljb246XCJpbmRlbnRcIn1cblx0XHR9XG5cdFx0cmV0dXJuIHJhbmdlU3RhdGU7XG5cdH0sXG5cdHN0b3JlUmFuZ2U6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnN0b3JlZFJhbmdlID0gdGhpcy5yYW5nZT90aGlzLnJhbmdlLmNsb25lUmFuZ2UoKTpudWxsO1xuXHR9LFxuXHRyZXN0b3JlUmFuZ2U6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnJhbmdlID0gdGhpcy5zdG9yZWRSYW5nZT90aGlzLnN0b3JlZFJhbmdlLmNsb25lUmFuZ2UoKTpudWxsO1xuXHRcdHRoaXMuc3RvcmVkUmFuZ2UgPSBudWxsO1xuXHRcdHRoaXMuY2xvbmVSYW5nZSgpO1xuXHR9XG59XG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvclNlbGVjdGlvbjsiLCJ2YXIgSU5URVJWQUxfTVMgPSAxMDAwLzYwO1xuaWYoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpe1xuXHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2spe1xuXHRcdHNldFRpbWVvdXQoY2FsbGJhY2ssSU5URVJWQUxfTVMpO1xuXHR9XG59XG5cbnZhciB0aW1lb3V0cyA9IFtdO1xudmFyIGludGVydmFscyA9IFtdO1xudmFyIGFuaW1pdGVzID0gW107XG52YXIgcnVubmluZyA9IGZhbHNlO1xudmFyIGNvdW50ID0gMDtcblxudmFyIEVkaXRvclRpbWVyID0ge1xuXHRhZGRDb3VudDpmdW5jdGlvbigpe1xuXHRcdGNvdW50ID0gY291bnQgKzE7XG5cdH0sXG5cdHNldFRpbWVvdXQ6ZnVuY3Rpb24oY2FsbGJhY2ssbXMpe1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5tcyA9IG1zP21zOklOVEVSVkFMX01TO1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5rZXkgPSBcInRpbWVvdXRcIituZXcgRGF0ZSgpLnZhbHVlT2YoKStcIi1cIitNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMTAwMCk7XG5cdFx0Y2FsbGJhY2sucHJvdG90eXBlLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5lbmRUaW1lID0gbmV3IERhdGUoKS52YWx1ZU9mKCk7XG5cdFx0dGltZW91dHMucHVzaChjYWxsYmFjayk7XG5cdFx0cmV0dXJuIGNhbGxiYWNrLnByb3RvdHlwZS5rZXk7XG5cdH0sXG5cdGNsZWFyVGltZW91dDpmdW5jdGlvbihrZXkpe1xuXHRcdHZhciBfdGltZW91dHMgPSB0aW1lb3V0cy5maWx0ZXIoZnVuY3Rpb24oZWxlLHBvcyl7XG5cdFx0XHRyZXR1cm4gZWxlLnByb3RvdHlwZS5rZXkgPT0ga2V5O1xuXHRcdH0pXG5cdFx0aWYoX3RpbWVvdXRzLmxlbmd0aD4wKXtcblx0XHRcdHZhciBpbmRleCA9IHRpbWVvdXRzLmluZGV4T2YoX3RpbWVvdXRzWzBdKTtcblx0XHRcdGlmKGluZGV4IT0tMSkgdGltZW91dHMuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIF90aW1lb3V0c1swXTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fSxcblx0c2V0SW50ZXJ2YWw6ZnVuY3Rpb24oY2FsbGJhY2ssbXMpe1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5tcyA9IG1zP21zOklOVEVSVkFMX01TO1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5rZXkgPSBcImludGVydmFsXCIrbmV3IERhdGUoKS52YWx1ZU9mKCkrXCItXCIrTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjEwMDApO1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLnZhbHVlT2YoKTtcblx0XHRjYWxsYmFjay5wcm90b3R5cGUuZW5kVGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5sYXN0VGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xuXHRcdGludGVydmFscy5wdXNoKGNhbGxiYWNrKTtcblx0XHRyZXR1cm4gY2FsbGJhY2sucHJvdG90eXBlLmtleTtcblx0fSxcblx0Y2xlYXJJbnRlcnZhbDpmdW5jdGlvbihrZXkpe1xuXHRcdHZhciBfaW50ZXJ2YWxzID0gaW50ZXJ2YWxzLmZpbHRlcihmdW5jdGlvbihlbGUscG9zKXtcblx0XHRcdHJldHVybiBlbGUucHJvdG90eXBlLmtleSA9PSBrZXk7XG5cdFx0fSlcblx0XHRpZihfaW50ZXJ2YWxzLmxlbmd0aD4wKXtcblx0XHRcdHZhciBpbmRleCA9IGludGVydmFscy5pbmRleE9mKF9pbnRlcnZhbHNbMF0pO1xuXHRcdFx0aWYoaW5kZXghPS0xKSBpbnRlcnZhbHMuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIF9pbnRlcnZhbHNbMF07XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH0sXG5cdGFuaW1hdGU6ZnVuY3Rpb24oY2FsbGJhY2spe1xuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoRWRpdG9yVGltZXIuYW5pbWF0ZSk7XG5cdFx0aWYocnVubmluZyl7XG5cdFx0XHRmb3IodmFyIGk9MDtpPGFuaW1pdGVzLmxlbmd0aDtpKyspe1xuXHRcdFx0XHRhbmltaXRlc1tpXSh7XG5cdFx0XHRcdFx0Y291bnQ6Y291bnRcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHRcdEVkaXRvclRpbWVyLmFkZENvdW50KCk7IC8vIGNvdW50Kytcblx0XHR9XG5cdFx0Zm9yKHZhciBpPTA7aTx0aW1lb3V0cy5sZW5ndGg7aSsrKXtcblx0XHRcdHRpbWVvdXRzW2ldLnByb3RvdHlwZS5lbmRUaW1lID0gbmV3IERhdGUoKS52YWx1ZU9mKCk7XG5cdFx0XHRpZigodGltZW91dHNbaV0ucHJvdG90eXBlLmVuZFRpbWUtdGltZW91dHNbaV0ucHJvdG90eXBlLnN0YXJ0VGltZSk+PXRpbWVvdXRzW2ldLnByb3RvdHlwZS5tcyAmJiAhdGltZW91dHNbaV0ucHJvdG90eXBlLmRpc2FibGVkKXtcblx0XHRcdFx0dGltZW91dHNbaV0uY2FsbCh0aW1lb3V0c1tpXS5wcm90b3R5cGUsdGltZW91dHNbaV0ucHJvdG90eXBlLmVuZFRpbWUpO1xuXHRcdFx0XHR0aW1lb3V0c1tpXS5wcm90b3R5cGUuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IodmFyIGk9MDtpPGludGVydmFscy5sZW5ndGg7aSsrKXtcblx0XHRcdGludGVydmFsc1tpXS5wcm90b3R5cGUuZW5kVGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xuXHRcdFx0aWYoKGludGVydmFsc1tpXS5wcm90b3R5cGUuZW5kVGltZS1pbnRlcnZhbHNbaV0ucHJvdG90eXBlLmxhc3RUaW1lKT49aW50ZXJ2YWxzW2ldLnByb3RvdHlwZS5tcyAmJiAhaW50ZXJ2YWxzW2ldLnByb3RvdHlwZS5kaXNhYmxlZCl7XG5cdFx0XHRcdGludGVydmFsc1tpXS5jYWxsKGludGVydmFsc1tpXS5wcm90b3R5cGUsaW50ZXJ2YWxzW2ldLnByb3RvdHlwZS5lbmRUaW1lKTtcblx0XHRcdFx0aW50ZXJ2YWxzW2ldLnByb3RvdHlwZS5sYXN0VGltZSA9IGludGVydmFsc1tpXS5wcm90b3R5cGUuZW5kVGltZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGltZW91dHMgPSB0aW1lb3V0cy5maWx0ZXIoZnVuY3Rpb24oZWxlLHBvcyl7cmV0dXJuICFlbGUucHJvdG90eXBlLmRpc2FibGVkfSk7XG5cdFx0aW50ZXJ2YWxzID0gaW50ZXJ2YWxzLmZpbHRlcihmdW5jdGlvbihlbGUscG9zKXtyZXR1cm4gIWVsZS5wcm90b3R5cGUuZGlzYWJsZWR9KTtcblx0fSxcblx0c3RhcnRBbmltYXRpb246ZnVuY3Rpb24oKXtcblx0XHRydW5uaW5nID0gdHJ1ZTtcblx0fSxcblx0c3RvcEFuaW1hdGlvbjpmdW5jdGlvbigpe1xuXHRcdHJ1bm5pbmcgPSBmYWxzZTtcblx0fSxcblx0YWRkQW5pbWF0aW9uSGFuZGxlcjpmdW5jdGlvbihoYW5kbGVyKXtcblx0XHR2YXIgX3J1bm5pbmcgPSBydW5uaW5nO1xuXHRcdEVkaXRvclRpbWVyLnN0b3BBbmltYXRpb24oaGFuZGxlcik7XG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe1xuXHRcdFx0YW5pbWl0ZXMucHVzaChoYW5kbGVyKTtcblx0XHRcdGlmKF9ydW5uaW5nKSBFZGl0b3JUaW1lci5zdGFydEFuaW1hdGlvbihoYW5kbGVyKVxuXHRcdH0pXG5cdH0sXG5cdHJlbW92ZUFuaW1hdGlvbkhhbmRsZXI6ZnVuY3Rpb24oaGFuZGxlcil7XG5cdFx0dmFyIF9ydW5uaW5nID0gcnVubmluZztcblx0XHRFZGl0b3JUaW1lci5zdG9wQW5pbWF0aW9uKGhhbmRsZXIpO1xuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpbmRleCA9IGFuaW1pdGVzLmluZGV4T2YoaGFuZGxlcik7XG5cdFx0XHRpZihpbmRleCE9LTEpIGFuaW1pdGVzLnNwbGljZShoYW5kbGVyLGluZGV4KTtcblx0XHRcdGlmKF9ydW5uaW5nKSBFZGl0b3JUaW1lci5zdGFydEFuaW1hdGlvbihoYW5kbGVyKTtcblx0XHR9KVxuXHR9XG59XG5cbkVkaXRvclRpbWVyLmFuaW1hdGUoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JUaW1lcjsiLCJcbnZhciBnZXRFcnJvciA9IGZ1bmN0aW9uKG9wdGlvbnMseGhyKXtcbiAgICB2YXIgIG1zZyA9ICdjYW5ub3QgcG9zdCAnK29wdGlvbnMudXJsK1wiOlwiK3hoci5zdGF0dXM7XG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcihtc2cpO1xuICAgIGVyci5zdGF0dXMgPSB4aHIuc3RhdHVzO1xuICAgIGVyci5tZXRob2QgPSAncG9zdCc7XG4gICAgZXJyLnVybCA9IG9wdGlvbnMudXJsO1xuICAgIHJldHVybiBlcnI7XG59XG52YXIgZ2V0Qm9keSA9IGZ1bmN0aW9uKHhocil7XG4gICAgdmFyIHRleHQgPSB4aHIucmVzcG9uc2VUZXh0IHx8IHhoci5yZXNwb25zZTtcbiAgICBpZighdGV4dCl7XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbiAgICBcbiAgICB0cnl7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRleHQpO1xuICAgIH1jYXRjaChlKXtcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxufVxudmFyIFVwbG9hZGVyID0ge1xuICAgIHBvc3Q6IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgICAgICBpZih0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICBpZih4aHIudXBsb2FkKXtcbiAgICAgICAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGlmKGUudG90YWw+MCl7XG4gICAgICAgICAgICAgICAgICAgIGUucGVyY2VudCA9IGUubG9hZGVkIC8gZS50b3RhbCoxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdGlvbnMub25Mb2FkKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQob3B0aW9ucy5maWxlbmFtZSxvcHRpb25zLmZpbGUpO1xuICAgICAgICBpZihvcHRpb25zLmRhdGEpe1xuICAgICAgICAgICAgZm9yKHZhciBpIGluIG9wdGlvbnMuZGF0YSl7XG4gICAgICAgICAgICAgICAgZm9ybURhdGFbaV0gPSBvcHRpb25zLmRhdGFbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIG9wdGlvbnMub25FbmQoZSk7XG4gICAgICAgICAgICBvcHRpb25zLm9uRXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoeGhyLnN0YXR1cyAhPT0gMjAwKXtcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uRW5kKGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLm9uRXJyb3IoZ2V0RXJyb3Iob3B0aW9ucyx4aHIpLGdldEJvZHkoeGhyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcHRpb25zLm9uRW5kKGUpO1xuICAgICAgICAgICAgb3B0aW9ucy5vblN1Y2Nlc3MoZ2V0Qm9keSh4aHIpKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB4aHIub3BlbigncG9zdCcsb3B0aW9ucy51cmwsdHJ1ZSk7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywnWE1MSHR0cFJlcXVlc3QnKTtcbiAgICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPXtcbiAgICB1cGxvYWRGaWxlOmZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgICAgICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy51cmwgfHwgXCIvdXBsb2FkXCI7XG4gICAgICAgICAgb3B0aW9ucy5maWxlbmFtZSA9IG9wdGlvbnMuZmlsZW5hbWUgfHwgXCJmaWxlXCI7XG4gICAgICAgICAgb3B0aW9ucy5iZWZvcmVVcGxvYWQgPSBvcHRpb25zLmJlZm9yZVVwbG9hZCB8fCBmdW5jdGlvbihlKXsgcmV0dXJuIHRydWU7IH07XG4gICAgICAgICAgb3B0aW9ucy5vblN1Y2Nlc3MgPSBvcHRpb25zLm9uU3VjY2VzcyB8fCBmdW5jdGlvbihlKXt9O1xuICAgICAgICAgIG9wdGlvbnMub25FcnJvciA9IG9wdGlvbnMub25FcnJvciB8fCBmdW5jdGlvbihlKXt9O1xuICAgICAgICAgIG9wdGlvbnMub25Mb2FkID0gb3B0aW9ucy5vbkxvYWQgfHwgZnVuY3Rpb24oZSl7fTtcbiAgICAgICAgICBvcHRpb25zLm9uU3RhcnQgPSBvcHRpb25zLm9uU3RhcnQgfHwgZnVuY3Rpb24oZSl7fTtcbiAgICAgICAgICBvcHRpb25zLm9uRW5kID0gb3B0aW9ucy5vbkVuZCB8fCBmdW5jdGlvbihlKXt9O1xuICAgICAgICAgIFxuICAgICAgICAgaWYob3B0aW9ucy5iZWZvcmVVcGxvYWQob3B0aW9ucykpe1xuICAgICAgICAgICAgIG9wdGlvbnMub25TdGFydChvcHRpb25zKTtcbiAgICAgICAgICAgICAvLyDlvIDlp4vkuIrkvKDmlofku7ZcbiAgICAgICAgICAgICBVcGxvYWRlci5wb3N0KG9wdGlvbnMpO1xuICAgICAgICAgfVxuICAgIH0sXG4gICAgdXBsb2FkRmlsZXM6ZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgICAgIFxuICAgIH1cbn0iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG52YXIgeyBcblx0RWRpdG9ySWNvblR5cGVzXG59ID0gcmVxdWlyZSgnLi9jb25zdGFudHMvRWRpdG9yQ29uc3RhbnRzJyk7XG5cbi8vIHV0bGlsc1xudmFyIEVkaXRvckhpc3RvcnkgPSByZXF1aXJlKCcuL3V0aWxzL0VkaXRvckhpc3RvcnknKTtcbnZhciBFZGl0b3JTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3V0aWxzL0VkaXRvclNlbGVjdGlvbicpO1xudmFyIEVkaXRvckRPTSA9IHJlcXVpcmUoJy4vdXRpbHMvRWRpdG9yRE9NJyk7XG52YXIgRWRpdG9yUmVzaXplID0gcmVxdWlyZSgnLi91dGlscy9FZGl0b3JSZXNpemUucmVhY3QnKTtcbnZhciBFZGl0b3JUaW1lciA9IHJlcXVpcmUoJy4vdXRpbHMvRWRpdG9yVGltZXInKVxuLy8gZGlhbG9nICYgZHJvcGRvd25cbnZhciBDb2xvckRyb3Bkb3duID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3BsdWdpbnMvQ29sb3JEcm9wZG93bi5yZWFjdCcpO1xudmFyIEZvcm11bGFEcm9wZG93biA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9wbHVnaW5zL0Zvcm11bGFEcm9wZG93bi5yZWFjdCcpO1xudmFyIFRhYmxlUGlja2VyRHJvcGRvd24gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGx1Z2lucy9UYWJsZVBpY2tlckRyb3Bkb3duLnJlYWN0Jyk7XG4vLyBjb21ib2JveFxudmFyIEZvbnRTaXplQ29tYm9Cb3g9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9wbHVnaW5zL0ZvbnRTaXplQ29tYm9Cb3gucmVhY3QnKTtcbnZhciBGb250RmFtaWx5Q29tYm9Cb3ggPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGx1Z2lucy9Gb250RmFtaWx5Q29tYm9Cb3gucmVhY3QnKTtcbnZhciBQYXJhZ3JhcGhDb21ib0JveCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9wbHVnaW5zL1BhcmFncmFwaENvbWJvQm94LnJlYWN0Jyk7XG4vLyBkaWFsb2dcbnZhciBFbW90aW9uRGlhbG9nID0gIHJlcXVpcmUoJy4vY29tcG9uZW50cy9wbHVnaW5zL0Vtb3Rpb25EaWFsb2cucmVhY3QnKTtcbnZhciBTcGVjaWFsQ2hhcnNEaWFsb2cgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGx1Z2lucy9TcGVjaWFsQ2hhcnNEaWFsb2cucmVhY3QnKTtcbnZhciBJbWFnZURpYWxvZyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9wbHVnaW5zL0ltYWdlRGlhbG9nLnJlYWN0Jyk7XG5cbi8vIGJhc2UgY29tcG9uZW50c1xudmFyIEVkaXRvclRvb2xiYXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvY29yZS9FZGl0b3JUb29sYmFyLnJlYWN0Jyk7XG52YXIgRWRpdG9yVGV4dEFyZWEgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvY29yZS9FZGl0b3JUZXh0QXJlYS5yZWFjdCcpO1xudmFyIEVkaXRvckNvbnRlbnRFZGl0YWJsZURpdiA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9jb3JlL0VkaXRvckNvbnRlbnRFZGl0YWJsZURpdi5yZWFjdCcpO1xuXG4vLyDpnIDopoHlpJbpg6jlvJXnlKhNYXRoUXVpbGxcbnZhciBNUSA9IE1hdGhRdWlsbC5nZXRJbnRlcmZhY2UoMik7XG5cbi8vIGtleSBkb3duIGNvbnRleHRcbnZhciBzYXZlU2NlbmVUaW1lciA9IG51bGw7XG52YXIgbWF4SW5wdXRDb3VudCA9IDIwO1xudmFyIGxhc3RLZXlDb2RlID0gbnVsbDtcbnZhciBrZXljb250ID0gMDtcblxuaWYoIURhdGUucHJvdG90eXBlLkZvcm1hdCl7XG5cdERhdGUucHJvdG90eXBlLkZvcm1hdCA9IGZ1bmN0aW9uKG4pIHtcblx0XHR2YXIgaSA9IHtcblx0XHRcdFwiTStcIjogdGhpcy5nZXRNb250aCgpICsgMSxcblx0XHRcdFwiZCtcIjogdGhpcy5nZXREYXRlKCksXG5cdFx0XHRcImgrXCI6IHRoaXMuZ2V0SG91cnMoKSxcblx0XHRcdFwibStcIjogdGhpcy5nZXRNaW51dGVzKCksXG5cdFx0XHRcInMrXCI6IHRoaXMuZ2V0U2Vjb25kcygpLFxuXHRcdFx0XCJxK1wiOiBNYXRoLmZsb29yKCh0aGlzLmdldE1vbnRoKCkgKyAzKSAvIDMpLFxuXHRcdFx0UzogdGhpcy5nZXRNaWxsaXNlY29uZHMoKVxuXHRcdH0sIHQ7XG5cdFx0Lyh5KykvLnRlc3QobikgJiYgKG4gPSBuLnJlcGxhY2UoUmVnRXhwLiQxLCAodGhpcy5nZXRGdWxsWWVhcigpICsgXCJcIikuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKSkpO1xuXHRcdGZvciAodCBpbiBpKSBuZXcgUmVnRXhwKFwiKFwiICsgdCArIFwiKVwiKS50ZXN0KG4pICYmIChuID0gbi5yZXBsYWNlKFJlZ0V4cC4kMSwgUmVnRXhwLiQxLmxlbmd0aCA9PSAxID8gaVt0XSA6IChcIjAwXCIgKyBpW3RdKS5zdWJzdHIoKFwiXCIgKyBpW3RdKS5sZW5ndGgpKSk7XG5cdFx0cmV0dXJuIG5cbn07XG59XG5cbi8qKlxuKiDlr7nlpJbmjqXlj6Pmlrnms5VcbiogQGZpbmRET01Ob2RlOiDojrflj5ZcInJvb3RcIixcImVkaXRhcmVhXCIsXCJ0b29sYmFyXCIsXCJjb2xvclwi55qEcmVm5a+56LGh5Lul5Y+K55u45bqU55qEZG9t5a+56LGhXG4qIEBzZXRDb250ZW50OiDorr7nva5odG1s5qC85byP5pWw5o2uXG4qIEBnZXRDb250ZW50OiDojrflj5ZodG1s5qC85byP5pWw5o2uXG4qIEBvbkZvY3VzOiDnm5HlkKxmb2N1c+S6i+S7tlxuKiBAZm9jdXNFZGl0b3I6IOiBmueEpuWIsEVkaXRvcuS4ilxuKiBAZGVmYXVsdFZhbHVlOiDpu5jorqTlhoXlrrlcbiogQHZhbHVlOiDnvJbovpHlmajnmoTlgLxcbiogQGljb25zOiDlt6XlhbfmnaHkuIrpnIDopoHmmL7npLrnmoTlm77moIdcbioqL1xuXG52YXIgRWRpdG9yID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIC8vIGluaXQgJiB1cGRhdGVcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGVkaXRvclN0YXRlOntcblx0XHRcdFx0c2hvd0h0bWw6ZmFsc2UsXG5cdFx0XHRcdGljb25zOnt9XG5cdFx0XHR9LFxuXHRcdFx0ZGVmYXVsdFZhbHVlOnRoaXMucHJvcHMuZGVmYXVsdFZhbHVlP3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlOlwiPHA+VGhpcyBpcyBhbiBFZGl0b3I8L3A+XCIsXG5cdFx0XHR2YWx1ZTp0aGlzLnByb3BzLnZhbHVlXG5cdFx0fVxuXHR9LFxuXHRwcm9wVHlwZXM6e1xuXHRcdFwicGx1Z2luc1wiOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXHRcdFwiZm9udEZhbWlseVwiOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0XCJmb250U2l6ZVwiOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0XCJwYXJhZ3JhcGhcIjogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHR9LFxuXHRnZXREZWZhdWx0UHJvcHM6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0XCJwbHVnaW5zXCI6e1xuXHRcdFx0XHRcImltYWdlXCI6e1xuXHRcdFx0XHRcdFwidXBsb2FkZXJcIjp7XG5cdFx0XHRcdFx0XHRuYW1lOlwiZmlsZVwiLFxuXHRcdFx0XHRcdFx0dXJsOlwiL3VwbG9hZFwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcImN1c3RvbVVwbG9hZGVyXCI6bnVsbFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJmb250RmFtaWx5XCI6W1xuXHRcdFx0XHR7XCJuYW1lXCI6XCLlrovkvZNcIix2YWx1ZTpcIuWui+S9kywgU2ltU3VuXCIsZGVmdWFsdDp0cnVlfSxcblx0XHRcdFx0e1wibmFtZVwiOlwi6Zq25LmmXCIsdmFsdWU6XCLpmrbkuaYsIFNpbUxpXCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCLmpbfkvZNcIix2YWx1ZTpcIualt+S9kywgU2ltS2FpXCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCLlvq7ova/pm4Xpu5FcIix2YWx1ZTpcIuW+rui9r+mbhem7kSwgTWljcm9zb2Z0IFlhSGVpXCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCLpu5HkvZNcIix2YWx1ZTpcIum7keS9kywgU2ltSGVpXCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCJhcmlhbFwiLHZhbHVlOlwiYXJpYWwsIGhlbHZldGljYSwgc2Fucy1zZXJpZlwifSxcblx0XHRcdFx0e1wibmFtZVwiOlwiYXJpYWwgYmxhY2tcIix2YWx1ZTpcImFyaWFsIGJsYWNrLCBhdmFudCBnYXJkZVwifSxcblx0XHRcdFx0e1wibmFtZVwiOlwib21pYyBzYW5zIG1zXCIsdmFsdWU6XCJvbWljIHNhbnMgbXNcIn0sXG5cdFx0XHRcdHtcIm5hbWVcIjpcImltcGFjdFwiLHZhbHVlOlwiaW1wYWN0LCBjaGljYWdvXCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCJ0aW1lcyBuZXcgcm9tYW5cIix2YWx1ZTpcInRpbWVzIG5ldyByb21hblwifSxcblx0XHRcdFx0e1wibmFtZVwiOlwiYW5kYWxlIG1vbm9cIix2YWx1ZTpcImFuZGFsZSBtb25vXCJ9XG5cdFx0XHRdLFxuXHRcdFx0XCJmb250U2l6ZVwiOiBbXG5cdFx0XHRcdHtcIm5hbWVcIjpcIjEwcHhcIix2YWx1ZTpcIjFcIn0sXG5cdFx0XHRcdHtcIm5hbWVcIjpcIjEycHhcIix2YWx1ZTpcIjJcIn0sXG5cdFx0XHRcdHtcIm5hbWVcIjpcIjE2cHhcIix2YWx1ZTpcIjNcIixkZWZ1YWx0OnRydWV9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCIxOHB4XCIsdmFsdWU6XCI0XCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCIyNHB4XCIsdmFsdWU6XCI1XCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCIzMnB4XCIsdmFsdWU6XCI2XCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCIzOHB4XCIsdmFsdWU6XCI3XCJ9XG5cdFx0XHRdLFxuXHRcdFx0XCJwYXJhZ3JhcGhcIjogW1xuXHRcdFx0XHR7XCJuYW1lXCI6XCLmrrXokL1cIix2YWx1ZTpcInBcIixkZWZ1YWx0OnRydWV9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCLmoIfpopgxXCIsdmFsdWU6XCJoMVwifSxcblx0XHRcdFx0e1wibmFtZVwiOlwi5qCH6aKYMlwiLHZhbHVlOlwiaDJcIn0sXG5cdFx0XHRcdHtcIm5hbWVcIjpcIuagh+mimDNcIix2YWx1ZTpcImgzXCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCLmoIfpopg0XCIsdmFsdWU6XCJoNFwifSxcblx0XHRcdFx0e1wibmFtZVwiOlwi5qCH6aKYNVwiLHZhbHVlOlwiaDVcIn0sXG5cdFx0XHRcdHtcIm5hbWVcIjpcIuagh+mimDZcIix2YWx1ZTpcImg2XCJ9XG5cdFx0XHRdXG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpe1xuXHRcdEVkaXRvckhpc3RvcnkuY2xlYXIoKTtcblx0XHR0aGlzLnNldENvbnRlbnQodGhpcy5zdGF0ZS52YWx1ZT90aGlzLnN0YXRlLnZhbHVlOnRoaXMuc3RhdGUuZGVmYXVsdFZhbHVlKTtcblx0XHR2YXIgZWRpdGFyZWEgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZWRpdGFyZWEpO1xuXHRcdHZhciBpc0NvbGxhcHNlZCA9IHRydWU7XG4gICAgXHRlZGl0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duKTtcbiAgICBcdGVkaXRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlVcCk7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6ZnVuY3Rpb24obmV4dFByb3BzKXtcblx0XHQvLyB1cGRhdGUgdmFsdWVcblx0XHRpZih0aGlzLnByb3BzLnZhbHVlIT1uZXh0UHJvcHMudmFsdWUpe1xuXHRcdFx0dGhpcy5zZXRDb250ZW50KG5leHRQcm9wcy52YWx1ZT9uZXh0UHJvcHMudmFsdWU6bmV4dFByb3BzLmRlZmF1bHRWYWx1ZSk7XG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnREaWRVcGRhdGU6ZnVuY3Rpb24oKXtcblx0XHR2YXIgZWRpdG9yU3RhdGUgPSB0aGlzLnN0YXRlLmVkaXRvclN0YXRlO1xuXHRcdHN3aXRjaChlZGl0b3JTdGF0ZS5pY29uKXtcblx0XHRcdGNhc2UgXCJzb3VyY2VcIjpcblx0XHRcdFx0dGhpcy5zZXRDb250ZW50KGVkaXRvclN0YXRlLmNvbnRlbnQpXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImNsZWFyZG9jXCI6XG5cdFx0XHRcdHRoaXMuc2V0Q29udGVudChlZGl0b3JTdGF0ZS5jb250ZW50KVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxVbm1vbnQ6ZnVuY3Rpb24oKXtcblx0XHR2YXIgZWRpdGFyZWEgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZWRpdGFyZWEpO1xuICAgIFx0ZWRpdGFyZWEucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XG4gICAgXHRlZGl0YXJlYS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlS2V5VXApO1xuXHR9LFxuICAgIC8vIGV2ZW50IGhhbmRsZXJcblx0aGFuZGxlS2V5RG93bjpmdW5jdGlvbihldnQpe1xuXHRcdGV2dCA9IGV2dCB8fCBldmVudDtcblx0XHR2YXIgdGFyZ2V0ID0gZXZ0LnRhcmdldCB8fCBldnQuc3JjRWxlbWVudDtcblx0XHRpZih0YXJnZXQuY2xhc3NOYW1lICYmIHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZignZWRpdG9yLWNvbnRlbnRlZGl0YWJsZS1kaXYnKSE9LTEpe1xuXHRcdFx0dmFyIGtleUNvZGUgPSBldnQua2V5Q29kZSB8fCBldnQud2hpY2g7XG5cdFx0XHR2YXIgYXV0b1NhdmUgPSB0aGlzLmF1dG9TYXZlO1xuXHRcdFx0aWYgKCFldnQuY3RybEtleSAmJiAhZXZ0Lm1ldGFLZXkgJiYgIWV2dC5zaGlmdEtleSAmJiAhZXZ0LmFsdEtleSkge1xuXHRcdFx0XHRpZiAoRWRpdG9ySGlzdG9yeS5nZXRDb21tYW5kU3RhY2soKS5sZW5ndGggPT0gMCkge1xuXHRcdFx0XHRcdGF1dG9TYXZlKCk7XG5cdFx0XHRcdFx0a2V5Y29udCA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHNhdmVTY2VuZVRpbWVyKTtcblx0XHRcdFx0c2F2ZVNjZW5lVGltZXIgPSBFZGl0b3JUaW1lci5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0dmFyIGludGVyYWxUaW1lciA9IEVkaXRvclRpbWVyLnNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRhdXRvU2F2ZSgpO1xuXHRcdFx0XHRcdFx0a2V5Y29udCA9IDA7XG5cdFx0XHRcdFx0XHRFZGl0b3JUaW1lci5jbGVhckludGVydmFsKGludGVyYWxUaW1lcilcblx0XHRcdFx0XHR9LDMwMClcblx0XHRcdFx0fSwyMDApO1xuXHRcdFx0XHRsYXN0S2V5Q29kZSA9IGtleUNvZGU7XG5cdFx0XHRcdGtleWNvbnQrKztcblx0XHRcdFx0aWYgKGtleWNvbnQgPj0gbWF4SW5wdXRDb3VudCApIHtcblx0XHRcdFx0XHRhdXRvU2F2ZSgpO1xuXHRcdFx0XHRcdGtleWNvbnQgPSAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdEVkaXRvckRPTS5zdG9wUHJvcGFnYXRpb24oZXZ0KTtcblx0fSxcblx0aGFuZGxlS2V5VXA6ZnVuY3Rpb24oZXZ0KXtcblx0XHRldnQgPSBldnQgfHwgZXZlbnQ7XG5cdFx0dmFyIHRhcmdldCA9IGV2dC50YXJnZXQgfHwgZXZ0LnNyY0VsZW1lbnQ7XG5cdFx0aWYodGFyZ2V0LmNsYXNzTmFtZSAmJiB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ2VkaXRvci1jb250ZW50ZWRpdGFibGUtZGl2JykhPS0xKXtcblx0XHRcdHZhciBrZXlDb2RlID0gZXZ0LmtleUNvZGUgfHwgZXZ0LndoaWNoO1xuXHRcdFx0aWYgKCFldnQuY3RybEtleSAmJiAhZXZ0Lm1ldGFLZXkgJiYgIWV2dC5zaGlmdEtleSAmJiAhZXZ0LmFsdEtleSkge1xuXHRcdFx0XHQvLyBzb21lIGhhbmRsZVxuXHRcdFx0fVxuXHRcdH1cblx0XHRFZGl0b3JET00uc3RvcFByb3BhZ2F0aW9uKGV2dCk7XG5cdH0sXG5cdGhhbmRsZUZvY3VzOmZ1bmN0aW9uKGUpe1xuXHRcdGlmKHRoaXMucHJvcHMub25Gb2N1cyl7XG5cdFx0XHR0aGlzLnByb3BzLm9uRm9jdXMoZSx0aGlzLmZpbmRET01Ob2RlKCdyb290JykpO1xuXHRcdH1cblx0XHRFZGl0b3JET00uc3RvcFByb3BhZ2F0aW9uKGUpO1xuXHR9LFxuXHRoYW5kbGVDbGljazpmdW5jdGlvbihlKXtcblx0XHRFZGl0b3JET00uc3RvcFByb3BhZ2F0aW9uKGUpO1xuXHR9LFxuXHRleGNoYW5nZVJhbmdlU3RhdGU6ZnVuY3Rpb24oZWRpdG9yU3RhdGUpe1xuXHRcdHZhciByYW5nZVN0YXRlID0gRWRpdG9yU2VsZWN0aW9uLmdldFJhbmdlU3RhdGUoKTtcblx0XHRmb3IodmFyIGljb24gaW4gcmFuZ2VTdGF0ZSl7XG5cdFx0XHRpZighZWRpdG9yU3RhdGUuaWNvbnNbaWNvbl0pIFxuXHRcdFx0XHRlZGl0b3JTdGF0ZS5pY29uc1tpY29uXSA9IHJhbmdlU3RhdGVbaWNvbl07XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0c3dpdGNoKGljb24pe1xuXHRcdFx0XHRcdGNhc2UgXCJmb3JlY29sb3JcIjpcblx0XHRcdFx0XHRjYXNlIFwiYmFja2NvbG9yXCI6XG5cdFx0XHRcdFx0XHRlZGl0b3JTdGF0ZS5pY29uc1tpY29uXS5jb2xvciA9IHJhbmdlU3RhdGVbaWNvbl0uY29sb3I7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwicGFyYWdyYXBoXCI6XG5cdFx0XHRcdFx0Y2FzZSBcImZvbnRmYW1pbHlcIjpcblx0XHRcdFx0XHRjYXNlIFwiZm9udHNpemVcIjpcblx0XHRcdFx0XHRcdGVkaXRvclN0YXRlLmljb25zW2ljb25dLnZhbHVlID0gcmFuZ2VTdGF0ZVtpY29uXS52YWx1ZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVkaXRvclN0YXRlLmljb25zW2ljb25dLmFjdGl2ZSA9IHJhbmdlU3RhdGVbaWNvbl0uYWN0aXZlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZWRpdG9yU3RhdGU7XG5cdH0sXG5cdGhhbmRsZVJhbmdlQ2hhbmdlOmZ1bmN0aW9uKGUpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdGlmKGUgJiYgZS50eXBlPT1cImJsdXJcIikgcmV0dXJuO1xuXHRcdHZhciB0YXJnZXQgPSBlP2UudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDpudWxsO1xuXHRcdHZhciBzZWxlY3Rpb24gPSBFZGl0b3JTZWxlY3Rpb24uZ2V0U2VsZWN0aW9uKCk7XG5cdFx0aWYoc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5yYW5nZUNvdW50PjApe1xuXHRcdFx0dmFyIGVkaXRvclN0YXRlID0gdGhpcy5zdGF0ZS5lZGl0b3JTdGF0ZTtcblx0XHRcdGVkaXRvclN0YXRlID0gdGhpcy5leGNoYW5nZVJhbmdlU3RhdGUoZWRpdG9yU3RhdGUpO1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGVkaXRvclN0YXRlOmVkaXRvclN0YXRlXG5cdFx0XHR9KVxuXHRcdFx0dGhpcy5yZWZzLnJlc2l6ZS5jbGVhclRhcmdldCgpO1xuXHRcdH1lbHNlIGlmKHRhcmdldCl7XG5cdFx0XHR2YXIgdGFnTmFtZSA9IHRhcmdldC50YWdOYW1lLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHRzd2l0Y2godGFnTmFtZSl7XG5cdFx0XHRcdGNhc2UgXCJJTUdcIjpcblx0XHRcdFx0XHR0aGlzLnJlZnMucmVzaXplLnNldFRhcmdldCh0YXJnZXQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcbiAgICBoYW5kbGVUb29sYmFySWNvbkNsaWNrOmZ1bmN0aW9uKGUsc3RhdGUpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cdFx0dmFyIG9mZnNldFBvc2l0aW9uID0gdGhpcy5nZXRPZmZzZXRSb290UGFyZW50UG9zaXRpb24odGFyZ2V0KTtcblx0XHRcblx0XHR2YXIgaGFuZGxlUmFuZ2VDaGFuZ2UgPSB0aGlzLmhhbmRsZVJhbmdlQ2hhbmdlO1xuXHRcdHZhciBlZGl0YXJlYSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5lZGl0YXJlYSk7XG5cdFx0dmFyIGVkaXRvclN0YXRlID0gdGhpcy5zdGF0ZS5lZGl0b3JTdGF0ZTtcblx0XHRFZGl0b3JTZWxlY3Rpb24uY2xvbmVSYW5nZSgpO1xuXHRcdHN3aXRjaChzdGF0ZS5pY29uKXtcblx0XHRcdGNhc2UgXCJzb3VyY2VcIjpcblx0XHRcdFx0ZWRpdG9yU3RhdGUuc2hvd0h0bWwgPSAhZWRpdG9yU3RhdGUuc2hvd0h0bWw7XG5cdFx0XHRcdHN0YXRlLmFjdGl2ZSA9IGVkaXRvclN0YXRlLnNob3dIdG1sO1xuXHRcdFx0XHRlZGl0b3JTdGF0ZS5jb250ZW50ID0gdGhpcy5yZWZzLmVkaXRhcmVhLmdldENvbnRlbnQoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidW5kb1wiOlxuXHRcdFx0XHRFZGl0b3JIaXN0b3J5LnVuZG8oKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwicmVkb1wiOlxuXHRcdFx0XHRFZGl0b3JIaXN0b3J5LnJlZG8oKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwicmVtb3ZlZm9ybWF0XCI6XG4gICAgICAgICAgICAgICAgRWRpdG9ySGlzdG9yeS5leGVjQ29tbWFuZChzdGF0ZS5pY29uLGZhbHNlLG51bGwpO1xuXHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24uc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHR2YXIgc3Bhbk5vZGVzID0gRWRpdG9yU2VsZWN0aW9uLmdldFNwYW5Ob2RlcygpO1xuXHRcdFx0XHRmb3IodmFyIGk9MDtpPHNwYW5Ob2Rlcy5sZW5ndGg7aSsrKXtcblx0XHRcdFx0XHRzd2l0Y2goc3Bhbk5vZGVzW2ldLmNsYXNzTmFtZSl7XG5cdFx0XHRcdFx0XHRjYXNlIFwiZm9udC1ib3JkZXJcIjpcblx0XHRcdFx0XHRcdFx0dmFyIHNwYW5Ob2RlID0gc3Bhbk5vZGVzW2ldO1xuXHRcdFx0XHRcdFx0XHR2YXIgcGFyZW50Tm9kZSA9IHNwYW5Ob2RlLnBhcmVudE5vZGU7XG5cdFx0XHRcdFx0XHRcdHZhciBuZXh0U2libGluZyA9IHNwYW5Ob2RlLm5leHRTaWJsaW5nO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0Zm9yKHZhciBjPTA7YzxzcGFuTm9kZS5jaGlsZE5vZGVzLmxlbmd0aDtjKyspe1xuXHRcdFx0XHRcdFx0XHRcdHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNwYW5Ob2RlLmNoaWxkTm9kZXNbY10uY2xvbmVOb2RlKCksbmV4dFNpYmxpbmcpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3Bhbk5vZGVzW2ldKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5yZXN0b3JlUmFuZ2UoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiYm9sZFwiOlxuXHRcdFx0Y2FzZSBcIml0YWxpY1wiOlxuXHRcdFx0Y2FzZSBcInVuZGVybGluZVwiOlxuXHRcdFx0Y2FzZSBcInN0cmlrZXRocm91Z2hcIjpcblx0XHRcdGNhc2UgXCJzdWJzY3JpcHRcIjpcblx0XHRcdGNhc2UgXCJzdXBlcnNjcmlwdFwiOlxuXHRcdFx0Y2FzZSBcImluc2VydG9yZGVyZWRsaXN0XCI6XG5cdFx0XHRjYXNlIFwiaW5zZXJ0dW5vcmRlcmVkbGlzdFwiOlxuXHRcdFx0Y2FzZSBcInNlbGVjdGFsbFwiOlxuXHRcdFx0Y2FzZSBcImp1c3RpZnlsZWZ0XCI6XG5cdFx0XHRjYXNlIFwianVzdGlmeXJpZ2h0XCI6XG5cdFx0XHRjYXNlIFwianVzdGlmeWNlbnRlclwiOlxuXHRcdFx0Y2FzZSBcImluZGVudFwiOlxuXHRcdFx0Y2FzZSBcIm91dGRlbnRcIjpcblx0XHRcdFx0RWRpdG9ySGlzdG9yeS5leGVjQ29tbWFuZChzdGF0ZS5pY29uLGZhbHNlLG51bGwpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJ0b3VwcGVyY2FzZVwiOlxuXHRcdFx0Y2FzZSBcInRvbG93ZXJjYXNlXCI6XG5cdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5zdG9yZVJhbmdlKCk7XG5cdFx0XHRcdHZhciB0ZXh0Tm9kZXMgPSBFZGl0b3JTZWxlY3Rpb24uZ2V0VGV4dE5vZGVzKCk7XG5cdFx0XHRcdGZvcih2YXIgaT0wO2k8dGV4dE5vZGVzLmxlbmd0aDtpKyspe1xuXHRcdFx0XHRcdHZhciBub2RlID0gdGV4dE5vZGVzW2ldLmNoaWxkTm9kZTtcblx0XHRcdFx0XHR2YXIgc3RhcnQgPSB0ZXh0Tm9kZXNbaV0uc3RhcnRPZmZzZXQ7XG5cdFx0XHRcdFx0dmFyIGVuZCA9IHRleHROb2Rlc1tpXS5lbmRPZmZzZXQ7XG5cdFx0XHRcdFx0bm9kZS5ub2RlVmFsdWUgPSBub2RlLm5vZGVWYWx1ZS5zdWJzdHJpbmcoMCxzdGFydCkgKyBcblx0XHRcdFx0XHRcdFx0KCBzdGF0ZS5pY29uPT1cInRvdXBwZXJjYXNlXCI/bm9kZS5ub2RlVmFsdWUuc3Vic3RyaW5nKHN0YXJ0LGVuZCkudG9VcHBlckNhc2UoKTpub2RlLm5vZGVWYWx1ZS5zdWJzdHJpbmcoc3RhcnQsZW5kKS50b0xvd2VyQ2FzZSgpICkgKyBcblx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlVmFsdWUuc3Vic3RyaW5nKGVuZCxub2RlLmxlbmd0aCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0RWRpdG9ySGlzdG9yeS5leGVjQ29tbWFuZChzdGF0ZS5pY29uLGZhbHNlLG51bGwpO1xuXHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24ucmVzdG9yZVJhbmdlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImZvbnRib3JkZXJcIjpcblx0XHRcdFx0dmFyIHRleHROb2RlcyA9IEVkaXRvclNlbGVjdGlvbi5nZXRUZXh0Tm9kZXMoKTtcblx0XHRcdFx0dmFyIHN0YXJ0Tm9kZSA9IG51bGwsZW5kTm9kZSA9IG51bGwsc3RhcnRPZmZzZXQ9MCxlbmRPZmZzZXQ9MDtcblx0XHRcdFx0Zm9yKHZhciBpPTA7aTx0ZXh0Tm9kZXMubGVuZ3RoO2krKyl7XG5cdFx0XHRcdFx0Ly8g6I635Y+WXG5cdFx0XHRcdFx0dmFyIG5vZGUgPSB0ZXh0Tm9kZXNbaV0uY2hpbGROb2RlO1xuXHRcdFx0XHRcdHZhciBzdGFydCA9IHRleHROb2Rlc1tpXS5zdGFydE9mZnNldDtcblx0XHRcdFx0XHR2YXIgZW5kID0gdGV4dE5vZGVzW2ldLmVuZE9mZnNldDtcblx0XHRcdFx0XHQvLyDmi7fotJ1cblx0XHRcdFx0XHR2YXIgY2xvbmVOb2RlID0gbm9kZS5jbG9uZU5vZGUoKTtcblx0XHRcdFx0XHR2YXIgc3RhcnRUZXh0ID0gY2xvbmVOb2RlLm5vZGVWYWx1ZS5zdWJzdHJpbmcoMCxzdGFydCk7XG5cdFx0XHRcdFx0dmFyIGVuZFRleHQgPSBjbG9uZU5vZGUubm9kZVZhbHVlLnN1YnN0cmluZyhlbmQsY2xvbmVOb2RlLmxlbmd0aCk7XG5cdFx0XHRcdFx0dmFyIGJvcmRlclRleHQgPSBjbG9uZU5vZGUubm9kZVZhbHVlLnN1YnN0cmluZyhzdGFydCxlbmQpO1xuXHRcdFx0XHRcdHZhciBzcGFuID0gbnVsbDtcblx0XHRcdFx0XHR2YXIgdGV4dFBhcmVudE5vZGUgPSB0ZXh0Tm9kZXNbaV0uY2hpbGROb2RlLnBhcmVudE5vZGU7XG5cdFx0XHRcdFx0aWYoIHRleHRQYXJlbnROb2RlICYmIHRleHRQYXJlbnROb2RlLmNsYXNzTmFtZSAmJiB0ZXh0UGFyZW50Tm9kZS5jbGFzc05hbWU9PVwiZm9udC1ib3JkZXJcIil7XG5cdFx0XHRcdFx0XHRpZihpPT0wKXtcblx0XHRcdFx0XHRcdFx0c3RhcnROb2RlID0gdGV4dE5vZGVzW2ldLmNoaWxkTm9kZTtcblx0XHRcdFx0XHRcdFx0c3RhcnRPZmZzZXQgPSBzdGFydDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKGk9PXRleHROb2Rlcy5sZW5ndGgtMSkge1xuXHRcdFx0XHRcdFx0XHRlbmROb2RlID0gdGV4dE5vZGVzW2ldLmNoaWxkTm9kZTtcblx0XHRcdFx0XHRcdFx0ZW5kT2Zmc2V0ID0gZW5kO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0Ly8g6YeN5paw6LWL5YC8XG5cdFx0XHRcdFx0XHRub2RlLm5vZGVWYWx1ZSA9IHN0YXJ0VGV4dDtcblx0XHRcdFx0XHRcdHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblx0XHRcdFx0XHRcdHNwYW4uY2xhc3NOYW1lID0gXCJmb250LWJvcmRlclwiO1xuXHRcdFx0XHRcdFx0c3Bhbi5pbm5lckhUTUwgPSBib3JkZXJUZXh0O1xuXHRcdFx0XHRcdFx0c3Bhbi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCAjMDAwXCI7XG5cdFx0XHRcdFx0XHRub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNwYW4sIG5vZGUubmV4dFNpYmxpbmcpO1xuXHRcdFx0XHRcdFx0aWYoZW5kVGV4dCE9XCJcIil7XG5cdFx0XHRcdFx0XHRcdG5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZW5kVGV4dCksIHNwYW4ubmV4dFNpYmxpbmcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYoaT09MCkgc3RhcnROb2RlID0gc3Bhbi5jaGlsZE5vZGVzWzBdO1xuXHRcdFx0XHRcdFx0aWYoaT09dGV4dE5vZGVzLmxlbmd0aC0xKSB7XG5cdFx0XHRcdFx0XHRcdGVuZE5vZGUgPSBzcGFuLmNoaWxkTm9kZXNbMF07XG5cdFx0XHRcdFx0XHRcdGVuZE9mZnNldCA9IHNwYW4uY2hpbGROb2Rlc1swXS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5hZGRSYW5nZShzdGFydE5vZGUsc3RhcnRPZmZzZXQsZW5kTm9kZSxlbmRPZmZzZXQpO1xuXHRcdFx0XHQvLyDlkIjlubbnm7jlkIxmb250LWJvcmRlcuWFg+e0oFxuXHRcdFx0XHR2YXIgc3Bhbk5vZGVzID0gRWRpdG9yU2VsZWN0aW9uLmdldFNwYW5Ob2RlcygpO1xuXHRcdFx0XHRmb3IodmFyIGk9MDtpPHNwYW5Ob2Rlcy5sZW5ndGgtMTtpKyspe1xuXHRcdFx0XHRcdHZhciBzcGFuTm9kZSA9IHNwYW5Ob2Rlc1tpXTtcblx0XHRcdFx0XHR2YXIgcGFyZW50Tm9kZSA9IHNwYW5Ob2Rlc1tpXS5wYXJlbnROb2RlO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmKEVkaXRvckRPTS5pc051bGxPZlRleHROb2RlKHNwYW5Ob2RlLm5leHRTaWJsaW5nKSl7XG5cdFx0XHRcdFx0XHQvLyDnp7vpmaTnqbrlhYPntKBcblx0XHRcdFx0XHRcdHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3Bhbk5vZGUubmV4dFNpYmxpbmcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihzcGFuTm9kZS5uZXh0U2libGluZz09PXNwYW5Ob2Rlc1tpKzFdKXtcblx0XHRcdFx0XHRcdHZhciBuZXh0U2libGluZ0NoaWxkTm9kZXMgPSBzcGFuTm9kZXNbaSsxXS5jaGlsZE5vZGVzO1xuXHRcdFx0XHRcdFx0Zm9yKHZhciBjPTA7YzxuZXh0U2libGluZ0NoaWxkTm9kZXMubGVuZ3RoO2MrKyl7XG5cdFx0XHRcdFx0XHRcdHNwYW5Ob2RlLmFwcGVuZENoaWxkKG5leHRTaWJsaW5nQ2hpbGROb2Rlc1tjXS5jbG9uZU5vZGUoKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyDnp7vpmaTogIHlhYPntKBcblx0XHRcdFx0XHRcdHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3Bhbk5vZGVzW2krMV0pO1xuXHRcdFx0XHRcdFx0Ly8g5Yig6Zmk6L+H5ZCO77yM6YeN5paw5oyH5ZCRXG5cdFx0XHRcdFx0XHRzcGFuTm9kZXNbaSsxXSA9IHNwYW5Ob2Rlc1tpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0RWRpdG9ySGlzdG9yeS5leGVjQ29tbWFuZChzdGF0ZS5pY29uLGZhbHNlLG51bGwpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJmb3JlY29sb3JcIjpcblx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnN0b3JlUmFuZ2UoKTtcblx0XHRcdFx0b2Zmc2V0UG9zaXRpb24ueSArPSBvZmZzZXRQb3NpdGlvbi5oKzU7XG5cdFx0XHRcdHRoaXMucmVmcy5jb2xvci5vcGVuKG9mZnNldFBvc2l0aW9uLGZ1bmN0aW9uKGUsY29sb3Ipe1xuXHRcdFx0XHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdFx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnJlc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2ZvcmVjb2xvcicsZmFsc2UsY29sb3IpO1xuXHRcdFx0XHRcdGhhbmRsZVJhbmdlQ2hhbmdlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJiYWNrY29sb3JcIjpcblx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnN0b3JlUmFuZ2UoKTtcblx0XHRcdFx0b2Zmc2V0UG9zaXRpb24ueSArPSBvZmZzZXRQb3NpdGlvbi5oKzU7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnJlZnMuY29sb3Iub3BlbihvZmZzZXRQb3NpdGlvbixmdW5jdGlvbihlLGNvbG9yKXtcblx0XHRcdFx0XHRlZGl0YXJlYS5mb2N1cygpO1xuXHRcdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5yZXN0b3JlUmFuZ2UoKTtcblx0XHRcdFx0XHRFZGl0b3JIaXN0b3J5LmV4ZWNDb21tYW5kKCdiYWNrY29sb3InLGZhbHNlLGNvbG9yKTtcblx0XHRcdFx0XHRoYW5kbGVSYW5nZUNoYW5nZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiZm9udHNpemVcIjpcblx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnN0b3JlUmFuZ2UoKTtcblx0XHRcdFx0b2Zmc2V0UG9zaXRpb24ueSArPSBvZmZzZXRQb3NpdGlvbi5oKzU7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnJlZnMuZm9udHNpemUub3BlbihvZmZzZXRQb3NpdGlvbixmdW5jdGlvbihlLGZvbnRzaXplKXtcblx0XHRcdFx0XHRlZGl0YXJlYS5mb2N1cygpO1xuXHRcdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5yZXN0b3JlUmFuZ2UoKTtcblx0XHRcdFx0XHRFZGl0b3JIaXN0b3J5LmV4ZWNDb21tYW5kKCdmb250c2l6ZScsZmFsc2UsZm9udHNpemUpO1xuXHRcdFx0XHRcdGhhbmRsZVJhbmdlQ2hhbmdlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJmb250ZmFtaWx5XCI6XG5cdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5zdG9yZVJhbmdlKCk7XG5cdFx0XHRcdG9mZnNldFBvc2l0aW9uLnkgKz0gb2Zmc2V0UG9zaXRpb24uaCs1O1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5yZWZzLmZvbnRmYW1pbHkub3BlbihvZmZzZXRQb3NpdGlvbixmdW5jdGlvbihlLGZvbnRmYW1pbHkpe1xuXHRcdFx0XHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdFx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnJlc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2ZvbnRuYW1lJyxmYWxzZSxmb250ZmFtaWx5KTtcblx0XHRcdFx0XHRoYW5kbGVSYW5nZUNoYW5nZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwicGFyYWdyYXBoXCI6XG5cdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5zdG9yZVJhbmdlKCk7XG5cdFx0XHRcdG9mZnNldFBvc2l0aW9uLnkgKz0gb2Zmc2V0UG9zaXRpb24uaCs1O1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5yZWZzLnBhcmFncmFwaC5vcGVuKG9mZnNldFBvc2l0aW9uLGZ1bmN0aW9uKGUscGFyYWdyYXBoKXtcblx0XHRcdFx0XHRlZGl0YXJlYS5mb2N1cygpO1xuXHRcdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5yZXN0b3JlUmFuZ2UoKTtcblx0XHRcdFx0XHR2YXIgcGFyYWdyYXBocyA9IEVkaXRvclNlbGVjdGlvbi5nZXRQYXJhZ3JhcGhzKCk7XG5cdFx0XHRcdFx0Zm9yKHZhciBpPTA7aTxwYXJhZ3JhcGhzLmxlbmd0aDtpKyspe1xuXHRcdFx0XHRcdFx0c3dpdGNoKHBhcmFncmFwaHNbaV0udGFnTmFtZS50b1VwcGVyQ2FzZSgpKXtcblx0XHRcdFx0XHRcdFx0Y2FzZSBcIlREXCI6XG5cdFx0XHRcdFx0XHRcdGNhc2UgXCJUSFwiOlxuXHRcdFx0XHRcdFx0XHRjYXNlIFwiRElWXCI6XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGNoaWxkTm9kZXMgPSBwYXJhZ3JhcGhzW2ldLmNoaWxkTm9kZXM7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBhcmFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChwYXJhZ3JhcGgpO1xuXHRcdFx0XHRcdFx0XHRcdGZvcih2YXIgaj0wO2o8Y2hpbGROb2Rlcy5sZW5ndGg7aisrKXtcblx0XHRcdFx0XHRcdFx0XHRcdHBhcmFFbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkTm9kZXNbal0pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRwYXJhZ3JhcGhzW2ldLmFwcGVuZENoaWxkKHBhcmFFbGVtZW50KTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSBcIlBcIjpcblx0XHRcdFx0XHRcdFx0Y2FzZSBcIkgxXCI6XG5cdFx0XHRcdFx0XHRcdGNhc2UgXCJIMlwiOlxuXHRcdFx0XHRcdFx0XHRjYXNlIFwiSDNcIjpcblx0XHRcdFx0XHRcdFx0Y2FzZSBcIkg0XCI6XG5cdFx0XHRcdFx0XHRcdGNhc2UgXCJINVwiOlxuXHRcdFx0XHRcdFx0XHRjYXNlIFwiSDZcIjpcblx0XHRcdFx0XHRcdFx0XHR2YXIgcGFyZW50RWxlbWVudCA9IHBhcmFncmFwaHNbaV07XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGNoaWxkTm9kZXMgPSBwYXJhZ3JhcGhzW2ldLmNoaWxkTm9kZXM7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBhcmFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChwYXJhZ3JhcGgpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciBwYXJlbnROb2RlID0gcGFyZW50RWxlbWVudC5wYXJlbnROb2RlO1xuXHRcdFx0XHRcdFx0XHRcdHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHBhcmFFbGVtZW50LCBwYXJlbnRFbGVtZW50Lm5leHRTaWJsaW5nKTtcblx0XHRcdFx0XHRcdFx0XHRmb3IodmFyIGo9MDtqPGNoaWxkTm9kZXMubGVuZ3RoO2orKyl7XG5cdFx0XHRcdFx0XHRcdFx0XHRwYXJhRWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZE5vZGVzW2pdKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwYXJlbnRFbGVtZW50KTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0RWRpdG9ySGlzdG9yeS5leGVjQ29tbWFuZCgncGFyYWdyYXBoJyxmYWxzZSxwYXJhZ3JhcGgpO1xuXHRcdFx0XHRcdGhhbmRsZVJhbmdlQ2hhbmdlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJjbGVhcmRvY1wiOlxuXHRcdFx0XHRlZGl0b3JTdGF0ZS5jb250ZW50ID0gXCI8cD48YnIvPjwvcD5cIlxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJob3Jpem9udGFsXCI6XG5cdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2luc2VydGh0bWwnLGZhbHNlLFwiPGhyLz48cD48YnIvPjwvcD5cIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImRhdGVcIjpcblx0XHRcdFx0dmFyIHN0ckRhdGUgPSBuZXcgRGF0ZSgpLkZvcm1hdChcInl5eXktTU0tZGRcIik7XG5cdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2luc2VydGh0bWwnLGZhbHNlLCBzdHJEYXRlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidGltZVwiOlxuXHRcdFx0XHR2YXIgc3RyVGltZSA9IG5ldyBEYXRlKCkuRm9ybWF0KCdoaDptbTpzcycpXG5cdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2luc2VydGh0bWwnLGZhbHNlLHN0clRpbWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJpbWFnZVwiOlxuXHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24uc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHR0aGlzLnJlZnMuaW1hZ2Uub3BlbihmdW5jdGlvbihlLGh0bWwpe1xuXHRcdFx0XHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdFx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnJlc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmKGh0bWwgJiYgaHRtbC5sZW5ndGg+MCl7XG5cdFx0XHRcdFx0XHRpZihFZGl0b3JTZWxlY3Rpb24ucmFuZ2Upe1xuXHRcdFx0XHRcdFx0XHRFZGl0b3JIaXN0b3J5LmV4ZWNDb21tYW5kKCdpbnNlcnRodG1sJyxmYWxzZSxodG1sKTtcblx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJlYS5pbm5lckhUTUwgKz0gaHRtbDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImZvcm11bGFcIjpcblx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnN0b3JlUmFuZ2UoKTtcblx0XHRcdFx0b2Zmc2V0UG9zaXRpb24ueSArPSBvZmZzZXRQb3NpdGlvbi5oKzU7XG5cdFx0XHRcdG9mZnNldFBvc2l0aW9uLnggLT0gb2Zmc2V0UG9zaXRpb24udy8yO1xuXHRcdFx0XHR2YXIgX3NlbGYgPSB0aGlzO1xuXHRcdFx0XHR0aGlzLnJlZnMuZm9ybXVsYS5vcGVuKG9mZnNldFBvc2l0aW9uLGZ1bmN0aW9uKGUsbGF0ZXgsaWQpe1xuXHRcdFx0XHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdFx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnJlc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmKGxhdGV4ICYmIGxhdGV4Lmxlbmd0aD4wKXtcblx0XHRcdFx0XHRcdHZhciBodG1sID0gJzxwPiZuYnNwOzxzcGFuIGNsYXNzPVwibWF0aHF1aWxsLWVtYmVkZGVkLWxhdGV4XCIgaWQ9XCInK2lkKydcIj48L3NwYW4+Jm5ic3A7PC9wPic7XG5cdFx0XHRcdFx0XHRpZihFZGl0b3JTZWxlY3Rpb24ucmFuZ2Upe1xuXHRcdFx0XHRcdFx0XHRFZGl0b3JIaXN0b3J5LmV4ZWNDb21tYW5kKCdpbnNlcnRodG1sJyxmYWxzZSxodG1sKTtcblx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJlYS5pbm5lckhUTUwgKz0gaHRtbDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdEVkaXRvclRpbWVyLnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdFx0IF9zZWxmLmFkZEZvcm11bGEoaWQsbGF0ZXgpO1xuXHRcdFx0XHRcdFx0fSwyMDApO1xuXHRcdFx0XHRcdFx0aGFuZGxlUmFuZ2VDaGFuZ2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImluc2VydHRhYmxlXCI6XG5cdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5zdG9yZVJhbmdlKCk7XG5cdFx0XHRcdG9mZnNldFBvc2l0aW9uLnkgKz0gb2Zmc2V0UG9zaXRpb24uaCs1O1xuICAgICAgICAgICAgICAgIG9mZnNldFBvc2l0aW9uLnggLT0gb2Zmc2V0UG9zaXRpb24udy8yO1xuXHRcdFx0XHR0aGlzLnJlZnMudGFibGUub3BlbihvZmZzZXRQb3NpdGlvbixmdW5jdGlvbihlLGh0bWwpe1xuXHRcdFx0XHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdFx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnJlc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2luc2VydGh0bWwnLGZhbHNlLGh0bWwpO1xuXHRcdFx0XHRcdGhhbmRsZVJhbmdlQ2hhbmdlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJzcGVjaGFyc1wiOlxuXHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24uc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRvZmZzZXRQb3NpdGlvbi55ICs9IG9mZnNldFBvc2l0aW9uLmgrNTtcbiAgICAgICAgICAgICAgICBvZmZzZXRQb3NpdGlvbi54IC09IG9mZnNldFBvc2l0aW9uLncvMjtcblx0XHRcdFx0dGhpcy5yZWZzLnNwZWNpYWwub3BlbihvZmZzZXRQb3NpdGlvbixmdW5jdGlvbihlLGNoYXIpe1xuXHRcdFx0XHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdFx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnJlc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2luc2VydGh0bWwnLGZhbHNlLGNoYXIpO1xuXHRcdFx0XHRcdGhhbmRsZVJhbmdlQ2hhbmdlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJlbW90aW9uXCI6XG5cdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5zdG9yZVJhbmdlKCk7XG5cdFx0XHRcdG9mZnNldFBvc2l0aW9uLnkgKz0gb2Zmc2V0UG9zaXRpb24uaCs1O1xuXHRcdFx0XHR0aGlzLnJlZnMuZW1vdGlvbi5vcGVuKG9mZnNldFBvc2l0aW9uLGZ1bmN0aW9uKGUsaHRtbCl7XG5cdFx0XHRcdFx0ZWRpdGFyZWEuZm9jdXMoKTtcblx0XHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24ucmVzdG9yZVJhbmdlKCk7XG5cdFx0XHRcdFx0RWRpdG9ySGlzdG9yeS5leGVjQ29tbWFuZCgnaW5zZXJ0aHRtbCcsZmFsc2UsaHRtbCk7XG5cdFx0XHRcdFx0aGFuZGxlUmFuZ2VDaGFuZ2UoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHQvLyBzZXRTdGF0ZVxuXHRcdGVkaXRvclN0YXRlLmljb25zW3N0YXRlLmljb25dID0gc3RhdGU7XG5cdFx0ZWRpdG9yU3RhdGUuaWNvbiA9IHN0YXRlLmljb247XG5cdFx0RWRpdG9yU2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG5cdFx0Ly8gcmFuZ2Ugc3RhdGVcblx0XHRlZGl0b3JTdGF0ZSA9IHRoaXMuZXhjaGFuZ2VSYW5nZVN0YXRlKGVkaXRvclN0YXRlKTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGVkaXRvclN0YXRlOmVkaXRvclN0YXRlXG5cdFx0fSlcblx0XHRFZGl0b3JET00uc3RvcFByb3BhZ2F0aW9uKGUpO1xuXHR9LFxuICAgIC8vIHV0aWxzXG5cdGdldE9mZnNldFJvb3RQYXJlbnRQb3NpdGlvbjpmdW5jdGlvbih0YXJnZXQpe1xuXHRcdHZhciBwb3NpdGlvbiA9IHt4OjAseTowLHc6MCxoOjB9XG5cdFx0dmFyIHJvb3QgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMucm9vdCk7XG5cdFx0cG9zaXRpb24udyA9IHRhcmdldC5vZmZzZXRXaWR0aDtcblx0XHRwb3NpdGlvbi5oID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcblx0XHRwb3NpdGlvbi54ID0gdGFyZ2V0Lm9mZnNldExlZnQ7XG5cdFx0cG9zaXRpb24ueSA9IHRhcmdldC5vZmZzZXRUb3A7XG5cdFx0dmFyIG9mZnNldFBhcmVudCA9IHRhcmdldC5vZmZzZXRQYXJlbnQ7XG5cdFx0d2hpbGUob2Zmc2V0UGFyZW50ICYmIG9mZnNldFBhcmVudCE9cm9vdCl7XG5cdFx0XHQgcG9zaXRpb24ueCs9IG9mZnNldFBhcmVudC5vZmZzZXRMZWZ0O1xuXHRcdFx0IHBvc2l0aW9uLnkrPW9mZnNldFBhcmVudC5vZmZzZXRUb3A7XG5cdFx0XHQgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcblx0XHR9XG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xuXHR9LFxuXHRhZGRGb3JtdWxhOmZ1bmN0aW9uKGlkLGxhdGV4KXtcblx0XHR2YXIgZWRpdGFyZWEgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZWRpdGFyZWEpO1xuXHRcdHZhciBodG1sRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblx0XHR2YXIgY29uZmlnID0ge1xuXHRcdCAgaGFuZGxlcnM6IHsgZWRpdDogZnVuY3Rpb24oKXsgfSB9LFxuXHRcdCAgcmVzdHJpY3RNaXNtYXRjaGVkQnJhY2tldHM6IHRydWVcblx0XHR9O1xuXHRcdHZhciBtYXRoRmllbGQgPSBNUS5NYXRoRmllbGQoaHRtbEVsZW1lbnQsIGNvbmZpZyk7XG5cdFx0bWF0aEZpZWxkLmxhdGV4KGxhdGV4KTsgXG5cdFx0dmFyICRodG1sRWxlbWVudCA9ICQoaHRtbEVsZW1lbnQpO1xuXHRcdCRodG1sRWxlbWVudC5rZXlkb3duKGZ1bmN0aW9uKGUpe1xuXHRcdFx0bWF0aEZpZWxkLmZvY3VzKCk7XG5cdFx0XHRFZGl0b3JET00uc3RvcFByb3BhZ2F0aW9uKGUpO1xuXHRcdH0pO1xuXHRcdCRodG1sRWxlbWVudC5rZXl1cChmdW5jdGlvbihlKXtcblx0XHRcdG1hdGhGaWVsZC5mb2N1cygpO1xuXHRcdFx0RWRpdG9yRE9NLnN0b3BQcm9wYWdhdGlvbihlKTtcblx0XHR9KTtcblx0XHQkaHRtbEVsZW1lbnQubW91c2V1cChmdW5jdGlvbihlKXtcblx0XHRcdG1hdGhGaWVsZC5mb2N1cygpO1xuXHRcdFx0RWRpdG9yRE9NLnN0b3BQcm9wYWdhdGlvbihlKTtcblx0XHR9KTtcblx0XHQkaHRtbEVsZW1lbnQubW91c2Vkb3duKGZ1bmN0aW9uKGUpe1xuXHRcdFx0RWRpdG9yRE9NLnN0b3BQcm9wYWdhdGlvbihlKTtcblx0XHR9KTtcblx0XHQkaHRtbEVsZW1lbnQubW91c2Vtb3ZlKGZ1bmN0aW9uKGUpe1xuXHRcdFx0RWRpdG9yRE9NLnN0b3BQcm9wYWdhdGlvbihlKTtcblx0XHR9KTtcblx0XHQkKGVkaXRhcmVhKS5tb3VzZWRvd24oZnVuY3Rpb24oZSl7XG5cdFx0XHRtYXRoRmllbGQuYmx1cigpO1xuXHRcdFx0RWRpdG9yRE9NLnN0b3BQcm9wYWdhdGlvbihlKTtcblx0XHR9KVxuXHRcdCQoZWRpdGFyZWEpLm1vdXNlbW92ZShmdW5jdGlvbihlKXtcblx0XHRcdEVkaXRvckRPTS5zdG9wUHJvcGFnYXRpb24oZSk7XG5cdFx0fSlcblx0fSxcblx0YXV0b1NhdmU6ZnVuY3Rpb24oKXtcblx0XHRFZGl0b3JIaXN0b3J5LmV4ZWNDb21tYW5kKCdhdXRvc2F2ZScsZmFsc2UsbnVsbCk7XG5cdH0sXG4gICAgLy8gcHVibGljIGZ1bmN0aW9uc1xuXHRmaW5kRE9NTm9kZTpmdW5jdGlvbihyZWZOYW1lKXtcblx0XHQvLyDlr7nlpJblhazluIPmlrnms5Vcblx0XHR2YXIga2V5cyA9IFsgXCJyb290XCIsXCJlZGl0YXJlYVwiLFwidG9vbGJhclwiLFwiY29sb3JcIl07XG5cdFx0aWYoa2V5cy5pbmRleE9mKHJlZk5hbWUpPT0tMSkgXG5cdFx0XHRyZXR1cm4ge3JlZjpudWxsLGRvbTpudWxsfTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVmOnRoaXMucmVmc1tyZWZOYW1lXSxcblx0XHRcdGRvbTpSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbcmVmTmFtZV0pXG5cdCAgIH1cblx0fSxcblx0c2V0Q29udGVudDpmdW5jdGlvbihjb250ZW50KXtcblx0XHQvLyDlkI7nu63mt7vliqDmoKHpqozmlrnms5Vcblx0XHR0aGlzLnJlZnMuZWRpdGFyZWEuc2V0Q29udGVudChjb250ZW50KTtcblx0XHQvLyBtYXRocXVpbGwgc3VwcG9ydHNcblx0XHRpZihjb250ZW50LmluZGV4T2YoXCJtYXRocXVpbGwtZW1iZWRkZWQtbGF0ZXhcIikhPS0xKXtcblx0XHRcdHZhciBfc2VsZiA9IHRoaXM7XG5cdFx0XHRFZGl0b3JUaW1lci5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciBlZGl0YXJlYSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKF9zZWxmLnJlZnMuZWRpdGFyZWEpO1xuXHRcdFx0XHR2YXIgZWxlbWVudHMgPSBlZGl0YXJlYS5xdWVyeVNlbGVjdG9yQWxsKCcubWF0aHF1aWxsLWVtYmVkZGVkLWxhdGV4Jyk7XG5cdFx0XHRcdGZvcih2YXIgaT0wO2k8ZWxlbWVudHMubGVuZ3RoO2krKyl7XG5cdFx0XHRcdFx0aWYoIWVsZW1lbnRzW2ldLmlkKXtcblx0XHRcdFx0XHRcdCAgdmFyIGlkID0gXCJtYXRocXVpbGwtXCIraStcIi1cIituZXcgRGF0ZSgpLnZhbHVlT2YoKTtcblx0XHRcdFx0XHRcdCAgdmFyIGxhdGV4ID0gZWxlbWVudHNbaV0uaW5uZXJIVE1MO1xuXHRcdFx0XHRcdFx0ICBlbGVtZW50c1tpXS5pZCA9IGlkO1xuXHRcdFx0XHRcdFx0ICBfc2VsZi5hZGRGb3JtdWxhKGlkLGxhdGV4KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sMjAwKTtcblx0XHR9XG5cdH0sXG5cdGdldENvbnRlbnQ6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5yZWZzLmVkaXRhcmVhLmdldENvbnRlbnQoKTtcblx0fSxcblx0Zm9jdXNFZGl0b3I6ZnVuY3Rpb24oKXtcblx0XHR2YXIgZWRpdGFyZWEgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZWRpdGFyZWEpO1xuXHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdH0sXG4gICAgLy8gcmVuZGVyIGZ1bmN0aW9ucyAgXG5cdGdlbkVkaXRBcmVhOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHNob3dIdG1sID0gdGhpcy5zdGF0ZS5lZGl0b3JTdGF0ZS5zaG93SHRtbDtcblx0XHRpZihzaG93SHRtbCl7XG5cdFx0XHRyZXR1cm4gKDxFZGl0b3JUZXh0QXJlYSByZWY9XCJlZGl0YXJlYVwiIC8+KVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuICg8RWRpdG9yQ29udGVudEVkaXRhYmxlRGl2IHJlZj1cImVkaXRhcmVhXCIgb25SYW5nZUNoYW5nZT17dGhpcy5oYW5kbGVSYW5nZUNoYW5nZX0vPilcdFx0XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHR2YXIgZWRpdEFyZWEgPSB0aGlzLmdlbkVkaXRBcmVhKCk7XG5cdFx0dmFyIHtvbkJsdXIsY2xhc3NOYW1lLGlkLG9uRm9jdXMsb25DbGljaywuLi5wcm9wc30gPSB0aGlzLnByb3BzO1xuXHRcdHZhciBlZGl0b3JTdGF0ZSA9IHRoaXMuc3RhdGUuZWRpdG9yU3RhdGU7XG5cdFx0dmFyIHtmb250U2l6ZSxwYXJhZ3JhcGgsZm9udEZhbWlseX0gPSB0aGlzLnByb3BzO1xuXHRcdHJldHVybiAoPGRpdiByZWY9XCJyb290XCIgaWQ9e2lkfSBjbGFzc05hbWU9e1wiZWRpdG9yLWNvbnRhaW5lciBlZGl0b3ItZGVmYXVsdFwiICsoY2xhc3NOYW1lP1wiIFwiK2NsYXNzTmFtZTpcIlwiKX0gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30gb25CbHVyPXt0aGlzLmhhbmRsZVJhbmdlQ2hhbmdlfSAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c30gey4uLnByb3BzfT5cblx0XHRcdFx0PEVkaXRvclRvb2xiYXIgcmVmPVwidG9vbGJhclwiIGVkaXRvclN0YXRlPXtlZGl0b3JTdGF0ZX0gb25JY29uQ2xpY2s9e3RoaXMuaGFuZGxlVG9vbGJhckljb25DbGlja30gaWNvbnM9e3RoaXMucHJvcHMuaWNvbnN9IHBhcmFncmFwaD17dGhpcy5wcm9wcy5wYXJhZ3JhcGh9ICBmb250c2l6ZT17dGhpcy5wcm9wcy5mb250U2l6ZX0gIGZvbnRmYW1pbHk9e3RoaXMucHJvcHMuZm9udEZhbWlseX0+XG5cdFx0XHRcdFx0PEltYWdlRGlhbG9nIHJlZj1cImltYWdlXCIgdXBsb2FkZXI9e3RoaXMucHJvcHMucGx1Z2lucy5pbWFnZS51cGxvYWRlcn0gY3VzdG9tVXBsb2FkZXI9e3RoaXMucHJvcHMucGx1Z2lucy5pbWFnZS5jdXN0b21VcGxvYWRlcn0vPlxuXHRcdFx0XHRcdDxDb2xvckRyb3Bkb3duIHJlZj1cImNvbG9yXCIgLz5cblx0XHRcdFx0XHQ8Rm9ybXVsYURyb3Bkb3duIHJlZj1cImZvcm11bGFcIi8+XG5cdFx0XHRcdFx0PFRhYmxlUGlja2VyRHJvcGRvd24gcmVmPVwidGFibGVcIiAvPlxuXHRcdFx0XHRcdDxTcGVjaWFsQ2hhcnNEaWFsb2cgcmVmPVwic3BlY2lhbFwiIC8+XG5cdFx0XHRcdFx0PEVtb3Rpb25EaWFsb2cgcmVmPVwiZW1vdGlvblwiIC8+XG5cdFx0XHRcdFx0PEZvbnRTaXplQ29tYm9Cb3ggcmVmPVwiZm9udHNpemVcIiBmb250c2l6ZT17dGhpcy5wcm9wcy5mb250U2l6ZX0gdmFsdWU9e2VkaXRvclN0YXRlLmljb25zW1wiZm9udHNpemVcIl0/ZWRpdG9yU3RhdGUuaWNvbnNbXCJmb250c2l6ZVwiXS52YWx1ZTogZm9udFNpemVbMF0udmFsdWV9Lz5cblx0XHRcdFx0XHQ8Rm9udEZhbWlseUNvbWJvQm94IHJlZj1cImZvbnRmYW1pbHlcIiBmb250ZmFtaWx5PXt0aGlzLnByb3BzLmZvbnRGYW1pbHl9IHZhbHVlPXtlZGl0b3JTdGF0ZS5pY29uc1tcImZvbnRmYW1pbHlcIl0/ZWRpdG9yU3RhdGUuaWNvbnNbXCJmb250ZmFtaWx5XCJdLnZhbHVlOiBmb250RmFtaWx5WzBdLnZhbHVlfS8+XG5cdFx0XHRcdFx0PFBhcmFncmFwaENvbWJvQm94IHJlZj1cInBhcmFncmFwaFwiIHBhcmFncmFwaD17dGhpcy5wcm9wcy5wYXJhZ3JhcGh9IHZhbHVlPXtlZGl0b3JTdGF0ZS5pY29uc1tcInBhcmFncmFwaFwiXT9lZGl0b3JTdGF0ZS5pY29uc1tcInBhcmFncmFwaFwiXS52YWx1ZTogcGFyYWdyYXBoWzBdLnZhbHVlfS8+XG5cdFx0XHRcdDwvRWRpdG9yVG9vbGJhcj5cblx0XHRcdFx0e2VkaXRBcmVhfVxuXHRcdFx0XHQ8RWRpdG9yUmVzaXplIHJlZj1cInJlc2l6ZVwiIC8+XG5cdFx0XHRcdDwvZGl2Pilcblx0fVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3I7Il19
