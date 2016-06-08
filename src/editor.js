var React = require('react');
var ReactDOM = require('react-dom');
var { 
	EditorIconTypes
} = require('./constants/EditorConstants');

// utlils
var EditorHistory = require('./utils/EditorHistory');
var EditorSelection = require('./utils/EditorSelection');
var EditorDOM = require('./utils/EditorDOM');
var EditorResize = require('./utils/EditorResize.react');
var EditorTimer = require('./utils/EditorTimer')
// dialog & dropdown
var ColorDropdown = require('./components/plugins/ColorDropdown.react');
var FormulaDropdown = require('./components/plugins/FormulaDropdown.react');
var TablePickerDropdown = require('./components/plugins/TablePickerDropdown.react');
var ImageDialog = require('./components/plugins/ImageDialog.react');

// base components
var EditorToolbar = require('./components/core/EditorToolbar.react');
var EditorTextArea = require('./components/core/EditorTextArea.react');
var EditorContentEditableDiv = require('./components/core/EditorContentEditableDiv.react');

// 需要外部引用MathQuill
var MQ = MathQuill.getInterface(2);

// key down context
var saveSceneTimer = null;
var maxInputCount = 20;
var lastKeyCode = null;
var keycont = 0;
		
/**
* 对外接口方法
* @findDOMNode: 获取"root","editarea","toolbar","color"的ref对象以及相应的dom对象
* @setContent: 设置html格式数据
* @getContent: 获取html格式数据
* @onFocus: 监听focus事件
* @focusEditor: 聚焦到Editor上
* @defaultValue: 默认内容
* @value: 编辑器的值
**/

var Editor = React.createClass({
    // init & update
	getInitialState:function(){
		return {
			editorState:{
				showHtml:false,
				icons:{}
			},
			defaultValue:this.props.defaultValue?this.props.defaultValue:"<p>This is an Editor</p>",
			value:this.props.value
		}
	},
	propTypes:{
		"plugins":React.PropTypes.object
	},
	getDefaultProps:function(){
		return {
			"plugins":{
				"image":{
					"uploader":{
						name:"file",
						url:"/upload"
					}
				}
			}
		}
	},
	componentDidMount:function(){
		EditorHistory.clear();
		this.setContent(this.state.value?this.state.value:this.state.defaultValue);
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		var isCollapsed = true;
    	editarea.addEventListener('keydown', this.handleKeyDown);
    	editarea.addEventListener('keyup', this.handleKeyUp);
	},
	componentWillReceiveProps:function(nextProps){
		// update value
		if(this.props.value!=nextProps.value){
			this.setContent(nextProps.value?nextProps.value:nextProps.defaultValue);
		}
	},
	componentDidUpdate:function(){
		var editorState = this.state.editorState;
		switch(editorState.icon){
			case "source":
				this.setContent(editorState.content)
				break;
			case "cleardoc":
				this.setContent(editorState.content)
				break;
		}
	},
    // event handler
	handleKeyDown:function(evt){
		evt = evt || event;
		var target = evt.target || evt.srcElement;
		if(target.className && target.className.indexOf('editor-contenteditable-div')!=-1){
			var keyCode = evt.keyCode || evt.which;
			var autoSave = this.autoSave;
			if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
				if (EditorHistory.getCommandStack().length == 0) {
					autoSave();
					keycont = 0;
				}
				clearTimeout(saveSceneTimer);
				saveSceneTimer = EditorTimer.setTimeout(function(){
					var interalTimer = EditorTimer.setInterval(function(){
						autoSave();
						keycont = 0;
						EditorTimer.clearInterval(interalTimer)
					},300)
				},200);
				lastKeyCode = keyCode;
				keycont++;
				if (keycont >= maxInputCount ) {
					autoSave();
					keycont = 0;
				}
			}
		}
	},
	handleKeyUp:function(evt){
		evt = evt || event;
		var target = evt.target || evt.srcElement;
		if(target.className && target.className.indexOf('editor-contenteditable-div')!=-1){
			var keyCode = evt.keyCode || evt.which;
			if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
				// some handle
			}
		}
	},
	handleFocus:function(e){
		if(this.props.onFocus){
			this.props.onFocus(e,this.findDOMNode('root'));
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
		if(e && e.type=="blur") return;
		var target = e?e.target || e.srcElement:null;
		var selection = EditorSelection.getSelection();
		if(selection && selection.rangeCount>0){
			var editorState = this.state.editorState;
			editorState = this.exchangeRangeState(editorState);
			this.setState({
				editorState:editorState
			})
			this.refs.resize.clearTarget();
		}else if(target){
			var tagName = target.tagName.toUpperCase();
			switch(tagName){
				case "IMG":
					this.refs.resize.setTarget(target);
					break;
			}
		}
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
			case "indent":
			case "outdent":
				EditorHistory.execCommand(state.icon,false,null);
				break;
			case "touppercase":
			case "tolowercase":
				EditorSelection.storeRange();
				var textNodes = EditorSelection.getTextNodes();
				for(var i=0;i<textNodes.length;i++){
					var node = textNodes[i].childNode;
					var start = textNodes[i].startOffset;
					var end = textNodes[i].endOffset;
					node.nodeValue = node.nodeValue.substring(0,start) + 
							( state.icon=="touppercase"?node.nodeValue.substring(start,end).toUpperCase():node.nodeValue.substring(start,end).toLowerCase() ) + 
							node.nodeValue.substring(end,node.length);
				}
				EditorSelection.restoreRange();
				break;
			case "forecolor":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h+5;
				this.refs.color.open(offsetPosition,function(e,color){
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('forecolor',false,color);
					handleRangeChange();
				});
				break;
			case "backcolor":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h+5;
				
				this.refs.color.open(offsetPosition,function(e,color){
					editarea.focus();
					EditorSelection.restoreRange();
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
			case "formula":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h+5;
				offsetPosition.x -= offsetPosition.w/2;
				var _self = this;
				this.refs.formula.open(offsetPosition,function(e,latex,id){
					editarea.focus();
					EditorSelection.restoreRange();
					
					if(latex && latex.length>0){
						var html = '<p>&nbsp;<span class="mathquill-embedded-latex" id="'+id+'"></span>&nbsp;</p>';
						if(EditorSelection.range){
							EditorHistory.execCommand('inserthtml',false,html);
						}else{
							editarea.innerHTML += html;
						}
						EditorTimer.setTimeout(function(){
							 _self.addFormula(id,latex);
						},200);
						handleRangeChange();
					}
				})
				break;
            case "inserttable":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h+5;
                offsetPosition.x -= offsetPosition.w/2;
				this.refs.table.open(offsetPosition,function(e,html){
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('inserthtml',false,html);
					handleRangeChange();
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
    // utils
	getOffsetRootParentPosition:function(target){
		var position = {x:0,y:0,w:0,h:0}
		var root = ReactDOM.findDOMNode(this.refs.root);
		position.w = target.offsetWidth;
		position.h = target.offsetHeight;
		position.x = target.offsetLeft;
		position.y = target.offsetTop;
		var offsetParent = target.offsetParent;
		while(offsetParent && offsetParent!=root){
			 position.x+= offsetParent.offsetLeft;
			 position.y+=offsetParent.offsetTop;
			 offsetParent = offsetParent.offsetParent;
		}
		return position;
	},
	addFormula:function(id,latex){
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		var htmlElement = document.getElementById(id);
		var config = {
		  handlers: { edit: function(){ } },
		  restrictMismatchedBrackets: true
		};
		var mathField = MQ.MathField(htmlElement, config);
		mathField.latex(latex); 
		var $htmlElement = $(htmlElement);
		$htmlElement.keydown(function(e){
			mathField.focus();
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.keyup(function(e){
			mathField.focus();
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.mouseup(function(e){
			mathField.focus();
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.mousedown(function(e){
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.mousemove(function(e){
			EditorDOM.stopPropagation(e);
		});
		$(editarea).mousedown(function(e){
			mathField.blur();
			EditorDOM.stopPropagation(e);
		})
		$(editarea).mousemove(function(e){
			EditorDOM.stopPropagation(e);
		})
	},
	autoSave:function(){
		EditorHistory.execCommand('autosave',false,null);
	},
    // public functions
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
		// mathquill supports
		if(content.indexOf("mathquill-embedded-latex")!=-1){
			var _self = this;
			EditorTimer.setTimeout(function(){
				var editarea = ReactDOM.findDOMNode(_self.refs.editarea);
				var elements = editarea.querySelectorAll('.mathquill-embedded-latex');
				for(var i=0;i<elements.length;i++){
					if(!elements[i].id){
						  var id = "mathquill-"+i+"-"+new Date().valueOf();
						  var latex = elements[i].innerHTML;
						  elements[i].id = id;
						  _self.addFormula(id,latex);
					}
				}
			},200);
		}
	},
	getContent:function(){
		return this.refs.editarea.getContent();
	},
	focusEditor:function(){
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		editarea.focus();
	},
    // render functions  
	genEditArea:function(){
		var showHtml = this.state.editorState.showHtml;
		if(showHtml){
			return (<EditorTextArea ref="editarea" />)
		}else{
			return (<EditorContentEditableDiv ref="editarea" onRangeChange={this.handleRangeChange}/>)		
		}
	},
	render:function(){
		var editArea = this.genEditArea();
		var {onBlur,className,id,onFocus,...props} = this.props;
		return (<div ref="root" id={id} className={"editor-container editor-default" +(className?" "+className:"")} onBlur={this.handleRangeChange}  onFocus={this.handleFocus} {...props}>
				<EditorToolbar ref="toolbar" editorState={this.state.editorState} onIconClick={this.handleToolbarIconClick} icons={this.props.icons}>
					<ImageDialog ref="image" uploader={this.props.plugins.image.uploader} />
					<ColorDropdown ref="color" />
					<FormulaDropdown ref="formula"/>
					<TablePickerDropdown ref="table" />
				</EditorToolbar>
				{editArea}
				<EditorResize ref="resize" />
				</div>)
	}
})

module.exports = Editor;