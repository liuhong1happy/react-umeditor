'use strict';

var React = require('react');
var ComboBox = require('../base/ComboBox.react');

var ParagraphDropdown = React.createClass({
	displayName: 'ParagraphDropdown',

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
		var paragraph = this.props.paragraph ? this.props.paragraph : [];
		var props = this.props;
		if (this.props.hidden) {
			return React.createElement('div', null);
		} else {
			return React.createElement(
				ComboBox,
				{ ref: 'root', className: 'paragraph-combobox' },
				React.createElement(
					'ul',
					null,
					paragraph.map(function (ele, pos) {
						return React.createElement(
							'li',
							{ className: ele.value == props.value ? "active" : "", key: pos, 'data-value': ele.value, onClick: handleSelect },
							React.createElement(ele.value, { "data-value": ele.value }, ele.name)
						);
					})
				)
			);
		}
	}
});

module.exports = ParagraphDropdown;