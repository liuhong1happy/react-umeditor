'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* @icon: 图标名称 string
* @disabled: 是否禁用 bool
* @onClick: 暴露点击事件 function
* @title: 提示 string
* @active: 是否选中 bool
* @showHtml: 是否当前是显示html属性
* @color: 前景色和背景色
**/
var EditorIcon = function (_Component) {
	_inherits(EditorIcon, _Component);

	function EditorIcon() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, EditorIcon);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditorIcon.__proto__ || Object.getPrototypeOf(EditorIcon)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
			e = e || event;
			var target = e.target || e.srcElement;
			while (target.className.indexOf("editor-icon") == -1) {
				target = target.parentElement;
			}
			e.target = target;

			var _this$props = _this.props,
			    onClick = _this$props.onClick,
			    props = _objectWithoutProperties(_this$props, ['onClick']);

			if (_this.props.onClick) {
				_this.props.onClick(e, _extends({}, props));
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
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
			var root = _reactDom2.default.findDOMNode(this.refs.root);
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
		key: 'render',
		value: function render() {
			var _props = this.props,
			    icon = _props.icon,
			    active = _props.active,
			    disabled = _props.disabled,
			    showHtml = _props.showHtml,
			    onClick = _props.onClick,
			    props = _objectWithoutProperties(_props, ['icon', 'active', 'disabled', 'showHtml', 'onClick']);

			var _disabled = showHtml && icon != "source" && icon != "separator";
			var _className = "editor-icon icon-" + icon + (active ? " active" : "") + (disabled || _disabled ? " disabled" : "");
			if (icon == "fontsize" || icon == "fontfamily" || icon == "paragraph") {
				return _react2.default.createElement(
					'span',
					_extends({ ref: 'root', className: _className, onClick: this.handleClick }, props),
					_react2.default.createElement(
						'span',
						{ className: 'icon-label' },
						props.name
					),
					_react2.default.createElement('span', { className: 'icon-caret' })
				);
			} else {
				return _react2.default.createElement('span', _extends({ ref: 'root', className: _className, onClick: this.handleClick }, props));
			}
		}
	}]);

	return EditorIcon;
}(_react.Component);

exports.default = EditorIcon;