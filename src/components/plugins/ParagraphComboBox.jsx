import React, { Component } from 'react'
import ComboBox from '../base/ComboBox'

export default class ParagraphDropdown extends Component{
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
		if(this.refs.root) this.refs.root.close();
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
		var paragraph = this.props.paragraph?this.props.paragraph:[];
		var props = this.props;
		if(this.props.hidden){
			return (<div></div>)
		}else{
			return (<ComboBox ref="root" className="paragraph-combobox">
				<ul>
					{
						paragraph.map(function(ele,pos){
							return (<li className={ele.value==props.value?"active":""} key={pos} data-value={ele.value} onClick={handleSelect}>
										{React.createElement(ele.value,{"data-value": ele.value},ele.name)}
									</li>)
						})
					}
				</ul>
			</ComboBox>)
		}
	}
}