'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ComboBox = require('../base/ComboBox.react');

var FontFamilyDropdown = function (_React$Component) {
	_inherits(FontFamilyDropdown, _React$Component);

	function FontFamilyDropdown(props) {
		_classCallCheck(this, FontFamilyDropdown);

		var _this = _possibleConstructorReturn(this, (FontFamilyDropdown.__proto__ || Object.getPrototypeOf(FontFamilyDropdown)).call(this, props));

		_this.state = {
			handle: function handle() {}
		};
		return _this;
	}

	_createClass(FontFamilyDropdown, [{
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
		key: 'handleSelect',
		value: function handleSelect(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var value = target.getAttribute('data-value');
			if (this.state.handle) {
				this.state.handle(e, value);
			}
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			this.close();
		}
	}, {
		key: 'render',
		value: function render() {
			var handleSelect = this.handleSelect.bind(this);
			var fontfamily = this.props.fontfamily ? this.props.fontfamily : [];
			var props = this.props;
			if (this.props.hidden) {
				return React.createElement('div', null);
			} else {
				return React.createElement(
					ComboBox,
					{ ref: 'root', className: 'fontfamily-combobox' },
					React.createElement(
						'ul',
						null,
						fontfamily.map(function (ele, pos) {
							return React.createElement(
								'li',
								{ className: ele.value == props.value ? "active" : "", key: pos, 'data-value': ele.value, onClick: handleSelect },
								React.createElement(
									'span',
									{ 'data-value': ele.value, style: { "fontFamily": ele.value } },
									ele.name
								)
							);
						})
					)
				);
			}
		}
	}]);

	return FontFamilyDropdown;
}(React.Component);

module.exports = FontFamilyDropdown;