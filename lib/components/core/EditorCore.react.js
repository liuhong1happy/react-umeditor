'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');

var _require = require('../../constants/EditorConstants');

var EditorIconTypes = _require.EditorIconTypes;

// utlils
var EditorHistory = require('../../utils/EditorHistory');
var EditorSelection = require('../../utils/EditorSelection');
var EditorDOM = require('../../utils/EditorDOM');
var EditorTimer = require('../../utils/EditorTimer');

// dialog & dropdown
var ColorDropdown = require('../plugins/ColorDropdown.react');
var FormulaDropdown = require('../plugins/FormulaDropdown.react');
var TablePickerDropdown = require('../plugins/TablePickerDropdown.react');
// combobox
var FontSizeComboBox = require('../plugins/FontSizeComboBox.react');
var FontFamilyComboBox = require('../plugins/FontFamilyComboBox.react');
var ParagraphComboBox = require('../plugins/ParagraphComboBox.react');
// dialog
var EmotionDialog = require('../plugins/EmotionDialog.react');
var SpecialCharsDialog = require('../plugins/SpecialCharsDialog.react');
var ImageDialog = require('../plugins/ImageDialog.react');

// base components
var EditorToolbar = require('../core/EditorToolbar.react');
var EditorTextArea = require('../core/EditorTextArea.react');
var EditorContentEditableDiv = require('../core/EditorContentEditableDiv.react');

// 需要外部引用MathQuill
var MQ = MathQuill ? MathQuill.getInterface(2) : null;

// key down context
var saveSceneTimer = null;
var keycont = 0;

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

var EditorCore = React.createClass({
	displayName: 'EditorCore',

	// init & update
	getInitialState: function getInitialState() {
		return {
			editorState: {
				icon: "source",
				showHtml: false,
				icons: {
					"forecolor": { color: 'transparent', icon: "forecolor" },
					"backcolor": { color: 'transparent', icon: "backcolor" },
					"fontsize": { value: "3", icon: "fontsize" },
					"paragraph": { value: "p", icon: "fontsize" },
					"fontfamily": { value: "宋体, SimSun", icon: "fontfamily" },
					"indent": { active: false, icon: "indent" },
					"outdent": { active: true, icon: "outdent" }
				}
			},
			defaultValue: this.props.defaultValue ? this.props.defaultValue : "<p>This is an Editor</p>",
			value: this.props.value
		};
	},
	componentDidMount: function componentDidMount() {
		EditorHistory.clear();
		this.setContent(this.state.value || this.state.defaultValue);
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		var isCollapsed = true;
		editarea.addEventListener('keydown', this.handleKeyDown);
		editarea.addEventListener('keyup', this.handleKeyUp);
		var onEditorMount = this.props.onEditorMount;
		setTimeout(onEditorMount, 10);
	},
	componentDidUpdate: function componentDidUpdate() {
		var editorState = this.state.editorState;
		switch (editorState.icon) {
			case "source":
				if (editorState.content) this.setContent(editorState.content);
				break;
			case "cleardoc":
				if (editorState.content) this.setContent(editorState.content);
				break;
		}
	},
	componentWillUnmont: function componentWillUnmont() {
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		editarea.removeEventListener('keydown', this.handleKeyDown);
		editarea.removeEventListener('keyup', this.handleKeyUp);
	},
	// event handler
	handleKeyDown: function handleKeyDown(evt) {
		evt = evt || event;
		var target = evt.target || evt.srcElement;
		if (target.className && target.className.indexOf('editor-contenteditable-div') != -1) {
			var keyCode = evt.keyCode || evt.which;
			var autoSave = this.autoSave;
			if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
				if (EditorHistory.getCommandStack().length == 0) {
					autoSave();
					keycont = 0;
				}
				clearTimeout(saveSceneTimer);
				saveSceneTimer = EditorTimer.setTimeout(function () {
					var interalTimer = EditorTimer.setInterval(function () {
						autoSave();
						keycont = 0;
						EditorTimer.clearInterval(interalTimer);
					}, 300);
				}, 200);
				lastKeyCode = keyCode;
				keycont++;
				if (keycont >= maxInputCount) {
					autoSave();
					keycont = 0;
				}
			}
		}
		EditorDOM.stopPropagation(evt);
	},
	handleKeyUp: function handleKeyUp(evt) {
		evt = evt || event;
		var target = evt.target || evt.srcElement;
		if (target.className && target.className.indexOf('editor-contenteditable-div') != -1) {
			var keyCode = evt.keyCode || evt.which;
			if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
				// some handle
			}
		}
		EditorDOM.stopPropagation(evt);
	},
	handleFocus: function handleFocus(e) {
		if (this.props.onFocus) {
			this.props.onFocus(e, this.findDOMNode('root'));
		}
		EditorDOM.stopPropagation(e);
	},
	handleClick: function handleClick(e) {
		EditorDOM.stopPropagation(e);
	},
	exchangeRangeState: function exchangeRangeState(editorState) {
		var rangeState = EditorSelection.getRangeState();
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
	},
	handleRangeChange: function handleRangeChange(e) {
		e = e || event;
		if (e && e.type == "blur") return;
		var target = e ? e.target || e.srcElement : null;
		var selection = EditorSelection.getSelection();
		if (selection && selection.rangeCount > 0) {
			var editorState = this.state.editorState;
			editorState = this.exchangeRangeState(editorState);
			// editorState.icon = false;
			this.setState({
				editorState: editorState
			});
			if (this.refs.editarea && this.refs.editarea.clearResizeTarget) {
				this.refs.editarea.clearResizeTarget();
			}
		} else if (target) {
			var tagName = target.tagName.toUpperCase();
			switch (tagName) {
				case "IMG":
					if (this.refs.editarea && this.refs.editarea.setResizeTarget) {
						this.refs.editarea.setResizeTarget(target);
					}
					break;
			}
		}
	},
	handleToolbarIconClick: function handleToolbarIconClick(e, state) {
		e = e || event;
		var target = e.target || e.srcElement;
		var root = ReactDOM.findDOMNode(this.refs.root);
		var offsetPosition = EditorDOM.getOffsetRootParentPosition(target, root);

		var handleRangeChange = this.handleRangeChange;
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		if (this.refs.editarea.getEditorRange) {
			editarea = this.refs.editarea.getEditorRange();
		}
		var editorState = this.state.editorState;
		EditorSelection.cloneRange();
		EditorSelection.storeRange();
		//关闭所有Dialog、Box、Dropdown
		this.closeAllOpenDialog(state.icon);
		EditorSelection.restoreRange();
		switch (state.icon) {
			case "source":
				editorState.showHtml = !editorState.showHtml;
				state.active = editorState.showHtml;
				editorState.content = this.refs.editarea.getContent();
				break;
			case "undo":
				EditorHistory.undo();
				break;
			case "redo":
				EditorHistory.redo();
				break;
			case "removeformat":
				EditorHistory.execCommand(state.icon, false, null);
				EditorSelection.storeRange();
				var spanNodes = EditorSelection.getSpanNodes();
				for (var i = 0; i < spanNodes.length; i++) {
					switch (spanNodes[i].className) {
						case "font-border":
							var spanNode = spanNodes[i];
							var parentNode = spanNode.parentNode;
							var nextSibling = spanNode.nextSibling || spanNode;
							var childSum = spanNode.childNodes.length;
							for (var c = 0; c < childSum; c++) {
								parentNode.insertBefore(spanNode.childNodes[c].cloneNode(), nextSibling);
							}
							parentNode.removeChild(spanNodes[i]);
							break;
						case "emphasis":
							var spanNode = spanNodes[i];
							var parentNode = spanNode.parentNode;
							var nextSibling = spanNode.nextSibling || spanNode;
							var childSum = spanNode.childNodes.length;
							for (var c = 0; c < childSum; c++) {
								parentNode.insertBefore(spanNode.childNodes[c].cloneNode(), nextSibling);
							}
							parentNode.removeChild(spanNodes[i]);
							break;
					}
				}
				EditorSelection.restoreRange();
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
				EditorSelection.storeRange();
				var textNodes = EditorSelection.getTextNodes();
				for (var i = 0; i < textNodes.length; i++) {
					var node = textNodes[i].childNode;
					var start = textNodes[i].startOffset;
					var end = textNodes[i].endOffset;
					node.nodeValue = node.nodeValue.substring(0, start) + (state.icon == "touppercase" ? node.nodeValue.substring(start, end).toUpperCase() : node.nodeValue.substring(start, end).toLowerCase()) + node.nodeValue.substring(end, node.length);
				}
				EditorHistory.execCommand(state.icon, false, null);
				EditorSelection.restoreRange();
				break;
			case "fontborder":
				var textNodes = EditorSelection.getTextNodes();
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
				EditorSelection.addRange(startNode, startOffset, endNode, endOffset);
				// 合并相同font-border元素
				var spanNodes = EditorSelection.getSpanNodes();
				for (var i = 0; i < spanNodes.length - 1; i++) {
					var spanNode = spanNodes[i];
					var parentNode = spanNodes[i].parentNode;

					if (EditorDOM.isNullOfTextNode(spanNode.nextSibling)) {
						// 移除空元素
						parentNode.removeChild(spanNode.nextSibling);
					}
					if (spanNode.nextSibling === spanNodes[i + 1]) {
						var nextSiblingChildNodes = spanNodes[i + 1].childNodes;
						for (var c = 0; c < nextSiblingChildNodes.length; c++) {
							spanNode.appendChild(nextSiblingChildNodes[c].cloneNode());
						}
						// 移除老元素
						parentNode.removeChild(spanNodes[i + 1]);
						// 删除过后，重新指向
						spanNodes[i + 1] = spanNodes[i];
					}
				}
				EditorHistory.execCommand(state.icon, false, null);
				break;
			case "emphasis":
				var textNodes = EditorSelection.getTextNodes();
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
				EditorSelection.addRange(startNode, startOffset, endNode, endOffset);
				// 合并相同font-border元素
				var spanNodes = EditorSelection.getSpanNodes();
				for (var i = 0; i < spanNodes.length - 1; i++) {
					var spanNode = spanNodes[i];
					var parentNode = spanNodes[i].parentNode;

					if (EditorDOM.isNullOfTextNode(spanNode.nextSibling)) {
						// 移除空元素
						parentNode.removeChild(spanNode.nextSibling);
					}
					if (spanNode.nextSibling === spanNodes[i + 1]) {
						var nextSiblingChildNodes = spanNodes[i + 1].childNodes;
						for (var c = 0; c < nextSiblingChildNodes.length; c++) {
							spanNode.appendChild(nextSiblingChildNodes[c].cloneNode());
						}
						// 移除老元素
						parentNode.removeChild(spanNodes[i + 1]);
						// 删除过后，重新指向
						spanNodes[i + 1] = spanNodes[i];
					}
				}
				EditorHistory.execCommand(state.icon, false, null);
				break;
			case "forecolor":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;
				this.refs.color.toggle(offsetPosition, function (e, color) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('forecolor', false, color);
					handleRangeChange();
				});
				break;
			case "backcolor":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;

				this.refs.color.toggle(offsetPosition, function (e, color) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('backcolor', false, color);
					handleRangeChange();
				});
				break;
			case "fontsize":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;

				this.refs.fontsize.toggle(offsetPosition, function (e, fontsize) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('fontsize', false, fontsize);
					handleRangeChange();
				});
				break;
			case "fontfamily":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;

				this.refs.fontfamily.toggle(offsetPosition, function (e, fontfamily) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('fontname', false, fontfamily);
					handleRangeChange();
				});
				break;
			case "paragraph":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;

				this.refs.paragraph.toggle(offsetPosition, function (e, paragraph) {
					editarea.focus();
					EditorSelection.restoreRange();
					var paragraphs = EditorSelection.getParagraphs();
					for (var i = 0; i < paragraphs.length; i++) {
						switch (paragraphs[i].tagName.toUpperCase()) {
							case "TD":
							case "TH":
							case "DIV":
								var childNodes = paragraphs[i].childNodes;
								var paraElement = document.createElement(paragraph);
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
								var parentElement = paragraphs[i];
								var childNodes = paragraphs[i].childNodes;
								var paraElement = document.createElement(paragraph);
								var parentNode = parentElement.parentNode;
								parentNode.insertBefore(paraElement, parentElement.nextSibling);
								for (var j = 0; j < childNodes.length; j++) {
									paraElement.appendChild(childNodes[j]);
								}
								parentNode.removeChild(parentElement);
								break;
							default:
								break;
						}
					}
					EditorHistory.execCommand('paragraph', false, paragraph);
					handleRangeChange();
				});
				break;
			case "cleardoc":
				editorState.content = "<p><br/></p>";
				break;
			case "horizontal":
				var strTime = "<hr/><p></br></p>";
				if (EditorSelection.range.pasteHTML) {
					EditorSelection.range.pasteHTML(strTime);
				} else {
					var hr = EditorDOM.createHR();
					var p = EditorDOM.createNodeByTag('p', '<br/>');
					EditorSelection.range.deleteContents();
					EditorSelection.insertNode(p);
					EditorSelection.insertNode(hr);
				}
				// EditorHistory.execCommand('inserthtml',false,"<hr/><p><br/></p>");
				break;
			case "date":
				var strDate = new Date().Format("yyyy-MM-dd");
				if (EditorSelection.range.pasteHTML) {
					EditorSelection.range.pasteHTML(strDate);
				} else {
					var textNode = EditorDOM.createTextNode(strDate);
					EditorSelection.range.deleteContents();
					EditorSelection.insertNode(textNode);
				}
				// EditorHistory.execCommand('inserthtml',false, strDate);
				break;
			case "time":
				var strTime = new Date().Format('hh:mm:ss');
				if (EditorSelection.range.pasteHTML) {
					EditorSelection.range.pasteHTML(strTime);
				} else {
					var textNode = EditorDOM.createTextNode(strTime);
					EditorSelection.range.deleteContents();
					EditorSelection.insertNode(textNode);
				}
				// EditorHistory.execCommand('inserthtml',false,strTime);
				break;
			case "image":
				EditorSelection.storeRange();
				this.refs.image.toggle(function (e, html) {
					editarea.focus();
					EditorSelection.restoreRange();

					if (html && html.length > 0) {
						if (EditorSelection.range) {
							if (EditorSelection.range.pasteHTML) {
								EditorSelection.range.pasteHTML('<p>' + html + '</p>');
							} else {
								var p = EditorDOM.createNodeByTag('p', html);
								EditorSelection.range.deleteContents();
								EditorSelection.insertNode(p);
							}
							// EditorHistory.execCommand('inserthtml',false,html);
						} else {
								editarea.innerHTML += '<p>' + html + '</p>';
							}
					}
				});
				break;
			case "formula":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;
				offsetPosition.x -= offsetPosition.w / 2;
				var _self = this;
				this.refs.formula.toggle(offsetPosition, function (e, latex, id) {
					editarea.focus();
					EditorSelection.restoreRange();

					if (latex && latex.length > 0) {
						var html = '<span>&nbsp;<span class="mathquill-embedded-latex" id="' + id + '"></span>&nbsp;</span>';
						if (EditorSelection.range) {
							if (EditorSelection.range.pasteHTML) {
								EditorSelection.range.pasteHTML(html);
							} else {
								var span = EditorDOM.createNodeByTag('span', '&nbsp;<span class="mathquill-embedded-latex" id="' + id + '"></span>&nbsp;');
								EditorSelection.range.deleteContents();
								EditorSelection.insertNode(span);
							}
							// EditorHistory.execCommand('inserthtml',false,html);
						} else {
								editarea.innerHTML += html;
							}
						EditorTimer.setTimeout(function () {
							_self.addFormula(id, latex);
						}, 200);
						handleRangeChange();
					}
				});
				break;
			case "inserttable":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;
				offsetPosition.x -= offsetPosition.w / 2;
				this.refs.table.toggle(offsetPosition, function (e, table) {
					editarea.focus();
					EditorSelection.restoreRange();
					if (EditorSelection.range.pasteHTML) {
						EditorSelection.range.pasteHTML(table.outerHTML);
					} else {
						EditorSelection.range.deleteContents();
						EditorSelection.insertNode(table);
					}
					// EditorHistory.execCommand('inserthtml',false,html);
					handleRangeChange();
				});
				break;
			case "spechars":
				EditorSelection.storeRange();
				this.refs.special.toggle(function (e, char) {
					editarea.focus();
					EditorSelection.restoreRange();

					if (EditorSelection.range.pasteHTML) {
						EditorSelection.range.pasteHTML(char);
					} else {
						var textNode = EditorDOM.createTextNode(char);
						EditorSelection.range.deleteContents();
						EditorSelection.insertNode(textNode);
					}
					// EditorHistory.execCommand('inserthtml',false,char);
					handleRangeChange();
				});
				break;
			case "emotion":
				EditorSelection.storeRange();
				this.refs.emotion.toggle(function (e, img) {
					editarea.focus();
					EditorSelection.restoreRange();

					if (EditorSelection.range.pasteHTML) {
						EditorSelection.range.pasteHTML(img.outerHTML);
					} else {
						EditorSelection.range.deleteContents();
						EditorSelection.insertNode(img);
					}

					// EditorHistory.execCommand('inserthtml',false,html);
					handleRangeChange();
				});
				break;
		}
		// setState
		editorState.icons[state.icon] = state;
		editorState.icon = state.icon;
		EditorSelection.createRange();
		// range state
		editorState = this.exchangeRangeState(editorState);
		this.setState({
			editorState: editorState
		});
		EditorDOM.stopPropagation(e);
	},
	closeAllOpenDialog: function closeAllOpenDialog(icon) {
		var refsDialog = ["image", "color", "formula", "table", "special", "emotion", "fontsize", "fontfamily", "paragraph"];
		var icons = ["forecolor", "backcolor", "image", "emotion", "spechars", "inserttable", "formula", "paragraph", "fontsize", "fontfamily"];
		if (icons.indexOf(icon) == -1) return;
		for (var i = 0; i < refsDialog.length; i++) {
			this.refs[refsDialog[i]].close();
			console.log("closeDialog", refsDialog[i]);
		}
	},
	// utils
	addFormula: function addFormula(id, latex) {
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		var htmlElement = document.getElementById(id);

		var config = {
			handlers: { edit: function edit() {} },
			restrictMismatchedBrackets: true
		};
		if (htmlElement == null && MQ == null) return;
		var mathField = MQ.MathField(htmlElement, config);
		mathField.latex(latex);
		var $htmlElement = $(htmlElement);
		$htmlElement.keydown(function (e) {
			mathField.focus();
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.keyup(function (e) {
			mathField.focus();
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.mouseup(function (e) {
			mathField.focus();
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.mousedown(function (e) {
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.mousemove(function (e) {
			EditorDOM.stopPropagation(e);
		});
		$(editarea).mousedown(function (e) {
			mathField.blur();
			EditorDOM.stopPropagation(e);
		});
		$(editarea).mousemove(function (e) {
			EditorDOM.stopPropagation(e);
		});
	},
	autoSave: function autoSave() {
		EditorHistory.execCommand('autosave', false, null);
	},
	// public functions
	findDOMNode: function findDOMNode(refName) {
		// 对外公布方法
		var keys = ["root", "editarea", "toolbar", "color"];
		if (keys.indexOf(refName) == -1) return { ref: null, dom: null };
		return {
			ref: this.refs[refName],
			dom: ReactDOM.findDOMNode(this.refs[refName])
		};
	},
	setContent: function setContent(content) {
		var content = content || this.state.defaultValue || "";
		// 后续添加校验方法
		this.refs.editarea.setContent(content);
		// mathquill supports
		if (content.indexOf("mathquill-embedded-latex") != -1) {
			var _self = this;
			EditorTimer.setTimeout(function () {
				var editarea = ReactDOM.findDOMNode(_self.refs.editarea);
				var elements = editarea.querySelectorAll('.mathquill-embedded-latex');
				for (var i = 0; i < elements.length; i++) {
					if (!elements[i].id) {
						var id = "mathquill-" + i + "-" + new Date().valueOf();
						var latex = elements[i].innerHTML;
						elements[i].id = id;
						_self.addFormula(id, latex);
					}
				}
			}, 200);
		}
	},
	getContent: function getContent() {
		return this.refs.editarea.getContent();
	},
	focusEditor: function focusEditor() {
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		editarea.focus();
	},
	// render functions 
	genEditArea: function genEditArea() {
		var showHtml = this.state.editorState.showHtml;
		if (showHtml) {
			return React.createElement(EditorTextArea, { ref: 'editarea' });
		} else {
			return React.createElement(EditorContentEditableDiv, { ref: 'editarea', onRangeChange: this.handleRangeChange });
		}
	},
	render: function render() {
		var editArea = this.genEditArea();
		var _props = this.props;
		var index = _props.index;
		var fontSize = _props.fontSize;
		var paragraph = _props.paragraph;
		var fontFamily = _props.fontFamily;
		var icons = _props.icons;
		var plugins = _props.plugins;
		var onBlur = _props.onBlur;
		var className = _props.className;
		var id = _props.id;
		var onFocus = _props.onFocus;
		var onClick = _props.onClick;
		var onEditorMount = _props.onEditorMount;

		var props = _objectWithoutProperties(_props, ['index', 'fontSize', 'paragraph', 'fontFamily', 'icons', 'plugins', 'onBlur', 'className', 'id', 'onFocus', 'onClick', 'onEditorMount']);

		var editorState = this.state.editorState;
		var _icons = icons.join(" ").replace(/\|/gm, "separator").split(" ");
		return React.createElement(
			'div',
			_extends({ ref: 'root', id: id, className: "editor-container editor-default" + (className ? " " + className : ""), onClick: this.handleClick, onBlur: this.handleRangeChange, onFocus: this.handleFocus }, props),
			React.createElement(
				EditorToolbar,
				{ ref: 'toolbar', editorState: editorState, onIconClick: this.handleToolbarIconClick, icons: this.props.icons, paragraph: this.props.paragraph, fontsize: this.props.fontSize, fontfamily: this.props.fontFamily },
				React.createElement(ImageDialog, { hidden: _icons.indexOf("image") == -1, ref: 'image', uploader: this.props.plugins.image.uploader }),
				React.createElement(ColorDropdown, { hidden: _icons.indexOf("forecolor") == -1 && _icons.indexOf("forecolor"), ref: 'color' }),
				React.createElement(FormulaDropdown, { hidden: _icons.indexOf("formula") == -1, ref: 'formula' }),
				React.createElement(TablePickerDropdown, { hidden: _icons.indexOf("inserttable") == -1, ref: 'table' }),
				React.createElement(SpecialCharsDialog, { hidden: _icons.indexOf("spechars") == -1, ref: 'special' }),
				React.createElement(EmotionDialog, { hidden: _icons.indexOf("emotion") == -1, ref: 'emotion' }),
				React.createElement(FontSizeComboBox, { hidden: _icons.indexOf("fontsize") == -1, ref: 'fontsize', fontsize: this.props.fontSize, value: editorState.icons["fontsize"] ? editorState.icons["fontsize"].value : fontSize[0].value }),
				React.createElement(FontFamilyComboBox, { hidden: _icons.indexOf("fontfamily") == -1, ref: 'fontfamily', fontfamily: this.props.fontFamily, value: editorState.icons["fontfamily"] ? editorState.icons["fontfamily"].value : fontFamily[0].value }),
				React.createElement(ParagraphComboBox, { hidden: _icons.indexOf("paragraph") == -1, ref: 'paragraph', paragraph: this.props.paragraph, value: editorState.icons["paragraph"] ? editorState.icons["paragraph"].value : paragraph[0].value })
			),
			editArea
		);
	}
});

module.exports = EditorCore;