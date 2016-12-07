var TabGroup = require('../../../lib/components/base/TabGroup.react.js');

describe('Test Components TabGroup.react.js', function () {
	
  var NodeDatas = [
	  { 
		  args: {}, 
		  expected: [
			  0
		   ] 
	  },
	  { 
		  args: { 			  
			  "tabs": [
				  {"title":"tab-title-1","component":"content"},
				  {"title":"tab-title-2","component":"content"}
			  ]
		  },
		  expected: [
			  2
		  ] 
	  }
  ]
  
  it('Test Component TabGroup props tabs', function () {
	  NodeDatas.forEach(function(node){
		  var dropdown = shallowRender(TabGroup,node.args);
		  var ul = dropdown.props.children[0];
		  expect(ul.props.children.length).to.equal(node.expected[0]);
		  
		  var dropdown2 = mountRender(TabGroup,node.args);
		  var ul2 = dropdown2.querySelector('ul');
		  expect(ul2.children.length).to.equal(node.expected[0]);
	  }) 
  });
});