var EditorSelection = {
	range:null,
	selection:null,
	getSelection:function(){
		if(window.getSelection) return window.getSelection();
		else if(document.getSelection) return document.getSelection();
		else if(document.selection) return document.selection.createRange();
		else return null;
	},
	addRange:function(){
		this.selection = this.getSelection();
		this.selection.removeAllRanges();
		if(this.selection && this.range) {
			this.selection.addRange(this.range.cloneRange());
			this.range = this.range.cloneRange();
		}
	},
	createRange:function(){
		this.selection = this.getSelection()
		if(this.selection && this.selection.rangeCount>0) {
			this.range = this.selection.getRangeAt(0).cloneRange();
		}else{
			this.range = null;
		}
	},
	clearRange:function(){
		this.selection = this.getSelection();
		this.selection.removeAllRanges();
	},
	getRangeState:function(){
		var rangeState = {}; 
		// init icons state
		var canActiveIcons = "bold italic underline strikethrough";
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
				}
				parentElement = parentElement.parentElement;
			}
		}
		return rangeState;
	}
}
module.exports = EditorSelection;