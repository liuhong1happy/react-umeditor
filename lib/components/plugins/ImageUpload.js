'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _FileUpload = require('../../utils/FileUpload');

var _FileUpload2 = _interopRequireDefault(_FileUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageUpload = function (_Component) {
	_inherits(ImageUpload, _Component);

	function ImageUpload(props) {
		_classCallCheck(this, ImageUpload);

		var _this = _possibleConstructorReturn(this, (ImageUpload.__proto__ || Object.getPrototypeOf(ImageUpload)).call(this, props));

		_this.argumentUpload = function (file, files, fileIndex, obj) {
			var _self = _this;
			var request = _this.props.request;
			var uploader = _this.props.customUploader ? _this.props.customUploader : _FileUpload2.default;

			uploader.uploadFile({
				file: file,
				filename: _self.props.name,
				data: _self.props.data,
				url: _self.props.url,
				filter: _self.props.filter,
				onLoad: function onLoad() {
					_self.beforeUploading(files, fileIndex);
				},
				onSuccess: function onSuccess(res) {
					var url = _self.props.filter(res);
					_self.updateImage(url);

					setTimeout(function () {
						if (fileIndex + 1 < files.length) {
							//判断是否还有图片没有上传
							fileIndex += 1;
							_self.argumentUpload(files[fileIndex], files, fileIndex, obj);
						} else {
							//图片上传完毕，重置文件索引 fileIndex
							fileIndex = 0;
							if (!obj.dropEffect) {
								obj.value = "";
								_self.afterUploading();
							}
						}
					}, 200);
				},
				onError: function onError() {
					_self.errorUploading();
				}
			});
		};

		_this.beforeUploading = function (files, fileIndex) {
			var mask = _reactDom2.default.findDOMNode(_this.refs.mask);
			mask.style.display = "block";
			mask.innerHTML = fileIndex + 1 + '/' + files.length + ' Uploading...';
		};

		_this.afterUploading = function () {
			// 去除遮罩层
			var mask = _reactDom2.default.findDOMNode(_this.refs.mask);
			mask.style.display = "none";
			mask.innerHTML = "Load Success";
		};

		_this.errorUploading = function () {
			var mask = _reactDom2.default.findDOMNode(_this.refs.mask);
			mask.style.display = "block";
			mask.innerHTML = "Load Error";
			setTimeout(function () {
				mask.style.display = "none";
			}, 200);
		};

		_this.updateImage = function (image) {
			var images = _this.state.images;
			images.push({
				src: image
			});
			_this.setState({
				images: images
			});
			if (_this.props.onChange) {
				_this.props.onChange(0, images);
			}
		};

		_this.state = {
			images: [],
			dragEnter: false
		};
		return _this;
	}

	_createClass(ImageUpload, [{
		key: 'handleUploadFile',
		value: function handleUploadFile(obj) {
			var file = obj.files[0];
			this.argumentUpload(file, obj.files, 0, obj);
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
			return _react2.default.createElement(
				'div',
				{ className: 'tab-panel' },
				_react2.default.createElement(
					'div',
					{ className: "image-content" + (dragEnter ? " drag-enter" : ""), onDrop: this.handleDrop.bind(this),
						onDragOver: this.handleDragOver.bind(this),
						onDragEnter: this.handleDragEnter.bind(this),
						onDragLeave: this.handleDragLeave.bind(this),
						onDragEnd: this.handleDragLeave.bind(this),
						onDragStart: this.handleDragEnter.bind(this) },
					images.map(function (ele, pos) {
						return _react2.default.createElement(
							'div',
							{ key: pos, className: 'image-item' },
							_react2.default.createElement('div', { className: 'image-close', 'data-index': pos, onClick: handleRemoveImage }),
							_react2.default.createElement('img', { src: ele.src, className: 'image-pic', height: '75', width: '120' })
						);
					}),
					_react2.default.createElement(
						'div',
						{ className: 'image-upload2', style: hasImages ? showStyle : hideStyle },
						_react2.default.createElement('span', { className: 'image-icon' }),
						_react2.default.createElement(
							'form',
							{ className: 'image-form', method: 'post', encType: 'multipart/form-data', target: 'up', action: action },
							_react2.default.createElement('input', { onChange: this.handleChange.bind(this), multiple: 'multiple', style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'image-dragTip', style: hasImages ? hideStyle : showStyle },
					'\u652F\u6301\u56FE\u7247\u62D6\u62FD\u4E0A\u4F20'
				),
				_react2.default.createElement(
					'div',
					{ className: 'image-upload1', style: hasImages ? hideStyle : showStyle },
					_react2.default.createElement('span', { className: 'image-icon' }),
					_react2.default.createElement(
						'form',
						{ className: 'image-form', method: 'post', encType: 'multipart/form-data', target: 'up', action: action },
						_react2.default.createElement('input', { onChange: this.handleChange.bind(this), multiple: 'multiple', style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'image-mask', ref: 'mask' },
					"Loading...."
				)
			);
		}
	}]);

	return ImageUpload;
}(_react.Component);

exports.default = ImageUpload;