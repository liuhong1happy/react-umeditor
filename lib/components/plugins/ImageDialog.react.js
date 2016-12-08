'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');

var Dialog = require('../base/Dialog.react');
var TabGroup = require('../base/TabGroup.react');
var Uploader = require('../../utils/FileUpload');

var ImageUpload = function (_React$Component) {
	_inherits(ImageUpload, _React$Component);

	function ImageUpload(props) {
		_classCallCheck(this, ImageUpload);

		var _this = _possibleConstructorReturn(this, (ImageUpload.__proto__ || Object.getPrototypeOf(ImageUpload)).call(this, props));

		_this.state = {
			images: [],
			dragEnter: false
		};
		return _this;
	}

	_createClass(ImageUpload, [{
		key: 'handleUploadFile',
		value: function handleUploadFile(obj) {
			/**
    * 点击 obj = e.target
    * 拖拽 obj = e.dataTransfer
    */
			var _self = this;
			var images = this.state.images;
			var request = this.props.request;
			var mask = ReactDOM.findDOMNode(this.refs.mask);
			var uploader = this.props.customUploader ? this.props.customUploader : Uploader;

			var files = obj.files;
			var fileIndex = 0;
			single(files[fileIndex]);

			function single(file) {
				uploader.uploadFile({
					file: file,
					filename: _self.props.name,
					url: _self.props.url,
					type: _self.props.type,
					qiniu: _self.props.qiniu,
					onLoad: function onLoad(e) {
						mask.style.display = "block";
						mask.innerHTML = fileIndex + 1 + '/' + files.length + ' Uploading...';
					},
					onSuccess: function onSuccess(res) {
						// console.log(`2文件总数：${files.length}`);
						mask.style.display = "block";
						mask.innerHTML = "Load Success";

						if (res && res.status == "success") {
							images.push({
								src: res.data[request || "image_src"]
							});
							_self.setState({
								images: images
							});
							if (_self.props.onChange) {
								_self.props.onChange(0, images);
							}
							// console.log(`3文件总数：${files.length}`);
						}

						setTimeout(function () {

							if (fileIndex + 1 < files.length) {
								//判断是否还有图片没有上传
								fileIndex += 1;
								single(files[fileIndex]);
							} else {
								//去除遮罩层
								mask.style.display = "none";
								//图片上传完毕，重置文件索引 fileIndex
								fileIndex = 0;
								if (!obj.dropEffect) {
									// console.log('done')
									// clear value
									obj.value = "";
								}
							}
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
			}
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			if (target.files.length > 0) {
				this.handleUploadFile(target);
				// clear value
				// target.value = "";
			}
		}
	}, {
		key: 'getImages',
		value: function getImages() {
			return this.state.images;
		}
	}, {
		key: 'clearImages',
		value: function clearImages() {
			this.setState({
				images: []
			});
		}
	}, {
		key: 'handleRemoveImage',
		value: function handleRemoveImage(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var index = parseInt(target.getAttribute("data-index"));
			var images = this.state.images;
			images.splice(index, 1);
			this.setState({
				images: images
			});
			if (this.props.onChange) this.props.onChange(0, images);
		}
	}, {
		key: 'handleDrop',
		value: function handleDrop(e) {
			e.preventDefault();
			var files = e.dataTransfer.files;
			if (files.length > 0) {
				// this.handleUploadFile(files[0]);
				this.handleUploadFile(e.dataTransfer);
			}
			this.setState({
				dragEnter: false
			});
			// console.log(e.type);
		}
	}, {
		key: 'handleDragOver',
		value: function handleDragOver(e) {
			e.preventDefault();
			// console.log(e.type);
		}
	}, {
		key: 'handleDragEnter',
		value: function handleDragEnter(e) {
			this.setState({
				dragEnter: true
			});
			// console.log(e.type);
		}
	}, {
		key: 'handleDragLeave',
		value: function handleDragLeave(e) {
			this.setState({
				dragEnter: false
			});
			// console.log(e.type);
		}
	}, {
		key: 'render',
		value: function render() {
			var images = this.state.images;
			var dragEnter = this.state.dragEnter;
			var handleRemoveImage = this.handleRemoveImage.bind(this);
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
					{ className: "image-content" + (dragEnter ? " drag-enter" : ""), onDrop: this.handleDrop.bind(this),
						onDragOver: this.handleDragOver.bind(this),
						onDragEnter: this.handleDragEnter.bind(this),
						onDragLeave: this.handleDragLeave.bind(this),
						onDragEnd: this.handleDragLeave.bind(this),
						onDragStart: this.handleDragEnter.bind(this) },
					images.map(function (ele, pos) {
						return React.createElement(
							'div',
							{ className: 'image-item' },
							React.createElement('div', { className: 'image-close', 'data-index': pos, onClick: handleRemoveImage }),
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
							React.createElement('input', { onChange: this.handleChange.bind(this), multiple: 'multiple', style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'image-dragTip', style: hasImages ? hideStyle : showStyle },
					'\u652F\u6301\u56FE\u7247\u62D6\u62FD\u4E0A\u4F20'
				),
				React.createElement(
					'div',
					{ className: 'image-upload1', style: hasImages ? hideStyle : showStyle },
					React.createElement('span', { className: 'image-icon' }),
					React.createElement(
						'form',
						{ className: 'image-form', method: 'post', encType: 'multipart/form-data', target: 'up', action: action },
						React.createElement('input', { onChange: this.handleChange.bind(this), multiple: 'multiple', style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
					)
				),
				React.createElement(
					'div',
					{ className: 'image-mask', ref: 'mask' },
					"Loading...."
				)
			);
		}
	}]);

	return ImageUpload;
}(React.Component);

var ImageSearch = function (_React$Component2) {
	_inherits(ImageSearch, _React$Component2);

	function ImageSearch(props) {
		_classCallCheck(this, ImageSearch);

		var _this2 = _possibleConstructorReturn(this, (ImageSearch.__proto__ || Object.getPrototypeOf(ImageSearch)).call(this, props));

		_this2.state = {
			images: []
		};
		return _this2;
	}

	_createClass(ImageSearch, [{
		key: 'getImages',
		value: function getImages() {
			return this.state.images;
		}
	}, {
		key: 'clearImages',
		value: function clearImages() {
			this.setState({
				images: []
			});
		}
	}, {
		key: 'handleClick',
		value: function handleClick(e) {
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
		}
	}, {
		key: 'handleRemoveImage',
		value: function handleRemoveImage(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var index = parseInt(target.getAttribute("data-index"));
			var images = this.state.images;
			images.splice(index, 1);
			this.setState({
				images: images
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var images = this.state.images;
			var handleRemoveImage = this.handleRemoveImage.bind(this);
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
									{ className: 'image-searchAdd', onClick: this.handleClick.bind(this) },
									'\u6DFB\u52A0'
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
	}]);

	return ImageSearch;
}(React.Component);

var ImageDialog = function (_React$Component3) {
	_inherits(ImageDialog, _React$Component3);

	function ImageDialog(props) {
		_classCallCheck(this, ImageDialog);

		var _this3 = _possibleConstructorReturn(this, (ImageDialog.__proto__ || Object.getPrototypeOf(ImageDialog)).call(this, props));

		_this3.state = {
			images: [[], []],
			handle: function handle() {}
		};
		return _this3;
	}

	_createClass(ImageDialog, [{
		key: 'open',
		value: function open(handle) {
			this.setState({
				handle: handle
			});
			this.refs.modal.open();
		}
	}, {
		key: 'close',
		value: function close() {
			if (this.refs.modal) {
				this.refs.modal.close();
				if (this.state.handle) {
					this.state.handle();
				}
				this.refs.image.clearImages();
			}
		}
	}, {
		key: 'toggle',
		value: function toggle(handle) {
			this.setState({
				handle: handle
			});
			this.refs.modal.toggle();
		}
	}, {
		key: 'handleOkClick',
		value: function handleOkClick(e) {
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
		}
	}, {
		key: 'handleChange',
		value: function handleChange(index, imgs) {
			var images = this.state.images;
			images[index] = imgs;
			this.setState({
				images: images
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var uploader = this.props.uploader;
			var buttons = [{ name: "btn-ok", content: "确定", onClick: this.handleOkClick.bind(this) }, { name: "btn-cancel", content: "取消", onClick: this.close.bind(this) }];
			var tabs = [{ title: "本地上传", component: React.createElement(ImageUpload, { ref: 'image', onChange: this.handleChange.bind(this), request: uploader.request, type: uploader.type, name: uploader.name, url: uploader.url, qiniu: uploader.qiniu }) }, { title: "网络图片", component: React.createElement(ImageSearch, { ref: 'image', onChange: this.handleChange.bind(this) }) }];
			if (this.props.hidden) {
				return React.createElement('div', null);
			} else {
				return React.createElement(
					Dialog,
					{ ref: 'modal', className: 'image-dialog', width: 700, height: 508, title: '\u56FE\u7247', buttons: buttons, onClose: this.close.bind(this) },
					React.createElement(TabGroup, { tabs: tabs, ref: 'tab' })
				);
			}
		}
	}]);

	return ImageDialog;
}(React.Component);

ImageDialog.propTypes = {
	uploader: React.PropTypes.object,
	customUploader: React.PropTypes.object
};
ImageDialog.defaultProps = {
	uploader: {
		type: "default", // qiniu
		name: "file",
		url: "/upload",
		request: "image_src",
		qiniu: {
			app: {
				bucket: "qtestbucket",
				ak: "iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV",
				sk: "6QTOr2Jg1gcZEWDQXKOGZh5PziC2MCV5KsntT70j"
			},
			key: null,
			upload_token: null
		}
	}
};

module.exports = ImageDialog;