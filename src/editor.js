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
// combobox
var FontSizeComboBox= require('./components/plugins/FontSizeComboBox.react');
var FontFamilyComboBox = require('./components/plugins/FontFamilyComboBox.react');
var ParagraphComboBox = require('./components/plugins/ParagraphComboBox.react');
// dialog
var EmotionDialog =  require('./components/plugins/EmotionDialog.react');
var SpecialCharsDialog = require('./components/plugins/SpecialCharsDialog.react');
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

if(!Date.prototype.Format){
	Date.prototype.Format = function(n) {
		var i = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			S: this.getMilliseconds()
		}, t;
		/(y+)/.test(n) && (n = n.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
		for (t in i) new RegExp("(" + t + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? i[t] : ("00" + i[t]).substr(("" + i[t]).length)));
		return n
};
}

/**
* 对外接口方法
* @findDOMNode: 获取"root","editarea","toolbar","color"的ref对象以及相应的dom对象
* @setContent: 设置html格式数据
* @getContent: 获取html格式数据
* @onFocus: 监听focus事件
* @focusEditor: 聚焦到Editor上
* @defaultValue: 默认内容
* @value: 编辑器的值
* @icons: 工具条上需要显示的图标
**/


var Editor = React.createClass({
    // init & update
	getInitialState:function(){
		return {
			editorState:{
				showHtml:false,
				icons:{
					"forecolor":{color: 'transparent', icon:"forecolor"},
					"backcolor":{color: 'transparent', icon:"backcolor"},
					"fontsize": {value: "3", icon:"fontsize"},
					"paragraph":  {value: "p", icon:"fontsize"},
					"fontfamily": {value: "宋体, SimSun", icon:"fontfamily"},
					"indent": { active:false,icon:"indent"},
					"outdent": { active:true,icon:"outdent"}
				}
			},
			defaultValue:this.props.defaultValue?this.props.defaultValue:"<p>This is an Editor</p>",
			value:this.props.value
		}
	},
	propTypes:{
		"plugins": React.PropTypes.object,
		"fontFamily": React.PropTypes.array,
		"fontSize": React.PropTypes.array,
		"paragraph": React.PropTypes.array,
	},
	getDefaultProps:function(){
		return {
			"plugins":{
				"image":{
					"uploader":{
						name:"file",
						url:"/upload"
					},
					"customUploader":null
				}
			},
			"fontFamily":[
				{"name":"宋体",value:"宋体, SimSun",defualt:true},
				{"name":"隶书",value:"隶书, SimLi"},
				{"name":"楷体",value:"楷体, SimKai"},
				{"name":"微软雅黑",value:"微软雅黑, Microsoft YaHei"},
				{"name":"黑体",value:"黑体, SimHei"},
				{"name":"arial",value:"arial, helvetica, sans-serif"},
				{"name":"arial black",value:"arial black, avant garde"},
				{"name":"omic sans ms",value:"omic sans ms"},
				{"name":"impact",value:"impact, chicago"},
				{"name":"times new roman",value:"times new roman"},
				{"name":"andale mono",value:"andale mono"}
			],
			"fontSize": [
				{"name":"10px",value:"1"},
				{"name":"12px",value:"2"},
				{"name":"16px",value:"3",defualt:true},
				{"name":"18px",value:"4"},
				{"name":"24px",value:"5"},
				{"name":"32px",value:"6"},
				{"name":"38px",value:"7"}
			],
			"paragraph": [
				{"name":"段落",value:"p",defualt:true},
				{"name":"标题1",value:"h1"},
				{"name":"标题2",value:"h2"},
				{"name":"标题3",value:"h3"},
				{"name":"标题4",value:"h4"},
				{"name":"标题5",value:"h5"},
				{"name":"标题6",value:"h6"}
			],
			"icons":[
				// video map print preview drafts link unlink
				"source | undo redo | bold italic underline strikethrough fontborder | ",
				"paragraph fontfamily fontsize | superscript subscript | ",
				"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
				"cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
				"horizontal date time  | image emotion formula spechars | inserttable"
			]
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
	componentWillUnmont:function(){
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
    	editarea.removeEventListener('keydown', this.handleKeyDown);
    	editarea.removeEventListener('keyup', this.handleKeyUp);
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
		EditorDOM.stopPropagation(evt);
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
		EditorDOM.stopPropagation(evt);
	},
	handleFocus:function(e){
		if(this.props.onFocus){
			this.props.onFocus(e,this.findDOMNode('root'));
		}
		EditorDOM.stopPropagation(e);
	},
	handleClick:function(e){
		EditorDOM.stopPropagation(e);
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
					case "paragraph":
					case "fontfamily":
					case "fontsize":
						editorState.icons[icon].value = rangeState[icon].value;
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
		EditorSelection.cloneRange();
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
			case "removeformat":
                EditorHistory.execCommand(state.icon,false,null);
				EditorSelection.storeRange();
				var spanNodes = EditorSelection.getSpanNodes();
				for(var i=0;i<spanNodes.length;i++){
					switch(spanNodes[i].className){
						case "font-border":
							var spanNode = spanNodes[i];
							var parentNode = spanNode.parentNode;
							var nextSibling = spanNode.nextSibling;
							
							for(var c=0;c<spanNode.childNodes.length;c++){
								parentNode.insertBefore(spanNode.childNodes[c].cloneNode(),nextSibling);
							}
							parentNode.removeChild(spanNodes[i]);
							break;
					}
				}
				EditorSelection.restoreRange();
				break;
			case "bold":
			case "italic":
			case "underline":
			case "strikethrough":
			case "subscript":
			case "superscript":
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
				EditorHistory.execCommand(state.icon,false,null);
				EditorSelection.restoreRange();
				break;
			case "fontborder":
				var textNodes = EditorSelection.getTextNodes();
				var startNode = null,endNode = null,startOffset=0,endOffset=0;
				for(var i=0;i<textNodes.length;i++){
					// 获取
					var node = textNodes[i].childNode;
					var start = textNodes[i].startOffset;
					var end = textNodes[i].endOffset;
					// 拷贝
					var cloneNode = node.cloneNode();
					var startText = cloneNode.nodeValue.substring(0,start);
					var endText = cloneNode.nodeValue.substring(end,cloneNode.length);
					var borderText = cloneNode.nodeValue.substring(start,end);
					var span = null;
					var textParentNode = textNodes[i].childNode.parentNode;
					if( textParentNode && textParentNode.className && textParentNode.className=="font-border"){
						if(i==0){
							startNode = textNodes[i].childNode;
							startOffset = start;
						}
						if(i==textNodes.length-1) {
							endNode = textNodes[i].childNode;
							endOffset = end;
						}
					}else{
						// 重新赋值
						node.nodeValue = startText;
						span = document.createElement("span");
						span.className = "font-border";
						span.innerHTML = borderText;
						span.style.border = "1px solid #000";
						node.parentNode.insertBefore(span, node.nextSibling);
						if(endText!=""){
							node.parentNode.insertBefore(document.createTextNode(endText), span.nextSibling);
						}
						if(i==0) startNode = span.childNodes[0];
						if(i==textNodes.length-1) {
							endNode = span.childNodes[0];
							endOffset = span.childNodes[0].length;
						}
					}
				}
				EditorSelection.addRange(startNode,startOffset,endNode,endOffset);
				// 合并相同font-border元素
				var spanNodes = EditorSelection.getSpanNodes();
				for(var i=0;i<spanNodes.length-1;i++){
					var spanNode = spanNodes[i];
					var parentNode = spanNodes[i].parentNode;
					
					if(EditorDOM.isNullOfTextNode(spanNode.nextSibling)){
						// 移除空元素
						parentNode.removeChild(spanNode.nextSibling);
					}
					if(spanNode.nextSibling===spanNodes[i+1]){
						var nextSiblingChildNodes = spanNodes[i+1].childNodes;
						for(var c=0;c<nextSiblingChildNodes.length;c++){
							spanNode.appendChild(nextSiblingChildNodes[c].cloneNode());
						}
						// 移除老元素
						parentNode.removeChild(spanNodes[i+1]);
						// 删除过后，重新指向
						spanNodes[i+1] = spanNodes[i];
					}
				}
				EditorHistory.execCommand(state.icon,false,null);
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
			case "fontsize":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h+5;
				
				this.refs.fontsize.open(offsetPosition,function(e,fontsize){
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('fontsize',false,fontsize);
					handleRangeChange();
				});
				break;
			case "fontfamily":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h+5;
				
				this.refs.fontfamily.open(offsetPosition,function(e,fontfamily){
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('fontname',false,fontfamily);
					handleRangeChange();
				});
				break;
			case "paragraph":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h+5;
				
				this.refs.paragraph.open(offsetPosition,function(e,paragraph){
					editarea.focus();
					EditorSelection.restoreRange();
					var paragraphs = EditorSelection.getParagraphs();
					for(var i=0;i<paragraphs.length;i++){
						switch(paragraphs[i].tagName.toUpperCase()){
							case "TD":
							case "TH":
							case "DIV":
								var childNodes = paragraphs[i].childNodes;
								var paraElement = document.createElement(paragraph);
								for(var j=0;j<childNodes.length;j++){
									paraElement.appendChild(childNodes[j]);
								}
								paragraphs[i].appendChild(paraElement);
								break;
							case "P":
							case "H1":
							case "H2":
							case "H3":
							case "H4":
							case "H5":
							case "H6":
								var parentElement = paragraphs[i];
								var childNodes = paragraphs[i].childNodes;
								var paraElement = document.createElement(paragraph);
								var parentNode = parentElement.parentNode;
								parentNode.insertBefore(paraElement, parentElement.nextSibling);
								for(var j=0;j<childNodes.length;j++){
									paraElement.appendChild(childNodes[j]);
								}
								parentNode.removeChild(parentElement);
								break;
							default:
								break;
						}
					}
					EditorHistory.execCommand('paragraph',false,paragraph);
					handleRangeChange();
				});
				break;
			case "cleardoc":
				editorState.content = "<p><br/></p>"
				break;
			case "horizontal":
				EditorHistory.execCommand('inserthtml',false,"<hr/><p><br/></p>");
				break;
			case "date":
				var strDate = new Date().Format("yyyy-MM-dd");
				EditorHistory.execCommand('inserthtml',false, strDate);
				break;
			case "time":
				var strTime = new Date().Format('hh:mm:ss')
				EditorHistory.execCommand('inserthtml',false,strTime);
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
			case "spechars":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h+5;
                offsetPosition.x -= offsetPosition.w/2;
				this.refs.special.open(offsetPosition,function(e,char){
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('inserthtml',false,char);
					handleRangeChange();
				});
				break;
			case "emotion":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h+5;
				this.refs.emotion.open(offsetPosition,function(e,html){
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
		EditorDOM.stopPropagation(e);
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
		var {onBlur,className,id,onFocus,onClick,...props} = this.props;
		var editorState = this.state.editorState;
		var {fontSize,paragraph,fontFamily,icons} = this.props;
		var _icons = icons.join(" ").replace(/\|/gm,"separator").split(" ");
		return (<div ref="root" id={id} className={"editor-container editor-default" +(className?" "+className:"")} onClick={this.handleClick} onBlur={this.handleRangeChange}  onFocus={this.handleFocus} {...props}>
				<EditorToolbar ref="toolbar" editorState={editorState} onIconClick={this.handleToolbarIconClick} icons={this.props.icons} paragraph={this.props.paragraph}  fontsize={this.props.fontSize}  fontfamily={this.props.fontFamily}>
					<ImageDialog hidden={_icons.indexOf("image")==-1} ref="image" uploader={this.props.plugins.image.uploader} customUploader={this.props.plugins.image.customUploader}/>
					<ColorDropdown hidden={_icons.indexOf("forecolor")==-1 &&_icons.indexOf("forecolor")}   ref="color" />
					<FormulaDropdown hidden={ _icons.indexOf("formula")==-1} ref="formula"/>
					<TablePickerDropdown hidden={_icons.indexOf("inserttable")==-1} ref="table" />
					<SpecialCharsDialog hidden={ _icons.indexOf("spechars")==-1} ref="special" />
					<EmotionDialog hidden={ _icons.indexOf("emotion")==-1} ref="emotion" />
					<FontSizeComboBox hidden={ _icons.indexOf("fontsize") ==-1} ref="fontsize" fontsize={this.props.fontSize} value={editorState.icons["fontsize"]?editorState.icons["fontsize"].value: fontSize[0].value}/>
					<FontFamilyComboBox hidden={ _icons.indexOf("fontfamily") ==-1 } ref="fontfamily" fontfamily={this.props.fontFamily} value={editorState.icons["fontfamily"]?editorState.icons["fontfamily"].value: fontFamily[0].value}/>
					<ParagraphComboBox hidden={_icons.indexOf("paragraph") ==-1 } ref="paragraph" paragraph={this.props.paragraph} value={editorState.icons["paragraph"]?editorState.icons["paragraph"].value: paragraph[0].value}/>
				</EditorToolbar>
				{editArea}
				<EditorResize ref="resize" />
				</div>)
	}
})

module.exports = Editor;