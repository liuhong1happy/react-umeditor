var Dropdown = require('../../../lib/components/base/Dropdown.react.js');

describe('Test Components Dropdown.react.js', function () {
	
  var NodeDatas = [
	  { 
		  args: {}, 
		  expected: [
			  'dropdown' , 
			  { "display": "none", "left": 0,"top": 0},
			  { "display": "none", "left": "0px","top": "0px"} 
		   ] 
	  },
	  { 
		  args: { "className": "test-component", "style": {"textAlign": "center"} },
		  expected: [
			  'dropdown test-component' , 
			  { "display": "none", "left": 0,"top": 0,"textAlign": "center"}, 
			  { "display": "none", "left": "0px","top": "0px","textAlign": "center"} 
		  ] 
	  }
  ]
  
  it('Test Component Dropdown props className', function () {
	  NodeDatas.forEach(function(node){
		  var dropdown = shallowRender(Dropdown,node.args);
		  expect(dropdown.props.className).to.equal(node.expected[0]);
		  var dropdown2 = mountRender(Dropdown,node.args);
		  expect(dropdown2.className).to.equal(node.expected[0]);
	  }) 
  });
	
  it('Test Component Dropdown props style', function () {
	  NodeDatas.forEach(function(node){
		  var dropdown = shallowRender(Dropdown,node.args);
		  expect(compareObject(dropdown.props.style,node.expected[1])).to.equal(true);
		  var dropdown2 = mountRender(Dropdown,node.args);
		  expect(compareObject(dropdown2.style,node.expected[2])).to.equal(true);
	  }) 
  });
});