'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EmotionPanel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TabGroup = require('../base/TabGroup');

var _TabGroup2 = _interopRequireDefault(_TabGroup);

var _Dialog = require('../base/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _EditorConstants = require('../../constants/EditorConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmotionPanel = exports.EmotionPanel = function (_Component) {
	_inherits(EmotionPanel, _Component);

	function EmotionPanel() {
		_classCallCheck(this, EmotionPanel);

		return _possibleConstructorReturn(this, (EmotionPanel.__proto__ || Object.getPrototypeOf(EmotionPanel)).apply(this, arguments));
	}

	_createClass(EmotionPanel, [{
		key: 'handleClick',
		value: function handleClick(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var url = target.getAttribute("data-url");
			var title = target.getAttribute("data-title");

			if (this.props.onSelectImage) {
				var img = document.createElement('img');
				img.src = url;
				img.title = title;
				this.props.onSelectImage(e, img);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var images = this.props.images;
			var handleClick = this.handleClick.bind(this);
			return _react2.default.createElement(
				'ul',
				{ className: "emotion-images " + this.props.name },
				images.map(function (ele, pos) {
					return _react2.default.createElement(
						'li',
						{ className: 'emotion-image', key: pos, 'data-url': ele.url, 'data-title': ele.title, onClick: handleClick },
						_react2.default.createElement('img', { src: ele.url, title: ele.title, 'data-url': ele.url, 'data-title': ele.title })
					);
				})
			);
		}
	}]);

	return EmotionPanel;
}(_react.Component);

var EmotionDialog = function (_Component2) {
	_inherits(EmotionDialog, _Component2);

	function EmotionDialog(props) {
		_classCallCheck(this, EmotionDialog);

		var _this2 = _possibleConstructorReturn(this, (EmotionDialog.__proto__ || Object.getPrototypeOf(EmotionDialog)).call(this, props));

		_this2.state = {
			handle: function handle() {}
		};
		return _this2;
	}

	_createClass(EmotionDialog, [{
		key: 'open',
		value: function open(handle) {
			this.setState({
				handle: handle
			});
			this.refs.root.open();
		}
	}, {
		key: 'close',
		value: function close() {
			if (this.refs.root) this.refs.root.close();
		}
	}, {
		key: 'toggle',
		value: function toggle(handle) {
			this.setState({
				handle: handle
			});
			this.refs.root.toggle();
		}
	}, {
		key: 'handleSelectImage',
		value: function handleSelectImage(e, img) {
			e = e || event;
			if (this.state.handle) {
				this.state.handle(img);
			}
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			this.close();
		}
	}, {
		key: 'getEmotionTabs',
		value: function getEmotionTabs() {
			var EmotionTabs = _EditorConstants.EmotionImages.EmotionTabs,
			    BaseUrl = _EditorConstants.EmotionImages.BaseUrl,
			    SmileyInfor = _EditorConstants.EmotionImages.SmileyInfor;

			var tabs = [];
			for (var key in EmotionTabs) {
				var tab = { title: EmotionTabs[key].name };
				var images = [];
				var titles = SmileyInfor[key];
				for (var i = 0; i < titles.length; i++) {
					var index = (i + 1).toString();
					index = index.length == 1 ? "0" + index : index;
					var image = {
						title: titles[i],
						url: BaseUrl + EmotionTabs[key].path + EmotionTabs[key].prefix + index + ".gif?v=1.1"
					};
					images.push(image);
				}
				tab.images = images;
				tabs.push(tab);
			}
			return tabs;
		}
	}, {
		key: 'render',
		value: function render() {
			var tabs = [];
			var EmotionTabs = this.getEmotionTabs();

			for (var i = 0; i < EmotionTabs.length; i++) {
				tabs.push({
					title: EmotionTabs[i].title,
					images: EmotionTabs[i].images,
					component: _react2.default.createElement(EmotionPanel, { images: EmotionTabs[i].images, name: 'common-images', onSelectImage: this.handleSelectImage.bind(this) })
				});
			}
			var buttons = [];
			if (this.props.hidden) {
				return _react2.default.createElement('div', null);
			} else {
				return _react2.default.createElement(
					_Dialog2.default,
					{ ref: 'root', className: 'emotion-dropdwon', width: 700, height: 508, title: '\u8868\u60C5', buttons: buttons, onClose: this.close.bind(this) },
					_react2.default.createElement(_TabGroup2.default, { tabs: tabs })
				);
			}
		}
	}]);

	return EmotionDialog;
}(_react.Component);

exports.default = EmotionDialog;