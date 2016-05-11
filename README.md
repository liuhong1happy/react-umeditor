# react-umeditor

React Editor like [Umeditor](https://github.com/fex-team/umeditor)

## Install 

	npm install -g react-umeditor

## Use

	var React = require('react');
	var Editor = require('react-umeditor');

	var App = React.createClass({
		render:function(){
			return (<Editor ref="editor"/>)
		}
	})
	
## Ref Functions

You can `this.refs.editor.xxx()`! The `xxx` maybe is as follows:

* findDOMNode 
* getContent
* setContent

## Snapshot

![](snapshot/editor.png)

## Develop

	git clone https://github.com/liuhong1happy/react-umeditor
	cd react-umeditor
	npm install
	npm run build

open the file `example/dist/index.html`