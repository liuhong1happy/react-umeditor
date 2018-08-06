var React = require('react');

class TabGroup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tabIndex:0
		}
	}
	setTabIndex(index){
		this.setState({
			tabIndex:index
		})
	}
	getTabIndex(){
		return this.state.tabIndex;
	}
	handleClick(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var index = parseInt(target.getAttribute("data-index"));
		this.setTabIndex(index);
		if(e.stopPropagation){
			e.stopPropagation()
		}else{
			e.cancelBubble = true;
		}
	}
	render(){
		var tabIndex = this.state.tabIndex;
		var tabs = this.props.tabs || [];
		var component = tabs[tabIndex] ? tabs[tabIndex].component : "";
		var handleClick = this.handleClick.bind(this);
		return (<div className="tab-group">
				<ul className="tab-nav">
					{
						tabs.map(function(ele,pos){
							return (<li key={pos} className={"tab-item"+(tabIndex==pos?" active":"")}>
											<a data-index={pos} className="tab-text" onClick={handleClick}>{ele.title}</a>
										</li>)
						})
					}
				</ul>
				<div className="tab-content">
					{component}
				</div>
			</div>)
	}
}

module.exports = TabGroup;