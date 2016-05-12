var React = require('react');
var Dialog = require('./Dialog');

var ImageDialog = React.createClass({
	open:function(){
		this.refs.modal.open();
	},
	close:function(){
		this.refs.modal.close();
	},
	toggle:function(){
		this.refs.modal.toggle();
	},
	handleOkClick:function(e){
		// 做相应的处理
		
		
		this.close();
	},
	render:function(){
		var buttons = [
			{ name:"btn-ok", content:"确定", onClick:this.handleOkClick},
			{ name:"btn-cancel", content:"取消", onClick:this.close}
		];
		return (<Dialog ref="modal" className="image-dialog" width={700} height={408} title="图片" buttons={buttons}></Dialog>)
	}
})
		
module.exports = ImageDialog;