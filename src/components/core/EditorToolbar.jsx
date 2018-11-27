import React from 'react'
import PropTypes from 'prop-types'

import EditorIcon from './EditorIcon'
import EditorDom from '../../utils/EditorDom'
import { 
	EditorIconTypes
} from '../../constants/EditorConstants'
import EditorHistory from '../../utils/EditorHistory'

export default class EditorToolbar extends React.Component{
	handleIconClick = (e,state) => {
		if(this.props.onIconClick){
			this.props.onIconClick(e,state)
		}
	}
	getNameByValue(arr,value){
		var filterArr = arr.filter(function(ele){
			return ele.value == value;
		})
		if(filterArr.length>0){
			return filterArr[0].name;
		}else{
			return "";
		}
	}
	getIcons(){
		var editorState = this.props.editorState;
		editorState.icons["undo"] = { disabled:!EditorHistory.canUndo()}
		editorState.icons["redo"] = { disabled:!EditorHistory.canRedo()}
		if(editorState.icons["fontsize"]) editorState.icons["fontsize"].name = this.getNameByValue(this.props.fontsize,editorState.icons["fontsize"].value);
		if(editorState.icons["paragraph"]) editorState.icons["paragraph"].name = this.getNameByValue(this.props.paragraph,editorState.icons["paragraph"].value);
		if(editorState.icons["fontfamily"]) editorState.icons["fontfamily"].name = this.getNameByValue(this.props.fontfamily,editorState.icons["fontfamily"].value);
		
		var icons = this.props.icons;
		var customIcons = this.props.customIcons;
		var _icons = icons.join(" ").replace(/\|/gm,"separator").split(" ");
		_icons = _icons.filter(function(ico){ return ico!=""});
		var returnArray = [];
		for(var i=0;i<_icons.length;i++){
			returnArray[i] = EditorIconTypes[_icons[i]] || customIcons.find(cusIcon=> cusIcon.name === _icons[i]) || { title: "自定义按钮" };
			returnArray[i].onClick = this.handleIconClick;
			returnArray[i].icon = _icons[i];
			if(editorState.icons[_icons[i]]){
				returnArray[i].disabled = !!editorState.icons[_icons[i]].disabled;
				returnArray[i].active = !!editorState.icons[_icons[i]].active;
				returnArray[i].color = editorState.icons[_icons[i]].color;
				returnArray[i].value = editorState.icons[_icons[i]].value;
				returnArray[i].name = editorState.icons[_icons[i]].name;
			}
			returnArray[i].showHtml = !! editorState.showHtml;
		}
		return returnArray;
	}
	render(){
		var icons = this.getIcons();
		return (<div className="editor-toolbar" onMouseDown={EditorDom.stopPropagation} onClick={EditorDom.stopPropagation}>
				{
					icons.map(function(icon,pos){
						var props = icon;
						return(<EditorIcon key={pos} {...props} />)
					})
				}
				{
					this.props.children
				}
		</div>)
	}
}

EditorToolbar.propTypes = {
	icons: PropTypes.array
}
EditorToolbar.defaultProps = {
	icons:[]
}