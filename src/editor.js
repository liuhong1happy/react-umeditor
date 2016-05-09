var React = require('react');
var { 
	EditorIconTypes
} = require('./constants/EditorConstants');

/**
* @icon: 图标名称 string
* @disabled: 是否禁用 bool
* @onClick: 暴露点击事件 function
* @title: 提示 string
* @active: 是否选中 bool
**/
var EditorIcon = React.createClass({
	render:function(){
		var {icon,...props} = this.props;
		return (<span className={"editor-icon icon-"+icon} {...props}></span>)
	}
})

var EditorToolbar = React.createClass({
	getInitialState:function(){
		return {
			icons:[
				"source | undo redo | bold italic underline strikethrough | superscript subscript | ",
				"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
				"cleardoc | paragraph fontfamily fontsize | justifyleft justifycenter justifyright | link unlink | ",
				"emotion image video | map | horizontal print preview drafts formula"
		    ],
			selection:null
		}
	},
	handleIconClick:function(e,state){
		
	},
	getIcons:function(){
		var icons = this.state.icons;
		var _icons = icons.join(" ").replace(/\|/gm,"separator").split(" ");
		_icons = _icons.filter(function(ico){ return ico!=""});
		var returnArray = [];
		for(var i=0;i<_icons.length;i++){
			returnArray[i]  = EditorIconTypes[_icons[i]];
			returnArray[i].onClick = this.handleIconClick;
			returnArray[i].icon = _icons[i];
		}
		// 加入选中对象的状态
		return returnArray;
	},
	render:function(){
		var icons = this.getIcons();
		
		return (<div className="editor-toolbar">{
					icons.map(function(icon){
						var props = icon;
						return(<EditorIcon {...props} />)
					})
				}</div>)
	}
})
	
var EditorTextArea = React.createClass({
	render:function(){
		return (<textarea className="editor-textarea" value={this.props.content}></textarea>)
	}
})

var EditorContentEditableDiv = React.createClass({
	render:function(){
		return (<div className="editor-contenteditable-div" contentEditable={true} dangerouslySetInnerHTML={{__html:this.props.content}}></div>)
	}
})

var Editor = React.createClass({
	getInitialState:function(){
		return {
			showHtml:false,
			content:"<p>This is an editor!</p>"
		}
	},
	genEditArea:function(){
		var showHtml = this.state.showHtml;
		var content = this.state.content;
		if(showHtml){
			return (<EditorTextArea content={content}/>)
		}else{
			return (<EditorContentEditableDiv content={content} />)		
		}
	},
	render:function(){
		var editArea = this.genEditArea();
		return (<div className="editor-container editor-default">
				<EditorToolbar />
				{editArea}
				</div>)
	}
})

module.exports = Editor;