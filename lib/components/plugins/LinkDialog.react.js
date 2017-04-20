'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');

var Dialog = require('../base/Dialog.react');

var LinkDialog = function (_React$Component) {
  _inherits(LinkDialog, _React$Component);

  function LinkDialog(props) {
    _classCallCheck(this, LinkDialog);

    var _this = _possibleConstructorReturn(this, (LinkDialog.__proto__ || Object.getPrototypeOf(LinkDialog)).call(this, props));

    _this.state = {
      handle: function handle() {}
    };
    return _this;
  }

  _createClass(LinkDialog, [{
    key: 'open',
    value: function open(handle) {
      this.setState({
        handle: handle
      });
      this.refs.modal.open();
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.refs.modal) {
        this.refs.modal.close();
        if (this.state.handle) {
          this.state.handle();
        }
      }
    }
  }, {
    key: 'toggle',
    value: function toggle(handle) {
      this.setState({
        handle: handle
      });
      this.refs.modal.toggle();
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      e = e || event;
      var target = e.target || e.srcElement;
      console.log(target.checked);
      var targetDom = ReactDOM.findDOMNode(this.refs.target);
      console.log(targetDom);
    }
  }, {
    key: 'handleOkClick',
    value: function handleOkClick(e) {
      // 做相应的处理
      var linkDom = ReactDOM.findDOMNode(this.refs.link);
      var titleDom = ReactDOM.findDOMNode(this.refs.title);
      var targetDom = ReactDOM.findDOMNode(this.refs.target);
      console.log(targetDom);
      var link = linkDom.value;
      var title = titleDom.value;
      var target = targetDom.checked ? '_blank' : '_self';
      var strLink = "";
      if (link && title) {
        strLink += "<a href='" + link + "' target= '" + target + "'>";
        strLink += title;
        strLink += "</a>";
        this.state.handle(e, strLink);
      }
      this.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var buttons = [{ name: "btn-ok", content: "确定", onClick: this.handleOkClick.bind(this) }, { name: "btn-cancel", content: "取消", onClick: this.close.bind(this) }];
      if (this.props.hidden) {
        return React.createElement('div', null);
      } else {
        return React.createElement(
          Dialog,
          { ref: 'modal', className: 'link-dialog', width: 700, height: 208, title: '\u8D85\u94FE\u63A5', buttons: buttons, onClose: this.close.bind(this) },
          React.createElement(
            'table',
            { className: 'search-bar' },
            React.createElement(
              'tbody',
              null,
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  null,
                  '\u94FE\u63A5\u5730\u5740\uFF1A'
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement('input', { className: 'link-input', type: 'text', ref: 'link' })
                )
              ),
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  null,
                  '\u6807\u9898\uFF1A'
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement('input', { className: 'link-input', type: 'text', ref: 'title' })
                )
              ),
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  null,
                  '\u662F\u5426\u5728\u65B0\u7A97\u53E3\u6253\u5F00\uFF1A'
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement('input', { onChange: this.handleChange.bind(this), type: 'checkbox', ref: 'target' })
                )
              )
            )
          )
        );
      }
    }
  }]);

  return LinkDialog;
}(React.Component);

module.exports = LinkDialog;