var React = require('react');
var Dropdown = require('../base/Dropdown.react');

var FontFamilyDropdown = React.createClass({
	getInitialState:function(){
		return {
			handle:function(){}
		}
	},
	open:function(position,handle){
		this.setState({
			handle:handle
		})
		this.refs.root.open(position);
	},
	close:function(){
		this.refs.root.close();
	},
	toggle:function(position){
		this.refs.root.toggle(position);
	},
	handleSelect:function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var value = target.getAttribute('data-value');
		if(this.state.handle){
			this.state.handle(e,value);
		}
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
		this.close();
	},
	render:function(){
		var handleSelect = this.handleSelect;
		var paragraph = this.props.paragraph?this.props.paragraph:[];
		return (<Dropdown ref="root" className="color-dropdown">
			<ul>
				{
					paragraph.map(function(ele,pos){
						return (<li data-value={ele.value} onClick={handleSelect}>
								<p data-value={ele.value} style={{"fontFamily":ele.value}}>{ele.name}</p>
								</li>)
					})
				}
			</ul>
		</Dropdown>)
	}
})
		
module.exports = FontFamilyDropdown;