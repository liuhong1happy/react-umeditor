require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Editor = require('react-umeditor');

// other form control
var FormPanel = React.createClass({
	displayName: 'FormPanel',

	getInitialState: function getInitialState() {
		return {
			value: this.props.value
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (this.props.value != nextProps.value) {
			this.setState({
				value: nextProps.value
			});
		}
	},
	getValue: function getValue() {
		return this.state.value;
	},
	handleChange: function handleChange(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		this.setState({
			value: target.value
		});
	},
	render: function render() {
		var value = this.state.value;
		return React.createElement('input', { type: 'text', value: value, onChange: this.handleChange, style: { "marginBottom": "10px" } });
	}
});

var App = React.createClass({
	displayName: 'App',

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(FormPanel, { value: '123' }),
			React.createElement(Editor, null)
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('react-container'));

},{"react":undefined,"react-dom":undefined,"react-umeditor":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2xpdWhvbmcvd29ya2Rpci9yZWFjdC1lZGl0b3IvZXhhbXBsZS9zcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3BDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzs7QUFHdkMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ2pDLGdCQUFlLEVBQUMsMkJBQVU7QUFDekIsU0FBTztBQUNOLFFBQUssRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7R0FDdEIsQ0FBQTtFQUNEO0FBQ0QsMEJBQXlCLEVBQUMsbUNBQVMsU0FBUyxFQUFDO0FBQzVDLE1BQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLEtBQUssRUFBQztBQUN0QyxPQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsU0FBSyxFQUFDLFNBQVMsQ0FBQyxLQUFLO0lBQ3JCLENBQUMsQ0FBQTtHQUNGO0VBQ0Q7QUFDRCxTQUFRLEVBQUMsb0JBQVU7QUFDbEIsU0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztFQUN4QjtBQUNELGFBQVksRUFBQyxzQkFBUyxDQUFDLEVBQUM7QUFDdkIsR0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUM7QUFDZixNQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFDdEMsTUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLFFBQUssRUFBQyxNQUFNLENBQUMsS0FBSztHQUNsQixDQUFDLENBQUE7RUFDRjtBQUNELE9BQU0sRUFBQyxrQkFBVTtBQUNoQixNQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztBQUM3QixTQUFRLCtCQUFPLElBQUksRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFFLEtBQUssQUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxBQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUMsY0FBYyxFQUFDLE1BQU0sRUFBQyxBQUFDLEdBQUcsQ0FBQztFQUN6RztDQUNELENBQUMsQ0FBQTs7QUFFRixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDM0IsT0FBTSxFQUFDLGtCQUFVO0FBQ2hCLFNBQVE7OztHQUNOLG9CQUFDLFNBQVMsSUFBQyxLQUFLLEVBQUMsS0FBSyxHQUFFO0dBQ3hCLG9CQUFDLE1BQU0sT0FBRztHQUNGLENBQUM7RUFDWDtDQUNELENBQUMsQ0FBQTs7QUFFRixRQUFRLENBQUMsTUFBTSxDQUFDLG9CQUFDLEdBQUcsT0FBRyxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbnZhciBFZGl0b3IgPSByZXF1aXJlKCdyZWFjdC11bWVkaXRvcicpO1xuXG4vLyBvdGhlciBmb3JtIGNvbnRyb2xcbnZhciBGb3JtUGFuZWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZTp0aGlzLnByb3BzLnZhbHVlXG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOmZ1bmN0aW9uKG5leHRQcm9wcyl7XG5cdFx0aWYodGhpcy5wcm9wcy52YWx1ZSAhPSBuZXh0UHJvcHMudmFsdWUpe1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdHZhbHVlOm5leHRQcm9wcy52YWx1ZVxuXHRcdFx0fSlcblx0XHR9XG5cdH0sXG5cdGdldFZhbHVlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUudmFsdWU7XG5cdH0sXG5cdGhhbmRsZUNoYW5nZTpmdW5jdGlvbihlKXtcblx0XHRlID0gZSB8fCBldmVudDtcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0dmFsdWU6dGFyZ2V0LnZhbHVlXG5cdFx0fSlcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHZhbHVlID0gdGhpcy5zdGF0ZS52YWx1ZTtcblx0XHRyZXR1cm4gKDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXt2YWx1ZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSBzdHlsZT17e1wibWFyZ2luQm90dG9tXCI6XCIxMHB4XCJ9fSAvPilcblx0fVxufSlcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuICg8ZGl2PlxuXHRcdFx0XHQ8Rm9ybVBhbmVsIHZhbHVlPVwiMTIzXCIvPlxuXHRcdFx0XHQ8RWRpdG9yIC8+XG5cdFx0XHQgICA8L2Rpdj4pXG5cdH1cbn0pXG5cdFxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWFjdC1jb250YWluZXInKSk7Il19
