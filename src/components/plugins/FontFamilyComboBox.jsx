import React, { Component } from 'react'
import ComboBox from '../base/ComboBox'

export default class FontFamilyDropdown  extends Component{
	constructor(props){
		super(props);
		this.state = {
			handle:function(){}
		}
	}
	open(position,handle){
		this.setState({
			handle:handle
		})
		this.refs.root.open(position);
	}
	close(){
		if(this.refs.root)
			this.refs.root.close();
	}
	toggle(position,handle){
		this.setState({
			handle:handle
		})
		this.refs.root.toggle(position);
	}
	handleSelect(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var value = target.getAttribute('data-value');
		if(this.state.handle){
			this.state.handle(value);
		}
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
		this.close();
	}
	render(){
		var handleSelect = this.handleSelect.bind(this);
		var fontfamily = this.props.fontfamily?this.props.fontfamily:[];
		var props = this.props;
		if(this.props.hidden){
			return (<div></div>)
		}else{
			return (<ComboBox ref="root" className="fontfamily-combobox">
				<ul>
					{
						fontfamily.map(function(ele,pos){
							return (<li className={ele.value==props.value?"active":""} key={pos} data-value={ele.value} onClick={handleSelect}>
									<span data-value={ele.value} style={{"fontFamily":ele.value}}>{ele.name}</span>
									</li>)
						})
					}
				</ul>
			</ComboBox>)
		}
	}
}