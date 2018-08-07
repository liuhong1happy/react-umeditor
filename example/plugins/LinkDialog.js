import React, { Component } from 'react';
import Dialog from '../../lib/components/base/Dialog'
import './LinkDialog.less'

export default class LinkDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: {
				url: "",
				title: "",
				target: "__blank"
			},
      handle: function() {}
    }
	}
	
  open = (handle)=> {
    this.setState({
      handle: handle
    })
    this.refs.modal.open();
	}
	
  close = ()=> {
    if (this.refs.modal) {
      this.refs.modal.close();
      if (this.state.handle) {
        this.state.handle();
			}
			this.setState({
				link: {
					url: "",
					title: "",
					target: "__blank"
				}
			})
    }
	}

	ok = ()=> {
		if(this.state.link.url) {
			this.state.handle(this.state.link)
		}
		this.close();
	}
	
  toggle = (handle)=> {
    this.setState({
      handle: handle
    })
    this.refs.modal.toggle();
  }

	updateLink(field, value) {
		const { link } = this.state;
		link[field] = value;
		this.setState({
			link
		})
	}

	render() {
		const { link } = this.state;
		let buttons = [{
			name: "btn-ok",
			content: "确定",
			onClick: this.ok
		},
		{
			name: "btn-cancel",
			content: "取消",
			onClick: this.close
		}
	];
		if (this.props.hidden) {
			return (<div></div>)
		} else {
			return (
				<Dialog
					ref="modal"
					className="link-dialog"
					width={400}
					height={282}
					title="超链接"
					buttons={buttons}
					onClose={this.close}>
					<table className="edui-link-table">
					<tbody>
						<tr>
							<td><label htmlFor="href">链接地址：</label></td>
							<td><input value={link.url} className="edui-link-txt" id="edui-link-Jhref" type="text" onChange={(evt)=> this.updateLink('url', evt.target.value)} /></td>
						</tr>
						<tr>
							<td><label htmlFor="title">标题：</label></td>
							<td><input value={link.title} className="edui-link-txt" id="edui-link-Jtitle" type="text" onChange={(evt)=> this.updateLink('title', evt.target.value)} /></td>
						</tr>
						<tr>
							<td colspan="2"><label htmlFor="target">是否在新窗口打开：</label><input id="edui-link-Jtarget" type="checkbox" checked={link.target==='__blank'} onChange={(evt)=> this.updateLink('target', evt.target.checked ? "__blank":"")} /></td>
						</tr>
						</tbody>
					</table>   
				</Dialog>
			)
		}
	}
}