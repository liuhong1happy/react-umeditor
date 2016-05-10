var React = require('react');

var Dropdown = React.createClass({
	getInitialState:function(){
		return {
			show:false,
			position:{
				x:0,
				y:0
			}
		}
	},
	componentDidMount:function(){
		window.addEventListener("click",this.close);
	},
	componentWillUnmount:function(){
		window.removeEventListener("click",this.close);
	},
	open:function(position){
		this.setState({
			show:true,
			position:position
		})
	},
	close:function(){
		this.setState({
			show:false
		})
	},
	toggle:function(position){
		this.setState({
			show:!this.state.show,
			position:position
		})
	},
	render:function(){
		var {className,style,...props} = this.props;
		style = style || {};
		if(!this.state.show){
			 style["display"] = "none";
		}else{
			style["display"] = "";	 
		}
		if(this.state.position){
			style["left"] = this.state.position.x;
			style["top"] = this.state.position.y;
		}
			 
		return (<div style={style} className={"dropdown"+(className?" "+className:"")} {...props}>
			<div className="dropdown-caret"></div>		
			{this.props.children}
		</div>)
	}
})
		
module.exports = Dropdown;