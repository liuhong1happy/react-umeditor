var React = require('react');
var ReactDOM = require('react-dom');
var EditorDOM = require('./EditorDOM');
// resize context
var minWidth = 12;
var minHeight = 12;

class EditorResize extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			target:null,
			position:{
				x:0,y:0
			},
			width:0,
			height:0,
			startPosition:{
				x:0,y:0
			},
			curPosition:{
				x:0,y:0
			}
		}
	}
	setTarget(target){
		var root = ReactDOM.findDOMNode(this.refs.root);
		var position = EditorDOM.getOffsetRootParentPosition(target,root.parentElement);
		var width = position.w;
		var height = position.h;
		var offsetPosition = { x: position.x, y: position.y}
		this.setState({
			target:target,
			width:width,
			height:height,
			show:true,
			position:offsetPosition
		})
	}
	getTarget(){
		return this.state.target;
	}
	clearTarget(){
		this.setState({
			target:null,
			show:false
		})
	}
	clearSelect(e){
		if(window.getSelection){
				window.getSelection().removeAllRanges();
		}else{
			document.selection.empty();
		}
	}
	getMousePosition(e){
		e = e || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;

		var x = parseFloat(e.pageX || e.clientX +scrollX);
		var y = parseFloat(e.pageY || e.clientY +scrollY);

		return {x:x,y:y};
	}
	handleMouseDown(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var className = target.className;
		var startPosition = this.getMousePosition(e);
		this.clearSelect();
		if(className.indexOf("nw-resize")!=-1){
			this.setState({
				direction:"nw-resize",
				startPosition:startPosition
			})
		}
		if(className.indexOf("ne-resize")!=-1){
			this.setState({
				direction:"ne-resize",
				startPosition:startPosition
			})
		}
		if(className.indexOf("sw-resize")!=-1){
			this.setState({
				direction:"sw-resize",
				startPosition:startPosition
			})
		}
		if(className.indexOf("se-resize")!=-1){
			this.setState({
				direction:"se-resize",
				startPosition:startPosition
			})
		}
		
		window.removeEventListener("mouseup",this.handleMouseUp.bind(this));
		window.removeEventListener("mousemove",this.handleMouseMove.bind(this));
		window.addEventListener("mouseup",this.handleMouseUp.bind(this));
		window.addEventListener("mousemove",this.handleMouseMove.bind(this));

		EditorDOM.stopPropagation(e);
	}
	handleMouseMove(e){
		if(!this.state.direction) return;
		this.clearSelect();
		e = e || event;
		var target = e.target || e.srcElement;
		var curPosition = this.getMousePosition(e);
		var  startPosition = this.state.startPosition;
		var dx = curPosition.x-startPosition.x;
		var dy = curPosition.y-startPosition.y;
		var width = this.state.width;
		var height = this.state.height;
		
		switch(this.state.direction){
			case "nw-resize":
				width -= dx;
				height -= dy;
				break;
			case "ne-resize":
				width += dx;
				height -= dy;
				break;
			case "sw-resize":
				width -= dx;
				height += dy;
				break;
			case "se-resize":
				width += dx;
				height += dy;
				break;
		}
		startPosition = curPosition;
		if(width<minWidth) width = minWidth;
		if(height<minHeight) height = minHeight;
		
		if(this.state.target){
			this.state.target.style.width = width+"px";
			this.state.target.style.height = height+"px";
		}
		
		this.setState({
			startPosition:startPosition,
			width:width,
			height:height
		})

		EditorDOM.stopPropagation(e);
	}
	handleMouseUp(e){
		if(!this.state.direction) return;
		this.clearSelect();
		e = e || event;
		var target = e.target || e.srcElement;
		var curPosition = this.getMousePosition(e);
		var  startPosition = this.state.startPosition;
		var dx = curPosition.x-startPosition.x;
		var dy = curPosition.y-startPosition.y;
		var width = this.state.width;
		var height = this.state.height;
		
		switch(this.state.direction){
			case "nw-resize":
				width -= dx;
				height -= dy;
				break;
			case "ne-resize":
				width += dx;
				height -= dy;
				break;
			case "sw-resize":
				width -= dx;
				height += dy;
				break;
			case "se-resize":
				width += dx;
				height += dy;
				break;
		}
		startPosition = curPosition;
		
		if(width<minWidth) width = minWidth;
		if(height<minHeight) height = minHeight;
		
		window.removeEventListener("mouseup",this.handleMouseUp.bind(this));
		window.removeEventListener("mousemove",this.handleMouseMove.bind(this));
		if(this.state.target){
			this.state.target.style.width = width+"px";
			this.state.target.style.height = height+"px";
		}
		this.setState({
			startPosition:startPosition,
			height:height,
			width:width,
			direction:null,
		})
		
		EditorDOM.stopPropagation(e);
	}
	render(){
		var style = {
			width:this.state.width,
			height:this.state.height,
			left:this.state.position.x,
			top:this.state.position.y,
			display:this.state.show?"block":"none",
			positoin:"absolute"
		};		
		return (<div className="editor-resize-container" ref="root">
				<div className="editor-resize" style={style}>
					<div className="block-resize nw-resize" onMouseDown={this.handleMouseDown.bind(this)} onMouseMove={this.handleMouseMove.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}></div>
					<div className="block-resize ne-resize" onMouseDown={this.handleMouseDown.bind(this)} onMouseMove={this.handleMouseMove.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}></div>
					<div className="block-resize sw-resize" onMouseDown={this.handleMouseDown.bind(this)} onMouseMove={this.handleMouseMove.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}></div>
					<div className="block-resize se-resize" onMouseDown={this.handleMouseDown.bind(this)} onMouseMove={this.handleMouseMove.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}></div>
				</div>
			</div>)
	}
}

module.exports = EditorResize;