var React = require('react');
var ReactDOM =  require('react-dom');

var Dialog = require('../base/Dialog.react');
class LinkDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      handle: function(){}
    }
  }
  open(handle){
    this.setState({
      handle:handle
    })
    this.refs.modal.open();
  }
  close(){
    if(this.refs.modal){
      this.refs.modal.close();
      if(this.state.handle){
        this.state.handle();
      }
    }
  }
  toggle(handle){
    this.setState({
      handle:handle
    })
    this.refs.modal.toggle();
  }
  handleChange(e){
    e = e || event;
    var target = e.target || e.srcElement;
    console.log(target.checked)
    var targetDom = ReactDOM.findDOMNode(this.refs.target);
    console.log(targetDom)
  }
  handleOkClick(e){
    // 做相应的处理
    var linkDom = ReactDOM.findDOMNode(this.refs.link);
    var titleDom = ReactDOM.findDOMNode(this.refs.title);
    var targetDom = ReactDOM.findDOMNode(this.refs.target);
    console.log(targetDom)
    var link = linkDom.value;
    var title = titleDom.value;
    var target = targetDom.checked ? '_blank' : '_self';
    var strLink = "";
    if(link && title){
      strLink += "<a href='" + link + "' target= '" + target + "'>";
      strLink += title;
      strLink += "</a>"
      this.state.handle(e,strLink);
    }
    this.close();
  }
  render(){
      var buttons = [
        { name:"btn-ok", content:"确定", onClick:this.handleOkClick.bind(this)},
        { name:"btn-cancel", content:"取消", onClick:this.close.bind(this)}
      ];
      if(this.props.hidden){
        return (<div></div>);
      }else{
        return (<Dialog ref="modal" className="link-dialog" width={700} height={208} title="超链接" buttons={buttons} onClose={this.close.bind(this)}>
          <table className="search-bar">
          <tbody>
            <tr>
              <td>
                链接地址：
              </td>
              <td>
                <input className="link-input" type="text" ref="link" />
              </td>
            </tr>
            <tr>
              <td>
                标题：
              </td>
              <td>
                <input className="link-input" type="text" ref="title" />
              </td>
            </tr>
            <tr>
              <td>
                是否在新窗口打开：
              </td>
              <td>
                <input onChange={this.handleChange.bind(this)} type="checkbox" ref="target" />
              </td>
            </tr>
          </tbody>
        </table>
        </Dialog>)
      }

  }
}

module.exports = LinkDialog;
