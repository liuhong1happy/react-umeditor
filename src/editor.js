var React = require('react');
var ReactDOM = require('react-dom');
var { 
	EditorIconTypes
} = require('./constants/EditorConstants');

var EditorHistory = require('./utils/EditorHistory');
var EditorSelection = require('./utils/EditorSelection');

var ColorDropdown = require('./components/ColorDropdown.react');
var ImageDialog = require('./components/ImageDialog.react');

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

var EditorToolbar = React.createClass({
	getInitialState:function(){
		// paragraph fontfamily fontsize formula emotion video map print preview drafts link unlink
		return {
			icons:[
				"source | undo redo | bold italic underline strikethrough | superscript subscript | ",
				"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
				"cleardoc  | justifyleft justifycenter justifyright | horizontal | image"
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
				returnArray[i].color = editorState.icons[_icons[i]].color;
			}
			returnArray[i].showHtml = !! editorState.showHtml;
		}
		return returnArray;
	},
	render:function(){
		var icons = this.getIcons();
		return (<div className="editor-toolbar">{
					icons.map(function(icon,pos){
						var props = icon;
						return(<EditorIcon key={pos} {...props} />)
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
		if(this.props.onRangeChange) 
			this.props.onRangeChange(e);
		window.removeEventListener("mouseup",this.handleMouseUp);
	},
	render:function(){
		return (<div ref="root" className="editor-contenteditable-div" 
				onMouseUp={this.handleMouseUp} 
				onMouseDown={this.handleMouseDown}
				contentEditable={true} dangerouslySetInnerHTML={{__html:this.state.content}}></div>)
	}
})
		
// key down context
var saveSceneTimer = null;
var maxInputCount = 20;
var lastKeyCode = null;
var keycont = 0;
		
// resize context
var minWidth = 12;
var minHeight = 12;
var EditorResize = React.createClass({
	getInitialState:function(){
		return {
			target:null,
			position:{
				x:0,y:0
			},
			width:0,
			height:0,
			startPosition:{
				x:0,y:0
			},
			curPosition:{
				x:0,y:0
			}
		}	
	},
	setTarget:function(target){
		var width =parseFloat(target.width || target.style.width);
		var height = parseFloat(target.height || target.style.height);
		var offsetLeft = target.offsetLeft+target.offsetParent.offsetLeft;
		var offsetTop = target.offsetTop+target.offsetParent.offsetTop;;
		this.setState({
			target:target,
			width:width,
			height:height,
			show:true,
			position:{x:offsetLeft,y:offsetTop}
		})
	},
	getTarget:function(){
		return this.state.target;
	},
	clearTarget:function(){
		this.setState({
			target:null,
			show:false
		})
	},
	stopPropagation:function(e){
		  if(e.stopPropagation)
				e.stopPropagation();
		  else
				e.cancelBubble = true;
	},
	clearSelect:function(e){
		if(window.getSelection){
				window.getSelection().removeAllRanges();
		}else{
			document.selection.empty();
		}
	},
	getMousePosition:function(e){
		e = e || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;

		var x = parseFloat(e.pageX || e.clientX +scrollX);
		var y = parseFloat(e.pageY || e.clientY +scrollY);
		return {x:x,y:y};
	},
	handleMouseDown:function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var className = target.className;
		var startPosition = this.getMousePosition(e);
		if(className.indexOf("nw-resize")!=-1){
			this.setState({
				direction:"nw-resize",
				startPosition:startPosition
			})
		}
		if(className.indexOf("ne-resize")!=-1){
			this.setState({
				direction:"ne-resize",
				startPosition:startPosition
			})
		}
		if(className.indexOf("sw-resize")!=-1){
			this.setState({
				direction:"sw-resize",
				startPosition:startPosition
			})
		}
		if(className.indexOf("se-resize")!=-1){
			this.setState({
				direction:"se-resize",
				startPosition:startPosition
			})
		}
		window.removeEventListener("mouseup",this.onMouseUp);
		window.removeEventListener("mousemove",this.onMouseMove);
		window.addEventListener("mouseup",this.onMouseUp);
		window.addEventListener("mousemove",this.onMouseMove);
		this.clearSelect();
		this.stopPropagation(e);
	},
	handleMouseMove:function(e){
		if(!this.state.direction) return;
		this.clearSelect();
		e = e || event;
		var target = e.target || e.srcElement;
		var curPosition = this.getMousePosition(e);
		var  startPosition = this.state.startPosition;
		var dx = curPosition.x-startPosition.x;
		var dy = curPosition.y-startPosition.y;
		var width = this.state.width;
		var height = this.state.height;
		
		switch(this.state.direction){
			case "nw-resize":
				width -= dx;
				height -= dy;
				break;
			case "ne-resize":
				width += dx;
				height -= dy;
				break;
			case "sw-resize":
				width -= dx;
				height += dy;
				break;
			case "se-resize":
				width += dx;
				height += dy;
				break;
		}
		startPosition = curPosition;
		if(width<minWidth) width = minWidth;
		if(height<minHeight) height = minHeight;

		this.setState({
			startPosition:startPosition,
			width:width,
			height:height
		})
		this.state.target.width = width;
		this.state.target.hegiht = height;
		this.stopPropagation(e);
	},
	handleMouseUp:function(e){
		if(!this.state.direction) return;
		this.clearSelect();
		e = e || event;
		var target = e.target || e.srcElement;
		var curPosition = this.getMousePosition(e);
		var  startPosition = this.state.startPosition;
		var dx = curPosition.x-startPosition.x;
		var dy = curPosition.y-startPosition.y;
		var width = this.state.width;
		var height = this.state.height;
		
		switch(this.state.direction){
			case "nw-resize":
				width -= dx;
				height -= dy;
				break;
			case "ne-resize":
				width += dx;
				height -= dy;
				break;
			case "sw-resize":
				width -= dx;
				height += dy;
				break;
			case "se-resize":
				width += dx;
				height += dy;
				break;
		}
		startPosition = curPosition;
		
		if(width<minWidth) width = minWidth;
		if(height<minHeight) height = minHeight;
		
		window.removeEventListener("mouseup",this.onMouseUp);
		window.removeEventListener("mousemove",this.onMouseMove);
		
		this.setState({
			startPosition:startPosition,
			height:height,
			width:width,
			direction:null
		})
		this.state.target.width = width;
		this.state.target.hegiht = height;
		this.stopPropagation(e);
	},
	render:function(){
		var style = {
			width:this.state.width,
			height:this.state.height,
			left:this.state.position.x,
			top:this.state.position.y,
			display:this.state.show?"block":"none",
			positoin:"absolute"
		};		
		return (<div className="editor-resize" style={style}>
				<div className="block-resize nw-resize" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
				<div className="block-resize ne-resize" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
				<div className="block-resize sw-resize" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
				<div className="block-resize se-resize" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
		</div>)
	}
})		


/**
* 对外接口方法
* @findDOMNode: 获取"root","textarea","toolbar","color"的ref对象以及相应的dom对象
* @setContent: 设置html格式数据
* @getContent: 获取html格式数据
**/
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
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		var isCollapsed = true;
    	editarea.addEventListener('keydown', this.handleKeyDown);
    	editarea.addEventListener('keyup', this.handleKeyUp);
	},
	autoSave:function(){
		EditorHistory.execCommand('autosave',false,null);
		this.handleRangeChange();
	},
	handleKeyDown:function(evt){
        var keyCode = evt.keyCode || evt.which;
		var autoSave = this.autoSave;
        if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
            if (EditorHistory.getCommandStack().length == 0) {
                autoSave();
				keycont = 0;
            }
            clearTimeout(saveSceneTimer);
            saveSceneTimer = setTimeout(function(){
				var interalTimer = setInterval(function(){
					autoSave();
					keycont = 0;
					clearInterval(interalTimer)
				},300)
            },200);
            lastKeyCode = keyCode;
            keycont++;
            if (keycont >= maxInputCount ) {
                autoSave();
				keycont = 0;
            }
        }
	},
	handleKeyUp:function(evt){
        var keyCode = evt.keyCode || evt.which;
        if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
			// some handle
        }
	},
	componentDidUpdate:function(){
		var editorState = this.state.editorState;
		switch(editorState.icon){
			case "source":
				this.refs.editarea.setContent(editorState.content)
				break;
			case "cleardoc":
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
			if(!editorState.icons[icon]) 
				editorState.icons[icon] = rangeState[icon];
			else {
				switch(icon){
					case "forecolor":
					case "backcolor":
						editorState.icons[icon].color = rangeState[icon].color;
						break;
				}
				editorState.icons[icon].active = rangeState[icon].active;
			}
		}
		return editorState;
	},
	handleRangeChange:function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var selection = EditorSelection.getSelection();
		
		if(selection && selection.rangeCount>0){
			var editorState = this.state.editorState;
			editorState = this.exchangeRangeState(editorState);
			this.setState({
				editorState:editorState
			})
			this.refs.resize.clearTarget();
		}else{
			var tagName = target.tagName.toUpperCase();
			switch(tagName){
				case "IMG":
					this.refs.resize.setTarget(target);
					break;
			}
		}
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
		
		var handleRangeChange = this.handleRangeChange;
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
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
			case "removeformat":
			case "insertorderedlist":
			case "insertunorderedlist":
			case "selectall":
			case "justifyleft":
			case "justifyright":
			case "justifycenter":
				EditorHistory.execCommand(state.icon,false,null);
				break;
			case "forecolor":
				offsetPosition.y += offsetPosition.h+5;
				this.refs.color.open(offsetPosition,function(e,color){
					EditorHistory.execCommand('forecolor',false,color);
					handleRangeChange();
				});
				break;
			case "backcolor":
				offsetPosition.y += offsetPosition.h+5;
				this.refs.color.open(offsetPosition,function(e,color){
					EditorHistory.execCommand('backcolor',false,color);
					handleRangeChange();
				});
				break;
			case "cleardoc":
				editorState.content = "<p><br/></p>"
				break;
			case "horizontal":
				EditorHistory.execCommand('inserthtml',false,"<hr/><p><br/></p>");
				break;
			case "image":
				EditorSelection.storeRange();
				this.refs.image.open(function(e,html){
					editarea.focus();
					EditorSelection.restoreRange();
					
					if(html && html.length>0){
						if(EditorSelection.range){
							EditorHistory.execCommand('inserthtml',false,html);
						}else{
							editarea.innerHTML += html;
						}
					}
				})
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
	findDOMNode:function(refName){
		// 对外公布方法
		var keys = [ "root","editarea","toolbar","color"];
		if(keys.indexOf(refName)==-1) 
			return {ref:null,dom:null};
		return {
			ref:this.refs[refName],
			dom:ReactDOM.findDOMNode(this.refs[refName])
	   }
	},
	setContent:function(content){
		// 后续添加校验方法
		this.refs.editarea.setContent(content);
	},
	getContent:function(){
		return this.refs.editarea.getContent();
	},
	render:function(){
		var editArea = this.genEditArea();
		var {onBlur,className,id,...props} = this.props;
		return (<div ref="root" id={id} className={"editor-container editor-default" +(className?" "+className:"")} onBlur={this.handleRangeChange} {...props}>
				<EditorToolbar ref="toolbar" editorState={this.state.editorState} onIconClick={this.handleToolbarIconClick}/>
				{editArea}
				<ColorDropdown ref="color"/>
				<ImageDialog ref="image" />
				<EditorResize ref="resize" />
				</div>)
	}
})

module.exports = Editor;