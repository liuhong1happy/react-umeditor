var React = require('react');
var ReactDOM = require('react-dom');
var Editor = require('../lib/editor');

class App extends React.Component{
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
				"horizontal date time  | image spechars | inserttable"
			]
	}
	getQiniuUploader(){
		return {
			url:'http://upload.qiniu.com',
			type:'qiniu',
			name:"file",
			request: "image_src",
			qiniu:{
				app:{
					Bucket:"liuhong1happy",
					AK:"l9vEBNTqrz7H03S-SC0qxNWmf0K8amqP6MeYHNni",
					SK:"eizTTxuA0Kq1YSe2SRdOexJ-tjwGpRnzztsSrLKj"
				},
                domain:"http://o9sa2vijj.bkt.clouddn.com",
                genKey:function(options){
                    return options.file.type +"-"+ options.file.size +"-"+ options.file.lastModifiedDate.valueOf() +"-"+ new Date().valueOf()+"-"+options.file.name;
                }
			}
		}
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
		var uploader = this.getQiniuUploader();
		var plugins = {
			image:{
				uploader:uploader
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
		//		return (<div>{
		//			editors.map(function(ele,pos){
		//				return (<Editor key={pos} icons={ele.icons} plugins={ele.plugins} />)
		//			})
		//		}</div>);

		return (<Editor icons={icons}  plugins={plugins} value={form_data.editor} defaultValue="<p>React Umeditor</p>" onChange={this.handleChange.bind(this)}/>)
//		return (<div>
//				<Editor ref="editor" icons={icons} plugins={plugins} value={form_data.editor} onChange={this.handleChange.bind(this)}/>
//				<input type="text" value={form_data.text} onChange={this.handleFormChange.bind(this)}/>
//				<input type="submit" value="提交" onClick={this.handleSubmitForm.bind(this)} />
//		   </div>)
	}
}
	
ReactDOM.render(<App />, document.getElementById('react-container'));