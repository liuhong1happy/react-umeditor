import React, { Component } from 'react'

import TabGroup from '../base/TabGroup'
import Dropdown from '../base/Dropdown'
import { FormulaTypes } from '../../constants/EditorConstants'

export class FormulaIcons extends Component{
	handleClick(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var latex = target.getAttribute("data-latex");
		var id = 'mathquill-'+new Date().valueOf();
		if(this.props.onSelectFormula){
			this.props.onSelectFormula(e, latex,id);
		}
	}
	render(){
		var icons = this.props.icons;
		var handleClick = this.handleClick.bind(this);
		return (<ul className={"formulas-icons "+this.props.name} >
			{
				icons.map(function(ele,pos){
					return (<li className="latex-icon" key={pos} data-latex={ele.latex} style={{"backgroundPosition": ele.backgroundPosition}} onClick={handleClick}></li>)
				})
			}
		</ul>)
	}
}

export default class FormulaDropdown extends React.Component{
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
	handleSelectFormula(e,latex,id){
		e = e || event;
		if(this.state.handle){
			this.state.handle(latex,id);
		}
		if(e.stopPropagation){
			e.stopPropagation()
		}
		else{
			e.cancelBubble = true;
		}
		this.close();
	}
	render(){
		var tabs = [
			{title:"常用公式",component:(<FormulaIcons icons={FormulaTypes.commonFormulas} name="common-formulas" onSelectFormula={this.handleSelectFormula.bind(this)}/>)},
			{title:"符号",component:(<FormulaIcons icons={FormulaTypes.symbolFormulas} name="symbol-formulas" onSelectFormula={this.handleSelectFormula.bind(this)}/>)},
			{title:"字母",component:(<FormulaIcons icons={FormulaTypes.arabicFormulas} name="arabic-formulas" onSelectFormula={this.handleSelectFormula.bind(this)}/>)}
		]
		if(this.props.hidden){
			return (<div></div>)
		}else{
			return (<Dropdown ref="root" className="formula-dropdown">
					<TabGroup tabs={tabs} />
			</Dropdown>)
		}
	}
}
		
module.exports = FormulaDropdown;