"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var TabGroup = function (_React$Component) {
	_inherits(TabGroup, _React$Component);

	function TabGroup(props) {
		_classCallCheck(this, TabGroup);

		var _this = _possibleConstructorReturn(this, (TabGroup.__proto__ || Object.getPrototypeOf(TabGroup)).call(this, props));

		_this.state = {
			tabIndex: 0
		};
		return _this;
	}

	_createClass(TabGroup, [{
		key: "setTabIndex",
		value: function setTabIndex(index) {
			this.setState({
				tabIndex: index
			});
		}
	}, {
		key: "getTabIndex",
		value: function getTabIndex() {
			return this.state.tabIndex;
		}
	}, {
		key: "handleClick",
		value: function handleClick(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var index = parseInt(target.getAttribute("data-index"));
			this.setTabIndex(index);
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
		}
	}, {
		key: "render",
		value: function render() {
			var tabIndex = this.state.tabIndex;
			var tabs = this.props.tabs || [];
			var component = tabs[tabIndex] ? tabs[tabIndex].component : "";
			var handleClick = this.handleClick.bind(this);
			return React.createElement(
				"div",
				{ className: "tab-group" },
				React.createElement(
					"ul",
					{ className: "tab-nav" },
					tabs.map(function (ele, pos) {
						return React.createElement(
							"li",
							{ key: pos, className: "tab-item" + (tabIndex == pos ? " active" : "") },
							React.createElement(
								"a",
								{ "data-index": pos, className: "tab-text", onClick: handleClick },
								ele.title
							)
						);
					})
				),
				React.createElement(
					"div",
					{ className: "tab-content" },
					component
				)
			);
		}
	}]);

	return TabGroup;
}(React.Component);

module.exports = TabGroup;