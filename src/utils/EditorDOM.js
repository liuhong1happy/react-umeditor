var EditorDom = {
	stopPropagation(e){
		e = e || event;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
	},
	isTextNode(node){
		if(!node) return false;
		return node.nodeType==3 || node.nodeName=="#text"
	},
	isSpanNode(node){
		if(!node) return false;
		return node.nodeType==1 && node.nodeName=="SPAN"
	},
	isNullOfTextNode(node){
		if(this.isTextNode(node)){
			return node.nodeValue=="";
		}else{
			return false;
		}
	},
	getOffsetRootParentPosition(target,root){
		let rootRect = root.getBoundingClientRect();
		let targetRect = target.getBoundingClientRect();

		return {
			x: targetRect.x - rootRect.x,
			y: targetRect.y - rootRect.y,
			w: targetRect.width,
			h: targetRect.height
		};
	},
	isEditorDom(target, root) {
		var parentNode = target.parentNode;
		while(parentNode && parentNode!=root){
			 parentNode = parentNode.parentNode;
		}
		return parentNode == root;
	},
	createTextNode(text){
		return document.createTextNode(text);
	},
	createNodeByTag(tag,html){
		var node = document.createElement(tag);
		node.innerHTML = html;
		return node;
	},
	createHR(){
		var node = document.createElement('hr');
		return node;
	},
	createBR(){
		var node = document.createElement('br');
		return node;
	},
	focusNode(node) {
		let scrollTop = node.scrollTop;
		let scrollLeft = node.scrollLeft;
		node.focus && node.focus();
		node.scrollTo(scrollLeft, scrollTop);
	}
}

export default EditorDom;
