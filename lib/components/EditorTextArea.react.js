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