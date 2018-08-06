import EditorSelection from './EditorSelection';
var EditorHistory = {
	curCommand:null,
	commandStack:[],
	commandIndex:-1,
	canUndo:function(){
		return this.commandStack.length>0 && this.commandIndex!=-1;
	},
	canRedo:function(){
		return this.commandStack.length>0 && this.commandIndex!=(this.commandStack.length-1);
	},
	undo:function(){
		if(this.canUndo()){
			this.commandIndex = this.commandIndex-1;
			this.curCommand = this.commandStack[this.commandIndex];
			document.execCommand("undo");
		}
		return this.canUndo();
	},
	redo:function(){
		if(this.canRedo()){
			this.commandIndex = this.commandIndex+1;
			this.curCommand = this.commandStack[this.commandIndex];
			document.execCommand("redo");
		}
		return this.canRedo();
	},
	execCommand:function(command,flag,args){
		switch(command){
			case "inserthtml":
				var selection = EditorSelection.getSelection();
				if(selection.pasteHTML) selection.pasteHTML(args);
				else document.execCommand(command,flag,args);
				break;
			default:
				document.execCommand(command,flag,args);
				break;
		}
		
		if(command=="selectall")  return;
		this.commandIndex = this.commandIndex+1;
		this.curCommand = {command,flag,args};
		// 必需移除index后的command
		this.commandStack.splice(this.commandIndex,this.commandStack.length-this.commandIndex);
		this.commandStack[this.commandIndex] = {command,flag,args};
	},
	getCurCommand:function(){
		return this.curCommand;
	},
	getCommandStack:function(){
		return this.commandStack;
	},
	getCommandIndex:function(){
		return this.commandIndex;
	},
	clear:function(){
		this.curCommand = null;
		this.commandStack = [];
		this.commandIndex = -1;
	}
}	
	
export default EditorHistory;