'use strict';

var React = require('react');
var ComboBox = require('../base/ComboBox.react');

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
		if (this.refs.root) this.refs.root.close();
	},
	toggle: function toggle(position, handle) {
		this.setState({
			handle: handle
		});
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
});

module.exports = FontFamilyDropdown;