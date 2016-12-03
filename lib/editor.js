'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../dist/less/editor.less');
var React = require('react');
var ReactDOM = require('react-dom');
var EditorCore = require('./components/core/EditorCore.react');
var EditorEventEmitter = require('./utils/EditorEventEmitter');

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
		for (t in i) {
			new RegExp("(" + t + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? i[t] : ("00" + i[t]).substr(("" + i[t]).length)));
		}return n;
	};
}

var Editor = function (_React$Component) {
	_inherits(Editor, _React$Component);

	function Editor(props) {
		_classCallCheck(this, Editor);

		var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

		_this.state = {
			loaded: false,
			reload: true
		};
		return _this;
	}

	_createClass(Editor, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.index = EditorEventEmitter.editorSum;
			EditorEventEmitter.addStartListener("start-" + this.index, this.handleChange.bind(this));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			var index = this.index;
			EditorEventEmitter.removeStartListener("start-" + index, this.handleChange.bind(this));
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this.state.loaded && this.state.reload) {
				this.refs.editor.setContent(this.props.value || this.props.defaultValue);
			}
		}
	}, {
		key: 'handleChange',
		value: function handleChange() {
			this.setState({
				loaded: true
			});
		}
	}, {
		key: 'handleMountSuccess',
		value: function handleMountSuccess() {
			EditorEventEmitter.mountEditorSuccess();
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			// reload判断当前是否可以允许刷新
			// loaded状态变化时，务必重新刷新
			var currentValue = nextProps.value;
			var editorValue = this.getContent();

			if (this.state.loaded != nextState.loaded) {
				return true;
			} else if (currentValue == editorValue) {
				return false;
			}
			return true;
		}
	}, {
		key: 'getContent',
		value: function getContent() {
			return this.refs.editor ? this.refs.editor.getContent() : "";
		}
	}, {
		key: 'setContent',
		value: function setContent(content) {
			return this.refs.editor ? this.refs.editor.setContent(content) : "";
		}
	}, {
		key: 'focusEditor',
		value: function focusEditor() {
			return this.refs.editor ? this.refs.editor.focusEditor() : "";
		}
	}, {
		key: 'findDOMNode',
		value: function findDOMNode(refName) {
			return this.refs.editor ? this.refs.editor.findDOMNode(refName) : "";
		}
	}, {
		key: 'render',
		value: function render() {
			var loaded = this.state.loaded;

			var _props = this.props,
			    value = _props.value,
			    defaultValue = _props.defaultValue,
			    props = _objectWithoutProperties(_props, ['value', 'defaultValue']);

			if (!this.state.loaded) {
				return React.createElement(
					'div',
					{ id: props.id, className: 'editor-contenteditable-div', style: { "minHeight": "30px", "border": "1px solid #ddd" } },
					'\u6B63\u5728\u52A0\u8F7D...'
				);
			} else {
				return React.createElement(EditorCore, _extends({ ref: 'editor' }, props, { onEditorMount: this.handleMountSuccess.bind(this) }));
			}
		}
	}]);

	return Editor;
}(React.Component);

Editor.propTypes = {
	"plugins": React.PropTypes.object,
	"fontFamily": React.PropTypes.array,
	"fontSize": React.PropTypes.array,
	"paragraph": React.PropTypes.array,
	"icons": React.PropTypes.arrayOf(React.PropTypes.string),
	"value": React.PropTypes.string,
	"defaultValue": React.PropTypes.string
};
Editor.defaultProps = {
	"plugins": {
		"image": {
			"uploader": {
				type: "default", // qiniu
				name: "file",
				url: "/upload",
				qiniu: {
					app: {
						Bucket: "qtestbucket",
						AK: "iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV",
						SK: "6QTOr2Jg1gcZEWDQXKOGZh5PziC2MCV5KsntT70j"
					},
					key: null,
					upload_token: null,
					domain: "http://o9sa2vijj.bkt.clouddn.com",
					genKey: function genKey(options) {
						return options.file.type + "-" + options.file.size + "-" + options.file.lastModifiedDate.valueOf() + "-" + new Date().valueOf() + "-" + options.file.name;
					}
				}
			}
		}
	},
	"fontFamily": [{ "name": "宋体", value: "宋体, SimSun", defualt: true }, { "name": "隶书", value: "隶书, SimLi" }, { "name": "楷体", value: "楷体, SimKai" }, { "name": "微软雅黑", value: "微软雅黑, Microsoft YaHei" }, { "name": "黑体", value: "黑体, SimHei" }, { "name": "arial", value: "arial, helvetica, sans-serif" }, { "name": "arial black", value: "arial black, avant garde" }, { "name": "omic sans ms", value: "omic sans ms" }, { "name": "impact", value: "impact, chicago" }, { "name": "times new roman", value: "times new roman" }, { "name": "andale mono", value: "andale mono" }],
	"fontSize": [{ "name": "10px", value: "1" }, { "name": "12px", value: "2" }, { "name": "16px", value: "3", defualt: true }, { "name": "18px", value: "4" }, { "name": "24px", value: "5" }, { "name": "32px", value: "6" }, { "name": "38px", value: "7" }],
	"paragraph": [{ "name": "段落", value: "p", defualt: true }, { "name": "标题1", value: "h1" }, { "name": "标题2", value: "h2" }, { "name": "标题3", value: "h3" }, { "name": "标题4", value: "h4" }, { "name": "标题5", value: "h5" }, { "name": "标题6", value: "h6" }],
	"icons": [
	// video map print preview drafts link unlink formula
	"source | undo redo | bold italic underline strikethrough fontborder emphasis | ", "paragraph fontfamily fontsize | superscript subscript | ", "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ", "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ", "horizontal date time  | image emotion spechars | inserttable"],
	"value": "",
	"defaultValue": "<p>This is an Editor</p>"
};

module.exports = Editor;