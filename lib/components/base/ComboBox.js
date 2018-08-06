"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComboBox = function (_Component) {
	_inherits(ComboBox, _Component);

	function ComboBox(props) {
		_classCallCheck(this, ComboBox);

		var _this = _possibleConstructorReturn(this, (ComboBox.__proto__ || Object.getPrototypeOf(ComboBox)).call(this, props));

		_this.state = {
			show: false,
			position: {
				x: 0,
				y: 0
			}
		};
		return _this;
	}

	_createClass(ComboBox, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			window.addEventListener("click", this.close.bind(this));
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener("click", this.close.bind(this));
		}
	}, {
		key: "open",
		value: function open(position) {
			this.setState({
				show: true,
				position: position
			});
		}
	}, {
		key: "close",
		value: function close() {
			if (!this.state.show) return;
			this.setState({
				show: false
			});
		}
	}, {
		key: "toggle",
		value: function toggle(position) {
			this.setState({
				show: !this.state.show,
				position: position
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    style = _props.style,
			    others = _objectWithoutProperties(_props, ["className", "style"]);

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

			return _react2.default.createElement(
				"div",
				_extends({
					style: style,
					className: "combobox" + (className ? " " + className : "")
				}, others),
				this.props.children
			);
		}
	}]);

	return ComboBox;
}(_react.Component);

module.exports = ComboBox;