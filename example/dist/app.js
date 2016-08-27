require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Editor = require('react-umeditor');

var App = React.createClass({
	displayName: 'App',

	getIcons: function getIcons() {
		return ["source | undo redo | bold italic underline strikethrough fontborder | ", "paragraph fontfamily fontsize | superscript subscript | ", "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ", "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ", "horizontal date time  | image formula spechars | inserttable"];
	},
	getQiniuUploader: function getQiniuUploader() {
		return {
			url: 'http://upload.qiniu.com',
			type: 'qiniu',
			name: "file",
			qiniu: {
				app: {
					Bucket: "liuhong1happy",
					AK: "l9vEBNTqrz7H03S-SC0qxNWmf0K8amqP6MeYHNni",
					SK: "eizTTxuA0Kq1YSe2SRdOexJ-tjwGpRnzztsSrLKj"
				},
				domain: "http://o9sa2vijj.bkt.clouddn.com",
				genKey: function genKey(options) {
					return options.file.type + "-" + options.file.size + "-" + options.file.lastModifiedDate.valueOf() + "-" + new Date().valueOf() + "-" + options.file.name;
				}
			}
		};
	},
	render: function render() {
		var icons = this.getIcons();
		var uploader = this.getQiniuUploader();
		var plugins = {
			image: {
				uploader: uploader
			}
		};
		var count = 100;
		var editors = [];
		for (var i = 0; i < count; i++) {
			editors.push({
				icons: icons,
				plugins: plugins
			});
		}

		//		return (<div>{
		//			editors.map(function(ele,pos){
		//				return (<Editor key={pos} icons={ele.icons} plugins={ele.plugins} />)
		//			})
		//		}</div>);

		return React.createElement(Editor, { icons: icons, plugins: plugins });
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('react-container'));


},{"react":undefined,"react-dom":undefined,"react-umeditor":undefined}]},{},[1]);
