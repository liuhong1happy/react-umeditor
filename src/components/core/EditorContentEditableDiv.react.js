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
	componentDidMount(){
		window.addEventListener('keydown', this.props.handleKeyDown)
		window.addEventListener('keyup', this.props.handleKeyUp)
		window.addEventListener("mousedown",this.handleWindowMouseDown);
		window.addEventListener("mouseup",this.handleMouseUp);
    	setTimeout(this.props.onEditorMount, 50);
	}

	shouldComponentUpdate(nextProps, nextState){
		// reload判断当前是否可以允许刷新
		// loaded状态变化时，务必重新刷新
		let currentValue = nextProps.value;
		let editorValue = this.getContent();

		if(currentValue == editorValue){
			return false;
		}
		return true;
	}

	componentWillUpdate(){
		// EditorSelection.cloneRange();
	}
	componentDidUpdate(){
		// EditorSelection.cloneRange();
	}

	componentWillUnmount(){
		window.removeEventListener("mousedown",this.handleWindowMouseDown);
		window.removeEventListener("mouseup",this.handleMouseUp);
		window.removeEventListener("keydown", this.props.handleKeyDown)
		window.removeEventListener("keyup", this.props.handleKeyUp)
	}

	getContent(){
		let target = ReactDOM.findDOMNode(this.refs.edit);
		return target.innerHTML;
	}

	setContent(content){
		if(this.getContent() == content) return;
		this.setState({
			content:content
		})
		let target = ReactDOM.findDOMNode(this.refs.edit);
		target.innerHTML = content;
	}

	getName(){
		return "div";
	}

	handleWindowMouseDown = (e) => {
		e = e || event;
		let target = e.target || e.srcElement;
		let tagName = target.tagName.toUpperCase();
		let FormControls = ["TEXTAREA","INPUT","SELECT","OPTIONS"];
		if(FormControls.indexOf(tagName)!=-1){
			return;
		}
		EditorSelection.clearRange();
	}

	handleMouseDown = (e) => {
		EditorSelection.clearRange();
		EditorDOM.stopPropagation(e);
	}

	handleMouseUp = (e) => {
		EditorSelection.createRange();
		if(this.props.onRangeChange) {
			this.props.onRangeChange(e);
    	}
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
				<div className="editable-range"
          		ref="edit"
				onMouseUp={this.handleMouseUp}
          		onMouseDown={this.handleMouseDown}
				contentEditable={true}
          		dangerouslySetInnerHTML={{__html:this.state.content}}/>
			</div>)
	}
}
module.exports = EditorContentEditableDiv;
