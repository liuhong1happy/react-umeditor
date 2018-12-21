import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// utlils
import EditorHistory from '../../utils/EditorHistory'
import EditorSelection from '../../utils/EditorSelection'
import EditorDom from '../../utils/EditorDom'
import EditorTimer from '../../utils/EditorTimer'

// dialog & dropdown
import ColorDropdown from '../plugins/ColorDropdown'
import FormulaDropdown from '../plugins/FormulaDropdown'
import TablePickerDropdown from '../plugins/TablePickerDropdown'
// combobox
import FontSizeComboBox from '../plugins/FontSizeComboBox'
import FontFamilyComboBox from '../plugins/FontFamilyComboBox'
import ParagraphComboBox from '../plugins/ParagraphComboBox'
// dialog
import EmotionDialog from '../plugins/EmotionDialog'
import SpecialCharsDialog from '../plugins/SpecialCharsDialog'
import ImageDialog from '../plugins/ImageDialog';

// base components
import EditorToolbar from './EditorToolbar'
import EditorTextArea from './EditorTextArea'
import EditorContentEditableDiv from './EditorContentEditableDiv'

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

export default class EditorCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastKeyCode: null,
      maxInputCount: 10,
      editorState: {
        icon: "",
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
      value: this.props.value || this.props.defaultValue
    }
    this.iconComponetMap = {};
  }
  componentDidMount() {
    EditorHistory.clear();
    this.setContent(this.state.value);
  }

  componentDidUpdate() {
    let editorState = this.state.editorState;
    switch (editorState.icon) {
      case "source":
      case "cleardoc":
        if (editorState.content) {
          this.setContent(editorState.content)
        }
        setTimeout(()=>{
          this.setState({
            editorState: {...editorState, icon: ""}
          })
        })
        break;
    }
  }

  // event handler
  handleKeyDown = (evt) => {
    evt = evt || event;
    let target = evt.target || evt.srcElement;
    let { maxInputCount } = this.state
    if (target.className && target.className.indexOf('editor-contenteditable-div') != -1) {
      let keyCode = evt.keyCode || evt.which;
      if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
        if (EditorHistory.getCommandStack().length == 0) {
          this.autoSave();
          keycont = 0;
        }
        clearTimeout(saveSceneTimer);
        saveSceneTimer = EditorTimer.setTimeout(() => {
          let interalTimer = EditorTimer.setInterval(() => {
            this.autoSave();
            keycont = 0;
            EditorTimer.clearInterval(interalTimer)
          }, 300)
        }, 200);
        lastKeyCode = keyCode;
        keycont++;
        if (keycont >= maxInputCount) {
          this.autoSave();
          keycont = 0;
        }
      }
    }
    EditorDom.stopPropagation(evt);
  }

  handleKeyUp = (evt) => {
    evt = evt || event;
    let target = evt.target || evt.srcElement;
    if (target.className && target.className.indexOf(
        'editor-contenteditable-div') != -1) {
      if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
        // some handle
      }
    }
    EditorDom.stopPropagation(evt);
  }

  handleFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e, this.findDOMNode('root'));
    }
    EditorDom.stopPropagation(e);
  }

  handleClick(e) {
    EditorDom.stopPropagation(e);
  }

  exchangeRangeState(editorState) {
    let rangeState = EditorSelection.getRangeState();
    for (let icon in rangeState) {
      if (!editorState.icons[icon])
        editorState.icons[icon] = rangeState[icon];
      else {
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
  handleChange(content) {
    let value = this.state.value;
    var editorState = this.state.editorState;
    editorState.content = content;
    if (value != content) {
      this.props.onChange(content);
      this.setState({
        value: content,
        editorState: editorState
      })
    }
  }
  handleRangeChange(e) {
    e = e || event;
    // if (e && e.type == "blur") return;
    // 已经被卸载了。
    if (this._calledComponentWillUnmount) return;
    let target = e ? e.target || e.srcElement : null;
    let selection = EditorSelection.getSelection();
    if (this.props.onChange) {
      let content = this.getContent();
      let value = this.state.value;
      if (value != content) {
        this.props.onChange(content);
        this.setState({
          value: content
        })
      }
    }
    let editorState = this.state.editorState;
    if (selection && selection.rangeCount > 0) {
      if (editorState.icon == "source") {
        editorState = this.exchangeRangeState(editorState);
        this.setState({
          editorState: editorState
        })
      }
      else {
        let parentNode = EditorSelection.validateSelection(selection);
        if(parentNode && EditorDom.isEditorDom(parentNode, ReactDOM.findDOMNode(this.refs.root))) {
          editorState = this.exchangeRangeState(editorState);
          this.setState({
            editorState: editorState
          })
          if (this.refs.editarea && this.refs.editarea.clearResizeTarget) {
            this.refs.editarea.clearResizeTarget();
          }
        }
      }
    } else if (target && EditorDom.isEditorDom(target, ReactDOM.findDOMNode(
        this.refs.root))) {
      let tagName = target.tagName.toUpperCase();
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
      })
    }
  }

  editorSource = (state) => {
    let editorState = this.state.editorState
    editorState.showHtml = !editorState.showHtml;
    state.active = editorState.showHtml;
    editorState.content = this.refs.editarea.getContent();
  }

  editorRemoveFormat = (state) => {
    EditorHistory.execCommand(state.icon, false, null);
    EditorSelection.storeRange();
    let spanNodes = EditorSelection.getSpanNodes();
    let spanNode = null;
    let parentNode = null;
    let nextSibling = null;
    let childSum = null;
    for (let i = 0; i < spanNodes.length; i++) {
      switch (spanNodes[i].className) {
        case "font-border":
          spanNode = spanNodes[i];
          parentNode = spanNode.parentNode;
          nextSibling = spanNode.nextSibling || spanNode;
          childSum = spanNode.childNodes.length;
          for (let c = 0; c < childSum; c++) {
            parentNode.insertBefore(spanNode.childNodes[c].cloneNode(),
              nextSibling);
          }
          parentNode.removeChild(spanNodes[i]);
          break;
        case "emphasis":
          spanNode = spanNodes[i];
          parentNode = spanNode.parentNode;
          nextSibling = spanNode.nextSibling || spanNode;
          childSum = spanNode.childNodes.length;
          for (let c = 0; c < childSum; c++) {
            parentNode.insertBefore(spanNode.childNodes[c].cloneNode(),
              nextSibling);
          }
          parentNode.removeChild(spanNodes[i]);
          break;
      }
    }
    EditorSelection.restoreRange();
  }

  editorUpLowCase = (state) => {
    EditorSelection.storeRange();
    let textNodes = EditorSelection.getTextNodes();
    let node = null
    let start = null
    let end = null
    for (let i = 0; i < textNodes.length; i++) {
      node = textNodes[i].childNode;
      start = textNodes[i].startOffset;
      end = textNodes[i].endOffset;
      node.nodeValue = node.nodeValue.substring(0, start) +
              (state.icon == "touppercase" ? node.nodeValue.substring(start,
                end)
                .toUpperCase() : node.nodeValue.substring(start, end)
                  .toLowerCase()) +
        node.nodeValue.substring(end, node.length);
    }
    EditorHistory.execCommand(state.icon, false, null);
    EditorSelection.restoreRange();
  }

  editorFontBorder = (state) => {
    let textNodes = EditorSelection.getTextNodes();
    let startNode = null,
      endNode = null,
      startOffset = 0,
      endOffset = 0;
    for (let i = 0; i < textNodes.length; i++) {
      // 获取
      let node = textNodes[i].childNode;
      let start = textNodes[i].startOffset;
      let end = textNodes[i].endOffset;
      // 拷贝
      let cloneNode = node.cloneNode();
      let startText = cloneNode.nodeValue.substring(0, start);
      let endText = cloneNode.nodeValue.substring(end, cloneNode.length);
      let borderText = cloneNode.nodeValue.substring(start, end);
      let span = null;
      let textParentNode = textNodes[i].childNode.parentNode;
      if (textParentNode && textParentNode.className && textParentNode.className ==
        "font-border") {
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
          node.parentNode.insertBefore(document.createTextNode(endText),
            span.nextSibling);
        }
        if (i == 0) startNode = span.childNodes[0];
        if (i == textNodes.length - 1) {
          endNode = span.childNodes[0];
          endOffset = span.childNodes[0].length;
        }
      }
    }
    EditorSelection.addRange(startNode, startOffset, endNode, endOffset);
    // 合并相同font-border元素
    let spanNodes = EditorSelection.getSpanNodes();
    for (let i = 0; i < spanNodes.length - 1; i++) {
      let spanNode = spanNodes[i];
      let parentNode = spanNodes[i].parentNode;
      if (EditorDom.isNullOfTextNode(spanNode.nextSibling)) {
        // 移除空元素
        parentNode.removeChild(spanNode.nextSibling);
      }
      if (spanNode.nextSibling === spanNodes[i + 1]) {
        let nextSiblingChildNodes = spanNodes[i + 1].childNodes;
        for (let c = 0; c < nextSiblingChildNodes.length; c++) {
          spanNode.appendChild(nextSiblingChildNodes[c].cloneNode());
        }
        // 移除老元素
        parentNode.removeChild(spanNodes[i + 1]);
        // 删除过后，重新指向
        spanNodes[i + 1] = spanNodes[i];
      }
    }
    EditorHistory.execCommand(state.icon, false, null);
  }

  editorEmphasis = (state) => {
    let textNodes = EditorSelection.getTextNodes();
    let startNode = null,
      endNode = null,
      startOffset = 0,
      endOffset = 0;
    for (let i = 0; i < textNodes.length; i++) {
      // 获取
      let node = textNodes[i].childNode;
      let start = textNodes[i].startOffset;
      let end = textNodes[i].endOffset;
      // 拷贝
      let cloneNode = node.cloneNode();
      let startText = cloneNode.nodeValue.substring(0, start);
      let endText = cloneNode.nodeValue.substring(end, cloneNode.length);
      let borderText = cloneNode.nodeValue.substring(start, end);
      let span = null;
      let textParentNode = textNodes[i].childNode.parentNode;
      if (textParentNode && textParentNode.className && textParentNode.className ==
        "emphasis") {
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
          node.parentNode.insertBefore(document.createTextNode(endText),
            span.nextSibling);
        }
        if (i == 0) startNode = span.childNodes[0];
        if (i == textNodes.length - 1) {
          endNode = span.childNodes[0];
          endOffset = span.childNodes[0].length;
        }
      }
    }
    EditorSelection.addRange(startNode, startOffset, endNode, endOffset);
    // 合并相同font-border元素
    let spanNodes = EditorSelection.getSpanNodes();
    for (let i = 0; i < spanNodes.length - 1; i++) {
      let spanNode = spanNodes[i];
      let parentNode = spanNodes[i].parentNode;

      if (EditorDom.isNullOfTextNode(spanNode.nextSibling)) {
        // 移除空元素
        parentNode.removeChild(spanNode.nextSibling);
      }
      if (spanNode.nextSibling === spanNodes[i + 1]) {
        let nextSiblingChildNodes = spanNodes[i + 1].childNodes;
        for (let c = 0; c < nextSiblingChildNodes.length; c++) {
          spanNode.appendChild(nextSiblingChildNodes[c].cloneNode());
        }
        // 移除老元素
        parentNode.removeChild(spanNodes[i + 1]);
        // 删除过后，重新指向
        spanNodes[i + 1] = spanNodes[i];
      }
    }
    EditorHistory.execCommand(state.icon, false, null);
  }

  editorForeColor = (state, offsetPosition, editarea) => {
    EditorSelection.storeRange();
    offsetPosition.y += offsetPosition.h + 5;
    this.refs.color.toggle(offsetPosition, (color) => {
      EditorDom.focusNode(editarea);;
      EditorSelection.restoreRange();
      EditorHistory.execCommand('forecolor', false, color);
      this.handleRangeChange();
    });
  }

  editorBackColor = (state, offsetPosition, editarea) => {
    EditorSelection.storeRange();
    offsetPosition.y += offsetPosition.h + 5;

    this.refs.color.toggle(offsetPosition, (color) => {
      EditorDom.focusNode(editarea);;
      EditorSelection.restoreRange();
      EditorHistory.execCommand('backcolor', false, color);
      this.handleRangeChange();
    });
  }

  editorFontSize = (state, offsetPosition, editarea) => {
    EditorSelection.storeRange();
    offsetPosition.y += offsetPosition.h + 5;

    this.refs.fontsize.toggle(offsetPosition, (fontsize) => {
      EditorDom.focusNode(editarea);
      EditorSelection.restoreRange();
      EditorHistory.execCommand('fontsize', false, fontsize);
      this.handleRangeChange();
    });
  }

  editorFontFamily = (state, offsetPosition, editarea) => {
    EditorSelection.storeRange();
    offsetPosition.y += offsetPosition.h + 5;

    this.refs.fontfamily.toggle(offsetPosition, (fontfamily) => {
      EditorDom.focusNode(editarea);;
      EditorSelection.restoreRange();
      EditorHistory.execCommand('fontname', false, fontfamily);
      this.handleRangeChange();
    });
  }

  editorParagraph = (state, offsetPosition, editarea) =>  {
    EditorSelection.storeRange();
    offsetPosition.y += offsetPosition.h + 5;

    this.refs.paragraph.toggle(offsetPosition, (paragraph) => {
      EditorDom.focusNode(editarea);;
      EditorSelection.restoreRange();
      let paragraphs = EditorSelection.getParagraphs();
      let parentElement = null, childNodes = null, paraElement = null, parentNode = null
      for (let i = 0; i < paragraphs.length; i++) {
        switch (paragraphs[i].tagName.toUpperCase()) {
          case "TD":
          case "TH":
          case "DIV":
            childNodes = paragraphs[i].childNodes;
            paraElement = document.createElement(paragraph);
            for (let j = 0; j < childNodes.length; j++) {
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
            for (let j = 0; j < childNodes.length; j++) {
              paraElement.appendChild(childNodes[j]);
            }
            parentNode.removeChild(parentElement);
            break;
          default:
            break;
        }
      }
      EditorHistory.execCommand('paragraph', false, paragraph);
      this.handleRangeChange();
    });
  }

  editorHorizontal = (editarea, root) => {
    let strTime = "<hr/><p></br></p>";
    if (EditorSelection.range && EditorSelection.validateRange(root,
      EditorSelection.range)) {
      if (EditorSelection.range.pasteHTML) {
        EditorSelection.range.pasteHTML(strTime);
      } else {
        let hr = EditorDom.createHR();
        let p = EditorDom.createNodeByTag('p', '<br/>');
        EditorSelection.range.deleteContents();
        EditorSelection.insertNode(p);
        EditorSelection.insertNode(hr);
      }
    } else {
      editarea.innerHTML += strTime;
    }
    // EditorHistory.execCommand('inserthtml',false,"<hr/><p><br/></p>");
  }

  editorDate = (editarea, root) => {
    let strDate = new Date().Format("yyyy-MM-dd");
    if (EditorSelection.range && EditorSelection.validateRange(root,
      EditorSelection.range)) {
      if (EditorSelection.range.pasteHTML) {
        EditorSelection.range.pasteHTML(strDate);
      } else {
        let textNode = EditorDom.createTextNode(strDate);
        EditorSelection.range.deleteContents();
        EditorSelection.insertNode(textNode);
      }
    } else {
      editarea.innerHTML += '<p>' + strDate + '</p>';
    }
    // EditorHistory.execCommand('inserthtml',false, strDate);
  }

  editorTime = (editarea, root) => {
    let strTime = new Date().Format('hh:mm:ss');
    if (EditorSelection.range && EditorSelection.validateRange(root,
      EditorSelection.range)) {
      if (EditorSelection.range.pasteHTML) {
        EditorSelection.range.pasteHTML(strTime);
      } else {
        let textNode = EditorDom.createTextNode(strTime);
        EditorSelection.range.deleteContents();
        EditorSelection.insertNode(textNode);
      }
    } else {
      editarea.innerHTML += '<p>' + strTime + '</p>';
    }
    // EditorHistory.execCommand('inserthtml',false,strTime);
  }

  editorImage = (editarea, root) => {
    EditorSelection.storeRange();
    this.refs.image.toggle((html) => {
      EditorDom.focusNode(editarea);;
      EditorSelection.restoreRange();
      if (html && html.length > 0) {
        if (EditorSelection.range && EditorSelection.validateRange(root, EditorSelection.range)) {
          if (EditorSelection.range.pasteHTML) {
            EditorSelection.range.pasteHTML('<p>' + html + '</p>');
          } else {
            let p = EditorDom.createNodeByTag('p', html);
            EditorSelection.range.deleteContents();
            EditorSelection.insertNode(p);
          }
          // EditorHistory.execCommand('inserthtml',false,html);
        } else {
          editarea.innerHTML += '<p>' + html + '</p>';
        }
      }
    })
  }

  editorFormula = (editarea, root, offsetPosition) => {
    EditorSelection.storeRange();
    offsetPosition.y += offsetPosition.h + 5;
    offsetPosition.x -= offsetPosition.w / 2;
    this.refs.formula.toggle(offsetPosition, (latex, id) => {
      EditorDom.focusNode(editarea);;
      EditorSelection.restoreRange();

      if (latex && latex.length > 0) {
        let html =
          '<span>&nbsp;<span class="mathquill-embedded-latex" id="' +
            id + '"></span>&nbsp;</span>';
        if (EditorSelection.range && EditorSelection.validateRange(
          root, EditorSelection.range)) {
          if (EditorSelection.range.pasteHTML) {
            EditorSelection.range.pasteHTML(html);
          } else {
            let span = EditorDom.createNodeByTag('span',
              '&nbsp;<span class="mathquill-embedded-latex" id="' +
                id + '"></span>&nbsp;');
            EditorSelection.range.deleteContents();
            EditorSelection.insertNode(span);
          }
          // EditorHistory.execCommand('inserthtml',false,html);
        } else {
          editarea.innerHTML += html;
        }
        EditorTimer.setTimeout(() => {
          this.addFormula(id, latex);
        }, 200);
        this.handleRangeChange();
      }
    })
  }

  editorInsertTable = (editarea, root, offsetPosition) => {
    EditorSelection.storeRange();
    offsetPosition.y += offsetPosition.h + 5;
    offsetPosition.x -= offsetPosition.w / 2;
    this.refs.table.toggle(offsetPosition, (table) => {
      EditorDom.focusNode(editarea);;
      EditorSelection.restoreRange();
      if (EditorSelection.range && EditorSelection.validateRange(
        root, EditorSelection.range)) {
        if (EditorSelection.range.pasteHTML) {
          EditorSelection.range.pasteHTML(table.outerHTML);
        } else {
          EditorSelection.range.deleteContents();
          EditorSelection.insertNode(table);
        }
      } else {
        editarea.innerHTML += table.outerHTML;
      }
      // EditorHistory.execCommand('inserthtml',false,html);
      this.handleRangeChange();
    });
  }

  editorSpechars = (editarea, root) => {
    EditorSelection.storeRange();
    this.refs.special.toggle((char) => {
      EditorDom.focusNode(editarea);;
      EditorSelection.restoreRange();
      if (EditorSelection.range && EditorSelection.validateRange(
        root, EditorSelection.range)) {
        if (EditorSelection.range.pasteHTML) {
          EditorSelection.range.pasteHTML(char);
        } else {
          let textNode = EditorDom.createTextNode(char);
          EditorSelection.range.deleteContents();
          EditorSelection.insertNode(textNode);
        }
      } else {
        editarea.innerHTML += char;
      }
      // EditorHistory.execCommand('inserthtml',false,char);
      this.handleRangeChange();
    });
  }

  editorEmotion = (editarea, root) => {
    EditorSelection.storeRange();
    this.refs.emotion.toggle((img) => {
      EditorDom.focusNode(editarea);;
      EditorSelection.restoreRange();
      if (EditorSelection.range && EditorSelection.validateRange(
        root, EditorSelection.range)) {
        if (EditorSelection.range.pasteHTML) {
          EditorSelection.range.pasteHTML(img.outerHTML);
        } else {
          EditorSelection.range.deleteContents();
          EditorSelection.insertNode(img);
        }
      } else {
        editarea.innerHTML += img.outerHTML;
      }
      // EditorHistory.execCommand('inserthtml',false,html);
      this.handleRangeChange();
    });
  }

  handleToolbarIconClick(e, state) {
    e = e || event;
    let target = e.target || e.srcElement;
    let root = ReactDOM.findDOMNode(this.refs.root);
    let offsetPosition = EditorDom.getOffsetRootParentPosition(target, root);

    let handleRangeChange = this.handleRangeChange.bind(this);
    let editarea = ReactDOM.findDOMNode(this.refs.editarea);
    if (this.refs.editarea.getEditorRange) {
      editarea = this.refs.editarea.getEditorRange();
    }
    let editorState = this.state.editorState;
    EditorSelection.cloneRange();
    EditorSelection.storeRange();
    //关闭所有Dialog、Box、Dropdown
    this.closeAllOpenDialog(state.icon);
    EditorSelection.restoreRange();
    switch (state.icon) {
      case "source":
        this.editorSource(state)
        break;
      case "undo":
        EditorHistory.undo();
        break;
      case "redo":
        EditorHistory.redo();
        break;
      case "removeformat":
        this.editorRemoveFormat(state)
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
        EditorHistory.execCommand(state.icon, false, null);
        break;
      case "touppercase":
      case "tolowercase":
        this.editorUpLowCase(state)
        break;
      case "fontborder":
        this.editorFontBorder(state)
        break;
      case "emphasis":
        this.editorEmphasis(state)
        break;
      case "forecolor":
        this.editorForeColor(state, offsetPosition, editarea)
        break;
      case "backcolor":
        this.editorBackColor(state, offsetPosition, editarea)
        break;
      case "fontsize":
        this.editorFontSize(state, offsetPosition, editarea)
        break;
      case "fontfamily":
        this.editorFontFamily(state, offsetPosition, editarea)
        break;
      case "paragraph":
        this.editorParagraph(state, offsetPosition, editarea)
        break;
      case "cleardoc":
        editorState.content = "<p><br/></p>"
        break;
      case "horizontal":
        this.editorHorizontal(editarea, root)
        break;
      case "date":
        this.editorDate(editarea, root)
        break;
      case "time":
        this.editorTime(editarea, root)
        break;
      case "image":
        this.editorImage(editarea, root)
        break;
      case "formula":
        this.editorFormula(editarea, root, offsetPosition)
        break;
      case "inserttable":
        this.editorInsertTable(editarea, root, offsetPosition)
        break;
      case "spechars":
        this.editorSpechars(editarea, root)
        break;
      case "emotion":
        this.editorEmotion(editarea, root)
        break;
      default:
        const { toolbar = {} } = this.props.plugins || {};
        const pIcons = toolbar.icons || [];
        var fIcon = pIcons.find(ic=> ic.name === state.icon);
        if(fIcon && fIcon.onIconClick)
          fIcon.onIconClick({
            editarea, 
            root,
            offsetPosition,
            state,
            ref: this.iconComponetMap[state.icon]
          })
        break;
    }
    // setState
    editorState.icons[state.icon] = state;
    editorState.icon = state.icon;
    EditorSelection.createRange();

    // range state
    handleRangeChange();
    EditorDom.stopPropagation(e);
  }
  closeAllOpenDialog(icon) {
    let refsDialog = ["image", "color", "formula", "table", "special",
      "emotion", "fontsize", "fontfamily", "paragraph"
    ];
    let icons = ["forecolor", "backcolor", "image", "emotion", "spechars",
      "inserttable", "formula", "paragraph", "fontsize", "fontfamily"
    ]
    if (icons.indexOf(icon) == -1) return;
    for (let i = 0; i < refsDialog.length; i++) {
      this.refs[refsDialog[i]].close();
    }
  }
  // utils
  addFormula(id, latex) {
    let editarea = ReactDOM.findDOMNode(this.refs.editarea);
    let htmlElement = document.getElementById(id);

    let config = {
      handlers: {
        edit: function() {}
      },
      restrictMismatchedBrackets: true
    };

    if (!MQ) MQ = MathQuill ? MathQuill.getInterface(2) : null;

    if (htmlElement == null && MQ == null) return;
    let mathField = MQ.MathField(htmlElement, config);
    mathField.latex(latex);
    let $htmlElement = $(htmlElement);
    $htmlElement.keydown(function(e) {
      mathField.focus();
      EditorDom.stopPropagation(e);
    });
    $htmlElement.keyup(function(e) {
      mathField.focus();
      EditorDom.stopPropagation(e);
    });
    $htmlElement.mouseup(function(e) {
      mathField.focus();
      EditorDom.stopPropagation(e);
    });
    $htmlElement.mousedown(function(e) {
      EditorDom.stopPropagation(e);
    });
    $htmlElement.mousemove(function(e) {
      EditorDom.stopPropagation(e);
    });
    $(editarea)
      .mousedown(function(e) {
        mathField.blur();
        EditorDom.stopPropagation(e);
      })
    $(editarea)
      .mousemove(function(e) {
        EditorDom.stopPropagation(e);
      })
  }
  autoSave() {
    EditorHistory.execCommand('autosave', false, null);
  }
  // public functions
  findDOMNode(refName) {
    // 对外公布方法
    let keys = ["root", "editarea", "toolbar", "color"];
    if (keys.indexOf(refName) == -1)
      return {
        ref: null,
        dom: null
      };
    return {
      ref: this.refs[refName],
      dom: ReactDOM.findDOMNode(this.refs[refName])
    }
  }
  setContent(content) {
    content = content || "";
    // 后续添加校验方法
    this.refs.editarea.setContent(content);
    // mathquill supports
    if (content.indexOf("mathquill-embedded-latex") != -1) {
      let _self = this;
      EditorTimer.setTimeout(function() {
        let editarea = ReactDOM.findDOMNode(_self.refs.editarea);
        let elements = editarea.querySelectorAll(
          '.mathquill-embedded-latex');
        for (let i = 0; i < elements.length; i++) {
          if (!elements[i].id) {
            let id = "mathquill-" + i + "-" + new Date()
              .valueOf();
            let latex = elements[i].innerHTML;
            elements[i].id = id;
            _self.addFormula(id, latex);
          }
        }
      }, 100);
    }
  }
  getContent() {
    if (this.refs.editarea)
      return this.refs.editarea.getContent();
    else
      return "";
  }
  focusEditor() {
    let editarea = ReactDOM.findDOMNode(this.refs.editarea);
    EditorDom.focusNode(editarea);;
  }
  // render functions  
  renderEditArea() {
    let showHtml = this.state.editorState.showHtml;
    if (showHtml) {
      return (
        <EditorTextArea ref="editarea" onChange={this.handleChange.bind(this)} />)
    } else {
      return (
        <EditorContentEditableDiv
          ref="editarea"
          handleKeyDown={this.handleKeyDown}
          handleKeyUp={this.handleKeyUp}
          onEditorMount={this.props.onEditorMount}
          onRangeChange={this.handleRangeChange.bind(this)} />
      )
    }
  }
  render() {
    let editArea = this.renderEditArea();
    let {
      index,
      fontSize,
      paragraph,
      fontFamily,
      icons,
      plugins,
      onBlur,
      className,
      id,
      onFocus,
      onClick,
      onChange,
      onEditorMount,
      uploadImageCallback,
      ...props
    } = this.props;
    let editorState = this.state.editorState;
    let _icons = icons.join(" ").replace(/\|/gm, "separator").split(" ");
    const { toolbar = {} } = this.props.plugins || {};
    const pIcons = toolbar.icons || [];
    EditorSelection.customIcons = pIcons;
    return (
      <div
        ref="root"
        id={id}
        className={"editor-container editor-default" +(className?" "+className:"")}
        onClick={this.handleClick.bind(this)}
        onBlur={this.handleRangeChange.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        {...props}>
				<EditorToolbar
          ref="toolbar"
          editorState={editorState}
          onIconClick={(e, state)=> this.handleToolbarIconClick(e, state)}
          icons={this.props.icons}
          customIcons={pIcons}
          paragraph={this.props.paragraph}
          fontsize={this.props.fontSize}
          fontfamily={this.props.fontFamily}
        >
					<ImageDialog
            hidden={_icons.indexOf("image")==-1}
            ref="image"
            uploader={plugins.image.uploader}
            customUploader={plugins.image.customUploader}
          />
					<ColorDropdown
            hidden={_icons.indexOf("forecolor")==-1 &&_icons.indexOf("forecolor")}
            ref="color"
          />
					<FormulaDropdown
            hidden={ _icons.indexOf("formula")==-1}
            ref="formula"
          />
					<TablePickerDropdown
            hidden={_icons.indexOf("inserttable")==-1}
            ref="table"
          />
					<SpecialCharsDialog
            hidden={ _icons.indexOf("spechars")==-1}
            ref="special"
          />
					<EmotionDialog
            hidden={ _icons.indexOf("emotion")==-1}
            ref="emotion"
          />
					<FontSizeComboBox
            hidden={ _icons.indexOf("fontsize") ==-1}
            ref="fontsize"
            fontsize={this.props.fontSize}
            value={editorState.icons["fontsize"]?editorState.icons["fontsize"].value: fontSize[0].value}
          />
					<FontFamilyComboBox
            hidden={ _icons.indexOf("fontfamily") ==-1 }
            ref="fontfamily"
            fontfamily={this.props.fontFamily}
            value={editorState.icons["fontfamily"]?editorState.icons["fontfamily"].value: fontFamily[0].value}
          />
					<ParagraphComboBox
            hidden={_icons.indexOf("paragraph") ==-1 }
            ref="paragraph"
            paragraph={this.props.paragraph}
            value={editorState.icons["paragraph"]?editorState.icons["paragraph"].value: paragraph[0].value}
          />
          {
            pIcons.filter(ic=>ic.component).map(ic=>{
              const Com = ic.component;
              return <Com 
                hidden={ _icons.indexOf(ic.name) ==-1}
                ref={(com)=> this.iconComponetMap[ic.name] = com}
                {...ic.props}
                value={editorState.icons[ic.name]?editorState.icons[ic.name].value: ic.defaultValue}
              />
            })
          }
					</EditorToolbar>
					{editArea}
				</div>
    )
  }
}
