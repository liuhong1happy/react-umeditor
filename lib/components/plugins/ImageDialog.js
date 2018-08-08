'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dialog = require('../base/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _TabGroup = require('../base/TabGroup');

var _TabGroup2 = _interopRequireDefault(_TabGroup);

var _ImageUpload = require('./ImageUpload');

var _ImageUpload2 = _interopRequireDefault(_ImageUpload);

var _ImageSearch = require('./ImageSearch');

var _ImageSearch2 = _interopRequireDefault(_ImageSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageDialog = function (_Component) {
  _inherits(ImageDialog, _Component);

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
      // 做相应的处理做相应的处理
      var tabIndex = this.refs.tab.getTabIndex();
      var images = this.state.images[tabIndex];
      var strImgs = "";
      if (images.length > 0 && this.state.handle) {
        for (var i = 0; i < images.length; i++) {
          var src = images[i].src;
          var str = "<img src='" + src + "'/>";
          strImgs += str;
        }
        this.state.handle(strImgs);
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
        component: _react2.default.createElement(_ImageUpload2.default, {
          ref: 'image',
          onChange: this.handleChange.bind(this),
          filter: uploader.filter,
          name: uploader.name,
          url: uploader.url,
          data: uploader.data,
          uploadImageCallback: this.props.uploadImageCallback
        })
      }, {
        title: "网络图片",
        component: _react2.default.createElement(_ImageSearch2.default, {
          ref: 'image',
          onChange: this.handleChange.bind(this)
        })
      }];
      if (this.props.hidden) {
        return _react2.default.createElement('div', null);
      } else {
        return _react2.default.createElement(
          _Dialog2.default,
          {
            ref: 'modal',
            className: 'image-dialog',
            width: 700,
            height: 528,
            title: '\u56FE\u7247',
            buttons: buttons,
            onClose: this.close.bind(this) },
          _react2.default.createElement(_TabGroup2.default, { tabs: tabs, ref: 'tab' })
        );
      }
    }
  }]);

  return ImageDialog;
}(_react.Component);

exports.default = ImageDialog;


ImageDialog.propTypes = {
  uploader: _propTypes2.default.object,
  customUploader: _propTypes2.default.object
};

ImageDialog.defaultProps = {
  uploader: {
    name: "file",
    url: "/upload",
    filter: function filter(res) {
      return res.url;
    },
    data: {}
  }
};