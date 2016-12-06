var EditorDOM = require('../../lib/utils/EditorDOM.js');

describe('Test Utils EditorDOM.js', function () {

  var NodeDatas = [
	  { args: {},expected:[false,false,false] },
	  { args: document.createElement('span'),expected: [false,true,false] },
	  { args: document.createTextNode(''),expected:[true,false,true] },
	  { args: document.createTextNode('content'),expected:[true,false,false] },
	  { args: document.createElement('div'),expected:[false,false,false] },
	  { args: EditorDOM.createTextNode('div'),expected:[true,false,false] },
	  { args: EditorDOM.createTextNode(''),expected:[true,false,true] },
	  { args: EditorDOM.createNodeByTag('div','content'),expected:[false,false,false] },
	  { args: EditorDOM.createHR(),expected:[false,false,false] },
	  { args: EditorDOM.createBR(),expected:[false,false,false] },
	  { args: EditorDOM.createNodeByTag('span','content'),expected:[false,true,false] }
  ]
  it('Test EditorDOM Function isTextNode,isSpanNode,isNullOfTextNode', function () {
	   NodeDatas.forEach(function(node){
			expect(EditorDOM.isTextNode(node.args)).to.equal(node.expected[0]);
			expect(EditorDOM.isSpanNode(node.args)).to.equal(node.expected[1]);
		    expect(EditorDOM.isNullOfTextNode(node.args)).to.equal(node.expected[2]);
	   })
  });
	
  var Nodes = {
	  span1: document.createElement('span'),
	  span2: document.createElement('span'),
	  div1: document.createElement('div'),
	  div2: document.createElement('div'),
	  text1: document.createTextNode(''),
	  text2: document.createTextNode('content'),
	  hr: document.createElement('hr'),
	  br: document.createElement('br')
  }
  
  Nodes.span1.innerHTML = "content";
  Nodes.div1.innerHTML = "content";

  it('Test EditorDOM Function createTextNode,createNodeByTag,createHR,createBR', function () {
	    expect(EditorDOM.createTextNode('').nodeType).to.equal(Nodes.text1.nodeType);
		expect(EditorDOM.createTextNode('content').nodeType).to.equal(Nodes.text2.nodeType);
		expect(EditorDOM.createNodeByTag('span','content').nodeType).to.equal(Nodes.span1.nodeType);
	    expect(EditorDOM.createNodeByTag('div','content').nodeType).to.equal(Nodes.div1.nodeType);
		expect(EditorDOM.createNodeByTag('span','content').nodeType).to.equal(Nodes.span1.nodeType);
	    expect(EditorDOM.createNodeByTag('div','content').nodeType).to.equal(Nodes.div1.nodeType);
	  
	    expect(EditorDOM.createTextNode('').nodeValue).to.equal(Nodes.text1.nodeValue);
		expect(EditorDOM.createTextNode('content').nodeValue).to.equal(Nodes.text2.nodeValue);
		expect(EditorDOM.createNodeByTag('span','content').nodeValue).to.equal(Nodes.span1.nodeValue);
	    expect(EditorDOM.createNodeByTag('div','content').nodeValue).to.equal(Nodes.div1.nodeValue);
		expect(EditorDOM.createNodeByTag('span','content').nodeValue).to.equal(Nodes.span1.nodeValue);
	    expect(EditorDOM.createNodeByTag('div','content').nodeValue).to.equal(Nodes.div1.nodeValue);
	  
	  
		expect(EditorDOM.createHR().nodeType).to.equal(Nodes.hr.nodeType);
		expect(EditorDOM.createBR().nodeType).to.equal(Nodes.br.nodeType);
  });
});