'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('../base/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TablePickerDropdown = function (_Component) {
  _inherits(TablePickerDropdown, _Component);

  function TablePickerDropdown(props) {
    _classCallCheck(this, TablePickerDropdown);

    var _this = _possibleConstructorReturn(this, (TablePickerDropdown.__proto__ || Object.getPrototypeOf(TablePickerDropdown)).call(this, props));

    _this.state = {
      row: 0,
      column: 0,
      handle: function handle() {}
    };
    return _this;
  }

  _createClass(TablePickerDropdown, [{
    key: 'open',
    value: function open(position, handle) {
      this.setState({
        handle: handle
      });
      this.refs.root.open(position);
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.refs.root) this.refs.root.close();
    }
  }, {
    key: 'toggle',
    value: function toggle(position, handle) {
      this.setState({
        handle: handle
      });
      this.refs.root.toggle(position);
    }
  }, {
    key: 'handleMouseEvent',
    value: function handleMouseEvent(e) {
      e = e || event;
      var target = e.target || e.srcElement;
      var parentPostion = target.getBoundingClientRect();
      var column = Math.ceil((e.clientX - parentPostion.left) / 22);
      var row = Math.ceil((e.clientY - parentPostion.top) / 22);
      if (row < 0) row = 0;
      if (column < 0) column = 0;

      if (row > 10) row = 10;
      if (column > 10) column = 10;
      this.setState({
        row: row,
        column: column
      });
    }
  }, {
    key: 'handleMouseOut',
    value: function handleMouseOut(e) {
      this.setState({
        row: 0,
        column: 0
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      // insert table
      var Table = document.createElement("table");
      Table.className = "editor-table";
      var TBody = Table.createTBody();
      for (var i = 0; i < this.state.row; i++) {
        var Tr = TBody.insertRow();
        for (var j = 0; j < this.state.column; j++) {
          var Td = Tr.insertCell();
          Td.width = 200;
        }
      }
      this.state.handle(Table);
      this.refs.root.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var row = this.state.row;
      var column = this.state.column;
      if (this.props.hidden) {
        return _react2.default.createElement('div', null);
      } else {
        return _react2.default.createElement(
          _Dropdown2.default,
          { ref: 'root', className: 'tablepicker-dropdown' },
          _react2.default.createElement(
            'div',
            { className: 'infoarea' },
            ' ',
            _react2.default.createElement(
              'span',
              null,
              row + "行 x " + column + "列"
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'pickarea', onMouseOver: this.handleMouseEvent.bind(this), onMouseMove: this.handleMouseEvent.bind(this),
              onMouseOut: this.handleMouseOut.bind(this), onClick: this.handleClick.bind(this) },
            _react2.default.createElement('div', { className: 'overlay', style: { width: column * 22, height: row * 22 } })
          )
        );
      }
    }
  }]);

  return TablePickerDropdown;
}(_react.Component);

exports.default = TablePickerDropdown;