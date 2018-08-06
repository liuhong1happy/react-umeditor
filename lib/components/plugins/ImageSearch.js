'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageSearch = function (_Component) {
	_inherits(ImageSearch, _Component);

	function ImageSearch(props) {
		_classCallCheck(this, ImageSearch);

		var _this = _possibleConstructorReturn(this, (ImageSearch.__proto__ || Object.getPrototypeOf(ImageSearch)).call(this, props));

		_this.state = {
			images: []
		};
		return _this;
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
			var text = _reactDom2.default.findDOMNode(this.refs.text);
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
			return _react2.default.createElement(
				'div',
				{ className: 'tab-panel' },
				_react2.default.createElement(
					'table',
					{ className: 'search-bar' },
					_react2.default.createElement(
						'tbody',
						null,
						_react2.default.createElement(
							'tr',
							null,
							_react2.default.createElement(
								'td',
								null,
								_react2.default.createElement('input', { className: 'image-searchTxt', type: 'text', ref: 'text' })
							),
							_react2.default.createElement(
								'td',
								null,
								_react2.default.createElement(
									'div',
									{ className: 'image-searchAdd', onClick: this.handleClick.bind(this) },
									'\u6DFB\u52A0'
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'image-content' },
					images.map(function (ele, pos) {
						return _react2.default.createElement(
							'div',
							{ key: pos, className: 'image-item' },
							_react2.default.createElement('div', { className: 'image-close', 'data-index': pos, onClick: handleRemoveImage }),
							_react2.default.createElement('img', { src: ele.src, className: 'image-pic', height: '75', width: '120' })
						);
					})
				)
			);
		}
	}]);

	return ImageSearch;
}(_react.Component);

exports.default = ImageSearch;