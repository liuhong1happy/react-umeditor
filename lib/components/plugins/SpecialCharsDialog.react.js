'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TabGroup = require('../base/TabGroup.react');
var Dialog = require('../base/Dialog.react');

var _require = require('../../constants/EditorConstants');

var SpecialChars = _require.SpecialChars;

var SCChars = React.createClass({
	displayName: 'SCChars',

	handleClick: function handleClick(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var char = target.getAttribute("data-char");
		var id = 'char-' + new Date().valueOf();
		if (this.props.onSelectChar) {
			this.props.onSelectChar(e, char);
		}
	},
	render: function render() {
		var chars = this.props.chars;
		var handleClick = this.handleClick;
		return React.createElement(
			'ul',
			{ className: "special-chars " + this.props.name },
			chars.map(function (ele, pos) {
				return React.createElement(
					'li',
					{ className: 'special-char', key: pos, 'data-char': ele, onClick: handleClick },
					ele
				);
			})
		);
	}
});

var SpecialCharsDialog = React.createClass({
	displayName: 'SpecialCharsDialog',

	getInitialState: function getInitialState() {
		return {
			handle: function handle() {}
		};
	},
	open: function open(handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.open();
	},
	close: function close() {
		if (this.refs.root) this.refs.root.close();
	},
	toggle: function toggle(handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.toggle();
	},
	handleSelectChar: function handleSelectChar(e, char) {
		e = e || event;
		if (this.state.handle) {
			this.state.handle(e, char);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	render: function render() {
		var tabs = [];
		for (var i = 0; i < SpecialChars.length; i++) {
			tabs.push({
				title: SpecialChars[i].title,
				chars: SpecialChars[i].chars,
				component: React.createElement(SCChars, { chars: SpecialChars[i].chars, name: 'common-chars', onSelectChar: this.handleSelectChar })
			});
		}
		var buttons = [];
		if (this.props.hidden) {
			return React.createElement('div', null);
		} else {
			return React.createElement(
				Dialog,
				{ ref: 'root', className: 'special-chars-dialog', width: 700, height: 508, title: '特殊字符', buttons: buttons, onClose: this.close },
				React.createElement(TabGroup, { tabs: tabs })
			);
		}
	}
});

module.exports = SpecialCharsDialog;