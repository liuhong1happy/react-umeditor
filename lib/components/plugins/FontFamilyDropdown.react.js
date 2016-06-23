'use strict';

var React = require('react');
var Dropdown = require('../base/Dropdown.react');

var FontFamilyDropdown = React.createClass({
	displayName: 'FontFamilyDropdown',

	getInitialState: function getInitialState() {
		return {
			handle: function handle() {}
		};
	},
	open: function open(position, handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.open(position);
	},
	close: function close() {
		this.refs.root.close();
	},
	toggle: function toggle(position) {
		this.refs.root.toggle(position);
	},
	handleSelect: function handleSelect(e) {
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
	},
	render: function render() {
		var handleSelect = this.handleSelect;
		var paragraph = this.props.paragraph ? this.props.paragraph : [];
		return React.createElement(
			Dropdown,
			{ ref: 'root', className: 'color-dropdown' },
			React.createElement(
				'ul',
				null,
				paragraph.map(function (ele, pos) {
					return React.createElement(
						'li',
						{ 'data-value': ele.value, onClick: handleSelect },
						React.createElement(
							'p',
							{ 'data-value': ele.value, style: { "fontFamily": ele.value } },
							ele.name
						)
					);
				})
			)
		);
	}
});

module.exports = FontFamilyDropdown;