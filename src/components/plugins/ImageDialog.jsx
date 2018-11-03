import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '../base/Dialog'
import TabGroup from '../base/TabGroup'

import ImageUpload from './ImageUpload';
import ImageSearch from './ImageSearch';

export default class ImageDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        [],
        []
      ],
      handle: function() {}
    }
  }
  open(handle) {
    this.setState({
      handle: handle
    })
    this.refs.modal.open();
  }
  close() {
    if (this.refs.modal) {
      this.refs.modal.close();
      if (this.state.handle) {
        this.state.handle();
      }
      this.refs.image.clearImages();
    }
  }
  toggle(handle) {
    this.setState({
      handle: handle
    })
    this.refs.modal.toggle();
  }
  handleOkClick(e) {
    // 做相应的处理做相应的处理
    let tabIndex = this.refs.tab.getTabIndex();
    let images = this.state.images[tabIndex];
    let strImgs = "";
    if (images.length > 0 && this.state.handle) {
      for (let i = 0; i < images.length; i++) {
        let src = images[i].src;
        let str = "<img src='" + src + "'/>";
        strImgs += str;
      }
      this.state.handle(strImgs);
    }
    this.close();
  }
  handleChange(index, imgs) {
    let images = this.state.images;
    images[index] = imgs;
    this.setState({
      images: images
    })
  }
  render() {
    let uploader = this.props.uploader;
    let customUploader = this.props.customUploader;
    let buttons = [{
        name: "btn-ok",
        content: "确定",
        onClick: this.handleOkClick.bind(this)
      },
      {
        name: "btn-cancel",
        content: "取消",
        onClick: this.close.bind(this)
      }
    ];
    let tabs = [{
        title: "本地上传",
        component: (
          <ImageUpload
            ref="image"
            {...uploader}
            onChange={this.handleChange.bind(this)}
            customUploader={customUploader}
            uploadImageCallback={this.props.uploadImageCallback} 
          />
        )
      },
      {
        title: "网络图片",
        component: (
          <ImageSearch
          ref="image"
          onChange={this.handleChange.bind(this)}
        />
        )
      },
    ]
    if (this.props.hidden) {
      return (<div></div>)
    } else {
      return (
        <Dialog
          ref="modal"
          className="image-dialog"
          width={700}
          height={528}
          title="图片"
          buttons={buttons}
          onClose={this.close.bind(this)}>
					<TabGroup tabs={tabs} ref="tab"/>
				</Dialog>
      )
    }
  }
}

ImageDialog.propTypes = {
  uploader: PropTypes.object,
  customUploader: PropTypes.object
}

ImageDialog.defaultProps = {
  uploader: {
    name: "file",
    url: "/upload",
    filter: (res)=> res.url,
    data: {}
  }
}
