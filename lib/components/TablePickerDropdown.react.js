'use strict';

var React = require('react');
var Dropdown = require('./Dropdown.react');

var TablePickerDropdown = React.createClass({
    displayName: 'TablePickerDropdown',

    getInitialState: function getInitialState() {
        return {
            row: 0,
            column: 0,
            handle: function handle() {},
            position: { x: 0, y: 0 }
        };
    },
    open: function open(position, handle) {
        this.setState({
            handle: handle,
            position: position
        });
        this.refs.root.open(position);
    },
    close: function close() {
        this.refs.root.close();
    },
    toggle: function toggle(position) {
        this.refs.root.toggle(position);
    },
    handleMouseEvent: function handleMouseEvent(e) {
        e = e || event;
        var row = Math.ceil((e.clientX - this.state.position.x - 20) / 22);
        var column = Math.ceil((e.clientY - this.state.position.y - 35) / 22);
        if (row < 0) row = 0;
        if (column < 0) column = 0;

        if (row > 10) row = 10;
        if (column > 10) column = 10;
        this.setState({
            row: row,
            column: column
        });
    },
    handleMouseOut: function handleMouseOut(e) {
        this.setState({
            row: 0,
            column: 0
        });
    },
    handleClick: function handleClick(e) {
        // insert table
        var Table = document.createElement("table");
        var TBody = Table.createTBody();
        for (var i = 0; i < this.state.row; i++) {
            var Tr = TBody.insertRow();
            for (var j = 0; j < this.state.column; j++) {
                var Td = Tr.insertCell();
                Td.width = 200;
            }
        }
        this.state.handle(e, Table.outerHTML);
        this.refs.root.close();
    },
    render: function render() {
        var row = this.state.row;
        var column = this.state.column;

        return React.createElement(
            Dropdown,
            { ref: 'root', className: 'tablepicker-dropdown' },
            React.createElement(
                'div',
                { className: 'infoarea' },
                ' ',
                React.createElement(
                    'span',
                    null,
                    column + "列 x " + row + "行"
                )
            ),
            React.createElement(
                'div',
                { className: 'pickarea', onMouseOver: this.handleMouseEvent, onMouseMove: this.handleMouseEvent,
                    onMouseOut: this.handleMouseOut, onClick: this.handleClick },
                React.createElement('div', { className: 'overlay', style: { width: row * 22, height: column * 22 } })
            )
        );
    }
});

module.exports = TablePickerDropdown;