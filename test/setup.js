var jsdom = require('jsdom');
var TestUtils = require('react-addons-test-utils');
var React = require('react');
var ReactDOM = require('react-dom');

global.expect = require('chai').expect;

if (typeof document === 'undefined') {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = global.window.navigator;
}

global.shallowRender = function(Component, props) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component {...props}/>);
  return renderer.getRenderOutput();
}

global.mountRender = function(Component, props){
	const app = TestUtils.renderIntoDocument(<Component {...props} />);
    const appDOM = ReactDOM.findDOMNode(app);
	return appDOM;
}

global.compareObject = function(arg,expected){
	var flag = true;
	for(var key in expected){
		flag = expected[key] == arg[key];
		if(flag==false) {
			console.error('\tcompareObject',key,arg[key],expected[key]);
			return false;
		}
	}
	return flag;
}