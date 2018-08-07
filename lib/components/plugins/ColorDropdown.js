'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('../base/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _EditorConstants = require('../../constants/EditorConstants');

var _EditorDOM = require('../../utils/EditorDOM');

var _EditorDOM2 = _interopRequireDefault(_EditorDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorDropdown = function (_React$Component) {
	_inherits(ColorDropdown, _React$Component);

	function ColorDropdown(props) {
		_classCallCheck(this, ColorDropdown);

		var _this = _possibleConstructorReturn(this, (ColorDropdown.__proto__ || Object.getPrototypeOf(ColorDropdown)).call(this, props));

		_this.state = {
			handle: function handle() {}
		};
		return _this;
	}

	_createClass(ColorDropdown, [{
		key: 'open',
		value: function open(position, handle) {
			this.setState({
				handle: handle
			});
			this.refs.root.open(position);
		}
	}, {
		key: 'close',
		value: function close() {
			if (this.refs.root) this.refs.root.close();
		}
	}, {
		key: 'toggle',
		value: function toggle(position, handle) {
			this.setState({
				handle: handle
			});
			this.refs.root.toggle(position);
		}
	}, {
		key: 'handleSelectColor',
		value: function handleSelectColor(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var color = target.getAttribute('data-color');
			if (this.state.handle) {
				this.state.handle(color);
			}
			this.close();
			_EditorDOM2.default.stopPropagation(e);
		}
	}, {
		key: 'render',
		value: function render() {
			var handleSelectColor = this.handleSelectColor.bind(this);
			if (this.props.hidden) {
				return _react2.default.createElement('div', null);
			} else {
				return _react2.default.createElement(
					_Dropdown2.default,
					{ ref: 'root', className: 'color-dropdown' },
					_react2.default.createElement(
						'table',
						null,
						_react2.default.createElement(
							'tbody',
							null,
							_react2.default.createElement(
								'tr',
								{ className: 'title-row', key: "title-row" },
								_react2.default.createElement(
									'td',
									{ colSpan: 10 },
									'\u4E3B\u9898\u989C\u8272'
								)
							),
							_EditorConstants.ColorTypes.themeColors.map(function (colors, pos) {
								var firstRow = pos == 0;
								return _react2.default.createElement(
									'tr',
									{ key: pos, className: firstRow ? "first-row" : "" },
									colors.map(function (color, index) {
										return _react2.default.createElement(
											'td',
											{ key: index },
											_react2.default.createElement('a', { className: 'color-anchor', 'data-color': color, style: { "backgroundColor": color }, onClick: handleSelectColor })
										);
									})
								);
							}),
							_react2.default.createElement(
								'tr',
								{ className: 'title-row', key: "title-row2" },
								_react2.default.createElement(
									'td',
									{ colSpan: 10 },
									'\u6807\u51C6\u989C\u8272'
								)
							),
							_react2.default.createElement(
								'tr',
								{ className: 'last-row', key: "last-row" },
								_EditorConstants.ColorTypes.standardColors.map(function (color, pos) {
									return _react2.default.createElement(
										'td',
										{ key: pos },
										_react2.default.createElement('a', { className: 'color-anchor', 'data-color': color, style: { "backgroundColor": color }, onClick: handleSelectColor })
									);
								})
							)
						)
					)
				);
			}
		}
	}]);

	return ColorDropdown;
}(_react2.default.Component);

exports.default = ColorDropdown;