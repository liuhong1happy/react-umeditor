var React = require('react');
var ReactDOM = require('react-dom');
var Editor = require('react-umeditor');
var start_render_time = null;
var end_render_time = null;
var App = React.createClass({
	componentDidMount:function(){
		end_render_time = new Date();
		console.log( (end_render_time.valueOf() - start_render_time.valueOf())+"ms" );
	},
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
		var count = 100;
		var editors = [];
		for(var i=0;i<count;i++){
			editors.push({
				icons:icons,
				plugins:plugins
			})
		}
		start_render_time = new Date();
		
		return (<div>{
			editors.map(function(ele,pos){
				return (<Editor key={pos} icons={ele.icons} plugins={ele.plugins} index={pos} start={start_render_time} />)
			})
		}</div>);
		
		// return (<Editor icons={icons} plugins={plugins} index={0} start={start_render_time} />)
	}
})
	
ReactDOM.render(<App />, document.getElementById('react-container'));