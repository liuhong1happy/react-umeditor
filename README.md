# react-umeditor

[![Version](https://img.shields.io/npm/v/react-umeditor.svg)](https://www.npmjs.com/package/react-umeditor)
[![Downloads](https://img.shields.io/npm/dt/react-umeditor.svg)](https://www.npmjs.com/package/react-umeditor)

React Editor like [Umeditor](https://github.com/fex-team/umeditor)

## Install 

	npm install -g react-umeditor

## Use

javascript

``` js
var React = require('react');
var Editor = require('react-umeditor');

var App = React.createClass({
	render:function(){
		return (<Editor ref="editor"/>)
	}
})
```
	
html

``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Editor Demo</title>
	
	<!-- mathquill & umeditor stylesheet -->
	<link rel="stylesheet" href="../../dist/third-part/mathquill/mathquill.css"/>
	<link rel="stylesheet" href="../../dist/react-umeditor.css" type="text/css" />
	<link rel="stylesheet" href="app.css" type="text/css" />
</head>
<body>
	<div id="react-container"></div>
	
	<!-- jquery & mathquill javascript -->
	<script src="../../dist/third-part/jquery.min.js"></script>
	<script src="../../dist/third-part/mathquill/mathquill.js"></script>
	
	<!-- your react script -->
	<script src="common.js"></script>
	<script src="bundle.js"></script>
	<script src="app.js"></script>
</body>
</html>
```
	
## Ref Functions

You can `this.refs.editor.xxx()`! The `xxx` maybe is as follows:

* findDOMNode: find  refs by ref name  `"root","editarea","toolbar","color" `
* setContent: set html of editor
* getContent: get html of editor
* focusEditor: focus the editor

## Props

You can set the `props`!The `props` maybe is as follows:
* onFocus: the focus event
* defaultValue: default value of editor
* value: value of editor
* icons: icons of toolbar
* plugins: settings of plugins
	* image: settings of image dialog 
		* uploader: settings of image uploader
			* name:  form name of xhr
			* url:  url of server
            * type: qiniu or default
            * qiniu: when type is qiniu
                * upload_token: upload_token of qiniu
                * app: app of qiniu
                    * Bucket: Bucket of qiniu
                    * AK: AccessKey of qiniu
                    * SK: SecretKey of qiniu
                * key: resource key of file
                * genKey: when not key,gen resource key of file

## Snapshot

![snapshot](https://raw.githubusercontent.com/liuhong1happy/react-umeditor/cfedda64f6e19830936d323c2e4d836bb14576b2/snapshot/editor.png)

## Develop

	// clone code
	git clone https://github.com/liuhong1happy/react-umeditor
	cd react-umeditor
	// install require
	npm install
    npm install envify browserify
    npm install react browserify
    npm install reactify browserify
	// build
	npm run build
	// run example server
	node server.js
	
open the local site  `http://localhost:8080/example/dist/index.html`

## Todo

- [ ] table-edit [wskongdesheng](https://github.com/wskongdesheng)
- [ ] insert time date video audio etc. [liuhong1happy](https://github.com/liuhong1happy)

## Contribute

Changes and improvements are more than welcome! Feel free to fork and open a pull request. Please make your changes in a specific branch and request to pull into master! If you can, please make sure the editor fully works before sending the PR, as that will help speed up the process.

See more [document](https://github.com/liuhong1happy/react-umeditor/blob/master/docs/contribute.md)

## Concat

Email: [liuhong1.happy@163.com](mailto:liuhong1.happy@163.com)

QQ Group: 247978846
