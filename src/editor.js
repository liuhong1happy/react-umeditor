var React = require('react');
var ReactDOM = require('react-dom');
var { 
	EditorIconTypes
} = require('./constants/EditorConstants');

var EditorHistory = require('./utils/EditorHistory');
var EditorSelection = require('./utils/EditorSelection');

var ColorDropdown = require('./components/ColorDropdown.react');


/**
* @icon: 图标名称 string
* @disabled: 是否禁用 bool
* @onClick: 暴露点击事件 function
* @title: 提示 string
* @active: 是否选中 bool
* @showHtml: 是否当前是显示html属性
**/
var EditorIcon = React.createClass({
	handleClick:function(e){
		var {onClick,...props} = this.props;
		if(this.props.onClick){
			this.props.onClick(e,{...props})
		}
	},
	render:function(){
		var {icon,active,disabled,showHtml,onClick,...props} = this.props;
		var _disabled = showHtml && (icon!="source" && icon!="separator");
		return (<span className={"editor-icon icon-"+icon+(active?" active":"")+(disabled || _disabled?" disabled":"")} onClick={this.handleClick} {...props}></span>)
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
		if(this.props.onIconClick){
			this.props.onIconClick(e,state)
		}
	},
	getIcons:function(){
		var editorState = this.props.editorState;
		editorState.icons["undo"] = { disabled:!EditorHistory.canUndo()}
		editorState.icons["redo"] = { disabled:!EditorHistory.canRedo()}
		
		var icons = this.state.icons;
		var _icons = icons.join(" ").replace(/\|/gm,"separator").split(" ");
		_icons = _icons.filter(function(ico){ return ico!=""});
		var returnArray = [];
		for(var i=0;i<_icons.length;i++){
			returnArray[i]  = EditorIconTypes[_icons[i]];
			returnArray[i].onClick = this.handleIconClick;
			returnArray[i].icon = _icons[i];
			if(editorState.icons[_icons[i]]){
				returnArray[i].disabled = !!editorState.icons[_icons[i]].disabled;
				returnArray[i].active = !!editorState.icons[_icons[i]].active;
			}
			returnArray[i].showHtml = !! editorState.showHtml;
		}
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
	getInitialState:function(){
		return {
			content:""
		}
	},
	getContent:function(){
		var target = ReactDOM.findDOMNode(this.refs.root);
		return target.value;
	},
	setContent:function(content){
		this.setState({
			content:content
		})
	},
	getName:function(){
		return "textarea";
	},
	handleChange:function(){
		var target = ReactDOM.findDOMNode(this.refs.root);
		this.setState({
			content:target.value
		})
	},
	render:function(){
		return (<textarea ref="root" className="editor-textarea" value={this.state.content} onChange={this.handleChange}></textarea>)
	}
})

var EditorContentEditableDiv = React.createClass({
	getInitialState:function(){
		return {
			content:""
		}
	},
	componentDidMount:function(e){
		window.addEventListener("mousedown",this.handleWindowMouseDown);
	},
	componentWillUpdate:function(e){
		EditorSelection.addRange();
	},
	componentDidUpdate:function(e){
		EditorSelection.addRange();
	},
	getContent:function(){
		var target = ReactDOM.findDOMNode(this.refs.root);
		return target.innerHTML;
	},
	setContent:function(content){
		this.setState({
			content:content
		})
	},
	getName:function(){
		return "div";
	},
	handleWindowMouseDown:function(e){
		EditorSelection.clearRange();
	},
	handleMouseDown:function(e){
		EditorSelection.clearRange();
		window.addEventListener("mouseup",this.handleMouseUp);
	},
	handleMouseUp:function(e){
		EditorSelection.createRange();
		if(this.props.onRangeChange) this.props.onRangeChange(e);
		window.removeEventListener("mouseup",this.handleMouseUp);
	},
	render:function(){
		return (<div ref="root" className="editor-contenteditable-div" 
				onMouseUp={this.handleMouseUp} 
				onMouseDown={this.handleMouseDown}
				contentEditable={true} dangerouslySetInnerHTML={{__html:this.state.content}}></div>)
	}
})


		
var Editor = React.createClass({
	getInitialState:function(){
		return {
			editorState:{
				showHtml:false,
				icons:{}
			}
		}
	},
	componentDidMount:function(){
		EditorHistory.clear();
		this.refs.editarea.setContent(this.props.defaultContent?this.props.defaultContent:"<p>This is an Editor</p>");
	},
	componentDidUpdate:function(){
		var editorState = this.state.editorState;
		switch(editorState.icon){
			case "source":
				this.refs.editarea.setContent(editorState.content)
				break;
		}
	},
	genEditArea:function(){
		var showHtml = this.state.editorState.showHtml;
		if(showHtml){
			return (<EditorTextArea ref="editarea"/>)
		}else{
			return (<EditorContentEditableDiv ref="editarea" onRangeChange={this.handleRangeChange}/>)		
		}
	},
	exchangeRangeState:function(editorState){
		var rangeState = EditorSelection.getRangeState();
		for(var icon in rangeState){
			if(!editorState.icons[icon]) editorState.icons[icon] = rangeState[icon];
			else editorState.icons[icon].active = rangeState[icon].active;
		}
		return editorState;
	},
	handleRangeChange:function(){
		var editorState = this.state.editorState;
		editorState = this.exchangeRangeState(editorState);
		this.setState({
			editorState:editorState
		})
	},
	getOffsetRootParentPosition:function(target){
		var position = {x:0,y:0,w:0,h:0}
		var root = ReactDOM.findDOMNode(this.refs.root);
		position.w = target.offsetWidth;
		position.h = target.offsetHeight;
		position.x = target.offsetLeft;
		position.y = target.offsetTop;
		var offsetParent = target.offsetParent;
		while(offsetParent!=root){
			 position.x+= offsetParent.offsetLeft;
			 position.y+=offsetParent.offsetTop;
			 offsetParent = offsetParent.offsetParent;
		}
		return position;
	},
	handleToolbarIconClick:function(e,state){
		e = e || event;
		var target = e.target || e.srcElement;
		var offsetPosition = this.getOffsetRootParentPosition(target);
		
		var editorState = this.state.editorState;
		EditorSelection.addRange();
		switch(state.icon){
			case "source":
				editorState.showHtml = !editorState.showHtml;
				state.active = editorState.showHtml;
				editorState.content = this.refs.editarea.getContent();
				break;
			case "undo":
				EditorHistory.undo();
				break;
			case "redo":
				EditorHistory.redo();
				break;
			case "bold":
			case "italic":
			case "underline":
			case "strikethrough":
			case "subscript":
			case "superscript":
			case "unlink":
				EditorHistory.execCommand(state.icon,false,null);
				break;
			case "link":
				EditorHistory.execCommand(state.icon,true,null);
				break;
			case "forecolor":
				offsetPosition.y += offsetPosition.h+5;
				this.refs.color.open(offsetPosition,function(e,color){
					EditorHistory.execCommand('forecolor',false,color);
				});
				break;
			case "backcolor":
				offsetPosition.y += offsetPosition.h+5;
				this.refs.color.open(offsetPosition,function(e,color){
					EditorHistory.execCommand('backcolor',false,color);
				});
				break;
		}
		// setState
		editorState.icons[state.icon] = state;
		editorState.icon = state.icon;
		EditorSelection.createRange();
		// range state
		editorState = this.exchangeRangeState(editorState);
		this.setState({
			editorState:editorState
		})
		
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
	},
	render:function(){
		var editArea = this.genEditArea();
		return (<div ref="root" className="editor-container editor-default" onBlur={this.handleRangeChange}>
				<EditorToolbar editorState={this.state.editorState} onIconClick={this.handleToolbarIconClick}/>
				{editArea}
				<ColorDropdown ref="color"/>
				</div>)
	}
})

module.exports = Editor;