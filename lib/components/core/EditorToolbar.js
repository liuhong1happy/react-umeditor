'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _EditorIcon = require('./EditorIcon');

var _EditorIcon2 = _interopRequireDefault(_EditorIcon);

var _EditorDOM = require('../../utils/EditorDOM');

var _EditorDOM2 = _interopRequireDefault(_EditorDOM);

var _EditorConstants = require('../../constants/EditorConstants');

var _EditorHistory = require('../../utils/EditorHistory');

var _EditorHistory2 = _interopRequireDefault(_EditorHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditorToolbar = function (_React$Component) {
	_inherits(EditorToolbar, _React$Component);

	function EditorToolbar() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, EditorToolbar);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditorToolbar.__proto__ || Object.getPrototypeOf(EditorToolbar)).call.apply(_ref, [this].concat(args))), _this), _this.handleIconClick = function (e, state) {
			if (_this.props.onIconClick) {
				_this.props.onIconClick(e, state);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(EditorToolbar, [{
		key: 'getNameByValue',
		value: function getNameByValue(arr, value) {
			var filterArr = arr.filter(function (ele) {
				return ele.value == value;
			});
			if (filterArr.length > 0) {
				return filterArr[0].name;
			} else {
				return "";
			}
		}
	}, {
		key: 'getIcons',
		value: function getIcons() {
			var editorState = this.props.editorState;
			editorState.icons["undo"] = { disabled: !_EditorHistory2.default.canUndo() };
			editorState.icons["redo"] = { disabled: !_EditorHistory2.default.canRedo() };
			if (editorState.icons["fontsize"]) editorState.icons["fontsize"].name = this.getNameByValue(this.props.fontsize, editorState.icons["fontsize"].value);
			if (editorState.icons["paragraph"]) editorState.icons["paragraph"].name = this.getNameByValue(this.props.paragraph, editorState.icons["paragraph"].value);
			if (editorState.icons["fontfamily"]) editorState.icons["fontfamily"].name = this.getNameByValue(this.props.fontfamily, editorState.icons["fontfamily"].value);

			var icons = this.props.icons;
			var _icons = icons.join(" ").replace(/\|/gm, "separator").split(" ");
			_icons = _icons.filter(function (ico) {
				return ico != "";
			});
			var returnArray = [];
			for (var i = 0; i < _icons.length; i++) {
				returnArray[i] = _EditorConstants.EditorIconTypes[_icons[i]];
				returnArray[i].onClick = this.handleIconClick;
				returnArray[i].icon = _icons[i];
				if (editorState.icons[_icons[i]]) {
					returnArray[i].disabled = !!editorState.icons[_icons[i]].disabled;
					returnArray[i].active = !!editorState.icons[_icons[i]].active;
					returnArray[i].color = editorState.icons[_icons[i]].color;
					returnArray[i].value = editorState.icons[_icons[i]].value;
					returnArray[i].name = editorState.icons[_icons[i]].name;
				}
				returnArray[i].showHtml = !!editorState.showHtml;
			}
			return returnArray;
		}
	}, {
		key: 'render',
		value: function render() {
			var icons = this.getIcons();
			return _react2.default.createElement(
				'div',
				{ className: 'editor-toolbar', onMouseDown: _EditorDOM2.default.stopPropagation, onClick: _EditorDOM2.default.stopPropagation },
				icons.map(function (icon, pos) {
					var props = icon;
					return _react2.default.createElement(_EditorIcon2.default, _extends({ key: pos }, props));
				}),
				this.props.children
			);
		}
	}]);

	return EditorToolbar;
}(_react2.default.Component);

exports.default = EditorToolbar;


EditorToolbar.propTypes = {
	icons: _propTypes2.default.array
};
EditorToolbar.defaultProps = {
	icons: []
};