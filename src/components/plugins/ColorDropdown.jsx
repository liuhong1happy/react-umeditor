import React from 'react'
import Dropdown from '../base/Dropdown'
import { ColorTypes } from '../../constants/EditorConstants'
import EditorDom from '../../utils/EditorDom'

export default class ColorDropdown extends React.Component{
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
	handleSelectColor(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var color = target.getAttribute('data-color');
		if(this.state.handle){
			this.state.handle(color);
		}
		this.close();
		EditorDom.stopPropagation(e);
	}
	render(){
		var handleSelectColor = this.handleSelectColor.bind(this);
		if(this.props.hidden){
			return (<div></div>)
		}else{
			return (<Dropdown ref="root" className="color-dropdown">
					<table>
						<tbody>
						<tr className="title-row" key={"title-row"}>
							<td colSpan={10}>主题颜色</td>
						</tr>
						{
							ColorTypes.themeColors.map(function(colors,pos){
								var firstRow = pos==0;
								return (<tr key={pos} className={firstRow?"first-row":""}>
											{
												colors.map(function(color,index){
													return (<td key={index}>
															<a className="color-anchor"  data-color={color} style={{"backgroundColor":color}} onClick={handleSelectColor}></a>
													</td>)
												})
											}
										</tr>)
							})
						}
						<tr className="title-row" key={"title-row2"}>
							<td colSpan={10}>标准颜色</td>
						</tr>	
						<tr className="last-row" key={"last-row"}>
						{
							ColorTypes.standardColors.map(function(color,pos){
									return (<td key={pos}>
											<a className="color-anchor"  data-color={color} style={{"backgroundColor":color}} onClick={handleSelectColor}></a>
									</td>)
							})		  
						}
						</tr>
						</tbody>
					</table>
			</Dropdown>)
		}
	}
}