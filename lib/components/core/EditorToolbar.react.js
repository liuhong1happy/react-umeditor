'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var EditorIcon = require('./EditorIcon.react');
var EditorDOM = require('../../utils/EditorDOM');

var _require = require('../../constants/EditorConstants'),
    EditorIconTypes = _require.EditorIconTypes;

var EditorHistory = require('../../utils/EditorHistory');

var EditorToolbar = function (_React$Component) {
	_inherits(EditorToolbar, _React$Component);

	function EditorToolbar() {
		_classCallCheck(this, EditorToolbar);

		return _possibleConstructorReturn(this, (EditorToolbar.__proto__ || Object.getPrototypeOf(EditorToolbar)).apply(this, arguments));
	}

	_createClass(EditorToolbar, [{
		key: 'handleIconClick',
		value: function handleIconClick(e, state) {
			if (this.props.onIconClick) {
				this.props.onIconClick(e, state);
			}
		}
	}, {
		key: 'getNameByValue',
		value: function getNameByValue(arr, value) {
			var filterArr = arr.filter(function (ele, pos) {
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
			editorState.icons["undo"] = { disabled: !EditorHistory.canUndo() };
			editorState.icons["redo"] = { disabled: !EditorHistory.canRedo() };
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
				returnArray[i] = EditorIconTypes[_icons[i]];
				returnArray[i].onClick = this.handleIconClick.bind(this);
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
			return React.createElement(
				'div',
				{ className: 'editor-toolbar', onMouseDown: EditorDOM.stopPropagation, onClick: EditorDOM.stopPropagation },
				icons.map(function (icon, pos) {
					var props = icon;
					return React.createElement(EditorIcon, _extends({ key: pos }, props));
				}),
				this.props.children
			);
		}
	}]);

	return EditorToolbar;
}(React.Component);

EditorToolbar.propTypes = {
	icons: React.PropTypes.array
};
EditorToolbar.defaultProps = {
	icons: []
};

module.exports = EditorToolbar;