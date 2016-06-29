var EditorDOM = require('./EditorDOM');

NodeList.prototype.toArray = function(){
	var nodes = [];
	for(var i=0;i<this.length;i++){
		nodes.push(this[i]);
	}
	return nodes;
}

var EditorSelection = {
	range:null,
	selection:null,
	storedRange:false,
	getSelection:function(){
		if(window.getSelection) return window.getSelection();
		else if(document.getSelection) return document.getSelection();
		else if(document.selection) return document.selection.createRange();
		else return null;
	},
	cloneRange:function(){ // cloneRange
		if(this.storedRange) return;
		this.selection = this.getSelection();
		this.selection.removeAllRanges();
		if(this.selection && this.range) {
			this.selection.addRange(this.range.cloneRange());
			this.range = this.range.cloneRange();
		}
	},
	getTextNodes:function(){
		if(this.range.collapsed) return [];
		var parent = this.range.commonAncestorContainer;
		var startNode = this.range.startContainer;
		var startOffset = this.range.startOffset;
		var endNode = this.range.endContainer;
		var endOffset = this.range.endOffset;
		var textNodes = [];

		if(startNode===endNode && EditorDOM.isTextNode(startNode)){
			textNodes.push({
				childNode:startNode,
				startOffset:startOffset,
				endOffset:endOffset
			})
		}
		else{
			var childNodes = parent.childNodes.toArray(),startFlag = false;
            var childNode = childNodes.shift();
			while(childNode){
				if(EditorDOM.isTextNode(childNode)){
					if(childNode===startNode){
						textNodes.push({
							childNode:childNode,
							startOffset:startOffset,
							endOffset:childNode.length
						})
                        startFlag = true;
					}
					else if(childNode===endNode){
						textNodes.push({
							childNode:childNode,
							startOffset:0,
							endOffset:endOffset
						})
					}else if(textNodes.length>0){
						textNodes.push({
							childNode:childNode,
							startOffset:0,
							endOffset:childNode.length
						})
					}
				}
				if(childNode==endNode){
					break;
				}
                var newChildNodes = childNode.childNodes.toArray()
                
				childNodes = newChildNodes.concat(childNodes);
				childNode = childNodes.shift();
			}
		}
		return textNodes;
	},
	getSpanNodes:function(){
		if(this.range.collapsed) return [];
		var parent = this.range.commonAncestorContainer;
		var startNode = this.range.startContainer;
		var endNode = this.range.endContainer;
		var spanNodes = [];

		if(startNode===endNode && EditorDOM.isSpanNode(startNode)){
			spanNodes.push(startNode)
		}
		else{
			var childNodes = parent.childNodes.toArray(),i=0,startFlag = false;
            var childNode = childNodes.shift();
			while(childNode){
				if(childNode===startNode){
					startFlag = true;
					if(EditorDOM.isSpanNode(childNode.parentNode)){
						spanNodes.push(childNode.parentNode)
					}
				}
				if(EditorDOM.isSpanNode(childNode) && startFlag){
					spanNodes.push(childNode)
				}
				if(childNode==endNode){
					break;
				}
                var newChildNodes = childNode.childNodes.toArray()
                
				childNodes = newChildNodes.concat(childNodes);
				childNode = childNodes.shift();
			}
		}
		return spanNodes;
	},
	getParagraphs:function(){
		var textNodes = this.getTextNodes();
		var parents = [];
		for(var i=0;i<textNodes.length;i++){
			if(parents.indexOf(textNodes[i].childNode.parentElement)==-1)
				parents.push(textNodes[i].childNode.parentElement);
		}
		return parents;
	},
	getCommonAncestor:function(){
		if(this.range.collapsed) return null;
		var parent = this.range.commonAncestorContainer;
		return parent;
	},
	addRange:function(startContainer,startOffset,endContainer,endOffset){  // addRange
		this.selection = this.getSelection();
		this.selection.removeAllRanges();
		if(this.selection && this.range && startContainer instanceof Node && endContainer instanceof Node){
			this.range.setStart(startContainer,startOffset);
			this.range.setEnd(endContainer,endOffset);
			this.selection.addRange(this.range.cloneRange());
			this.range = this.range.cloneRange();
		}
	},
	createRange:function(){
		if(this.storedRange) return;
		this.selection = this.getSelection()
		if(this.selection && this.selection.rangeCount>0) {
			this.range = this.selection.getRangeAt(0).cloneRange();
		}else{
			this.range = null;
		}
	},
	clearRange:function(){
		if(this.storedRange) return;
		this.selection = this.getSelection();
		this.selection.removeAllRanges();
	},
	getRangeState:function(){
		var rangeState = {}; 
		// init icons state
		var canActiveIcons = "bold italic underline strikethrough superscript subscript justifycenter justifyleft justifyright";
		var icons = canActiveIcons.split(" ");
		for(var i=0;i<icons.length;i++){
			rangeState[icons[i]] = {icon:icons[i],active:false}
		}
		// change  icons state
		if(this.range){
			var parentElement = this.range.startContainer.parentElement;
			while(parentElement.tagName.toUpperCase()!="DIV"){
				switch(parentElement.tagName.toUpperCase()){
					case "I":
						rangeState["italic"] = { active:true,icon:"italic"}
						break;
					case "B":
						rangeState["bold"] = { active:true,icon:"bold"}
						break;
					case "U":
						rangeState["underline"] = { active:true,icon:"underline"}
						break;
					case "STRIKE":
						rangeState["strikethrough"] = { active:true,icon:"strikethrough"}
						break;
					case "SUP":
						rangeState["superscript"] = { active:true,icon:"superscript"}
						break;
					case "SUB":
						rangeState["subscript"] = { active:true,icon:"subscript"}
						break;
					case "FONT":
						rangeState["forecolor"] = {color: parentElement.color, icon:"forecolor"}
						rangeState["backcolor"] = {color: parentElement.style.backgroundColor, icon:"backcolor"}
						rangeState["fontsize"] = {value: parentElement.size, icon:"fontsize"}
						rangeState["fontfamily"] = {value: parentElement.face, icon:"fontfamily"}
						break;
					case "P":
					case "H1":
					case "H2":
					case "H3":
					case "H5":
					case "H6":
						var textAlign = parentElement.style.textAlign?parentElement.style.textAlign:"left";
						var fontFamily = parentElement.style.fontFamily?parentElement.style.fontFamily:"宋体,SimSun";
						var fontSize = parentElement.style.fontSize?parentElement.style.fontSize:"12px";
						rangeState["justifycenter"] = { active:textAlign=="center",icon:"subscript"}
						rangeState["justifyleft"] = { active:textAlign=="left",icon:"subscript"}
						rangeState["justifyright"] = { active:textAlign=="right",icon:"subscript"}
						rangeState["paragraph"] = {value:parentElement.tagName.toLowerCase(),icon:"paragraph"}
						break;
					case "BLOCKQUOTE":
						rangeState["indent"] = { active:true,icon:"indent"}
						rangeState["outdent"] = { active:false,icon:"indent"}
						break;
				}
				parentElement = parentElement.parentElement;
			}
		}
		
		if(!rangeState["forecolor"]) rangeState["forecolor"] = {color: 'transparent', icon:"forecolor"}
		if(!rangeState["backcolor"]) rangeState["backcolor"] = {color: 'transparent', icon:"backcolor"}
		if(!rangeState["fontsize"] || !rangeState["fontsize"].value) rangeState["fontsize"] = {value: "3", icon:"fontsize"}
		if(!rangeState["paragraph"] || !rangeState["paragraph"].value) rangeState["paragraph"] = {value: "p", icon:"fontsize"}
		if(!rangeState["fontfamily"] || !rangeState["fontfamily"].value) rangeState["fontfamily"] = {value: "宋体, SimSun", icon:"fontfamily"}
		if(!rangeState["indent"]) {
			rangeState["outdent"] = { active:true,icon:"outdent"}
			rangeState["indent"] = { active:false,icon:"indent"}
		}
		return rangeState;
	},
	storeRange:function(){
		this.storedRange = this.range?this.range.cloneRange():null;
	},
	restoreRange:function(){
		this.range = this.storedRange?this.storedRange.cloneRange():null;
		this.storedRange = null;
		this.cloneRange();
	}
}
module.exports = EditorSelection;