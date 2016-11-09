'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
		for (t in i) new RegExp("(" + t + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? i[t] : ("00" + i[t]).substr(("" + i[t]).length)));
		return n;
	};
}

var Editor = React.createClass({
	displayName: 'Editor',

	getInitialState: function getInitialState() {
		return {
			loaded: false,
			reload: true
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
			// video map print preview drafts link unlink
			"source | undo redo | bold italic underline strikethrough fontborder emphasis | ", "paragraph fontfamily fontsize | superscript subscript | ", "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ", "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ", "horizontal date time  | image emotion formula spechars | inserttable"]
		};
	},
	componentDidMount: function componentDidMount() {
		this.index = EditorEventEmitter.editorSum;
		EditorEventEmitter.addStartListener("start-" + this.index, this.handleChange);
	},
	componentWillUnmount: function componentWillUnmount() {
		var index = this.index;
		EditorEventEmitter.removeStartListener("start-" + index, this.handleChange);
	},
	componentDidUpdate: function componentDidUpdate() {
		if (this.state.loaded && this.state.reload) {
			this.refs.editor.setContent(this.props.value || this.props.defaultValue);
		}
	},
	handleChange: function handleChange() {
		this.setState({
			loaded: true
		});
	},
	handleMountSuccess: function handleMountSuccess() {
		EditorEventEmitter.mountEditorSuccess();
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		var currentValue = this.props.value || this.props.defaultValue;
		var editorValue = this.getContent();
		var nextValue = nextProps.value || nextProps.defaultValue;

		if (currentValue == editorValue && (nextValue == currentValue || nextValue == editorValue)) {
			this.setState({
				reload: false
			});
		} else {
			this.setState({
				reload: true
			});
		}
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		// reload判断当前是否可以允许刷新
		// loaded状态变化时，务必重新刷新
		return nextState.reload || this.state.loaded != nextState.loaded;
	},
	getContent: function getContent() {
		return this.refs.editor ? this.refs.editor.getContent() : "";
	},
	setContent: function setContent(content) {
		return this.refs.editor ? this.refs.editor.setContent(content) : "";
	},
	focusEditor: function focusEditor() {
		return this.refs.editor ? this.refs.editor.focusEditor() : "";
	},
	findDOMNode: function findDOMNode(refName) {
		return this.refs.editor ? this.refs.editor.findDOMNode(refName) : "";
	},
	render: function render() {
		var loaded = this.state.loaded;
		var _props = this.props;
		var value = _props.value;
		var defaultValue = _props.defaultValue;

		var props = _objectWithoutProperties(_props, ['value', 'defaultValue']);

		if (!this.state.loaded) {
			return React.createElement(
				'div',
				{ id: props.id, className: 'editor-contenteditable-div', style: { "minHeight": "30px", "border": "1px solid #ddd" } },
				'正在加载...'
			);
		} else {
			return React.createElement(EditorCore, _extends({ ref: 'editor' }, props, { onEditorMount: this.handleMountSuccess }));
		}
	}
});

module.exports = Editor;