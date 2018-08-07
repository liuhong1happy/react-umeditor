import React from 'react';
import TabGroup from '../base/TabGroup';
import Dialog from '../base/Dialog';

import { SpecialChars } from '../../constants/EditorConstants';

class SCChars extends React.Component{
	handleClick(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var char = target.getAttribute("data-char");
		var id = 'char-'+new Date().valueOf();
		if(this.props.onSelectChar){
			this.props.onSelectChar(e,char);
		}
	}
	render(){
		var chars = this.props.chars;
		var handleClick = this.handleClick.bind(this);
		return (<ul className={"special-chars "+this.props.name} >
			{
				chars.map(function(ele,pos){
					return (<li className="special-char" key={pos} data-char={ele} onClick={handleClick}>{ele}</li>)
				})
			}
		</ul>)
	}
}

export default class SpecialCharsDialog extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			handle:function(){}
		}
	}
	open(handle){
		this.setState({
			handle:handle
		})
		this.refs.root.open();
	}
	close(){
		if(this.refs.root) this.refs.root.close();
	}
	toggle(handle){
		this.setState({
			handle:handle
		})
		this.refs.root.toggle();
	}
	handleSelectChar(e,char){
		e = e || event;
		if(this.state.handle){
			this.state.handle(char);
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
		var tabs = [];
		for(var i=0;i<SpecialChars.length;i++){
			tabs.push({
				title:SpecialChars[i].title,
				chars:SpecialChars[i].chars,
				component:(<SCChars chars={SpecialChars[i].chars} name="common-chars" onSelectChar={this.handleSelectChar.bind(this)} />)
			})
		}
		var buttons = [];
		if(this.props.hidden){
			return (<div></div>)
		}else{
			return (<Dialog ref="root" className="special-chars-dialog" width={700} height={508} title="特殊字符" buttons={buttons} onClose={this.close.bind(this)}>
				<TabGroup tabs={tabs} />
			</Dialog>)
		}
	}
}
		
module.exports = SpecialCharsDialog;