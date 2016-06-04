var React = require('react');

var TabGroup = React.createClass({
	getInitialState:function(){
		return {
			tabIndex:0
		}
	},
	setTabIndex:function(index){
		this.setState({
			tabIndex:index
		})
	},
	getTabIndex:function(){
		return this.state.tabIndex;
	},
	handleClick:function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var index = parseInt(target.getAttribute("data-index"));
		this.setTabIndex(index);
		if(e.stopPropagation){
			e.stopPropagation()
		}else{
			e.cancelBubble = true;
		}
	},
	render:function(){
		var tabIndex = this.state.tabIndex;
		var tabs = this.props.tabs;
		var component = tabs[tabIndex].component;
		var handleClick = this.handleClick;
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
})

module.exports = TabGroup;