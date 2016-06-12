var React = require('react');
var ReactDOM = require('react-dom');
var Editor = require('react-umeditor');

// other form control
var FormPanel = React.createClass({
	getInitialState:function(){
		return {
			value:this.props.value
		}
	},
	componentWillReceiveProps:function(nextProps){
		if(this.props.value != nextProps.value){
			this.setState({
				value:nextProps.value
			})
		}
	},
	getValue:function(){
		return this.state.value;
	},
	handleChange:function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		this.setState({
			value:target.value
		})
	},
	render:function(){
		var value = this.state.value;
		return (<input type="text" value={value} onChange={this.handleChange} style={{"marginBottom":"10px"}} />)
	}
})

var App = React.createClass({
	render:function(){
		return (<div>
				<FormPanel value="123"/>
				<Editor />
			   </div>)
	}
})
	
ReactDOM.render(<App />, document.getElementById('react-container'));