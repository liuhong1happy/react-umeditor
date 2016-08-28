'use strict';

var React = require('react');
var Dropdown = require('../base/Dropdown.react');

var _require = require('../../constants/EditorConstants');

var ColorTypes = _require.ColorTypes;

var EditorDOM = require('../../utils/EditorDOM');
var ColorDropdown = React.createClass({
	displayName: 'ColorDropdown',

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
	handleSelectColor: function handleSelectColor(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var color = target.getAttribute('data-color');
		if (this.state.handle) {
			this.state.handle(e, color);
		}
		this.close();
		EditorDOM.stopPropagation(e);
	},
	render: function render() {
		var handleSelectColor = this.handleSelectColor;
		if (this.props.hidden) {
			return React.createElement('div', null);
		} else {
			return React.createElement(
				Dropdown,
				{ ref: 'root', className: 'color-dropdown' },
				React.createElement(
					'table',
					null,
					React.createElement(
						'tbody',
						null,
						React.createElement(
							'tr',
							{ className: 'title-row', key: "title-row" },
							React.createElement(
								'td',
								{ colSpan: 10 },
								'主题颜色'
							)
						),
						ColorTypes.themeColors.map(function (colors, pos) {
							var firstRow = pos == 0;
							return React.createElement(
								'tr',
								{ key: pos, className: firstRow ? "first-row" : "" },
								colors.map(function (color, index) {
									return React.createElement(
										'td',
										{ key: index },
										React.createElement('a', { className: 'color-anchor', 'data-color': color, style: { "backgroundColor": color }, onClick: handleSelectColor })
									);
								})
							);
						}),
						React.createElement(
							'tr',
							{ className: 'title-row', key: "title-row2" },
							React.createElement(
								'td',
								{ colSpan: 10 },
								'标准颜色'
							)
						),
						React.createElement(
							'tr',
							{ className: 'last-row', key: "last-row" },
							ColorTypes.standardColors.map(function (color, pos) {
								return React.createElement(
									'td',
									{ key: pos },
									React.createElement('a', { className: 'color-anchor', 'data-color': color, style: { "backgroundColor": color }, onClick: handleSelectColor })
								);
							})
						)
					)
				)
			);
		}
	}
});

module.exports = ColorDropdown;