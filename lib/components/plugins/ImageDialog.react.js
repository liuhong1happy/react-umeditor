'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ImageUpload = require('./ImageUpload.react');

var _ImageUpload2 = _interopRequireDefault(_ImageUpload);

var _ImageSearch = require('./ImageSearch.react');

var _ImageSearch2 = _interopRequireDefault(_ImageSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var ReactDOM = require('react-dom');

var Dialog = require('../base/Dialog.react');
var TabGroup = require('../base/TabGroup.react');
var Uploader = require('../../utils/FileUpload');

var ImageDialog = function (_React$Component) {
  _inherits(ImageDialog, _React$Component);

  function ImageDialog(props) {
    _classCallCheck(this, ImageDialog);

    var _this = _possibleConstructorReturn(this, (ImageDialog.__proto__ || Object.getPrototypeOf(ImageDialog)).call(this, props));

    _this.state = {
      images: [[], []],
      handle: function handle() {}
    };
    return _this;
  }

  _createClass(ImageDialog, [{
    key: 'open',
    value: function open(handle) {
      this.setState({
        handle: handle
      });
      this.refs.modal.open();
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.refs.modal) {
        this.refs.modal.close();
        if (this.state.handle) {
          this.state.handle();
        }
        this.refs.image.clearImages();
      }
    }
  }, {
    key: 'toggle',
    value: function toggle(handle) {
      this.setState({
        handle: handle
      });
      this.refs.modal.toggle();
    }
  }, {
    key: 'handleOkClick',
    value: function handleOkClick(e) {
      // 做相应的处理
      var tabIndex = this.refs.tab.getTabIndex();
      var images = this.state.images[tabIndex];
      var strImgs = "";
      if (images.length > 0 && this.state.handle) {
        for (var i = 0; i < images.length; i++) {
          var src = images[i].src;
          var str = "<img src='" + src + "'/>";
          strImgs += str;
        }
        this.state.handle(e, strImgs);
      }
      this.close();
    }
  }, {
    key: 'handleChange',
    value: function handleChange(index, imgs) {
      var images = this.state.images;
      images[index] = imgs;
      this.setState({
        images: images
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var uploader = this.props.uploader;
      var buttons = [{
        name: "btn-ok",
        content: "确定",
        onClick: this.handleOkClick.bind(this)
      }, {
        name: "btn-cancel",
        content: "取消",
        onClick: this.close.bind(this)
      }];
      var tabs = [{
        title: "本地上传",
        component: React.createElement(_ImageUpload2.default, {
          ref: 'image',
          onChange: this.handleChange.bind(this),
          request: uploader.request,
          type: uploader.type,
          name: uploader.name,
          url: uploader.url,
          uploadImageCallback: this.props.uploadImageCallback,
          qiniu: uploader.qiniu })
      }, {
        title: "网络图片",
        component: React.createElement(_ImageSearch2.default, {
          ref: 'image',
          onChange: this.handleChange.bind(this)
        })
      }];
      if (this.props.hidden) {
        return React.createElement('div', null);
      } else {
        return React.createElement(
          Dialog,
          {
            ref: 'modal',
            className: 'image-dialog',
            width: 700,
            height: 508,
            title: '\u56FE\u7247',
            buttons: buttons,
            onClose: this.close.bind(this) },
          React.createElement(TabGroup, { tabs: tabs, ref: 'tab' })
        );
      }
    }
  }]);

  return ImageDialog;
}(React.Component);

exports.default = ImageDialog;


ImageDialog.propTypes = {
  uploader: PropTypes.object,
  customUploader: PropTypes.object
};
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
};