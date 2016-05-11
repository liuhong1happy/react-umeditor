"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');

/**
* @width: 对话框宽度
* @height: 对话框高度
* @style: 样式
* @buttons: 对话框按钮组
* @title: 对话框标题
**/
var Dialog = React.createClass({
	displayName: "Dialog",

	getInitialState: function getInitialState() {
		return {
			show: false
		};
	},
	open: function open() {
		this.setState({
			show: true
		});
	},
	close: function close() {
		this.setState({
			show: false
		});
	},
	toggle: function toggle() {
		this.setState({
			show: !this.state.show
		});
	},
	render: function render() {
		var _props = this.props;

		var props = _objectWithoutProperties(_props, []);

		var buttons = _props.buttons;
		var title = _props.title;
		var style = _props.style;
		var width = _props.width;
		var height = _props.height;

		var style = style ? style : {};
		if (width) {
			style.width = width;
			style.marginLeft = width / 2;
		}
		if (height) {
			style.height = height;
		}
		style.display = this.state.show ? "" : "none";

		return React.createElement(
			"div",
			{ className: "dialog-container", ref: "root" },
			React.createElement(
				"div",
				_extends({ className: "dialog" }, props, { ref: "dialog", style: style }),
				React.createElement(
					"div",
					{ className: "dialog-header", ref: "header" },
					React.createElement(
						"h3",
						{ className: "dialog-title" },
						title
					),
					React.createElement(
						"a",
						{ className: "dialog-close", onClick: this.props.onClose },
						"×"
					)
				),
				React.createElement(
					"div",
					{ className: "dialog-body", ref: "body" },
					this.props.children
				),
				React.createElement(
					"div",
					{ className: "dialog-footer", ref: "footer" },
					buttons.map(function (ele, pos) {
						return React.createElement(
							"a",
							{ className: "dialog-button", key: pos, "data-name": ele.name, onClick: ele.onClick },
							ele.content
						);
					})
				)
			),
			React.createElement("div", { className: "dialog-backdrop", ref: "backdrop" })
		);
	}
});

module.exports = Dialog;