var React = require('react');
var ReactDOM = require('react-dom');

var EditorTextArea = React.createClass({
	getInitialState:function(){
		return {
			content:""
		}
	},
	getContent:function(){
		var target = ReactDOM.findDOMNode(this.refs.root);
		return target.value;
	},
	setContent:function(content){
		this.setState({
			content:content
		})
	},
	getName:function(){
		return "textarea";
	},
	handleChange:function(){
		var target = ReactDOM.findDOMNode(this.refs.root);
		this.setState({
			content:target.value
		})
	},
	render:function(){
		return (<textarea ref="root" className="editor-textarea" value={this.state.content} onChange={this.handleChange}></textarea>)
	}
})
module.exports = EditorTextArea;