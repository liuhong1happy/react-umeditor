var ComboBox = require('../../../lib/components/base/ComboBox.react.js');

describe('Test Components ComboBox.react.js', function () {
	
  var NodeDatas = [
	  { 
		  args: {}, 
		  expected: [
			  'combobox' , 
			  { "display": "none", "left": 0,"top": 0},
			  { "display": "none", "left": "0px","top": "0px"} 
		   ] 
	  },
	  { 
		  args: { "className": "test-component", "style": {"textAlign": "center"} },
		  expected: [
			  'combobox test-component' , 
			  { "display": "none", "left": 0,"top": 0,"textAlign": "center"}, 
			  { "display": "none", "left": "0px","top": "0px","textAlign": "center"} 
		  ] 
	  }
  ]
  
  it('Test Component ComboBox props className', function () {
	  NodeDatas.forEach(function(node){
		  var comboBox = shallowRender(ComboBox,node.args);
		  expect(comboBox.props.className).to.equal(node.expected[0]);
		  var comboBox2 = mountRender(ComboBox,node.args);
		  expect(comboBox2.className).to.equal(node.expected[0]);
	  }) 
  });
	
  it('Test Component ComboBox props style', function () {
	  NodeDatas.forEach(function(node){
		  var comboBox = shallowRender(ComboBox,node.args);
		  expect(compareObject(comboBox.props.style,node.expected[1])).to.equal(true);
		  var comboBox2 = mountRender(ComboBox,node.args);
		  expect(compareObject(comboBox2.style,node.expected[2])).to.equal(true);
	  }) 
  });
});