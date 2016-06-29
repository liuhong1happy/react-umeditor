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
	render: function render() {
		var icons = this.getIcons();
		return React.createElement(Editor, { icons: icons });
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('react-container'));

},{"react":undefined,"react-dom":undefined,"react-umeditor":undefined}]},{},[1]);
