'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _EditorHistory = require('../../utils/EditorHistory');

var _EditorHistory2 = _interopRequireDefault(_EditorHistory);

var _EditorSelection = require('../../utils/EditorSelection');

var _EditorSelection2 = _interopRequireDefault(_EditorSelection);

var _EditorDOM = require('../../utils/EditorDOM');

var _EditorDOM2 = _interopRequireDefault(_EditorDOM);

var _EditorTimer = require('../../utils/EditorTimer');

var _EditorTimer2 = _interopRequireDefault(_EditorTimer);

var _ColorDropdown = require('../plugins/ColorDropdown');

var _ColorDropdown2 = _interopRequireDefault(_ColorDropdown);

var _FormulaDropdown = require('../plugins/FormulaDropdown');

var _FormulaDropdown2 = _interopRequireDefault(_FormulaDropdown);

var _TablePickerDropdown = require('../plugins/TablePickerDropdown');

var _TablePickerDropdown2 = _interopRequireDefault(_TablePickerDropdown);

var _FontSizeComboBox = require('../plugins/FontSizeComboBox');

var _FontSizeComboBox2 = _interopRequireDefault(_FontSizeComboBox);

var _FontFamilyComboBox = require('../plugins/FontFamilyComboBox');

var _FontFamilyComboBox2 = _interopRequireDefault(_FontFamilyComboBox);

var _ParagraphComboBox = require('../plugins/ParagraphComboBox');

var _ParagraphComboBox2 = _interopRequireDefault(_ParagraphComboBox);

var _EmotionDialog = require('../plugins/EmotionDialog');

var _EmotionDialog2 = _interopRequireDefault(_EmotionDialog);

var _SpecialCharsDialog = require('../plugins/SpecialCharsDialog');

var _SpecialCharsDialog2 = _interopRequireDefault(_SpecialCharsDialog);

var _ImageDialog = require('../plugins/ImageDialog');

var _ImageDialog2 = _interopRequireDefault(_ImageDialog);

var _EditorToolbar = require('./EditorToolbar');

var _EditorToolbar2 = _interopRequireDefault(_EditorToolbar);

var _EditorTextArea = require('./EditorTextArea');

var _EditorTextArea2 = _interopRequireDefault(_EditorTextArea);

var _EditorContentEditableDiv = require('./EditorContentEditableDiv');

var _EditorContentEditableDiv2 = _interopRequireDefault(_EditorContentEditableDiv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// utlils


// dialog & dropdown

// combobox

// dialog


// base components


// key down context
var saveSceneTimer = null;
var keycont = 0;

var MQ = null;

/**
 * 对外接口方法
 * @findDOMNode: 获取"root","editarea","toolbar","color"的ref对象以及相应的dom对象
 * @setContent: 设置html格式数据
 * @getContent: 获取html格式数据
 * @onFocus: 监听focus事件
 * @focusEditor: 聚焦到Editor上
 * @defaultValue: 默认内容
 * @value: 编辑器的值
 * @icons: 工具条上需要显示的图标
 **/

var EditorCore = function (_Component) {
  _inherits(EditorCore, _Component);

  function EditorCore(props) {
    _classCallCheck(this, EditorCore);

    var _this = _possibleConstructorReturn(this, (EditorCore.__proto__ || Object.getPrototypeOf(EditorCore)).call(this, props));

    _this.handleKeyDown = function (evt) {
      evt = evt || event;
      var target = evt.target || evt.srcElement;
      var maxInputCount = _this.state.maxInputCount;

      if (target.className && target.className.indexOf('editor-contenteditable-div') != -1) {
        var keyCode = evt.keyCode || evt.which;
        console.log('kkkk', keyCode);
        if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
          if (_EditorHistory2.default.getCommandStack().length == 0) {
            _this.autoSave();
            keycont = 0;
          }
          clearTimeout(saveSceneTimer);
          saveSceneTimer = _EditorTimer2.default.setTimeout(function () {
            var interalTimer = _EditorTimer2.default.setInterval(function () {
              _this.autoSave();
              keycont = 0;
              _EditorTimer2.default.clearInterval(interalTimer);
            }, 300);
          }, 200);
          lastKeyCode = keyCode;
          keycont++;
          if (keycont >= maxInputCount) {
            _this.autoSave();
            keycont = 0;
          }
        }
      }
      _EditorDOM2.default.stopPropagation(evt);
    };

    _this.handleKeyUp = function (evt) {
      evt = evt || event;
      var target = evt.target || evt.srcElement;
      if (target.className && target.className.indexOf('editor-contenteditable-div') != -1) {
        if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
          // some handle
        }
      }
      _EditorDOM2.default.stopPropagation(evt);
    };

    _this.editorSource = function (state) {
      var editorState = _this.state.editorState;
      editorState.showHtml = !editorState.showHtml;
      state.active = editorState.showHtml;
      editorState.content = _this.refs.editarea.getContent();
    };

    _this.editorRemoveFormat = function (state) {
      _EditorHistory2.default.execCommand(state.icon, false, null);
      _EditorSelection2.default.storeRange();
      var spanNodes = _EditorSelection2.default.getSpanNodes();
      var spanNode = null;
      var parentNode = null;
      var nextSibling = null;
      var childSum = null;
      for (var i = 0; i < spanNodes.length; i++) {
        switch (spanNodes[i].className) {
          case "font-border":
            spanNode = spanNodes[i];
            parentNode = spanNode.parentNode;
            nextSibling = spanNode.nextSibling || spanNode;
            childSum = spanNode.childNodes.length;
            for (var c = 0; c < childSum; c++) {
              parentNode.insertBefore(spanNode.childNodes[c].cloneNode(), nextSibling);
            }
            parentNode.removeChild(spanNodes[i]);
            break;
          case "emphasis":
            spanNode = spanNodes[i];
            parentNode = spanNode.parentNode;
            nextSibling = spanNode.nextSibling || spanNode;
            childSum = spanNode.childNodes.length;
            for (var _c = 0; _c < childSum; _c++) {
              parentNode.insertBefore(spanNode.childNodes[_c].cloneNode(), nextSibling);
            }
            parentNode.removeChild(spanNodes[i]);
            break;
        }
      }
      _EditorSelection2.default.restoreRange();
    };

    _this.editorUpLowCase = function (state) {
      _EditorSelection2.default.storeRange();
      var textNodes = _EditorSelection2.default.getTextNodes();
      var node = null;
      var start = null;
      var end = null;
      for (var i = 0; i < textNodes.length; i++) {
        node = textNodes[i].childNode;
        start = textNodes[i].startOffset;
        end = textNodes[i].endOffset;
        node.nodeValue = node.nodeValue.substring(0, start) + (state.icon == "touppercase" ? node.nodeValue.substring(start, end).toUpperCase() : node.nodeValue.substring(start, end).toLowerCase()) + node.nodeValue.substring(end, node.length);
      }
      _EditorHistory2.default.execCommand(state.icon, false, null);
      _EditorSelection2.default.restoreRange();
    };

    _this.editorFontBorder = function (state) {
      var textNodes = _EditorSelection2.default.getTextNodes();
      var startNode = null,
          endNode = null,
          startOffset = 0,
          endOffset = 0;
      for (var i = 0; i < textNodes.length; i++) {
        // 获取
        var node = textNodes[i].childNode;
        var start = textNodes[i].startOffset;
        var end = textNodes[i].endOffset;
        // 拷贝
        var cloneNode = node.cloneNode();
        var startText = cloneNode.nodeValue.substring(0, start);
        var endText = cloneNode.nodeValue.substring(end, cloneNode.length);
        var borderText = cloneNode.nodeValue.substring(start, end);
        var span = null;
        var textParentNode = textNodes[i].childNode.parentNode;
        if (textParentNode && textParentNode.className && textParentNode.className == "font-border") {
          if (i == 0) {
            startNode = textNodes[i].childNode;
            startOffset = start;
          }
          if (i == textNodes.length - 1) {
            endNode = textNodes[i].childNode;
            endOffset = end;
          }
        } else {
          // 重新赋值
          node.nodeValue = startText;
          span = document.createElement("span");
          span.className = "font-border";
          span.innerHTML = borderText;
          span.style.border = "1px solid #000";
          node.parentNode.insertBefore(span, node.nextSibling || node);
          if (endText != "") {
            node.parentNode.insertBefore(document.createTextNode(endText), span.nextSibling);
          }
          if (i == 0) startNode = span.childNodes[0];
          if (i == textNodes.length - 1) {
            endNode = span.childNodes[0];
            endOffset = span.childNodes[0].length;
          }
        }
      }
      _EditorSelection2.default.addRange(startNode, startOffset, endNode, endOffset);
      // 合并相同font-border元素
      var spanNodes = _EditorSelection2.default.getSpanNodes();
      for (var _i = 0; _i < spanNodes.length - 1; _i++) {
        var spanNode = spanNodes[_i];
        var parentNode = spanNodes[_i].parentNode;
        if (_EditorDOM2.default.isNullOfTextNode(spanNode.nextSibling)) {
          // 移除空元素
          parentNode.removeChild(spanNode.nextSibling);
        }
        if (spanNode.nextSibling === spanNodes[_i + 1]) {
          var nextSiblingChildNodes = spanNodes[_i + 1].childNodes;
          for (var c = 0; c < nextSiblingChildNodes.length; c++) {
            spanNode.appendChild(nextSiblingChildNodes[c].cloneNode());
          }
          // 移除老元素
          parentNode.removeChild(spanNodes[_i + 1]);
          // 删除过后，重新指向
          spanNodes[_i + 1] = spanNodes[_i];
        }
      }
      _EditorHistory2.default.execCommand(state.icon, false, null);
    };

    _this.editorEmphasis = function (state) {
      var textNodes = _EditorSelection2.default.getTextNodes();
      var startNode = null,
          endNode = null,
          startOffset = 0,
          endOffset = 0;
      for (var i = 0; i < textNodes.length; i++) {
        // 获取
        var node = textNodes[i].childNode;
        var start = textNodes[i].startOffset;
        var end = textNodes[i].endOffset;
        // 拷贝
        var cloneNode = node.cloneNode();
        var startText = cloneNode.nodeValue.substring(0, start);
        var endText = cloneNode.nodeValue.substring(end, cloneNode.length);
        var borderText = cloneNode.nodeValue.substring(start, end);
        var span = null;
        var textParentNode = textNodes[i].childNode.parentNode;
        if (textParentNode && textParentNode.className && textParentNode.className == "emphasis") {
          if (i == 0) {
            startNode = textNodes[i].childNode;
            startOffset = start;
          }
          if (i == textNodes.length - 1) {
            endNode = textNodes[i].childNode;
            endOffset = end;
          }
        } else {
          // 重新赋值
          node.nodeValue = startText;
          span = document.createElement("span");
          span.className = "emphasis";
          span.innerHTML = borderText;
          node.parentNode.insertBefore(span, node.nextSibling || node);
          if (endText != "") {
            node.parentNode.insertBefore(document.createTextNode(endText), span.nextSibling);
          }
          if (i == 0) startNode = span.childNodes[0];
          if (i == textNodes.length - 1) {
            endNode = span.childNodes[0];
            endOffset = span.childNodes[0].length;
          }
        }
      }
      _EditorSelection2.default.addRange(startNode, startOffset, endNode, endOffset);
      // 合并相同font-border元素
      var spanNodes = _EditorSelection2.default.getSpanNodes();
      for (var _i2 = 0; _i2 < spanNodes.length - 1; _i2++) {
        var spanNode = spanNodes[_i2];
        var parentNode = spanNodes[_i2].parentNode;

        if (_EditorDOM2.default.isNullOfTextNode(spanNode.nextSibling)) {
          // 移除空元素
          parentNode.removeChild(spanNode.nextSibling);
        }
        if (spanNode.nextSibling === spanNodes[_i2 + 1]) {
          var nextSiblingChildNodes = spanNodes[_i2 + 1].childNodes;
          for (var c = 0; c < nextSiblingChildNodes.length; c++) {
            spanNode.appendChild(nextSiblingChildNodes[c].cloneNode());
          }
          // 移除老元素
          parentNode.removeChild(spanNodes[_i2 + 1]);
          // 删除过后，重新指向
          spanNodes[_i2 + 1] = spanNodes[_i2];
        }
      }
      _EditorHistory2.default.execCommand(state.icon, false, null);
    };

    _this.editorForeColor = function (state, offsetPosition, editarea) {
      _EditorSelection2.default.storeRange();
      offsetPosition.y += offsetPosition.h + 5;
      _this.refs.color.toggle(offsetPosition, function (color) {
        editarea.focus();
        _EditorSelection2.default.restoreRange();
        _EditorHistory2.default.execCommand('forecolor', false, color);
        _this.handleRangeChange();
      });
    };

    _this.editorBackColor = function (state, offsetPosition, editarea) {
      _EditorSelection2.default.storeRange();
      offsetPosition.y += offsetPosition.h + 5;

      _this.refs.color.toggle(offsetPosition, function (color) {
        editarea.focus();
        _EditorSelection2.default.restoreRange();
        _EditorHistory2.default.execCommand('backcolor', false, color);
        _this.handleRangeChange();
      });
    };

    _this.editorFontSize = function (state, offsetPosition, editarea) {
      _EditorSelection2.default.storeRange();
      offsetPosition.y += offsetPosition.h + 5;

      _this.refs.fontsize.toggle(offsetPosition, function (fontsize) {
        editarea.focus();
        _EditorSelection2.default.restoreRange();
        _EditorHistory2.default.execCommand('fontsize', false, fontsize);
        _this.handleRangeChange();
      });
    };

    _this.editorFontFamily = function (state, offsetPosition, editarea) {
      _EditorSelection2.default.storeRange();
      offsetPosition.y += offsetPosition.h + 5;

      _this.refs.fontfamily.toggle(offsetPosition, function (fontfamily) {
        editarea.focus();
        _EditorSelection2.default.restoreRange();
        _EditorHistory2.default.execCommand('fontname', false, fontfamily);
        _this.handleRangeChange();
      });
    };

    _this.editorParagraph = function (state, offsetPosition, editarea) {
      _EditorSelection2.default.storeRange();
      offsetPosition.y += offsetPosition.h + 5;

      _this.refs.paragraph.toggle(offsetPosition, function (paragraph) {
        editarea.focus();
        _EditorSelection2.default.restoreRange();
        var paragraphs = _EditorSelection2.default.getParagraphs();
        var parentElement = null,
            childNodes = null,
            paraElement = null,
            parentNode = null;
        for (var i = 0; i < paragraphs.length; i++) {
          switch (paragraphs[i].tagName.toUpperCase()) {
            case "TD":
            case "TH":
            case "DIV":
              childNodes = paragraphs[i].childNodes;
              paraElement = document.createElement(paragraph);
              for (var j = 0; j < childNodes.length; j++) {
                paraElement.appendChild(childNodes[j]);
              }
              paragraphs[i].appendChild(paraElement);
              break;
            case "P":
            case "H1":
            case "H2":
            case "H3":
            case "H4":
            case "H5":
            case "H6":
              parentElement = paragraphs[i];
              childNodes = paragraphs[i].childNodes;
              paraElement = document.createElement(paragraph);
              parentNode = parentElement.parentNode;
              parentNode.insertBefore(paraElement, parentElement.nextSibling);
              for (var _j = 0; _j < childNodes.length; _j++) {
                paraElement.appendChild(childNodes[_j]);
              }
              parentNode.removeChild(parentElement);
              break;
            default:
              break;
          }
        }
        _EditorHistory2.default.execCommand('paragraph', false, paragraph);
        _this.handleRangeChange();
      });
    };

    _this.editorHorizontal = function (editarea, root) {
      var strTime = "<hr/><p></br></p>";
      if (_EditorSelection2.default.range && _EditorSelection2.default.validateRange(root, _EditorSelection2.default.range)) {
        if (_EditorSelection2.default.range.pasteHTML) {
          _EditorSelection2.default.range.pasteHTML(strTime);
        } else {
          var hr = _EditorDOM2.default.createHR();
          var p = _EditorDOM2.default.createNodeByTag('p', '<br/>');
          _EditorSelection2.default.range.deleteContents();
          _EditorSelection2.default.insertNode(p);
          _EditorSelection2.default.insertNode(hr);
        }
      } else {
        editarea.innerHTML += strTime;
      }
      // EditorHistory.execCommand('inserthtml',false,"<hr/><p><br/></p>");
    };

    _this.editorDate = function (editarea, root) {
      var strDate = new Date().Format("yyyy-MM-dd");
      if (_EditorSelection2.default.range && _EditorSelection2.default.validateRange(root, _EditorSelection2.default.range)) {
        if (_EditorSelection2.default.range.pasteHTML) {
          _EditorSelection2.default.range.pasteHTML(strDate);
        } else {
          var textNode = _EditorDOM2.default.createTextNode(strDate);
          _EditorSelection2.default.range.deleteContents();
          _EditorSelection2.default.insertNode(textNode);
        }
      } else {
        editarea.innerHTML += '<p>' + strDate + '</p>';
      }
      // EditorHistory.execCommand('inserthtml',false, strDate);
    };

    _this.editorTime = function (editarea, root) {
      var strTime = new Date().Format('hh:mm:ss');
      if (_EditorSelection2.default.range && _EditorSelection2.default.validateRange(root, _EditorSelection2.default.range)) {
        if (_EditorSelection2.default.range.pasteHTML) {
          _EditorSelection2.default.range.pasteHTML(strTime);
        } else {
          var textNode = _EditorDOM2.default.createTextNode(strTime);
          _EditorSelection2.default.range.deleteContents();
          _EditorSelection2.default.insertNode(textNode);
        }
      } else {
        editarea.innerHTML += '<p>' + strTime + '</p>';
      }
      // EditorHistory.execCommand('inserthtml',false,strTime);
    };

    _this.editorImage = function (editarea, root) {
      _EditorSelection2.default.storeRange();
      _this.refs.image.toggle(function (html) {
        editarea.focus();
        _EditorSelection2.default.restoreRange();
        if (html && html.length > 0) {
          if (_EditorSelection2.default.range && _EditorSelection2.default.validateRange(root, _EditorSelection2.default.range)) {
            if (_EditorSelection2.default.range.pasteHTML) {
              _EditorSelection2.default.range.pasteHTML('<p>' + html + '</p>');
            } else {
              var p = _EditorDOM2.default.createNodeByTag('p', html);
              _EditorSelection2.default.range.deleteContents();
              _EditorSelection2.default.insertNode(p);
            }
            // EditorHistory.execCommand('inserthtml',false,html);
          } else {
            editarea.innerHTML += '<p>' + html + '</p>';
          }
        }
      });
    };

    _this.editorFormula = function (editarea, root, offsetPosition) {
      _EditorSelection2.default.storeRange();
      offsetPosition.y += offsetPosition.h + 5;
      offsetPosition.x -= offsetPosition.w / 2;
      _this.refs.formula.toggle(offsetPosition, function (latex, id) {
        editarea.focus();
        _EditorSelection2.default.restoreRange();

        if (latex && latex.length > 0) {
          var html = '<span>&nbsp;<span class="mathquill-embedded-latex" id="' + id + '"></span>&nbsp;</span>';
          if (_EditorSelection2.default.range && _EditorSelection2.default.validateRange(root, _EditorSelection2.default.range)) {
            if (_EditorSelection2.default.range.pasteHTML) {
              _EditorSelection2.default.range.pasteHTML(html);
            } else {
              var span = _EditorDOM2.default.createNodeByTag('span', '&nbsp;<span class="mathquill-embedded-latex" id="' + id + '"></span>&nbsp;');
              _EditorSelection2.default.range.deleteContents();
              _EditorSelection2.default.insertNode(span);
            }
            // EditorHistory.execCommand('inserthtml',false,html);
          } else {
            editarea.innerHTML += html;
          }
          _EditorTimer2.default.setTimeout(function () {
            _this.addFormula(id, latex);
          }, 200);
          _this.handleRangeChange();
        }
      });
    };

    _this.editorInsertTable = function (editarea, root, offsetPosition) {
      _EditorSelection2.default.storeRange();
      offsetPosition.y += offsetPosition.h + 5;
      offsetPosition.x -= offsetPosition.w / 2;
      _this.refs.table.toggle(offsetPosition, function (table) {
        editarea.focus();
        _EditorSelection2.default.restoreRange();
        if (_EditorSelection2.default.range && _EditorSelection2.default.validateRange(root, _EditorSelection2.default.range)) {
          if (_EditorSelection2.default.range.pasteHTML) {
            _EditorSelection2.default.range.pasteHTML(table.outerHTML);
          } else {
            _EditorSelection2.default.range.deleteContents();
            _EditorSelection2.default.insertNode(table);
          }
        } else {
          editarea.innerHTML += table.outerHTML;
        }
        // EditorHistory.execCommand('inserthtml',false,html);
        _this.handleRangeChange();
      });
    };

    _this.editorSpechars = function (editarea, root) {
      _EditorSelection2.default.storeRange();
      _this.refs.special.toggle(function (char) {
        editarea.focus();
        _EditorSelection2.default.restoreRange();
        if (_EditorSelection2.default.range && _EditorSelection2.default.validateRange(root, _EditorSelection2.default.range)) {
          if (_EditorSelection2.default.range.pasteHTML) {
            _EditorSelection2.default.range.pasteHTML(char);
          } else {
            var textNode = _EditorDOM2.default.createTextNode(char);
            _EditorSelection2.default.range.deleteContents();
            _EditorSelection2.default.insertNode(textNode);
          }
        } else {
          editarea.innerHTML += char;
        }
        // EditorHistory.execCommand('inserthtml',false,char);
        _this.handleRangeChange();
      });
    };

    _this.editorEmotion = function (editarea, root) {
      _EditorSelection2.default.storeRange();
      _this.refs.emotion.toggle(function (img) {
        editarea.focus();
        _EditorSelection2.default.restoreRange();
        if (_EditorSelection2.default.range && _EditorSelection2.default.validateRange(root, _EditorSelection2.default.range)) {
          if (_EditorSelection2.default.range.pasteHTML) {
            _EditorSelection2.default.range.pasteHTML(img.outerHTML);
          } else {
            _EditorSelection2.default.range.deleteContents();
            _EditorSelection2.default.insertNode(img);
          }
        } else {
          editarea.innerHTML += img.outerHTML;
        }
        // EditorHistory.execCommand('inserthtml',false,html);
        _this.handleRangeChange();
      });
    };

    _this.state = {
      lastKeyCode: null,
      maxInputCount: 10,
      editorState: {
        icon: "source",
        showHtml: false,
        icons: {
          "forecolor": {
            color: 'transparent',
            icon: "forecolor"
          },
          "backcolor": {
            color: 'transparent',
            icon: "backcolor"
          },
          "fontsize": {
            value: "3",
            icon: "fontsize"
          },
          "paragraph": {
            value: "p",
            icon: "fontsize"
          },
          "fontfamily": {
            value: "宋体, SimSun",
            icon: "fontfamily"
          },
          "indent": {
            active: false,
            icon: "indent"
          },
          "outdent": {
            active: true,
            icon: "outdent"
          }
        }
      },
      value: _this.props.value || _this.props.defaultValue
    };
    _this.iconComponetMap = {};
    return _this;
  }

  _createClass(EditorCore, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _EditorHistory2.default.clear();
      this.setContent(this.state.value);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var editorState = this.state.editorState;
      switch (editorState.icon) {
        case "source":
          if (editorState.content) {
            this.setContent(editorState.content);
          }
          break;
        case "cleardoc":
          if (editorState.content) {
            this.setContent(editorState.content);
          }
          break;
      }
    }
  }, {
    key: 'componentWillUnmont',
    value: function componentWillUnmont() {}

    // event handler

  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {
      if (this.props.onFocus) {
        this.props.onFocus(e, this.findDOMNode('root'));
      }
      _EditorDOM2.default.stopPropagation(e);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      _EditorDOM2.default.stopPropagation(e);
    }
  }, {
    key: 'exchangeRangeState',
    value: function exchangeRangeState(editorState) {
      var rangeState = _EditorSelection2.default.getRangeState();
      for (var icon in rangeState) {
        if (!editorState.icons[icon]) editorState.icons[icon] = rangeState[icon];else {
          switch (icon) {
            case "forecolor":
            case "backcolor":
              editorState.icons[icon].color = rangeState[icon].color;
              break;
            case "paragraph":
            case "fontfamily":
            case "fontsize":
              editorState.icons[icon].value = rangeState[icon].value;
              break;
          }
          editorState.icons[icon].active = rangeState[icon].active;
        }
      }
      return editorState;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(content) {
      var value = this.state.value;
      var editorState = this.state.editorState;
      editorState.content = content;
      if (value != content) {
        this.props.onChange(content);
        this.setState({
          value: content,
          editorState: editorState
        });
      }
    }
  }, {
    key: 'handleRangeChange',
    value: function handleRangeChange(e) {
      e = e || event;
      if (e && e.type == "blur") return;
      // 已经被卸载了。
      if (this._calledComponentWillUnmount) return;
      var target = e ? e.target || e.srcElement : null;
      var selection = _EditorSelection2.default.getSelection();
      if (this.props.onChange) {
        var content = this.getContent();
        var value = this.state.value;
        if (value != content) {
          this.props.onChange(content);
          this.setState({
            value: content
          });
        }
      }
      var editorState = this.state.editorState;
      if (selection && selection.rangeCount > 0) {
        if (editorState.icon == "source") {
          editorState = this.exchangeRangeState(editorState);
          this.setState({
            editorState: editorState
          });
        } else if (!_EditorSelection2.default.validateSelection(selection)) return;else {
          editorState = this.exchangeRangeState(editorState);
          this.setState({
            editorState: editorState
          });
          if (this.refs.editarea && this.refs.editarea.clearResizeTarget) {
            this.refs.editarea.clearResizeTarget();
          }
        }
      } else if (target && _EditorDOM2.default.isEditorDom(target, _reactDom2.default.findDOMNode(this.refs.root))) {
        var tagName = target.tagName.toUpperCase();
        switch (tagName) {
          case "IMG":
            if (this.refs.editarea && this.refs.editarea.setResizeTarget) {
              this.refs.editarea.setResizeTarget(target);
            }
            break;
        }
      } else if (editorState.icon == "source") {
        editorState = this.exchangeRangeState(editorState);
        this.setState({
          editorState: editorState
        });
      }
    }
  }, {
    key: 'handleToolbarIconClick',
    value: function handleToolbarIconClick(e, state) {
      e = e || event;
      var target = e.target || e.srcElement;
      var root = _reactDom2.default.findDOMNode(this.refs.root);
      var offsetPosition = _EditorDOM2.default.getOffsetRootParentPosition(target, root);

      var handleRangeChange = this.handleRangeChange.bind(this);
      var editarea = _reactDom2.default.findDOMNode(this.refs.editarea);
      if (this.refs.editarea.getEditorRange) {
        editarea = this.refs.editarea.getEditorRange();
      }
      var editorState = this.state.editorState;
      _EditorSelection2.default.cloneRange();
      _EditorSelection2.default.storeRange();
      //关闭所有Dialog、Box、Dropdown
      this.closeAllOpenDialog(state.icon);
      _EditorSelection2.default.restoreRange();
      switch (state.icon) {
        case "source":
          this.editorSource(state);
          break;
        case "undo":
          _EditorHistory2.default.undo();
          break;
        case "redo":
          _EditorHistory2.default.redo();
          break;
        case "removeformat":
          this.editorRemoveFormat(state);
          break;
        case "bold":
        case "italic":
        case "underline":
        case "strikethrough":
        case "subscript":
        case "superscript":
        case "insertorderedlist":
        case "insertunorderedlist":
        case "selectall":
        case "justifyleft":
        case "justifyright":
        case "justifycenter":
        case "indent":
        case "outdent":
          _EditorHistory2.default.execCommand(state.icon, false, null);
          break;
        case "touppercase":
        case "tolowercase":
          this.editorUpLowCase(state);
          break;
        case "fontborder":
          this.editorFontBorder(state);
          break;
        case "emphasis":
          this.editorEmphasis(state);
          break;
        case "forecolor":
          this.editorForeColor(state, offsetPosition, editarea);
          break;
        case "backcolor":
          this.editorBackColor(state, offsetPosition, editarea);
          break;
        case "fontsize":
          this.editorFontSize(state, offsetPosition, editarea);
          break;
        case "fontfamily":
          this.editorFontFamily(state, offsetPosition, editarea);
          break;
        case "paragraph":
          this.editorParagraph(state, offsetPosition, editarea);
          break;
        case "cleardoc":
          editorState.content = "<p><br/></p>";
          break;
        case "horizontal":
          this.editorHorizontal(editarea, root);
          break;
        case "date":
          this.editorDate(editarea, root);
          break;
        case "time":
          this.editorTime(editarea, root);
          break;
        case "image":
          this.editorImage(editarea, root);
          break;
        case "formula":
          this.editorFormula(editarea, root, offsetPosition);
          break;
        case "inserttable":
          this.editorInsertTable(editarea, root, offsetPosition);
          break;
        case "spechars":
          this.editorSpechars(editarea, root);
          break;
        case "emotion":
          this.editorEmotion(editarea, root);
          break;
        default:
          var _ref = this.props.plugins || {},
              _ref$toolbar = _ref.toolbar,
              toolbar = _ref$toolbar === undefined ? {} : _ref$toolbar;

          var pIcons = toolbar.icons || [];
          var fIcon = pIcons.find(function (ic) {
            return ic.name === state.icon;
          });
          if (fIcon && fIcon.onIconClick) fIcon.onIconClick({
            editarea: editarea,
            root: root,
            offsetPosition: offsetPosition,
            state: state,
            ref: this.iconComponetMap[state.icon]
          });
          break;
      }
      // setState
      editorState.icons[state.icon] = state;
      editorState.icon = state.icon;
      _EditorSelection2.default.createRange();

      // range state
      handleRangeChange();
      _EditorDOM2.default.stopPropagation(e);
    }
  }, {
    key: 'closeAllOpenDialog',
    value: function closeAllOpenDialog(icon) {
      var refsDialog = ["image", "color", "formula", "table", "special", "emotion", "fontsize", "fontfamily", "paragraph"];
      var icons = ["forecolor", "backcolor", "image", "emotion", "spechars", "inserttable", "formula", "paragraph", "fontsize", "fontfamily"];
      if (icons.indexOf(icon) == -1) return;
      for (var i = 0; i < refsDialog.length; i++) {
        this.refs[refsDialog[i]].close();
      }
    }
    // utils

  }, {
    key: 'addFormula',
    value: function addFormula(id, latex) {
      var editarea = _reactDom2.default.findDOMNode(this.refs.editarea);
      var htmlElement = document.getElementById(id);

      var config = {
        handlers: {
          edit: function edit() {}
        },
        restrictMismatchedBrackets: true
      };

      if (!MQ) MQ = MathQuill ? MathQuill.getInterface(2) : null;

      if (htmlElement == null && MQ == null) return;
      var mathField = MQ.MathField(htmlElement, config);
      mathField.latex(latex);
      var $htmlElement = $(htmlElement);
      $htmlElement.keydown(function (e) {
        mathField.focus();
        _EditorDOM2.default.stopPropagation(e);
      });
      $htmlElement.keyup(function (e) {
        mathField.focus();
        _EditorDOM2.default.stopPropagation(e);
      });
      $htmlElement.mouseup(function (e) {
        mathField.focus();
        _EditorDOM2.default.stopPropagation(e);
      });
      $htmlElement.mousedown(function (e) {
        _EditorDOM2.default.stopPropagation(e);
      });
      $htmlElement.mousemove(function (e) {
        _EditorDOM2.default.stopPropagation(e);
      });
      $(editarea).mousedown(function (e) {
        mathField.blur();
        _EditorDOM2.default.stopPropagation(e);
      });
      $(editarea).mousemove(function (e) {
        _EditorDOM2.default.stopPropagation(e);
      });
    }
  }, {
    key: 'autoSave',
    value: function autoSave() {
      _EditorHistory2.default.execCommand('autosave', false, null);
    }
    // public functions

  }, {
    key: 'findDOMNode',
    value: function findDOMNode(refName) {
      // 对外公布方法
      var keys = ["root", "editarea", "toolbar", "color"];
      if (keys.indexOf(refName) == -1) return {
        ref: null,
        dom: null
      };
      return {
        ref: this.refs[refName],
        dom: _reactDom2.default.findDOMNode(this.refs[refName])
      };
    }
  }, {
    key: 'setContent',
    value: function setContent(content) {
      content = content || "";
      // 后续添加校验方法
      this.refs.editarea.setContent(content);
      // mathquill supports
      if (content.indexOf("mathquill-embedded-latex") != -1) {
        var _self = this;
        _EditorTimer2.default.setTimeout(function () {
          var editarea = _reactDom2.default.findDOMNode(_self.refs.editarea);
          var elements = editarea.querySelectorAll('.mathquill-embedded-latex');
          for (var i = 0; i < elements.length; i++) {
            if (!elements[i].id) {
              var id = "mathquill-" + i + "-" + new Date().valueOf();
              var latex = elements[i].innerHTML;
              elements[i].id = id;
              _self.addFormula(id, latex);
            }
          }
        }, 100);
      }
    }
  }, {
    key: 'getContent',
    value: function getContent() {
      if (this.refs.editarea) return this.refs.editarea.getContent();else return "";
    }
  }, {
    key: 'focusEditor',
    value: function focusEditor() {
      var editarea = _reactDom2.default.findDOMNode(this.refs.editarea);
      editarea.focus();
    }
    // render functions  

  }, {
    key: 'renderEditArea',
    value: function renderEditArea() {
      var showHtml = this.state.editorState.showHtml;
      if (showHtml) {
        return _react2.default.createElement(_EditorTextArea2.default, { ref: 'editarea', onChange: this.handleChange.bind(this) });
      } else {
        return _react2.default.createElement(_EditorContentEditableDiv2.default, {
          ref: 'editarea',
          handleKeyDown: this.handleKeyDown,
          handleKeyUp: this.handleKeyUp,
          onEditorMount: this.props.onEditorMount,
          onRangeChange: this.handleRangeChange.bind(this) });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var editArea = this.renderEditArea();

      var _props = this.props,
          index = _props.index,
          fontSize = _props.fontSize,
          paragraph = _props.paragraph,
          fontFamily = _props.fontFamily,
          icons = _props.icons,
          plugins = _props.plugins,
          onBlur = _props.onBlur,
          className = _props.className,
          id = _props.id,
          onFocus = _props.onFocus,
          onClick = _props.onClick,
          onChange = _props.onChange,
          onEditorMount = _props.onEditorMount,
          uploadImageCallback = _props.uploadImageCallback,
          props = _objectWithoutProperties(_props, ['index', 'fontSize', 'paragraph', 'fontFamily', 'icons', 'plugins', 'onBlur', 'className', 'id', 'onFocus', 'onClick', 'onChange', 'onEditorMount', 'uploadImageCallback']);

      var editorState = this.state.editorState;
      var _icons = icons.join(" ").replace(/\|/gm, "separator").split(" ");

      var _ref2 = this.props.plugins || {},
          _ref2$toolbar = _ref2.toolbar,
          toolbar = _ref2$toolbar === undefined ? {} : _ref2$toolbar;

      var pIcons = toolbar.icons || [];
      _EditorSelection2.default.customIcons = pIcons;
      return _react2.default.createElement(
        'div',
        _extends({
          ref: 'root',
          id: id,
          className: "editor-container editor-default" + (className ? " " + className : ""),
          onClick: this.handleClick.bind(this),
          onBlur: this.handleRangeChange.bind(this),
          onFocus: this.handleFocus.bind(this)
        }, props),
        _react2.default.createElement(
          _EditorToolbar2.default,
          {
            ref: 'toolbar',
            editorState: editorState,
            onIconClick: function onIconClick(e, state) {
              return _this2.handleToolbarIconClick(e, state);
            },
            icons: this.props.icons,
            paragraph: this.props.paragraph,
            fontsize: this.props.fontSize,
            fontfamily: this.props.fontFamily
          },
          _react2.default.createElement(_ImageDialog2.default, {
            hidden: _icons.indexOf("image") == -1,
            ref: 'image',
            uploader: plugins.image.uploader,
            customUploader: plugins.image.customUploader
          }),
          _react2.default.createElement(_ColorDropdown2.default, {
            hidden: _icons.indexOf("forecolor") == -1 && _icons.indexOf("forecolor"),
            ref: 'color'
          }),
          _react2.default.createElement(_FormulaDropdown2.default, {
            hidden: _icons.indexOf("formula") == -1,
            ref: 'formula'
          }),
          _react2.default.createElement(_TablePickerDropdown2.default, {
            hidden: _icons.indexOf("inserttable") == -1,
            ref: 'table'
          }),
          _react2.default.createElement(_SpecialCharsDialog2.default, {
            hidden: _icons.indexOf("spechars") == -1,
            ref: 'special'
          }),
          _react2.default.createElement(_EmotionDialog2.default, {
            hidden: _icons.indexOf("emotion") == -1,
            ref: 'emotion'
          }),
          _react2.default.createElement(_FontSizeComboBox2.default, {
            hidden: _icons.indexOf("fontsize") == -1,
            ref: 'fontsize',
            fontsize: this.props.fontSize,
            value: editorState.icons["fontsize"] ? editorState.icons["fontsize"].value : fontSize[0].value
          }),
          _react2.default.createElement(_FontFamilyComboBox2.default, {
            hidden: _icons.indexOf("fontfamily") == -1,
            ref: 'fontfamily',
            fontfamily: this.props.fontFamily,
            value: editorState.icons["fontfamily"] ? editorState.icons["fontfamily"].value : fontFamily[0].value
          }),
          _react2.default.createElement(_ParagraphComboBox2.default, {
            hidden: _icons.indexOf("paragraph") == -1,
            ref: 'paragraph',
            paragraph: this.props.paragraph,
            value: editorState.icons["paragraph"] ? editorState.icons["paragraph"].value : paragraph[0].value
          }),
          pIcons.filter(function (ic) {
            return ic.component;
          }).map(function (ic) {
            var Com = ic.component;
            return _react2.default.createElement(Com, _extends({
              hidden: _icons.indexOf(ic.name) == -1,
              ref: function ref(com) {
                return _this2.iconComponetMap[ic.name] = com;
              }
            }, ic.props, {
              value: editorState.icons[ic.name] ? editorState.icons[ic.name].value : ic.defaultValue
            }));
          })
        ),
        editArea
      );
    }
  }]);

  return EditorCore;
}(_react.Component);

exports.default = EditorCore;