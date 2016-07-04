var React = require('react');
var ReactDOM = require('react-dom');
var Editor = require('react-umeditor');

var App = React.createClass({
	getIcons:function(){
		return [
				"source | undo redo | bold italic underline strikethrough fontborder | ",
				"paragraph fontfamily fontsize | superscript subscript | ",
				"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
				"cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
				"horizontal date time  | image formula spechars | inserttable"
			]
	},
	getQiniuUploader:function(){
		return {
			url:'http://upload.qiniu.com',
			type:'qiniu',
			name:"file",
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
	},
	render:function(){
		var icons = this.getIcons();
		var uploader = this.getQiniuUploader();
		var plugins = {
			image:{
				uploader:uploader
			}
		}
		return (<Editor icons={icons} plugins={plugins}/>)
	}
})
	
ReactDOM.render(<App />, document.getElementById('react-container'));