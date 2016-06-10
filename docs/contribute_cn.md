[英文](contribute_en.md)

本文将会帮助你自定义实现编辑器的`插件`，让我们开始吧！

## 实现插件 `indent`(增加缩进) 和 `outdent`(减少缩进)

1. 请修改文件 `constants\EditorConstants.js`,添加如下内容:

        var EditorIconTypes = {
            \\...
            "indent":{
                title:"增加缩进",
                disabled:false
            },
            "outdent":{
                title:"减少缩进",
                disabled:false
            },
            \\...
        }
        
2. 我们有了控件的常量描述, 我们要让其显示在工具栏上. 请修改文件  `components/core/EditorToolbar`,添加如下内容:

        var EditorToolbar = React.createClass({
            //...
            getDefaultProps:function(){
                return {
                    icons:[
                        "... ",
                        "... ",
                        "...  | indent outdent | ..."
                    ]
                }
            },
            //...
        }
        
3. 当我们点击工具栏上的图标,我们需要其响应相应的动作. 打开文件 `editor.js`,我们写入如下的实现代码:

        var Editor = React.createClass({
            //...
            handleToolbarIconClick:function(e,state){
                //...
                switch(state.icon){
                    //...
                        case "indent":
                        case "outdent":
                            EditorHistory.execCommand(state.icon,false,null);
                    //..
                }
                //...
            }
            //..
        }
是的，就是如此简单。我们已经实现了插件的全部功能。

## 实现插件 `spechars`(添加特殊字符)

我们添加了 `indent` 和 `outdent`插件，可以看出是多么的简单.但是，这一次我们将添加插件 `spechars`.该插件包含一个弹出框和弹出框的样式。
 
 1. 当然，这一次我们还是做相应的事情。
 
        `constants\EditorConstants.js`
 
        var EditorIconTypes = {
            \\...
            "spechars":{
                title:"特殊符号",
                disabled:false
            }
            \\...
        }
        
        `components/core/EditorToolbar`
        
        var EditorToolbar = React.createClass({
            //...
            getDefaultProps:function(){
                return {
                    icons:[
                        "... ",
                        "... ",
                        "...  | spechars | ..."
                    ]
                }
            },
            //...
        }
        
        `editor.js`
        
        var Editor = React.createClass({
            //...
            handleToolbarIconClick:function(e,state){
                //...
                switch(state.icon){
                    //...
                    case "spechars":
                        EditorSelection.storeRange();
                        offsetPosition.y += offsetPosition.h+5;
                        offsetPosition.x -= offsetPosition.w/2;
                        this.refs.special.open(offsetPosition,function(e,char){
                            editarea.focus();
                            EditorSelection.restoreRange();
                            EditorHistory.execCommand('inserthtml',false,char);
                            handleRangeChange();
                        });
                        break;
                    //..
                }
                //...
            },
            render:function(){
                //..
                <SpecialCharsDialog ref="special" />
                //..
            }
            //..
        }
        
2. 我们接下来的工作就是添加弹出框。

    在目录下添加文件 `components/plugins/SpecialCharsDialog.react.js`.

    写入如下内容:

        var React = require('react');
        var ReactDOM =  require('react-dom');

        var TabGroup = require('../base/TabGroup.react');
        var Dialog = require('../base/Dialog.react');
        var {SpecialChars} = require('../../constants/EditorConstants');

        var SCChars = React.createClass({
            handleClick:function(e){
                e = e || event;
                var target = e.target || e.srcElement;
                var char = target.getAttribute("data-char");
                var id = 'char-'+new Date().valueOf();
                if(this.props.onSelectChar){
                    this.props.onSelectChar(e,char);
                }
            },
            render:function(){
                var chars = this.props.chars;
                var handleClick = this.handleClick;
                return (<ul className={"special-chars "+this.props.name} >
                    {
                        chars.map(function(ele,pos){
                            return (<li className="special-char" key={pos} data-char={ele} onClick={handleClick}>{ele}</li>)
                        })
                    }
                </ul>)
            }
        })

        var SpecialCharsDialog = React.createClass({
            getInitialState:function(){
                return {
                    handle:function(){}
                }
            },
            open:function(position,handle){
                this.setState({
                    handle:handle
                })
                this.refs.root.open(position);
            },
            close:function(){
                this.refs.root.close();
            },
            toggle:function(position){
                this.refs.root.toggle(position);
            },
            handleSelectChar:function(e,char){
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
            render:function(){
                var tabs = [];
                for(var i=0;i<SpecialChars.length;i++){
                    tabs.push({
                        title:SpecialChars[i].title,
                        chars:SpecialChars[i].chars,
                        component:(<SCChars chars={SpecialChars[i].chars} name="common-chars" onSelectChar={this.handleSelectChar} />)
                    })
                }
                var buttons = [];
                return (<Dialog ref="root" className="special-chars-dialog" width={700} height={508} title="特殊字符" buttons={buttons} onClose={this.close}>
                        <TabGroup tabs={tabs} />
                </Dialog>)
            }
        })

        module.exports = SpecialCharsDialog;


3. 这里提到了常量 `SpecialChars`. 如下实现这个常量:

        `constants\EditorConstants.js`
        
        //...
        var toArray = function(str){
            return str.split(",");
        }
        var SpecialChars = [
            { name:"tsfh", title:"特殊字符", chars:toArray("、,。,·,ˉ,ˇ,¨,〃,々,—,～,‖,…,‘,’,“,”,〔,〕,〈,〉,《,》,「,」,『,』,〖,〗,【,】,±,×,÷,∶,∧,∨,∑,∏,∪,∩,∈,∷,√,⊥,∥,∠,⌒,⊙,∫,∮,≡,≌,≈,∽,∝,≠,≮,≯,≤,≥,∞,∵,∴,♂,♀,°,′,″,℃,＄,¤,￠,￡,‰,§,№,☆,★,○,●,◎,◇,◆,□,■,△,▲,※,→,←,↑,↓,〓,〡,〢,〣,〤,〥,〦,〧,〨,〩,㊣,㎎,㎏,㎜,㎝,㎞,㎡,㏄,㏎,㏑,㏒,㏕,︰,￢,￤,℡,ˊ,ˋ,˙,–,―,‥,‵,℅,℉,↖,↗,↘,↙,∕,∟,∣,≒,≦,≧,⊿,═,║,╒,╓,╔,╕,╖,╗,╘,╙,╚,╛,╜,╝,╞,╟,╠,╡,╢,╣,╤,╥,╦,╧,╨,╩,╪,╫,╬,╭,╮,╯,╰,╱,╲,╳,▁,▂,▃,▄,▅,▆,▇,�,█,▉,▊,▋,▌,▍,▎,▏,▓,▔,▕,▼,▽,◢,◣,◤,◥,☉,⊕,〒,〝,〞")},
            { name:"lmsz", title:"罗马字符", chars:toArray("ⅰ,ⅱ,ⅲ,ⅳ,ⅴ,ⅵ,ⅶ,ⅷ,ⅸ,ⅹ,Ⅰ,Ⅱ,Ⅲ,Ⅳ,Ⅴ,Ⅵ,Ⅶ,Ⅷ,Ⅸ,Ⅹ,Ⅺ,Ⅻ")},
            { name:"szfh", title:"数学字符", chars:toArray("⒈,⒉,⒊,⒋,⒌,⒍,⒎,⒏,⒐,⒑,⒒,⒓,⒔,⒕,⒖,⒗,⒘,⒙,⒚,⒛,⑴,⑵,⑶,⑷,⑸,⑹,⑺,⑻,⑼,⑽,⑾,⑿,⒀,⒁,⒂,⒃,⒄,⒅,⒆,⒇,①,②,③,④,⑤,⑥,⑦,⑧,⑨,⑩,㈠,㈡,㈢,㈣,㈤,㈥,㈦,㈧,㈨,㈩")},
            { name:"rwfh", title:"日文字符", chars:toArray("ぁ,あ,ぃ,い,ぅ,う,ぇ,え,ぉ,お,か,が,き,ぎ,く,ぐ,け,げ,こ,ご,さ,ざ,し,じ,す,ず,せ,ぜ,そ,ぞ,た,だ,ち,ぢ,っ,つ,づ,て,で,と,ど,な,に,ぬ,ね,の,は,ば,ぱ,ひ,び,ぴ,ふ,ぶ,ぷ,へ,べ,ぺ,ほ,ぼ,ぽ,ま,み,む,め,も,ゃ,や,ゅ,ゆ,ょ,よ,ら,り,る,れ,ろ,ゎ,わ,ゐ,ゑ,を,ん,ァ,ア,ィ,イ,ゥ,ウ,ェ,エ,ォ,オ,カ,ガ,キ,ギ,ク,グ,ケ,ゲ,コ,ゴ,サ,ザ,シ,ジ,ス,ズ,セ,ゼ,ソ,ゾ,タ,ダ,チ,ヂ,ッ,ツ,ヅ,テ,デ,ト,ド,ナ,ニ,ヌ,ネ,ノ,ハ,バ,パ,ヒ,ビ,ピ,フ,ブ,プ,ヘ,ベ,ペ,ホ,ボ,ポ,マ,ミ,ム,メ,モ,ャ,ヤ,ュ,ユ,ョ,ヨ,ラ,リ,ル,レ,ロ,ヮ,ワ,ヰ,ヱ,ヲ,ン,ヴ,ヵ,ヶ")},
            { name:"xlzm", title:"希腊字符", chars:toArray("Α,Β,Γ,Δ,Ε,Ζ,Η,Θ,Ι,Κ,Λ,Μ,Ν,Ξ,Ο,Π,Ρ,Σ,Τ,Υ,Φ,Χ,Ψ,Ω,α,β,γ,δ,ε,ζ,η,θ,ι,κ,λ,μ,ν,ξ,ο,π,ρ,σ,τ,υ,φ,χ,ψ,ω")},
            { name:"ewzm", title:"俄文字符", chars:toArray("А,Б,В,Г,Д,Е,Ё,Ж,З,И,Й,К,Л,М,Н,О,П,Р,С,Т,У,Ф,Х,Ц,Ч,Ш,Щ,Ъ,Ы,Ь,Э,Ю,Я,а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я")},
            { name:"pyzm", title:"拼音字母", chars:toArray("ā,á,ǎ,à,ē,é,ě,è,ī,í,ǐ,ì,ō,ó,ǒ,ò,ū,ú,ǔ,ù,ǖ,ǘ,ǚ,ǜ,ü")},
            { name:"yyyb", title:"英语音标", chars:toArray("i:,i,e,æ,ʌ,ə:,ə,u:,u,ɔ:,ɔ,a:,ei,ai,ɔi,əu,au,iə,εə,uə,p,t,k,b,d,g,f,s,ʃ,θ,h,v,z,ʒ,ð,tʃ,tr,ts,dʒ,dr,dz,m,n,ŋ,l,r,w,j,")},
            { name:"zyzf", title:"其它", chars:toArray("ㄅ,ㄆ,ㄇ,ㄈ,ㄉ,ㄊ,ㄋ,ㄌ,ㄍ,ㄎ,ㄏ,ㄐ,ㄑ,ㄒ,ㄓ,ㄔ,ㄕ,ㄖ,ㄗ,ㄘ,ㄙ,ㄚ,ㄛ,ㄜ,ㄝ,ㄞ,ㄟ,ㄠ,ㄡ,ㄢ,ㄣ,ㄤ,ㄥ,ㄦ,ㄧ,ㄨ")}
        ];
        
        module.exports = {
            //...
            SpecialChars:SpecialChars
        }
        
4. 当然，我们还要实现弹出框的样式。

        `less/editor.less`
    
        //...
        .special-chars-dialog{
            .common-chars{
                padding: 0px;
                .special-char{
                    margin: 5px 3px;
                    text-align: center;
                    display: inline-block;
                    width: 40px;
                    height: 16px;
                    line-height: 16px;
                    cursor: pointer;
                }
            }
        }
        //...
    