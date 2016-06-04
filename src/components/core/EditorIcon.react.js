var React = require('react');
var ReactDOM = require('react-dom');
/**
* @icon: 图标名称 string
* @disabled: 是否禁用 bool
* @onClick: 暴露点击事件 function
* @title: 提示 string
* @active: 是否选中 bool
* @showHtml: 是否当前是显示html属性
* @color: 前景色和背景色
**/
var EditorIcon = React.createClass({
	componentDidMount:function(){
		this.updateStyle();
	},
	componentDidUpdate:function(){
		this.updateStyle();
	},
	updateStyle:function(){
		var root = ReactDOM.findDOMNode(this.refs.root);
		var icon = this.props.icon;
		switch(this.props.icon){
			case "forecolor":
			case "backcolor":
				var color = this.props.color?this.props.color:"transparent";
				root.id = icon+"_"+new Date().valueOf();
				var style = root.childElementCount>0? root.children[0]: document.createElement('style');
				style.innerHTML = ".icon-"+icon+"#"+root.id+":before{content:'';border-bottom:3px solid "+color+";}";
				if(root.childElementCount==0) 
					root.appendChild(style);
				break;
		}
	},
	handleClick:function(e){
		var {onClick,...props} = this.props;
		if(this.props.onClick){
			this.props.onClick(e,{...props})
		}
	},
	render:function(){
		var {icon,active,disabled,showHtml,onClick,...props} = this.props;
		var _disabled = showHtml && (icon!="source" && icon!="separator");
		return (<span ref="root" className={"editor-icon icon-"+icon+(active?" active":"")+(disabled || _disabled?" disabled":"")} onClick={this.handleClick} {...props}></span>)
	}
})

module.exports = EditorIcon;