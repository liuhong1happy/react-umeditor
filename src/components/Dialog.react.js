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
	open:function(){
		this.setState({
			show:true
		})
	},
	close:function(){
		this.setState({
			show:false
		})
	},
	toggle:function(){
		this.setState({
			show:!this.state.show
		})
	},
	render:function(){
		var {...props,buttons,title,style,width,height} = this.props;
		var style = style?style:{};
		 if(width){
			style.width = width;
			style.marginLeft = width /2;
		}
		if(height){
			style.height = height;
		}
		style.display = this.state.show ? "" : "none";
		
		return (<div className="dialog-container"   ref="root">
				<div className={"dialog"+(className?" "+className:"")} {...props} ref="dialog" style={style}>
					<div className="dialog-header" ref="header">
			 			<h3 className="dialog-title">
			 				{title}
			 			</h3>
			 			<a className="dialog-close" onClick={this.props.onClose}>&times;</a>
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
				<div className="dialog-backdrop" ref="backdrop"></div>
				</div>)
	}
})
			 
module.exports = Dialog;