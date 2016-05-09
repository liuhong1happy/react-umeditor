var React = require('react');
var ReactDOM = require('react-dom');
var Editor = require('react-umeditor');

var App = React.createClass({
	render:function(){
		return (<Editor />)
	}
})
	
ReactDOM.render(<App />, document.getElementById('react-container'));