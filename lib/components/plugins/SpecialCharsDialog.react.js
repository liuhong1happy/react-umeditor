'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');

var TabGroup = require('../base/TabGroup.react');
var Dialog = require('../base/Dialog.react');

var _require = require('../../constants/EditorConstants'),
    SpecialChars = _require.SpecialChars;

var SCChars = function (_React$Component) {
	_inherits(SCChars, _React$Component);

	function SCChars() {
		_classCallCheck(this, SCChars);

		return _possibleConstructorReturn(this, (SCChars.__proto__ || Object.getPrototypeOf(SCChars)).apply(this, arguments));
	}

	_createClass(SCChars, [{
		key: 'handleClick',
		value: function handleClick(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var char = target.getAttribute("data-char");
			var id = 'char-' + new Date().valueOf();
			if (this.props.onSelectChar) {
				this.props.onSelectChar(e, char);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var chars = this.props.chars;
			var handleClick = this.handleClick.bind(this);
			return React.createElement(
				'ul',
				{ className: "special-chars " + this.props.name },
				chars.map(function (ele, pos) {
					return React.createElement(
						'li',
						{ className: 'special-char', key: pos, 'data-char': ele, onClick: handleClick },
						ele
					);
				})
			);
		}
	}]);

	return SCChars;
}(React.Component);

var SpecialCharsDialog = function (_React$Component2) {
	_inherits(SpecialCharsDialog, _React$Component2);

	function SpecialCharsDialog(props) {
		_classCallCheck(this, SpecialCharsDialog);

		var _this2 = _possibleConstructorReturn(this, (SpecialCharsDialog.__proto__ || Object.getPrototypeOf(SpecialCharsDialog)).call(this, props));

		_this2.state = {
			handle: function handle() {}
		};
		return _this2;
	}

	_createClass(SpecialCharsDialog, [{
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
		key: 'handleSelectChar',
		value: function handleSelectChar(e, char) {
			e = e || event;
			if (this.state.handle) {
				this.state.handle(e, char);
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
			var tabs = [];
			for (var i = 0; i < SpecialChars.length; i++) {
				tabs.push({
					title: SpecialChars[i].title,
					chars: SpecialChars[i].chars,
					component: React.createElement(SCChars, { chars: SpecialChars[i].chars, name: 'common-chars', onSelectChar: this.handleSelectChar.bind(this) })
				});
			}
			var buttons = [];
			if (this.props.hidden) {
				return React.createElement('div', null);
			} else {
				return React.createElement(
					Dialog,
					{ ref: 'root', className: 'special-chars-dialog', width: 700, height: 508, title: '\u7279\u6B8A\u5B57\u7B26', buttons: buttons, onClose: this.close.bind(this) },
					React.createElement(TabGroup, { tabs: tabs })
				);
			}
		}
	}]);

	return SpecialCharsDialog;
}(React.Component);

module.exports = SpecialCharsDialog;