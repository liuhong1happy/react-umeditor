var React = require('react');
var ReactDOM = require('react-dom');

// resize context
var minWidth = 12;
var minHeight = 12;
var EditorResize = React.createClass({
	getInitialState:function(){
		return {
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
	},
	setTarget:function(target){
		var width =parseFloat(target.width || target.style.width);
		var height = parseFloat(target.height || target.style.height);
		var offsetLeft = target.offsetLeft+target.offsetParent.offsetLeft;
		var offsetTop = target.offsetTop+target.offsetParent.offsetTop;;
		this.setState({
			target:target,
			width:width,
			height:height,
			show:true,
			position:{x:offsetLeft,y:offsetTop}
		})
	},
	getTarget:function(){
		return this.state.target;
	},
	clearTarget:function(){
		this.setState({
			target:null,
			show:false
		})
	},
	stopPropagation:function(e){
		  if(e.stopPropagation)
				e.stopPropagation();
		  else
				e.cancelBubble = true;
	},
	clearSelect:function(e){
		if(window.getSelection){
				window.getSelection().removeAllRanges();
		}else{
			document.selection.empty();
		}
	},
	getMousePosition:function(e){
		e = e || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;

		var x = parseFloat(e.pageX || e.clientX +scrollX);
		var y = parseFloat(e.pageY || e.clientY +scrollY);

		return {x:x,y:y};
	},
	handleMouseDown:function(e){
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
		
		window.removeEventListener("mouseup",this.handleMouseUp);
		window.removeEventListener("mousemove",this.handleMouseMove);
		window.addEventListener("mouseup",this.handleMouseUp);
		window.addEventListener("mousemove",this.handleMouseMove);

		this.stopPropagation(e);
	},
	handleMouseMove:function(e){
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
			this.state.target.width = width;
			this.state.target.height = height;
		}
		
		this.setState({
			startPosition:startPosition,
			width:width,
			height:height
		})

		this.stopPropagation(e);
	},
	handleMouseUp:function(e){
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
		
		window.removeEventListener("mouseup",this.handleMouseUp);
		window.removeEventListener("mousemove",this.handleMouseMove);
		if(this.state.target){
			this.state.target.width = width;
			this.state.target.height = height;
		}
		this.setState({
			startPosition:startPosition,
			height:height,
			width:width,
			direction:null,
		})
		
		this.stopPropagation(e);
	},
	render:function(){
		var style = {
			width:this.state.width,
			height:this.state.height,
			left:this.state.position.x,
			top:this.state.position.y,
			display:this.state.show?"block":"none",
			positoin:"absolute"
		};		
		return (<div className="editor-resize" style={style}>
				<div className="block-resize nw-resize" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
				<div className="block-resize ne-resize" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
				<div className="block-resize sw-resize" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
				<div className="block-resize se-resize" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
		</div>)
	}
})		

module.exports = EditorResize;