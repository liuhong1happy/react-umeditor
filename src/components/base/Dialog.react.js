var React = require('react');

/**
* @width: 对话框宽度
* @height: 对话框高度
* @style: 样式
* @buttons: 对话框按钮组
* @title: 对话框标题
* @className: 对话框类名
**/
var Dialog = React.createClass({
	getInitialState:function(){
		return {
			show:false
		}
	},
	componentDidMount:function(){
		window.addEventListener("click",this.close);
	},
	componentWillUnmount:function(){
		window.removeEventListener("click",this.close);
	},
	open:function(){
		this.setState({
			show:true
		})
	},
	close:function(){
		if(!this.state.show) return;
		this.setState({
			show:false
		})
	},
	toggle:function(){
		this.setState({
			show:!this.state.show
		})
	},
	handleMouseDown:function(e){
		e = e || event;
		if(e.stopPropagation){
			e.stopPropagation()
		}else{
			e.cancelBubble = true;
		}
	},
	render:function(){
		var {...props,className,buttons,title,style,width,height} = this.props;
		var style = style?style:{};
		 if(width){
			style.width = width;
			style.marginLeft = -width /2;
		}
		if(height){
			style.height = height;
		}
		style.display = this.state.show ? "" : "none";
		var _className = "dialog"+(className?" "+className:"");
		return (<div className="dialog-container"   ref="root" onMouseDown={this.handleMouseDown}>
				<div className={_className} ref="dialog" style={style}>
					<div className="dialog-header" ref="header">
						<a className="dialog-close" onClick={this.props.onClose}></a>
			 			<h3 className="dialog-title">
			 				{title}
			 			</h3>
			 		</div>
			 		<div className="dialog-body" ref="body">
			 				{this.props.children}
			 		</div>
			 		<div className="dialog-footer" ref="footer">
			 			{
							buttons.map(function(ele,pos){
								return (<a className="dialog-button" key={pos} data-name={ele.name} onClick={ele.onClick}>{ele.content}</a>)
							})
						}
			 		</div>
				</div>
				<div className="dialog-backdrop" ref="backdrop" style={{"display":this.state.show?"":"none"}}></div>
				</div>)
	}
})
			 
module.exports = Dialog;