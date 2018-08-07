'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FormulaIcons = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TabGroup = require('../base/TabGroup');

var _TabGroup2 = _interopRequireDefault(_TabGroup);

var _Dropdown = require('../base/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _EditorConstants = require('../../constants/EditorConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormulaIcons = exports.FormulaIcons = function (_Component) {
	_inherits(FormulaIcons, _Component);

	function FormulaIcons() {
		_classCallCheck(this, FormulaIcons);

		return _possibleConstructorReturn(this, (FormulaIcons.__proto__ || Object.getPrototypeOf(FormulaIcons)).apply(this, arguments));
	}

	_createClass(FormulaIcons, [{
		key: 'handleClick',
		value: function handleClick(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var latex = target.getAttribute("data-latex");
			var id = 'mathquill-' + new Date().valueOf();
			if (this.props.onSelectFormula) {
				this.props.onSelectFormula(latex, id);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var icons = this.props.icons;
			var handleClick = this.handleClick.bind(this);
			return _react2.default.createElement(
				'ul',
				{ className: "formulas-icons " + this.props.name },
				icons.map(function (ele, pos) {
					return _react2.default.createElement('li', { className: 'latex-icon', key: pos, 'data-latex': ele.latex, style: { "backgroundPosition": ele.backgroundPosition }, onClick: handleClick });
				})
			);
		}
	}]);

	return FormulaIcons;
}(_react.Component);

var FormulaDropdown = function (_React$Component) {
	_inherits(FormulaDropdown, _React$Component);

	function FormulaDropdown(props) {
		_classCallCheck(this, FormulaDropdown);

		var _this2 = _possibleConstructorReturn(this, (FormulaDropdown.__proto__ || Object.getPrototypeOf(FormulaDropdown)).call(this, props));

		_this2.state = {
			handle: function handle() {}
		};
		return _this2;
	}

	_createClass(FormulaDropdown, [{
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
		key: 'handleSelectFormula',
		value: function handleSelectFormula(e, latex, id) {
			e = e || event;
			if (this.state.handle) {
				this.state.handle(latex, id);
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
			var tabs = [{ title: "常用公式", component: _react2.default.createElement(FormulaIcons, { icons: _EditorConstants.FormulaTypes.commonFormulas, name: 'common-formulas', onSelectFormula: this.handleSelectFormula.bind(this) }) }, { title: "符号", component: _react2.default.createElement(FormulaIcons, { icons: _EditorConstants.FormulaTypes.symbolFormulas, name: 'symbol-formulas', onSelectFormula: this.handleSelectFormula.bind(this) }) }, { title: "字母", component: _react2.default.createElement(FormulaIcons, { icons: _EditorConstants.FormulaTypes.arabicFormulas, name: 'arabic-formulas', onSelectFormula: this.handleSelectFormula.bind(this) }) }];
			if (this.props.hidden) {
				return _react2.default.createElement('div', null);
			} else {
				return _react2.default.createElement(
					_Dropdown2.default,
					{ ref: 'root', className: 'formula-dropdown' },
					_react2.default.createElement(_TabGroup2.default, { tabs: tabs })
				);
			}
		}
	}]);

	return FormulaDropdown;
}(_react2.default.Component);

exports.default = FormulaDropdown;


module.exports = FormulaDropdown;