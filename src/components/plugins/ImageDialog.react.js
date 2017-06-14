var React = require('react');
var ReactDOM = require('react-dom');

var Dialog = require('../base/Dialog.react');
var TabGroup = require('../base/TabGroup.react');
var Uploader = require('../../utils/FileUpload');

import ImageUpload from './ImageUpload.react';
import ImageSearch from './ImageSearch.react';

export default class ImageDialog extends React.Component {
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
    // 做相应的处理
    let tabIndex = this.refs.tab.getTabIndex();
    let images = this.state.images[tabIndex];
    let strImgs = "";
    if (images.length > 0 && this.state.handle) {
      for (let i = 0; i < images.length; i++) {
        let src = images[i].src;
        let str = "<img src='" + src + "' style=\"width: 100%; height: auto;\"/>";
        strImgs += str;
      }
      this.state.handle(e, strImgs);
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
          onChange={this.handleChange.bind(this)}
          request={ uploader.request }
          type={uploader.type}
          name={uploader.name}
          url={uploader.url}
          uploadImageCallback={this.props.uploadImageCallback}
          qiniu={uploader.qiniu}/>
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
          height={508}
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
  uploader: React.PropTypes.object,
  customUploader: React.PropTypes.object
}
ImageDialog.defaultProps = {
  uploader: {
    type: "default", // qiniu
    name: "file",
    url: "/upload",
    request: "image_src",
    qiniu: {
      app: {
        bucket: "qtestbucket",
        ak: "iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV",
        sk: "6QTOr2Jg1gcZEWDQXKOGZh5PziC2MCV5KsntT70j"
      },
      key: null,
      upload_token: null
    }
  }
}
