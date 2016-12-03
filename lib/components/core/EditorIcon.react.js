'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var EditorIcon = function (_React$Component) {
	_inherits(EditorIcon, _React$Component);

	function EditorIcon() {
		_classCallCheck(this, EditorIcon);

		return _possibleConstructorReturn(this, (EditorIcon.__proto__ || Object.getPrototypeOf(EditorIcon)).apply(this, arguments));
	}

	_createClass(EditorIcon, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.updateStyle();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.updateStyle();
		}
	}, {
		key: 'updateStyle',
		value: function updateStyle() {
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
		}
	}, {
		key: 'handleClick',
		value: function handleClick(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			while (target.className.indexOf("editor-icon") == -1) {
				target = target.parentElement;
			}
			e.target = target;

			var _props = this.props,
			    onClick = _props.onClick,
			    props = _objectWithoutProperties(_props, ['onClick']);

			if (this.props.onClick) {
				this.props.onClick(e, _extends({}, props));
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    icon = _props2.icon,
			    active = _props2.active,
			    disabled = _props2.disabled,
			    showHtml = _props2.showHtml,
			    onClick = _props2.onClick,
			    props = _objectWithoutProperties(_props2, ['icon', 'active', 'disabled', 'showHtml', 'onClick']);

			var _disabled = showHtml && icon != "source" && icon != "separator";
			var _className = "editor-icon icon-" + icon + (active ? " active" : "") + (disabled || _disabled ? " disabled" : "");
			if (icon == "fontsize" || icon == "fontfamily" || icon == "paragraph") {
				return React.createElement(
					'span',
					_extends({ ref: 'root', className: _className, onClick: this.handleClick.bind(this) }, props),
					React.createElement(
						'span',
						{ className: 'icon-label' },
						props.name
					),
					React.createElement('span', { className: 'icon-caret' })
				);
			} else {
				return React.createElement('span', _extends({ ref: 'root', className: _className, onClick: this.handleClick.bind(this) }, props));
			}
		}
	}]);

	return EditorIcon;
}(React.Component);

module.exports = EditorIcon;