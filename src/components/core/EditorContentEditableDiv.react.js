var React = require('react');
var ReactDOM = require('react-dom');
var EditorSelection = require('../../utils/EditorSelection');
var EditorDOM = require('../../utils/EditorDOM');

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
		EditorSelection.cloneRange();
	},
	componentDidUpdate:function(e){
		EditorSelection.cloneRange();
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
		EditorDOM.stopPropagation(e);
	},
	handleMouseUp:function(e){
		EditorSelection.createRange();
		window.removeEventListener("mouseup",this.handleMouseUp);
		
		if(this.props.onRangeChange) 
			this.props.onRangeChange(e);
		EditorDOM.stopPropagation(e);
	},
	render:function(){
		return (<div ref="root" className="editor-contenteditable-div" 
				onMouseUp={this.handleMouseUp} 
				onMouseDown={this.handleMouseDown}
				contentEditable={true} dangerouslySetInnerHTML={{__html:this.state.content}}></div>)
	}
})
module.exports = EditorContentEditableDiv;