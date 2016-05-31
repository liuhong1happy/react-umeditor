'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Dialog = require('./Dialog.react');
var TabGroup = require('./TabGroup.react');
var Uploader = require('../utils/FileUpload');

var ImageUpload = React.createClass({
	displayName: 'ImageUpload',

	getInitialState: function getInitialState() {
		return {
			images: []
		};
	},
	handleChange: function handleChange(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var mask = ReactDOM.findDOMNode(this.refs.mask);
		var _self = this;
		var images = this.state.images;
		if (target.files.length > 0) {
			Uploader.uploadFile({
				file: target.files[0],
				onLoad: function onLoad(e) {
					mask.style.display = "block";
					mask.innerHTML = "Loading...";
				},
				onSuccess: function onSuccess(res) {
					mask.style.display = "block";
					mask.innerHTML = "Load Success";

					if (res && res.status == "success") {
						images.push({
							src: res.image_src
						});
						_self.setState({
							images: images
						});
						if (_self.props.onChange) _self.props.onChange(0, images);
					}
					setTimeout(function () {
						mask.style.display = "none";
					}, 200);
				},
				onError: function onError(e) {
					mask.style.display = "block";
					mask.innerHTML = "Load Error";
					setTimeout(function () {
						mask.style.display = "none";
					}, 200);
				}
			});
			// clear value
			target.value = "";
		}
	},
	getImages: function getImages() {
		return this.state.images;
	},
	clearImages: function clearImages() {
		this.setState({
			images: []
		});
	},
	handleRemoveImage: function handleRemoveImage(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var index = parseInt(target.getAttribute("data-index"));
		var images = this.state.images;
		images.splice(index, 1);
		this.setState({
			images: images
		});
		if (this.props.onChange) this.props.onChange(0, images);
	},
	render: function render() {
		var images = this.state.images;
		var handleRemoveImage = this.handleRemoveImage;
		var action = this.props.action ? this.props.action : "/upload";
		var showStyle = {
			"display": "block"
		};
		var hideStyle = {
			"display": "none"
		};
		var hasImages = images.length > 0;
		return React.createElement(
			'div',
			{ className: 'tab-panel' },
			React.createElement(
				'div',
				{ className: 'image-content' },
				images.map(function (ele, pos) {
					return React.createElement(
						'div',
						{ className: 'image-item' },
						React.createElement('div', { className: 'image-close', onClick: handleRemoveImage }),
						React.createElement('img', { src: ele.src, className: 'image-pic', height: '75', width: '120' })
					);
				}),
				React.createElement(
					'div',
					{ className: 'image-upload2', style: hasImages ? showStyle : hideStyle },
					React.createElement('span', { className: 'image-icon' }),
					React.createElement(
						'form',
						{ className: 'image-form', method: 'post', encType: 'multipart/form-data', target: 'up', action: action },
						React.createElement('input', { onChange: this.handleChange, style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', hidefocus: '', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'image-dragTip', style: hasImages ? hideStyle : showStyle },
				'支持图片拖拽上传'
			),
			React.createElement(
				'div',
				{ className: 'image-upload1', style: hasImages ? hideStyle : showStyle },
				React.createElement('span', { className: 'image-icon' }),
				React.createElement(
					'form',
					{ className: 'image-form', method: 'post', encType: 'multipart/form-data', target: 'up', action: action },
					React.createElement('input', { onChange: this.handleChange, style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', hidefocus: '', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
				)
			),
			React.createElement(
				'div',
				{ className: 'image-mask', ref: 'mask' },
				"Loading...."
			)
		);
	}
});

var ImageSearch = React.createClass({
	displayName: 'ImageSearch',

	getInitialState: function getInitialState() {
		return {
			images: []
		};
	},
	getImages: function getImages() {
		return this.state.images;
	},
	clearImages: function clearImages() {
		this.setState({
			images: []
		});
	},
	handleClick: function handleClick(e) {
		var text = ReactDOM.findDOMNode(this.refs.text);
		var src = text.value;
		var images = this.state.images;
		if (src && src.length > 0) {
			images.push({ src: src });
			this.setState({
				images: images
			});
			if (this.props.onChange) this.props.onChange(1, images);
			text.value = "";
		}
	},
	handleRemoveImage: function handleRemoveImage(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var index = parseInt(target.getAttribute("data-index"));
		var images = this.state.images;
		images.splice(index, 1);
		this.setState({
			images: images
		});
	},
	render: function render() {
		var images = this.state.images;
		var handleRemoveImage = this.handleRemoveImage;
		return React.createElement(
			'div',
			{ className: 'tab-panel' },
			React.createElement(
				'table',
				{ className: 'search-bar' },
				React.createElement(
					'tbody',
					null,
					React.createElement(
						'tr',
						null,
						React.createElement(
							'td',
							null,
							React.createElement('input', { className: 'image-searchTxt', type: 'text', ref: 'text' })
						),
						React.createElement(
							'td',
							null,
							React.createElement(
								'div',
								{ className: 'image-searchAdd', onClick: this.handleClick },
								'添加'
							)
						)
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'image-content' },
				images.map(function (ele, pos) {
					return React.createElement(
						'div',
						{ key: pos, className: 'image-item' },
						React.createElement('div', { className: 'image-close', 'data-index': pos, onClick: handleRemoveImage }),
						React.createElement('img', { src: ele.src, className: 'image-pic', height: '75', width: '120' })
					);
				})
			)
		);
	}
});

var ImageDialog = React.createClass({
	displayName: 'ImageDialog',

	getInitialState: function getInitialState() {
		return {
			images: [[], []],
			handle: function handle() {}
		};
	},
	open: function open(handle) {
		this.setState({
			handle: handle
		});
		this.refs.modal.open();
	},
	close: function close() {
		this.refs.modal.close();
		if (this.state.handle) {
			this.state.handle();
		}
		this.refs.image.clearImages();
	},
	toggle: function toggle() {
		this.refs.modal.toggle();
	},
	handleOkClick: function handleOkClick(e) {
		// 做相应的处理
		var tabIndex = this.refs.tab.getTabIndex();
		var images = this.state.images[tabIndex];
		var strImgs = "";
		if (images.length > 0 && this.state.handle) {
			for (var i = 0; i < images.length; i++) {
				var src = images[i].src;
				var str = "<img src='" + src + "' />";
				strImgs += str;
			}
			this.state.handle(e, strImgs);
		}
		this.close();
	},
	handleChange: function handleChange(index, imgs) {
		var images = this.state.images;
		images[index] = imgs;
		this.setState({
			images: images
		});
	},
	render: function render() {
		var buttons = [{ name: "btn-ok", content: "确定", onClick: this.handleOkClick }, { name: "btn-cancel", content: "取消", onClick: this.close }];
		var tabs = [{ title: "本地上传", component: React.createElement(ImageUpload, { ref: 'image', onChange: this.handleChange }) }, { title: "网络图片", component: React.createElement(ImageSearch, { ref: 'image', onChange: this.handleChange }) }];
		return React.createElement(
			Dialog,
			{ ref: 'modal', className: 'image-dialog', width: 700, height: 508, title: '图片', buttons: buttons, onClose: this.close },
			React.createElement(TabGroup, { tabs: tabs, ref: 'tab' })
		);
	}
});

module.exports = ImageDialog;