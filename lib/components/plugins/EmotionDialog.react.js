'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TabGroup = require('../base/TabGroup.react');
var Dialog = require('../base/Dialog.react');

var _require = require('../../constants/EditorConstants');

var EmotionImages = _require.EmotionImages;

var EmotionPanel = React.createClass({
	displayName: 'EmotionPanel',

	handleClick: function handleClick(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var url = target.getAttribute("data-url");
		var title = target.getAttribute("data-title");

		if (this.props.onSelectImage) {
			var img = document.createElement('img');
			img.src = url;
			img.title = title;
			this.props.onSelectImage(e, img);
		}
	},
	render: function render() {
		var images = this.props.images;
		var handleClick = this.handleClick;
		return React.createElement(
			'ul',
			{ className: "emotion-images " + this.props.name },
			images.map(function (ele, pos) {
				return React.createElement(
					'li',
					{ className: 'emotion-image', key: pos, 'data-url': ele.url, 'data-title': ele.title, onClick: handleClick },
					React.createElement('img', { src: ele.url, title: ele.title, 'data-url': ele.url, 'data-title': ele.title })
				);
			})
		);
	}
});

var EmotionDialog = React.createClass({
	displayName: 'EmotionDialog',

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
	handleSelectImage: function handleSelectImage(e, img) {
		e = e || event;
		if (this.state.handle) {
			this.state.handle(e, img);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	getEmotionTabs: function getEmotionTabs() {
		var EmotionTabs = EmotionImages.EmotionTabs;
		var BaseUrl = EmotionImages.BaseUrl;
		var SmileyInfor = EmotionImages.SmileyInfor;

		var tabs = [];
		for (var key in EmotionTabs) {
			var tab = { title: EmotionTabs[key].name };
			var images = [];
			var titles = SmileyInfor[key];
			for (var i = 0; i < titles.length; i++) {
				var index = (i + 1).toString();
				index = index.length == 1 ? "0" + index : index;
				var image = {
					title: titles[i],
					url: BaseUrl + EmotionTabs[key].path + EmotionTabs[key].prefix + index + ".gif?v=1.1"
				};
				images.push(image);
			}
			tab.images = images;
			tabs.push(tab);
		}
		return tabs;
	},
	render: function render() {
		var tabs = [];
		var EmotionTabs = this.getEmotionTabs();

		for (var i = 0; i < EmotionTabs.length; i++) {
			tabs.push({
				title: EmotionTabs[i].title,
				images: EmotionTabs[i].images,
				component: React.createElement(EmotionPanel, { images: EmotionTabs[i].images, name: 'common-images', onSelectImage: this.handleSelectImage })
			});
		}
		var buttons = [];
		if (this.props.hidden) {
			return React.createElement('div', null);
		} else {
			return React.createElement(
				Dialog,
				{ ref: 'root', className: 'emotion-dropdwon', width: 700, height: 508, title: '表情', buttons: buttons, onClose: this.close },
				React.createElement(TabGroup, { tabs: tabs })
			);
		}
	}
});

module.exports = EmotionDialog;