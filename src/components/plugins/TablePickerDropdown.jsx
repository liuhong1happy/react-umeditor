import React, { Component } from 'react'
import Dropdown from '../base/Dropdown'

export default class TablePickerDropdown extends Component{
	constructor(props){
		super(props);
		this.state = {
            row:0,
            column:0,
            handle:function(){}
		}
	}
	open(position, handle){
		this.setState({
			handle
		})
		this.refs.root.open(position);
	}
	close(){
		if(this.refs.root) this.refs.root.close();
	}
	toggle(position,handle){
		this.setState({
			handle
		})
		this.refs.root.toggle(position);
	}
    handleMouseEvent(e){
        e = e || event;
		var target = e.target || e.srcElement;
		var parentPostion = target.getBoundingClientRect();
        var column =Math.ceil((e.clientX - parentPostion.left) / 22);
        var row =Math.ceil((e.clientY - parentPostion.top) / 22);
        if(row<0) row = 0;
        if(column<0) column = 0;
        
        if(row>10) row = 10;
        if(column>10) column = 10;
        this.setState({
            row:row,
            column:column
        })
    }
    handleMouseOut(e){
        this.setState({
            row:0,
            column:0
        })
    }
    handleClick(e){
        // insert table
        var Table = document.createElement("table");
		Table.className = "editor-table";
        var TBody = Table.createTBody();
        for(var i=0;i<this.state.row;i++){
            var Tr = TBody.insertRow();
            for(var j=0;j<this.state.column;j++){
                var Td = Tr.insertCell();
                Td.width = 200;
            }
        }
        this.state.handle(Table);
        this.refs.root.close();
    }
    render(){
        var row = this.state.row;
        var column = this.state.column;
		if(this.props.hidden){
			return (<div></div>)
		}else{
			return (<Dropdown ref="root" className="tablepicker-dropdown">
						<div className="infoarea"> <span>{row+"行 x "+column+"列"}</span></div>
						<div className="pickarea" onMouseOver={this.handleMouseEvent.bind(this)}  onMouseMove={this.handleMouseEvent.bind(this)}
								onMouseOut={this.handleMouseOut.bind(this)} onClick={this.handleClick.bind(this)}>
								<div className="overlay" style={{width: column*22,height: row*22}}></div>
						</div>
					</Dropdown>)
		}
    }
}