'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var EditorSelection = require('../../utils/EditorSelection');
var EditorDOM = require('../../utils/EditorDOM');
var EditorResize = require('../../utils/EditorResize.react');

var EditorContentEditableDiv = function (_React$Component) {
	_inherits(EditorContentEditableDiv, _React$Component);

	function EditorContentEditableDiv(props) {
		_classCallCheck(this, EditorContentEditableDiv);

		var _this = _possibleConstructorReturn(this, (EditorContentEditableDiv.__proto__ || Object.getPrototypeOf(EditorContentEditableDiv)).call(this, props));

		_this.handleWindowMouseDown = function (e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var tagName = target.tagName.toUpperCase();
			var FormControls = ["TEXTAREA", "INPUT", "SELECT", "OPTIONS"];
			if (FormControls.indexOf(tagName) != -1) {
				return;
			}
			EditorSelection.clearRange();
		};

		_this.handleMouseDown = function (e) {
			EditorSelection.clearRange();
			EditorDOM.stopPropagation(e);
		};

		_this.handleMouseUp = function (e) {
			EditorSelection.createRange();
			if (_this.props.onRangeChange) {
				_this.props.onRangeChange(e);
			}
			EditorDOM.stopPropagation(e);
		};

		_this.state = {
			content: ""
		};
		return _this;
	}

	_createClass(EditorContentEditableDiv, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.addEventListener('keydown', this.props.handleKeyDown);
			window.addEventListener('keyup', this.props.handleKeyUp);
			window.addEventListener("mousedown", this.handleWindowMouseDown);
			window.addEventListener("mouseup", this.handleMouseUp);
			setTimeout(this.props.onEditorMount, 50);
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			// reload判断当前是否可以允许刷新
			// loaded状态变化时，务必重新刷新
			var currentValue = nextProps.value;
			var editorValue = this.getContent();

			if (currentValue == editorValue) {
				return false;
			}
			return true;
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			// EditorSelection.cloneRange();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			// EditorSelection.cloneRange();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener("mousedown", this.handleWindowMouseDown);
			window.removeEventListener("mouseup", this.handleMouseUp);
			window.removeEventListener("keydown", this.props.handleKeyDown);
			window.removeEventListener("keyup", this.props.handleKeyUp);
		}
	}, {
		key: 'getContent',
		value: function getContent() {
			var target = ReactDOM.findDOMNode(this.refs.edit);
			return target.innerHTML;
		}
	}, {
		key: 'setContent',
		value: function setContent(content) {
			if (this.getContent() == content) return;
			this.setState({
				content: content
			});
			var target = ReactDOM.findDOMNode(this.refs.edit);
			target.innerHTML = content;
		}
	}, {
		key: 'getName',
		value: function getName() {
			return "div";
		}
	}, {
		key: 'setResizeTarget',
		value: function setResizeTarget(target) {
			this.refs.resize.setTarget(target);
		}
	}, {
		key: 'clearResizeTarget',
		value: function clearResizeTarget() {
			this.refs.resize.clearTarget();
		}
	}, {
		key: 'getEditorRange',
		value: function getEditorRange() {
			return ReactDOM.findDOMNode(this.refs.edit);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'editor-contenteditable-div' },
				React.createElement(EditorResize, { ref: 'resize' }),
				React.createElement('div', { className: 'editable-range',
					ref: 'edit',
					onMouseUp: this.handleMouseUp,
					onMouseDown: this.handleMouseDown,
					contentEditable: true,
					dangerouslySetInnerHTML: { __html: this.state.content } })
			);
		}
	}]);

	return EditorContentEditableDiv;
}(React.Component);

module.exports = EditorContentEditableDiv;