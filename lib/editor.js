'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _EditorCore = require('./components/core/EditorCore');

var _EditorCore2 = _interopRequireDefault(_EditorCore);

var _EditorEventEmitter = require('./utils/EditorEventEmitter');

var _EditorEventEmitter2 = _interopRequireDefault(_EditorEventEmitter);

require('../dist/less/editor.less');

require('./utils/Date.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = function (_Component) {
  _inherits(Editor, _Component);

  function Editor(props) {
    _classCallCheck(this, Editor);

    var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

    _this.handleChange = function () {
      _this.setState({
        loaded: true
      });
    };

    _this.state = {
      loaded: false,
      reload: true
    };
    return _this;
  }

  _createClass(Editor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.index = _EditorEventEmitter2.default.editorIndex;
      _EditorEventEmitter2.default.addStartListener("start-" + this.index, this.handleChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var index = this.index;
      _EditorEventEmitter2.default.removeStartListener("start-" + index, this.handleChange);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.loaded && this.state.reload) {
        this.refs.editor.setContent(this.props.value || this.props.defaultValue);
      }
    }
  }, {
    key: 'handleMountSuccess',
    value: function handleMountSuccess() {
      _EditorEventEmitter2.default.mountEditorSuccess();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      // reload判断当前是否可以允许刷新
      // loaded状态变化时，务必重新刷新
      var currentValue = nextProps.value;
      var editorValue = this.getContent();

      if (this.state.loaded != nextState.loaded) {
        return true;
      } else if (currentValue == editorValue) {
        return false;
      }
      return true;
    }
  }, {
    key: 'getContent',
    value: function getContent() {
      return this.refs.editor ? this.refs.editor.getContent() : "";
    }
  }, {
    key: 'setContent',
    value: function setContent(content) {
      return this.refs.editor ? this.refs.editor.setContent(content) : "";
    }
  }, {
    key: 'focusEditor',
    value: function focusEditor() {
      return this.refs.editor ? this.refs.editor.focusEditor() : "";
    }
  }, {
    key: 'findDOMNode',
    value: function findDOMNode(refName) {
      return this.refs.editor ? this.refs.editor.findDOMNode(refName) : "";
    }
  }, {
    key: 'render',
    value: function render() {
      var loaded = this.state.loaded;

      var _props = this.props,
          value = _props.value,
          defaultValue = _props.defaultValue,
          props = _objectWithoutProperties(_props, ['value', 'defaultValue']);

      if (!this.state.loaded) {
        return _react2.default.createElement(
          'div',
          {
            id: props.id,
            className: 'editor-contenteditable-div',
            style: { "minHeight": "30px", "border": "1px solid #ddd" } },
          '\u6B63\u5728\u52A0\u8F7D...'
        );
      } else {
        return _react2.default.createElement(_EditorCore2.default, _extends({ ref: 'editor' }, props, { onEditorMount: this.handleMountSuccess }));
      }
    }
  }]);

  return Editor;
}(_react.Component);

exports.default = Editor;


Editor.propTypes = {
  plugins: _propTypes2.default.object,
  fontFamily: _propTypes2.default.array,
  fontSize: _propTypes2.default.array,
  paragraph: _propTypes2.default.array,
  icons: _propTypes2.default.arrayOf(_propTypes2.default.string),
  value: _propTypes2.default.string,
  defaultValue: _propTypes2.default.string
};

Editor.defaultProps = {
  "plugins": {
    "image": {
      "uploader": {
        name: "file",
        url: "/upload",
        data: {},
        filter: function filter(res) {
          return res.url;
        }
      }
    },
    "toolbar": {
      icons: []
    }
  },
  "fontFamily": [{
    "name": "宋体",
    value: "宋体, SimSun",
    defualt: true
  }, {
    "name": "隶书",
    value: "隶书, SimLi"
  }, {
    "name": "楷体",
    value: "楷体, SimKai"
  }, {
    "name": "微软雅黑",
    value: "微软雅黑, Microsoft YaHei"
  }, {
    "name": "黑体",
    value: "黑体, SimHei"
  }, {
    "name": "arial",
    value: "arial, helvetica, sans-serif"
  }, {
    "name": "arial black",
    value: "arial black, avant garde"
  }, {
    "name": "omic sans ms",
    value: "omic sans ms"
  }, {
    "name": "impact",
    value: "impact, chicago"
  }, {
    "name": "times new roman",
    value: "times new roman"
  }, {
    "name": "andale mono",
    value: "andale mono"
  }],
  "fontSize": [{
    "name": "10px",
    value: "1"
  }, {
    "name": "12px",
    value: "2"
  }, {
    "name": "16px",
    value: "3",
    defualt: true
  }, {
    "name": "18px",
    value: "4"
  }, {
    "name": "24px",
    value: "5"
  }, {
    "name": "32px",
    value: "6"
  }, {
    "name": "38px",
    value: "7"
  }],
  "paragraph": [{
    "name": "段落",
    value: "p",
    defualt: true
  }, {
    "name": "标题1",
    value: "h1"
  }, {
    "name": "标题2",
    value: "h2"
  }, {
    "name": "标题3",
    value: "h3"
  }, {
    "name": "标题4",
    value: "h4"
  }, {
    "name": "标题5",
    value: "h5"
  }, {
    "name": "标题6",
    value: "h6"
  }],
  "icons": [
  // video map print preview drafts link unlink formula
  "source | undo redo | bold italic underline strikethrough fontborder emphasis | ", "paragraph fontfamily fontsize | superscript subscript | ", "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ", "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ", "horizontal date time  | image emotion spechars | inserttable"],
  "value": "",
  "defaultValue": ""
};