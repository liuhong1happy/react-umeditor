var React = require('react');
var ReactDOM = require('react-dom');
var EditorSelection = require('../utils/EditorSelection');

var EditorContentEditableDiv = React.createClass({
	getInitialState:function(){
		return {
			content:""
		}
	},
	componentDidMount:function(e){
		window.addEventListener("mousedown",this.handleWindowMouseDown);
	},
	componentWillUpdate:function(e){
		EditorSelection.addRange();
	},
	componentDidUpdate:function(e){
		EditorSelection.addRange();
	},
	getContent:function(){
		var target = ReactDOM.findDOMNode(this.refs.root);
		return target.innerHTML;
	},
	setContent:function(content){
		this.setState({
			content:content
		})
	},
	getName:function(){
		return "div";
	},
	handleWindowMouseDown:function(e){
		EditorSelection.clearRange();
	},
	handleMouseDown:function(e){
		EditorSelection.clearRange();
		window.addEventListener("mouseup",this.handleMouseUp);
	},
	handleMouseUp:function(e){
		EditorSelection.createRange();
		window.removeEventListener("mouseup",this.handleMouseUp);
		
		if(this.props.onRangeChange) 
			this.props.onRangeChange(e);
	},
	render:function(){
		return (<div ref="root" className="editor-contenteditable-div" 
				onMouseUp={this.handleMouseUp} 
				onMouseDown={this.handleMouseDown}
				contentEditable={true} dangerouslySetInnerHTML={{__html:this.state.content}}></div>)
	}
})
module.exports = EditorContentEditableDiv;