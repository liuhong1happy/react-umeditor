var React = require('react');
var EditorIcon = require('./EditorIcon.react');
var { 
	EditorIconTypes
} = require('../constants/EditorConstants');
var EditorHistory = require('../utils/EditorHistory');

var EditorToolbar = React.createClass({
	getInitialState:function(){
		// paragraph fontfamily fontsize  emotion video map print preview drafts link unlink
		return {
			icons:[
				"source | undo redo | bold italic underline strikethrough | superscript subscript | ",
				"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
				"cleardoc  | justifyleft justifycenter justifyright | horizontal | image formula | inserttable"
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
					
				}{this.props.children}</div>)
	}
})

module.exports = EditorToolbar;