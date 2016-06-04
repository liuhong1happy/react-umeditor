"use strict";

var React = require('react');

var TabGroup = React.createClass({
	displayName: "TabGroup",

	getInitialState: function getInitialState() {
		return {
			tabIndex: 0
		};
	},
	setTabIndex: function setTabIndex(index) {
		this.setState({
			tabIndex: index
		});
	},
	getTabIndex: function getTabIndex() {
		return this.state.tabIndex;
	},
	handleClick: function handleClick(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var index = parseInt(target.getAttribute("data-index"));
		this.setTabIndex(index);
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},
	render: function render() {
		var tabIndex = this.state.tabIndex;
		var tabs = this.props.tabs;
		var component = tabs[tabIndex].component;
		var handleClick = this.handleClick;
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
});

module.exports = TabGroup;