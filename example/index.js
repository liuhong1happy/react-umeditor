import React, { Component } from 'react'
import ReactDOM from'react-dom'
// var Editor = require('../src/editor');
import Editor from '../lib/editor';
import LinkDialog from './plugins/LinkDialog';
import EditorSelection from '../lib/utils/EditorSelection'
import EditorDOM from '../lib/utils/EditorDOM'

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			form_data: {
				text: "123",
				editor: ""
			}
		}
	}
	getIcons(){
		return [
				"source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
				"paragraph fontfamily fontsize | superscript subscript | ",
				"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
				"cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
				"horizontal date time  | image spechars | inserttable | custom-link"
			]
	}
	handleFormChange(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var value = target.value;
		var editor = this.refs.editor.getContent();
		var form_data = this.state.form_data;
		form_data.text = value;
		form_data.editor = editor;
		this.setState({
			form_data: form_data
		})
	}
	handleSubmitForm(){
		var form_data = this.state.form_data;
		alert(form_data.editor);
	}
	handleChange(content){
		console.log(content);
		var form_data = this.state.form_data;
		form_data.editor = content;
		this.setState({
			form_data: form_data
		})
	}

	render(){
		  var icons = this.getIcons();
		  var plugins = {
			    image:{
				      uploader: {
								url:'/upload',
								name:"file",
								filter:(res)=> res.url,
								data: {
									'filename': '1.jpg'
								}
							}
					},
					toolbar: {
						icons: [{
							name: 'custom-link',
							title: "超链接",
							className: "editor-icon icon-link",
							component: LinkDialog,
							onIconClick:({ editarea, root, ref })=> {
								EditorSelection.storeRange();
								ref.toggle((link) => {
									editarea.focus();
									EditorSelection.restoreRange();
									if (link) {
										if (EditorSelection.range && EditorSelection.validateRange(root, EditorSelection.range)) {
											if (EditorSelection.range.pasteHTML) {
												EditorSelection.range.pasteHTML('<a href="'+link.url+'" target="'+link.target+'">' + link.title + '</a>');
											} else {
												let a = EditorDOM.createNodeByTag('a', link.title);
												a.target = link.target;
												a.href = link.url;
												EditorSelection.range.deleteContents();
												EditorSelection.insertNode(a);
											}
										} else {
											editarea.innerHTML += '<a href="'+link.url+'" target="'+link.target+'">' + link.title + '</a>';
										}
									}
								})
							},
							mapRangeState: (rangeState, selection)=> {
								var parentElement = selection.range.startContainer.parentNode;
								rangeState["link"] = { active:false, icon:"link"}
								while((parentElement.tagName || parentElement.nodeName).toUpperCase()!="DIV"){
									var tagName = parentElement.tagName || parentElement.nodeName;
									switch(tagName.toUpperCase()){
										case "A":
											rangeState["link"] = { active:true,icon:"link"}
											break;
									}
									parentElement = parentElement.parentNode;
								}
								return rangeState;
							}
						}]
					}
		  }
		  var count = 100;
		  var editors = [];
		  for(var i=0;i<count;i++){
			    editors.push({
				      icons:icons,
				      plugins:plugins
			    })
		  }
		  var form_data = this.state.form_data;
		return (
			<div>
				<Editor
					icons={icons}
					plugins={plugins}
					value={form_data.editor}
					defaultValue="<p>React Umeditor</p>"
					onChange={this.handleChange.bind(this)}
				/>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('react-container'));
