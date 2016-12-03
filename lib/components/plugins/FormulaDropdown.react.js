'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');

var TabGroup = require('../base/TabGroup.react');
var Dropdown = require('../base/Dropdown.react');

var _require = require('../../constants/EditorConstants'),
    FormulaTypes = _require.FormulaTypes;

var FormulaIcons = function (_React$Component) {
	_inherits(FormulaIcons, _React$Component);

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
				this.props.onSelectFormula(e, latex, id);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var icons = this.props.icons;
			var handleClick = this.handleClick.bind(this);
			return React.createElement(
				'ul',
				{ className: "formulas-icons " + this.props.name },
				icons.map(function (ele, pos) {
					return React.createElement('li', { className: 'latex-icon', key: pos, 'data-latex': ele.latex, style: { "backgroundPosition": ele.backgroundPosition }, onClick: handleClick });
				})
			);
		}
	}]);

	return FormulaIcons;
}(React.Component);

var FormulaDropdown = function (_React$Component2) {
	_inherits(FormulaDropdown, _React$Component2);

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
				this.state.handle(e, latex, id);
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
			var tabs = [{ title: "常用公式", component: React.createElement(FormulaIcons, { icons: FormulaTypes.commonFormulas, name: 'common-formulas', onSelectFormula: this.handleSelectFormula.bind(this) }) }, { title: "符号", component: React.createElement(FormulaIcons, { icons: FormulaTypes.symbolFormulas, name: 'symbol-formulas', onSelectFormula: this.handleSelectFormula.bind(this) }) }, { title: "字母", component: React.createElement(FormulaIcons, { icons: FormulaTypes.arabicFormulas, name: 'arabic-formulas', onSelectFormula: this.handleSelectFormula.bind(this) }) }];
			if (this.props.hidden) {
				return React.createElement('div', null);
			} else {
				return React.createElement(
					Dropdown,
					{ ref: 'root', className: 'formula-dropdown' },
					React.createElement(TabGroup, { tabs: tabs })
				);
			}
		}
	}]);

	return FormulaDropdown;
}(React.Component);

module.exports = FormulaDropdown;