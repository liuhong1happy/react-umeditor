import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ImageSearch extends Component{
	constructor(props){
		super(props);
		this.state = {
			images:[]
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
	handleClick(e){
		let text = ReactDOM.findDOMNode(this.refs.text);
		let src = text.value;
		let images = this.state.images;
		if(src && src.length>0){
			images.push({src})
			this.setState({
				images:images
			})
			if(this.props.onChange)
				this.props.onChange(1,images);
			text.value = "";
		}
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
	}
	render(){
		let images = this.state.images;
		let handleRemoveImage = this.handleRemoveImage.bind(this);
		return (<div className="tab-panel">
				<table className="search-bar">
					<tbody>
							<tr>
								<td>
										<input className="image-searchTxt" type="text" ref="text" />
								</td>
								<td>
										<div className="image-searchAdd" onClick={this.handleClick.bind(this)}>添加</div>
								</td>
							</tr>
					</tbody>
				</table>
				<div className="image-content">
						{
							images.map(function(ele,pos){
								return (<div key={pos} className="image-item">
													<div className="image-close" data-index={pos} onClick={handleRemoveImage}></div>
													<img src={ele.src} className="image-pic" height="75" width="120"  />
									</div>)
						   })
						}
				</div>
			</div>)
	}
}
