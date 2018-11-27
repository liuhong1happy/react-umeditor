import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

/**
* @icon: 图标名称 string
* @disabled: 是否禁用 bool
* @onClick: 暴露点击事件 function
* @title: 提示 string
* @active: 是否选中 bool
* @showHtml: 是否当前是显示html属性
* @color: 前景色和背景色
**/
export default class EditorIcon extends Component{
	componentDidMount(){
		this.updateStyle();
	}
	componentDidUpdate(){
		this.updateStyle();
	}
	updateStyle(){
		let root = ReactDOM.findDOMNode(this.refs.root);
		let icon = this.props.icon;
		switch(this.props.icon){
			case "forecolor":
			case "backcolor":
				let color = this.props.color?this.props.color:"transparent";
				root.id = icon+"_"+new Date().valueOf();
				let style = root.childElementCount>0? root.children[0]: document.createElement('style');
				style.innerHTML = ".icon-"+icon+"#"+root.id+":before{content:'';border-bottom:3px solid "+color+";}";
				if(root.childElementCount==0) 
					root.appendChild(style);
				break;
		}
	}
	handleClick =(e)=>{
		e = e || event;
		let target = e.target || e.srcElement;
		while(target.className.indexOf("editor-icon")==-1){
			target = target.parentElement;
		}
		e.target = target;
		
		let { onClick, ...props} = this.props;
		if(this.props.onClick){
			this.props.onClick(e,{...props})
		}
	}
	render(){
		let { icon, active, disabled, showHtml, onClick, className, ...props } = this.props;
		let _disabled = showHtml && (icon!="source" && icon!="separator");
		let _className = className || "editor-icon icon-" + icon;
		if(icon=="fontsize" || icon=="fontfamily" || icon == "paragraph"){
			return (<span ref="root" className={classNames(_className, { active, disabled: disabled || _disabled})} onClick={this.handleClick} {...props}> 
				<span className="icon-label">{props.name}</span>
				<span className="icon-caret"/>
				</span>)
		}else{
			return (<span ref="root" className={classNames(_className, { active, disabled: disabled || _disabled})} onClick={this.handleClick} {...props}></span>)
		}
	}
}