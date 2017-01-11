var EditorDOM = {
	stopPropagation:function(e){
		e = e || event;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
	},
	isTextNode:function(node){
		if(!node) return false;
		return node.nodeType==3 || node.nodeName=="#text"
	},
	isSpanNode:function(node){
		if(!node) return false;
		return node.nodeType==1 && node.nodeName=="SPAN"
	},
	isNullOfTextNode:function(node){
		if(this.isTextNode(node)){
			return node.nodeValue=="";
		}else{
			return false;
		}
	},
	getOffsetRootParentPosition:function(target,root){
		var position = {x:0,y:0,w:0,h:0}
		
		position.w = target.offsetWidth;
		position.h = target.offsetHeight;
		position.x = target.offsetLeft;
		position.y = target.offsetTop;
		var offsetParent = target.offsetParent;
		while(offsetParent && offsetParent!=root && offsetParent.offsetParent!= root.offsetParent){
			 position.x+= offsetParent.offsetLeft;
			 position.y+=offsetParent.offsetTop;
			 offsetParent = offsetParent.offsetParent;
		}
		if(offsetParent==root){
			position.x = position.x - parseFloat(offsetParent.style.paddingLeft || 0);
			position.y = position.y - parseFloat(offsetParent.style.paddingTop || 0);
		}
		return position;
	},
	isEditorDom: function(target, root) {
		var parentNode = target.parentNode;
		while(parentNode && parentNode!=root){
			 parentNode = parentNode.parentNode;
		}
		return parentNode == root;
	},
	createTextNode: function(text){
		return document.createTextNode(text);
	},
	createNodeByTag: function(tag,html){
		var node = document.createElement(tag);
		node.innerHTML = html;
		return node;
	},
	createHR: function(){
		var node = document.createElement('hr');
		return node;
	},
	createBR: function(){
		var node = document.createElement('br');
		return node;
	}
}
module.exports = EditorDOM;
