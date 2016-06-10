## Implement two plugin `indent` and `outdent`

1. Please change the file `constants\EditorConstants.js`, add content as follow:

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
        
2. we have the icon's constant, so we have the toolbar to show. Please change the file  `components/core/EditorToolbar`,add content as follow:

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
        
3. When we click the icon,we can do some action. Open the file `editor.js`,we are writing  the implementation code:

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

Yes! It is just that simple.We had implemented the function.

## Implement a plugin `spechars`

 It is so simple that we implement two plugin `indent` and `outdent`.But, This time,we implement a plugin `spechars`.The plugin contains a dialog and the dialog's stylesheet.
 
 1. OK,we do same things!
 
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
        
2. we next job is implementing the dialog:

    Create a new file in `components/plugins/SpecialCharsDialog.react.js`.

    Write content as follow:

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


3. There is a constant `SpecialChars`. The constant's implement as follow:

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
        
4. Of course! We must create the stylesheet of the dialog:

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
    