var React = require('react');
var ReactDOM = require('react-dom');
var Editor = require('react-umeditor');

var App = React.createClass({
	getIcons:function(){
		return [
				"source | undo redo | bold italic underline strikethrough fontborder | ",
				"paragraph fontfamily fontsize | superscript subscript | ",
				"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
				"cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
				"horizontal date time  | image formula spechars | inserttable"
			]
	},
	render:function(){
		var icons = this.getIcons();
		return (<Editor icons={icons}/>)
	}
})
	
ReactDOM.render(<App />, document.getElementById('react-container'));