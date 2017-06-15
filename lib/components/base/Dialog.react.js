"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

/**
 * @width: 对话框宽度
 * @height: 对话框高度
 * @style: 样式
 * @buttons: 对话框按钮组
 * @title: 对话框标题
 * @className: 对话框类名
 **/

var Dialog = function (_React$Component) {
  _inherits(Dialog, _React$Component);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

    _this.state = {
      show: false
    };
    return _this;
  }

  _createClass(Dialog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("click", this.close.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("click", this.close.bind(this));
    }
  }, {
    key: "open",
    value: function open() {
      this.setState({
        show: true
      });
    }
  }, {
    key: "close",
    value: function close() {
      if (!this.state.show) return;
      this.setState({
        show: false
      });
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.setState({
        show: !this.state.show
      });
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      e = e || event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          className = _props.className,
          buttons = _props.buttons,
          title = _props.title,
          style = _props.style,
          width = _props.width,
          height = _props.height,
          onClose = _props.onClose,
          children = _props.children;

      style = style ? style : {};
      if (width) {
        style.width = width;
        style.marginLeft = -width / 2;
      }
      if (height) {
        style.height = height;
      }
      style.display = this.state.show ? "" : "none";
      var _className = "dialog" + (className ? " " + className : "");
      return React.createElement(
        "div",
        { className: "dialog-container", ref: "root", onMouseDown: this.handleMouseDown.bind(this) },
        React.createElement(
          "div",
          { className: _className, ref: "dialog", style: style },
          React.createElement(
            "div",
            { className: "dialog-header", ref: "header" },
            React.createElement("a", { className: "dialog-close", onClick: onClose }),
            React.createElement(
              "h3",
              { className: "dialog-title" },
              title
            )
          ),
          React.createElement(
            "div",
            { className: "dialog-body", ref: "body" },
            children
          ),
          React.createElement(
            "div",
            { className: "dialog-footer", ref: "footer" },
            buttons.map(function (ele, pos) {
              return React.createElement(
                "a",
                { className: "dialog-button",
                  key: pos,
                  "data-name": ele.name,
                  onClick: ele.onClick },
                ele.content
              );
            })
          )
        ),
        React.createElement("div", { className: "dialog-backdrop", ref: "backdrop", style: { "display": this.state.show ? "" : "none" } })
      );
    }
  }]);

  return Dialog;
}(React.Component);

module.exports = Dialog;