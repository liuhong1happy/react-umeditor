var React = require('react');
var ReactDOM = require('react-dom');
var EditorSelection = require('../../utils/EditorSelection');
var EditorDOM = require('../../utils/EditorDOM');
var EditorResize = require('../../utils/EditorResize.react');

class EditorContentEditableDiv extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			content:""
		}
	}
	componentDidMount(e){
		this.handleWindowMouseDown = this.handleWindowMouseDown.bind(this)
		this.handleMouseUp = this.handleMouseUp.bind(this)
		window.addEventListener("mousedown",this.handleWindowMouseDown.bind(this));
		window.addEventListener("mouseup",this.handleMouseUp.bind(this));
	}
	componentWillUnmount(e){
		window.removeEventListener("mousedown",this.handleWindowMouseDown.bind(this));
		window.removeEventListener("mouseup",this.handleMouseUp.bind(this));
	}
	componentWillUpdate(e){
		// EditorSelection.cloneRange();
	}
	componentDidUpdate(e){
		// EditorSelection.cloneRange();
	}
	shouldComponentUpdate(nextProps, nextState){
		// reload判断当前是否可以允许刷新
		// loaded状态变化时，务必重新刷新
		var currentValue = nextProps.value;
		var editorValue = this.getContent();

		if(currentValue == editorValue){
			return false;
		}
		return true;
	}
	getContent(){
		var target = ReactDOM.findDOMNode(this.refs.edit);
		return target.innerHTML;
	}
	setContent(content){
		if(this.getContent() == content) return;
		this.setState({
			content:content
		})
		var target = ReactDOM.findDOMNode(this.refs.edit);
		target.innerHTML = content;
	}
	getName(){
		return "div";
	}
	handleWindowMouseDown(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var tagName = target.tagName.toUpperCase();
		var FormControls = ["TEXTAREA","INPUT","SELECT","OPTIONS"];
		if(FormControls.indexOf(tagName)!=-1){
			return;
		}
		EditorSelection.clearRange();
	}
	handleMouseDown(e){
		EditorSelection.clearRange();
		EditorDOM.stopPropagation(e);
	}
	handleMouseUp(e){
		EditorSelection.createRange();
		if(this.props.onRangeChange)
			this.props.onRangeChange(e);
		EditorDOM.stopPropagation(e);
	}
	setResizeTarget(target){
		this.refs.resize.setTarget(target);
	}
	clearResizeTarget(){
		this.refs.resize.clearTarget();
	}
	getEditorRange(){
		return ReactDOM.findDOMNode(this.refs.edit);
	}
	render(){
		return (
			<div className="editor-contenteditable-div">
				<EditorResize ref="resize" />
				<div className="editable-range" ref="edit"
					onMouseUp={this.handleMouseUp.bind(this)} onMouseDown={this.handleMouseDown.bind(this)}
					contentEditable={true} dangerouslySetInnerHTML={{__html:this.state.content}}>
				</div>
			</div>)
	}
}
module.exports = EditorContentEditableDiv;
