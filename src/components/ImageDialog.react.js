var React = require('react');
var ReactDOM =  require('react-dom');

var Dialog = require('./Dialog.react');
var TabGroup = require('./TabGroup.react');
var Uploader = require('../utils/FileUpload');

var ImageUpload = React.createClass({
	getInitialState:function(){
		return {
			images:[]
		}
	},
	handleChange:function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var mask = ReactDOM.findDOMNode(this.refs.mask);
		var _self = this;
		var images = this.state.images;
		if(target.files.length>0){
			Uploader.uploadFile({
				file:target.files[0],
				onLoad:function(e){
					mask.style.display = "block";
					mask.innerHTML = "Loading...";
				},
				onSuccess:function(res){
					mask.style.display = "block";
					mask.innerHTML = "Load Success";
					
					if(res && res.status=="success"){
						images.push({
							src:res.image_src
						})
						_self.setState({
							images:images
						})
					}
					
					setTimeout(function(){
						mask.style.display = "none";
					},200)
				},
				onError:function(e){
					mask.style.display = "block";
					mask.innerHTML = "Load Error";
					setTimeout(function(){
						mask.style.display = "none";
					},200)
				}
			})
		}
	},
	getImages:function(){
		return this.state.images;
	},
	clearImages:function(){
		this.setState({
			images:[]
		})
	},
	handleRemoveImage:function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var index = parseInt(target.getAttribute("data-index"));
		var images = this.state.images;
		images.splice(index,1);
		this.setState({
			images:images
		})
	},
	render:function(){
			var images = this.state.images;
			var handleRemoveImage = this.handleRemoveImage;
			var action = this.props.action?this.props.action:"/upload";
			var showStyle = {
				"display":"block"
			}
			var hideStyle = {
				"display":"none"
			}
			var hasImages = images.length > 0;
			return (<div className="tab-panel">
						<div className="image-content">
							{
								images.map(function(ele,pos){
									return (<div className="image-item">
														<div className="image-close" onClick={handleRemoveImage}></div>
														<img src={ele.src} className="image-pic" height="75" width="120" />
										</div>)
							   })
							}
							<div className="image-upload2" style={ hasImages?showStyle:hideStyle }>
								<span className="image-icon"></span>
								<form className="image-form"  method="post" encType="multipart/form-data" target="up" action={action} >
									<input onChange={this.handleChange} style={{ filter: "alpha(opacity=0)" }} className="image-file" type="file" hidefocus="" name="file" accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp" />
								</form>
							</div>
						</div>
						<div className="image-dragTip" style={ hasImages?hideStyle:showStyle }>支持图片拖拽上传</div>
						<div className="image-upload1" style={ hasImages?hideStyle:showStyle }>
							<span className="image-icon"></span>
							<form className="image-form" method="post" encType="multipart/form-data" target="up" action={action} >
								<input onChange={this.handleChange} style={{ filter:"alpha(opacity=0)"}} className="image-file" type="file" hidefocus="" name="file" accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp" />
							</form>
						</div>
						<div className="image-mask" ref="mask">
								{"Loading...."}
						</div>
					</div>)
	}
})

var ImageSearch = React.createClass({
	getInitialState:function(){
		return {
			images:[]
		}
	},
	getImages:function(){
		return this.state.images;
	},
	clearImages:function(){
		this.setState({
			images:[]
		})
	},
	handleClick:function(e){
		var text = ReactDOM.findDOMNode(this.refs.text);
		var src = text.value;
		var images = this.state.images;
		if(src && src.length>0){
			images.push({src})
			this.setState({
				images:images
			})
			if(this.props.onChange)
				this.props.onChange(1,images);
			text.value = "";
		} 
	},
	handleRemoveImage:function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var index = parseInt(target.getAttribute("data-index"));
		var images = this.state.images;
		images.splice(index,1);
		this.setState({
			images:images
		})
	},
	render:function(){
		var images = this.state.images;
		var handleRemoveImage = this.handleRemoveImage;
		return (<div className="tab-panel">
				<table className="search-bar">
					<tbody>
							<tr>
								<td>
										<input className="image-searchTxt" type="text" ref="text" />
								</td>
								<td>
										<div className="image-searchAdd" onClick={this.handleClick}>添加</div>
								</td>
							</tr>
					</tbody>
				</table>
				<div className="image-content">
						{
							images.map(function(ele,pos){
								return (<div className="image-item">
													<div className="image-close" data-index={pos} onClick={handleRemoveImage}></div>
													<img src={ele.src} className="image-pic" height="75" width="120"  />
									</div>)
						   })
						}
				</div>
			</div>)
	}
})


var ImageDialog = React.createClass({
	getInitialState:function(){
		return {
			images:[[],[]],
			handle:function(){}
		}
	},
	open:function(handle){
		this.setState({
			handle:handle
		})
		this.refs.modal.open();
	},
	close:function(){
		this.refs.modal.close();
		if(this.state.handle){
			this.state.handle();
		}
		this.refs.image.clearImages();
	},
	toggle:function(){
		this.refs.modal.toggle();
	},
	handleOkClick:function(e){
		// 做相应的处理
		var tabIndex = this.refs.tab.getTabIndex();
		var images = this.state.images[tabIndex];
		var strImgs = "";
		if(images.length>0 && this.state.handle){
			for(var i=0;i<images.length;i++){
				var src = images[i].src;
				var str = "<img src='"+src+"' />";
				strImgs += str;
			}
			this.state.handle(e,strImgs);
		}
		this.close();
	},
	handleChange:function(index,imgs){
		var images = this.state.images;
		images[index] = imgs;
		this.setState({
			images:images
		})
	},
	render:function(){
		var buttons = [
			{ name:"btn-ok", content:"确定", onClick:this.handleOkClick},
			{ name:"btn-cancel", content:"取消", onClick:this.close}
		];
		var tabs = [
			{title:"本地上传",component:(<ImageUpload ref="image" onChange={this.handleChange}/>)},
			{title:"网络图片",component:(<ImageSearch ref="image" onChange={this.handleChange}/>)},		
		]
		return (<Dialog ref="modal" className="image-dialog" width={700} height={508} title="图片" buttons={buttons} onClose={this.close}>
				<TabGroup tabs={tabs} ref="tab"/>
			</Dialog>)
	}
})
		
module.exports = ImageDialog;