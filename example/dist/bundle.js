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
					props.value
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
	getIcons: function getIcons() {
		var editorState = this.props.editorState;
		editorState.icons["undo"] = { disabled: !EditorHistory.canUndo() };
		editorState.icons["redo"] = { disabled: !EditorHistory.canRedo() };

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
		return React.createElement(
			ComboBox,
			{ ref: 'root', className: 'color-combobox' },
			React.createElement(
				'ul',
				null,
				fontfamily.map(function (ele, pos) {
					return React.createElement(
						'li',
						{ key: pos, 'data-value': ele.value, onClick: handleSelect },
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
		return React.createElement(
			ComboBox,
			{ ref: 'root', className: 'color-combobox' },
			React.createElement(
				'ul',
				null,
				fontsize.map(function (ele, pos) {
					return React.createElement(
						'li',
						{ key: pos, 'data-value': ele.value, onClick: handleSelect },
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
		return React.createElement(
			ComboBox,
			{ ref: 'root', className: 'color-combobox' },
			React.createElement(
				'ul',
				null,
				paragraph.map(function (ele, pos) {
					return React.createElement(
						'li',
						{ key: pos, 'data-value': ele.value, onClick: handleSelect },
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
						rangeState["paragraph"] = { value: "p", icon: "paragraph" };
						rangeState["fontfamily"] = { value: fontFamily, icon: "fontfamily" };
						rangeState["fontsize"] = { value: fontSize, icon: "fontsize" };
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
			"fontFamily": [{ "name": "宋体", value: "宋体,SimSun", defualt: true }, { "name": "隶书", value: "隶书,SimLi" }, { "name": "楷体", value: "楷体,SimKai" }, { "name": "微软雅黑", value: "微软雅黑,Microsoft YaHei" }, { "name": "黑体", value: "黑体,SimHei" }, { "name": "arial", value: "arial,helvetica,sans-serif" }, { "name": "arial black", value: "arial black,avant garde" }, { "name": "omic sans ms", value: "omic sans ms" }, { "name": "impact", value: "impact,chicago" }, { "name": "times new roman", value: "times new roman" }, { "name": "andale mono", value: "andale mono" }],
			"fontSize": [{ "name": "12px", value: "12px", defualt: true }, { "name": "14px", value: "14px" }, { "name": "16px", value: "16px" }, { "name": "18px", value: "18px" }, { "name": "20px", value: "20px" }, { "name": "24px", value: "24px" }, { "name": "28px", value: "28px" }, { "name": "32px", value: "32px" }, { "name": "36px", value: "32px" }],
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
		EditorDOM.stopPropagation(e);
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
		EditorDOM.stopPropagation(e);
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
					EditorHistory.execCommand('fontfamily', false, fontfamily);
					handleRangeChange();
				});
				break;
			case "paragraph":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;

				this.refs.paragraph.open(offsetPosition, function (e, paragraph) {
					editarea.focus();
					EditorSelection.restoreRange();
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

		return React.createElement(
			'div',
			_extends({ ref: 'root', id: id, className: "editor-container editor-default" + (className ? " " + className : ""), onClick: this.handleClick, onBlur: this.handleRangeChange, onFocus: this.handleFocus }, props),
			React.createElement(
				EditorToolbar,
				{ ref: 'toolbar', editorState: this.state.editorState, onIconClick: this.handleToolbarIconClick, icons: this.props.icons, paragraph: this.props.paragraph, fontsize: this.props.fontSize, fontfamily: this.props.fontFamily },
				React.createElement(ImageDialog, { ref: 'image', uploader: this.props.plugins.image.uploader, customUploader: this.props.plugins.image.customUploader }),
				React.createElement(ColorDropdown, { ref: 'color' }),
				React.createElement(FormulaDropdown, { ref: 'formula' }),
				React.createElement(TablePickerDropdown, { ref: 'table' }),
				React.createElement(SpecialCharsDialog, { ref: 'special' }),
				React.createElement(EmotionDialog, { ref: 'emotion' }),
				React.createElement(FontSizeComboBox, { ref: 'fontsize', fontsize: this.props.fontSize }),
				React.createElement(FontFamilyComboBox, { ref: 'fontfamily', fontfamily: this.props.fontFamily }),
				React.createElement(ParagraphComboBox, { ref: 'paragraph', paragraph: this.props.paragraph })
			),
			editArea,
			React.createElement(EditorResize, { ref: 'resize' })
		);
	}
});

module.exports = Editor;

},{"./components/core/EditorContentEditableDiv.react":5,"./components/core/EditorTextArea.react":7,"./components/core/EditorToolbar.react":8,"./components/plugins/ColorDropdown.react":9,"./components/plugins/EmotionDialog.react":10,"./components/plugins/FontFamilyComboBox.react":11,"./components/plugins/FontSizeComboBox.react":12,"./components/plugins/FormulaDropdown.react":13,"./components/plugins/ImageDialog.react":14,"./components/plugins/ParagraphComboBox.react":15,"./components/plugins/SpecialCharsDialog.react":16,"./components/plugins/TablePickerDropdown.react":17,"./constants/EditorConstants":18,"./utils/EditorDOM":19,"./utils/EditorHistory":20,"./utils/EditorResize.react":21,"./utils/EditorSelection":22,"./utils/EditorTimer":23,"react":undefined,"react-dom":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2xpdWhvbmcvd29ya2Rpci9yZWFjdC1lZGl0b3Ivc3JjL2NvbXBvbmVudHMvYmFzZS9Db21ib0JveC5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL2Jhc2UvRGlhbG9nLnJlYWN0LmpzIiwiL1VzZXJzL2xpdWhvbmcvd29ya2Rpci9yZWFjdC1lZGl0b3Ivc3JjL2NvbXBvbmVudHMvYmFzZS9Ecm9wZG93bi5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL2Jhc2UvVGFiR3JvdXAucmVhY3QuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvY29tcG9uZW50cy9jb3JlL0VkaXRvckNvbnRlbnRFZGl0YWJsZURpdi5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL2NvcmUvRWRpdG9ySWNvbi5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL2NvcmUvRWRpdG9yVGV4dEFyZWEucmVhY3QuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvY29tcG9uZW50cy9jb3JlL0VkaXRvclRvb2xiYXIucmVhY3QuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvY29tcG9uZW50cy9wbHVnaW5zL0NvbG9yRHJvcGRvd24ucmVhY3QuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvY29tcG9uZW50cy9wbHVnaW5zL0Vtb3Rpb25EaWFsb2cucmVhY3QuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvY29tcG9uZW50cy9wbHVnaW5zL0ZvbnRGYW1pbHlDb21ib0JveC5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL3BsdWdpbnMvRm9udFNpemVDb21ib0JveC5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL3BsdWdpbnMvRm9ybXVsYURyb3Bkb3duLnJlYWN0LmpzIiwiL1VzZXJzL2xpdWhvbmcvd29ya2Rpci9yZWFjdC1lZGl0b3Ivc3JjL2NvbXBvbmVudHMvcGx1Z2lucy9JbWFnZURpYWxvZy5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL3BsdWdpbnMvUGFyYWdyYXBoQ29tYm9Cb3gucmVhY3QuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvY29tcG9uZW50cy9wbHVnaW5zL1NwZWNpYWxDaGFyc0RpYWxvZy5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb21wb25lbnRzL3BsdWdpbnMvVGFibGVQaWNrZXJEcm9wZG93bi5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9jb25zdGFudHMvRWRpdG9yQ29uc3RhbnRzLmpzIiwiL1VzZXJzL2xpdWhvbmcvd29ya2Rpci9yZWFjdC1lZGl0b3Ivc3JjL3V0aWxzL0VkaXRvckRPTS5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy91dGlscy9FZGl0b3JIaXN0b3J5LmpzIiwiL1VzZXJzL2xpdWhvbmcvd29ya2Rpci9yZWFjdC1lZGl0b3Ivc3JjL3V0aWxzL0VkaXRvclJlc2l6ZS5yZWFjdC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy91dGlscy9FZGl0b3JTZWxlY3Rpb24uanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvdXRpbHMvRWRpdG9yVGltZXIuanMiLCIvVXNlcnMvbGl1aG9uZy93b3JrZGlyL3JlYWN0LWVkaXRvci9zcmMvdXRpbHMvRmlsZVVwbG9hZC5qcyIsIi9Vc2Vycy9saXVob25nL3dvcmtkaXIvcmVhY3QtZWRpdG9yL3NyYy9lZGl0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRTdCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUNoQyxnQkFBZSxFQUFDLDJCQUFVO0FBQ3pCLFNBQU87QUFDTixPQUFJLEVBQUMsS0FBSztBQUNWLFdBQVEsRUFBQztBQUNSLEtBQUMsRUFBQyxDQUFDO0FBQ0gsS0FBQyxFQUFDLENBQUM7SUFDSDtHQUNELENBQUE7RUFDRDtBQUNELGtCQUFpQixFQUFDLDZCQUFVO0FBQzNCLFFBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQzVDO0FBQ0QscUJBQW9CLEVBQUMsZ0NBQVU7QUFDOUIsUUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDL0M7QUFDRCxLQUFJLEVBQUMsY0FBUyxRQUFRLEVBQUM7QUFDdEIsTUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLE9BQUksRUFBQyxJQUFJO0FBQ1QsV0FBUSxFQUFDLFFBQVE7R0FDakIsQ0FBQyxDQUFBO0VBQ0Y7QUFDRCxNQUFLLEVBQUMsaUJBQVU7QUFDZixNQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTztBQUM1QixNQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsT0FBSSxFQUFDLEtBQUs7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RSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7QUFDdmdCLE1BQUksRUFBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQztBQUM3USxNQUFJLEVBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUM7QUFDalYsTUFBSSxFQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7QUFDOVgsTUFBSSxFQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztBQUM5SCxNQUFJLEVBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0FBQzNTLE1BQUksRUFBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztFQUNsUTtBQUNELFlBQVcsRUFBQztBQUNYLE1BQUksRUFBQyxFQUFFLElBQUksRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsTUFBTSxFQUFDO0FBQzdDLE1BQUksRUFBQyxFQUFFLElBQUksRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsTUFBTSxFQUFDO0FBQzlDLE1BQUksRUFBQyxFQUFFLElBQUksRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsTUFBTSxFQUFDO0FBQzlDLE1BQUksRUFBQyxFQUFFLElBQUksRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsT0FBTyxFQUFDO0FBQ2hELE1BQUksRUFBQyxFQUFFLElBQUksRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsVUFBVSxFQUFDO0FBQ3BELE1BQUksRUFBQyxFQUFFLElBQUksRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsT0FBTyxFQUFDO0FBQzdDLE1BQUksRUFBQyxFQUFFLElBQUksRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxJQUFJ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USxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEUsWUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3RDO0dBQ0Q7QUFDRCxPQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztBQUNsQyxZQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3RELE9BQUcsQUFBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFDO0FBQ2xJLGFBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pFLGFBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO0lBQ2pFO0dBQ0Q7QUFDRCxVQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFTLEdBQUcsRUFBQyxHQUFHLEVBQUM7QUFBQyxVQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUE7R0FBQyxD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QUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQ3pDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQzVCLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQzVCLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQzVCLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQzVCLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQzVCLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQzVCLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQzVCLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLENBQzVCO0FBQ0QsY0FBVyxFQUFFLENBQ1osRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxFQUNwQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxFQUN6QixFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxFQUN6QixFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxFQUN6QixFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxFQUN6QixFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxFQUN6QixFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxDQUN6QjtHQUNELENBQUE7RUFDRDtBQUNELGtCQUFpQixFQUFDLDZCQUFVO0FBQzNCLGVBQWEsQ0FBQyxL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bnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgQ29tYm9Cb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRzaG93OmZhbHNlLFxuXHRcdFx0cG9zaXRpb246e1xuXHRcdFx0XHR4OjAsXG5cdFx0XHRcdHk6MFxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQ6ZnVuY3Rpb24oKXtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5jbG9zZSk7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50OmZ1bmN0aW9uKCl7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuY2xvc2UpO1xuXHR9LFxuXHRvcGVuOmZ1bmN0aW9uKHBvc2l0aW9uKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNob3c6dHJ1ZSxcblx0XHRcdHBvc2l0aW9uOnBvc2l0aW9uXG5cdFx0fSlcblx0fSxcblx0Y2xvc2U6ZnVuY3Rpb24oKXtcblx0XHRpZighdGhpcy5zdGF0ZS5zaG93KSByZXR1cm47XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzaG93OmZhbHNlXG5cdFx0fSlcblx0fSxcblx0dG9nZ2xlOmZ1bmN0aW9uKHBvc2l0aW9uKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNob3c6IXRoaXMuc3RhdGUuc2hvdyxcblx0XHRcdHBvc2l0aW9uOnBvc2l0aW9uXG5cdFx0fSlcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHtjbGFzc05hbWUsc3R5bGUsLi4ucHJvcHN9ID0gdGhpcy5wcm9wcztcblx0XHRzdHlsZSA9IHN0eWxlIHx8IHt9O1xuXHRcdGlmKCF0aGlzLnN0YXRlLnNob3cpe1xuXHRcdFx0IHN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuXHRcdH1lbHNle1xuXHRcdFx0c3R5bGVbXCJkaXNwbGF5XCJdID0gXCJcIjtcdCBcblx0XHR9XG5cdFx0aWYodGhpcy5zdGF0ZS5wb3NpdGlvbil7XG5cdFx0XHRzdHlsZVtcImxlZnRcIl0gPSB0aGlzLnN0YXRlLnBvc2l0aW9uLng7XG5cdFx0XHRzdHlsZVtcInRvcFwiXSA9IHRoaXMuc3RhdGUucG9zaXRpb24ueTtcblx0XHR9XG5cdFx0XHQgXG5cdFx0cmV0dXJuICg8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtcImNvbWJvYm94XCIrKGNsYXNzTmFtZT9cIiBcIitjbGFzc05hbWU6XCJcIil9IHsuLi5wcm9wc30+XG5cdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHQ8L2Rpdj4pXG5cdH1cbn0pXG5cdFx0XG5tb2R1bGUuZXhwb3J0cyA9IENvbWJvQm94OyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbi8qKlxuKiBAd2lkdGg6IOWvueivneahhuWuveW6plxuKiBAaGVpZ2h0OiDlr7nor53moYbpq5jluqZcbiogQHN0eWxlOiDmoLflvI9cbiogQGJ1dHRvbnM6IOWvueivneahhuaMiemSrue7hFxuKiBAdGl0bGU6IOWvueivneahhuagh+mimFxuKiBAY2xhc3NOYW1lOiDlr7nor53moYbnsbvlkI1cbioqL1xudmFyIERpYWxvZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNob3c6ZmFsc2Vcblx0XHR9XG5cdH0sXG5cdGNvbXBvbmVudERpZE1vdW50OmZ1bmN0aW9uKCl7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuY2xvc2UpO1xuXHR9LFxuXHRjb21wb25lbnRXaWxsVW5tb3VudDpmdW5jdGlvbigpe1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLmNsb3NlKTtcblx0fSxcblx0b3BlbjpmdW5jdGlvbigpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0c2hvdzp0cnVlXG5cdFx0fSlcblx0fSxcblx0Y2xvc2U6ZnVuY3Rpb24oKXtcblx0XHRpZighdGhpcy5zdGF0ZS5zaG93KSByZXR1cm47XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzaG93OmZhbHNlXG5cdFx0fSlcblx0fSxcblx0dG9nZ2xlOmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzaG93OiF0aGlzLnN0YXRlLnNob3dcblx0XHR9KVxuXHR9LFxuXHRoYW5kbGVNb3VzZURvd246ZnVuY3Rpb24oZSl7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0aWYoZS5zdG9wUHJvcGFnYXRpb24pe1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdH1lbHNle1xuXHRcdFx0ZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuXHRcdH1cblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHsuLi5wcm9wcyxjbGFzc05hbWUsYnV0dG9ucyx0aXRsZSxzdHlsZSx3aWR0aCxoZWlnaHR9ID0gdGhpcy5wcm9wcztcblx0XHR2YXIgc3R5bGUgPSBzdHlsZT9zdHlsZTp7fTtcblx0XHQgaWYod2lkdGgpe1xuXHRcdFx0c3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdHN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLzI7XG5cdFx0fVxuXHRcdGlmKGhlaWdodCl7XG5cdFx0XHRzdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0fVxuXHRcdHN0eWxlLmRpc3BsYXkgPSB0aGlzLnN0YXRlLnNob3cgPyBcIlwiIDogXCJub25lXCI7XG5cdFx0dmFyIF9jbGFzc05hbWUgPSBcImRpYWxvZ1wiKyhjbGFzc05hbWU/XCIgXCIrY2xhc3NOYW1lOlwiXCIpO1xuXHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctY29udGFpbmVyXCIgICByZWY9XCJyb290XCIgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e19jbGFzc05hbWV9IHJlZj1cImRpYWxvZ1wiIHN0eWxlPXtzdHlsZX0+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctaGVhZGVyXCIgcmVmPVwiaGVhZGVyXCI+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJkaWFsb2ctY2xvc2VcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xvc2V9PjwvYT5cblx0XHRcdCBcdFx0XHQ8aDMgY2xhc3NOYW1lPVwiZGlhbG9nLXRpdGxlXCI+XG5cdFx0XHQgXHRcdFx0XHR7dGl0bGV9XG5cdFx0XHQgXHRcdFx0PC9oMz5cblx0XHRcdCBcdFx0PC9kaXY+XG5cdFx0XHQgXHRcdDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWJvZHlcIiByZWY9XCJib2R5XCI+XG5cdFx0XHQgXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdCBcdFx0PC9kaXY+XG5cdFx0XHQgXHRcdDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWZvb3RlclwiIHJlZj1cImZvb3RlclwiPlxuXHRcdFx0IFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0YnV0dG9ucy5tYXAoZnVuY3Rpb24oZWxlLHBvcyl7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuICg8YSBjbGFzc05hbWU9XCJkaWFsb2ctYnV0dG9uXCIga2V5PXtwb3N9IGRhdGEtbmFtZT17ZWxlLm5hbWV9IG9uQ2xpY2s9e2VsZS5vbkNsaWNrfT57ZWxlLmNvbnRlbnR9PC9hPilcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdCBcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1iYWNrZHJvcFwiIHJlZj1cImJhY2tkcm9wXCIgc3R5bGU9e3tcImRpc3BsYXlcIjp0aGlzLnN0YXRlLnNob3c/XCJcIjpcIm5vbmVcIn19PjwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj4pXG5cdH1cbn0pXG5cdFx0XHQgXG5tb2R1bGUuZXhwb3J0cyA9IERpYWxvZzsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgRHJvcGRvd24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRzaG93OmZhbHNlLFxuXHRcdFx0cG9zaXRpb246e1xuXHRcdFx0XHR4OjAsXG5cdFx0XHRcdHk6MFxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQ6ZnVuY3Rpb24oKXtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5jbG9zZSk7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50OmZ1bmN0aW9uKCl7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuY2xvc2UpO1xuXHR9LFxuXHRvcGVuOmZ1bmN0aW9uKHBvc2l0aW9uKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNob3c6dHJ1ZSxcblx0XHRcdHBvc2l0aW9uOnBvc2l0aW9uXG5cdFx0fSlcblx0fSxcblx0Y2xvc2U6ZnVuY3Rpb24oKXtcblx0XHRpZighdGhpcy5zdGF0ZS5zaG93KSByZXR1cm47XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzaG93OmZhbHNlXG5cdFx0fSlcblx0fSxcblx0dG9nZ2xlOmZ1bmN0aW9uKHBvc2l0aW9uKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNob3c6IXRoaXMuc3RhdGUuc2hvdyxcblx0XHRcdHBvc2l0aW9uOnBvc2l0aW9uXG5cdFx0fSlcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHtjbGFzc05hbWUsc3R5bGUsLi4ucHJvcHN9ID0gdGhpcy5wcm9wcztcblx0XHRzdHlsZSA9IHN0eWxlIHx8IHt9O1xuXHRcdGlmKCF0aGlzLnN0YXRlLnNob3cpe1xuXHRcdFx0IHN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuXHRcdH1lbHNle1xuXHRcdFx0c3R5bGVbXCJkaXNwbGF5XCJdID0gXCJcIjtcdCBcblx0XHR9XG5cdFx0aWYodGhpcy5zdGF0ZS5wb3NpdGlvbil7XG5cdFx0XHRzdHlsZVtcImxlZnRcIl0gPSB0aGlzLnN0YXRlLnBvc2l0aW9uLng7XG5cdFx0XHRzdHlsZVtcInRvcFwiXSA9IHRoaXMuc3RhdGUucG9zaXRpb24ueTtcblx0XHR9XG5cdFx0XHQgXG5cdFx0cmV0dXJuICg8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtcImRyb3Bkb3duXCIrKGNsYXNzTmFtZT9cIiBcIitjbGFzc05hbWU6XCJcIil9IHsuLi5wcm9wc30+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duLWNhcmV0XCI+PC9kaXY+XHRcdFxuXHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0PC9kaXY+KVxuXHR9XG59KVxuXHRcdFxubW9kdWxlLmV4cG9ydHMgPSBEcm9wZG93bjsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgVGFiR3JvdXAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHR0YWJJbmRleDowXG5cdFx0fVxuXHR9LFxuXHRzZXRUYWJJbmRleDpmdW5jdGlvbihpbmRleCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHR0YWJJbmRleDppbmRleFxuXHRcdH0pXG5cdH0sXG5cdGdldFRhYkluZGV4OmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUudGFiSW5kZXg7XG5cdH0sXG5cdGhhbmRsZUNsaWNrOmZ1bmN0aW9uKGUpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cdFx0dmFyIGluZGV4ID0gcGFyc2VJbnQodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIikpO1xuXHRcdHRoaXMuc2V0VGFiSW5kZXgoaW5kZXgpO1xuXHRcdGlmKGUuc3RvcFByb3BhZ2F0aW9uKXtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKClcblx0XHR9ZWxzZXtcblx0XHRcdGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciB0YWJJbmRleCA9IHRoaXMuc3RhdGUudGFiSW5kZXg7XG5cdFx0dmFyIHRhYnMgPSB0aGlzLnByb3BzLnRhYnM7XG5cdFx0dmFyIGNvbXBvbmVudCA9IHRhYnNbdGFiSW5kZXhdLmNvbXBvbmVudDtcblx0XHR2YXIgaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrO1xuXHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJ0YWItZ3JvdXBcIj5cblx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cInRhYi1uYXZcIj5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0YWJzLm1hcChmdW5jdGlvbihlbGUscG9zKXtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICg8bGkga2V5PXtwb3N9IGNsYXNzTmFtZT17XCJ0YWItaXRlbVwiKyh0YWJJbmRleD09cG9zP1wiIGFjdGl2ZVwiOlwiXCIpfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YSBkYXRhLWluZGV4PXtwb3N9IGNsYXNzTmFtZT1cInRhYi10ZXh0XCIgb25DbGljaz17aGFuZGxlQ2xpY2t9PntlbGUudGl0bGV9PC9hPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPilcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRhYi1jb250ZW50XCI+XG5cdFx0XHRcdFx0e2NvbXBvbmVudH1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj4pXG5cdH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gVGFiR3JvdXA7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xudmFyIEVkaXRvclNlbGVjdGlvbiA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0VkaXRvclNlbGVjdGlvbicpO1xudmFyIEVkaXRvckRPTSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0VkaXRvckRPTScpO1xuXG52YXIgRWRpdG9yQ29udGVudEVkaXRhYmxlRGl2ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y29udGVudDpcIlwiXG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbihlKXtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLHRoaXMuaGFuZGxlV2luZG93TW91c2VEb3duKTtcblx0fSxcblx0Y29tcG9uZW50V2lsbFVubW91bnQ6ZnVuY3Rpb24oZSl7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIix0aGlzLmhhbmRsZVdpbmRvd01vdXNlRG93bik7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxVcGRhdGU6ZnVuY3Rpb24oZSl7XG5cdFx0RWRpdG9yU2VsZWN0aW9uLmNsb25lUmFuZ2UoKTtcblx0fSxcblx0Y29tcG9uZW50RGlkVXBkYXRlOmZ1bmN0aW9uKGUpe1xuXHRcdEVkaXRvclNlbGVjdGlvbi5jbG9uZVJhbmdlKCk7XG5cdH0sXG5cdGdldENvbnRlbnQ6ZnVuY3Rpb24oKXtcblx0XHR2YXIgdGFyZ2V0ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnJvb3QpO1xuXHRcdHJldHVybiB0YXJnZXQuaW5uZXJIVE1MO1xuXHR9LFxuXHRzZXRDb250ZW50OmZ1bmN0aW9uKGNvbnRlbnQpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y29udGVudDpjb250ZW50XG5cdFx0fSlcblx0fSxcblx0Z2V0TmFtZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiBcImRpdlwiO1xuXHR9LFxuXHRoYW5kbGVXaW5kb3dNb3VzZURvd246ZnVuY3Rpb24oZSl7XG5cdFx0RWRpdG9yU2VsZWN0aW9uLmNsZWFyUmFuZ2UoKTtcblx0fSxcblx0aGFuZGxlTW91c2VEb3duOmZ1bmN0aW9uKGUpe1xuXHRcdEVkaXRvclNlbGVjdGlvbi5jbGVhclJhbmdlKCk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsdGhpcy5oYW5kbGVNb3VzZVVwKTtcblx0XHRFZGl0b3JET00uc3RvcFByb3BhZ2F0aW9uKGUpO1xuXHR9LFxuXHRoYW5kbGVNb3VzZVVwOmZ1bmN0aW9uKGUpe1xuXHRcdEVkaXRvclNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMuaGFuZGxlTW91c2VVcCk7XG5cdFx0XG5cdFx0aWYodGhpcy5wcm9wcy5vblJhbmdlQ2hhbmdlKSBcblx0XHRcdHRoaXMucHJvcHMub25SYW5nZUNoYW5nZShlKTtcblx0XHRFZGl0b3JET00uc3RvcFByb3BhZ2F0aW9uKGUpO1xuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKDxkaXYgcmVmPVwicm9vdFwiIGNsYXNzTmFtZT1cImVkaXRvci1jb250ZW50ZWRpdGFibGUtZGl2XCIgXG5cdFx0XHRcdG9uTW91c2VVcD17dGhpcy5oYW5kbGVNb3VzZVVwfSBcblx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufVxuXHRcdFx0XHRjb250ZW50RWRpdGFibGU9e3RydWV9IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOnRoaXMuc3RhdGUuY29udGVudH19PjwvZGl2Pilcblx0fVxufSlcbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yQ29udGVudEVkaXRhYmxlRGl2OyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbi8qKlxuKiBAaWNvbjog5Zu+5qCH5ZCN56ewIHN0cmluZ1xuKiBAZGlzYWJsZWQ6IOaYr+WQpuemgeeUqCBib29sXG4qIEBvbkNsaWNrOiDmmrTpnLLngrnlh7vkuovku7YgZnVuY3Rpb25cbiogQHRpdGxlOiDmj5DnpLogc3RyaW5nXG4qIEBhY3RpdmU6IOaYr+WQpumAieS4rSBib29sXG4qIEBzaG93SHRtbDog5piv5ZCm5b2T5YmN5piv5pi+56S6aHRtbOWxnuaAp1xuKiBAY29sb3I6IOWJjeaZr+iJsuWSjOiDjOaZr+iJslxuKiovXG52YXIgRWRpdG9ySWNvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Y29tcG9uZW50RGlkTW91bnQ6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnVwZGF0ZVN0eWxlKCk7XG5cdH0sXG5cdGNvbXBvbmVudERpZFVwZGF0ZTpmdW5jdGlvbigpe1xuXHRcdHRoaXMudXBkYXRlU3R5bGUoKTtcblx0fSxcblx0dXBkYXRlU3R5bGU6ZnVuY3Rpb24oKXtcblx0XHR2YXIgcm9vdCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5yb290KTtcblx0XHR2YXIgaWNvbiA9IHRoaXMucHJvcHMuaWNvbjtcblx0XHRzd2l0Y2godGhpcy5wcm9wcy5pY29uKXtcblx0XHRcdGNhc2UgXCJmb3JlY29sb3JcIjpcblx0XHRcdGNhc2UgXCJiYWNrY29sb3JcIjpcblx0XHRcdFx0dmFyIGNvbG9yID0gdGhpcy5wcm9wcy5jb2xvcj90aGlzLnByb3BzLmNvbG9yOlwidHJhbnNwYXJlbnRcIjtcblx0XHRcdFx0cm9vdC5pZCA9IGljb24rXCJfXCIrbmV3IERhdGUoKS52YWx1ZU9mKCk7XG5cdFx0XHRcdHZhciBzdHlsZSA9IHJvb3QuY2hpbGRFbGVtZW50Q291bnQ+MD8gcm9vdC5jaGlsZHJlblswXTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0XHRcdFx0c3R5bGUuaW5uZXJIVE1MID0gXCIuaWNvbi1cIitpY29uK1wiI1wiK3Jvb3QuaWQrXCI6YmVmb3Jle2NvbnRlbnQ6Jyc7Ym9yZGVyLWJvdHRvbTozcHggc29saWQgXCIrY29sb3IrXCI7fVwiO1xuXHRcdFx0XHRpZihyb290LmNoaWxkRWxlbWVudENvdW50PT0wKSBcblx0XHRcdFx0XHRyb290LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9LFxuXHRoYW5kbGVDbGljazpmdW5jdGlvbihlKXtcblx0XHR2YXIge29uQ2xpY2ssLi4ucHJvcHN9ID0gdGhpcy5wcm9wcztcblx0XHRpZih0aGlzLnByb3BzLm9uQ2xpY2spe1xuXHRcdFx0dGhpcy5wcm9wcy5vbkNsaWNrKGUsey4uLnByb3BzfSlcblx0XHR9XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciB7aWNvbixhY3RpdmUsZGlzYWJsZWQsc2hvd0h0bWwsb25DbGljaywuLi5wcm9wc30gPSB0aGlzLnByb3BzO1xuXHRcdHZhciBfZGlzYWJsZWQgPSBzaG93SHRtbCAmJiAoaWNvbiE9XCJzb3VyY2VcIiAmJiBpY29uIT1cInNlcGFyYXRvclwiKTtcblx0XHR2YXIgX2NsYXNzTmFtZSA9IFwiZWRpdG9yLWljb24gaWNvbi1cIiArIGljb24gKyAoYWN0aXZlID8gXCIgYWN0aXZlXCIgOiBcIlwiKSArIChkaXNhYmxlZCB8fCBfZGlzYWJsZWQgPyBcIiBkaXNhYmxlZFwiIDogXCJcIik7XG5cdFx0aWYoaWNvbj09XCJmb250c2l6ZVwiIHx8IGljb249PVwiZm9udGZhbWlseVwiIHx8IGljb24gPT0gXCJwYXJhZ3JhcGhcIil7XG5cdFx0XHRyZXR1cm4gKDxzcGFuIHJlZj1cInJvb3RcIiBjbGFzc05hbWU9e19jbGFzc05hbWV9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IHsuLi5wcm9wc30+IFxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uLWxhYmVsXCI+e3Byb3BzLnZhbHVlfTwvc3Bhbj5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1jYXJldFwiPjwvc3Bhbj5cblx0XHRcdFx0PC9zcGFuPilcblx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuICg8c3BhbiByZWY9XCJyb290XCIgY2xhc3NOYW1lPXtfY2xhc3NOYW1lfSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSB7Li4ucHJvcHN9Pjwvc3Bhbj4pXG5cdFx0fVxuXHR9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvckljb247IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuXG52YXIgRWRpdG9yVGV4dEFyZWEgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb250ZW50OlwiXCJcblx0XHR9XG5cdH0sXG5cdGdldENvbnRlbnQ6ZnVuY3Rpb24oKXtcblx0XHR2YXIgdGFyZ2V0ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnJvb3QpO1xuXHRcdHJldHVybiB0YXJnZXQudmFsdWU7XG5cdH0sXG5cdHNldENvbnRlbnQ6ZnVuY3Rpb24oY29udGVudCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjb250ZW50OmNvbnRlbnRcblx0XHR9KVxuXHR9LFxuXHRnZXROYW1lOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIFwidGV4dGFyZWFcIjtcblx0fSxcblx0aGFuZGxlQ2hhbmdlOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHRhcmdldCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5yb290KTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGNvbnRlbnQ6dGFyZ2V0LnZhbHVlXG5cdFx0fSlcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuICg8dGV4dGFyZWEgcmVmPVwicm9vdFwiIGNsYXNzTmFtZT1cImVkaXRvci10ZXh0YXJlYVwiIHZhbHVlPXt0aGlzLnN0YXRlLmNvbnRlbnR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0+PC90ZXh0YXJlYT4pXG5cdH1cbn0pXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvclRleHRBcmVhOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRWRpdG9ySWNvbiA9IHJlcXVpcmUoJy4vRWRpdG9ySWNvbi5yZWFjdCcpO1xudmFyIHsgXG5cdEVkaXRvckljb25UeXBlc1xufSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9FZGl0b3JDb25zdGFudHMnKTtcbnZhciBFZGl0b3JIaXN0b3J5ID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvRWRpdG9ySGlzdG9yeScpO1xuXG52YXIgRWRpdG9yVG9vbGJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOntcblx0XHRpY29uczpSZWFjdC5Qcm9wVHlwZXMuYXJyYXlcblx0fSxcblx0Z2V0RGVmYXVsdFByb3BzOmZ1bmN0aW9uKCl7XG5cdFx0Ly8gdmlkZW8gbWFwIHByaW50IHByZXZpZXcgZHJhZnRzIGxpbmsgdW5saW5rXG5cdFx0cmV0dXJuIHtcblx0XHRcdGljb25zOltcblx0XHRcdFx0XCJzb3VyY2UgfCB1bmRvIHJlZG8gfCBib2xkIGl0YWxpYyB1bmRlcmxpbmUgc3RyaWtldGhyb3VnaCBmb250Ym9yZGVyIHwgcGFyYWdyYXBoIGZvbnRmYW1pbHkgZm9udHNpemUgfCBzdXBlcnNjcmlwdCBzdWJzY3JpcHQgfCBcIixcblx0XHRcdFx0XCJmb3JlY29sb3IgYmFja2NvbG9yIHwgcmVtb3ZlZm9ybWF0IHwgaW5zZXJ0b3JkZXJlZGxpc3QgaW5zZXJ0dW5vcmRlcmVkbGlzdCB8IHNlbGVjdGFsbCB8IFwiLFxuXHRcdFx0XHRcImNsZWFyZG9jICB8IGluZGVudCBvdXRkZW50IHwganVzdGlmeWxlZnQganVzdGlmeWNlbnRlciBqdXN0aWZ5cmlnaHQgfCB0b3VwcGVyY2FzZSB0b2xvd2VyY2FzZSB8IGhvcml6b250YWwgZGF0ZSB0aW1lICB8IGltYWdlIGVtb3Rpb24gZm9ybXVsYSBzcGVjaGFycyB8IGluc2VydHRhYmxlXCJcblx0XHQgICAgXVxuXHRcdH1cblx0fSxcblx0aGFuZGxlSWNvbkNsaWNrOmZ1bmN0aW9uKGUsc3RhdGUpe1xuXHRcdGlmKHRoaXMucHJvcHMub25JY29uQ2xpY2spe1xuXHRcdFx0dGhpcy5wcm9wcy5vbkljb25DbGljayhlLHN0YXRlKVxuXHRcdH1cblx0fSxcblx0Z2V0SWNvbnM6ZnVuY3Rpb24oKXtcblx0XHR2YXIgZWRpdG9yU3RhdGUgPSB0aGlzLnByb3BzLmVkaXRvclN0YXRlO1xuXHRcdGVkaXRvclN0YXRlLmljb25zW1widW5kb1wiXSA9IHsgZGlzYWJsZWQ6IUVkaXRvckhpc3RvcnkuY2FuVW5kbygpfVxuXHRcdGVkaXRvclN0YXRlLmljb25zW1wicmVkb1wiXSA9IHsgZGlzYWJsZWQ6IUVkaXRvckhpc3RvcnkuY2FuUmVkbygpfVxuXHRcdFxuXHRcdHZhciBpY29ucyA9IHRoaXMucHJvcHMuaWNvbnM7XG5cdFx0dmFyIF9pY29ucyA9IGljb25zLmpvaW4oXCIgXCIpLnJlcGxhY2UoL1xcfC9nbSxcInNlcGFyYXRvclwiKS5zcGxpdChcIiBcIik7XG5cdFx0X2ljb25zID0gX2ljb25zLmZpbHRlcihmdW5jdGlvbihpY28peyByZXR1cm4gaWNvIT1cIlwifSk7XG5cdFx0dmFyIHJldHVybkFycmF5ID0gW107XG5cdFx0Zm9yKHZhciBpPTA7aTxfaWNvbnMubGVuZ3RoO2krKyl7XG5cdFx0XHRyZXR1cm5BcnJheVtpXSAgPSBFZGl0b3JJY29uVHlwZXNbX2ljb25zW2ldXTtcblx0XHRcdHJldHVybkFycmF5W2ldLm9uQ2xpY2sgPSB0aGlzLmhhbmRsZUljb25DbGljaztcblx0XHRcdHJldHVybkFycmF5W2ldLmljb24gPSBfaWNvbnNbaV07XG5cdFx0XHRpZihlZGl0b3JTdGF0ZS5pY29uc1tfaWNvbnNbaV1dKXtcblx0XHRcdFx0cmV0dXJuQXJyYXlbaV0uZGlzYWJsZWQgPSAhIWVkaXRvclN0YXRlLmljb25zW19pY29uc1tpXV0uZGlzYWJsZWQ7XG5cdFx0XHRcdHJldHVybkFycmF5W2ldLmFjdGl2ZSA9ICEhZWRpdG9yU3RhdGUuaWNvbnNbX2ljb25zW2ldXS5hY3RpdmU7XG5cdFx0XHRcdHJldHVybkFycmF5W2ldLmNvbG9yID0gZWRpdG9yU3RhdGUuaWNvbnNbX2ljb25zW2ldXS5jb2xvcjtcblx0XHRcdFx0cmV0dXJuQXJyYXlbaV0udmFsdWUgPSBlZGl0b3JTdGF0ZS5pY29uc1tfaWNvbnNbaV1dLnZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuQXJyYXlbaV0uc2hvd0h0bWwgPSAhISBlZGl0b3JTdGF0ZS5zaG93SHRtbDtcblx0XHR9XG5cdFx0cmV0dXJuIHJldHVybkFycmF5O1xuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHR2YXIgaWNvbnMgPSB0aGlzLmdldEljb25zKCk7XG5cdFx0cmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cImVkaXRvci10b29sYmFyXCI+e1xuXHRcdFx0XHRcdGljb25zLm1hcChmdW5jdGlvbihpY29uLHBvcyl7XG5cdFx0XHRcdFx0XHR2YXIgcHJvcHMgPSBpY29uO1xuXHRcdFx0XHRcdFx0cmV0dXJuKDxFZGl0b3JJY29uIGtleT17cG9zfSB7Li4ucHJvcHN9IC8+KVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XG5cdFx0XHRcdH17dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj4pXG5cdH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yVG9vbGJhcjsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIERyb3Bkb3duID0gcmVxdWlyZSgnLi4vYmFzZS9Ecm9wZG93bi5yZWFjdCcpO1xudmFyIHtDb2xvclR5cGVzfSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9FZGl0b3JDb25zdGFudHMnKTtcbnZhciBFZGl0b3JET00gPSByZXF1aXJlKCcuLi8uLi91dGlscy9FZGl0b3JET00nKTtcbnZhciBDb2xvckRyb3Bkb3duID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aGFuZGxlOmZ1bmN0aW9uKCl7fVxuXHRcdH1cblx0fSxcblx0b3BlbjpmdW5jdGlvbihwb3NpdGlvbixoYW5kbGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aGFuZGxlOmhhbmRsZVxuXHRcdH0pXG5cdFx0dGhpcy5yZWZzLnJvb3Qub3Blbihwb3NpdGlvbik7XG5cdH0sXG5cdGNsb3NlOmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5yZWZzLnJvb3QuY2xvc2UoKTtcblx0fSxcblx0dG9nZ2xlOmZ1bmN0aW9uKHBvc2l0aW9uKXtcblx0XHR0aGlzLnJlZnMucm9vdC50b2dnbGUocG9zaXRpb24pO1xuXHR9LFxuXHRoYW5kbGVTZWxlY3RDb2xvcjpmdW5jdGlvbihlKXtcblx0XHRlID0gZSB8fCBldmVudDtcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXHRcdHZhciBjb2xvciA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sb3InKTtcblx0XHRpZih0aGlzLnN0YXRlLmhhbmRsZSl7XG5cdFx0XHR0aGlzLnN0YXRlLmhhbmRsZShlLGNvbG9yKTtcblx0XHR9XG5cdFx0dGhpcy5jbG9zZSgpO1xuXHRcdEVkaXRvckRPTS5zdG9wUHJvcGFnYXRpb24oZSk7XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciBoYW5kbGVTZWxlY3RDb2xvciA9IHRoaXMuaGFuZGxlU2VsZWN0Q29sb3I7XG5cdFx0cmV0dXJuICg8RHJvcGRvd24gcmVmPVwicm9vdFwiIGNsYXNzTmFtZT1cImNvbG9yLWRyb3Bkb3duXCI+XG5cdFx0XHRcdDx0YWJsZT5cblx0XHRcdFx0XHQ8dGJvZHk+XG5cdFx0XHRcdFx0PHRyIGNsYXNzTmFtZT1cInRpdGxlLXJvd1wiIGtleT17XCJ0aXRsZS1yb3dcIn0+XG5cdFx0XHRcdFx0XHQ8dGQgY29sU3Bhbj17MTB9PuS4u+mimOminOiJsjwvdGQ+XG5cdFx0XHRcdFx0PC90cj5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRDb2xvclR5cGVzLnRoZW1lQ29sb3JzLm1hcChmdW5jdGlvbihjb2xvcnMscG9zKXtcblx0XHRcdFx0XHRcdFx0dmFyIGZpcnN0Um93ID0gcG9zPT0wO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKDx0ciBrZXk9e3Bvc30gY2xhc3NOYW1lPXtmaXJzdFJvdz9cImZpcnN0LXJvd1wiOlwiXCJ9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29sb3JzLm1hcChmdW5jdGlvbihjb2xvcixpbmRleCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKDx0ZCBrZXk9e2luZGV4fT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJjb2xvci1hbmNob3JcIiAgZGF0YS1jb2xvcj17Y29sb3J9IHN0eWxlPXt7XCJiYWNrZ3JvdW5kQ29sb3JcIjpjb2xvcn19IG9uQ2xpY2s9e2hhbmRsZVNlbGVjdENvbG9yfT48L2E+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RkPilcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3RyPilcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDx0ciBjbGFzc05hbWU9XCJ0aXRsZS1yb3dcIiBrZXk9e1widGl0bGUtcm93MlwifT5cblx0XHRcdFx0XHRcdDx0ZCBjb2xTcGFuPXsxMH0+5qCH5YeG6aKc6ImyPC90ZD5cblx0XHRcdFx0XHQ8L3RyPlx0XG5cdFx0XHRcdFx0PHRyIGNsYXNzTmFtZT1cImxhc3Qtcm93XCIga2V5PXtcImxhc3Qtcm93XCJ9PlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdENvbG9yVHlwZXMuc3RhbmRhcmRDb2xvcnMubWFwKGZ1bmN0aW9uKGNvbG9yLHBvcyl7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuICg8dGQga2V5PXtwb3N9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJjb2xvci1hbmNob3JcIiAgZGF0YS1jb2xvcj17Y29sb3J9IHN0eWxlPXt7XCJiYWNrZ3JvdW5kQ29sb3JcIjpjb2xvcn19IG9uQ2xpY2s9e2hhbmRsZVNlbGVjdENvbG9yfT48L2E+XG5cdFx0XHRcdFx0XHRcdFx0PC90ZD4pXG5cdFx0XHRcdFx0XHR9KVx0XHQgIFxuXHRcdFx0XHQgICAgfVxuXHRcdFx0XHRcdDwvdHI+XG5cdFx0XHRcdFx0PC90Ym9keT5cblx0XHRcdFx0PC90YWJsZT5cblx0XHQ8L0Ryb3Bkb3duPilcblx0fVxufSlcblx0XHRcbm1vZHVsZS5leHBvcnRzID0gQ29sb3JEcm9wZG93bjsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0RE9NID0gIHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuXG52YXIgVGFiR3JvdXAgPSByZXF1aXJlKCcuLi9iYXNlL1RhYkdyb3VwLnJlYWN0Jyk7XG52YXIgRGlhbG9nID0gcmVxdWlyZSgnLi4vYmFzZS9EaWFsb2cucmVhY3QnKTtcbnZhciB7RW1vdGlvbkltYWdlc30gPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvRWRpdG9yQ29uc3RhbnRzJyk7XG5cbnZhciBFbW90aW9uUGFuZWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGhhbmRsZUNsaWNrOmZ1bmN0aW9uKGUpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cdFx0dmFyIHVybCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXVybFwiKTtcblx0XHR2YXIgdGl0bGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS10aXRsZVwiKTtcblx0XHRcblx0XHRpZih0aGlzLnByb3BzLm9uU2VsZWN0SW1hZ2Upe1xuXHRcdFx0dGhpcy5wcm9wcy5vblNlbGVjdEltYWdlKGUsJzxpbWcgc3JjPVwiJyt1cmwrJ1wiIHRpdGxlPVwiJyt0aXRsZSsnXCIgLz4nKTtcblx0XHR9XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciBpbWFnZXMgPSB0aGlzLnByb3BzLmltYWdlcztcblx0XHR2YXIgaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrO1xuXHRcdHJldHVybiAoPHVsIGNsYXNzTmFtZT17XCJlbW90aW9uLWltYWdlcyBcIit0aGlzLnByb3BzLm5hbWV9ID5cblx0XHRcdHtcblx0XHRcdFx0aW1hZ2VzLm1hcChmdW5jdGlvbihlbGUscG9zKXtcblx0XHRcdFx0XHRyZXR1cm4gKDxsaSBjbGFzc05hbWU9XCJlbW90aW9uLWltYWdlXCIga2V5PXtwb3N9IGRhdGEtdXJsPXtlbGUudXJsfSBkYXRhLXRpdGxlPXtlbGUudGl0bGV9IG9uQ2xpY2s9e2hhbmRsZUNsaWNrfT5cblx0XHRcdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXtlbGUudXJsfSB0aXRsZT17ZWxlLnRpdGxlfSBkYXRhLXVybD17ZWxlLnVybH0gZGF0YS10aXRsZT17ZWxlLnRpdGxlfS8+XG5cdFx0XHRcdFx0XHRcdDwvbGk+KVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdDwvdWw+KVxuXHR9XG59KVxuXG52YXIgRW1vdGlvbkRpYWxvZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhhbmRsZTpmdW5jdGlvbigpe31cblx0XHR9XG5cdH0sXG5cdG9wZW46ZnVuY3Rpb24ocG9zaXRpb24saGFuZGxlKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGhhbmRsZTpoYW5kbGVcblx0XHR9KVxuXHRcdHRoaXMucmVmcy5yb290Lm9wZW4ocG9zaXRpb24pO1xuXHR9LFxuXHRjbG9zZTpmdW5jdGlvbigpe1xuXHRcdHRoaXMucmVmcy5yb290LmNsb3NlKCk7XG5cdH0sXG5cdHRvZ2dsZTpmdW5jdGlvbihwb3NpdGlvbil7XG5cdFx0dGhpcy5yZWZzLnJvb3QudG9nZ2xlKHBvc2l0aW9uKTtcblx0fSxcblx0aGFuZGxlU2VsZWN0SW1hZ2U6ZnVuY3Rpb24oZSxjaGFyKXtcblx0XHRlID0gZSB8fCBldmVudDtcblx0XHRpZih0aGlzLnN0YXRlLmhhbmRsZSl7XG5cdFx0XHR0aGlzLnN0YXRlLmhhbmRsZShlLGNoYXIpO1xuXHRcdH1cblx0XHRpZihlLnN0b3BQcm9wYWdhdGlvbil7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG5cdFx0fVxuXHRcdHRoaXMuY2xvc2UoKTtcblx0fSxcblx0Z2V0RW1vdGlvblRhYnM6ZnVuY3Rpb24oKXtcblx0XHR2YXIge0Vtb3Rpb25UYWJzLEJhc2VVcmwsU21pbGV5SW5mb3J9ID0gRW1vdGlvbkltYWdlcztcblx0XHR2YXIgdGFicyA9IFtdO1xuXHRcdGZvcih2YXIga2V5IGluIEVtb3Rpb25UYWJzKXtcblx0XHRcdHZhciB0YWIgPSB7IHRpdGxlOiBFbW90aW9uVGFic1trZXldLm5hbWUgfTtcblx0XHRcdHZhciBpbWFnZXMgPSBbXTtcblx0XHRcdHZhciB0aXRsZXMgPSBTbWlsZXlJbmZvcltrZXldO1xuXHRcdFx0Zm9yKHZhciBpPTA7aTx0aXRsZXMubGVuZ3RoO2krKyl7XG5cdFx0XHRcdHZhciBpbmRleCA9IChpKzEpLnRvU3RyaW5nKCk7XG5cdFx0XHRcdGluZGV4ID0gaW5kZXgubGVuZ3RoPT0xP1wiMFwiK2luZGV4OiBpbmRleDtcblx0XHRcdFx0dmFyIGltYWdlID0ge1xuXHRcdFx0XHRcdHRpdGxlOiB0aXRsZXNbaV0sXG5cdFx0XHRcdFx0dXJsOiBCYXNlVXJsICsgRW1vdGlvblRhYnNba2V5XS5wYXRoICsgRW1vdGlvblRhYnNba2V5XS5wcmVmaXgraW5kZXgrXCIuZ2lmP3Y9MS4xXCJcblx0XHRcdFx0fVxuXHRcdFx0XHRpbWFnZXMucHVzaChpbWFnZSk7XG5cdFx0XHR9XG5cdFx0XHR0YWIuaW1hZ2VzID0gaW1hZ2VzO1xuXHRcdFx0dGFicy5wdXNoKHRhYik7XG5cdFx0fVxuXHRcdHJldHVybiB0YWJzO1xuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHR2YXIgdGFicyA9IFtdO1xuXHRcdHZhciBFbW90aW9uVGFicyA9IHRoaXMuZ2V0RW1vdGlvblRhYnMoKTtcblx0XHRcblx0XHRmb3IodmFyIGk9MDtpPEVtb3Rpb25UYWJzLmxlbmd0aDtpKyspe1xuXHRcdFx0dGFicy5wdXNoKHtcblx0XHRcdFx0dGl0bGU6RW1vdGlvblRhYnNbaV0udGl0bGUsXG5cdFx0XHRcdGltYWdlczpFbW90aW9uVGFic1tpXS5pbWFnZXMsXG5cdFx0XHRcdGNvbXBvbmVudDooPEVtb3Rpb25QYW5lbCBpbWFnZXM9e0Vtb3Rpb25UYWJzW2ldLmltYWdlc30gbmFtZT1cImNvbW1vbi1pbWFnZXNcIiBvblNlbGVjdEltYWdlPXt0aGlzLmhhbmRsZVNlbGVjdEltYWdlfSAvPilcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHZhciBidXR0b25zID0gW107XG5cdFx0cmV0dXJuICg8RGlhbG9nIHJlZj1cInJvb3RcIiBjbGFzc05hbWU9XCJlbW90aW9uLWRyb3Bkd29uXCIgd2lkdGg9ezcwMH0gaGVpZ2h0PXs1MDh9IHRpdGxlPVwi6KGo5oOFXCIgYnV0dG9ucz17YnV0dG9uc30gb25DbG9zZT17dGhpcy5jbG9zZX0+XG5cdFx0XHRcdDxUYWJHcm91cCB0YWJzPXt0YWJzfSAvPlxuXHRcdDwvRGlhbG9nPilcblx0fVxufSlcblx0XHRcbm1vZHVsZS5leHBvcnRzID0gRW1vdGlvbkRpYWxvZzsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIENvbWJvQm94ID0gcmVxdWlyZSgnLi4vYmFzZS9Db21ib0JveC5yZWFjdCcpO1xuXG52YXIgRm9udEZhbWlseURyb3Bkb3duID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aGFuZGxlOmZ1bmN0aW9uKCl7fVxuXHRcdH1cblx0fSxcblx0b3BlbjpmdW5jdGlvbihwb3NpdGlvbixoYW5kbGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aGFuZGxlOmhhbmRsZVxuXHRcdH0pXG5cdFx0dGhpcy5yZWZzLnJvb3Qub3Blbihwb3NpdGlvbik7XG5cdH0sXG5cdGNsb3NlOmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5yZWZzLnJvb3QuY2xvc2UoKTtcblx0fSxcblx0dG9nZ2xlOmZ1bmN0aW9uKHBvc2l0aW9uKXtcblx0XHR0aGlzLnJlZnMucm9vdC50b2dnbGUocG9zaXRpb24pO1xuXHR9LFxuXHRoYW5kbGVTZWxlY3Q6ZnVuY3Rpb24oZSl7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblx0XHR2YXIgdmFsdWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJyk7XG5cdFx0aWYodGhpcy5zdGF0ZS5oYW5kbGUpe1xuXHRcdFx0dGhpcy5zdGF0ZS5oYW5kbGUoZSx2YWx1ZSk7XG5cdFx0fVxuXHRcdGlmKGUuc3RvcFByb3BhZ2F0aW9uKXtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fWVsc2V7XG5cdFx0XHRlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG5cdFx0fVxuXHRcdHRoaXMuY2xvc2UoKTtcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIGhhbmRsZVNlbGVjdCA9IHRoaXMuaGFuZGxlU2VsZWN0O1xuXHRcdHZhciBmb250ZmFtaWx5ID0gdGhpcy5wcm9wcy5mb250ZmFtaWx5P3RoaXMucHJvcHMuZm9udGZhbWlseTpbXTtcblx0XHRyZXR1cm4gKDxDb21ib0JveCByZWY9XCJyb290XCIgY2xhc3NOYW1lPVwiY29sb3ItY29tYm9ib3hcIj5cblx0XHRcdDx1bD5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZvbnRmYW1pbHkubWFwKGZ1bmN0aW9uKGVsZSxwb3Mpe1xuXHRcdFx0XHRcdFx0cmV0dXJuICg8bGkga2V5PXtwb3N9IGRhdGEtdmFsdWU9e2VsZS52YWx1ZX0gb25DbGljaz17aGFuZGxlU2VsZWN0fT5cblx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBkYXRhLXZhbHVlPXtlbGUudmFsdWV9IHN0eWxlPXt7XCJmb250RmFtaWx5XCI6ZWxlLnZhbHVlfX0+e2VsZS5uYW1lfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHQ8L2xpPilcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHQ8L3VsPlxuXHRcdDwvQ29tYm9Cb3g+KVxuXHR9XG59KVxuXHRcdFxubW9kdWxlLmV4cG9ydHMgPSBGb250RmFtaWx5RHJvcGRvd247IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBDb21ib0JveCA9IHJlcXVpcmUoJy4uL2Jhc2UvQ29tYm9Cb3gucmVhY3QnKTtcblxudmFyIEZvbnRTaXplRHJvcGRvd24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRoYW5kbGU6ZnVuY3Rpb24oKXt9XG5cdFx0fVxuXHR9LFxuXHRvcGVuOmZ1bmN0aW9uKHBvc2l0aW9uLGhhbmRsZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRoYW5kbGU6aGFuZGxlXG5cdFx0fSlcblx0XHR0aGlzLnJlZnMucm9vdC5vcGVuKHBvc2l0aW9uKTtcblx0fSxcblx0Y2xvc2U6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnJlZnMucm9vdC5jbG9zZSgpO1xuXHR9LFxuXHR0b2dnbGU6ZnVuY3Rpb24ocG9zaXRpb24pe1xuXHRcdHRoaXMucmVmcy5yb290LnRvZ2dsZShwb3NpdGlvbik7XG5cdH0sXG5cdGhhbmRsZVNlbGVjdDpmdW5jdGlvbihlKXtcblx0XHRlID0gZSB8fCBldmVudDtcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXHRcdHZhciB2YWx1ZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKTtcblx0XHRpZih0aGlzLnN0YXRlLmhhbmRsZSl7XG5cdFx0XHR0aGlzLnN0YXRlLmhhbmRsZShlLHZhbHVlKTtcblx0XHR9XG5cdFx0aWYoZS5zdG9wUHJvcGFnYXRpb24pe1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9ZWxzZXtcblx0XHRcdGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcblx0XHR9XG5cdFx0dGhpcy5jbG9zZSgpO1xuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHR2YXIgaGFuZGxlU2VsZWN0ID0gdGhpcy5oYW5kbGVTZWxlY3Q7XG5cdFx0dmFyIGZvbnRzaXplID0gdGhpcy5wcm9wcy5mb250c2l6ZT90aGlzLnByb3BzLmZvbnRzaXplOltdO1xuXHRcdHJldHVybiAoPENvbWJvQm94IHJlZj1cInJvb3RcIiBjbGFzc05hbWU9XCJjb2xvci1jb21ib2JveFwiPlxuXHRcdFx0PHVsPlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Zm9udHNpemUubWFwKGZ1bmN0aW9uKGVsZSxwb3Mpe1xuXHRcdFx0XHRcdFx0cmV0dXJuICg8bGkga2V5PXtwb3N9IGRhdGEtdmFsdWU9e2VsZS52YWx1ZX0gb25DbGljaz17aGFuZGxlU2VsZWN0fT5cblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtdmFsdWU9e2VsZS52YWx1ZX0gc3R5bGU9e3tcImZvbnRTaXplXCI6ZWxlLnZhbHVlfX0+e2VsZS5uYW1lfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHQ8L2xpPilcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHQ8L3VsPlxuXHRcdDwvQ29tYm9Cb3g+KVxuXHR9XG59KVxuXHRcdFxubW9kdWxlLmV4cG9ydHMgPSBGb250U2l6ZURyb3Bkb3duOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSAgcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBUYWJHcm91cCA9IHJlcXVpcmUoJy4uL2Jhc2UvVGFiR3JvdXAucmVhY3QnKTtcbnZhciBEcm9wZG93biA9IHJlcXVpcmUoJy4uL2Jhc2UvRHJvcGRvd24ucmVhY3QnKTtcbnZhciB7Rm9ybXVsYVR5cGVzfSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9FZGl0b3JDb25zdGFudHMnKTtcblxudmFyIEZvcm11bGFJY29ucyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0aGFuZGxlQ2xpY2s6ZnVuY3Rpb24oZSl7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblx0XHR2YXIgbGF0ZXggPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1sYXRleFwiKTtcblx0XHR2YXIgaWQgPSAnbWF0aHF1aWxsLScrbmV3IERhdGUoKS52YWx1ZU9mKCk7XG5cdFx0aWYodGhpcy5wcm9wcy5vblNlbGVjdEZvcm11bGEpe1xuXHRcdFx0dGhpcy5wcm9wcy5vblNlbGVjdEZvcm11bGEoZSxsYXRleCxpZCk7XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHR2YXIgaWNvbnMgPSB0aGlzLnByb3BzLmljb25zO1xuXHRcdHZhciBoYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2s7XG5cdFx0cmV0dXJuICg8dWwgY2xhc3NOYW1lPXtcImZvcm11bGFzLWljb25zIFwiK3RoaXMucHJvcHMubmFtZX0gPlxuXHRcdFx0e1xuXHRcdFx0XHRpY29ucy5tYXAoZnVuY3Rpb24oZWxlLHBvcyl7XG5cdFx0XHRcdFx0cmV0dXJuICg8bGkgY2xhc3NOYW1lPVwibGF0ZXgtaWNvblwiIGtleT17cG9zfSBkYXRhLWxhdGV4PXtlbGUubGF0ZXh9IHN0eWxlPXt7XCJiYWNrZ3JvdW5kUG9zaXRpb25cIjogZWxlLmJhY2tncm91bmRQb3NpdGlvbn19IG9uQ2xpY2s9e2hhbmRsZUNsaWNrfT48L2xpPilcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHQ8L3VsPilcblx0fVxufSlcblxudmFyIEZvcm11bGFEcm9wZG93biA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhhbmRsZTpmdW5jdGlvbigpe31cblx0XHR9XG5cdH0sXG5cdG9wZW46ZnVuY3Rpb24ocG9zaXRpb24saGFuZGxlKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGhhbmRsZTpoYW5kbGVcblx0XHR9KVxuXHRcdHRoaXMucmVmcy5yb290Lm9wZW4ocG9zaXRpb24pO1xuXHR9LFxuXHRjbG9zZTpmdW5jdGlvbigpe1xuXHRcdHRoaXMucmVmcy5yb290LmNsb3NlKCk7XG5cdH0sXG5cdHRvZ2dsZTpmdW5jdGlvbihwb3NpdGlvbil7XG5cdFx0dGhpcy5yZWZzLnJvb3QudG9nZ2xlKHBvc2l0aW9uKTtcblx0fSxcblx0aGFuZGxlU2VsZWN0Rm9ybXVsYTpmdW5jdGlvbihlLGxhdGV4LGlkKXtcblx0XHRlID0gZSB8fCBldmVudDtcblx0XHRpZih0aGlzLnN0YXRlLmhhbmRsZSl7XG5cdFx0XHR0aGlzLnN0YXRlLmhhbmRsZShlLGxhdGV4LGlkKTtcblx0XHR9XG5cdFx0aWYoZS5zdG9wUHJvcGFnYXRpb24pe1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0ZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuXHRcdH1cblx0XHR0aGlzLmNsb3NlKCk7XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciB0YWJzID0gW1xuXHRcdFx0e3RpdGxlOlwi5bi455So5YWs5byPXCIsY29tcG9uZW50Oig8Rm9ybXVsYUljb25zIGljb25zPXtGb3JtdWxhVHlwZXMuY29tbW9uRm9ybXVsYXN9IG5hbWU9XCJjb21tb24tZm9ybXVsYXNcIiBvblNlbGVjdEZvcm11bGE9e3RoaXMuaGFuZGxlU2VsZWN0Rm9ybXVsYX0vPil9LFxuXHRcdFx0e3RpdGxlOlwi56ym5Y+3XCIsY29tcG9uZW50Oig8Rm9ybXVsYUljb25zIGljb25zPXtGb3JtdWxhVHlwZXMuc3ltYm9sRm9ybXVsYXN9IG5hbWU9XCJzeW1ib2wtZm9ybXVsYXNcIiBvblNlbGVjdEZvcm11bGE9e3RoaXMuaGFuZGxlU2VsZWN0Rm9ybXVsYX0vPil9LFxuXHRcdFx0e3RpdGxlOlwi5a2X5q+NXCIsY29tcG9uZW50Oig8Rm9ybXVsYUljb25zIGljb25zPXtGb3JtdWxhVHlwZXMuYXJhYmljRm9ybXVsYXN9IG5hbWU9XCJhcmFiaWMtZm9ybXVsYXNcIiBvblNlbGVjdEZvcm11bGE9e3RoaXMuaGFuZGxlU2VsZWN0Rm9ybXVsYX0vPil9XG5cdFx0XVxuXG5cdFx0cmV0dXJuICg8RHJvcGRvd24gcmVmPVwicm9vdFwiIGNsYXNzTmFtZT1cImZvcm11bGEtZHJvcGRvd25cIj5cblx0XHRcdFx0PFRhYkdyb3VwIHRhYnM9e3RhYnN9IC8+XG5cdFx0PC9Ecm9wZG93bj4pXG5cdH1cbn0pXG5cdFx0XG5tb2R1bGUuZXhwb3J0cyA9IEZvcm11bGFEcm9wZG93bjsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0RE9NID0gIHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuXG52YXIgRGlhbG9nID0gcmVxdWlyZSgnLi4vYmFzZS9EaWFsb2cucmVhY3QnKTtcbnZhciBUYWJHcm91cCA9IHJlcXVpcmUoJy4uL2Jhc2UvVGFiR3JvdXAucmVhY3QnKTtcbnZhciBVcGxvYWRlciA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0ZpbGVVcGxvYWQnKTtcblxudmFyIEltYWdlVXBsb2FkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW1hZ2VzOltdLFxuXHRcdFx0ZHJhZ0VudGVyOmZhbHNlXG5cdFx0fVxuXHR9LFxuXHRoYW5kbGVVcGxvYWRGaWxlOmZ1bmN0aW9uKGZpbGUpe1xuXHRcdHZhciBfc2VsZiA9IHRoaXM7XG5cdFx0dmFyIGltYWdlcyA9IHRoaXMuc3RhdGUuaW1hZ2VzO1xuXHRcdHZhciBtYXNrID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLm1hc2spO1xuXHRcdHZhciB1cGxvYWRlciA9IHRoaXMucHJvcHMuY3VzdG9tVXBsb2FkZXI/IHRoaXMucHJvcHMuY3VzdG9tVXBsb2FkZXI6IFVwbG9hZGVyO1xuXHRcdHVwbG9hZGVyLnVwbG9hZEZpbGUoe1xuXHRcdFx0XHRmaWxlOmZpbGUsXG5cdFx0XHRcdGZpbGVuYW1lOnRoaXMucHJvcHMubmFtZSxcblx0XHRcdFx0dXJsOnRoaXMucHJvcHMudXJsLFxuXHRcdFx0XHRvbkxvYWQ6ZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0bWFzay5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdFx0XHRcdG1hc2suaW5uZXJIVE1MID0gXCJMb2FkaW5nLi4uXCI7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9uU3VjY2VzczpmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdG1hc2suc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRcdFx0XHRtYXNrLmlubmVySFRNTCA9IFwiTG9hZCBTdWNjZXNzXCI7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYocmVzICYmIHJlcy5zdGF0dXM9PVwic3VjY2Vzc1wiKXtcblx0XHRcdFx0XHRcdGltYWdlcy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0c3JjOnJlcy5pbWFnZV9zcmNcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRfc2VsZi5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0XHRcdGltYWdlczppbWFnZXNcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRpZihfc2VsZi5wcm9wcy5vbkNoYW5nZSlcblx0XHRcdFx0XHRcdFx0X3NlbGYucHJvcHMub25DaGFuZ2UoMCxpbWFnZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRtYXNrLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdFx0XHR9LDIwMClcblx0XHRcdFx0fSxcblx0XHRcdFx0b25FcnJvcjpmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRtYXNrLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0XHRcdFx0bWFzay5pbm5lckhUTUwgPSBcIkxvYWQgRXJyb3JcIjtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRtYXNrLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdFx0XHR9LDIwMClcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH0sXG5cdGhhbmRsZUNoYW5nZTpmdW5jdGlvbihlKXtcblx0XHRlID0gZSB8fCBldmVudDtcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXHRcdGlmKHRhcmdldC5maWxlcy5sZW5ndGg+MCl7XG5cdFx0XHR0aGlzLmhhbmRsZVVwbG9hZEZpbGUodGFyZ2V0LmZpbGVzWzBdKVxuXHRcdFx0Ly8gY2xlYXIgdmFsdWVcblx0XHRcdHRhcmdldC52YWx1ZSA9IFwiXCI7XG5cdFx0fVxuXHR9LFxuXHRnZXRJbWFnZXM6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5pbWFnZXM7XG5cdH0sXG5cdGNsZWFySW1hZ2VzOmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpbWFnZXM6W11cblx0XHR9KVxuXHR9LFxuXHRoYW5kbGVSZW1vdmVJbWFnZTpmdW5jdGlvbihlKXtcblx0XHRlID0gZSB8fCBldmVudDtcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXHRcdHZhciBpbmRleCA9IHBhcnNlSW50KHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIpKTtcblx0XHR2YXIgaW1hZ2VzID0gdGhpcy5zdGF0ZS5pbWFnZXM7XG5cdFx0aW1hZ2VzLnNwbGljZShpbmRleCwxKTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGltYWdlczppbWFnZXNcblx0XHR9KVxuXHRcdGlmKHRoaXMucHJvcHMub25DaGFuZ2UpXG5cdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKDAsaW1hZ2VzKTtcblx0fSxcblx0aGFuZGxlRHJvcDpmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyIGZpbGVzID0gZS5kYXRhVHJhbnNmZXIuZmlsZXM7XG5cdFx0aWYoZmlsZXMubGVuZ3RoPjApe1xuXHRcdFx0dGhpcy5oYW5kbGVVcGxvYWRGaWxlKGZpbGVzWzBdKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRkcmFnRW50ZXI6ZmFsc2Vcblx0XHR9KVxuXHRcdGNvbnNvbGUubG9nKGUudHlwZSk7XG5cdH0sXG5cdGhhbmRsZURyYWdPdmVyOmZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zb2xlLmxvZyhlLnR5cGUpO1xuXHR9LFxuXHRoYW5kbGVEcmFnRW50ZXI6ZnVuY3Rpb24oZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRkcmFnRW50ZXI6dHJ1ZVxuXHRcdH0pXG5cdFx0Y29uc29sZS5sb2coZS50eXBlKTtcblx0fSxcblx0aGFuZGxlRHJhZ0xlYXZlOmZ1bmN0aW9uKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0ZHJhZ0VudGVyOmZhbHNlXG5cdFx0fSlcblx0XHRjb25zb2xlLmxvZyhlLnR5cGUpO1xuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpbWFnZXMgPSB0aGlzLnN0YXRlLmltYWdlcztcblx0XHRcdHZhciBkcmFnRW50ZXIgPSB0aGlzLnN0YXRlLmRyYWdFbnRlcjtcblx0XHRcdHZhciBoYW5kbGVSZW1vdmVJbWFnZSA9IHRoaXMuaGFuZGxlUmVtb3ZlSW1hZ2U7XG5cdFx0XHR2YXIgYWN0aW9uID0gdGhpcy5wcm9wcy5hY3Rpb24/dGhpcy5wcm9wcy5hY3Rpb246XCIvdXBsb2FkXCI7XG5cdFx0XHR2YXIgc2hvd1N0eWxlID0ge1xuXHRcdFx0XHRcImRpc3BsYXlcIjpcImJsb2NrXCJcblx0XHRcdH1cblx0XHRcdHZhciBoaWRlU3R5bGUgPSB7XG5cdFx0XHRcdFwiZGlzcGxheVwiOlwibm9uZVwiXG5cdFx0XHR9XG5cblx0XHRcdHZhciBoYXNJbWFnZXMgPSBpbWFnZXMubGVuZ3RoID4gMDtcblx0XHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJ0YWItcGFuZWxcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtcImltYWdlLWNvbnRlbnRcIiArKGRyYWdFbnRlcj9cIiBkcmFnLWVudGVyXCI6XCJcIil9ICBvbkRyb3A9e3RoaXMuaGFuZGxlRHJvcH0gXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkRyYWdPdmVyPXt0aGlzLmhhbmRsZURyYWdPdmVyfSBcblx0XHRcdFx0XHRcdFx0XHRcdG9uRHJhZ0VudGVyPXt0aGlzLmhhbmRsZURyYWdFbnRlcn0gXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkRyYWdMZWF2ZT17dGhpcy5oYW5kbGVEcmFnTGVhdmV9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbkRyYWdFbmQ9e3RoaXMuaGFuZGxlRHJhZ0xlYXZlfSBcblx0XHRcdFx0XHRcdFx0XHRcdG9uRHJhZ1N0YXJ0PXt0aGlzLmhhbmRsZURyYWdFbnRlcn0+XG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRpbWFnZXMubWFwKGZ1bmN0aW9uKGVsZSxwb3Mpe1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cImltYWdlLWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImltYWdlLWNsb3NlXCIgb25DbGljaz17aGFuZGxlUmVtb3ZlSW1hZ2V9PjwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXtlbGUuc3JjfSBjbGFzc05hbWU9XCJpbWFnZS1waWNcIiBoZWlnaHQ9XCI3NVwiIHdpZHRoPVwiMTIwXCIgLz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+KVxuXHRcdFx0XHRcdFx0XHQgICB9KVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2UtdXBsb2FkMlwiIHN0eWxlPXsgaGFzSW1hZ2VzP3Nob3dTdHlsZTpoaWRlU3R5bGUgfT5cblx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbWFnZS1pY29uXCI+PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdDxmb3JtIGNsYXNzTmFtZT1cImltYWdlLWZvcm1cIiAgbWV0aG9kPVwicG9zdFwiIGVuY1R5cGU9XCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIgdGFyZ2V0PVwidXBcIiBhY3Rpb249e2FjdGlvbn0gPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gc3R5bGU9e3sgZmlsdGVyOiBcImFscGhhKG9wYWNpdHk9MClcIiB9fSBjbGFzc05hbWU9XCJpbWFnZS1maWxlXCIgdHlwZT1cImZpbGVcIiBoaWRlZm9jdXM9XCJcIiBuYW1lPVwiZmlsZVwiIGFjY2VwdD1cImltYWdlL2dpZixpbWFnZS9qcGVnLGltYWdlL3BuZyxpbWFnZS9qcGcsaW1hZ2UvYm1wXCIgLz5cblx0XHRcdFx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImltYWdlLWRyYWdUaXBcIiBzdHlsZT17IGhhc0ltYWdlcz9oaWRlU3R5bGU6c2hvd1N0eWxlIH0+5pSv5oyB5Zu+54mH5ouW5ou95LiK5LygPC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImltYWdlLXVwbG9hZDFcIiBzdHlsZT17IGhhc0ltYWdlcz9oaWRlU3R5bGU6c2hvd1N0eWxlIH0+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImltYWdlLWljb25cIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDxmb3JtIGNsYXNzTmFtZT1cImltYWdlLWZvcm1cIiBtZXRob2Q9XCJwb3N0XCIgZW5jVHlwZT1cIm11bHRpcGFydC9mb3JtLWRhdGFcIiB0YXJnZXQ9XCJ1cFwiIGFjdGlvbj17YWN0aW9ufSA+XG5cdFx0XHRcdFx0XHRcdFx0PGlucHV0IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gc3R5bGU9e3sgZmlsdGVyOlwiYWxwaGEob3BhY2l0eT0wKVwifX0gY2xhc3NOYW1lPVwiaW1hZ2UtZmlsZVwiIHR5cGU9XCJmaWxlXCIgaGlkZWZvY3VzPVwiXCIgbmFtZT1cImZpbGVcIiBhY2NlcHQ9XCJpbWFnZS9naWYsaW1hZ2UvanBlZyxpbWFnZS9wbmcsaW1hZ2UvanBnLGltYWdlL2JtcFwiIC8+XG5cdFx0XHRcdFx0XHRcdDwvZm9ybT5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbWFnZS1tYXNrXCIgcmVmPVwibWFza1wiPlxuXHRcdFx0XHRcdFx0XHRcdHtcIkxvYWRpbmcuLi4uXCJ9XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj4pXG5cdH1cbn0pXG5cbnZhciBJbWFnZVNlYXJjaCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGltYWdlczpbXVxuXHRcdH1cblx0fSxcblx0Z2V0SW1hZ2VzOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUuaW1hZ2VzO1xuXHR9LFxuXHRjbGVhckltYWdlczpmdW5jdGlvbigpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aW1hZ2VzOltdXG5cdFx0fSlcblx0fSxcblx0aGFuZGxlQ2xpY2s6ZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHRleHQgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMudGV4dCk7XG5cdFx0dmFyIHNyYyA9IHRleHQudmFsdWU7XG5cdFx0dmFyIGltYWdlcyA9IHRoaXMuc3RhdGUuaW1hZ2VzO1xuXHRcdGlmKHNyYyAmJiBzcmMubGVuZ3RoPjApe1xuXHRcdFx0aW1hZ2VzLnB1c2goe3NyY30pXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aW1hZ2VzOmltYWdlc1xuXHRcdFx0fSlcblx0XHRcdGlmKHRoaXMucHJvcHMub25DaGFuZ2UpXG5cdFx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UoMSxpbWFnZXMpO1xuXHRcdFx0dGV4dC52YWx1ZSA9IFwiXCI7XG5cdFx0fSBcblx0fSxcblx0aGFuZGxlUmVtb3ZlSW1hZ2U6ZnVuY3Rpb24oZSl7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblx0XHR2YXIgaW5kZXggPSBwYXJzZUludCh0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiKSk7XG5cdFx0dmFyIGltYWdlcyA9IHRoaXMuc3RhdGUuaW1hZ2VzO1xuXHRcdGltYWdlcy5zcGxpY2UoaW5kZXgsMSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpbWFnZXM6aW1hZ2VzXG5cdFx0fSlcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIGltYWdlcyA9IHRoaXMuc3RhdGUuaW1hZ2VzO1xuXHRcdHZhciBoYW5kbGVSZW1vdmVJbWFnZSA9IHRoaXMuaGFuZGxlUmVtb3ZlSW1hZ2U7XG5cdFx0cmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYW5lbFwiPlxuXHRcdFx0XHQ8dGFibGUgY2xhc3NOYW1lPVwic2VhcmNoLWJhclwiPlxuXHRcdFx0XHRcdDx0Ym9keT5cblx0XHRcdFx0XHRcdFx0PHRyPlxuXHRcdFx0XHRcdFx0XHRcdDx0ZD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzTmFtZT1cImltYWdlLXNlYXJjaFR4dFwiIHR5cGU9XCJ0ZXh0XCIgcmVmPVwidGV4dFwiIC8+XG5cdFx0XHRcdFx0XHRcdFx0PC90ZD5cblx0XHRcdFx0XHRcdFx0XHQ8dGQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2Utc2VhcmNoQWRkXCIgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+5re75YqgPC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PC90ZD5cblx0XHRcdFx0XHRcdFx0PC90cj5cblx0XHRcdFx0XHQ8L3Rib2R5PlxuXHRcdFx0XHQ8L3RhYmxlPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImltYWdlLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aW1hZ2VzLm1hcChmdW5jdGlvbihlbGUscG9zKXtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKDxkaXYga2V5PXtwb3N9IGNsYXNzTmFtZT1cImltYWdlLWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbWFnZS1jbG9zZVwiIGRhdGEtaW5kZXg9e3Bvc30gb25DbGljaz17aGFuZGxlUmVtb3ZlSW1hZ2V9PjwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz17ZWxlLnNyY30gY2xhc3NOYW1lPVwiaW1hZ2UtcGljXCIgaGVpZ2h0PVwiNzVcIiB3aWR0aD1cIjEyMFwiICAvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+KVxuXHRcdFx0XHRcdFx0ICAgfSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj4pXG5cdH1cbn0pXG5cbnZhciBJbWFnZURpYWxvZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGltYWdlczpbW10sW11dLFxuXHRcdFx0aGFuZGxlOmZ1bmN0aW9uKCl7fVxuXHRcdH1cblx0fSxcblx0cHJvcFR5cGVzOntcblx0XHR1cGxvYWRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXHRcdGN1c3RvbVVwbG9hZGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fSxcblx0Z2V0RGVmYXVsdFByb3BzOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHVwbG9hZGVyOntcblx0XHRcdFx0dXJsOlwiL3VwbG9hZFwiLFxuXHRcdFx0XHRuYW1lOlwiZmlsZVwiXG5cdFx0XHR9LFxuXHRcdFx0Y3VzdG9tVXBsb2FkZXI6bnVsbFxuXHRcdH1cblx0fSxcblx0b3BlbjpmdW5jdGlvbihoYW5kbGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aGFuZGxlOmhhbmRsZVxuXHRcdH0pXG5cdFx0dGhpcy5yZWZzLm1vZGFsLm9wZW4oKTtcblx0fSxcblx0Y2xvc2U6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnJlZnMubW9kYWwuY2xvc2UoKTtcblx0XHRpZih0aGlzLnN0YXRlLmhhbmRsZSl7XG5cdFx0XHR0aGlzLnN0YXRlLmhhbmRsZSgpO1xuXHRcdH1cblx0XHR0aGlzLnJlZnMuaW1hZ2UuY2xlYXJJbWFnZXMoKTtcblx0fSxcblx0dG9nZ2xlOmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5yZWZzLm1vZGFsLnRvZ2dsZSgpO1xuXHR9LFxuXHRoYW5kbGVPa0NsaWNrOmZ1bmN0aW9uKGUpe1xuXHRcdC8vIOWBmuebuOW6lOeahOWkhOeQhlxuXHRcdHZhciB0YWJJbmRleCA9IHRoaXMucmVmcy50YWIuZ2V0VGFiSW5kZXgoKTtcblx0XHR2YXIgaW1hZ2VzID0gdGhpcy5zdGF0ZS5pbWFnZXNbdGFiSW5kZXhdO1xuXHRcdHZhciBzdHJJbWdzID0gXCJcIjtcblx0XHRpZihpbWFnZXMubGVuZ3RoPjAgJiYgdGhpcy5zdGF0ZS5oYW5kbGUpe1xuXHRcdFx0Zm9yKHZhciBpPTA7aTxpbWFnZXMubGVuZ3RoO2krKyl7XG5cdFx0XHRcdHZhciBzcmMgPSBpbWFnZXNbaV0uc3JjO1xuXHRcdFx0XHR2YXIgc3RyID0gXCI8aW1nIHNyYz0nXCIrc3JjK1wiJyAvPlwiO1xuXHRcdFx0XHRzdHJJbWdzICs9IHN0cjtcblx0XHRcdH1cblx0XHRcdHRoaXMuc3RhdGUuaGFuZGxlKGUsc3RySW1ncyk7XG5cdFx0fVxuXHRcdHRoaXMuY2xvc2UoKTtcblx0fSxcblx0aGFuZGxlQ2hhbmdlOmZ1bmN0aW9uKGluZGV4LGltZ3Mpe1xuXHRcdHZhciBpbWFnZXMgPSB0aGlzLnN0YXRlLmltYWdlcztcblx0XHRpbWFnZXNbaW5kZXhdID0gaW1ncztcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGltYWdlczppbWFnZXNcblx0XHR9KVxuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHR2YXIgdXBsb2FkZXIgPSB0aGlzLnByb3BzLnVwbG9hZGVyO1xuXHRcdHZhciBidXR0b25zID0gW1xuXHRcdFx0eyBuYW1lOlwiYnRuLW9rXCIsIGNvbnRlbnQ6XCLnoa7lrppcIiwgb25DbGljazp0aGlzLmhhbmRsZU9rQ2xpY2t9LFxuXHRcdFx0eyBuYW1lOlwiYnRuLWNhbmNlbFwiLCBjb250ZW50Olwi5Y+W5raIXCIsIG9uQ2xpY2s6dGhpcy5jbG9zZX1cblx0XHRdO1xuXHRcdHZhciB0YWJzID0gW1xuXHRcdFx0e3RpdGxlOlwi5pys5Zyw5LiK5LygXCIsY29tcG9uZW50Oig8SW1hZ2VVcGxvYWQgcmVmPVwiaW1hZ2VcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IG5hbWU9e3VwbG9hZGVyLm5hbWV9IHVybD17dXBsb2FkZXIudXJsfS8+KX0sXG5cdFx0XHR7dGl0bGU6XCLnvZHnu5zlm77niYdcIixjb21wb25lbnQ6KDxJbWFnZVNlYXJjaCByZWY9XCJpbWFnZVwiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0vPil9LFx0XHRcblx0XHRdXG5cdFx0cmV0dXJuICg8RGlhbG9nIHJlZj1cIm1vZGFsXCIgY2xhc3NOYW1lPVwiaW1hZ2UtZGlhbG9nXCIgd2lkdGg9ezcwMH0gaGVpZ2h0PXs1MDh9IHRpdGxlPVwi5Zu+54mHXCIgYnV0dG9ucz17YnV0dG9uc30gb25DbG9zZT17dGhpcy5jbG9zZX0+XG5cdFx0XHRcdDxUYWJHcm91cCB0YWJzPXt0YWJzfSByZWY9XCJ0YWJcIi8+XG5cdFx0XHQ8L0RpYWxvZz4pXG5cdH1cbn0pXG5cdFx0XG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlRGlhbG9nOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQ29tYm9Cb3ggPSByZXF1aXJlKCcuLi9iYXNlL0NvbWJvQm94LnJlYWN0Jyk7XG5cbnZhciBQYXJhZ3JhcGhEcm9wZG93biA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhhbmRsZTpmdW5jdGlvbigpe31cblx0XHR9XG5cdH0sXG5cdG9wZW46ZnVuY3Rpb24ocG9zaXRpb24saGFuZGxlKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGhhbmRsZTpoYW5kbGVcblx0XHR9KVxuXHRcdHRoaXMucmVmcy5yb290Lm9wZW4ocG9zaXRpb24pO1xuXHR9LFxuXHRjbG9zZTpmdW5jdGlvbigpe1xuXHRcdHRoaXMucmVmcy5yb290LmNsb3NlKCk7XG5cdH0sXG5cdHRvZ2dsZTpmdW5jdGlvbihwb3NpdGlvbil7XG5cdFx0dGhpcy5yZWZzLnJvb3QudG9nZ2xlKHBvc2l0aW9uKTtcblx0fSxcblx0aGFuZGxlU2VsZWN0OmZ1bmN0aW9uKGUpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cdFx0dmFyIHZhbHVlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpO1xuXHRcdGlmKHRoaXMuc3RhdGUuaGFuZGxlKXtcblx0XHRcdHRoaXMuc3RhdGUuaGFuZGxlKGUsdmFsdWUpO1xuXHRcdH1cblx0XHRpZihlLnN0b3BQcm9wYWdhdGlvbil7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1lbHNle1xuXHRcdFx0ZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuXHRcdH1cblx0XHR0aGlzLmNsb3NlKCk7XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciBoYW5kbGVTZWxlY3QgPSB0aGlzLmhhbmRsZVNlbGVjdDtcblx0XHR2YXIgcGFyYWdyYXBoID0gdGhpcy5wcm9wcy5wYXJhZ3JhcGg/dGhpcy5wcm9wcy5wYXJhZ3JhcGg6W107XG5cdFx0cmV0dXJuICg8Q29tYm9Cb3ggcmVmPVwicm9vdFwiIGNsYXNzTmFtZT1cImNvbG9yLWNvbWJvYm94XCI+XG5cdFx0XHQ8dWw+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRwYXJhZ3JhcGgubWFwKGZ1bmN0aW9uKGVsZSxwb3Mpe1xuXHRcdFx0XHRcdFx0cmV0dXJuICg8bGkga2V5PXtwb3N9IGRhdGEtdmFsdWU9e2VsZS52YWx1ZX0gb25DbGljaz17aGFuZGxlU2VsZWN0fT5cblx0XHRcdFx0XHRcdFx0XHRcdHtSZWFjdC5jcmVhdGVFbGVtZW50KGVsZS52YWx1ZSx7XCJkYXRhLXZhbHVlXCI6IGVsZS52YWx1ZX0sZWxlLm5hbWUpfVxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+KVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdDwvdWw+XG5cdFx0PC9Db21ib0JveD4pXG5cdH1cbn0pXG5cdFx0XG5tb2R1bGUuZXhwb3J0cyA9IFBhcmFncmFwaERyb3Bkb3duOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSAgcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBUYWJHcm91cCA9IHJlcXVpcmUoJy4uL2Jhc2UvVGFiR3JvdXAucmVhY3QnKTtcbnZhciBEaWFsb2cgPSByZXF1aXJlKCcuLi9iYXNlL0RpYWxvZy5yZWFjdCcpO1xudmFyIHtTcGVjaWFsQ2hhcnN9ID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL0VkaXRvckNvbnN0YW50cycpO1xuXG52YXIgU0NDaGFycyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0aGFuZGxlQ2xpY2s6ZnVuY3Rpb24oZSl7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblx0XHR2YXIgY2hhciA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNoYXJcIik7XG5cdFx0dmFyIGlkID0gJ2NoYXItJytuZXcgRGF0ZSgpLnZhbHVlT2YoKTtcblx0XHRpZih0aGlzLnByb3BzLm9uU2VsZWN0Q2hhcil7XG5cdFx0XHR0aGlzLnByb3BzLm9uU2VsZWN0Q2hhcihlLGNoYXIpO1xuXHRcdH1cblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIGNoYXJzID0gdGhpcy5wcm9wcy5jaGFycztcblx0XHR2YXIgaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrO1xuXHRcdHJldHVybiAoPHVsIGNsYXNzTmFtZT17XCJzcGVjaWFsLWNoYXJzIFwiK3RoaXMucHJvcHMubmFtZX0gPlxuXHRcdFx0e1xuXHRcdFx0XHRjaGFycy5tYXAoZnVuY3Rpb24oZWxlLHBvcyl7XG5cdFx0XHRcdFx0cmV0dXJuICg8bGkgY2xhc3NOYW1lPVwic3BlY2lhbC1jaGFyXCIga2V5PXtwb3N9IGRhdGEtY2hhcj17ZWxlfSBvbkNsaWNrPXtoYW5kbGVDbGlja30+e2VsZX08L2xpPilcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHQ8L3VsPilcblx0fVxufSlcblxudmFyIFNwZWNpYWxDaGFyc0RpYWxvZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhhbmRsZTpmdW5jdGlvbigpe31cblx0XHR9XG5cdH0sXG5cdG9wZW46ZnVuY3Rpb24ocG9zaXRpb24saGFuZGxlKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGhhbmRsZTpoYW5kbGVcblx0XHR9KVxuXHRcdHRoaXMucmVmcy5yb290Lm9wZW4ocG9zaXRpb24pO1xuXHR9LFxuXHRjbG9zZTpmdW5jdGlvbigpe1xuXHRcdHRoaXMucmVmcy5yb290LmNsb3NlKCk7XG5cdH0sXG5cdHRvZ2dsZTpmdW5jdGlvbihwb3NpdGlvbil7XG5cdFx0dGhpcy5yZWZzLnJvb3QudG9nZ2xlKHBvc2l0aW9uKTtcblx0fSxcblx0aGFuZGxlU2VsZWN0Q2hhcjpmdW5jdGlvbihlLGNoYXIpe1xuXHRcdGUgPSBlIHx8IGV2ZW50O1xuXHRcdGlmKHRoaXMuc3RhdGUuaGFuZGxlKXtcblx0XHRcdHRoaXMuc3RhdGUuaGFuZGxlKGUsY2hhcik7XG5cdFx0fVxuXHRcdGlmKGUuc3RvcFByb3BhZ2F0aW9uKXtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKClcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcblx0XHR9XG5cdFx0dGhpcy5jbG9zZSgpO1xuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHR2YXIgdGFicyA9IFtdO1xuXHRcdGZvcih2YXIgaT0wO2k8U3BlY2lhbENoYXJzLmxlbmd0aDtpKyspe1xuXHRcdFx0dGFicy5wdXNoKHtcblx0XHRcdFx0dGl0bGU6U3BlY2lhbENoYXJzW2ldLnRpdGxlLFxuXHRcdFx0XHRjaGFyczpTcGVjaWFsQ2hhcnNbaV0uY2hhcnMsXG5cdFx0XHRcdGNvbXBvbmVudDooPFNDQ2hhcnMgY2hhcnM9e1NwZWNpYWxDaGFyc1tpXS5jaGFyc30gbmFtZT1cImNvbW1vbi1jaGFyc1wiIG9uU2VsZWN0Q2hhcj17dGhpcy5oYW5kbGVTZWxlY3RDaGFyfSAvPilcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHZhciBidXR0b25zID0gW107XG5cdFx0cmV0dXJuICg8RGlhbG9nIHJlZj1cInJvb3RcIiBjbGFzc05hbWU9XCJzcGVjaWFsLWNoYXJzLWRpYWxvZ1wiIHdpZHRoPXs3MDB9IGhlaWdodD17NTA4fSB0aXRsZT1cIueJueauiuWtl+esplwiIGJ1dHRvbnM9e2J1dHRvbnN9IG9uQ2xvc2U9e3RoaXMuY2xvc2V9PlxuXHRcdFx0XHQ8VGFiR3JvdXAgdGFicz17dGFic30gLz5cblx0XHQ8L0RpYWxvZz4pXG5cdH1cbn0pXG5cdFx0XG5tb2R1bGUuZXhwb3J0cyA9IFNwZWNpYWxDaGFyc0RpYWxvZzsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIERyb3Bkb3duID0gcmVxdWlyZSgnLi4vYmFzZS9Ecm9wZG93bi5yZWFjdCcpO1xuXG52YXIgVGFibGVQaWNrZXJEcm9wZG93biA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvdzowLFxuICAgICAgICAgICAgY29sdW1uOjAsXG4gICAgICAgICAgICBoYW5kbGU6ZnVuY3Rpb24oKXt9LFxuICAgICAgICAgICAgcG9zaXRpb246e3g6MCx5OjB9XG4gICAgICAgIH1cbiAgICB9LFxuXHRvcGVuOmZ1bmN0aW9uKHBvc2l0aW9uLGhhbmRsZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRoYW5kbGU6aGFuZGxlLFxuICAgICAgICAgICAgcG9zaXRpb246cG9zaXRpb25cblx0XHR9KVxuXHRcdHRoaXMucmVmcy5yb290Lm9wZW4ocG9zaXRpb24pO1xuXHR9LFxuXHRjbG9zZTpmdW5jdGlvbigpe1xuXHRcdHRoaXMucmVmcy5yb290LmNsb3NlKCk7XG5cdH0sXG5cdHRvZ2dsZTpmdW5jdGlvbihwb3NpdGlvbil7XG5cdFx0dGhpcy5yZWZzLnJvb3QudG9nZ2xlKHBvc2l0aW9uKTtcblx0fSxcbiAgICBoYW5kbGVNb3VzZUV2ZW50OmZ1bmN0aW9uKGUpe1xuICAgICAgICBlID0gZSB8fCBldmVudDtcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXHRcdHZhciBwYXJlbnRQb3N0aW9uID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgcm93ID1NYXRoLmNlaWwoKGUuY2xpZW50WCAtIHBhcmVudFBvc3Rpb24ubGVmdCkgLyAyMik7XG4gICAgICAgIHZhciBjb2x1bW4gPU1hdGguY2VpbCgoZS5jbGllbnRZIC0gcGFyZW50UG9zdGlvbi50b3ApIC8gMjIpO1xuICAgICAgICBpZihyb3c8MCkgcm93ID0gMDtcbiAgICAgICAgaWYoY29sdW1uPDApIGNvbHVtbiA9IDA7XG4gICAgICAgIFxuICAgICAgICBpZihyb3c+MTApIHJvdyA9IDEwO1xuICAgICAgICBpZihjb2x1bW4+MTApIGNvbHVtbiA9IDEwO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHJvdzpyb3csXG4gICAgICAgICAgICBjb2x1bW46Y29sdW1uXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBoYW5kbGVNb3VzZU91dDpmdW5jdGlvbihlKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICByb3c6MCxcbiAgICAgICAgICAgIGNvbHVtbjowXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBoYW5kbGVDbGljazpmdW5jdGlvbihlKXtcbiAgICAgICAgLy8gaW5zZXJ0IHRhYmxlXG4gICAgICAgIHZhciBUYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcblx0XHRUYWJsZS5jbGFzc05hbWUgPSBcImVkaXRvci10YWJsZVwiO1xuICAgICAgICB2YXIgVEJvZHkgPSBUYWJsZS5jcmVhdGVUQm9keSgpO1xuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuc3RhdGUucm93O2krKyl7XG4gICAgICAgICAgICB2YXIgVHIgPSBUQm9keS5pbnNlcnRSb3coKTtcbiAgICAgICAgICAgIGZvcih2YXIgaj0wO2o8dGhpcy5zdGF0ZS5jb2x1bW47aisrKXtcbiAgICAgICAgICAgICAgICB2YXIgVGQgPSBUci5pbnNlcnRDZWxsKCk7XG4gICAgICAgICAgICAgICAgVGQud2lkdGggPSAyMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZS5oYW5kbGUoZSxUYWJsZS5vdXRlckhUTUwpO1xuICAgICAgICB0aGlzLnJlZnMucm9vdC5jbG9zZSgpO1xuICAgIH0sXG4gICAgcmVuZGVyOmZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciByb3cgPSB0aGlzLnN0YXRlLnJvdztcbiAgICAgICAgdmFyIGNvbHVtbiA9IHRoaXMuc3RhdGUuY29sdW1uO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuICg8RHJvcGRvd24gcmVmPVwicm9vdFwiIGNsYXNzTmFtZT1cInRhYmxlcGlja2VyLWRyb3Bkb3duXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5mb2FyZWFcIj4gPHNwYW4+e2NvbHVtbitcIuWIlyB4IFwiK3JvdytcIuihjFwifTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaWNrYXJlYVwiIG9uTW91c2VPdmVyPXt0aGlzLmhhbmRsZU1vdXNlRXZlbnR9ICBvbk1vdXNlTW92ZT17dGhpcy5oYW5kbGVNb3VzZUV2ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VPdXQ9e3RoaXMuaGFuZGxlTW91c2VPdXR9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmxheVwiIHN0eWxlPXt7d2lkdGg6cm93KjIyLGhlaWdodDpjb2x1bW4qMjJ9fT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9Ecm9wZG93bj4pXG4gICAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBUYWJsZVBpY2tlckRyb3Bkb3duOyIsInZhciBFZGl0b3JJY29uVHlwZXMgPSB7XG5cdFwic291cmNlXCI6e1xuXHRcdHRpdGxlOlwi5rqQ5Luj56CBXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJzZXBhcmF0b3JcIjp7XG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJ1bmRvXCI6e1xuXHRcdHRpdGxlOlwi5pKk6ZSAXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJyZWRvXCI6e1xuXHRcdHRpdGxlOlwi6YeN5YGaXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJib2xkXCI6e1xuXHRcdHRpdGxlOlwi5Yqg57KXXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJpdGFsaWNcIjp7XG5cdFx0dGl0bGU6XCLmlpznur9cIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcInVuZGVybGluZVwiOntcblx0XHR0aXRsZTpcIuS4i+WIkue6v1wiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwic3RyaWtldGhyb3VnaFwiOntcblx0XHR0aXRsZTpcIuWIoOmZpOe6v1wiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwic3VwZXJzY3JpcHRcIjp7XG5cdFx0dGl0bGU6XCLkuIrmoIdcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcInN1YnNjcmlwdFwiOntcblx0XHR0aXRsZTpcIuS4i+agh1wiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiZm9yZWNvbG9yXCI6e1xuXHRcdHRpdGxlOlwi5a2X5L2T6aKc6ImyXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJiYWNrY29sb3JcIjp7XG5cdFx0dGl0bGU6XCLog4zmma/oibJcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcInJlbW92ZWZvcm1hdFwiOntcblx0XHR0aXRsZTpcIua4hemZpOagvOW8j1wiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiaW5zZXJ0dW5vcmRlcmVkbGlzdFwiOntcblx0XHR0aXRsZTpcIuaXoOW6j+WIl+ihqFwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiaW5zZXJ0b3JkZXJlZGxpc3RcIjp7XG5cdFx0dGl0bGU6XCLmnInluo/liJfooahcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcInNlbGVjdGFsbFwiOntcblx0XHR0aXRsZTpcIuWFqOmAiVwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiY2xlYXJkb2NcIjp7XG5cdFx0dGl0bGU6XCLmuIXnqbrmlofmoaNcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcInBhcmFncmFwaFwiOntcblx0XHR0aXRsZTpcIuauteiQveagvOW8j1wiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiZm9udGZhbWlseVwiOntcblx0XHR0aXRsZTpcIuWtl+S9k1wiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiZm9udHNpemVcIjp7XG5cdFx0dGl0bGU6XCLlrZflj7dcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcImp1c3RpZnlsZWZ0XCI6e1xuXHRcdHRpdGxlOlwi5bGF5bem5a+56b2QXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJqdXN0aWZ5Y2VudGVyXCI6e1xuXHRcdHRpdGxlOlwi5bGF5Lit5a+56b2QXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJqdXN0aWZ5cmlnaHRcIjp7XG5cdFx0dGl0bGU6XCLlsYXlj7Plr7npvZBcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcImxpbmtcIjp7XG5cdFx0dGl0bGU6XCLotoXpk77mjqVcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcInVubGlua1wiOntcblx0XHR0aXRsZTpcIuWPlua2iOmTvuaOpVwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiZW1vdGlvblwiOntcblx0XHR0aXRsZTpcIuihqOaDhVwiLFxuXHRcdGRpc2FibGVkOmZhbHNlXG5cdH0sXG5cdFwiaW1hZ2VcIjp7XG5cdFx0dGl0bGU6XCLlm77niYdcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcInZpZGVvXCI6e1xuXHRcdHRpdGxlOlwi6KeG6aKRXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJtYXBcIjp7XG5cdFx0dGl0bGU6XCLnmb7luqblnLDlm75cIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcImhvcml6b250YWxcIjp7XG5cdFx0dGl0bGU6XCLliIbpmpTnur9cIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcInByaW50XCI6e1xuXHRcdHRpdGxlOlwi5omT5Y2wXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJwcmV2aWV3XCI6e1xuXHRcdHRpdGxlOlwi6aKE6KeIXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJkcmFmdHNcIjp7XG5cdFx0dGl0bGU6XCLojYnnqL/nrrFcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcImZvcm11bGFcIjp7XG5cdFx0dGl0bGU6XCLmlbDlrablhazlvI9cIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuICAgIFwiaW5zZXJ0dGFibGVcIjp7XG5cdFx0dGl0bGU6XCLmj5LlhaXooajmoLxcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuICAgIH0sXG5cdFwidG91cHBlcmNhc2VcIjp7XG5cdFx0dGl0bGU6XCLovazmjaLlpKflhplcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcInRvbG93ZXJjYXNlXCI6e1xuXHRcdHRpdGxlOlwi6L2s5o2i5bCP5YaZXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJpbmRlbnRcIjp7XG5cdFx0dGl0bGU6XCLlop7liqDnvKnov5tcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcIm91dGRlbnRcIjp7XG5cdFx0dGl0bGU6XCLlh4/lsJHnvKnov5tcIixcblx0XHRkaXNhYmxlZDpmYWxzZVxuXHR9LFxuXHRcInNwZWNoYXJzXCI6e1xuXHRcdHRpdGxlOlwi54m55q6K56ym5Y+3XCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcblx0XCJmb250Ym9yZGVyXCI6e1xuXHRcdHRpdGxlOlwi5a2X5L2T6L655qGGXCIsXG5cdFx0ZGlzYWJsZWQ6ZmFsc2Vcblx0fSxcbiAgICBcImRhdGVcIjp7XG4gICAgICAgIHRpdGxlOlwi5o+S5YWl5pel5pyfXCIsXG4gICAgICAgIGRpc2FibGVkOmZhbHNlXG4gICAgfSxcbiAgICBcInRpbWVcIjp7XG4gICAgICAgIHRpdGxlOlwi5o+S5YWl5pe26Ze0XCIsXG4gICAgICAgIGRpc2FibGVkOmZhbHNlXG4gICAgfSxcbn1cbnZhciBDb2xvclR5cGVzID0ge1xuXHR0aGVtZUNvbG9yczpbXG5cdFx0W1wiI2ZmZlwiLFwiIzAwMFwiLFwiI2VlZWNlMVwiLFwiIzFmNDk3ZFwiLFwiIzRmODFiZFwiLFwiI2MwNTA0ZFwiLFwiIzliYmI1OVwiLFwiIzgwNjRhMlwiLFwiIzRiYWNjNlwiLFwiI2Y3OTY0NlwiXSxcblx0XHRbXCIjZjJmMmYyXCIsXCI3ZjdmN2ZcIixcIiNkZGQ5YzNcIixcIiNjNmQ5ZjBcIixcIiNkYmU1ZjFcIixcIiNmMmRjZGJcIixcIiNlYmYxZGRcIixcIiNlNWUwZWNcIixcIiNkYmVlZjNcIixcIiNmZGVhZGFcIl0sXG5cdFx0W1wiI2Q4ZDhkOFwiLFwiIzU5NTk1OVwiLFwiI2M0YmQ5N1wiLFwiIzhkYjNlMlwiLFwiI2I4Y2NlNFwiLFwiI2U1YjliN1wiLFwiI2Q3ZTNiY1wiLFwiI2NjYzFkOVwiLFwiI2I3ZGRlOFwiLFwiI2ZiZDViNVwiXSxcblx0XHRbXCIjYmZiZmJmXCIsXCIjM2YzZjNmXCIsXCIjOTM4OTUzXCIsXCIjNTQ4ZGQ0XCIsXCIjOTViM2Q3XCIsXCIjZDk5Njk0XCIsXCIjYzNkNjliXCIsXCIjYjJhMmM3XCIsXCIjOTJjZGRjXCIsXCIjZmFjMDhmXCJdLFxuXHRcdFtcIiNhNWE1YTVcIixcIiMyNjI2MjZcIixcIiM0OTQ0MjlcIixcIiMxNzM2NWRcIixcIiMzNjYwOTJcIixcIiM5NTM3MzRcIixcIiM3NjkyM2NcIixcIiM1ZjQ5N2FcIixcIiMzMTg1OWJcIixcIiNlMzZjMDlcIl0sXG5cdFx0W1wiIzdmN2Y3ZlwiLFwiIzBjMGMwY1wiLFwiIzFkMWIxMFwiLFwiIzBmMjQzZVwiLFwiIzI0NDA2MVwiLFwiIzYzMjQyM1wiLFwiIzRmNjEyOFwiLFwiIzNmMzE1MVwiLFwiIzIwNTg2N1wiLFwiIzk3NDgwNlwiXVxuXHRdLFxuXHRzdGFuZGFyZENvbG9yczpbXCIjYzAwMDAwXCIsXCIjZmYwMDAwXCIsXCIjZmZjMDAwXCIsXCIjZmZmZjAwXCIsXCIjOTJkMDUwXCIsXCIjMDBiMDUwXCIsXCIjMDBiMGYwXCIsXCIjMDA3MGMwXCIsXCIjMDAyMDYwXCIsXCIjNzAzMGEwXCJdXG59XG52YXIgRm9ybXVsYVR5cGVzID0ge1xuXHRjb21tb25Gb3JtdWxhczpbXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0wcHggLTBweFwiLGxhdGV4OlwiXFxcXGZyYWN7IH17IH1cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0zMHB4IC0wcHhcIixsYXRleDpcIl57IH0vX3sgfVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTYwcHggLTBweFwiLGxhdGV4OlwieF57IH1cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi05MHB4IC0wcHhcIixsYXRleDpcInhfeyB9XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTIwcHggLTBweFwiLGxhdGV4OlwieF57IH1feyB9XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTUwcHggLTBweFwiLGxhdGV4OlwiXFxcXGJhcnsgfVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTE4MHB4IC0wcHhcIixsYXRleDpcIlxcXFxzcXJ0eyB9XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMjEwcHggLTBweFwiLGxhdGV4OlwiXFxcXG50aHJvb3R7IH17IH1cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0wcHggLTMwcHhcIixsYXRleDpcIlxcXFxzdW1eeyB9X3tuPX1cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi02MHB4IC0zMHB4XCIsbGF0ZXg6XCJcXFxcbG9nX3sgfVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTkwcHggLTMwcHhcIixsYXRleDpcIlxcXFxsblwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTEyMHB4IC0zMHB4XCIsbGF0ZXg6XCJcXFxcaW50X3sgfV57IH1cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xNTBweCAtMzBweFwiLGxhdGV4OlwiXFxcXG9pbnRfeyB9XnsgfVwifVxuXHRdLFxuXHRzeW1ib2xGb3JtdWxhczpbXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0wcHggLTYwcHhcIixsYXRleDpcIitcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0zMHB4IC02MHB4XCIsbGF0ZXg6XCItXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItNjBweCAtNjBweFwiLGxhdGV4OlwiXFxcXHBtXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItOTBweCAtNjBweFwiLGxhdGV4OlwiXFxcXHRpbWVzXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTIwcHggLTYwcHhcIixsYXRleDpcIlxcXFxhc3RcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xNTBweCAtNjBweFwiLGxhdGV4OlwiXFxcXGRpdlwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTE4MHB4IC02MHB4XCIsbGF0ZXg6XCIvXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMjEwcHggLTYwcHhcIixsYXRleDpcIlxcXFxiaWd0cmlhbmdsZXVwXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMHB4IC05MHB4XCIsbGF0ZXg6XCI9XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMzBweCAtOTBweFwiLGxhdGV4OlwiXFxcXG5lXCJ9LFxuXHRcdFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItNjBweCAtOTBweFwiLGxhdGV4OlwiXFxcXGFwcHJveFwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTkwcHggLTkwcHhcIixsYXRleDpcIj5cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xMjBweCAtOTBweFwiLGxhdGV4OlwiPFwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTE1MHB4IC05MHB4XCIsbGF0ZXg6XCJcXFxcZ2VcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xODBweCAtOTBweFwiLGxhdGV4OlwiXFxcXGxlXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMjEwcHggLTkwcHhcIixsYXRleDpcIlxcXFxpbmZ0eVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTBweCAtMTIwcHhcIixsYXRleDpcIlxcXFxjYXBcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0zMHB4IC0xMjBweFwiLGxhdGV4OlwiXFxcXGN1cFwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTYwcHggLTEyMHB4XCIsbGF0ZXg6XCJcXFxcYmVjYXVzZVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTkwcHggLTEyMHB4XCIsbGF0ZXg6XCJcXFxcdGhlcmVmb3JlXCJ9LFxuXHRcdFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTIwcHggLTEyMHB4XCIsbGF0ZXg6XCJcXFxcc3Vic2V0XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTUwcHggLTEyMHB4XCIsbGF0ZXg6XCJcXFxcc3Vwc2V0XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTgwcHggLTEyMHB4XCIsbGF0ZXg6XCJcXFxcc3Vic2V0ZXFcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0yMTBweCAtMTIwcHhcIixsYXRleDpcIlxcXFxzdXBzZXRlcVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTBweCAtMTUwcHhcIixsYXRleDpcIlxcXFxuc3Vic2V0ZXFcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0zMHB4IC0xNTBweFwiLGxhdGV4OlwiXFxcXG5zdXBzZXRlcVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTYwcHggLTE1MHB4XCIsbGF0ZXg6XCJcXFxcaW5cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi05MHB4IC0xNTBweFwiLGxhdGV4OlwiXFxcXG5pXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTIwcHggLTE1MHB4XCIsbGF0ZXg6XCJcXFxcbm90aW5cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xNTBweCAtMTUwcHhcIixsYXRleDpcIlxcXFxtYXBzdG9cIn0sXG5cdFx0XG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xODBweCAtMTUwcHhcIixsYXRleDpcIlxcXFxsZWZ0YXJyb3dcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0yMTBweCAtMTUwcHhcIixsYXRleDpcIlxcXFxyaWdodGFycm93XCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMHB4IC0xODBweFwiLGxhdGV4OlwiXFxcXExlZnRhcnJvd1wifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTMwcHggLTE4MHB4XCIsbGF0ZXg6XCJcXFxcUmlnaHRhcnJvd1wifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTYwcHggLTE4MHB4XCIsbGF0ZXg6XCJcXFxcbGVmdHJpZ2h0YXJyb3dcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi05MHB4IC0xODBweFwiLGxhdGV4OlwiXFxcXExlZnRyaWdodGFycm93XCJ9LFxuXHRdLFxuXHRhcmFiaWNGb3JtdWxhczpbXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0wcHggLTIxMHB4XCIsbGF0ZXg6XCJcXFxcYWxwaGFcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0zMHB4IC0yMTBweFwiLGxhdGV4OlwiXFxcXGJldGFcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi02MHB4IC0yMTBweFwiLGxhdGV4OlwiXFxcXGdhbW1hXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItOTBweCAtMjEwcHhcIixsYXRleDpcIlxcXFxkZWx0YVwifSxcblx0XHRcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTEyMHB4IC0yMTBweFwiLGxhdGV4OlwiXFxcXHZhcmVwc2lsb25cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xNTBweCAtMjEwcHhcIixsYXRleDpcIlxcXFx2YXJwaGlcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xODBweCAtMjEwcHhcIixsYXRleDpcIlxcXFxsYW1iZGFcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0yMTBweCAtMjEwcHhcIixsYXRleDpcIlxcXFxtdVwifSxcblx0XHRcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTBweCAtMjQwcHhcIixsYXRleDpcIlxcXFxyaG9cIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0zMHB4IC0yNDBweFwiLGxhdGV4OlwiXFxcXHNpZ21hXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItNjBweCAtMjQwcHhcIixsYXRleDpcIlxcXFxvbWVnYVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTkwcHggLTI0MHB4XCIsbGF0ZXg6XCJcXFxcR2FtbWFcIn0sXG5cdFx0XG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xMjBweCAtMjQwcHhcIixsYXRleDpcIlxcXFxEZWx0YVwifSxcblx0XHR7YmFja2dyb3VuZFBvc2l0aW9uOlwiLTE1MHB4IC0yNDBweFwiLGxhdGV4OlwiXFxcXFRoZXRhXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMTgwcHggLTI0MHB4XCIsbGF0ZXg6XCJcXFxcTGFtYmRhXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItMjEwcHggLTI0MHB4XCIsbGF0ZXg6XCJcXFxcWGlcIn0sXG5cdFx0XG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0wcHggLTI3MHB4XCIsbGF0ZXg6XCJcXFxcUGlcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0zMHB4IC0yNzBweFwiLGxhdGV4OlwiXFxcXFNpZ21hXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItNjBweCAtMjcwcHhcIixsYXRleDpcIlxcXFxVcHNpbG9uXCJ9LFxuXHRcdHtiYWNrZ3JvdW5kUG9zaXRpb246XCItOTBweCAtMjcwcHhcIixsYXRleDpcIlxcXFxQaGlcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xMjBweCAtMjcwcHhcIixsYXRleDpcIlxcXFxQc2lcIn0sXG5cdFx0e2JhY2tncm91bmRQb3NpdGlvbjpcIi0xNTBweCAtMjcwcHhcIixsYXRleDpcIlxcXFxPbWVnYVwifSxcblx0XVxufVxudmFyIHRvQXJyYXkgPSBmdW5jdGlvbihzdHIpe1xuXHRyZXR1cm4gc3RyLnNwbGl0KFwiLFwiKTtcbn1cbnZhciBTcGVjaWFsQ2hhcnMgPSBbXG4gICAgeyBuYW1lOlwidHNmaFwiLCB0aXRsZTpcIueJueauiuWtl+esplwiLCBjaGFyczp0b0FycmF5KFwi44CBLOOAgizCtyzLiSzLhyzCqCzjgIMs44CFLOKAlCzvvZ4s4oCWLOKApizigJgs4oCZLOKAnCzigJ0s44CULOOAlSzjgIgs44CJLOOAiizjgIss44CMLOOAjSzjgI4s44CPLOOAlizjgJcs44CQLOOAkSzCsSzDlyzDtyziiLYs4oinLOKIqCziiJEs4oiPLOKIqiziiKks4oiILOKItyziiJos4oqlLOKIpSziiKAs4oySLOKKmSziiKss4oiuLOKJoSziiYws4omILOKIvSziiJ0s4omgLOKJriziia8s4omkLOKJpSziiJ4s4oi1LOKItCzimYIs4pmALMKwLOKAsizigLMs4oSDLO+8hCzCpCzvv6As77+hLOKAsCzCpyzihJYs4piGLOKYhSzil4ss4pePLOKXjizil4cs4peGLOKWoSzilqAs4pazLOKWsizigLss4oaSLOKGkCzihpEs4oaTLOOAkyzjgKEs44CiLOOAoyzjgKQs44ClLOOApizjgKcs44CoLOOAqSzjiqMs446OLOOOjyzjjpws446dLOOOnizjjqEs44+ELOOPjizjj5Es44+SLOOPlSzvuLAs77+iLO+/pCzihKEsy4osy4ssy5ks4oCTLOKAlSzigKUs4oC1LOKEhSzihIks4oaWLOKGlyzihpgs4oaZLOKIlSziiJ8s4oijLOKJkiziiaYs4omnLOKKvyzilZAs4pWRLOKVkizilZMs4pWULOKVlSzilZYs4pWXLOKVmCzilZks4pWaLOKVmyzilZws4pWdLOKVnizilZ8s4pWgLOKVoSzilaIs4pWjLOKVpCzilaUs4pWmLOKVpyzilags4pWpLOKVqizilass4pWsLOKVrSzila4s4pWvLOKVsCzilbEs4pWyLOKVsyziloEs4paCLOKWgyziloQs4paFLOKWhizilocs77+9fyzilogs4paJLOKWiiziloss4paMLOKWjSzilo4s4paPLOKWkyzilpQs4paVLOKWvCzilr0s4peiLOKXoyzil6Qs4pelLOKYiSziipUs44CSLOOAnSzjgJ5cIil9LFxuICAgIHsgbmFtZTpcImxtc3pcIiwgdGl0bGU6XCLnvZfpqazlrZfnrKZcIiwgY2hhcnM6dG9BcnJheShcIuKFsCzihbEs4oWyLOKFsyzihbQs4oW1LOKFtizihbcs4oW4LOKFuSzihaAs4oWhLOKFoizihaMs4oWkLOKFpSzihaYs4oWnLOKFqCzihaks4oWqLOKFq1wiKX0sXG4gICAgeyBuYW1lOlwic3pmaFwiLCB0aXRsZTpcIuaVsOWtpuWtl+esplwiLCBjaGFyczp0b0FycmF5KFwi4pKILOKSiSzikoos4pKLLOKSjCziko0s4pKOLOKSjyzikpAs4pKRLOKSkizikpMs4pKULOKSlSzikpYs4pKXLOKSmCzikpks4pKaLOKSmyzikbQs4pG1LOKRtizikbcs4pG4LOKRuSzikbos4pG7LOKRvCzikb0s4pG+LOKRvyzikoAs4pKBLOKSgizikoMs4pKELOKShSzikoYs4pKHLOKRoCzikaEs4pGiLOKRoyzikaQs4pGlLOKRpizikacs4pGoLOKRqSzjiKAs44ihLOOIoizjiKMs44ikLOOIpSzjiKYs44inLOOIqCzjiKlcIil9LFxuICAgIHsgbmFtZTpcInJ3ZmhcIiwgdGl0bGU6XCLml6XmloflrZfnrKZcIiwgY2hhcnM6dG9BcnJheShcIuOBgSzjgYIs44GDLOOBhCzjgYUs44GGLOOBhyzjgYgs44GJLOOBiizjgYss44GMLOOBjSzjgY4s44GPLOOBkCzjgZEs44GSLOOBkyzjgZQs44GVLOOBlizjgZcs44GYLOOBmSzjgZos44GbLOOBnCzjgZ0s44GeLOOBnyzjgaAs44GhLOOBoizjgaMs44GkLOOBpSzjgaYs44GnLOOBqCzjgaks44GqLOOBqyzjgaws44GtLOOBrizjga8s44GwLOOBsSzjgbIs44GzLOOBtCzjgbUs44G2LOOBtyzjgbgs44G5LOOBuizjgbss44G8LOOBvSzjgb4s44G/LOOCgCzjgoEs44KCLOOCgyzjgoQs44KFLOOChizjgocs44KILOOCiSzjgoos44KLLOOCjCzjgo0s44KOLOOCjyzjgpAs44KRLOOCkizjgpMs44KhLOOCoizjgqMs44KkLOOCpSzjgqYs44KnLOOCqCzjgqks44KqLOOCqyzjgqws44KtLOOCrizjgq8s44KwLOOCsSzjgrIs44KzLOOCtCzjgrUs44K2LOOCtyzjgrgs44K5LOOCuizjgrss44K8LOOCvSzjgr4s44K/LOODgCzjg4Es44OCLOODgyzjg4Qs44OFLOODhizjg4cs44OILOODiSzjg4os44OLLOODjCzjg40s44OOLOODjyzjg5As44ORLOODkizjg5Ms44OULOODlSzjg5Ys44OXLOODmCzjg5ks44OaLOODmyzjg5ws44OdLOODnizjg58s44OgLOODoSzjg6Is44OjLOODpCzjg6Us44OmLOODpyzjg6gs44OpLOODqizjg6ss44OsLOODrSzjg64s44OvLOODsCzjg7Es44OyLOODsyzjg7Qs44O1LOODtlwiKX0sXG4gICAgeyBuYW1lOlwieGx6bVwiLCB0aXRsZTpcIuW4jOiFiuWtl+esplwiLCBjaGFyczp0b0FycmF5KFwizpEszpIszpMszpQszpUszpYszpcszpgszpkszposzpsszpwszp0szp4szp8szqAszqEszqMszqQszqUszqYszqcszqgszqkszrEszrIszrMszrQszrUszrYszrcszrgszrkszroszrsszrwszr0szr4szr8sz4Asz4Esz4Msz4Qsz4Usz4Ysz4csz4gsz4lcIil9LFxuICAgIHsgbmFtZTpcImV3em1cIiwgdGl0bGU6XCLkv4TmloflrZfnrKZcIiwgY2hhcnM6dG9BcnJheShcItCQLNCRLNCSLNCTLNCULNCVLNCBLNCWLNCXLNCYLNCZLNCaLNCbLNCcLNCdLNCeLNCfLNCgLNChLNCiLNCjLNCkLNClLNCmLNCnLNCoLNCpLNCqLNCrLNCsLNCtLNCuLNCvLNCwLNCxLNCyLNCzLNC0LNC1LNGRLNC2LNC3LNC4LNC5LNC6LNC7LNC8LNC9LNC+LNC/LNGALNGBLNGCLNGDLNGELNGFLNGGLNGHLNGILNGJLNGKLNGLLNGMLNGNLNGOLNGPXCIpfSxcbiAgICB7IG5hbWU6XCJweXptXCIsIHRpdGxlOlwi5ou86Z+z5a2X5q+NXCIsIGNoYXJzOnRvQXJyYXkoXCLEgSzDoSzHjizDoCzEkyzDqSzEmyzDqCzEqyzDrSzHkCzDrCzFjSzDsyzHkizDsizFqyzDuizHlCzDuSzHlizHmCzHmizHnCzDvFwiKX0sXG4gICAgeyBuYW1lOlwieXl5YlwiLCB0aXRsZTpcIuiLseivremfs+agh1wiLCBjaGFyczp0b0FycmF5KFwiaTosaSxlLMOmLMqMLMmZOizJmSx1Oix1LMmUOizJlCxhOixlaSxhaSzJlGksyZl1LGF1LGnJmSzOtcmZLHXJmSxwLHQsayxiLGQsZyxmLHMsyoMszrgsaCx2LHosypIsw7AsdMqDLHRyLHRzLGTKkixkcixkeixtLG4sxYssbCxyLHcsaixcIil9LFxuICAgIHsgbmFtZTpcInp5emZcIiwgdGl0bGU6XCLlhbblroNcIiwgY2hhcnM6dG9BcnJheShcIuOEhSzjhIYs44SHLOOEiCzjhIks44SKLOOEiyzjhIws44SNLOOEjizjhI8s44SQLOOEkSzjhJIs44STLOOElCzjhJUs44SWLOOElyzjhJgs44SZLOOEmizjhJss44ScLOOEnSzjhJ4s44SfLOOEoCzjhKEs44SiLOOEoyzjhKQs44SlLOOEpizjhKcs44SoXCIpfVxuXTtcblxudmFyIEVtb3Rpb25JbWFnZXMgPSB7XG5cdERlbW9Vcmw6XCJodHRwOi8vaW1nLmJhaWR1LmNvbS9oaS90c2ovdF8wMDAxLmdpZlwiLFxuXHRCYXNlVXJsOlwiaHR0cDovL2ltZy5iYWlkdS5jb20vaGkvXCIsXG5cdFNtaWxleUluZm9yOntcblx0XHR0YWIwOlsnS2lzcycsICdMb3ZlJywgJ1llYWgnLCAn5ZWK77yBJywgJ+iDjOaJrScsICfpobYnLCAn5oqW6IO4JywgJzg4JywgJ+axlycsICfnnoznnaEnLCAn6bKB5ouJJywgJ+aLjeeglicsICfmj4nohLgnLCAn55Sf5pel5b+r5LmQJywgJ+Wkp+eskScsICfngJHluIPmsZd+JywgJ+aDiuiuticsICfoh63nvo4nLCAn5YK756yRJywgJ+aKm+WqmuecvCcsICflj5HmgJInLCAn5omT6YWx5rK5JywgJ+S/r+WNp+aSkScsICfmsJTmhKQnLCAnPycsICflkLsnLCAn5oCSJywgJ+iDnOWIqScsICdISScsICdLSVNTJywgJ+S4jeivtCcsICfkuI3opoEnLCAn5omv6IqxJywgJ+Wkp+W/gycsICfpobYnLCAn5aSn5oOKJywgJ+mjnuWQuycsICfprLzohLgnLCAn5a6z576eJywgJ+WPo+awtCcsICfni4Llk60nLCAn5p2lJywgJ+WPkei0ouS6hicsICflkIPopb/nk5wnLCAn5aWX54miJywgJ+Wus+e+nicsICfluobnpZ0nLCAn5oiR5p2l5LqGJywgJ+aVsuaJkycsICfmmZXkuoYnLCAn6IOc5YipJywgJ+iHree+jicsICfooqvmiZPkuoYnLCAn6LSq5ZCDJywgJ+i/juaOpScsICfphbcnLCAn5b6u56yRJywgJ+S6suWQuycsICfosIPnmq4nLCAn5oOK5oGQJywgJ+iAjemFtycsICflj5HngasnLCAn5a6z576eJywgJ+axl+awtCcsICflpKflk60nLCAnJywgJ+WKoOayuScsICflm7AnLCAn5L2gTkInLCAn5pmV5YCSJywgJ+W8gOW/gycsICflgbfnrJEnLCAn5aSn5ZOtJywgJ+a7tOaxlycsICflj7nmsJQnLCAn6LaF6LWeJywgJz8/JywgJ+mjnuWQuycsICflpKnkvb8nLCAn5pKS6IqxJywgJ+eUn+awlCcsICfooqvnoLgnLCAn5ZCT5YK7JywgJ+maj+aEj+WQkCddLFxuXHRcdHRhYjE6WydLaXNzJywgJ0xvdmUnLCAnWWVhaCcsICfllYrvvIEnLCAn6IOM5omtJywgJ+mhticsICfmipbog7gnLCAnODgnLCAn5rGXJywgJ+eejOedoScsICfpsoHmi4knLCAn5ouN56CWJywgJ+aPieiEuCcsICfnlJ/ml6Xlv6vkuZAnLCAn5pGK5omLJywgJ+edoeiniScsICfnmKvlnZAnLCAn5peg6IGKJywgJ+aYn+aYn+mXqicsICfml4vovawnLCAn5Lmf5LiN6KGMJywgJ+mDgemXtycsICfmraNNdXNpYycsICfmipPlopknLCAn5pKe5aKZ6Iez5q27JywgJ+atquWktCcsICfmiLPnnLwnLCAn6aOY6L+HJywgJ+S6kuebuOaLjeeglicsICfnoI3mrbvkvaAnLCAn5omU5qGM5a2QJywgJ+Wwkeael+WvuicsICfku4DkuYjvvJ8nLCAn6L2s5aS0JywgJ+aIkeeIseeJm+WlticsICfmiJHouKInLCAn5pGH5pmDJywgJ+aZleWOpScsICflnKjnrLzlrZDph4wnLCAn6ZyH6I2hJ10sXG5cdFx0dGFiMjpbJ+Wkp+eskScsICfngJHluIPmsZd+JywgJ+aDiuiuticsICfoh63nvo4nLCAn5YK756yRJywgJ+aKm+WqmuecvCcsICflj5HmgJInLCAn5oiR6ZSZ5LqGJywgJ21vbmV5JywgJ+awlOaEpCcsICfmjJHpgJcnLCAn5ZC7JywgJ+aAkicsICfog5zliKknLCAn5aeU5bGIJywgJ+WPl+S8pCcsICfor7TllaXlkaLvvJ8nLCAn6Zet5Zi0JywgJ+S4jScsICfpgJfkvaDnjqnlhL8nLCAn6aOe5ZC7JywgJ+ecqeaZlScsICfprZTms5UnLCAn5oiR5p2l5LqGJywgJ+edoeS6hicsICfmiJHmiZMnLCAn6Zet5Zi0JywgJ+aJkycsICfmiZPmmZXkuoYnLCAn5Yi354mZJywgJ+eIhuaPjScsICfngrjlvLknLCAn5YCS56uLJywgJ+WIruiDoeWtkCcsICfpgqrmgbbnmoTnrJEnLCAn5LiN6KaB5LiN6KaBJywgJ+eIseaBi+S4rScsICfmlL7lpKfku5Tnu4bnnIsnLCAn5YG356qlJywgJ+i2hemrmOWFtCcsICfmmZUnLCAn5p2+5Y+j5rCUJywgJ+aIkei3kScsICfkuqvlj5cnLCAn5L+u5YW7JywgJ+WTrScsICfmsZcnLCAn5ZWKficsICfng63ng4jmrKLov44nLCAn5omT6YWx5rK5JywgJ+S/r+WNp+aSkScsICc/J10sXG5cdFx0dGFiMzpbJ0hJJywgJ0tJU1MnLCAn5LiN6K+0JywgJ+S4jeimgScsICfmia/oirEnLCAn5aSn5b+DJywgJ+mhticsICflpKfmg4onLCAn6aOe5ZC7JywgJ+msvOiEuCcsICflrrPnvp4nLCAn5Y+j5rC0JywgJ+eLguWTrScsICfmnaUnLCAn5rOq55y8JywgJ+a1geazqicsICfnlJ/msJQnLCAn5ZCQ6IiMJywgJ+WWnOasoicsICfml4vovawnLCAn5YaN6KeBJywgJ+aKk+eLgicsICfmsZcnLCAn6YSZ6KeGJywgJ+aLnCcsICflkJDooYAnLCAn5ZiYJywgJ+aJk+S6uicsICfouabot7MnLCAn5Y+Y6IS4JywgJ+aJr+iCiScsICflkINUbycsICflkIPoirEnLCAn5ZC55rOh5rOh57OWJywgJ+Wkp+WPmOi6qycsICfpo57lpKnoiJ4nLCAn5Zue55y4JywgJ+WPr+aAnCcsICfnjJvmir0nLCAn5rOh5rOhJywgJ+iLueaenCcsICfkurInLCAnJywgJ+mqmuiInicsICfng6fpppknLCAn552hJywgJ+Wll+Wog+WogycsICfmjYXmjYUnLCAn6Iie5YCSJywgJ+ilv+e6ouafvycsICfniLHmhZUnLCAn5pGHJywgJ+aRh+aRhicsICfmnYLogI0nLCAn5oub6LSiJywgJ+iiq+autCcsICfooqvnkIPpl7cnLCAn5aSn5oOKJywgJ+eQhuaDsycsICfmrKfmiZMnLCAn5ZGV5ZCQJywgJ+eijicsICflkJDnl7AnXSxcblx0XHR0YWI0Olsn5Y+R6LSi5LqGJywgJ+WQg+ilv+eTnCcsICflpZfniaInLCAn5a6z576eJywgJ+W6huelnScsICfmiJHmnaXkuoYnLCAn5pWy5omTJywgJ+aZleS6hicsICfog5zliKknLCAn6Iet576OJywgJ+iiq+aJk+S6hicsICfotKrlkIMnLCAn6L+O5o6lJywgJ+mFtycsICfpobYnLCAn5bm46L+QJywgJ+eIseW/gycsICfourInLCAn6YCB6IqxJywgJ+mAieaLqSddLFxuXHRcdHRhYjU6Wyflvq7nrJEnLCAn5Lqy5ZC7JywgJ+iwg+earicsICfmg4rorrYnLCAn6ICN6YW3JywgJ+WPkeeBqycsICflrrPnvp4nLCAn5rGX5rC0JywgJ+Wkp+WTrScsICflvpfmhI8nLCAn6YSZ6KeGJywgJ+WbsCcsICflpLjlpZYnLCAn5pmV5YCSJywgJ+eWkemXricsICflqpLlqYYnLCAn54uC5ZCQJywgJ+mdkuibmScsICflj5HmhIEnLCAn5Lqy5ZC7JywgJycsICfniLHlv4MnLCAn5b+D56KOJywgJ+eOq+eRsCcsICfnpLzniaknLCAn5ZOtJywgJ+WluOeskScsICflj6/niLEnLCAn5b6X5oSPJywgJ+WRsueJmScsICfmmrTmsZcnLCAn5qWa5qWa5Y+v5oCcJywgJ+WbsCcsICflk60nLCAn55Sf5rCUJywgJ+aDiuiuticsICflj6PmsLQnLCAn5b2p6Jm5JywgJ+WknOepuicsICflpKrpmLMnLCAn6ZKx6ZKxJywgJ+eBr+azoScsICflkpbllaEnLCAn6JuL57OVJywgJ+mfs+S5kCcsICfniLEnLCAn6IOc5YipJywgJ+i1nicsICfphJnop4YnLCAnT0snXSxcblx0XHR0YWI2Olsn55S35YWcJywgJ+Wls+WFnCcsICflvIDlv4MnLCAn5LmW5LmWJywgJ+WBt+eskScsICflpKfnrJEnLCAn5oq95rOjJywgJ+Wkp+WTrScsICfml6DlpYgnLCAn5ru05rGXJywgJ+WPueawlCcsICfni4LmmZUnLCAn5aeU5bGIJywgJ+i2hei1nicsICc/PycsICfnlpHpl64nLCAn6aOe5ZC7JywgJ+WkqeS9vycsICfmkpLoirEnLCAn55Sf5rCUJywgJ+iiq+eguCcsICflj6PmsLQnLCAn5rOq5aWUJywgJ+WQk+WCuycsICflkJDoiIzlpLQnLCAn54K55aS0JywgJ+maj+aEj+WQkCcsICfml4vovawnLCAn5Zuw5ZuwJywgJ+mEmeinhicsICfni4LpobYnLCAn56+u55CDJywgJ+WGjeingScsICfmrKLov47lhYnkuLQnLCAn5oGt5Zac5Y+R6LSiJywgJ+eojeetiScsICfmiJHlnKjnur8nLCAn5oGV5LiN6K6u5Lu3JywgJ+W6k+aIv+aciei0pycsICfotKflnKjot6/kuIonXVxuXHR9LFxuXHRFbW90aW9uVGFiczp7XG5cdFx0dGFiMDp7IG5hbWU6XCLnsr7pgIlcIiwgcHJlZml4Olwial8wMFwiLCBwYXRoOlwiangyL1wifSxcblx0XHR0YWIxOnsgbmFtZTpcIuWFlOaWr+WfulwiLCBwcmVmaXg6XCJ0XzAwXCIsIHBhdGg6XCJ0c2ovXCJ9LFxuXHRcdHRhYjI6eyBuYW1lOlwi57u/6LGG6JuZXCIsIHByZWZpeDpcIndfMDBcIiwgcGF0aDpcImxkdy9cIn0sXG5cdFx0dGFiMzp7IG5hbWU6XCJCT0JPXCIsIHByZWZpeDpcIkJfMDBcIiwgcGF0aDpcImJvYm8vXCJ9LFxuXHRcdHRhYjQ6eyBuYW1lOlwiYmFieeeMq1wiLCBwcmVmaXg6XCJDXzAwXCIsIHBhdGg6XCJiYWJ5Y2F0L1wifSxcblx0XHR0YWI1OnsgbmFtZTpcIuazoeazoVwiLCBwcmVmaXg6XCJpX2ZcIiwgcGF0aDpcImZhY2UvXCJ9LFxuXHRcdHRhYjY6eyBuYW1lOlwi5pyJ5ZWKXCIsIHByZWZpeDpcInlfMDBcIiwgcGF0aDpcInlvdWEvXCJ9LFxuXHR9XG59XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0RWRpdG9ySWNvblR5cGVzOkVkaXRvckljb25UeXBlcyxcblx0Q29sb3JUeXBlczpDb2xvclR5cGVzLFxuXHRGb3JtdWxhVHlwZXM6Rm9ybXVsYVR5cGVzLFxuXHRTcGVjaWFsQ2hhcnM6U3BlY2lhbENoYXJzLFxuXHRFbW90aW9uSW1hZ2VzOkVtb3Rpb25JbWFnZXNcbn0iLCJ2YXIgRWRpdG9yRE9NID0ge1xuXHRzdG9wUHJvcGFnYXRpb246ZnVuY3Rpb24oZSl7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0aWYoZS5zdG9wUHJvcGFnYXRpb24pe1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9ZWxzZXtcblx0XHRcdGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cdGlzVGV4dE5vZGU6ZnVuY3Rpb24obm9kZSl7XG5cdFx0aWYoIW5vZGUpIHJldHVybiBmYWxzZTtcblx0XHRyZXR1cm4gbm9kZS5ub2RlVHlwZT09MyB8fCBub2RlLm5vZGVOYW1lPT1cIiN0ZXh0XCJcblx0fSxcblx0aXNTcGFuTm9kZTpmdW5jdGlvbihub2RlKXtcblx0XHRpZighbm9kZSkgcmV0dXJuIGZhbHNlO1xuXHRcdHJldHVybiBub2RlLm5vZGVUeXBlPT0xICYmIG5vZGUubm9kZU5hbWU9PVwiU1BBTlwiXG5cdH0sXG5cdGlzTnVsbE9mVGV4dE5vZGU6ZnVuY3Rpb24obm9kZSl7XG5cdFx0aWYodGhpcy5pc1RleHROb2RlKG5vZGUpKXtcblx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZT09XCJcIjtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cbn1cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yRE9NO1xuIiwidmFyIEVkaXRvckhpc3RvcnkgPSB7XG5cdGN1ckNvbW1hbmQ6bnVsbCxcblx0Y29tbWFuZFN0YWNrOltdLFxuXHRjb21tYW5kSW5kZXg6LTEsXG5cdGNhblVuZG86ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5jb21tYW5kU3RhY2subGVuZ3RoPjAgJiYgdGhpcy5jb21tYW5kSW5kZXghPS0xO1xuXHR9LFxuXHRjYW5SZWRvOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuY29tbWFuZFN0YWNrLmxlbmd0aD4wICYmIHRoaXMuY29tbWFuZEluZGV4IT0odGhpcy5jb21tYW5kU3RhY2subGVuZ3RoLTEpO1xuXHR9LFxuXHR1bmRvOmZ1bmN0aW9uKCl7XG5cdFx0aWYodGhpcy5jYW5VbmRvKCkpe1xuXHRcdFx0dGhpcy5jb21tYW5kSW5kZXggPSB0aGlzLmNvbW1hbmRJbmRleC0xO1xuXHRcdFx0dGhpcy5jdXJDb21tYW5kID0gdGhpcy5jb21tYW5kU3RhY2tbdGhpcy5jb21tYW5kSW5kZXhdO1xuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJ1bmRvXCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jYW5VbmRvKCk7XG5cdH0sXG5cdHJlZG86ZnVuY3Rpb24oKXtcblx0XHRpZih0aGlzLmNhblJlZG8oKSl7XG5cdFx0XHR0aGlzLmNvbW1hbmRJbmRleCA9IHRoaXMuY29tbWFuZEluZGV4KzE7XG5cdFx0XHR0aGlzLmN1ckNvbW1hbmQgPSB0aGlzLmNvbW1hbmRTdGFja1t0aGlzLmNvbW1hbmRJbmRleF07XG5cdFx0XHRkb2N1bWVudC5leGVjQ29tbWFuZChcInJlZG9cIik7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNhblJlZG8oKTtcblx0fSxcblx0ZXhlY0NvbW1hbmQ6ZnVuY3Rpb24oY29tbWFuZCxmbGFnLGFyZ3Mpe1xuXHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKGNvbW1hbmQsZmxhZyxhcmdzKTtcblx0XHRpZihjb21tYW5kPT1cInNlbGVjdGFsbFwiKSBcblx0XHRcdHJldHVybjtcblx0XHR0aGlzLmNvbW1hbmRJbmRleCA9IHRoaXMuY29tbWFuZEluZGV4KzE7XG5cdFx0dGhpcy5jdXJDb21tYW5kID0ge2NvbW1hbmQsZmxhZyxhcmdzfTtcblx0XHQvLyDlv4XpnIDnp7vpmaRpbmRleOWQjueahGNvbW1hbmRcblx0XHR0aGlzLmNvbW1hbmRTdGFjay5zcGxpY2UodGhpcy5jb21tYW5kSW5kZXgsdGhpcy5jb21tYW5kU3RhY2subGVuZ3RoLXRoaXMuY29tbWFuZEluZGV4KTtcblx0XHR0aGlzLmNvbW1hbmRTdGFja1t0aGlzLmNvbW1hbmRJbmRleF0gPSB7Y29tbWFuZCxmbGFnLGFyZ3N9O1xuXHR9LFxuXHRnZXRDdXJDb21tYW5kOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuY3VyQ29tbWFuZDtcblx0fSxcblx0Z2V0Q29tbWFuZFN0YWNrOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuY29tbWFuZFN0YWNrO1xuXHR9LFxuXHRnZXRDb21tYW5kSW5kZXg6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5jb21tYW5kSW5kZXg7XG5cdH0sXG5cdGNsZWFyOmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5jdXJDb21tYW5kID0gbnVsbDtcblx0XHR0aGlzLmNvbW1hbmRTdGFjayA9IFtdO1xuXHRcdHRoaXMuY29tbWFuZEluZGV4ID0gLTE7XG5cdH1cbn1cdFx0XG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvckhpc3Rvcnk7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuXG4vLyByZXNpemUgY29udGV4dFxudmFyIG1pbldpZHRoID0gMTI7XG52YXIgbWluSGVpZ2h0ID0gMTI7XG52YXIgRWRpdG9yUmVzaXplID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGFyZ2V0Om51bGwsXG5cdFx0XHRwb3NpdGlvbjp7XG5cdFx0XHRcdHg6MCx5OjBcblx0XHRcdH0sXG5cdFx0XHR3aWR0aDowLFxuXHRcdFx0aGVpZ2h0OjAsXG5cdFx0XHRzdGFydFBvc2l0aW9uOntcblx0XHRcdFx0eDowLHk6MFxuXHRcdFx0fSxcblx0XHRcdGN1clBvc2l0aW9uOntcblx0XHRcdFx0eDowLHk6MFxuXHRcdFx0fVxuXHRcdH1cdFxuXHR9LFxuXHRzZXRUYXJnZXQ6ZnVuY3Rpb24odGFyZ2V0KXtcblx0XHR2YXIgd2lkdGggPXBhcnNlRmxvYXQodGFyZ2V0LndpZHRoIHx8IHRhcmdldC5zdHlsZS53aWR0aCk7XG5cdFx0dmFyIGhlaWdodCA9IHBhcnNlRmxvYXQodGFyZ2V0LmhlaWdodCB8fCB0YXJnZXQuc3R5bGUuaGVpZ2h0KTtcblx0XHR2YXIgb2Zmc2V0TGVmdCA9IHRhcmdldC5vZmZzZXRMZWZ0K3RhcmdldC5vZmZzZXRQYXJlbnQub2Zmc2V0TGVmdDtcblx0XHR2YXIgb2Zmc2V0VG9wID0gdGFyZ2V0Lm9mZnNldFRvcCt0YXJnZXQub2Zmc2V0UGFyZW50Lm9mZnNldFRvcDs7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHR0YXJnZXQ6dGFyZ2V0LFxuXHRcdFx0d2lkdGg6d2lkdGgsXG5cdFx0XHRoZWlnaHQ6aGVpZ2h0LFxuXHRcdFx0c2hvdzp0cnVlLFxuXHRcdFx0cG9zaXRpb246e3g6b2Zmc2V0TGVmdCx5Om9mZnNldFRvcH1cblx0XHR9KVxuXHR9LFxuXHRnZXRUYXJnZXQ6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS50YXJnZXQ7XG5cdH0sXG5cdGNsZWFyVGFyZ2V0OmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHR0YXJnZXQ6bnVsbCxcblx0XHRcdHNob3c6ZmFsc2Vcblx0XHR9KVxuXHR9LFxuXHRzdG9wUHJvcGFnYXRpb246ZnVuY3Rpb24oZSl7XG5cdFx0ICBpZihlLnN0b3BQcm9wYWdhdGlvbilcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHQgIGVsc2Vcblx0XHRcdFx0ZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuXHR9LFxuXHRjbGVhclNlbGVjdDpmdW5jdGlvbihlKXtcblx0XHRpZih3aW5kb3cuZ2V0U2VsZWN0aW9uKXtcblx0XHRcdFx0d2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuXHRcdH1lbHNle1xuXHRcdFx0ZG9jdW1lbnQuc2VsZWN0aW9uLmVtcHR5KCk7XG5cdFx0fVxuXHR9LFxuXHRnZXRNb3VzZVBvc2l0aW9uOmZ1bmN0aW9uKGUpe1xuXHRcdGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcblx0XHR2YXIgc2Nyb2xsWCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcblx0XHR2YXIgc2Nyb2xsWSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG5cblx0XHR2YXIgeCA9IHBhcnNlRmxvYXQoZS5wYWdlWCB8fCBlLmNsaWVudFggK3Njcm9sbFgpO1xuXHRcdHZhciB5ID0gcGFyc2VGbG9hdChlLnBhZ2VZIHx8IGUuY2xpZW50WSArc2Nyb2xsWSk7XG5cblx0XHRyZXR1cm4ge3g6eCx5Onl9O1xuXHR9LFxuXHRoYW5kbGVNb3VzZURvd246ZnVuY3Rpb24oZSl7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblx0XHR2YXIgY2xhc3NOYW1lID0gdGFyZ2V0LmNsYXNzTmFtZTtcblx0XHR2YXIgc3RhcnRQb3NpdGlvbiA9IHRoaXMuZ2V0TW91c2VQb3NpdGlvbihlKTtcblx0XHR0aGlzLmNsZWFyU2VsZWN0KCk7XG5cdFx0aWYoY2xhc3NOYW1lLmluZGV4T2YoXCJudy1yZXNpemVcIikhPS0xKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRkaXJlY3Rpb246XCJudy1yZXNpemVcIixcblx0XHRcdFx0c3RhcnRQb3NpdGlvbjpzdGFydFBvc2l0aW9uXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRpZihjbGFzc05hbWUuaW5kZXhPZihcIm5lLXJlc2l6ZVwiKSE9LTEpe1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGRpcmVjdGlvbjpcIm5lLXJlc2l6ZVwiLFxuXHRcdFx0XHRzdGFydFBvc2l0aW9uOnN0YXJ0UG9zaXRpb25cblx0XHRcdH0pXG5cdFx0fVxuXHRcdGlmKGNsYXNzTmFtZS5pbmRleE9mKFwic3ctcmVzaXplXCIpIT0tMSl7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0ZGlyZWN0aW9uOlwic3ctcmVzaXplXCIsXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb246c3RhcnRQb3NpdGlvblxuXHRcdFx0fSlcblx0XHR9XG5cdFx0aWYoY2xhc3NOYW1lLmluZGV4T2YoXCJzZS1yZXNpemVcIikhPS0xKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRkaXJlY3Rpb246XCJzZS1yZXNpemVcIixcblx0XHRcdFx0c3RhcnRQb3NpdGlvbjpzdGFydFBvc2l0aW9uXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLmhhbmRsZU1vdXNlVXApO1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMuaGFuZGxlTW91c2VVcCk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIix0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG5cblx0XHR0aGlzLnN0b3BQcm9wYWdhdGlvbihlKTtcblx0fSxcblx0aGFuZGxlTW91c2VNb3ZlOmZ1bmN0aW9uKGUpe1xuXHRcdGlmKCF0aGlzLnN0YXRlLmRpcmVjdGlvbikgcmV0dXJuO1xuXHRcdHRoaXMuY2xlYXJTZWxlY3QoKTtcblx0XHRlID0gZSB8fCBldmVudDtcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXHRcdHZhciBjdXJQb3NpdGlvbiA9IHRoaXMuZ2V0TW91c2VQb3NpdGlvbihlKTtcblx0XHR2YXIgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLnN0YXRlLnN0YXJ0UG9zaXRpb247XG5cdFx0dmFyIGR4ID0gY3VyUG9zaXRpb24ueC1zdGFydFBvc2l0aW9uLng7XG5cdFx0dmFyIGR5ID0gY3VyUG9zaXRpb24ueS1zdGFydFBvc2l0aW9uLnk7XG5cdFx0dmFyIHdpZHRoID0gdGhpcy5zdGF0ZS53aWR0aDtcblx0XHR2YXIgaGVpZ2h0ID0gdGhpcy5zdGF0ZS5oZWlnaHQ7XG5cdFx0XG5cdFx0c3dpdGNoKHRoaXMuc3RhdGUuZGlyZWN0aW9uKXtcblx0XHRcdGNhc2UgXCJudy1yZXNpemVcIjpcblx0XHRcdFx0d2lkdGggLT0gZHg7XG5cdFx0XHRcdGhlaWdodCAtPSBkeTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwibmUtcmVzaXplXCI6XG5cdFx0XHRcdHdpZHRoICs9IGR4O1xuXHRcdFx0XHRoZWlnaHQgLT0gZHk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInN3LXJlc2l6ZVwiOlxuXHRcdFx0XHR3aWR0aCAtPSBkeDtcblx0XHRcdFx0aGVpZ2h0ICs9IGR5O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJzZS1yZXNpemVcIjpcblx0XHRcdFx0d2lkdGggKz0gZHg7XG5cdFx0XHRcdGhlaWdodCArPSBkeTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdHN0YXJ0UG9zaXRpb24gPSBjdXJQb3NpdGlvbjtcblx0XHRpZih3aWR0aDxtaW5XaWR0aCkgd2lkdGggPSBtaW5XaWR0aDtcblx0XHRpZihoZWlnaHQ8bWluSGVpZ2h0KSBoZWlnaHQgPSBtaW5IZWlnaHQ7XG5cdFx0XG5cdFx0aWYodGhpcy5zdGF0ZS50YXJnZXQpe1xuXHRcdFx0dGhpcy5zdGF0ZS50YXJnZXQuc3R5bGUud2lkdGggPSB3aWR0aCtcInB4XCI7XG5cdFx0XHR0aGlzLnN0YXRlLnRhcmdldC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQrXCJweFwiO1xuXHRcdH1cblx0XHRcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHN0YXJ0UG9zaXRpb246c3RhcnRQb3NpdGlvbixcblx0XHRcdHdpZHRoOndpZHRoLFxuXHRcdFx0aGVpZ2h0OmhlaWdodFxuXHRcdH0pXG5cblx0XHR0aGlzLnN0b3BQcm9wYWdhdGlvbihlKTtcblx0fSxcblx0aGFuZGxlTW91c2VVcDpmdW5jdGlvbihlKXtcblx0XHRpZighdGhpcy5zdGF0ZS5kaXJlY3Rpb24pIHJldHVybjtcblx0XHR0aGlzLmNsZWFyU2VsZWN0KCk7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblx0XHR2YXIgY3VyUG9zaXRpb24gPSB0aGlzLmdldE1vdXNlUG9zaXRpb24oZSk7XG5cdFx0dmFyICBzdGFydFBvc2l0aW9uID0gdGhpcy5zdGF0ZS5zdGFydFBvc2l0aW9uO1xuXHRcdHZhciBkeCA9IGN1clBvc2l0aW9uLngtc3RhcnRQb3NpdGlvbi54O1xuXHRcdHZhciBkeSA9IGN1clBvc2l0aW9uLnktc3RhcnRQb3NpdGlvbi55O1xuXHRcdHZhciB3aWR0aCA9IHRoaXMuc3RhdGUud2lkdGg7XG5cdFx0dmFyIGhlaWdodCA9IHRoaXMuc3RhdGUuaGVpZ2h0O1xuXHRcdFxuXHRcdHN3aXRjaCh0aGlzLnN0YXRlLmRpcmVjdGlvbil7XG5cdFx0XHRjYXNlIFwibnctcmVzaXplXCI6XG5cdFx0XHRcdHdpZHRoIC09IGR4O1xuXHRcdFx0XHRoZWlnaHQgLT0gZHk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIm5lLXJlc2l6ZVwiOlxuXHRcdFx0XHR3aWR0aCArPSBkeDtcblx0XHRcdFx0aGVpZ2h0IC09IGR5O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJzdy1yZXNpemVcIjpcblx0XHRcdFx0d2lkdGggLT0gZHg7XG5cdFx0XHRcdGhlaWdodCArPSBkeTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwic2UtcmVzaXplXCI6XG5cdFx0XHRcdHdpZHRoICs9IGR4O1xuXHRcdFx0XHRoZWlnaHQgKz0gZHk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRzdGFydFBvc2l0aW9uID0gY3VyUG9zaXRpb247XG5cdFx0XG5cdFx0aWYod2lkdGg8bWluV2lkdGgpIHdpZHRoID0gbWluV2lkdGg7XG5cdFx0aWYoaGVpZ2h0PG1pbkhlaWdodCkgaGVpZ2h0ID0gbWluSGVpZ2h0O1xuXHRcdFxuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMuaGFuZGxlTW91c2VVcCk7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIix0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG5cdFx0aWYodGhpcy5zdGF0ZS50YXJnZXQpe1xuXHRcdFx0dGhpcy5zdGF0ZS50YXJnZXQuc3R5bGUud2lkdGggPSB3aWR0aCtcInB4XCI7XG5cdFx0XHR0aGlzLnN0YXRlLnRhcmdldC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQrXCJweFwiO1xuXHRcdH1cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHN0YXJ0UG9zaXRpb246c3RhcnRQb3NpdGlvbixcblx0XHRcdGhlaWdodDpoZWlnaHQsXG5cdFx0XHR3aWR0aDp3aWR0aCxcblx0XHRcdGRpcmVjdGlvbjpudWxsLFxuXHRcdH0pXG5cdFx0XG5cdFx0dGhpcy5zdG9wUHJvcGFnYXRpb24oZSk7XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHZhciBzdHlsZSA9IHtcblx0XHRcdHdpZHRoOnRoaXMuc3RhdGUud2lkdGgsXG5cdFx0XHRoZWlnaHQ6dGhpcy5zdGF0ZS5oZWlnaHQsXG5cdFx0XHRsZWZ0OnRoaXMuc3RhdGUucG9zaXRpb24ueCxcblx0XHRcdHRvcDp0aGlzLnN0YXRlLnBvc2l0aW9uLnksXG5cdFx0XHRkaXNwbGF5OnRoaXMuc3RhdGUuc2hvdz9cImJsb2NrXCI6XCJub25lXCIsXG5cdFx0XHRwb3NpdG9pbjpcImFic29sdXRlXCJcblx0XHR9O1x0XHRcblx0XHRyZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwiZWRpdG9yLXJlc2l6ZVwiIHN0eWxlPXtzdHlsZX0+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stcmVzaXplIG53LXJlc2l6ZVwiIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn0gb25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VNb3ZlfSBvbk1vdXNlVXA9e3RoaXMuaGFuZGxlTW91c2VVcH0+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stcmVzaXplIG5lLXJlc2l6ZVwiIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn0gb25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VNb3ZlfSBvbk1vdXNlVXA9e3RoaXMuaGFuZGxlTW91c2VVcH0+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stcmVzaXplIHN3LXJlc2l6ZVwiIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn0gb25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VNb3ZlfSBvbk1vdXNlVXA9e3RoaXMuaGFuZGxlTW91c2VVcH0+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stcmVzaXplIHNlLXJlc2l6ZVwiIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn0gb25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VNb3ZlfSBvbk1vdXNlVXA9e3RoaXMuaGFuZGxlTW91c2VVcH0+PC9kaXY+XG5cdFx0PC9kaXY+KVxuXHR9XG59KVx0XHRcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JSZXNpemU7IiwidmFyIEVkaXRvckRPTSA9IHJlcXVpcmUoJy4vRWRpdG9yRE9NJyk7XG5cbk5vZGVMaXN0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIG5vZGVzID0gW107XG5cdGZvcih2YXIgaT0wO2k8dGhpcy5sZW5ndGg7aSsrKXtcblx0XHRub2Rlcy5wdXNoKHRoaXNbaV0pO1xuXHR9XG5cdHJldHVybiBub2Rlcztcbn1cblxudmFyIEVkaXRvclNlbGVjdGlvbiA9IHtcblx0cmFuZ2U6bnVsbCxcblx0c2VsZWN0aW9uOm51bGwsXG5cdHN0b3JlZFJhbmdlOmZhbHNlLFxuXHRnZXRTZWxlY3Rpb246ZnVuY3Rpb24oKXtcblx0XHRpZih3aW5kb3cuZ2V0U2VsZWN0aW9uKSByZXR1cm4gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRcdGVsc2UgaWYoZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKSByZXR1cm4gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0ZWxzZSBpZihkb2N1bWVudC5zZWxlY3Rpb24pIHJldHVybiBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcblx0XHRlbHNlIHJldHVybiBudWxsO1xuXHR9LFxuXHRjbG9uZVJhbmdlOmZ1bmN0aW9uKCl7IC8vIGNsb25lUmFuZ2Vcblx0XHRpZih0aGlzLnN0b3JlZFJhbmdlKSByZXR1cm47XG5cdFx0dGhpcy5zZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xuXHRcdHRoaXMuc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuXHRcdGlmKHRoaXMuc2VsZWN0aW9uICYmIHRoaXMucmFuZ2UpIHtcblx0XHRcdHRoaXMuc2VsZWN0aW9uLmFkZFJhbmdlKHRoaXMucmFuZ2UuY2xvbmVSYW5nZSgpKTtcblx0XHRcdHRoaXMucmFuZ2UgPSB0aGlzLnJhbmdlLmNsb25lUmFuZ2UoKTtcblx0XHR9XG5cdH0sXG5cdGdldFRleHROb2RlczpmdW5jdGlvbigpe1xuXHRcdGlmKHRoaXMucmFuZ2UuY29sbGFwc2VkKSByZXR1cm4gW107XG5cdFx0dmFyIHBhcmVudCA9IHRoaXMucmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XG5cdFx0dmFyIHN0YXJ0Tm9kZSA9IHRoaXMucmFuZ2Uuc3RhcnRDb250YWluZXI7XG5cdFx0dmFyIHN0YXJ0T2Zmc2V0ID0gdGhpcy5yYW5nZS5zdGFydE9mZnNldDtcblx0XHR2YXIgZW5kTm9kZSA9IHRoaXMucmFuZ2UuZW5kQ29udGFpbmVyO1xuXHRcdHZhciBlbmRPZmZzZXQgPSB0aGlzLnJhbmdlLmVuZE9mZnNldDtcblx0XHR2YXIgdGV4dE5vZGVzID0gW107XG5cblx0XHRpZihzdGFydE5vZGU9PT1lbmROb2RlICYmIEVkaXRvckRPTS5pc1RleHROb2RlKHN0YXJ0Tm9kZSkpe1xuXHRcdFx0dGV4dE5vZGVzLnB1c2goe1xuXHRcdFx0XHRjaGlsZE5vZGU6c3RhcnROb2RlLFxuXHRcdFx0XHRzdGFydE9mZnNldDpzdGFydE9mZnNldCxcblx0XHRcdFx0ZW5kT2Zmc2V0OmVuZE9mZnNldFxuXHRcdFx0fSlcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHZhciBjaGlsZE5vZGVzID0gcGFyZW50LmNoaWxkTm9kZXMudG9BcnJheSgpLHN0YXJ0RmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGNoaWxkTm9kZSA9IGNoaWxkTm9kZXMuc2hpZnQoKTtcblx0XHRcdHdoaWxlKGNoaWxkTm9kZSl7XG5cdFx0XHRcdGlmKEVkaXRvckRPTS5pc1RleHROb2RlKGNoaWxkTm9kZSkpe1xuXHRcdFx0XHRcdGlmKGNoaWxkTm9kZT09PXN0YXJ0Tm9kZSl7XG5cdFx0XHRcdFx0XHR0ZXh0Tm9kZXMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdGNoaWxkTm9kZTpjaGlsZE5vZGUsXG5cdFx0XHRcdFx0XHRcdHN0YXJ0T2Zmc2V0OnN0YXJ0T2Zmc2V0LFxuXHRcdFx0XHRcdFx0XHRlbmRPZmZzZXQ6Y2hpbGROb2RlLmxlbmd0aFxuXHRcdFx0XHRcdFx0fSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RmxhZyA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYoY2hpbGROb2RlPT09ZW5kTm9kZSl7XG5cdFx0XHRcdFx0XHR0ZXh0Tm9kZXMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdGNoaWxkTm9kZTpjaGlsZE5vZGUsXG5cdFx0XHRcdFx0XHRcdHN0YXJ0T2Zmc2V0OjAsXG5cdFx0XHRcdFx0XHRcdGVuZE9mZnNldDplbmRPZmZzZXRcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fWVsc2UgaWYodGV4dE5vZGVzLmxlbmd0aD4wKXtcblx0XHRcdFx0XHRcdHRleHROb2Rlcy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0Y2hpbGROb2RlOmNoaWxkTm9kZSxcblx0XHRcdFx0XHRcdFx0c3RhcnRPZmZzZXQ6MCxcblx0XHRcdFx0XHRcdFx0ZW5kT2Zmc2V0OmNoaWxkTm9kZS5sZW5ndGhcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKGNoaWxkTm9kZT09ZW5kTm9kZSl7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cbiAgICAgICAgICAgICAgICB2YXIgbmV3Q2hpbGROb2RlcyA9IGNoaWxkTm9kZS5jaGlsZE5vZGVzLnRvQXJyYXkoKVxuICAgICAgICAgICAgICAgIFxuXHRcdFx0XHRjaGlsZE5vZGVzID0gbmV3Q2hpbGROb2Rlcy5jb25jYXQoY2hpbGROb2Rlcyk7XG5cdFx0XHRcdGNoaWxkTm9kZSA9IGNoaWxkTm9kZXMuc2hpZnQoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRleHROb2Rlcztcblx0fSxcblx0Z2V0U3Bhbk5vZGVzOmZ1bmN0aW9uKCl7XG5cdFx0aWYodGhpcy5yYW5nZS5jb2xsYXBzZWQpIHJldHVybiBbXTtcblx0XHR2YXIgcGFyZW50ID0gdGhpcy5yYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcblx0XHR2YXIgc3RhcnROb2RlID0gdGhpcy5yYW5nZS5zdGFydENvbnRhaW5lcjtcblx0XHR2YXIgZW5kTm9kZSA9IHRoaXMucmFuZ2UuZW5kQ29udGFpbmVyO1xuXHRcdHZhciBzcGFuTm9kZXMgPSBbXTtcblxuXHRcdGlmKHN0YXJ0Tm9kZT09PWVuZE5vZGUgJiYgRWRpdG9yRE9NLmlzU3Bhbk5vZGUoc3RhcnROb2RlKSl7XG5cdFx0XHRzcGFuTm9kZXMucHVzaChzdGFydE5vZGUpXG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR2YXIgY2hpbGROb2RlcyA9IHBhcmVudC5jaGlsZE5vZGVzLnRvQXJyYXkoKSxpPTAsc3RhcnRGbGFnID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgY2hpbGROb2RlID0gY2hpbGROb2Rlcy5zaGlmdCgpO1xuXHRcdFx0d2hpbGUoY2hpbGROb2RlKXtcblx0XHRcdFx0aWYoY2hpbGROb2RlPT09c3RhcnROb2RlKXtcblx0XHRcdFx0XHRzdGFydEZsYWcgPSB0cnVlO1xuXHRcdFx0XHRcdGlmKEVkaXRvckRPTS5pc1NwYW5Ob2RlKGNoaWxkTm9kZS5wYXJlbnROb2RlKSl7XG5cdFx0XHRcdFx0XHRzcGFuTm9kZXMucHVzaChjaGlsZE5vZGUucGFyZW50Tm9kZSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoRWRpdG9yRE9NLmlzU3Bhbk5vZGUoY2hpbGROb2RlKSAmJiBzdGFydEZsYWcpe1xuXHRcdFx0XHRcdHNwYW5Ob2Rlcy5wdXNoKGNoaWxkTm9kZSlcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihjaGlsZE5vZGU9PWVuZE5vZGUpe1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgdmFyIG5ld0NoaWxkTm9kZXMgPSBjaGlsZE5vZGUuY2hpbGROb2Rlcy50b0FycmF5KClcbiAgICAgICAgICAgICAgICBcblx0XHRcdFx0Y2hpbGROb2RlcyA9IG5ld0NoaWxkTm9kZXMuY29uY2F0KGNoaWxkTm9kZXMpO1xuXHRcdFx0XHRjaGlsZE5vZGUgPSBjaGlsZE5vZGVzLnNoaWZ0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBzcGFuTm9kZXM7XG5cdH0sXG5cdGdldENvbW1vbkFuY2VzdG9yOmZ1bmN0aW9uKCl7XG5cdFx0aWYodGhpcy5yYW5nZS5jb2xsYXBzZWQpIHJldHVybiBudWxsO1xuXHRcdHZhciBwYXJlbnQgPSB0aGlzLnJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuXHRcdHJldHVybiBwYXJlbnQ7XG5cdH0sXG5cdGFkZFJhbmdlOmZ1bmN0aW9uKHN0YXJ0Q29udGFpbmVyLHN0YXJ0T2Zmc2V0LGVuZENvbnRhaW5lcixlbmRPZmZzZXQpeyAgLy8gYWRkUmFuZ2Vcblx0XHR0aGlzLnNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0dGhpcy5zZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG5cdFx0aWYodGhpcy5zZWxlY3Rpb24gJiYgdGhpcy5yYW5nZSl7XG5cdFx0XHR0aGlzLnJhbmdlLnNldFN0YXJ0KHN0YXJ0Q29udGFpbmVyLHN0YXJ0T2Zmc2V0KTtcblx0XHRcdHRoaXMucmFuZ2Uuc2V0RW5kKGVuZENvbnRhaW5lcixlbmRPZmZzZXQpO1xuXHRcdFx0dGhpcy5zZWxlY3Rpb24uYWRkUmFuZ2UodGhpcy5yYW5nZS5jbG9uZVJhbmdlKCkpO1xuXHRcdFx0dGhpcy5yYW5nZSA9IHRoaXMucmFuZ2UuY2xvbmVSYW5nZSgpO1xuXHRcdH1cblx0fSxcblx0Y3JlYXRlUmFuZ2U6ZnVuY3Rpb24oKXtcblx0XHRpZih0aGlzLnN0b3JlZFJhbmdlKSByZXR1cm47XG5cdFx0dGhpcy5zZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpXG5cdFx0aWYodGhpcy5zZWxlY3Rpb24gJiYgdGhpcy5zZWxlY3Rpb24ucmFuZ2VDb3VudD4wKSB7XG5cdFx0XHR0aGlzLnJhbmdlID0gdGhpcy5zZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKS5jbG9uZVJhbmdlKCk7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnJhbmdlID0gbnVsbDtcblx0XHR9XG5cdH0sXG5cdGNsZWFyUmFuZ2U6ZnVuY3Rpb24oKXtcblx0XHRpZih0aGlzLnN0b3JlZFJhbmdlKSByZXR1cm47XG5cdFx0dGhpcy5zZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xuXHRcdHRoaXMuc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuXHR9LFxuXHRnZXRSYW5nZVN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHJhbmdlU3RhdGUgPSB7fTsgXG5cdFx0Ly8gaW5pdCBpY29ucyBzdGF0ZVxuXHRcdHZhciBjYW5BY3RpdmVJY29ucyA9IFwiYm9sZCBpdGFsaWMgdW5kZXJsaW5lIHN0cmlrZXRocm91Z2ggc3VwZXJzY3JpcHQgc3Vic2NyaXB0IGp1c3RpZnljZW50ZXIganVzdGlmeWxlZnQganVzdGlmeXJpZ2h0XCI7XG5cdFx0dmFyIGljb25zID0gY2FuQWN0aXZlSWNvbnMuc3BsaXQoXCIgXCIpO1xuXHRcdGZvcih2YXIgaT0wO2k8aWNvbnMubGVuZ3RoO2krKyl7XG5cdFx0XHRyYW5nZVN0YXRlW2ljb25zW2ldXSA9IHtpY29uOmljb25zW2ldLGFjdGl2ZTpmYWxzZX1cblx0XHR9XG5cdFx0Ly8gY2hhbmdlICBpY29ucyBzdGF0ZVxuXHRcdGlmKHRoaXMucmFuZ2Upe1xuXHRcdFx0dmFyIHBhcmVudEVsZW1lbnQgPSB0aGlzLnJhbmdlLnN0YXJ0Q29udGFpbmVyLnBhcmVudEVsZW1lbnQ7XG5cdFx0XHR3aGlsZShwYXJlbnRFbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSE9XCJESVZcIil7XG5cdFx0XHRcdHN3aXRjaChwYXJlbnRFbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSl7XG5cdFx0XHRcdFx0Y2FzZSBcIklcIjpcblx0XHRcdFx0XHRcdHJhbmdlU3RhdGVbXCJpdGFsaWNcIl0gPSB7IGFjdGl2ZTp0cnVlLGljb246XCJpdGFsaWNcIn1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJCXCI6XG5cdFx0XHRcdFx0XHRyYW5nZVN0YXRlW1wiYm9sZFwiXSA9IHsgYWN0aXZlOnRydWUsaWNvbjpcImJvbGRcIn1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJVXCI6XG5cdFx0XHRcdFx0XHRyYW5nZVN0YXRlW1widW5kZXJsaW5lXCJdID0geyBhY3RpdmU6dHJ1ZSxpY29uOlwidW5kZXJsaW5lXCJ9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiU1RSSUtFXCI6XG5cdFx0XHRcdFx0XHRyYW5nZVN0YXRlW1wic3RyaWtldGhyb3VnaFwiXSA9IHsgYWN0aXZlOnRydWUsaWNvbjpcInN0cmlrZXRocm91Z2hcIn1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJTVVBcIjpcblx0XHRcdFx0XHRcdHJhbmdlU3RhdGVbXCJzdXBlcnNjcmlwdFwiXSA9IHsgYWN0aXZlOnRydWUsaWNvbjpcInN1cGVyc2NyaXB0XCJ9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiU1VCXCI6XG5cdFx0XHRcdFx0XHRyYW5nZVN0YXRlW1wic3Vic2NyaXB0XCJdID0geyBhY3RpdmU6dHJ1ZSxpY29uOlwic3Vic2NyaXB0XCJ9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiRk9OVFwiOlxuXHRcdFx0XHRcdFx0cmFuZ2VTdGF0ZVtcImZvcmVjb2xvclwiXSA9IHtjb2xvcjogcGFyZW50RWxlbWVudC5jb2xvciwgaWNvbjpcImZvcmVjb2xvclwifVxuXHRcdFx0XHRcdFx0cmFuZ2VTdGF0ZVtcImJhY2tjb2xvclwiXSA9IHtjb2xvcjogcGFyZW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IsIGljb246XCJiYWNrY29sb3JcIn1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJQXCI6XG5cdFx0XHRcdFx0Y2FzZSBcIkgxXCI6XG5cdFx0XHRcdFx0Y2FzZSBcIkgyXCI6XG5cdFx0XHRcdFx0Y2FzZSBcIkgzXCI6XG5cdFx0XHRcdFx0Y2FzZSBcIkg1XCI6XG5cdFx0XHRcdFx0Y2FzZSBcIkg2XCI6XG5cdFx0XHRcdFx0XHR2YXIgdGV4dEFsaWduID0gcGFyZW50RWxlbWVudC5zdHlsZS50ZXh0QWxpZ24/cGFyZW50RWxlbWVudC5zdHlsZS50ZXh0QWxpZ246XCJsZWZ0XCI7XG5cdFx0XHRcdFx0XHR2YXIgZm9udEZhbWlseSA9IHBhcmVudEVsZW1lbnQuc3R5bGUuZm9udEZhbWlseT9wYXJlbnRFbGVtZW50LnN0eWxlLmZvbnRGYW1pbHk6XCLlrovkvZMsU2ltU3VuXCI7XG5cdFx0XHRcdFx0XHR2YXIgZm9udFNpemUgPSBwYXJlbnRFbGVtZW50LnN0eWxlLmZvbnRTaXplP3BhcmVudEVsZW1lbnQuc3R5bGUuZm9udFNpemU6XCIxMnB4XCI7XG5cdFx0XHRcdFx0XHRyYW5nZVN0YXRlW1wianVzdGlmeWNlbnRlclwiXSA9IHsgYWN0aXZlOnRleHRBbGlnbj09XCJjZW50ZXJcIixpY29uOlwic3Vic2NyaXB0XCJ9XG5cdFx0XHRcdFx0XHRyYW5nZVN0YXRlW1wianVzdGlmeWxlZnRcIl0gPSB7IGFjdGl2ZTp0ZXh0QWxpZ249PVwibGVmdFwiLGljb246XCJzdWJzY3JpcHRcIn1cblx0XHRcdFx0XHRcdHJhbmdlU3RhdGVbXCJqdXN0aWZ5cmlnaHRcIl0gPSB7IGFjdGl2ZTp0ZXh0QWxpZ249PVwicmlnaHRcIixpY29uOlwic3Vic2NyaXB0XCJ9XG5cdFx0XHRcdFx0XHRyYW5nZVN0YXRlW1wicGFyYWdyYXBoXCJdID0ge3ZhbHVlOlwicFwiLGljb246XCJwYXJhZ3JhcGhcIn1cblx0XHRcdFx0XHRcdHJhbmdlU3RhdGVbXCJmb250ZmFtaWx5XCJdID0ge3ZhbHVlOiBmb250RmFtaWx5LGljb246XCJmb250ZmFtaWx5XCJ9XG5cdFx0XHRcdFx0XHRyYW5nZVN0YXRlW1wiZm9udHNpemVcIl0gPSB7dmFsdWU6IGZvbnRTaXplLGljb246XCJmb250c2l6ZVwifVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIkJMT0NLUVVPVEVcIjpcblx0XHRcdFx0XHRcdHJhbmdlU3RhdGVbXCJpbmRlbnRcIl0gPSB7IGFjdGl2ZTp0cnVlLGljb246XCJpbmRlbnRcIn1cblx0XHRcdFx0XHRcdHJhbmdlU3RhdGVbXCJvdXRkZW50XCJdID0geyBhY3RpdmU6ZmFsc2UsaWNvbjpcImluZGVudFwifVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdFx0cGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0aWYoIXJhbmdlU3RhdGVbXCJmb3JlY29sb3JcIl0pIHJhbmdlU3RhdGVbXCJmb3JlY29sb3JcIl0gPSB7Y29sb3I6ICd0cmFuc3BhcmVudCcsIGljb246XCJmb3JlY29sb3JcIn1cblx0XHRpZighcmFuZ2VTdGF0ZVtcImJhY2tjb2xvclwiXSkgcmFuZ2VTdGF0ZVtcImJhY2tjb2xvclwiXSA9IHtjb2xvcjogJ3RyYW5zcGFyZW50JywgaWNvbjpcImJhY2tjb2xvclwifVxuXHRcdGlmKCFyYW5nZVN0YXRlW1wiaW5kZW50XCJdKSB7XG5cdFx0XHRyYW5nZVN0YXRlW1wib3V0ZGVudFwiXSA9IHsgYWN0aXZlOnRydWUsaWNvbjpcImluZGVudFwifVxuXHRcdFx0cmFuZ2VTdGF0ZVtcImluZGVudFwiXSA9IHsgYWN0aXZlOmZhbHNlLGljb246XCJpbmRlbnRcIn1cblx0XHR9XG5cdFx0cmV0dXJuIHJhbmdlU3RhdGU7XG5cdH0sXG5cdHN0b3JlUmFuZ2U6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnN0b3JlZFJhbmdlID0gdGhpcy5yYW5nZT90aGlzLnJhbmdlLmNsb25lUmFuZ2UoKTpudWxsO1xuXHR9LFxuXHRyZXN0b3JlUmFuZ2U6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnJhbmdlID0gdGhpcy5zdG9yZWRSYW5nZT90aGlzLnN0b3JlZFJhbmdlLmNsb25lUmFuZ2UoKTpudWxsO1xuXHRcdHRoaXMuc3RvcmVkUmFuZ2UgPSBudWxsO1xuXHRcdHRoaXMuY2xvbmVSYW5nZSgpO1xuXHR9XG59XG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvclNlbGVjdGlvbjsiLCJ2YXIgSU5URVJWQUxfTVMgPSAxMDAwLzYwO1xuaWYoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpe1xuXHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2spe1xuXHRcdHNldFRpbWVvdXQoY2FsbGJhY2ssSU5URVJWQUxfTVMpO1xuXHR9XG59XG5cbnZhciB0aW1lb3V0cyA9IFtdO1xudmFyIGludGVydmFscyA9IFtdO1xudmFyIGFuaW1pdGVzID0gW107XG52YXIgcnVubmluZyA9IGZhbHNlO1xudmFyIGNvdW50ID0gMDtcblxudmFyIEVkaXRvclRpbWVyID0ge1xuXHRhZGRDb3VudDpmdW5jdGlvbigpe1xuXHRcdGNvdW50ID0gY291bnQgKzE7XG5cdH0sXG5cdHNldFRpbWVvdXQ6ZnVuY3Rpb24oY2FsbGJhY2ssbXMpe1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5tcyA9IG1zP21zOklOVEVSVkFMX01TO1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5rZXkgPSBcInRpbWVvdXRcIituZXcgRGF0ZSgpLnZhbHVlT2YoKStcIi1cIitNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMTAwMCk7XG5cdFx0Y2FsbGJhY2sucHJvdG90eXBlLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5lbmRUaW1lID0gbmV3IERhdGUoKS52YWx1ZU9mKCk7XG5cdFx0dGltZW91dHMucHVzaChjYWxsYmFjayk7XG5cdFx0cmV0dXJuIGNhbGxiYWNrLnByb3RvdHlwZS5rZXk7XG5cdH0sXG5cdGNsZWFyVGltZW91dDpmdW5jdGlvbihrZXkpe1xuXHRcdHZhciBfdGltZW91dHMgPSB0aW1lb3V0cy5maWx0ZXIoZnVuY3Rpb24oZWxlLHBvcyl7XG5cdFx0XHRyZXR1cm4gZWxlLnByb3RvdHlwZS5rZXkgPT0ga2V5O1xuXHRcdH0pXG5cdFx0aWYoX3RpbWVvdXRzLmxlbmd0aD4wKXtcblx0XHRcdHZhciBpbmRleCA9IHRpbWVvdXRzLmluZGV4T2YoX3RpbWVvdXRzWzBdKTtcblx0XHRcdGlmKGluZGV4IT0tMSkgdGltZW91dHMuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIF90aW1lb3V0c1swXTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fSxcblx0c2V0SW50ZXJ2YWw6ZnVuY3Rpb24oY2FsbGJhY2ssbXMpe1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5tcyA9IG1zP21zOklOVEVSVkFMX01TO1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5rZXkgPSBcImludGVydmFsXCIrbmV3IERhdGUoKS52YWx1ZU9mKCkrXCItXCIrTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjEwMDApO1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLnZhbHVlT2YoKTtcblx0XHRjYWxsYmFjay5wcm90b3R5cGUuZW5kVGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xuXHRcdGNhbGxiYWNrLnByb3RvdHlwZS5sYXN0VGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xuXHRcdGludGVydmFscy5wdXNoKGNhbGxiYWNrKTtcblx0XHRyZXR1cm4gY2FsbGJhY2sucHJvdG90eXBlLmtleTtcblx0fSxcblx0Y2xlYXJJbnRlcnZhbDpmdW5jdGlvbihrZXkpe1xuXHRcdHZhciBfaW50ZXJ2YWxzID0gaW50ZXJ2YWxzLmZpbHRlcihmdW5jdGlvbihlbGUscG9zKXtcblx0XHRcdHJldHVybiBlbGUucHJvdG90eXBlLmtleSA9PSBrZXk7XG5cdFx0fSlcblx0XHRpZihfaW50ZXJ2YWxzLmxlbmd0aD4wKXtcblx0XHRcdHZhciBpbmRleCA9IGludGVydmFscy5pbmRleE9mKF9pbnRlcnZhbHNbMF0pO1xuXHRcdFx0aWYoaW5kZXghPS0xKSBpbnRlcnZhbHMuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIF9pbnRlcnZhbHNbMF07XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH0sXG5cdGFuaW1hdGU6ZnVuY3Rpb24oY2FsbGJhY2spe1xuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoRWRpdG9yVGltZXIuYW5pbWF0ZSk7XG5cdFx0aWYocnVubmluZyl7XG5cdFx0XHRmb3IodmFyIGk9MDtpPGFuaW1pdGVzLmxlbmd0aDtpKyspe1xuXHRcdFx0XHRhbmltaXRlc1tpXSh7XG5cdFx0XHRcdFx0Y291bnQ6Y291bnRcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHRcdEVkaXRvclRpbWVyLmFkZENvdW50KCk7IC8vIGNvdW50Kytcblx0XHR9XG5cdFx0Zm9yKHZhciBpPTA7aTx0aW1lb3V0cy5sZW5ndGg7aSsrKXtcblx0XHRcdHRpbWVvdXRzW2ldLnByb3RvdHlwZS5lbmRUaW1lID0gbmV3IERhdGUoKS52YWx1ZU9mKCk7XG5cdFx0XHRpZigodGltZW91dHNbaV0ucHJvdG90eXBlLmVuZFRpbWUtdGltZW91dHNbaV0ucHJvdG90eXBlLnN0YXJ0VGltZSk+PXRpbWVvdXRzW2ldLnByb3RvdHlwZS5tcyAmJiAhdGltZW91dHNbaV0ucHJvdG90eXBlLmRpc2FibGVkKXtcblx0XHRcdFx0dGltZW91dHNbaV0uY2FsbCh0aW1lb3V0c1tpXS5wcm90b3R5cGUsdGltZW91dHNbaV0ucHJvdG90eXBlLmVuZFRpbWUpO1xuXHRcdFx0XHR0aW1lb3V0c1tpXS5wcm90b3R5cGUuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IodmFyIGk9MDtpPGludGVydmFscy5sZW5ndGg7aSsrKXtcblx0XHRcdGludGVydmFsc1tpXS5wcm90b3R5cGUuZW5kVGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xuXHRcdFx0aWYoKGludGVydmFsc1tpXS5wcm90b3R5cGUuZW5kVGltZS1pbnRlcnZhbHNbaV0ucHJvdG90eXBlLmxhc3RUaW1lKT49aW50ZXJ2YWxzW2ldLnByb3RvdHlwZS5tcyAmJiAhaW50ZXJ2YWxzW2ldLnByb3RvdHlwZS5kaXNhYmxlZCl7XG5cdFx0XHRcdGludGVydmFsc1tpXS5jYWxsKGludGVydmFsc1tpXS5wcm90b3R5cGUsaW50ZXJ2YWxzW2ldLnByb3RvdHlwZS5lbmRUaW1lKTtcblx0XHRcdFx0aW50ZXJ2YWxzW2ldLnByb3RvdHlwZS5sYXN0VGltZSA9IGludGVydmFsc1tpXS5wcm90b3R5cGUuZW5kVGltZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGltZW91dHMgPSB0aW1lb3V0cy5maWx0ZXIoZnVuY3Rpb24oZWxlLHBvcyl7cmV0dXJuICFlbGUucHJvdG90eXBlLmRpc2FibGVkfSk7XG5cdFx0aW50ZXJ2YWxzID0gaW50ZXJ2YWxzLmZpbHRlcihmdW5jdGlvbihlbGUscG9zKXtyZXR1cm4gIWVsZS5wcm90b3R5cGUuZGlzYWJsZWR9KTtcblx0fSxcblx0c3RhcnRBbmltYXRpb246ZnVuY3Rpb24oKXtcblx0XHRydW5uaW5nID0gdHJ1ZTtcblx0fSxcblx0c3RvcEFuaW1hdGlvbjpmdW5jdGlvbigpe1xuXHRcdHJ1bm5pbmcgPSBmYWxzZTtcblx0fSxcblx0YWRkQW5pbWF0aW9uSGFuZGxlcjpmdW5jdGlvbihoYW5kbGVyKXtcblx0XHR2YXIgX3J1bm5pbmcgPSBydW5uaW5nO1xuXHRcdEVkaXRvclRpbWVyLnN0b3BBbmltYXRpb24oaGFuZGxlcik7XG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe1xuXHRcdFx0YW5pbWl0ZXMucHVzaChoYW5kbGVyKTtcblx0XHRcdGlmKF9ydW5uaW5nKSBFZGl0b3JUaW1lci5zdGFydEFuaW1hdGlvbihoYW5kbGVyKVxuXHRcdH0pXG5cdH0sXG5cdHJlbW92ZUFuaW1hdGlvbkhhbmRsZXI6ZnVuY3Rpb24oaGFuZGxlcil7XG5cdFx0dmFyIF9ydW5uaW5nID0gcnVubmluZztcblx0XHRFZGl0b3JUaW1lci5zdG9wQW5pbWF0aW9uKGhhbmRsZXIpO1xuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpbmRleCA9IGFuaW1pdGVzLmluZGV4T2YoaGFuZGxlcik7XG5cdFx0XHRpZihpbmRleCE9LTEpIGFuaW1pdGVzLnNwbGljZShoYW5kbGVyLGluZGV4KTtcblx0XHRcdGlmKF9ydW5uaW5nKSBFZGl0b3JUaW1lci5zdGFydEFuaW1hdGlvbihoYW5kbGVyKTtcblx0XHR9KVxuXHR9XG59XG5cbkVkaXRvclRpbWVyLmFuaW1hdGUoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JUaW1lcjsiLCJcbnZhciBnZXRFcnJvciA9IGZ1bmN0aW9uKG9wdGlvbnMseGhyKXtcbiAgICB2YXIgIG1zZyA9ICdjYW5ub3QgcG9zdCAnK29wdGlvbnMudXJsK1wiOlwiK3hoci5zdGF0dXM7XG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcihtc2cpO1xuICAgIGVyci5zdGF0dXMgPSB4aHIuc3RhdHVzO1xuICAgIGVyci5tZXRob2QgPSAncG9zdCc7XG4gICAgZXJyLnVybCA9IG9wdGlvbnMudXJsO1xuICAgIHJldHVybiBlcnI7XG59XG52YXIgZ2V0Qm9keSA9IGZ1bmN0aW9uKHhocil7XG4gICAgdmFyIHRleHQgPSB4aHIucmVzcG9uc2VUZXh0IHx8IHhoci5yZXNwb25zZTtcbiAgICBpZighdGV4dCl7XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbiAgICBcbiAgICB0cnl7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRleHQpO1xuICAgIH1jYXRjaChlKXtcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxufVxudmFyIFVwbG9hZGVyID0ge1xuICAgIHBvc3Q6IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgICAgICBpZih0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICBpZih4aHIudXBsb2FkKXtcbiAgICAgICAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGlmKGUudG90YWw+MCl7XG4gICAgICAgICAgICAgICAgICAgIGUucGVyY2VudCA9IGUubG9hZGVkIC8gZS50b3RhbCoxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdGlvbnMub25Mb2FkKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQob3B0aW9ucy5maWxlbmFtZSxvcHRpb25zLmZpbGUpO1xuICAgICAgICBpZihvcHRpb25zLmRhdGEpe1xuICAgICAgICAgICAgZm9yKHZhciBpIGluIG9wdGlvbnMuZGF0YSl7XG4gICAgICAgICAgICAgICAgZm9ybURhdGFbaV0gPSBvcHRpb25zLmRhdGFbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIG9wdGlvbnMub25FbmQoZSk7XG4gICAgICAgICAgICBvcHRpb25zLm9uRXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoeGhyLnN0YXR1cyAhPT0gMjAwKXtcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uRW5kKGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLm9uRXJyb3IoZ2V0RXJyb3Iob3B0aW9ucyx4aHIpLGdldEJvZHkoeGhyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcHRpb25zLm9uRW5kKGUpO1xuICAgICAgICAgICAgb3B0aW9ucy5vblN1Y2Nlc3MoZ2V0Qm9keSh4aHIpKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB4aHIub3BlbigncG9zdCcsb3B0aW9ucy51cmwsdHJ1ZSk7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywnWE1MSHR0cFJlcXVlc3QnKTtcbiAgICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPXtcbiAgICB1cGxvYWRGaWxlOmZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgICAgICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy51cmwgfHwgXCIvdXBsb2FkXCI7XG4gICAgICAgICAgb3B0aW9ucy5maWxlbmFtZSA9IG9wdGlvbnMuZmlsZW5hbWUgfHwgXCJmaWxlXCI7XG4gICAgICAgICAgb3B0aW9ucy5iZWZvcmVVcGxvYWQgPSBvcHRpb25zLmJlZm9yZVVwbG9hZCB8fCBmdW5jdGlvbihlKXsgcmV0dXJuIHRydWU7IH07XG4gICAgICAgICAgb3B0aW9ucy5vblN1Y2Nlc3MgPSBvcHRpb25zLm9uU3VjY2VzcyB8fCBmdW5jdGlvbihlKXt9O1xuICAgICAgICAgIG9wdGlvbnMub25FcnJvciA9IG9wdGlvbnMub25FcnJvciB8fCBmdW5jdGlvbihlKXt9O1xuICAgICAgICAgIG9wdGlvbnMub25Mb2FkID0gb3B0aW9ucy5vbkxvYWQgfHwgZnVuY3Rpb24oZSl7fTtcbiAgICAgICAgICBvcHRpb25zLm9uU3RhcnQgPSBvcHRpb25zLm9uU3RhcnQgfHwgZnVuY3Rpb24oZSl7fTtcbiAgICAgICAgICBvcHRpb25zLm9uRW5kID0gb3B0aW9ucy5vbkVuZCB8fCBmdW5jdGlvbihlKXt9O1xuICAgICAgICAgIFxuICAgICAgICAgaWYob3B0aW9ucy5iZWZvcmVVcGxvYWQob3B0aW9ucykpe1xuICAgICAgICAgICAgIG9wdGlvbnMub25TdGFydChvcHRpb25zKTtcbiAgICAgICAgICAgICAvLyDlvIDlp4vkuIrkvKDmlofku7ZcbiAgICAgICAgICAgICBVcGxvYWRlci5wb3N0KG9wdGlvbnMpO1xuICAgICAgICAgfVxuICAgIH0sXG4gICAgdXBsb2FkRmlsZXM6ZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgICAgIFxuICAgIH1cbn0iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG52YXIgeyBcblx0RWRpdG9ySWNvblR5cGVzXG59ID0gcmVxdWlyZSgnLi9jb25zdGFudHMvRWRpdG9yQ29uc3RhbnRzJyk7XG5cbi8vIHV0bGlsc1xudmFyIEVkaXRvckhpc3RvcnkgPSByZXF1aXJlKCcuL3V0aWxzL0VkaXRvckhpc3RvcnknKTtcbnZhciBFZGl0b3JTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3V0aWxzL0VkaXRvclNlbGVjdGlvbicpO1xudmFyIEVkaXRvckRPTSA9IHJlcXVpcmUoJy4vdXRpbHMvRWRpdG9yRE9NJyk7XG52YXIgRWRpdG9yUmVzaXplID0gcmVxdWlyZSgnLi91dGlscy9FZGl0b3JSZXNpemUucmVhY3QnKTtcbnZhciBFZGl0b3JUaW1lciA9IHJlcXVpcmUoJy4vdXRpbHMvRWRpdG9yVGltZXInKVxuLy8gZGlhbG9nICYgZHJvcGRvd25cbnZhciBDb2xvckRyb3Bkb3duID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3BsdWdpbnMvQ29sb3JEcm9wZG93bi5yZWFjdCcpO1xudmFyIEZvcm11bGFEcm9wZG93biA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9wbHVnaW5zL0Zvcm11bGFEcm9wZG93bi5yZWFjdCcpO1xudmFyIFRhYmxlUGlja2VyRHJvcGRvd24gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGx1Z2lucy9UYWJsZVBpY2tlckRyb3Bkb3duLnJlYWN0Jyk7XG4vLyBjb21ib2JveFxudmFyIEZvbnRTaXplQ29tYm9Cb3g9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9wbHVnaW5zL0ZvbnRTaXplQ29tYm9Cb3gucmVhY3QnKTtcbnZhciBGb250RmFtaWx5Q29tYm9Cb3ggPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGx1Z2lucy9Gb250RmFtaWx5Q29tYm9Cb3gucmVhY3QnKTtcbnZhciBQYXJhZ3JhcGhDb21ib0JveCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9wbHVnaW5zL1BhcmFncmFwaENvbWJvQm94LnJlYWN0Jyk7XG4vLyBkaWFsb2dcbnZhciBFbW90aW9uRGlhbG9nID0gIHJlcXVpcmUoJy4vY29tcG9uZW50cy9wbHVnaW5zL0Vtb3Rpb25EaWFsb2cucmVhY3QnKTtcbnZhciBTcGVjaWFsQ2hhcnNEaWFsb2cgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGx1Z2lucy9TcGVjaWFsQ2hhcnNEaWFsb2cucmVhY3QnKTtcbnZhciBJbWFnZURpYWxvZyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9wbHVnaW5zL0ltYWdlRGlhbG9nLnJlYWN0Jyk7XG5cbi8vIGJhc2UgY29tcG9uZW50c1xudmFyIEVkaXRvclRvb2xiYXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvY29yZS9FZGl0b3JUb29sYmFyLnJlYWN0Jyk7XG52YXIgRWRpdG9yVGV4dEFyZWEgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvY29yZS9FZGl0b3JUZXh0QXJlYS5yZWFjdCcpO1xudmFyIEVkaXRvckNvbnRlbnRFZGl0YWJsZURpdiA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9jb3JlL0VkaXRvckNvbnRlbnRFZGl0YWJsZURpdi5yZWFjdCcpO1xuXG4vLyDpnIDopoHlpJbpg6jlvJXnlKhNYXRoUXVpbGxcbnZhciBNUSA9IE1hdGhRdWlsbC5nZXRJbnRlcmZhY2UoMik7XG5cbi8vIGtleSBkb3duIGNvbnRleHRcbnZhciBzYXZlU2NlbmVUaW1lciA9IG51bGw7XG52YXIgbWF4SW5wdXRDb3VudCA9IDIwO1xudmFyIGxhc3RLZXlDb2RlID0gbnVsbDtcbnZhciBrZXljb250ID0gMDtcblxuaWYoIURhdGUucHJvdG90eXBlLkZvcm1hdCl7XG5cdERhdGUucHJvdG90eXBlLkZvcm1hdCA9IGZ1bmN0aW9uKG4pIHtcblx0XHR2YXIgaSA9IHtcblx0XHRcdFwiTStcIjogdGhpcy5nZXRNb250aCgpICsgMSxcblx0XHRcdFwiZCtcIjogdGhpcy5nZXREYXRlKCksXG5cdFx0XHRcImgrXCI6IHRoaXMuZ2V0SG91cnMoKSxcblx0XHRcdFwibStcIjogdGhpcy5nZXRNaW51dGVzKCksXG5cdFx0XHRcInMrXCI6IHRoaXMuZ2V0U2Vjb25kcygpLFxuXHRcdFx0XCJxK1wiOiBNYXRoLmZsb29yKCh0aGlzLmdldE1vbnRoKCkgKyAzKSAvIDMpLFxuXHRcdFx0UzogdGhpcy5nZXRNaWxsaXNlY29uZHMoKVxuXHRcdH0sIHQ7XG5cdFx0Lyh5KykvLnRlc3QobikgJiYgKG4gPSBuLnJlcGxhY2UoUmVnRXhwLiQxLCAodGhpcy5nZXRGdWxsWWVhcigpICsgXCJcIikuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKSkpO1xuXHRcdGZvciAodCBpbiBpKSBuZXcgUmVnRXhwKFwiKFwiICsgdCArIFwiKVwiKS50ZXN0KG4pICYmIChuID0gbi5yZXBsYWNlKFJlZ0V4cC4kMSwgUmVnRXhwLiQxLmxlbmd0aCA9PSAxID8gaVt0XSA6IChcIjAwXCIgKyBpW3RdKS5zdWJzdHIoKFwiXCIgKyBpW3RdKS5sZW5ndGgpKSk7XG5cdFx0cmV0dXJuIG5cbn07XG59XG5cbi8qKlxuKiDlr7nlpJbmjqXlj6Pmlrnms5VcbiogQGZpbmRET01Ob2RlOiDojrflj5ZcInJvb3RcIixcImVkaXRhcmVhXCIsXCJ0b29sYmFyXCIsXCJjb2xvclwi55qEcmVm5a+56LGh5Lul5Y+K55u45bqU55qEZG9t5a+56LGhXG4qIEBzZXRDb250ZW50OiDorr7nva5odG1s5qC85byP5pWw5o2uXG4qIEBnZXRDb250ZW50OiDojrflj5ZodG1s5qC85byP5pWw5o2uXG4qIEBvbkZvY3VzOiDnm5HlkKxmb2N1c+S6i+S7tlxuKiBAZm9jdXNFZGl0b3I6IOiBmueEpuWIsEVkaXRvcuS4ilxuKiBAZGVmYXVsdFZhbHVlOiDpu5jorqTlhoXlrrlcbiogQHZhbHVlOiDnvJbovpHlmajnmoTlgLxcbiogQGljb25zOiDlt6XlhbfmnaHkuIrpnIDopoHmmL7npLrnmoTlm77moIdcbioqL1xuXG52YXIgRWRpdG9yID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIC8vIGluaXQgJiB1cGRhdGVcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGVkaXRvclN0YXRlOntcblx0XHRcdFx0c2hvd0h0bWw6ZmFsc2UsXG5cdFx0XHRcdGljb25zOnt9XG5cdFx0XHR9LFxuXHRcdFx0ZGVmYXVsdFZhbHVlOnRoaXMucHJvcHMuZGVmYXVsdFZhbHVlP3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlOlwiPHA+VGhpcyBpcyBhbiBFZGl0b3I8L3A+XCIsXG5cdFx0XHR2YWx1ZTp0aGlzLnByb3BzLnZhbHVlXG5cdFx0fVxuXHR9LFxuXHRwcm9wVHlwZXM6e1xuXHRcdFwicGx1Z2luc1wiOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXHRcdFwiZm9udEZhbWlseVwiOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0XCJmb250U2l6ZVwiOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0XCJwYXJhZ3JhcGhcIjogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHR9LFxuXHRnZXREZWZhdWx0UHJvcHM6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0XCJwbHVnaW5zXCI6e1xuXHRcdFx0XHRcImltYWdlXCI6e1xuXHRcdFx0XHRcdFwidXBsb2FkZXJcIjp7XG5cdFx0XHRcdFx0XHRuYW1lOlwiZmlsZVwiLFxuXHRcdFx0XHRcdFx0dXJsOlwiL3VwbG9hZFwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcImN1c3RvbVVwbG9hZGVyXCI6bnVsbFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJmb250RmFtaWx5XCI6W1xuXHRcdFx0XHR7XCJuYW1lXCI6XCLlrovkvZNcIix2YWx1ZTpcIuWui+S9kyxTaW1TdW5cIixkZWZ1YWx0OnRydWV9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCLpmrbkuaZcIix2YWx1ZTpcIumatuS5pixTaW1MaVwifSxcblx0XHRcdFx0e1wibmFtZVwiOlwi5qW35L2TXCIsdmFsdWU6XCLmpbfkvZMsU2ltS2FpXCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCLlvq7ova/pm4Xpu5FcIix2YWx1ZTpcIuW+rui9r+mbhem7kSxNaWNyb3NvZnQgWWFIZWlcIn0sXG5cdFx0XHRcdHtcIm5hbWVcIjpcIum7keS9k1wiLHZhbHVlOlwi6buR5L2TLFNpbUhlaVwifSxcblx0XHRcdFx0e1wibmFtZVwiOlwiYXJpYWxcIix2YWx1ZTpcImFyaWFsLGhlbHZldGljYSxzYW5zLXNlcmlmXCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCJhcmlhbCBibGFja1wiLHZhbHVlOlwiYXJpYWwgYmxhY2ssYXZhbnQgZ2FyZGVcIn0sXG5cdFx0XHRcdHtcIm5hbWVcIjpcIm9taWMgc2FucyBtc1wiLHZhbHVlOlwib21pYyBzYW5zIG1zXCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCJpbXBhY3RcIix2YWx1ZTpcImltcGFjdCxjaGljYWdvXCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCJ0aW1lcyBuZXcgcm9tYW5cIix2YWx1ZTpcInRpbWVzIG5ldyByb21hblwifSxcblx0XHRcdFx0e1wibmFtZVwiOlwiYW5kYWxlIG1vbm9cIix2YWx1ZTpcImFuZGFsZSBtb25vXCJ9XG5cdFx0XHRdLFxuXHRcdFx0XCJmb250U2l6ZVwiOiBbXG5cdFx0XHRcdHtcIm5hbWVcIjpcIjEycHhcIix2YWx1ZTpcIjEycHhcIixkZWZ1YWx0OnRydWV9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCIxNHB4XCIsdmFsdWU6XCIxNHB4XCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCIxNnB4XCIsdmFsdWU6XCIxNnB4XCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCIxOHB4XCIsdmFsdWU6XCIxOHB4XCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCIyMHB4XCIsdmFsdWU6XCIyMHB4XCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCIyNHB4XCIsdmFsdWU6XCIyNHB4XCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCIyOHB4XCIsdmFsdWU6XCIyOHB4XCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCIzMnB4XCIsdmFsdWU6XCIzMnB4XCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCIzNnB4XCIsdmFsdWU6XCIzMnB4XCJ9XG5cdFx0XHRdLFxuXHRcdFx0XCJwYXJhZ3JhcGhcIjogW1xuXHRcdFx0XHR7XCJuYW1lXCI6XCLmrrXokL1cIix2YWx1ZTpcInBcIixkZWZ1YWx0OnRydWV9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCLmoIfpopgxXCIsdmFsdWU6XCJoMVwifSxcblx0XHRcdFx0e1wibmFtZVwiOlwi5qCH6aKYMlwiLHZhbHVlOlwiaDJcIn0sXG5cdFx0XHRcdHtcIm5hbWVcIjpcIuagh+mimDNcIix2YWx1ZTpcImgzXCJ9LFxuXHRcdFx0XHR7XCJuYW1lXCI6XCLmoIfpopg0XCIsdmFsdWU6XCJoNFwifSxcblx0XHRcdFx0e1wibmFtZVwiOlwi5qCH6aKYNVwiLHZhbHVlOlwiaDVcIn0sXG5cdFx0XHRcdHtcIm5hbWVcIjpcIuagh+mimDZcIix2YWx1ZTpcImg2XCJ9XG5cdFx0XHRdXG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpe1xuXHRcdEVkaXRvckhpc3RvcnkuY2xlYXIoKTtcblx0XHR0aGlzLnNldENvbnRlbnQodGhpcy5zdGF0ZS52YWx1ZT90aGlzLnN0YXRlLnZhbHVlOnRoaXMuc3RhdGUuZGVmYXVsdFZhbHVlKTtcblx0XHR2YXIgZWRpdGFyZWEgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZWRpdGFyZWEpO1xuXHRcdHZhciBpc0NvbGxhcHNlZCA9IHRydWU7XG4gICAgXHRlZGl0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duKTtcbiAgICBcdGVkaXRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlVcCk7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6ZnVuY3Rpb24obmV4dFByb3BzKXtcblx0XHQvLyB1cGRhdGUgdmFsdWVcblx0XHRpZih0aGlzLnByb3BzLnZhbHVlIT1uZXh0UHJvcHMudmFsdWUpe1xuXHRcdFx0dGhpcy5zZXRDb250ZW50KG5leHRQcm9wcy52YWx1ZT9uZXh0UHJvcHMudmFsdWU6bmV4dFByb3BzLmRlZmF1bHRWYWx1ZSk7XG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnREaWRVcGRhdGU6ZnVuY3Rpb24oKXtcblx0XHR2YXIgZWRpdG9yU3RhdGUgPSB0aGlzLnN0YXRlLmVkaXRvclN0YXRlO1xuXHRcdHN3aXRjaChlZGl0b3JTdGF0ZS5pY29uKXtcblx0XHRcdGNhc2UgXCJzb3VyY2VcIjpcblx0XHRcdFx0dGhpcy5zZXRDb250ZW50KGVkaXRvclN0YXRlLmNvbnRlbnQpXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImNsZWFyZG9jXCI6XG5cdFx0XHRcdHRoaXMuc2V0Q29udGVudChlZGl0b3JTdGF0ZS5jb250ZW50KVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxVbm1vbnQ6ZnVuY3Rpb24oKXtcblx0XHR2YXIgZWRpdGFyZWEgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZWRpdGFyZWEpO1xuICAgIFx0ZWRpdGFyZWEucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bik7XG4gICAgXHRlZGl0YXJlYS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlS2V5VXApO1xuXHR9LFxuICAgIC8vIGV2ZW50IGhhbmRsZXJcblx0aGFuZGxlS2V5RG93bjpmdW5jdGlvbihldnQpe1xuXHRcdGV2dCA9IGV2dCB8fCBldmVudDtcblx0XHR2YXIgdGFyZ2V0ID0gZXZ0LnRhcmdldCB8fCBldnQuc3JjRWxlbWVudDtcblx0XHRpZih0YXJnZXQuY2xhc3NOYW1lICYmIHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZignZWRpdG9yLWNvbnRlbnRlZGl0YWJsZS1kaXYnKSE9LTEpe1xuXHRcdFx0dmFyIGtleUNvZGUgPSBldnQua2V5Q29kZSB8fCBldnQud2hpY2g7XG5cdFx0XHR2YXIgYXV0b1NhdmUgPSB0aGlzLmF1dG9TYXZlO1xuXHRcdFx0aWYgKCFldnQuY3RybEtleSAmJiAhZXZ0Lm1ldGFLZXkgJiYgIWV2dC5zaGlmdEtleSAmJiAhZXZ0LmFsdEtleSkge1xuXHRcdFx0XHRpZiAoRWRpdG9ySGlzdG9yeS5nZXRDb21tYW5kU3RhY2soKS5sZW5ndGggPT0gMCkge1xuXHRcdFx0XHRcdGF1dG9TYXZlKCk7XG5cdFx0XHRcdFx0a2V5Y29udCA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHNhdmVTY2VuZVRpbWVyKTtcblx0XHRcdFx0c2F2ZVNjZW5lVGltZXIgPSBFZGl0b3JUaW1lci5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0dmFyIGludGVyYWxUaW1lciA9IEVkaXRvclRpbWVyLnNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRhdXRvU2F2ZSgpO1xuXHRcdFx0XHRcdFx0a2V5Y29udCA9IDA7XG5cdFx0XHRcdFx0XHRFZGl0b3JUaW1lci5jbGVhckludGVydmFsKGludGVyYWxUaW1lcilcblx0XHRcdFx0XHR9LDMwMClcblx0XHRcdFx0fSwyMDApO1xuXHRcdFx0XHRsYXN0S2V5Q29kZSA9IGtleUNvZGU7XG5cdFx0XHRcdGtleWNvbnQrKztcblx0XHRcdFx0aWYgKGtleWNvbnQgPj0gbWF4SW5wdXRDb3VudCApIHtcblx0XHRcdFx0XHRhdXRvU2F2ZSgpO1xuXHRcdFx0XHRcdGtleWNvbnQgPSAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdEVkaXRvckRPTS5zdG9wUHJvcGFnYXRpb24oZSk7XG5cdH0sXG5cdGhhbmRsZUtleVVwOmZ1bmN0aW9uKGV2dCl7XG5cdFx0ZXZ0ID0gZXZ0IHx8IGV2ZW50O1xuXHRcdHZhciB0YXJnZXQgPSBldnQudGFyZ2V0IHx8IGV2dC5zcmNFbGVtZW50O1xuXHRcdGlmKHRhcmdldC5jbGFzc05hbWUgJiYgdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdlZGl0b3ItY29udGVudGVkaXRhYmxlLWRpdicpIT0tMSl7XG5cdFx0XHR2YXIga2V5Q29kZSA9IGV2dC5rZXlDb2RlIHx8IGV2dC53aGljaDtcblx0XHRcdGlmICghZXZ0LmN0cmxLZXkgJiYgIWV2dC5tZXRhS2V5ICYmICFldnQuc2hpZnRLZXkgJiYgIWV2dC5hbHRLZXkpIHtcblx0XHRcdFx0Ly8gc29tZSBoYW5kbGVcblx0XHRcdH1cblx0XHR9XG5cdFx0RWRpdG9yRE9NLnN0b3BQcm9wYWdhdGlvbihlKTtcblx0fSxcblx0aGFuZGxlRm9jdXM6ZnVuY3Rpb24oZSl7XG5cdFx0aWYodGhpcy5wcm9wcy5vbkZvY3VzKXtcblx0XHRcdHRoaXMucHJvcHMub25Gb2N1cyhlLHRoaXMuZmluZERPTU5vZGUoJ3Jvb3QnKSk7XG5cdFx0fVxuXHRcdEVkaXRvckRPTS5zdG9wUHJvcGFnYXRpb24oZSk7XG5cdH0sXG5cdGhhbmRsZUNsaWNrOmZ1bmN0aW9uKGUpe1xuXHRcdEVkaXRvckRPTS5zdG9wUHJvcGFnYXRpb24oZSk7XG5cdH0sXG5cdGV4Y2hhbmdlUmFuZ2VTdGF0ZTpmdW5jdGlvbihlZGl0b3JTdGF0ZSl7XG5cdFx0dmFyIHJhbmdlU3RhdGUgPSBFZGl0b3JTZWxlY3Rpb24uZ2V0UmFuZ2VTdGF0ZSgpO1xuXHRcdGZvcih2YXIgaWNvbiBpbiByYW5nZVN0YXRlKXtcblx0XHRcdGlmKCFlZGl0b3JTdGF0ZS5pY29uc1tpY29uXSkgXG5cdFx0XHRcdGVkaXRvclN0YXRlLmljb25zW2ljb25dID0gcmFuZ2VTdGF0ZVtpY29uXTtcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRzd2l0Y2goaWNvbil7XG5cdFx0XHRcdFx0Y2FzZSBcImZvcmVjb2xvclwiOlxuXHRcdFx0XHRcdGNhc2UgXCJiYWNrY29sb3JcIjpcblx0XHRcdFx0XHRcdGVkaXRvclN0YXRlLmljb25zW2ljb25dLmNvbG9yID0gcmFuZ2VTdGF0ZVtpY29uXS5jb2xvcjtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJwYXJhZ3JhcGhcIjpcblx0XHRcdFx0XHRjYXNlIFwiZm9udGZhbWlseVwiOlxuXHRcdFx0XHRcdGNhc2UgXCJmb250c2l6ZVwiOlxuXHRcdFx0XHRcdFx0ZWRpdG9yU3RhdGUuaWNvbnNbaWNvbl0udmFsdWUgPSByYW5nZVN0YXRlW2ljb25dLnZhbHVlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWRpdG9yU3RhdGUuaWNvbnNbaWNvbl0uYWN0aXZlID0gcmFuZ2VTdGF0ZVtpY29uXS5hY3RpdmU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBlZGl0b3JTdGF0ZTtcblx0fSxcblx0aGFuZGxlUmFuZ2VDaGFuZ2U6ZnVuY3Rpb24oZSl7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0aWYoZSAmJiBlLnR5cGU9PVwiYmx1clwiKSByZXR1cm47XG5cdFx0dmFyIHRhcmdldCA9IGU/ZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50Om51bGw7XG5cdFx0dmFyIHNlbGVjdGlvbiA9IEVkaXRvclNlbGVjdGlvbi5nZXRTZWxlY3Rpb24oKTtcblx0XHRpZihzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLnJhbmdlQ291bnQ+MCl7XG5cdFx0XHR2YXIgZWRpdG9yU3RhdGUgPSB0aGlzLnN0YXRlLmVkaXRvclN0YXRlO1xuXHRcdFx0ZWRpdG9yU3RhdGUgPSB0aGlzLmV4Y2hhbmdlUmFuZ2VTdGF0ZShlZGl0b3JTdGF0ZSk7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0ZWRpdG9yU3RhdGU6ZWRpdG9yU3RhdGVcblx0XHRcdH0pXG5cdFx0XHR0aGlzLnJlZnMucmVzaXplLmNsZWFyVGFyZ2V0KCk7XG5cdFx0fWVsc2UgaWYodGFyZ2V0KXtcblx0XHRcdHZhciB0YWdOYW1lID0gdGFyZ2V0LnRhZ05hbWUudG9VcHBlckNhc2UoKTtcblx0XHRcdHN3aXRjaCh0YWdOYW1lKXtcblx0XHRcdFx0Y2FzZSBcIklNR1wiOlxuXHRcdFx0XHRcdHRoaXMucmVmcy5yZXNpemUuc2V0VGFyZ2V0KHRhcmdldCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuICAgIGhhbmRsZVRvb2xiYXJJY29uQ2xpY2s6ZnVuY3Rpb24oZSxzdGF0ZSl7XG5cdFx0ZSA9IGUgfHwgZXZlbnQ7XG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblx0XHR2YXIgb2Zmc2V0UG9zaXRpb24gPSB0aGlzLmdldE9mZnNldFJvb3RQYXJlbnRQb3NpdGlvbih0YXJnZXQpO1xuXHRcdFxuXHRcdHZhciBoYW5kbGVSYW5nZUNoYW5nZSA9IHRoaXMuaGFuZGxlUmFuZ2VDaGFuZ2U7XG5cdFx0dmFyIGVkaXRhcmVhID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmVkaXRhcmVhKTtcblx0XHR2YXIgZWRpdG9yU3RhdGUgPSB0aGlzLnN0YXRlLmVkaXRvclN0YXRlO1xuXHRcdEVkaXRvclNlbGVjdGlvbi5jbG9uZVJhbmdlKCk7XG5cdFx0c3dpdGNoKHN0YXRlLmljb24pe1xuXHRcdFx0Y2FzZSBcInNvdXJjZVwiOlxuXHRcdFx0XHRlZGl0b3JTdGF0ZS5zaG93SHRtbCA9ICFlZGl0b3JTdGF0ZS5zaG93SHRtbDtcblx0XHRcdFx0c3RhdGUuYWN0aXZlID0gZWRpdG9yU3RhdGUuc2hvd0h0bWw7XG5cdFx0XHRcdGVkaXRvclN0YXRlLmNvbnRlbnQgPSB0aGlzLnJlZnMuZWRpdGFyZWEuZ2V0Q29udGVudCgpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJ1bmRvXCI6XG5cdFx0XHRcdEVkaXRvckhpc3RvcnkudW5kbygpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJyZWRvXCI6XG5cdFx0XHRcdEVkaXRvckhpc3RvcnkucmVkbygpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJyZW1vdmVmb3JtYXRcIjpcbiAgICAgICAgICAgICAgICBFZGl0b3JIaXN0b3J5LmV4ZWNDb21tYW5kKHN0YXRlLmljb24sZmFsc2UsbnVsbCk7XG5cdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5zdG9yZVJhbmdlKCk7XG5cdFx0XHRcdHZhciBzcGFuTm9kZXMgPSBFZGl0b3JTZWxlY3Rpb24uZ2V0U3Bhbk5vZGVzKCk7XG5cdFx0XHRcdGZvcih2YXIgaT0wO2k8c3Bhbk5vZGVzLmxlbmd0aDtpKyspe1xuXHRcdFx0XHRcdHN3aXRjaChzcGFuTm9kZXNbaV0uY2xhc3NOYW1lKXtcblx0XHRcdFx0XHRcdGNhc2UgXCJmb250LWJvcmRlclwiOlxuXHRcdFx0XHRcdFx0XHR2YXIgc3Bhbk5vZGUgPSBzcGFuTm9kZXNbaV07XG5cdFx0XHRcdFx0XHRcdHZhciBwYXJlbnROb2RlID0gc3Bhbk5vZGUucGFyZW50Tm9kZTtcblx0XHRcdFx0XHRcdFx0dmFyIG5leHRTaWJsaW5nID0gc3Bhbk5vZGUubmV4dFNpYmxpbmc7XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRmb3IodmFyIGM9MDtjPHNwYW5Ob2RlLmNoaWxkTm9kZXMubGVuZ3RoO2MrKyl7XG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3Bhbk5vZGUuY2hpbGROb2Rlc1tjXS5jbG9uZU5vZGUoKSxuZXh0U2libGluZyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzcGFuTm9kZXNbaV0pO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnJlc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJib2xkXCI6XG5cdFx0XHRjYXNlIFwiaXRhbGljXCI6XG5cdFx0XHRjYXNlIFwidW5kZXJsaW5lXCI6XG5cdFx0XHRjYXNlIFwic3RyaWtldGhyb3VnaFwiOlxuXHRcdFx0Y2FzZSBcInN1YnNjcmlwdFwiOlxuXHRcdFx0Y2FzZSBcInN1cGVyc2NyaXB0XCI6XG5cdFx0XHRjYXNlIFwiaW5zZXJ0b3JkZXJlZGxpc3RcIjpcblx0XHRcdGNhc2UgXCJpbnNlcnR1bm9yZGVyZWRsaXN0XCI6XG5cdFx0XHRjYXNlIFwic2VsZWN0YWxsXCI6XG5cdFx0XHRjYXNlIFwianVzdGlmeWxlZnRcIjpcblx0XHRcdGNhc2UgXCJqdXN0aWZ5cmlnaHRcIjpcblx0XHRcdGNhc2UgXCJqdXN0aWZ5Y2VudGVyXCI6XG5cdFx0XHRjYXNlIFwiaW5kZW50XCI6XG5cdFx0XHRjYXNlIFwib3V0ZGVudFwiOlxuXHRcdFx0XHRFZGl0b3JIaXN0b3J5LmV4ZWNDb21tYW5kKHN0YXRlLmljb24sZmFsc2UsbnVsbCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInRvdXBwZXJjYXNlXCI6XG5cdFx0XHRjYXNlIFwidG9sb3dlcmNhc2VcIjpcblx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnN0b3JlUmFuZ2UoKTtcblx0XHRcdFx0dmFyIHRleHROb2RlcyA9IEVkaXRvclNlbGVjdGlvbi5nZXRUZXh0Tm9kZXMoKTtcblx0XHRcdFx0Zm9yKHZhciBpPTA7aTx0ZXh0Tm9kZXMubGVuZ3RoO2krKyl7XG5cdFx0XHRcdFx0dmFyIG5vZGUgPSB0ZXh0Tm9kZXNbaV0uY2hpbGROb2RlO1xuXHRcdFx0XHRcdHZhciBzdGFydCA9IHRleHROb2Rlc1tpXS5zdGFydE9mZnNldDtcblx0XHRcdFx0XHR2YXIgZW5kID0gdGV4dE5vZGVzW2ldLmVuZE9mZnNldDtcblx0XHRcdFx0XHRub2RlLm5vZGVWYWx1ZSA9IG5vZGUubm9kZVZhbHVlLnN1YnN0cmluZygwLHN0YXJ0KSArIFxuXHRcdFx0XHRcdFx0XHQoIHN0YXRlLmljb249PVwidG91cHBlcmNhc2VcIj9ub2RlLm5vZGVWYWx1ZS5zdWJzdHJpbmcoc3RhcnQsZW5kKS50b1VwcGVyQ2FzZSgpOm5vZGUubm9kZVZhbHVlLnN1YnN0cmluZyhzdGFydCxlbmQpLnRvTG93ZXJDYXNlKCkgKSArIFxuXHRcdFx0XHRcdFx0XHRub2RlLm5vZGVWYWx1ZS5zdWJzdHJpbmcoZW5kLG5vZGUubGVuZ3RoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRFZGl0b3JIaXN0b3J5LmV4ZWNDb21tYW5kKHN0YXRlLmljb24sZmFsc2UsbnVsbCk7XG5cdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5yZXN0b3JlUmFuZ2UoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiZm9udGJvcmRlclwiOlxuXHRcdFx0XHR2YXIgdGV4dE5vZGVzID0gRWRpdG9yU2VsZWN0aW9uLmdldFRleHROb2RlcygpO1xuXHRcdFx0XHR2YXIgc3RhcnROb2RlID0gbnVsbCxlbmROb2RlID0gbnVsbCxzdGFydE9mZnNldD0wLGVuZE9mZnNldD0wO1xuXHRcdFx0XHRmb3IodmFyIGk9MDtpPHRleHROb2Rlcy5sZW5ndGg7aSsrKXtcblx0XHRcdFx0XHQvLyDojrflj5Zcblx0XHRcdFx0XHR2YXIgbm9kZSA9IHRleHROb2Rlc1tpXS5jaGlsZE5vZGU7XG5cdFx0XHRcdFx0dmFyIHN0YXJ0ID0gdGV4dE5vZGVzW2ldLnN0YXJ0T2Zmc2V0O1xuXHRcdFx0XHRcdHZhciBlbmQgPSB0ZXh0Tm9kZXNbaV0uZW5kT2Zmc2V0O1xuXHRcdFx0XHRcdC8vIOaLt+i0nVxuXHRcdFx0XHRcdHZhciBjbG9uZU5vZGUgPSBub2RlLmNsb25lTm9kZSgpO1xuXHRcdFx0XHRcdHZhciBzdGFydFRleHQgPSBjbG9uZU5vZGUubm9kZVZhbHVlLnN1YnN0cmluZygwLHN0YXJ0KTtcblx0XHRcdFx0XHR2YXIgZW5kVGV4dCA9IGNsb25lTm9kZS5ub2RlVmFsdWUuc3Vic3RyaW5nKGVuZCxjbG9uZU5vZGUubGVuZ3RoKTtcblx0XHRcdFx0XHR2YXIgYm9yZGVyVGV4dCA9IGNsb25lTm9kZS5ub2RlVmFsdWUuc3Vic3RyaW5nKHN0YXJ0LGVuZCk7XG5cdFx0XHRcdFx0dmFyIHNwYW4gPSBudWxsO1xuXHRcdFx0XHRcdHZhciB0ZXh0UGFyZW50Tm9kZSA9IHRleHROb2Rlc1tpXS5jaGlsZE5vZGUucGFyZW50Tm9kZTtcblx0XHRcdFx0XHRpZiggdGV4dFBhcmVudE5vZGUgJiYgdGV4dFBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHRleHRQYXJlbnROb2RlLmNsYXNzTmFtZT09XCJmb250LWJvcmRlclwiKXtcblx0XHRcdFx0XHRcdGlmKGk9PTApe1xuXHRcdFx0XHRcdFx0XHRzdGFydE5vZGUgPSB0ZXh0Tm9kZXNbaV0uY2hpbGROb2RlO1xuXHRcdFx0XHRcdFx0XHRzdGFydE9mZnNldCA9IHN0YXJ0O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYoaT09dGV4dE5vZGVzLmxlbmd0aC0xKSB7XG5cdFx0XHRcdFx0XHRcdGVuZE5vZGUgPSB0ZXh0Tm9kZXNbaV0uY2hpbGROb2RlO1xuXHRcdFx0XHRcdFx0XHRlbmRPZmZzZXQgPSBlbmQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHQvLyDph43mlrDotYvlgLxcblx0XHRcdFx0XHRcdG5vZGUubm9kZVZhbHVlID0gc3RhcnRUZXh0O1xuXHRcdFx0XHRcdFx0c3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXHRcdFx0XHRcdFx0c3Bhbi5jbGFzc05hbWUgPSBcImZvbnQtYm9yZGVyXCI7XG5cdFx0XHRcdFx0XHRzcGFuLmlubmVySFRNTCA9IGJvcmRlclRleHQ7XG5cdFx0XHRcdFx0XHRzcGFuLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICMwMDBcIjtcblx0XHRcdFx0XHRcdG5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3Bhbiwgbm9kZS5uZXh0U2libGluZyk7XG5cdFx0XHRcdFx0XHRpZihlbmRUZXh0IT1cIlwiKXtcblx0XHRcdFx0XHRcdFx0bm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShlbmRUZXh0KSwgc3Bhbi5uZXh0U2libGluZyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZihpPT0wKSBzdGFydE5vZGUgPSBzcGFuLmNoaWxkTm9kZXNbMF07XG5cdFx0XHRcdFx0XHRpZihpPT10ZXh0Tm9kZXMubGVuZ3RoLTEpIHtcblx0XHRcdFx0XHRcdFx0ZW5kTm9kZSA9IHNwYW4uY2hpbGROb2Rlc1swXTtcblx0XHRcdFx0XHRcdFx0ZW5kT2Zmc2V0ID0gc3Bhbi5jaGlsZE5vZGVzWzBdLmxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLmFkZFJhbmdlKHN0YXJ0Tm9kZSxzdGFydE9mZnNldCxlbmROb2RlLGVuZE9mZnNldCk7XG5cdFx0XHRcdC8vIOWQiOW5tuebuOWQjGZvbnQtYm9yZGVy5YWD57SgXG5cdFx0XHRcdHZhciBzcGFuTm9kZXMgPSBFZGl0b3JTZWxlY3Rpb24uZ2V0U3Bhbk5vZGVzKCk7XG5cdFx0XHRcdGZvcih2YXIgaT0wO2k8c3Bhbk5vZGVzLmxlbmd0aC0xO2krKyl7XG5cdFx0XHRcdFx0dmFyIHNwYW5Ob2RlID0gc3Bhbk5vZGVzW2ldO1xuXHRcdFx0XHRcdHZhciBwYXJlbnROb2RlID0gc3Bhbk5vZGVzW2ldLnBhcmVudE5vZGU7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYoRWRpdG9yRE9NLmlzTnVsbE9mVGV4dE5vZGUoc3Bhbk5vZGUubmV4dFNpYmxpbmcpKXtcblx0XHRcdFx0XHRcdC8vIOenu+mZpOepuuWFg+e0oFxuXHRcdFx0XHRcdFx0cGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzcGFuTm9kZS5uZXh0U2libGluZyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHNwYW5Ob2RlLm5leHRTaWJsaW5nPT09c3Bhbk5vZGVzW2krMV0pe1xuXHRcdFx0XHRcdFx0dmFyIG5leHRTaWJsaW5nQ2hpbGROb2RlcyA9IHNwYW5Ob2Rlc1tpKzFdLmNoaWxkTm9kZXM7XG5cdFx0XHRcdFx0XHRmb3IodmFyIGM9MDtjPG5leHRTaWJsaW5nQ2hpbGROb2Rlcy5sZW5ndGg7YysrKXtcblx0XHRcdFx0XHRcdFx0c3Bhbk5vZGUuYXBwZW5kQ2hpbGQobmV4dFNpYmxpbmdDaGlsZE5vZGVzW2NdLmNsb25lTm9kZSgpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIOenu+mZpOiAgeWFg+e0oFxuXHRcdFx0XHRcdFx0cGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzcGFuTm9kZXNbaSsxXSk7XG5cdFx0XHRcdFx0XHQvLyDliKDpmaTov4flkI7vvIzph43mlrDmjIflkJFcblx0XHRcdFx0XHRcdHNwYW5Ob2Rlc1tpKzFdID0gc3Bhbk5vZGVzW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRFZGl0b3JIaXN0b3J5LmV4ZWNDb21tYW5kKHN0YXRlLmljb24sZmFsc2UsbnVsbCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImZvcmVjb2xvclwiOlxuXHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24uc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRvZmZzZXRQb3NpdGlvbi55ICs9IG9mZnNldFBvc2l0aW9uLmgrNTtcblx0XHRcdFx0dGhpcy5yZWZzLmNvbG9yLm9wZW4ob2Zmc2V0UG9zaXRpb24sZnVuY3Rpb24oZSxjb2xvcil7XG5cdFx0XHRcdFx0ZWRpdGFyZWEuZm9jdXMoKTtcblx0XHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24ucmVzdG9yZVJhbmdlKCk7XG5cdFx0XHRcdFx0RWRpdG9ySGlzdG9yeS5leGVjQ29tbWFuZCgnZm9yZWNvbG9yJyxmYWxzZSxjb2xvcik7XG5cdFx0XHRcdFx0aGFuZGxlUmFuZ2VDaGFuZ2UoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImJhY2tjb2xvclwiOlxuXHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24uc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRvZmZzZXRQb3NpdGlvbi55ICs9IG9mZnNldFBvc2l0aW9uLmgrNTtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucmVmcy5jb2xvci5vcGVuKG9mZnNldFBvc2l0aW9uLGZ1bmN0aW9uKGUsY29sb3Ipe1xuXHRcdFx0XHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdFx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnJlc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2JhY2tjb2xvcicsZmFsc2UsY29sb3IpO1xuXHRcdFx0XHRcdGhhbmRsZVJhbmdlQ2hhbmdlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJmb250c2l6ZVwiOlxuXHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24uc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRvZmZzZXRQb3NpdGlvbi55ICs9IG9mZnNldFBvc2l0aW9uLmgrNTtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucmVmcy5mb250c2l6ZS5vcGVuKG9mZnNldFBvc2l0aW9uLGZ1bmN0aW9uKGUsZm9udHNpemUpe1xuXHRcdFx0XHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdFx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnJlc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2ZvbnRzaXplJyxmYWxzZSxmb250c2l6ZSk7XG5cdFx0XHRcdFx0aGFuZGxlUmFuZ2VDaGFuZ2UoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImZvbnRmYW1pbHlcIjpcblx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnN0b3JlUmFuZ2UoKTtcblx0XHRcdFx0b2Zmc2V0UG9zaXRpb24ueSArPSBvZmZzZXRQb3NpdGlvbi5oKzU7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnJlZnMuZm9udGZhbWlseS5vcGVuKG9mZnNldFBvc2l0aW9uLGZ1bmN0aW9uKGUsZm9udGZhbWlseSl7XG5cdFx0XHRcdFx0ZWRpdGFyZWEuZm9jdXMoKTtcblx0XHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24ucmVzdG9yZVJhbmdlKCk7XG5cdFx0XHRcdFx0RWRpdG9ySGlzdG9yeS5leGVjQ29tbWFuZCgnZm9udGZhbWlseScsZmFsc2UsZm9udGZhbWlseSk7XG5cdFx0XHRcdFx0aGFuZGxlUmFuZ2VDaGFuZ2UoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInBhcmFncmFwaFwiOlxuXHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24uc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRvZmZzZXRQb3NpdGlvbi55ICs9IG9mZnNldFBvc2l0aW9uLmgrNTtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucmVmcy5wYXJhZ3JhcGgub3BlbihvZmZzZXRQb3NpdGlvbixmdW5jdGlvbihlLHBhcmFncmFwaCl7XG5cdFx0XHRcdFx0ZWRpdGFyZWEuZm9jdXMoKTtcblx0XHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24ucmVzdG9yZVJhbmdlKCk7XG5cdFx0XHRcdFx0RWRpdG9ySGlzdG9yeS5leGVjQ29tbWFuZCgncGFyYWdyYXBoJyxmYWxzZSxwYXJhZ3JhcGgpO1xuXHRcdFx0XHRcdGhhbmRsZVJhbmdlQ2hhbmdlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJjbGVhcmRvY1wiOlxuXHRcdFx0XHRlZGl0b3JTdGF0ZS5jb250ZW50ID0gXCI8cD48YnIvPjwvcD5cIlxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJob3Jpem9udGFsXCI6XG5cdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2luc2VydGh0bWwnLGZhbHNlLFwiPGhyLz48cD48YnIvPjwvcD5cIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImRhdGVcIjpcblx0XHRcdFx0dmFyIHN0ckRhdGUgPSBuZXcgRGF0ZSgpLkZvcm1hdChcInl5eXktTU0tZGRcIik7XG5cdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2luc2VydGh0bWwnLGZhbHNlLCBzdHJEYXRlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidGltZVwiOlxuXHRcdFx0XHR2YXIgc3RyVGltZSA9IG5ldyBEYXRlKCkuRm9ybWF0KCdoaDptbTpzcycpXG5cdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2luc2VydGh0bWwnLGZhbHNlLHN0clRpbWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJpbWFnZVwiOlxuXHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24uc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHR0aGlzLnJlZnMuaW1hZ2Uub3BlbihmdW5jdGlvbihlLGh0bWwpe1xuXHRcdFx0XHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdFx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnJlc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmKGh0bWwgJiYgaHRtbC5sZW5ndGg+MCl7XG5cdFx0XHRcdFx0XHRpZihFZGl0b3JTZWxlY3Rpb24ucmFuZ2Upe1xuXHRcdFx0XHRcdFx0XHRFZGl0b3JIaXN0b3J5LmV4ZWNDb21tYW5kKCdpbnNlcnRodG1sJyxmYWxzZSxodG1sKTtcblx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJlYS5pbm5lckhUTUwgKz0gaHRtbDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImZvcm11bGFcIjpcblx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnN0b3JlUmFuZ2UoKTtcblx0XHRcdFx0b2Zmc2V0UG9zaXRpb24ueSArPSBvZmZzZXRQb3NpdGlvbi5oKzU7XG5cdFx0XHRcdG9mZnNldFBvc2l0aW9uLnggLT0gb2Zmc2V0UG9zaXRpb24udy8yO1xuXHRcdFx0XHR2YXIgX3NlbGYgPSB0aGlzO1xuXHRcdFx0XHR0aGlzLnJlZnMuZm9ybXVsYS5vcGVuKG9mZnNldFBvc2l0aW9uLGZ1bmN0aW9uKGUsbGF0ZXgsaWQpe1xuXHRcdFx0XHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdFx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnJlc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmKGxhdGV4ICYmIGxhdGV4Lmxlbmd0aD4wKXtcblx0XHRcdFx0XHRcdHZhciBodG1sID0gJzxwPiZuYnNwOzxzcGFuIGNsYXNzPVwibWF0aHF1aWxsLWVtYmVkZGVkLWxhdGV4XCIgaWQ9XCInK2lkKydcIj48L3NwYW4+Jm5ic3A7PC9wPic7XG5cdFx0XHRcdFx0XHRpZihFZGl0b3JTZWxlY3Rpb24ucmFuZ2Upe1xuXHRcdFx0XHRcdFx0XHRFZGl0b3JIaXN0b3J5LmV4ZWNDb21tYW5kKCdpbnNlcnRodG1sJyxmYWxzZSxodG1sKTtcblx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJlYS5pbm5lckhUTUwgKz0gaHRtbDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdEVkaXRvclRpbWVyLnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdFx0IF9zZWxmLmFkZEZvcm11bGEoaWQsbGF0ZXgpO1xuXHRcdFx0XHRcdFx0fSwyMDApO1xuXHRcdFx0XHRcdFx0aGFuZGxlUmFuZ2VDaGFuZ2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImluc2VydHRhYmxlXCI6XG5cdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5zdG9yZVJhbmdlKCk7XG5cdFx0XHRcdG9mZnNldFBvc2l0aW9uLnkgKz0gb2Zmc2V0UG9zaXRpb24uaCs1O1xuICAgICAgICAgICAgICAgIG9mZnNldFBvc2l0aW9uLnggLT0gb2Zmc2V0UG9zaXRpb24udy8yO1xuXHRcdFx0XHR0aGlzLnJlZnMudGFibGUub3BlbihvZmZzZXRQb3NpdGlvbixmdW5jdGlvbihlLGh0bWwpe1xuXHRcdFx0XHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdFx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnJlc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2luc2VydGh0bWwnLGZhbHNlLGh0bWwpO1xuXHRcdFx0XHRcdGhhbmRsZVJhbmdlQ2hhbmdlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJzcGVjaGFyc1wiOlxuXHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24uc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRvZmZzZXRQb3NpdGlvbi55ICs9IG9mZnNldFBvc2l0aW9uLmgrNTtcbiAgICAgICAgICAgICAgICBvZmZzZXRQb3NpdGlvbi54IC09IG9mZnNldFBvc2l0aW9uLncvMjtcblx0XHRcdFx0dGhpcy5yZWZzLnNwZWNpYWwub3BlbihvZmZzZXRQb3NpdGlvbixmdW5jdGlvbihlLGNoYXIpe1xuXHRcdFx0XHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdFx0XHRcdFx0RWRpdG9yU2VsZWN0aW9uLnJlc3RvcmVSYW5nZSgpO1xuXHRcdFx0XHRcdEVkaXRvckhpc3RvcnkuZXhlY0NvbW1hbmQoJ2luc2VydGh0bWwnLGZhbHNlLGNoYXIpO1xuXHRcdFx0XHRcdGhhbmRsZVJhbmdlQ2hhbmdlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJlbW90aW9uXCI6XG5cdFx0XHRcdEVkaXRvclNlbGVjdGlvbi5zdG9yZVJhbmdlKCk7XG5cdFx0XHRcdG9mZnNldFBvc2l0aW9uLnkgKz0gb2Zmc2V0UG9zaXRpb24uaCs1O1xuXHRcdFx0XHR0aGlzLnJlZnMuZW1vdGlvbi5vcGVuKG9mZnNldFBvc2l0aW9uLGZ1bmN0aW9uKGUsaHRtbCl7XG5cdFx0XHRcdFx0ZWRpdGFyZWEuZm9jdXMoKTtcblx0XHRcdFx0XHRFZGl0b3JTZWxlY3Rpb24ucmVzdG9yZVJhbmdlKCk7XG5cdFx0XHRcdFx0RWRpdG9ySGlzdG9yeS5leGVjQ29tbWFuZCgnaW5zZXJ0aHRtbCcsZmFsc2UsaHRtbCk7XG5cdFx0XHRcdFx0aGFuZGxlUmFuZ2VDaGFuZ2UoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHQvLyBzZXRTdGF0ZVxuXHRcdGVkaXRvclN0YXRlLmljb25zW3N0YXRlLmljb25dID0gc3RhdGU7XG5cdFx0ZWRpdG9yU3RhdGUuaWNvbiA9IHN0YXRlLmljb247XG5cdFx0RWRpdG9yU2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG5cdFx0Ly8gcmFuZ2Ugc3RhdGVcblx0XHRlZGl0b3JTdGF0ZSA9IHRoaXMuZXhjaGFuZ2VSYW5nZVN0YXRlKGVkaXRvclN0YXRlKTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGVkaXRvclN0YXRlOmVkaXRvclN0YXRlXG5cdFx0fSlcblx0XHRFZGl0b3JET00uc3RvcFByb3BhZ2F0aW9uKGUpO1xuXHR9LFxuICAgIC8vIHV0aWxzXG5cdGdldE9mZnNldFJvb3RQYXJlbnRQb3NpdGlvbjpmdW5jdGlvbih0YXJnZXQpe1xuXHRcdHZhciBwb3NpdGlvbiA9IHt4OjAseTowLHc6MCxoOjB9XG5cdFx0dmFyIHJvb3QgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMucm9vdCk7XG5cdFx0cG9zaXRpb24udyA9IHRhcmdldC5vZmZzZXRXaWR0aDtcblx0XHRwb3NpdGlvbi5oID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcblx0XHRwb3NpdGlvbi54ID0gdGFyZ2V0Lm9mZnNldExlZnQ7XG5cdFx0cG9zaXRpb24ueSA9IHRhcmdldC5vZmZzZXRUb3A7XG5cdFx0dmFyIG9mZnNldFBhcmVudCA9IHRhcmdldC5vZmZzZXRQYXJlbnQ7XG5cdFx0d2hpbGUob2Zmc2V0UGFyZW50ICYmIG9mZnNldFBhcmVudCE9cm9vdCl7XG5cdFx0XHQgcG9zaXRpb24ueCs9IG9mZnNldFBhcmVudC5vZmZzZXRMZWZ0O1xuXHRcdFx0IHBvc2l0aW9uLnkrPW9mZnNldFBhcmVudC5vZmZzZXRUb3A7XG5cdFx0XHQgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcblx0XHR9XG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xuXHR9LFxuXHRhZGRGb3JtdWxhOmZ1bmN0aW9uKGlkLGxhdGV4KXtcblx0XHR2YXIgZWRpdGFyZWEgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZWRpdGFyZWEpO1xuXHRcdHZhciBodG1sRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblx0XHR2YXIgY29uZmlnID0ge1xuXHRcdCAgaGFuZGxlcnM6IHsgZWRpdDogZnVuY3Rpb24oKXsgfSB9LFxuXHRcdCAgcmVzdHJpY3RNaXNtYXRjaGVkQnJhY2tldHM6IHRydWVcblx0XHR9O1xuXHRcdHZhciBtYXRoRmllbGQgPSBNUS5NYXRoRmllbGQoaHRtbEVsZW1lbnQsIGNvbmZpZyk7XG5cdFx0bWF0aEZpZWxkLmxhdGV4KGxhdGV4KTsgXG5cdFx0dmFyICRodG1sRWxlbWVudCA9ICQoaHRtbEVsZW1lbnQpO1xuXHRcdCRodG1sRWxlbWVudC5rZXlkb3duKGZ1bmN0aW9uKGUpe1xuXHRcdFx0bWF0aEZpZWxkLmZvY3VzKCk7XG5cdFx0XHRFZGl0b3JET00uc3RvcFByb3BhZ2F0aW9uKGUpO1xuXHRcdH0pO1xuXHRcdCRodG1sRWxlbWVudC5rZXl1cChmdW5jdGlvbihlKXtcblx0XHRcdG1hdGhGaWVsZC5mb2N1cygpO1xuXHRcdFx0RWRpdG9yRE9NLnN0b3BQcm9wYWdhdGlvbihlKTtcblx0XHR9KTtcblx0XHQkaHRtbEVsZW1lbnQubW91c2V1cChmdW5jdGlvbihlKXtcblx0XHRcdG1hdGhGaWVsZC5mb2N1cygpO1xuXHRcdFx0RWRpdG9yRE9NLnN0b3BQcm9wYWdhdGlvbihlKTtcblx0XHR9KTtcblx0XHQkaHRtbEVsZW1lbnQubW91c2Vkb3duKGZ1bmN0aW9uKGUpe1xuXHRcdFx0RWRpdG9yRE9NLnN0b3BQcm9wYWdhdGlvbihlKTtcblx0XHR9KTtcblx0XHQkaHRtbEVsZW1lbnQubW91c2Vtb3ZlKGZ1bmN0aW9uKGUpe1xuXHRcdFx0RWRpdG9yRE9NLnN0b3BQcm9wYWdhdGlvbihlKTtcblx0XHR9KTtcblx0XHQkKGVkaXRhcmVhKS5tb3VzZWRvd24oZnVuY3Rpb24oZSl7XG5cdFx0XHRtYXRoRmllbGQuYmx1cigpO1xuXHRcdFx0RWRpdG9yRE9NLnN0b3BQcm9wYWdhdGlvbihlKTtcblx0XHR9KVxuXHRcdCQoZWRpdGFyZWEpLm1vdXNlbW92ZShmdW5jdGlvbihlKXtcblx0XHRcdEVkaXRvckRPTS5zdG9wUHJvcGFnYXRpb24oZSk7XG5cdFx0fSlcblx0fSxcblx0YXV0b1NhdmU6ZnVuY3Rpb24oKXtcblx0XHRFZGl0b3JIaXN0b3J5LmV4ZWNDb21tYW5kKCdhdXRvc2F2ZScsZmFsc2UsbnVsbCk7XG5cdH0sXG4gICAgLy8gcHVibGljIGZ1bmN0aW9uc1xuXHRmaW5kRE9NTm9kZTpmdW5jdGlvbihyZWZOYW1lKXtcblx0XHQvLyDlr7nlpJblhazluIPmlrnms5Vcblx0XHR2YXIga2V5cyA9IFsgXCJyb290XCIsXCJlZGl0YXJlYVwiLFwidG9vbGJhclwiLFwiY29sb3JcIl07XG5cdFx0aWYoa2V5cy5pbmRleE9mKHJlZk5hbWUpPT0tMSkgXG5cdFx0XHRyZXR1cm4ge3JlZjpudWxsLGRvbTpudWxsfTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVmOnRoaXMucmVmc1tyZWZOYW1lXSxcblx0XHRcdGRvbTpSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbcmVmTmFtZV0pXG5cdCAgIH1cblx0fSxcblx0c2V0Q29udGVudDpmdW5jdGlvbihjb250ZW50KXtcblx0XHQvLyDlkI7nu63mt7vliqDmoKHpqozmlrnms5Vcblx0XHR0aGlzLnJlZnMuZWRpdGFyZWEuc2V0Q29udGVudChjb250ZW50KTtcblx0XHQvLyBtYXRocXVpbGwgc3VwcG9ydHNcblx0XHRpZihjb250ZW50LmluZGV4T2YoXCJtYXRocXVpbGwtZW1iZWRkZWQtbGF0ZXhcIikhPS0xKXtcblx0XHRcdHZhciBfc2VsZiA9IHRoaXM7XG5cdFx0XHRFZGl0b3JUaW1lci5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciBlZGl0YXJlYSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKF9zZWxmLnJlZnMuZWRpdGFyZWEpO1xuXHRcdFx0XHR2YXIgZWxlbWVudHMgPSBlZGl0YXJlYS5xdWVyeVNlbGVjdG9yQWxsKCcubWF0aHF1aWxsLWVtYmVkZGVkLWxhdGV4Jyk7XG5cdFx0XHRcdGZvcih2YXIgaT0wO2k8ZWxlbWVudHMubGVuZ3RoO2krKyl7XG5cdFx0XHRcdFx0aWYoIWVsZW1lbnRzW2ldLmlkKXtcblx0XHRcdFx0XHRcdCAgdmFyIGlkID0gXCJtYXRocXVpbGwtXCIraStcIi1cIituZXcgRGF0ZSgpLnZhbHVlT2YoKTtcblx0XHRcdFx0XHRcdCAgdmFyIGxhdGV4ID0gZWxlbWVudHNbaV0uaW5uZXJIVE1MO1xuXHRcdFx0XHRcdFx0ICBlbGVtZW50c1tpXS5pZCA9IGlkO1xuXHRcdFx0XHRcdFx0ICBfc2VsZi5hZGRGb3JtdWxhKGlkLGxhdGV4KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sMjAwKTtcblx0XHR9XG5cdH0sXG5cdGdldENvbnRlbnQ6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5yZWZzLmVkaXRhcmVhLmdldENvbnRlbnQoKTtcblx0fSxcblx0Zm9jdXNFZGl0b3I6ZnVuY3Rpb24oKXtcblx0XHR2YXIgZWRpdGFyZWEgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZWRpdGFyZWEpO1xuXHRcdGVkaXRhcmVhLmZvY3VzKCk7XG5cdH0sXG4gICAgLy8gcmVuZGVyIGZ1bmN0aW9ucyAgXG5cdGdlbkVkaXRBcmVhOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHNob3dIdG1sID0gdGhpcy5zdGF0ZS5lZGl0b3JTdGF0ZS5zaG93SHRtbDtcblx0XHRpZihzaG93SHRtbCl7XG5cdFx0XHRyZXR1cm4gKDxFZGl0b3JUZXh0QXJlYSByZWY9XCJlZGl0YXJlYVwiIC8+KVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuICg8RWRpdG9yQ29udGVudEVkaXRhYmxlRGl2IHJlZj1cImVkaXRhcmVhXCIgb25SYW5nZUNoYW5nZT17dGhpcy5oYW5kbGVSYW5nZUNoYW5nZX0vPilcdFx0XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHR2YXIgZWRpdEFyZWEgPSB0aGlzLmdlbkVkaXRBcmVhKCk7XG5cdFx0dmFyIHtvbkJsdXIsY2xhc3NOYW1lLGlkLG9uRm9jdXMsb25DbGljaywuLi5wcm9wc30gPSB0aGlzLnByb3BzO1xuXHRcdHJldHVybiAoPGRpdiByZWY9XCJyb290XCIgaWQ9e2lkfSBjbGFzc05hbWU9e1wiZWRpdG9yLWNvbnRhaW5lciBlZGl0b3ItZGVmYXVsdFwiICsoY2xhc3NOYW1lP1wiIFwiK2NsYXNzTmFtZTpcIlwiKX0gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30gb25CbHVyPXt0aGlzLmhhbmRsZVJhbmdlQ2hhbmdlfSAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c30gey4uLnByb3BzfT5cblx0XHRcdFx0PEVkaXRvclRvb2xiYXIgcmVmPVwidG9vbGJhclwiIGVkaXRvclN0YXRlPXt0aGlzLnN0YXRlLmVkaXRvclN0YXRlfSBvbkljb25DbGljaz17dGhpcy5oYW5kbGVUb29sYmFySWNvbkNsaWNrfSBpY29ucz17dGhpcy5wcm9wcy5pY29uc30gcGFyYWdyYXBoPXt0aGlzLnByb3BzLnBhcmFncmFwaH0gIGZvbnRzaXplPXt0aGlzLnByb3BzLmZvbnRTaXplfSAgZm9udGZhbWlseT17dGhpcy5wcm9wcy5mb250RmFtaWx5fT5cblx0XHRcdFx0XHQ8SW1hZ2VEaWFsb2cgcmVmPVwiaW1hZ2VcIiB1cGxvYWRlcj17dGhpcy5wcm9wcy5wbHVnaW5zLmltYWdlLnVwbG9hZGVyfSBjdXN0b21VcGxvYWRlcj17dGhpcy5wcm9wcy5wbHVnaW5zLmltYWdlLmN1c3RvbVVwbG9hZGVyfS8+XG5cdFx0XHRcdFx0PENvbG9yRHJvcGRvd24gcmVmPVwiY29sb3JcIiAvPlxuXHRcdFx0XHRcdDxGb3JtdWxhRHJvcGRvd24gcmVmPVwiZm9ybXVsYVwiLz5cblx0XHRcdFx0XHQ8VGFibGVQaWNrZXJEcm9wZG93biByZWY9XCJ0YWJsZVwiIC8+XG5cdFx0XHRcdFx0PFNwZWNpYWxDaGFyc0RpYWxvZyByZWY9XCJzcGVjaWFsXCIgLz5cblx0XHRcdFx0XHQ8RW1vdGlvbkRpYWxvZyByZWY9XCJlbW90aW9uXCIgLz5cblx0XHRcdFx0XHQ8Rm9udFNpemVDb21ib0JveCByZWY9XCJmb250c2l6ZVwiIGZvbnRzaXplPXt0aGlzLnByb3BzLmZvbnRTaXplfSAvPlxuXHRcdFx0XHRcdDxGb250RmFtaWx5Q29tYm9Cb3ggcmVmPVwiZm9udGZhbWlseVwiIGZvbnRmYW1pbHk9e3RoaXMucHJvcHMuZm9udEZhbWlseX0gLz5cblx0XHRcdFx0XHQ8UGFyYWdyYXBoQ29tYm9Cb3ggcmVmPVwicGFyYWdyYXBoXCIgcGFyYWdyYXBoPXt0aGlzLnByb3BzLnBhcmFncmFwaH0gLz5cblx0XHRcdFx0PC9FZGl0b3JUb29sYmFyPlxuXHRcdFx0XHR7ZWRpdEFyZWF9XG5cdFx0XHRcdDxFZGl0b3JSZXNpemUgcmVmPVwicmVzaXplXCIgLz5cblx0XHRcdFx0PC9kaXY+KVxuXHR9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvcjsiXX0=
