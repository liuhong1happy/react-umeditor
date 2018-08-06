var React = require('react');
var ReactDOM =  require('react-dom');

var TabGroup = require('../base/TabGroup');
var Dialog = require('../base/Dialog');
var {EmotionImages} = require('../../constants/EditorConstants');

class EmotionPanel extends React.Component{
	handleClick(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var url = target.getAttribute("data-url");
		var title = target.getAttribute("data-title");
		
		if(this.props.onSelectImage){
			var img = document.createElement('img');
			img.src = url;
			img.title = title;
			this.props.onSelectImage(e,img);
		}
	}
	render(){
		var images = this.props.images;
		var handleClick = this.handleClick.bind(this);
		return (<ul className={"emotion-images "+this.props.name} >
			{
				images.map(function(ele,pos){
					return (<li className="emotion-image" key={pos} data-url={ele.url} data-title={ele.title} onClick={handleClick}>
									<img src={ele.url} title={ele.title} data-url={ele.url} data-title={ele.title}/>
							</li>)
				})
			}
		</ul>)
	}
}

class EmotionDialog extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			handle:function(){}
		}
	}
	open(handle){
		this.setState({
			handle:handle
		})
		this.refs.root.open();
	}
	close(){
		if(this.refs.root)
			this.refs.root.close();
	}
	toggle(handle){
		this.setState({
			handle:handle
		})
		this.refs.root.toggle();
	}
	handleSelectImage(e,img){
		e = e || event;
		if(this.state.handle){
			this.state.handle(e,img);
		}
		if(e.stopPropagation){
			e.stopPropagation()
		}
		else{
			e.cancelBubble = true;
		}
		this.close();
	}
	getEmotionTabs(){
		var {EmotionTabs,BaseUrl,SmileyInfor} = EmotionImages;
		var tabs = [];
		for(var key in EmotionTabs){
			var tab = { title: EmotionTabs[key].name };
			var images = [];
			var titles = SmileyInfor[key];
			for(var i=0;i<titles.length;i++){
				var index = (i+1).toString();
				index = index.length==1?"0"+index: index;
				var image = {
					title: titles[i],
					url: BaseUrl + EmotionTabs[key].path + EmotionTabs[key].prefix+index+".gif?v=1.1"
				}
				images.push(image);
			}
			tab.images = images;
			tabs.push(tab);
		}
		return tabs;
	}
	render(){
		var tabs = [];
		var EmotionTabs = this.getEmotionTabs();
		
		for(var i=0;i<EmotionTabs.length;i++){
			tabs.push({
				title:EmotionTabs[i].title,
				images:EmotionTabs[i].images,
				component:(<EmotionPanel images={EmotionTabs[i].images} name="common-images" onSelectImage={this.handleSelectImage.bind(this)} />)
			})
		}
		var buttons = [];
		if(this.props.hidden){
			return (<div></div>)
		}else{
			return (<Dialog ref="root" className="emotion-dropdwon" width={700} height={508} title="表情" buttons={buttons} onClose={this.close.bind(this)}>
					<TabGroup tabs={tabs} />
			</Dialog>)
		}
	}
}
		
module.exports = EmotionDialog;