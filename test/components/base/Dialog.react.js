var Dialog = require('../../../lib/components/base/Dialog.react.js');

describe('Test Components Dialog.react.js', function () {
	
  var NodeDatas = [
	  { 
		  args: {buttons:[]}, 
		  expected: [
			  'dialog' , 
			  { "display": "none"},
			  { "display": "none"} 
		   ] 
	  },
	  { 
		  args: { "className": "test-component", "style": {"textAlign": "center"},buttons:[] },
		  expected: [
			  'dialog test-component' , 
			  { "display": "none", "textAlign": "center"}, 
			  { "display": "none", "textAlign": "center"} 
		  ] 
	  }
  ]
  
  it('Test Component Dialog props className', function () {
	  NodeDatas.forEach(function(node){
		  var dialogContainer = shallowRender(Dialog,node.args);
		  var dialog = dialogContainer.props.children[0];
		  expect(dialog.props.className).to.equal(node.expected[0]);
		  var dialogContainer2 = mountRender(Dialog,node.args);
		  var dialog2 = dialogContainer2.querySelector('.dialog');
		  expect(dialog2.className).to.equal(node.expected[0]);
	  }) 
  });
	
  it('Test Component Dialog props style', function () {
	  NodeDatas.forEach(function(node){
		  var dialogContainer = shallowRender(Dialog,node.args);
		  var dialog = dialogContainer.props.children[0];
		  expect(compareObject(dialog.props.style,node.expected[1])).to.equal(true);
		  var dialogContainer2 = mountRender(Dialog,node.args);
		  var dialog2 = dialogContainer2.querySelector('.dialog');
		  expect(compareObject(dialog2.style,node.expected[2])).to.equal(true);
	  }) 
  });
});