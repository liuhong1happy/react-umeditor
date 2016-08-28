var React = require('react');
var ReactDOM =  require('react-dom');

var TabGroup = require('../base/TabGroup.react');
var Dropdown = require('../base/Dropdown.react');
var {FormulaTypes} = require('../../constants/EditorConstants');

var FormulaIcons = React.createClass({
	handleClick:function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var latex = target.getAttribute("data-latex");
		var id = 'mathquill-'+new Date().valueOf();
		if(this.props.onSelectFormula){
			this.props.onSelectFormula(e,latex,id);
		}
	},
	render:function(){
		var icons = this.props.icons;
		var handleClick = this.handleClick;
		return (<ul className={"formulas-icons "+this.props.name} >
			{
				icons.map(function(ele,pos){
					return (<li className="latex-icon" key={pos} data-latex={ele.latex} style={{"backgroundPosition": ele.backgroundPosition}} onClick={handleClick}></li>)
				})
			}
		</ul>)
	}
})

var FormulaDropdown = React.createClass({
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
		if(this.refs.root)
			this.refs.root.close();
	},
	toggle:function(position,handle){
		this.setState({
			handle:handle
		})
		this.refs.root.toggle(position);
	},
	handleSelectFormula:function(e,latex,id){
		e = e || event;
		if(this.state.handle){
			this.state.handle(e,latex,id);
		}
		if(e.stopPropagation){
			e.stopPropagation()
		}
		else{
			e.cancelBubble = true;
		}
		this.close();
	},
	render:function(){
		var tabs = [
			{title:"常用公式",component:(<FormulaIcons icons={FormulaTypes.commonFormulas} name="common-formulas" onSelectFormula={this.handleSelectFormula}/>)},
			{title:"符号",component:(<FormulaIcons icons={FormulaTypes.symbolFormulas} name="symbol-formulas" onSelectFormula={this.handleSelectFormula}/>)},
			{title:"字母",component:(<FormulaIcons icons={FormulaTypes.arabicFormulas} name="arabic-formulas" onSelectFormula={this.handleSelectFormula}/>)}
		]
		if(this.props.hidden){
			return (<div></div>)
		}else{
			return (<Dropdown ref="root" className="formula-dropdown">
					<TabGroup tabs={tabs} />
			</Dropdown>)
		}
	}
})
		
module.exports = FormulaDropdown;