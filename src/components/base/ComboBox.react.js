import React, { Component } from 'react';

class ComboBox extends Component{
	constructor(props){
		super(props);
		this.state = {
			show:false,
			position:{
				x:0,
				y:0
			}
		}
	}
	componentDidMount(){
		window.addEventListener("click",this.close.bind(this));
	}
	componentWillUnmount(){
		window.removeEventListener("click",this.close.bind(this));
	}
	open(position){
		this.setState({
			show:true,
			position:position
		})
	}
	close(){
		if(!this.state.show) return;
		this.setState({
			show:false
		})
	}
	toggle(position){
		this.setState({
			show: !this.state.show,
			position: position
		})
	}
	render(){
		let { className, style, ...others } = this.props;
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

		return (
      <div
        style={style}
        className={"combobox" + (className ? " " + className : "")}
        {...others}>
			{ this.props.children }
		</div>)
	}
}
module.exports = ComboBox;
