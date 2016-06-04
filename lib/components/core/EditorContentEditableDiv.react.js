'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var EditorSelection = require('../../utils/EditorSelection');

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
	componentWillUpdate: function componentWillUpdate(e) {
		EditorSelection.addRange();
	},
	componentDidUpdate: function componentDidUpdate(e) {
		EditorSelection.addRange();
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
	},
	handleMouseUp: function handleMouseUp(e) {
		EditorSelection.createRange();
		window.removeEventListener("mouseup", this.handleMouseUp);

		if (this.props.onRangeChange) this.props.onRangeChange(e);
	},
	render: function render() {
		return React.createElement('div', { ref: 'root', className: 'editor-contenteditable-div',
			onMouseUp: this.handleMouseUp,
			onMouseDown: this.handleMouseDown,
			contentEditable: true, dangerouslySetInnerHTML: { __html: this.state.content } });
	}
});
module.exports = EditorContentEditableDiv;