import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EditorDom from './EditorDom';

// resize context
var minWidth = 12;
var minHeight = 12;

export default class EditorResize extends Component {
	state = {
		direction: null,
		target:null,
		position:{
			x:0,
			y:0
		},
		width:0,
		height:0,
	}
	componentDidMount = () => {
		this.parentElement = this.root.parentElement.querySelector('.editable-range');
		this.parentElement.addEventListener('scroll', this.resetPosition)
	}

	componentWillUnmount = () => {
		this.parentElement.removeEventListener('scroll', this.resetPosition)
	}
	
	resetPosition = ()=> {
		if(!this.state.target) return
		if(!this.state.show) return
		if(this.state.direction) return
		let position = EditorDom.getOffsetRootParentPosition(this.state.target,this.parentElement);
		this.setState({
			position: { x: position.x, y: position.y },
		})
	}

	setTarget(target){
		let position = EditorDom.getOffsetRootParentPosition(target, this.parentElement);
		let width = position.w;
		let height = position.h;
		let offsetPosition = { x: position.x, y: position.y}
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

	updatePosition(e, direction) {
		if(!this.state.direction) return;
		if(!this.state.show) return;
		this.clearSelect();
		let curPosition = this.getMousePosition(e);
		let  startPosition = this.startPosition;
		let dx = curPosition.x - startPosition.x;
		let dy = curPosition.y - startPosition.y;
		let width = this.state.width;
		let height = this.state.height;
		
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

		this.startPosition = curPosition;

		if(width<minWidth) width = minWidth;
		if(height<minHeight) height = minHeight;
		
		if(this.state.target) {
			this.state.target.style.width = width+"px";
			this.state.target.style.height = height+"px";
		}

		let position = EditorDom.getOffsetRootParentPosition(this.state.target,this.parentElement);

		this.setState({
			width:width,
			height:height,
			position: { x: position.x, y: position.y },
			direction
		})

		EditorDom.stopPropagation(e);
	}

	handleMouseDown = (e)=>{
		e = e || event;
		let target = e.target || e.srcElement;
		let className = target.className;
		this.startPosition = this.getMousePosition(e);
		this.targetPosition = this.state.target.getBoundingClientRect();

		let direction = null;
		this.clearSelect();
		if(className.indexOf("nw-resize")!=-1) direction = "nw-resize";
		if(className.indexOf("ne-resize")!=-1) direction = "ne-resize";
		if(className.indexOf("sw-resize")!=-1) direction = "sw-resize";
		if(className.indexOf("se-resize")!=-1) direction = "se-resize";

		window.removeEventListener("mouseup",this.handleMouseUp);
		window.removeEventListener("mousemove",this.handleMouseMove);
		window.addEventListener("mouseup",this.handleMouseUp);
		window.addEventListener("mousemove",this.handleMouseMove);

		this.setState({
			direction,
		})

		EditorDom.stopPropagation(e);
	}
	handleMouseMove = (e)=>{		
		this.updatePosition(e, this.state.direction);
	}
	handleMouseUp = (e)=>{
		window.removeEventListener("mouseup",this.handleMouseUp);
		window.removeEventListener("mousemove",this.handleMouseMove);
		this.updatePosition(e, null );
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
		return (<div className="editor-resize-container" ref={ref=> this.root = ref}>
				<div className="editor-resize" style={style}>
					<div className="block-resize nw-resize" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
					<div className="block-resize ne-resize" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
					<div className="block-resize sw-resize" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
					<div className="block-resize se-resize" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
				</div>
			</div>)
	}
}