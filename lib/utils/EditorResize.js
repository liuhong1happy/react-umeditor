'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _EditorDOM = require('./EditorDOM');

var _EditorDOM2 = _interopRequireDefault(_EditorDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// resize context
var minWidth = 12;
var minHeight = 12;

var EditorResize = function (_Component) {
	_inherits(EditorResize, _Component);

	function EditorResize(props) {
		_classCallCheck(this, EditorResize);

		var _this = _possibleConstructorReturn(this, (EditorResize.__proto__ || Object.getPrototypeOf(EditorResize)).call(this, props));

		_this.state = {
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
		return _this;
	}

	_createClass(EditorResize, [{
		key: 'setTarget',
		value: function setTarget(target) {
			var root = _reactDom2.default.findDOMNode(this.refs.root);
			var position = _EditorDOM2.default.getOffsetRootParentPosition(target, root.parentElement);
			var width = position.w;
			var height = position.h;
			var offsetPosition = { x: position.x, y: position.y };
			this.setState({
				target: target,
				width: width,
				height: height,
				show: true,
				position: offsetPosition
			});
		}
	}, {
		key: 'getTarget',
		value: function getTarget() {
			return this.state.target;
		}
	}, {
		key: 'clearTarget',
		value: function clearTarget() {
			this.setState({
				target: null,
				show: false
			});
		}
	}, {
		key: 'clearSelect',
		value: function clearSelect(e) {
			if (window.getSelection) {
				window.getSelection().removeAllRanges();
			} else {
				document.selection.empty();
			}
		}
	}, {
		key: 'getMousePosition',
		value: function getMousePosition(e) {
			e = e || window.event;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;

			var x = parseFloat(e.pageX || e.clientX + scrollX);
			var y = parseFloat(e.pageY || e.clientY + scrollY);

			return { x: x, y: y };
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(e) {
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

			window.removeEventListener("mouseup", this.handleMouseUp.bind(this));
			window.removeEventListener("mousemove", this.handleMouseMove.bind(this));
			window.addEventListener("mouseup", this.handleMouseUp.bind(this));
			window.addEventListener("mousemove", this.handleMouseMove.bind(this));

			_EditorDOM2.default.stopPropagation(e);
		}
	}, {
		key: 'handleMouseMove',
		value: function handleMouseMove(e) {
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

			_EditorDOM2.default.stopPropagation(e);
		}
	}, {
		key: 'handleMouseUp',
		value: function handleMouseUp(e) {
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

			window.removeEventListener("mouseup", this.handleMouseUp.bind(this));
			window.removeEventListener("mousemove", this.handleMouseMove.bind(this));
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

			_EditorDOM2.default.stopPropagation(e);
		}
	}, {
		key: 'render',
		value: function render() {
			var style = {
				width: this.state.width,
				height: this.state.height,
				left: this.state.position.x,
				top: this.state.position.y,
				display: this.state.show ? "block" : "none",
				positoin: "absolute"
			};
			return _react2.default.createElement(
				'div',
				{ className: 'editor-resize-container', ref: 'root' },
				_react2.default.createElement(
					'div',
					{ className: 'editor-resize', style: style },
					_react2.default.createElement('div', { className: 'block-resize nw-resize', onMouseDown: this.handleMouseDown.bind(this), onMouseMove: this.handleMouseMove.bind(this), onMouseUp: this.handleMouseUp.bind(this) }),
					_react2.default.createElement('div', { className: 'block-resize ne-resize', onMouseDown: this.handleMouseDown.bind(this), onMouseMove: this.handleMouseMove.bind(this), onMouseUp: this.handleMouseUp.bind(this) }),
					_react2.default.createElement('div', { className: 'block-resize sw-resize', onMouseDown: this.handleMouseDown.bind(this), onMouseMove: this.handleMouseMove.bind(this), onMouseUp: this.handleMouseUp.bind(this) }),
					_react2.default.createElement('div', { className: 'block-resize se-resize', onMouseDown: this.handleMouseDown.bind(this), onMouseMove: this.handleMouseMove.bind(this), onMouseUp: this.handleMouseUp.bind(this) })
				)
			);
		}
	}]);

	return EditorResize;
}(_react.Component);

exports.default = EditorResize;