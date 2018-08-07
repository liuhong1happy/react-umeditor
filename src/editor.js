import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import EditorCore from './components/core/EditorCore';
import EditorEventEmitter from './utils/EditorEventEmitter';
import '../dist/less/editor.less';
import './utils/Date.js'

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      reload: true
    }
  }
  componentDidMount() {
    this.index = EditorEventEmitter.editorIndex;
    EditorEventEmitter.addStartListener("start-" + this.index, this.handleChange);
  }
  componentWillUnmount() {
    var index = this.index;
    EditorEventEmitter.removeStartListener("start-" + index, this.handleChange);
  }
  componentDidUpdate() {
    if (this.state.loaded && this.state.reload) {
      this.refs.editor.setContent(this.props.value || this.props.defaultValue);
    }
  }
  handleChange=()=> {
    this.setState({
      loaded: true
    })
  }
  handleMountSuccess() {
    EditorEventEmitter.mountEditorSuccess();
  }
  shouldComponentUpdate(nextProps, nextState) {
    // reload判断当前是否可以允许刷新
    // loaded状态变化时，务必重新刷新
    var currentValue = nextProps.value;
    var editorValue = this.getContent();

    if (this.state.loaded != nextState.loaded) {
      return true;
    } else if (currentValue == editorValue) {
      return false;
    }
    return true;
  }
  getContent() {
    return this.refs.editor ? this.refs.editor.getContent() : "";
  }
  setContent(content) {
    return this.refs.editor ? this.refs.editor.setContent(content) : "";
  }
  focusEditor() {
    return this.refs.editor ? this.refs.editor.focusEditor() : "";
  }
  findDOMNode(refName) {
    return this.refs.editor ? this.refs.editor.findDOMNode(refName) : "";
  }
  render() {
    var loaded = this.state.loaded;
    var {
      value,
      defaultValue,
      ...props
    } = this.props;
    if (!this.state.loaded) {
      return (
        <div
          id={props.id}
          className="editor-contenteditable-div"
          style={{"minHeight":"30px","border":"1px solid #ddd"}}>
              正在加载...
        </div>
      )
    } else {
      return (
        <EditorCore ref="editor" {...props} onEditorMount={this.handleMountSuccess}/>
      )
    }
  }
}

Editor.propTypes = {
  plugins: PropTypes.object,
  fontFamily: PropTypes.array,
  fontSize: PropTypes.array,
  paragraph: PropTypes.array,
  icons: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
}

Editor.defaultProps = {
  "plugins": {
    "image": {
      "uploader": {
        name: "file",
        url: "/upload",
        data: {},
        filter: (res)=> res.url
      }
    },
    "toolbar": {
      icons: []
    }
  },
  "fontFamily": [{
    "name": "宋体",
      value: "宋体, SimSun",
      defualt: true
    },
    {
      "name": "隶书",
      value: "隶书, SimLi"
    },
    {
      "name": "楷体",
      value: "楷体, SimKai"
    },
    {
      "name": "微软雅黑",
      value: "微软雅黑, Microsoft YaHei"
    },
    {
      "name": "黑体",
      value: "黑体, SimHei"
    },
    {
      "name": "arial",
      value: "arial, helvetica, sans-serif"
    },
    {
      "name": "arial black",
      value: "arial black, avant garde"
    },
    {
      "name": "omic sans ms",
      value: "omic sans ms"
    },
    {
      "name": "impact",
      value: "impact, chicago"
    },
    {
      "name": "times new roman",
      value: "times new roman"
    },
    {
      "name": "andale mono",
      value: "andale mono"
    }
  ],
  "fontSize": [{
      "name": "10px",
      value: "1"
    },
    {
      "name": "12px",
      value: "2"
    },
    {
      "name": "16px",
      value: "3",
      defualt: true
    },
    {
      "name": "18px",
      value: "4"
    },
    {
      "name": "24px",
      value: "5"
    },
    {
      "name": "32px",
      value: "6"
    },
    {
      "name": "38px",
      value: "7"
    }
  ],
  "paragraph": [{
      "name": "段落",
      value: "p",
      defualt: true
    },
    {
      "name": "标题1",
      value: "h1"
    },
    {
      "name": "标题2",
      value: "h2"
    },
    {
      "name": "标题3",
      value: "h3"
    },
    {
      "name": "标题4",
      value: "h4"
    },
    {
      "name": "标题5",
      value: "h5"
    },
    {
      "name": "标题6",
      value: "h6"
    }
  ],
  "icons": [
    // video map print preview drafts link unlink formula
    "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
    "paragraph fontfamily fontsize | superscript subscript | ",
    "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
    "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
    "horizontal date time  | image emotion spechars | inserttable"
  ],
  "value": "",
  "defaultValue": ""
};
