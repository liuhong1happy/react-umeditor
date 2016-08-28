var React = require('react');
var ReactDOM =  require('react-dom');

var TabGroup = require('../base/TabGroup.react');
var Dialog = require('../base/Dialog.react');
var {EmotionImages} = require('../../constants/EditorConstants');

var EmotionPanel = React.createClass({
	handleClick:function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var url = target.getAttribute("data-url");
		var title = target.getAttribute("data-title");
		
		if(this.props.onSelectImage){
			this.props.onSelectImage(e,'<img src="'+url+'" title="'+title+'" />');
		}
	},
	render:function(){
		var images = this.props.images;
		var handleClick = this.handleClick;
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
})

var EmotionDialog = React.createClass({
	getInitialState:function(){
		return {
			handle:function(){}
		}
	},
	open:function(handle){
		this.setState({
			handle:handle
		})
		this.refs.root.open();
	},
	close:function(){
		if(this.refs.root)
			this.refs.root.close();
	},
	toggle:function(handle){
		this.setState({
			handle:handle
		})
		this.refs.root.toggle();
	},
	handleSelectImage:function(e,char){
		e = e || event;
		if(this.state.handle){
			this.state.handle(e,char);
		}
		if(e.stopPropagation){
			e.stopPropagation()
		}
		else{
			e.cancelBubble = true;
		}
		this.close();
	},
	getEmotionTabs:function(){
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
	},
	render:function(){
		var tabs = [];
		var EmotionTabs = this.getEmotionTabs();
		
		for(var i=0;i<EmotionTabs.length;i++){
			tabs.push({
				title:EmotionTabs[i].title,
				images:EmotionTabs[i].images,
				component:(<EmotionPanel images={EmotionTabs[i].images} name="common-images" onSelectImage={this.handleSelectImage} />)
			})
		}
		var buttons = [];
		if(this.props.hidden){
			return (<div></div>)
		}else{
			return (<Dialog ref="root" className="emotion-dropdwon" width={700} height={508} title="表情" buttons={buttons} onClose={this.close}>
					<TabGroup tabs={tabs} />
			</Dialog>)
		}
	}
})
		
module.exports = EmotionDialog;