'use strict';

var React = require('react');
var Dialog = require('./Dialog');

var ImageDialog = React.createClass({
	displayName: 'ImageDialog',

	open: function open() {
		this.refs.modal.open();
	},
	close: function close() {
		this.refs.modal.close();
	},
	toggle: function toggle() {
		this.refs.modal.toggle();
	},
	handleOkClick: function handleOkClick(e) {
		// 做相应的处理

		this.close();
	},
	render: function render() {
		var buttons = [{ name: "btn-ok", content: "确定", onClick: this.handleOkClick }, { name: "btn-cancel", content: "取消", onClick: this.close }];
		return React.createElement(Dialog, { ref: 'modal', className: 'image-dialog', width: 700, height: 408, title: '图片', buttons: buttons });
	}
});

module.exports = ImageDialog;