import EventEmitter from 'events'

export class EditorEventEmitter extends EventEmitter {
	constructor() {
		super();
		this.editorStack = [];
		this.isStart = false;
		this.startTime = null;
		this.editorIndex = null;
	}
	static EditorIndex = 0;
	addStartListener(type,callback) {
		if(this.editorStack.length==0 && this.isStart == false){
			this.startTime = this.startTime || new Date();
		}
		this.editorIndex = EditorEventEmitter.EditorIndex++;
		this.editorStack.push(type);
		this.on(type, callback);
	  
		this.emitNextListener();
	}

	emitNextListener() { 
		if(this.editorStack.length==0) this.isStart = false;
		else if(this.isStart == false){
			this.isStart = true;
			var type = this.editorStack.shift();
			this.emit(type);
			this.startTime = this.startTime || new Date();
		}
	}

	removeStartListener(type, callback) {
		this.removeListener(type, callback);
		var index = this.editorStack.indexOf(type);
		this.editorStack.splice(index ,1);
	}

	mountEditorSuccess() {
		this.isStart = false;
		this.emitNextListener();
	}
}

const editorEventEmitter = new EditorEventEmitter();
editorEventEmitter.setMaxListeners(10000);

export default editorEventEmitter;	