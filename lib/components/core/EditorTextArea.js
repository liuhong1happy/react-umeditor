'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditorTextArea = function (_Component) {
	_inherits(EditorTextArea, _Component);

	function EditorTextArea(props) {
		_classCallCheck(this, EditorTextArea);

		var _this = _possibleConstructorReturn(this, (EditorTextArea.__proto__ || Object.getPrototypeOf(EditorTextArea)).call(this, props));

		_this.state = {
			content: ""
		};
		return _this;
	}

	_createClass(EditorTextArea, [{
		key: 'getContent',
		value: function getContent() {
			var target = _reactDom2.default.findDOMNode(this.refs.root);
			return target.value;
		}
	}, {
		key: 'setContent',
		value: function setContent(content) {
			this.setState({
				content: content
			});
		}
	}, {
		key: 'getName',
		value: function getName() {
			return "textarea";
		}
	}, {
		key: 'handleChange',
		value: function handleChange() {
			var content = this.getContent();
			this.setState({
				content: content
			});
			if (this.props.onChange) {
				this.props.onChange(content);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('textarea', { ref: 'root', className: 'editor-textarea', value: this.state.content, onChange: this.handleChange.bind(this) });
		}
	}]);

	return EditorTextArea;
}(_react.Component);

exports.default = EditorTextArea;