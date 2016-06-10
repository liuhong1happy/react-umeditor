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

* findDOMNode: find  refs by ref name  `"root","editarea","toolbar","color" `
* setContent: set html of editor
* getContent: get html of editor
* onFocus: the focus event
* focusEditor: focus the editor

## Props

You can set the `props`!The `props` maybe is as follows:

* defaultValue: default value of editor
* value: value of editor
* icons: icons of toolbar
* plugins: settings of plugins
	* image: settings of image dialog 
		* uploader: settings of image uploader
			* name:  form name of xhr
			* url:  url of server

## Snapshot

![snapshot](https://github.com/liuhong1happy/react-umeditor/blob/master/snapshot/editor.png)

## Develop

	git clone https://github.com/liuhong1happy/react-umeditor
	cd react-umeditor
	npm install
	npm run build

open the file `example/dist/index.html`

## Contribute

Changes and improvements are more than welcome! Feel free to fork and open a pull request. Please make your changes in a specific branch and request to pull into master! If you can, please make sure the editor fully works before sending the PR, as that will help speed up the process.

See more [document](https://github.com/liuhong1happy/react-umeditor/blob/master/docs/contribute.md)