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
	}
}
module.exports = EditorDOM;
