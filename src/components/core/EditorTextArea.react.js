var React = require('react');
var ReactDOM = require('react-dom');

class EditorTextArea  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			content:""
		}
	}
	getContent(){
		var target = ReactDOM.findDOMNode(this.refs.root);
		return target.value;
	}
	setContent(content){
		this.setState({
			content:content
		})
	}
	getName(){
		return "textarea";
	}
	handleChange(){
		var content = this.getContent();
		this.setState({
			content: content
		})
		if(this.props.onChange){
			this.props.onChange(content);
		}
	}
	render(){
		return (<textarea ref="root" className="editor-textarea" value={this.state.content} onChange={this.handleChange.bind(this)} ></textarea>)
	}
}
				
module.exports = EditorTextArea;