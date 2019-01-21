import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames'
import Uploader from '../../utils/FileUpload';

export default class ImageUpload extends Component{
	constructor(props){
		super(props);
		this.state = {
			images:[],
			dragEnter:false
		}
	}

  argumentUpload = (file, files, fileIndex, obj) => {
		let _self = this;
		const { customUploader, name, data, url, filter, ...others } = this.props;

		let uploader = this.props.customUploader? this.props.customUploader: Uploader;

		uploader.uploadFile({
			file:file,
			filename: name,
			data:  data,
			url: url,
			filter: filter,
			...others,
			onLoad:function(){ _self.beforeUploading(files, fileIndex) },
			onSuccess:function(res){
				const url = _self.props.filter(res);
				_self.updateImage(url);

				setTimeout(function(){
					if(fileIndex + 1 < files.length){
						//判断是否还有图片没有上传
						fileIndex += 1;
						_self.argumentUpload(files[fileIndex], files, fileIndex, obj);
					}else{
						//图片上传完毕，重置文件索引 fileIndex
						fileIndex = 0;
						if(!obj.dropEffect){
							obj.value = "";
                        }
                        _self.afterUploading();
					}
				},200)
			},
			onError:function(){ _self.errorUploading() }
		});
  }

  beforeUploading = (files, fileIndex) => {
		let mask = ReactDOM.findDOMNode(this.refs.mask);
		mask.style.display = "block";
		mask.innerHTML = `${fileIndex + 1}/${files.length} Uploading...`;
  }

  afterUploading = () => {
		// 去除遮罩层
		let mask = ReactDOM.findDOMNode(this.refs.mask);
		mask.style.display = "none";
		mask.innerHTML = "Load Success";
  }

  errorUploading = () => {
		let mask = ReactDOM.findDOMNode(this.refs.mask);
		mask.style.display = "block";
		mask.innerHTML = "Load Error";
		setTimeout(function(){
			mask.style.display = "none";
		},200)
	}
	
  updateImage = (image) => {
		let images = this.state.images;
    images.push({
      src: image
    })
    this.setState({
      images:images
    })
    if(this.props.onChange){
      this.props.onChange(0,images);
    }
  }

	handleUploadFile(obj){
        let file = obj.files[0]
        this.argumentUpload(file, obj.files, 0, obj)
	}
	handleChange(e){
		e = e || event;
		let target = e.target || e.srcElement;
		if(target.files.length>0){
			this.handleUploadFile(target)
			// clear value
			// target.value = "";
		}
	}
	getImages(){
		return this.state.images;
	}
	clearImages(){
		this.setState({
			images:[]
		})
	}
	handleRemoveImage(e){
		e = e || event;
		let target = e.target || e.srcElement;
		let index = parseInt(target.getAttribute("data-index"));
		let images = this.state.images;
		images.splice(index,1);
		this.setState({
			images:images
		})
		if(this.props.onChange)
			this.props.onChange(0,images);
	}
	handleDrop(e){
		e.preventDefault();
		let files = e.dataTransfer.files;
		if(files.length>0){
			// this.handleUploadFile(files[0]);
			this.handleUploadFile(e.dataTransfer);
		}
		this.setState({
			dragEnter:false
		})
		// console.log(e.type);
	}
	handleDragOver(e){
		e.preventDefault();
		// console.log(e.type);
	}
	handleDragEnter(e){
		this.setState({
			dragEnter:true
		})
		// console.log(e.type);
	}
	handleDragLeave(e){
		this.setState({
			dragEnter:false
		})
		// console.log(e.type);
	}
	render(){
			let images = this.state.images;
			let dragEnter = this.state.dragEnter;
			let handleRemoveImage = this.handleRemoveImage.bind(this);
			let action = this.props.action ? this.props.action : "/upload";
			let showStyle = {
				"display":"block"
			}
			let hideStyle = {
				"display":"none"
			}

			let hasImages = images.length > 0;
			return (<div className="tab-panel">
						<div className={classnames("image-content", {" drag-enter": dragEnter })}  onDrop={this.handleDrop.bind(this)}
									onDragOver={this.handleDragOver.bind(this)}
									onDragEnter={this.handleDragEnter.bind(this)}
									onDragLeave={this.handleDragLeave.bind(this)}
									onDragEnd={this.handleDragLeave.bind(this)}
									onDragStart={this.handleDragEnter.bind(this)}>
							{
								images.map(function(ele,pos){
									return (
                    <div key={pos} className="image-item">
                      <div className="image-close" data-index={pos} onClick={handleRemoveImage} />
                      <img src={ele.src} className="image-pic" height="75" width="120" />
										</div>
                  )
							   })
							}
							<div className="image-upload2" style={ hasImages?showStyle:hideStyle }>
								<span className="image-icon"></span>
								<form className="image-form"  method="post" encType="multipart/form-data" target="up" action={action} >
									<input onChange={this.handleChange.bind(this)} multiple="multiple" style={{ filter: "alpha(opacity=0)" }} className="image-file" type="file"  name="file" accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp" />
								</form>
							</div>
						</div>
						<div className="image-dragTip" style={ hasImages?hideStyle:showStyle }>支持图片拖拽上传</div>
						<div className="image-upload1" style={ hasImages?hideStyle:showStyle }>
							<span className="image-icon"></span>
							<form className="image-form" method="post" encType="multipart/form-data" target="up" action={action} >
								<input onChange={this.handleChange.bind(this)} multiple="multiple" style={{ filter:"alpha(opacity=0)"}} className="image-file" type="file"  name="file" accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp" />
							</form>
						</div>
						<div className="image-mask" ref="mask">
								{"Loading...."}
						</div>
					</div>)
	}
}
