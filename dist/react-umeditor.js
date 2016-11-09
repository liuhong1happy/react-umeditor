(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.editor = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* OAuthSimple
* A simpler version of OAuth
*
* author:     jr conlin
* mail:       src@anticipatr.com
* copyright:  unitedHeroes.net
* version:    1.0
* url:        http://unitedHeroes.net/OAuthSimple
*
* Copyright (c) 2009, unitedHeroes.net
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of the unitedHeroes.net nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY UNITEDHEROES.NET ''AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL UNITEDHEROES.NET BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/**
* Computes a HMAC-SHA1 code.
*
* @param {string} k Secret key.
* @param {string} d Data to be hashed.
* @return {string} The hashed string.
*/
function b64_hmac_sha1(k,d,_p,_z){
  // heavily optimized and compressed version of http://pajhome.org.uk/crypt/md5/sha1.js
  // _p = b64pad, _z = character size; not used here but I left them available just in case
  if(!_p){_p='=';}if(!_z){_z=8;}function _f(t,b,c,d){if(t<20){return(b&c)|((~b)&d);}if(t<40){return b^c^d;}if(t<60){return(b&c)|(b&d)|(c&d);}return b^c^d;}function _k(t){return(t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;}function _s(x,y){var l=(x&0xFFFF)+(y&0xFFFF),m=(x>>16)+(y>>16)+(l>>16);return(m<<16)|(l&0xFFFF);}function _r(n,c){return(n<<c)|(n>>>(32-c));}function _c(x,l){x[l>>5]|=0x80<<(24-l%32);x[((l+64>>9)<<4)+15]=l;var w=[80],a=1732584193,b=-271733879,c=-1732584194,d=271733878,e=-1009589776;for(var i=0;i<x.length;i+=16){var o=a,p=b,q=c,r=d,s=e;for(var j=0;j<80;j++){if(j<16){w[j]=x[i+j];}else{w[j]=_r(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);}var t=_s(_s(_r(a,5),_f(j,b,c,d)),_s(_s(e,w[j]),_k(j)));e=d;d=c;c=_r(b,30);b=a;a=t;}a=_s(a,o);b=_s(b,p);c=_s(c,q);d=_s(d,r);e=_s(e,s);}return[a,b,c,d,e];}function _b(s){var b=[],m=(1<<_z)-1;for(var i=0;i<s.length*_z;i+=_z){b[i>>5]|=(s.charCodeAt(i/8)&m)<<(32-_z-i%32);}return b;}function _h(k,d){var b=_b(k);if(b.length>16){b=_c(b,k.length*_z);}var p=[16],o=[16];for(var i=0;i<16;i++){p[i]=b[i]^0x36363636;o[i]=b[i]^0x5C5C5C5C;}var h=_c(p.concat(_b(d)),512+d.length*_z);return _c(o.concat(h),512+160);}function _n(b){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s='';for(var i=0;i<b.length*4;i+=3){var r=(((b[i>>2]>>8*(3-i%4))&0xFF)<<16)|(((b[i+1>>2]>>8*(3-(i+1)%4))&0xFF)<<8)|((b[i+2>>2]>>8*(3-(i+2)%4))&0xFF);for(var j=0;j<4;j++){if(i*8+j*6>b.length*32){s+=_p;}else{s+=t.charAt((r>>6*(3-j))&0x3F);}}}return s;}function _x(k,d){return _n(_h(k,d));}return _x(k,d);
}
module.exports = b64_hmac_sha1;

},{}],2:[function(require,module,exports){
'use strict';
/* eslint-disable no-unused-vars */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (e) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],3:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],4:[function(require,module,exports){
(function (global){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var ComboBox = React.createClass({
	displayName: "ComboBox",

	getInitialState: function getInitialState() {
		return {
			show: false,
			position: {
				x: 0,
				y: 0
			}
		};
	},
	componentDidMount: function componentDidMount() {
		window.addEventListener("click", this.close);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener("click", this.close);
	},
	open: function open(position) {
		this.setState({
			show: true,
			position: position
		});
	},
	close: function close() {
		if (!this.state.show) return;
		this.setState({
			show: false
		});
	},
	toggle: function toggle(position) {
		this.setState({
			show: !this.state.show,
			position: position
		});
	},
	render: function render() {
		var _props = this.props;
		var className = _props.className;
		var style = _props.style;

		var props = _objectWithoutProperties(_props, ["className", "style"]);

		style = style || {};
		if (!this.state.show) {
			style["display"] = "none";
		} else {
			style["display"] = "";
		}
		if (this.state.position) {
			style["left"] = this.state.position.x;
			style["top"] = this.state.position.y;
		}

		return React.createElement(
			"div",
			_extends({ style: style, className: "combobox" + (className ? " " + className : "") }, props),
			this.props.children
		);
	}
});

module.exports = ComboBox;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

/**
* @width: 对话框宽度
* @height: 对话框高度
* @style: 样式
* @buttons: 对话框按钮组
* @title: 对话框标题
* @className: 对话框类名
**/
var Dialog = React.createClass({
	displayName: "Dialog",

	getInitialState: function getInitialState() {
		return {
			show: false
		};
	},
	componentDidMount: function componentDidMount() {
		window.addEventListener("click", this.close);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener("click", this.close);
	},
	open: function open() {
		this.setState({
			show: true
		});
	},
	close: function close() {
		if (!this.state.show) return;
		this.setState({
			show: false
		});
	},
	toggle: function toggle() {
		this.setState({
			show: !this.state.show
		});
	},
	handleMouseDown: function handleMouseDown(e) {
		e = e || event;
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},
	render: function render() {
		var _props = this.props;

		var props = _objectWithoutProperties(_props, []);

		var className = _props.className;
		var buttons = _props.buttons;
		var title = _props.title;
		var style = _props.style;
		var width = _props.width;
		var height = _props.height;

		var style = style ? style : {};
		if (width) {
			style.width = width;
			style.marginLeft = -width / 2;
		}
		if (height) {
			style.height = height;
		}
		style.display = this.state.show ? "" : "none";
		var _className = "dialog" + (className ? " " + className : "");
		return React.createElement(
			"div",
			{ className: "dialog-container", ref: "root", onMouseDown: this.handleMouseDown },
			React.createElement(
				"div",
				{ className: _className, ref: "dialog", style: style },
				React.createElement(
					"div",
					{ className: "dialog-header", ref: "header" },
					React.createElement("a", { className: "dialog-close", onClick: this.props.onClose }),
					React.createElement(
						"h3",
						{ className: "dialog-title" },
						title
					)
				),
				React.createElement(
					"div",
					{ className: "dialog-body", ref: "body" },
					this.props.children
				),
				React.createElement(
					"div",
					{ className: "dialog-footer", ref: "footer" },
					buttons.map(function (ele, pos) {
						return React.createElement(
							"a",
							{ className: "dialog-button", key: pos, "data-name": ele.name, onClick: ele.onClick },
							ele.content
						);
					})
				)
			),
			React.createElement("div", { className: "dialog-backdrop", ref: "backdrop", style: { "display": this.state.show ? "" : "none" } })
		);
	}
});

module.exports = Dialog;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var Dropdown = React.createClass({
	displayName: "Dropdown",

	getInitialState: function getInitialState() {
		return {
			show: false,
			position: {
				x: 0,
				y: 0
			}
		};
	},
	componentDidMount: function componentDidMount() {
		window.addEventListener("click", this.close);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener("click", this.close);
	},
	open: function open(position) {
		this.setState({
			show: true,
			position: position
		});
	},
	close: function close() {
		if (!this.state.show) return;
		this.setState({
			show: false
		});
	},
	toggle: function toggle(position) {
		this.setState({
			show: !this.state.show,
			position: position
		});
	},
	render: function render() {
		var _props = this.props;
		var className = _props.className;
		var style = _props.style;

		var props = _objectWithoutProperties(_props, ["className", "style"]);

		style = style || {};
		if (!this.state.show) {
			style["display"] = "none";
		} else {
			style["display"] = "";
		}
		if (this.state.position) {
			style["left"] = this.state.position.x;
			style["top"] = this.state.position.y;
		}

		return React.createElement(
			"div",
			_extends({ style: style, className: "dropdown" + (className ? " " + className : "") }, props),
			React.createElement("div", { className: "dropdown-caret" }),
			this.props.children
		);
	}
});

module.exports = Dropdown;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var TabGroup = React.createClass({
	displayName: "TabGroup",

	getInitialState: function getInitialState() {
		return {
			tabIndex: 0
		};
	},
	setTabIndex: function setTabIndex(index) {
		this.setState({
			tabIndex: index
		});
	},
	getTabIndex: function getTabIndex() {
		return this.state.tabIndex;
	},
	handleClick: function handleClick(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var index = parseInt(target.getAttribute("data-index"));
		this.setTabIndex(index);
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},
	render: function render() {
		var tabIndex = this.state.tabIndex;
		var tabs = this.props.tabs;
		var component = tabs[tabIndex].component;
		var handleClick = this.handleClick;
		return React.createElement(
			"div",
			{ className: "tab-group" },
			React.createElement(
				"ul",
				{ className: "tab-nav" },
				tabs.map(function (ele, pos) {
					return React.createElement(
						"li",
						{ key: pos, className: "tab-item" + (tabIndex == pos ? " active" : "") },
						React.createElement(
							"a",
							{ "data-index": pos, className: "tab-text", onClick: handleClick },
							ele.title
						)
					);
				})
			),
			React.createElement(
				"div",
				{ className: "tab-content" },
				component
			)
		);
	}
});

module.exports = TabGroup;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');
var EditorSelection = require('../../utils/EditorSelection');
var EditorDOM = require('../../utils/EditorDOM');
var EditorResize = require('../../utils/EditorResize.react');

var EditorContentEditableDiv = React.createClass({
	displayName: 'EditorContentEditableDiv',

	getInitialState: function getInitialState() {
		return {
			content: ""
		};
	},
	componentDidMount: function componentDidMount(e) {
		window.addEventListener("mousedown", this.handleWindowMouseDown);
	},
	componentWillUnmount: function componentWillUnmount(e) {
		window.removeEventListener("mousedown", this.handleWindowMouseDown);
	},
	componentWillUpdate: function componentWillUpdate(e) {
		EditorSelection.cloneRange();
	},
	componentDidUpdate: function componentDidUpdate(e) {
		EditorSelection.cloneRange();
	},
	getContent: function getContent() {
		var target = ReactDOM.findDOMNode(this.refs.edit);
		return target.innerHTML;
	},
	setContent: function setContent(content) {
		this.setState({
			content: content
		});
		var target = ReactDOM.findDOMNode(this.refs.edit);
		target.innerHTML = content;
	},
	getName: function getName() {
		return "div";
	},
	handleWindowMouseDown: function handleWindowMouseDown(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var tagName = target.tagName.toUpperCase();
		var FormControls = ["TEXTAREA", "INPUT", "SELECT", "OPTIONS"];
		if (FormControls.indexOf(tagName) != -1) {
			console.log("in FormControls");
			return;
		}
		EditorSelection.clearRange();
	},
	handleMouseDown: function handleMouseDown(e) {
		EditorSelection.clearRange();
		window.addEventListener("mouseup", this.handleMouseUp);
		EditorDOM.stopPropagation(e);
	},
	handleMouseUp: function handleMouseUp(e) {
		EditorSelection.createRange();
		window.removeEventListener("mouseup", this.handleMouseUp);

		if (this.props.onRangeChange) this.props.onRangeChange(e);
		EditorDOM.stopPropagation(e);
	},
	setResizeTarget: function setResizeTarget(target) {
		this.refs.resize.setTarget(target);
	},
	clearResizeTarget: function clearResizeTarget() {
		this.refs.resize.clearTarget();
	},
	getEditorRange: function getEditorRange() {
		return ReactDOM.findDOMNode(this.refs.edit);
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'editor-contenteditable-div' },
			React.createElement(EditorResize, { ref: 'resize' }),
			React.createElement('div', { className: 'editable-range', ref: 'edit', onMouseUp: this.handleMouseUp, onMouseDown: this.handleMouseDown,
				contentEditable: true, dangerouslySetInnerHTML: { __html: this.state.content } })
		);
	}
});
module.exports = EditorContentEditableDiv;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils/EditorDOM":24,"../../utils/EditorResize.react":27,"../../utils/EditorSelection":28,"react-dom":undefined}],9:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');

var _require = require('../../constants/EditorConstants');

var EditorIconTypes = _require.EditorIconTypes;

// utlils
var EditorHistory = require('../../utils/EditorHistory');
var EditorSelection = require('../../utils/EditorSelection');
var EditorDOM = require('../../utils/EditorDOM');
var EditorTimer = require('../../utils/EditorTimer');

// dialog & dropdown
var ColorDropdown = require('../plugins/ColorDropdown.react');
var FormulaDropdown = require('../plugins/FormulaDropdown.react');
var TablePickerDropdown = require('../plugins/TablePickerDropdown.react');
// combobox
var FontSizeComboBox = require('../plugins/FontSizeComboBox.react');
var FontFamilyComboBox = require('../plugins/FontFamilyComboBox.react');
var ParagraphComboBox = require('../plugins/ParagraphComboBox.react');
// dialog
var EmotionDialog = require('../plugins/EmotionDialog.react');
var SpecialCharsDialog = require('../plugins/SpecialCharsDialog.react');
var ImageDialog = require('../plugins/ImageDialog.react');

// base components
var EditorToolbar = require('../core/EditorToolbar.react');
var EditorTextArea = require('../core/EditorTextArea.react');
var EditorContentEditableDiv = require('../core/EditorContentEditableDiv.react');

// 需要外部引用MathQuill
var MQ = MathQuill ? MathQuill.getInterface(2) : null;

// key down context
var saveSceneTimer = null;
var keycont = 0;

/**
* 对外接口方法
* @findDOMNode: 获取"root","editarea","toolbar","color"的ref对象以及相应的dom对象
* @setContent: 设置html格式数据
* @getContent: 获取html格式数据
* @onFocus: 监听focus事件
* @focusEditor: 聚焦到Editor上
* @defaultValue: 默认内容
* @value: 编辑器的值
* @icons: 工具条上需要显示的图标
**/

var EditorCore = React.createClass({
	displayName: 'EditorCore',

	// init & update
	getInitialState: function getInitialState() {
		return {
			editorState: {
				icon: "source",
				showHtml: false,
				icons: {
					"forecolor": { color: 'transparent', icon: "forecolor" },
					"backcolor": { color: 'transparent', icon: "backcolor" },
					"fontsize": { value: "3", icon: "fontsize" },
					"paragraph": { value: "p", icon: "fontsize" },
					"fontfamily": { value: "宋体, SimSun", icon: "fontfamily" },
					"indent": { active: false, icon: "indent" },
					"outdent": { active: true, icon: "outdent" }
				}
			},
			defaultValue: this.props.defaultValue ? this.props.defaultValue : "<p>This is an Editor</p>",
			value: this.props.value
		};
	},
	componentDidMount: function componentDidMount() {
		EditorHistory.clear();
		this.setContent(this.state.value || this.state.defaultValue);
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		var isCollapsed = true;
		editarea.addEventListener('keydown', this.handleKeyDown);
		editarea.addEventListener('keyup', this.handleKeyUp);
		var onEditorMount = this.props.onEditorMount;
		setTimeout(onEditorMount, 10);
	},
	componentDidUpdate: function componentDidUpdate() {
		var editorState = this.state.editorState;
		switch (editorState.icon) {
			case "source":
				if (editorState.content) this.setContent(editorState.content);
				break;
			case "cleardoc":
				if (editorState.content) this.setContent(editorState.content);
				break;
		}
	},
	componentWillUnmont: function componentWillUnmont() {
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		editarea.removeEventListener('keydown', this.handleKeyDown);
		editarea.removeEventListener('keyup', this.handleKeyUp);
	},
	// event handler
	handleKeyDown: function handleKeyDown(evt) {
		evt = evt || event;
		var target = evt.target || evt.srcElement;
		if (target.className && target.className.indexOf('editor-contenteditable-div') != -1) {
			var keyCode = evt.keyCode || evt.which;
			var autoSave = this.autoSave;
			if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
				if (EditorHistory.getCommandStack().length == 0) {
					autoSave();
					keycont = 0;
				}
				clearTimeout(saveSceneTimer);
				saveSceneTimer = EditorTimer.setTimeout(function () {
					var interalTimer = EditorTimer.setInterval(function () {
						autoSave();
						keycont = 0;
						EditorTimer.clearInterval(interalTimer);
					}, 300);
				}, 200);
				lastKeyCode = keyCode;
				keycont++;
				if (keycont >= maxInputCount) {
					autoSave();
					keycont = 0;
				}
			}
		}
		EditorDOM.stopPropagation(evt);
	},
	handleKeyUp: function handleKeyUp(evt) {
		evt = evt || event;
		var target = evt.target || evt.srcElement;
		if (target.className && target.className.indexOf('editor-contenteditable-div') != -1) {
			var keyCode = evt.keyCode || evt.which;
			if (!evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
				// some handle
			}
		}
		EditorDOM.stopPropagation(evt);
	},
	handleFocus: function handleFocus(e) {
		if (this.props.onFocus) {
			this.props.onFocus(e, this.findDOMNode('root'));
		}
		EditorDOM.stopPropagation(e);
	},
	handleClick: function handleClick(e) {
		EditorDOM.stopPropagation(e);
	},
	exchangeRangeState: function exchangeRangeState(editorState) {
		var rangeState = EditorSelection.getRangeState();
		for (var icon in rangeState) {
			if (!editorState.icons[icon]) editorState.icons[icon] = rangeState[icon];else {
				switch (icon) {
					case "forecolor":
					case "backcolor":
						editorState.icons[icon].color = rangeState[icon].color;
						break;
					case "paragraph":
					case "fontfamily":
					case "fontsize":
						editorState.icons[icon].value = rangeState[icon].value;
						break;
				}
				editorState.icons[icon].active = rangeState[icon].active;
			}
		}
		return editorState;
	},
	handleRangeChange: function handleRangeChange(e) {
		e = e || event;
		if (e && e.type == "blur") return;
		var target = e ? e.target || e.srcElement : null;
		var selection = EditorSelection.getSelection();
		if (selection && selection.rangeCount > 0) {
			var editorState = this.state.editorState;
			editorState = this.exchangeRangeState(editorState);
			// editorState.icon = false;
			this.setState({
				editorState: editorState
			});
			if (this.refs.editarea && this.refs.editarea.clearResizeTarget) {
				this.refs.editarea.clearResizeTarget();
			}
		} else if (target) {
			var tagName = target.tagName.toUpperCase();
			switch (tagName) {
				case "IMG":
					if (this.refs.editarea && this.refs.editarea.setResizeTarget) {
						this.refs.editarea.setResizeTarget(target);
					}
					break;
			}
		}
	},
	handleToolbarIconClick: function handleToolbarIconClick(e, state) {
		e = e || event;
		var target = e.target || e.srcElement;
		var root = ReactDOM.findDOMNode(this.refs.root);
		var offsetPosition = EditorDOM.getOffsetRootParentPosition(target, root);

		var handleRangeChange = this.handleRangeChange;
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		if (this.refs.editarea.getEditorRange) {
			editarea = this.refs.editarea.getEditorRange();
		}
		var editorState = this.state.editorState;
		EditorSelection.cloneRange();
		EditorSelection.storeRange();
		//关闭所有Dialog、Box、Dropdown
		this.closeAllOpenDialog(state.icon);
		EditorSelection.restoreRange();
		switch (state.icon) {
			case "source":
				editorState.showHtml = !editorState.showHtml;
				state.active = editorState.showHtml;
				editorState.content = this.refs.editarea.getContent();
				break;
			case "undo":
				EditorHistory.undo();
				break;
			case "redo":
				EditorHistory.redo();
				break;
			case "removeformat":
				EditorHistory.execCommand(state.icon, false, null);
				EditorSelection.storeRange();
				var spanNodes = EditorSelection.getSpanNodes();
				for (var i = 0; i < spanNodes.length; i++) {
					switch (spanNodes[i].className) {
						case "font-border":
							var spanNode = spanNodes[i];
							var parentNode = spanNode.parentNode;
							var nextSibling = spanNode.nextSibling || spanNode;
							var childSum = spanNode.childNodes.length;
							for (var c = 0; c < childSum; c++) {
								parentNode.insertBefore(spanNode.childNodes[c].cloneNode(), nextSibling);
							}
							parentNode.removeChild(spanNodes[i]);
							break;
						case "emphasis":
							var spanNode = spanNodes[i];
							var parentNode = spanNode.parentNode;
							var nextSibling = spanNode.nextSibling || spanNode;
							var childSum = spanNode.childNodes.length;
							for (var c = 0; c < childSum; c++) {
								parentNode.insertBefore(spanNode.childNodes[c].cloneNode(), nextSibling);
							}
							parentNode.removeChild(spanNodes[i]);
							break;
					}
				}
				EditorSelection.restoreRange();
				break;
			case "bold":
			case "italic":
			case "underline":
			case "strikethrough":
			case "subscript":
			case "superscript":
			case "insertorderedlist":
			case "insertunorderedlist":
			case "selectall":
			case "justifyleft":
			case "justifyright":
			case "justifycenter":
			case "indent":
			case "outdent":
				EditorHistory.execCommand(state.icon, false, null);
				break;
			case "touppercase":
			case "tolowercase":
				EditorSelection.storeRange();
				var textNodes = EditorSelection.getTextNodes();
				for (var i = 0; i < textNodes.length; i++) {
					var node = textNodes[i].childNode;
					var start = textNodes[i].startOffset;
					var end = textNodes[i].endOffset;
					node.nodeValue = node.nodeValue.substring(0, start) + (state.icon == "touppercase" ? node.nodeValue.substring(start, end).toUpperCase() : node.nodeValue.substring(start, end).toLowerCase()) + node.nodeValue.substring(end, node.length);
				}
				EditorHistory.execCommand(state.icon, false, null);
				EditorSelection.restoreRange();
				break;
			case "fontborder":
				var textNodes = EditorSelection.getTextNodes();
				var startNode = null,
				    endNode = null,
				    startOffset = 0,
				    endOffset = 0;
				for (var i = 0; i < textNodes.length; i++) {
					// 获取
					var node = textNodes[i].childNode;
					var start = textNodes[i].startOffset;
					var end = textNodes[i].endOffset;
					// 拷贝
					var cloneNode = node.cloneNode();
					var startText = cloneNode.nodeValue.substring(0, start);
					var endText = cloneNode.nodeValue.substring(end, cloneNode.length);
					var borderText = cloneNode.nodeValue.substring(start, end);
					var span = null;
					var textParentNode = textNodes[i].childNode.parentNode;
					if (textParentNode && textParentNode.className && textParentNode.className == "font-border") {
						if (i == 0) {
							startNode = textNodes[i].childNode;
							startOffset = start;
						}
						if (i == textNodes.length - 1) {
							endNode = textNodes[i].childNode;
							endOffset = end;
						}
					} else {
						// 重新赋值
						node.nodeValue = startText;
						span = document.createElement("span");
						span.className = "font-border";
						span.innerHTML = borderText;
						span.style.border = "1px solid #000";
						node.parentNode.insertBefore(span, node.nextSibling || node);
						if (endText != "") {
							node.parentNode.insertBefore(document.createTextNode(endText), span.nextSibling);
						}
						if (i == 0) startNode = span.childNodes[0];
						if (i == textNodes.length - 1) {
							endNode = span.childNodes[0];
							endOffset = span.childNodes[0].length;
						}
					}
				}
				EditorSelection.addRange(startNode, startOffset, endNode, endOffset);
				// 合并相同font-border元素
				var spanNodes = EditorSelection.getSpanNodes();
				for (var i = 0; i < spanNodes.length - 1; i++) {
					var spanNode = spanNodes[i];
					var parentNode = spanNodes[i].parentNode;

					if (EditorDOM.isNullOfTextNode(spanNode.nextSibling)) {
						// 移除空元素
						parentNode.removeChild(spanNode.nextSibling);
					}
					if (spanNode.nextSibling === spanNodes[i + 1]) {
						var nextSiblingChildNodes = spanNodes[i + 1].childNodes;
						for (var c = 0; c < nextSiblingChildNodes.length; c++) {
							spanNode.appendChild(nextSiblingChildNodes[c].cloneNode());
						}
						// 移除老元素
						parentNode.removeChild(spanNodes[i + 1]);
						// 删除过后，重新指向
						spanNodes[i + 1] = spanNodes[i];
					}
				}
				EditorHistory.execCommand(state.icon, false, null);
				break;
			case "emphasis":
				var textNodes = EditorSelection.getTextNodes();
				var startNode = null,
				    endNode = null,
				    startOffset = 0,
				    endOffset = 0;
				for (var i = 0; i < textNodes.length; i++) {
					// 获取
					var node = textNodes[i].childNode;
					var start = textNodes[i].startOffset;
					var end = textNodes[i].endOffset;
					// 拷贝
					var cloneNode = node.cloneNode();
					var startText = cloneNode.nodeValue.substring(0, start);
					var endText = cloneNode.nodeValue.substring(end, cloneNode.length);
					var borderText = cloneNode.nodeValue.substring(start, end);
					var span = null;
					var textParentNode = textNodes[i].childNode.parentNode;
					if (textParentNode && textParentNode.className && textParentNode.className == "emphasis") {
						if (i == 0) {
							startNode = textNodes[i].childNode;
							startOffset = start;
						}
						if (i == textNodes.length - 1) {
							endNode = textNodes[i].childNode;
							endOffset = end;
						}
					} else {
						// 重新赋值
						node.nodeValue = startText;
						span = document.createElement("span");
						span.className = "emphasis";
						span.innerHTML = borderText;
						node.parentNode.insertBefore(span, node.nextSibling || node);
						if (endText != "") {
							node.parentNode.insertBefore(document.createTextNode(endText), span.nextSibling);
						}
						if (i == 0) startNode = span.childNodes[0];
						if (i == textNodes.length - 1) {
							endNode = span.childNodes[0];
							endOffset = span.childNodes[0].length;
						}
					}
				}
				EditorSelection.addRange(startNode, startOffset, endNode, endOffset);
				// 合并相同font-border元素
				var spanNodes = EditorSelection.getSpanNodes();
				for (var i = 0; i < spanNodes.length - 1; i++) {
					var spanNode = spanNodes[i];
					var parentNode = spanNodes[i].parentNode;

					if (EditorDOM.isNullOfTextNode(spanNode.nextSibling)) {
						// 移除空元素
						parentNode.removeChild(spanNode.nextSibling);
					}
					if (spanNode.nextSibling === spanNodes[i + 1]) {
						var nextSiblingChildNodes = spanNodes[i + 1].childNodes;
						for (var c = 0; c < nextSiblingChildNodes.length; c++) {
							spanNode.appendChild(nextSiblingChildNodes[c].cloneNode());
						}
						// 移除老元素
						parentNode.removeChild(spanNodes[i + 1]);
						// 删除过后，重新指向
						spanNodes[i + 1] = spanNodes[i];
					}
				}
				EditorHistory.execCommand(state.icon, false, null);
				break;
			case "forecolor":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;
				this.refs.color.toggle(offsetPosition, function (e, color) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('forecolor', false, color);
					handleRangeChange();
				});
				break;
			case "backcolor":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;

				this.refs.color.toggle(offsetPosition, function (e, color) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('backcolor', false, color);
					handleRangeChange();
				});
				break;
			case "fontsize":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;

				this.refs.fontsize.toggle(offsetPosition, function (e, fontsize) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('fontsize', false, fontsize);
					handleRangeChange();
				});
				break;
			case "fontfamily":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;

				this.refs.fontfamily.toggle(offsetPosition, function (e, fontfamily) {
					editarea.focus();
					EditorSelection.restoreRange();
					EditorHistory.execCommand('fontname', false, fontfamily);
					handleRangeChange();
				});
				break;
			case "paragraph":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;

				this.refs.paragraph.toggle(offsetPosition, function (e, paragraph) {
					editarea.focus();
					EditorSelection.restoreRange();
					var paragraphs = EditorSelection.getParagraphs();
					for (var i = 0; i < paragraphs.length; i++) {
						switch (paragraphs[i].tagName.toUpperCase()) {
							case "TD":
							case "TH":
							case "DIV":
								var childNodes = paragraphs[i].childNodes;
								var paraElement = document.createElement(paragraph);
								for (var j = 0; j < childNodes.length; j++) {
									paraElement.appendChild(childNodes[j]);
								}
								paragraphs[i].appendChild(paraElement);
								break;
							case "P":
							case "H1":
							case "H2":
							case "H3":
							case "H4":
							case "H5":
							case "H6":
								var parentElement = paragraphs[i];
								var childNodes = paragraphs[i].childNodes;
								var paraElement = document.createElement(paragraph);
								var parentNode = parentElement.parentNode;
								parentNode.insertBefore(paraElement, parentElement.nextSibling);
								for (var j = 0; j < childNodes.length; j++) {
									paraElement.appendChild(childNodes[j]);
								}
								parentNode.removeChild(parentElement);
								break;
							default:
								break;
						}
					}
					EditorHistory.execCommand('paragraph', false, paragraph);
					handleRangeChange();
				});
				break;
			case "cleardoc":
				editorState.content = "<p><br/></p>";
				break;
			case "horizontal":
				var strTime = "<hr/><p></br></p>";
				if (EditorSelection.range.pasteHTML) {
					EditorSelection.range.pasteHTML(strTime);
				} else {
					var hr = EditorDOM.createHR();
					var p = EditorDOM.createNodeByTag('p', '<br/>');
					EditorSelection.range.deleteContents();
					EditorSelection.insertNode(p);
					EditorSelection.insertNode(hr);
				}
				// EditorHistory.execCommand('inserthtml',false,"<hr/><p><br/></p>");
				break;
			case "date":
				var strDate = new Date().Format("yyyy-MM-dd");
				if (EditorSelection.range.pasteHTML) {
					EditorSelection.range.pasteHTML(strDate);
				} else {
					var textNode = EditorDOM.createTextNode(strDate);
					EditorSelection.range.deleteContents();
					EditorSelection.insertNode(textNode);
				}
				// EditorHistory.execCommand('inserthtml',false, strDate);
				break;
			case "time":
				var strTime = new Date().Format('hh:mm:ss');
				if (EditorSelection.range.pasteHTML) {
					EditorSelection.range.pasteHTML(strTime);
				} else {
					var textNode = EditorDOM.createTextNode(strTime);
					EditorSelection.range.deleteContents();
					EditorSelection.insertNode(textNode);
				}
				// EditorHistory.execCommand('inserthtml',false,strTime);
				break;
			case "image":
				EditorSelection.storeRange();
				this.refs.image.toggle(function (e, html) {
					editarea.focus();
					EditorSelection.restoreRange();

					if (html && html.length > 0) {
						if (EditorSelection.range) {
							if (EditorSelection.range.pasteHTML) {
								EditorSelection.range.pasteHTML('<p>' + html + '</p>');
							} else {
								var p = EditorDOM.createNodeByTag('p', html);
								EditorSelection.range.deleteContents();
								EditorSelection.insertNode(p);
							}
							// EditorHistory.execCommand('inserthtml',false,html);
						} else {
								editarea.innerHTML += '<p>' + html + '</p>';
							}
					}
				});
				break;
			case "formula":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;
				offsetPosition.x -= offsetPosition.w / 2;
				var _self = this;
				this.refs.formula.toggle(offsetPosition, function (e, latex, id) {
					editarea.focus();
					EditorSelection.restoreRange();

					if (latex && latex.length > 0) {
						var html = '<span>&nbsp;<span class="mathquill-embedded-latex" id="' + id + '"></span>&nbsp;</span>';
						if (EditorSelection.range) {
							if (EditorSelection.range.pasteHTML) {
								EditorSelection.range.pasteHTML(html);
							} else {
								var span = EditorDOM.createNodeByTag('span', '&nbsp;<span class="mathquill-embedded-latex" id="' + id + '"></span>&nbsp;');
								EditorSelection.range.deleteContents();
								EditorSelection.insertNode(span);
							}
							// EditorHistory.execCommand('inserthtml',false,html);
						} else {
								editarea.innerHTML += html;
							}
						EditorTimer.setTimeout(function () {
							_self.addFormula(id, latex);
						}, 200);
						handleRangeChange();
					}
				});
				break;
			case "inserttable":
				EditorSelection.storeRange();
				offsetPosition.y += offsetPosition.h + 5;
				offsetPosition.x -= offsetPosition.w / 2;
				this.refs.table.toggle(offsetPosition, function (e, table) {
					editarea.focus();
					EditorSelection.restoreRange();
					if (EditorSelection.range.pasteHTML) {
						EditorSelection.range.pasteHTML(table.outerHTML);
					} else {
						EditorSelection.range.deleteContents();
						EditorSelection.insertNode(table);
					}
					// EditorHistory.execCommand('inserthtml',false,html);
					handleRangeChange();
				});
				break;
			case "spechars":
				EditorSelection.storeRange();
				this.refs.special.toggle(function (e, char) {
					editarea.focus();
					EditorSelection.restoreRange();

					if (EditorSelection.range.pasteHTML) {
						EditorSelection.range.pasteHTML(char);
					} else {
						var textNode = EditorDOM.createTextNode(char);
						EditorSelection.range.deleteContents();
						EditorSelection.insertNode(textNode);
					}
					// EditorHistory.execCommand('inserthtml',false,char);
					handleRangeChange();
				});
				break;
			case "emotion":
				EditorSelection.storeRange();
				this.refs.emotion.toggle(function (e, img) {
					editarea.focus();
					EditorSelection.restoreRange();

					if (EditorSelection.range.pasteHTML) {
						EditorSelection.range.pasteHTML(img.outerHTML);
					} else {
						EditorSelection.range.deleteContents();
						EditorSelection.insertNode(img);
					}

					// EditorHistory.execCommand('inserthtml',false,html);
					handleRangeChange();
				});
				break;
		}
		// setState
		editorState.icons[state.icon] = state;
		editorState.icon = state.icon;
		EditorSelection.createRange();
		// range state
		editorState = this.exchangeRangeState(editorState);
		this.setState({
			editorState: editorState
		});
		EditorDOM.stopPropagation(e);
	},
	closeAllOpenDialog: function closeAllOpenDialog(icon) {
		var refsDialog = ["image", "color", "formula", "table", "special", "emotion", "fontsize", "fontfamily", "paragraph"];
		var icons = ["forecolor", "backcolor", "image", "emotion", "spechars", "inserttable", "formula", "paragraph", "fontsize", "fontfamily"];
		if (icons.indexOf(icon) == -1) return;
		for (var i = 0; i < refsDialog.length; i++) {
			this.refs[refsDialog[i]].close();
			console.log("closeDialog", refsDialog[i]);
		}
	},
	// utils
	addFormula: function addFormula(id, latex) {
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		var htmlElement = document.getElementById(id);

		var config = {
			handlers: { edit: function edit() {} },
			restrictMismatchedBrackets: true
		};
		if (htmlElement == null && MQ == null) return;
		var mathField = MQ.MathField(htmlElement, config);
		mathField.latex(latex);
		var $htmlElement = $(htmlElement);
		$htmlElement.keydown(function (e) {
			mathField.focus();
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.keyup(function (e) {
			mathField.focus();
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.mouseup(function (e) {
			mathField.focus();
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.mousedown(function (e) {
			EditorDOM.stopPropagation(e);
		});
		$htmlElement.mousemove(function (e) {
			EditorDOM.stopPropagation(e);
		});
		$(editarea).mousedown(function (e) {
			mathField.blur();
			EditorDOM.stopPropagation(e);
		});
		$(editarea).mousemove(function (e) {
			EditorDOM.stopPropagation(e);
		});
	},
	autoSave: function autoSave() {
		EditorHistory.execCommand('autosave', false, null);
	},
	// public functions
	findDOMNode: function findDOMNode(refName) {
		// 对外公布方法
		var keys = ["root", "editarea", "toolbar", "color"];
		if (keys.indexOf(refName) == -1) return { ref: null, dom: null };
		return {
			ref: this.refs[refName],
			dom: ReactDOM.findDOMNode(this.refs[refName])
		};
	},
	setContent: function setContent(content) {
		var content = content || this.state.defaultValue || "";
		// 后续添加校验方法
		this.refs.editarea.setContent(content);
		// mathquill supports
		if (content.indexOf("mathquill-embedded-latex") != -1) {
			var _self = this;
			EditorTimer.setTimeout(function () {
				var editarea = ReactDOM.findDOMNode(_self.refs.editarea);
				var elements = editarea.querySelectorAll('.mathquill-embedded-latex');
				for (var i = 0; i < elements.length; i++) {
					if (!elements[i].id) {
						var id = "mathquill-" + i + "-" + new Date().valueOf();
						var latex = elements[i].innerHTML;
						elements[i].id = id;
						_self.addFormula(id, latex);
					}
				}
			}, 200);
		}
	},
	getContent: function getContent() {
		return this.refs.editarea.getContent();
	},
	focusEditor: function focusEditor() {
		var editarea = ReactDOM.findDOMNode(this.refs.editarea);
		editarea.focus();
	},
	// render functions 
	genEditArea: function genEditArea() {
		var showHtml = this.state.editorState.showHtml;
		if (showHtml) {
			return React.createElement(EditorTextArea, { ref: 'editarea' });
		} else {
			return React.createElement(EditorContentEditableDiv, { ref: 'editarea', onRangeChange: this.handleRangeChange });
		}
	},
	render: function render() {
		var editArea = this.genEditArea();
		var _props = this.props;
		var index = _props.index;
		var fontSize = _props.fontSize;
		var paragraph = _props.paragraph;
		var fontFamily = _props.fontFamily;
		var icons = _props.icons;
		var plugins = _props.plugins;
		var onBlur = _props.onBlur;
		var className = _props.className;
		var id = _props.id;
		var onFocus = _props.onFocus;
		var onClick = _props.onClick;
		var onEditorMount = _props.onEditorMount;

		var props = _objectWithoutProperties(_props, ['index', 'fontSize', 'paragraph', 'fontFamily', 'icons', 'plugins', 'onBlur', 'className', 'id', 'onFocus', 'onClick', 'onEditorMount']);

		var editorState = this.state.editorState;
		var _icons = icons.join(" ").replace(/\|/gm, "separator").split(" ");
		return React.createElement(
			'div',
			_extends({ ref: 'root', id: id, className: "editor-container editor-default" + (className ? " " + className : ""), onClick: this.handleClick, onBlur: this.handleRangeChange, onFocus: this.handleFocus }, props),
			React.createElement(
				EditorToolbar,
				{ ref: 'toolbar', editorState: editorState, onIconClick: this.handleToolbarIconClick, icons: this.props.icons, paragraph: this.props.paragraph, fontsize: this.props.fontSize, fontfamily: this.props.fontFamily },
				React.createElement(ImageDialog, { hidden: _icons.indexOf("image") == -1, ref: 'image', uploader: this.props.plugins.image.uploader }),
				React.createElement(ColorDropdown, { hidden: _icons.indexOf("forecolor") == -1 && _icons.indexOf("forecolor"), ref: 'color' }),
				React.createElement(FormulaDropdown, { hidden: _icons.indexOf("formula") == -1, ref: 'formula' }),
				React.createElement(TablePickerDropdown, { hidden: _icons.indexOf("inserttable") == -1, ref: 'table' }),
				React.createElement(SpecialCharsDialog, { hidden: _icons.indexOf("spechars") == -1, ref: 'special' }),
				React.createElement(EmotionDialog, { hidden: _icons.indexOf("emotion") == -1, ref: 'emotion' }),
				React.createElement(FontSizeComboBox, { hidden: _icons.indexOf("fontsize") == -1, ref: 'fontsize', fontsize: this.props.fontSize, value: editorState.icons["fontsize"] ? editorState.icons["fontsize"].value : fontSize[0].value }),
				React.createElement(FontFamilyComboBox, { hidden: _icons.indexOf("fontfamily") == -1, ref: 'fontfamily', fontfamily: this.props.fontFamily, value: editorState.icons["fontfamily"] ? editorState.icons["fontfamily"].value : fontFamily[0].value }),
				React.createElement(ParagraphComboBox, { hidden: _icons.indexOf("paragraph") == -1, ref: 'paragraph', paragraph: this.props.paragraph, value: editorState.icons["paragraph"] ? editorState.icons["paragraph"].value : paragraph[0].value })
			),
			editArea
		);
	}
});

module.exports = EditorCore;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../constants/EditorConstants":22,"../../utils/EditorDOM":24,"../../utils/EditorHistory":26,"../../utils/EditorSelection":28,"../../utils/EditorTimer":29,"../core/EditorContentEditableDiv.react":8,"../core/EditorTextArea.react":11,"../core/EditorToolbar.react":12,"../plugins/ColorDropdown.react":13,"../plugins/EmotionDialog.react":14,"../plugins/FontFamilyComboBox.react":15,"../plugins/FontSizeComboBox.react":16,"../plugins/FormulaDropdown.react":17,"../plugins/ImageDialog.react":18,"../plugins/ParagraphComboBox.react":19,"../plugins/SpecialCharsDialog.react":20,"../plugins/TablePickerDropdown.react":21,"react-dom":undefined}],10:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');
/**
* @icon: 图标名称 string
* @disabled: 是否禁用 bool
* @onClick: 暴露点击事件 function
* @title: 提示 string
* @active: 是否选中 bool
* @showHtml: 是否当前是显示html属性
* @color: 前景色和背景色
**/
var EditorIcon = React.createClass({
	displayName: 'EditorIcon',

	componentDidMount: function componentDidMount() {
		this.updateStyle();
	},
	componentDidUpdate: function componentDidUpdate() {
		this.updateStyle();
	},
	updateStyle: function updateStyle() {
		var root = ReactDOM.findDOMNode(this.refs.root);
		var icon = this.props.icon;
		switch (this.props.icon) {
			case "forecolor":
			case "backcolor":
				var color = this.props.color ? this.props.color : "transparent";
				root.id = icon + "_" + new Date().valueOf();
				var style = root.childElementCount > 0 ? root.children[0] : document.createElement('style');
				style.innerHTML = ".icon-" + icon + "#" + root.id + ":before{content:'';border-bottom:3px solid " + color + ";}";
				if (root.childElementCount == 0) root.appendChild(style);
				break;
		}
	},
	handleClick: function handleClick(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		while (target.className.indexOf("editor-icon") == -1) {
			target = target.parentElement;
		}
		e.target = target;

		var _props = this.props;
		var onClick = _props.onClick;

		var props = _objectWithoutProperties(_props, ['onClick']);

		if (this.props.onClick) {
			this.props.onClick(e, _extends({}, props));
		}
	},
	render: function render() {
		var _props2 = this.props;
		var icon = _props2.icon;
		var active = _props2.active;
		var disabled = _props2.disabled;
		var showHtml = _props2.showHtml;
		var onClick = _props2.onClick;

		var props = _objectWithoutProperties(_props2, ['icon', 'active', 'disabled', 'showHtml', 'onClick']);

		var _disabled = showHtml && icon != "source" && icon != "separator";
		var _className = "editor-icon icon-" + icon + (active ? " active" : "") + (disabled || _disabled ? " disabled" : "");
		if (icon == "fontsize" || icon == "fontfamily" || icon == "paragraph") {
			return React.createElement(
				'span',
				_extends({ ref: 'root', className: _className, onClick: this.handleClick }, props),
				React.createElement(
					'span',
					{ className: 'icon-label' },
					props.name
				),
				React.createElement('span', { className: 'icon-caret' })
			);
		} else {
			return React.createElement('span', _extends({ ref: 'root', className: _className, onClick: this.handleClick }, props));
		}
	}
});

module.exports = EditorIcon;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"react-dom":undefined}],11:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');

var EditorTextArea = React.createClass({
	displayName: 'EditorTextArea',

	getInitialState: function getInitialState() {
		return {
			content: ""
		};
	},
	getContent: function getContent() {
		var target = ReactDOM.findDOMNode(this.refs.root);
		return target.value;
	},
	setContent: function setContent(content) {
		this.setState({
			content: content
		});
	},
	getName: function getName() {
		return "textarea";
	},
	handleChange: function handleChange() {
		var target = ReactDOM.findDOMNode(this.refs.root);
		this.setState({
			content: target.value
		});
	},
	render: function render() {
		return React.createElement('textarea', { ref: 'root', className: 'editor-textarea', value: this.state.content, onChange: this.handleChange });
	}
});
module.exports = EditorTextArea;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"react-dom":undefined}],12:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var EditorIcon = require('./EditorIcon.react');

var _require = require('../../constants/EditorConstants');

var EditorIconTypes = _require.EditorIconTypes;

var EditorHistory = require('../../utils/EditorHistory');

var EditorToolbar = React.createClass({
	displayName: 'EditorToolbar',

	propTypes: {
		icons: React.PropTypes.array
	},
	getDefaultProps: function getDefaultProps() {
		return {
			icons: []
		};
	},
	handleIconClick: function handleIconClick(e, state) {

		if (this.props.onIconClick) {
			this.props.onIconClick(e, state);
		}
	},
	getNameByValue: function getNameByValue(arr, value) {
		var filterArr = arr.filter(function (ele, pos) {
			return ele.value == value;
		});
		if (filterArr.length > 0) {
			return filterArr[0].name;
		} else {
			return "";
		}
	},
	getIcons: function getIcons() {
		var editorState = this.props.editorState;
		editorState.icons["undo"] = { disabled: !EditorHistory.canUndo() };
		editorState.icons["redo"] = { disabled: !EditorHistory.canRedo() };
		if (editorState.icons["fontsize"]) editorState.icons["fontsize"].name = this.getNameByValue(this.props.fontsize, editorState.icons["fontsize"].value);
		if (editorState.icons["paragraph"]) editorState.icons["paragraph"].name = this.getNameByValue(this.props.paragraph, editorState.icons["paragraph"].value);
		if (editorState.icons["fontfamily"]) editorState.icons["fontfamily"].name = this.getNameByValue(this.props.fontfamily, editorState.icons["fontfamily"].value);

		var icons = this.props.icons;
		var _icons = icons.join(" ").replace(/\|/gm, "separator").split(" ");
		_icons = _icons.filter(function (ico) {
			return ico != "";
		});
		var returnArray = [];
		for (var i = 0; i < _icons.length; i++) {
			returnArray[i] = EditorIconTypes[_icons[i]];
			returnArray[i].onClick = this.handleIconClick;
			returnArray[i].icon = _icons[i];
			if (editorState.icons[_icons[i]]) {
				returnArray[i].disabled = !!editorState.icons[_icons[i]].disabled;
				returnArray[i].active = !!editorState.icons[_icons[i]].active;
				returnArray[i].color = editorState.icons[_icons[i]].color;
				returnArray[i].value = editorState.icons[_icons[i]].value;
				returnArray[i].name = editorState.icons[_icons[i]].name;
			}
			returnArray[i].showHtml = !!editorState.showHtml;
		}
		return returnArray;
	},
	render: function render() {
		var icons = this.getIcons();
		return React.createElement(
			'div',
			{ className: 'editor-toolbar' },
			icons.map(function (icon, pos) {
				var props = icon;
				return React.createElement(EditorIcon, _extends({ key: pos }, props));
			}),
			this.props.children
		);
	}
});

module.exports = EditorToolbar;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../constants/EditorConstants":22,"../../utils/EditorHistory":26,"./EditorIcon.react":10}],13:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Dropdown = require('../base/Dropdown.react');

var _require = require('../../constants/EditorConstants');

var ColorTypes = _require.ColorTypes;

var EditorDOM = require('../../utils/EditorDOM');
var ColorDropdown = React.createClass({
	displayName: 'ColorDropdown',

	getInitialState: function getInitialState() {
		return {
			handle: function handle() {}
		};
	},
	open: function open(position, handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.open(position);
	},
	close: function close() {
		if (this.refs.root) this.refs.root.close();
	},
	toggle: function toggle(position, handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.toggle(position);
	},
	handleSelectColor: function handleSelectColor(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var color = target.getAttribute('data-color');
		if (this.state.handle) {
			this.state.handle(e, color);
		}
		this.close();
		EditorDOM.stopPropagation(e);
	},
	render: function render() {
		var handleSelectColor = this.handleSelectColor;
		if (this.props.hidden) {
			return React.createElement('div', null);
		} else {
			return React.createElement(
				Dropdown,
				{ ref: 'root', className: 'color-dropdown' },
				React.createElement(
					'table',
					null,
					React.createElement(
						'tbody',
						null,
						React.createElement(
							'tr',
							{ className: 'title-row', key: "title-row" },
							React.createElement(
								'td',
								{ colSpan: 10 },
								'主题颜色'
							)
						),
						ColorTypes.themeColors.map(function (colors, pos) {
							var firstRow = pos == 0;
							return React.createElement(
								'tr',
								{ key: pos, className: firstRow ? "first-row" : "" },
								colors.map(function (color, index) {
									return React.createElement(
										'td',
										{ key: index },
										React.createElement('a', { className: 'color-anchor', 'data-color': color, style: { "backgroundColor": color }, onClick: handleSelectColor })
									);
								})
							);
						}),
						React.createElement(
							'tr',
							{ className: 'title-row', key: "title-row2" },
							React.createElement(
								'td',
								{ colSpan: 10 },
								'标准颜色'
							)
						),
						React.createElement(
							'tr',
							{ className: 'last-row', key: "last-row" },
							ColorTypes.standardColors.map(function (color, pos) {
								return React.createElement(
									'td',
									{ key: pos },
									React.createElement('a', { className: 'color-anchor', 'data-color': color, style: { "backgroundColor": color }, onClick: handleSelectColor })
								);
							})
						)
					)
				)
			);
		}
	}
});

module.exports = ColorDropdown;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../constants/EditorConstants":22,"../../utils/EditorDOM":24,"../base/Dropdown.react":6}],14:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');

var TabGroup = require('../base/TabGroup.react');
var Dialog = require('../base/Dialog.react');

var _require = require('../../constants/EditorConstants');

var EmotionImages = _require.EmotionImages;

var EmotionPanel = React.createClass({
	displayName: 'EmotionPanel',

	handleClick: function handleClick(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var url = target.getAttribute("data-url");
		var title = target.getAttribute("data-title");

		if (this.props.onSelectImage) {
			var img = document.createElement('img');
			img.src = url;
			img.title = title;
			this.props.onSelectImage(e, img);
		}
	},
	render: function render() {
		var images = this.props.images;
		var handleClick = this.handleClick;
		return React.createElement(
			'ul',
			{ className: "emotion-images " + this.props.name },
			images.map(function (ele, pos) {
				return React.createElement(
					'li',
					{ className: 'emotion-image', key: pos, 'data-url': ele.url, 'data-title': ele.title, onClick: handleClick },
					React.createElement('img', { src: ele.url, title: ele.title, 'data-url': ele.url, 'data-title': ele.title })
				);
			})
		);
	}
});

var EmotionDialog = React.createClass({
	displayName: 'EmotionDialog',

	getInitialState: function getInitialState() {
		return {
			handle: function handle() {}
		};
	},
	open: function open(handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.open();
	},
	close: function close() {
		if (this.refs.root) this.refs.root.close();
	},
	toggle: function toggle(handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.toggle();
	},
	handleSelectImage: function handleSelectImage(e, img) {
		e = e || event;
		if (this.state.handle) {
			this.state.handle(e, img);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	getEmotionTabs: function getEmotionTabs() {
		var EmotionTabs = EmotionImages.EmotionTabs;
		var BaseUrl = EmotionImages.BaseUrl;
		var SmileyInfor = EmotionImages.SmileyInfor;

		var tabs = [];
		for (var key in EmotionTabs) {
			var tab = { title: EmotionTabs[key].name };
			var images = [];
			var titles = SmileyInfor[key];
			for (var i = 0; i < titles.length; i++) {
				var index = (i + 1).toString();
				index = index.length == 1 ? "0" + index : index;
				var image = {
					title: titles[i],
					url: BaseUrl + EmotionTabs[key].path + EmotionTabs[key].prefix + index + ".gif?v=1.1"
				};
				images.push(image);
			}
			tab.images = images;
			tabs.push(tab);
		}
		return tabs;
	},
	render: function render() {
		var tabs = [];
		var EmotionTabs = this.getEmotionTabs();

		for (var i = 0; i < EmotionTabs.length; i++) {
			tabs.push({
				title: EmotionTabs[i].title,
				images: EmotionTabs[i].images,
				component: React.createElement(EmotionPanel, { images: EmotionTabs[i].images, name: 'common-images', onSelectImage: this.handleSelectImage })
			});
		}
		var buttons = [];
		if (this.props.hidden) {
			return React.createElement('div', null);
		} else {
			return React.createElement(
				Dialog,
				{ ref: 'root', className: 'emotion-dropdwon', width: 700, height: 508, title: '表情', buttons: buttons, onClose: this.close },
				React.createElement(TabGroup, { tabs: tabs })
			);
		}
	}
});

module.exports = EmotionDialog;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../constants/EditorConstants":22,"../base/Dialog.react":5,"../base/TabGroup.react":7,"react-dom":undefined}],15:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ComboBox = require('../base/ComboBox.react');

var FontFamilyDropdown = React.createClass({
	displayName: 'FontFamilyDropdown',

	getInitialState: function getInitialState() {
		return {
			handle: function handle() {}
		};
	},
	open: function open(position, handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.open(position);
	},
	close: function close() {
		if (this.refs.root) this.refs.root.close();
	},
	toggle: function toggle(position, handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.toggle(position);
	},
	handleSelect: function handleSelect(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var value = target.getAttribute('data-value');
		if (this.state.handle) {
			this.state.handle(e, value);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	render: function render() {
		var handleSelect = this.handleSelect;
		var fontfamily = this.props.fontfamily ? this.props.fontfamily : [];
		var props = this.props;
		if (this.props.hidden) {
			return React.createElement('div', null);
		} else {
			return React.createElement(
				ComboBox,
				{ ref: 'root', className: 'fontfamily-combobox' },
				React.createElement(
					'ul',
					null,
					fontfamily.map(function (ele, pos) {
						return React.createElement(
							'li',
							{ className: ele.value == props.value ? "active" : "", key: pos, 'data-value': ele.value, onClick: handleSelect },
							React.createElement(
								'span',
								{ 'data-value': ele.value, style: { "fontFamily": ele.value } },
								ele.name
							)
						);
					})
				)
			);
		}
	}
});

module.exports = FontFamilyDropdown;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../base/ComboBox.react":4}],16:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ComboBox = require('../base/ComboBox.react');

var FontSizeDropdown = React.createClass({
	displayName: 'FontSizeDropdown',

	getInitialState: function getInitialState() {
		return {
			handle: function handle() {}
		};
	},
	open: function open(position, handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.open(position);
	},
	close: function close() {
		if (this.refs.root) this.refs.root.close();
	},
	toggle: function toggle(position, handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.toggle(position);
	},
	handleSelect: function handleSelect(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var value = target.getAttribute('data-value');
		if (this.state.handle) {
			this.state.handle(e, value);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	render: function render() {
		var handleSelect = this.handleSelect;
		var fontsize = this.props.fontsize ? this.props.fontsize : [];
		var props = this.props;
		if (this.props.hidden) {
			return React.createElement('div', null);
		} else {
			return React.createElement(
				ComboBox,
				{ ref: 'root', className: 'fontsize-combobox' },
				React.createElement(
					'ul',
					null,
					fontsize.map(function (ele, pos) {
						return React.createElement(
							'li',
							{ className: ele.value == props.value ? "active" : "", key: pos, 'data-value': ele.value, onClick: handleSelect },
							React.createElement(
								'span',
								{ 'data-value': ele.value, style: { "fontSize": ele.name } },
								ele.name
							)
						);
					})
				)
			);
		}
	}
});

module.exports = FontSizeDropdown;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../base/ComboBox.react":4}],17:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');

var TabGroup = require('../base/TabGroup.react');
var Dropdown = require('../base/Dropdown.react');

var _require = require('../../constants/EditorConstants');

var FormulaTypes = _require.FormulaTypes;

var FormulaIcons = React.createClass({
	displayName: 'FormulaIcons',

	handleClick: function handleClick(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var latex = target.getAttribute("data-latex");
		var id = 'mathquill-' + new Date().valueOf();
		if (this.props.onSelectFormula) {
			this.props.onSelectFormula(e, latex, id);
		}
	},
	render: function render() {
		var icons = this.props.icons;
		var handleClick = this.handleClick;
		return React.createElement(
			'ul',
			{ className: "formulas-icons " + this.props.name },
			icons.map(function (ele, pos) {
				return React.createElement('li', { className: 'latex-icon', key: pos, 'data-latex': ele.latex, style: { "backgroundPosition": ele.backgroundPosition }, onClick: handleClick });
			})
		);
	}
});

var FormulaDropdown = React.createClass({
	displayName: 'FormulaDropdown',

	getInitialState: function getInitialState() {
		return {
			handle: function handle() {}
		};
	},
	open: function open(position, handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.open(position);
	},
	close: function close() {
		if (this.refs.root) this.refs.root.close();
	},
	toggle: function toggle(position, handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.toggle(position);
	},
	handleSelectFormula: function handleSelectFormula(e, latex, id) {
		e = e || event;
		if (this.state.handle) {
			this.state.handle(e, latex, id);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	render: function render() {
		var tabs = [{ title: "常用公式", component: React.createElement(FormulaIcons, { icons: FormulaTypes.commonFormulas, name: 'common-formulas', onSelectFormula: this.handleSelectFormula }) }, { title: "符号", component: React.createElement(FormulaIcons, { icons: FormulaTypes.symbolFormulas, name: 'symbol-formulas', onSelectFormula: this.handleSelectFormula }) }, { title: "字母", component: React.createElement(FormulaIcons, { icons: FormulaTypes.arabicFormulas, name: 'arabic-formulas', onSelectFormula: this.handleSelectFormula }) }];
		if (this.props.hidden) {
			return React.createElement('div', null);
		} else {
			return React.createElement(
				Dropdown,
				{ ref: 'root', className: 'formula-dropdown' },
				React.createElement(TabGroup, { tabs: tabs })
			);
		}
	}
});

module.exports = FormulaDropdown;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../constants/EditorConstants":22,"../base/Dropdown.react":6,"../base/TabGroup.react":7,"react-dom":undefined}],18:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');

var Dialog = require('../base/Dialog.react');
var TabGroup = require('../base/TabGroup.react');
var Uploader = require('../../utils/FileUpload');

var ImageUpload = React.createClass({
	displayName: 'ImageUpload',

	getInitialState: function getInitialState() {
		return {
			images: [],
			dragEnter: false
		};
	},
	handleUploadFile: function handleUploadFile(obj) {
		/**
   * 点击 obj = e.target
   * 拖拽 obj = e.dataTransfer
   */
		var _self = this;
		var images = this.state.images;
		var request = this.props.request;
		var mask = ReactDOM.findDOMNode(this.refs.mask);
		var uploader = this.props.customUploader ? this.props.customUploader : Uploader;

		var files = obj.files;
		var fileIndex = 0;
		single(files[fileIndex]);

		function single(file) {
			uploader.uploadFile({
				file: file,
				filename: _self.props.name,
				url: _self.props.url,
				type: _self.props.type,
				qiniu: _self.props.qiniu,
				onLoad: function onLoad(e) {
					mask.style.display = "block";
					mask.innerHTML = fileIndex + 1 + '/' + files.length + ' Uploading...';
				},
				onSuccess: function onSuccess(res) {
					// console.log(`2文件总数：${files.length}`);
					mask.style.display = "block";
					mask.innerHTML = "Load Success";

					if (res && res.status == "success") {
						images.push({
							src: res.data[request || "image_src"]
						});
						_self.setState({
							images: images
						});
						if (_self.props.onChange) {
							_self.props.onChange(0, images);
						}
						// console.log(`3文件总数：${files.length}`);
					}

					setTimeout(function () {

						if (fileIndex + 1 < files.length) {
							//判断是否还有图片没有上传
							fileIndex += 1;
							single(files[fileIndex]);
						} else {
							//去除遮罩层
							mask.style.display = "none";
							//图片上传完毕，重置文件索引 fileIndex
							fileIndex = 0;
							if (!obj.dropEffect) {
								console.log('done');
								// clear value
								obj.value = "";
							}
						}
					}, 200);
				},
				onError: function onError(e) {
					mask.style.display = "block";
					mask.innerHTML = "Load Error";
					setTimeout(function () {
						mask.style.display = "none";
					}, 200);
				}
			});
		}
	},
	handleChange: function handleChange(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		if (target.files.length > 0) {
			this.handleUploadFile(target);
			// clear value
			// target.value = "";
		}
	},
	getImages: function getImages() {
		return this.state.images;
	},
	clearImages: function clearImages() {
		this.setState({
			images: []
		});
	},
	handleRemoveImage: function handleRemoveImage(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var index = parseInt(target.getAttribute("data-index"));
		var images = this.state.images;
		images.splice(index, 1);
		this.setState({
			images: images
		});
		if (this.props.onChange) this.props.onChange(0, images);
	},
	handleDrop: function handleDrop(e) {
		e.preventDefault();
		var files = e.dataTransfer.files;
		if (files.length > 0) {
			// this.handleUploadFile(files[0]);
			this.handleUploadFile(e.dataTransfer);
		}
		this.setState({
			dragEnter: false
		});
		console.log(e.type);
	},
	handleDragOver: function handleDragOver(e) {
		e.preventDefault();
		console.log(e.type);
	},
	handleDragEnter: function handleDragEnter(e) {
		this.setState({
			dragEnter: true
		});
		console.log(e.type);
	},
	handleDragLeave: function handleDragLeave(e) {
		this.setState({
			dragEnter: false
		});
		console.log(e.type);
	},
	render: function render() {
		var images = this.state.images;
		var dragEnter = this.state.dragEnter;
		var handleRemoveImage = this.handleRemoveImage;
		var action = this.props.action ? this.props.action : "/upload";
		var showStyle = {
			"display": "block"
		};
		var hideStyle = {
			"display": "none"
		};

		var hasImages = images.length > 0;
		return React.createElement(
			'div',
			{ className: 'tab-panel' },
			React.createElement(
				'div',
				{ className: "image-content" + (dragEnter ? " drag-enter" : ""), onDrop: this.handleDrop,
					onDragOver: this.handleDragOver,
					onDragEnter: this.handleDragEnter,
					onDragLeave: this.handleDragLeave,
					onDragEnd: this.handleDragLeave,
					onDragStart: this.handleDragEnter },
				images.map(function (ele, pos) {
					return React.createElement(
						'div',
						{ className: 'image-item' },
						React.createElement('div', { className: 'image-close', 'data-index': pos, onClick: handleRemoveImage }),
						React.createElement('img', { src: ele.src, className: 'image-pic', height: '75', width: '120' })
					);
				}),
				React.createElement(
					'div',
					{ className: 'image-upload2', style: hasImages ? showStyle : hideStyle },
					React.createElement('span', { className: 'image-icon' }),
					React.createElement(
						'form',
						{ className: 'image-form', method: 'post', encType: 'multipart/form-data', target: 'up', action: action },
						React.createElement('input', { onChange: this.handleChange, multiple: 'multiple', style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'image-dragTip', style: hasImages ? hideStyle : showStyle },
				'支持图片拖拽上传'
			),
			React.createElement(
				'div',
				{ className: 'image-upload1', style: hasImages ? hideStyle : showStyle },
				React.createElement('span', { className: 'image-icon' }),
				React.createElement(
					'form',
					{ className: 'image-form', method: 'post', encType: 'multipart/form-data', target: 'up', action: action },
					React.createElement('input', { onChange: this.handleChange, multiple: 'multiple', style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
				)
			),
			React.createElement(
				'div',
				{ className: 'image-mask', ref: 'mask' },
				"Loading...."
			)
		);
	}
});

var ImageSearch = React.createClass({
	displayName: 'ImageSearch',

	getInitialState: function getInitialState() {
		return {
			images: []
		};
	},
	getImages: function getImages() {
		return this.state.images;
	},
	clearImages: function clearImages() {
		this.setState({
			images: []
		});
	},
	handleClick: function handleClick(e) {
		var text = ReactDOM.findDOMNode(this.refs.text);
		var src = text.value;
		var images = this.state.images;
		if (src && src.length > 0) {
			images.push({ src: src });
			this.setState({
				images: images
			});
			if (this.props.onChange) this.props.onChange(1, images);
			text.value = "";
		}
	},
	handleRemoveImage: function handleRemoveImage(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var index = parseInt(target.getAttribute("data-index"));
		var images = this.state.images;
		images.splice(index, 1);
		this.setState({
			images: images
		});
	},
	render: function render() {
		var images = this.state.images;
		var handleRemoveImage = this.handleRemoveImage;
		return React.createElement(
			'div',
			{ className: 'tab-panel' },
			React.createElement(
				'table',
				{ className: 'search-bar' },
				React.createElement(
					'tbody',
					null,
					React.createElement(
						'tr',
						null,
						React.createElement(
							'td',
							null,
							React.createElement('input', { className: 'image-searchTxt', type: 'text', ref: 'text' })
						),
						React.createElement(
							'td',
							null,
							React.createElement(
								'div',
								{ className: 'image-searchAdd', onClick: this.handleClick },
								'添加'
							)
						)
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'image-content' },
				images.map(function (ele, pos) {
					return React.createElement(
						'div',
						{ key: pos, className: 'image-item' },
						React.createElement('div', { className: 'image-close', 'data-index': pos, onClick: handleRemoveImage }),
						React.createElement('img', { src: ele.src, className: 'image-pic', height: '75', width: '120' })
					);
				})
			)
		);
	}
});

var ImageDialog = React.createClass({
	displayName: 'ImageDialog',

	getInitialState: function getInitialState() {
		return {
			images: [[], []],
			handle: function handle() {}
		};
	},
	propTypes: {
		uploader: React.PropTypes.object,
		customUploader: React.PropTypes.object
	},
	getDefaultProps: function getDefaultProps() {
		return {
			uploader: {
				type: "default", // qiniu
				name: "file",
				url: "/upload",
				request: "image_src",
				qiniu: {
					app: {
						bucket: "qtestbucket",
						ak: "iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV",
						sk: "6QTOr2Jg1gcZEWDQXKOGZh5PziC2MCV5KsntT70j"
					},
					key: null,
					upload_token: null
				}
			}
		};
	},
	open: function open(handle) {
		this.setState({
			handle: handle
		});
		this.refs.modal.open();
	},
	close: function close() {
		if (this.refs.modal) {
			this.refs.modal.close();
			if (this.state.handle) {
				this.state.handle();
			}
			this.refs.image.clearImages();
		}
	},
	toggle: function toggle(handle) {
		this.setState({
			handle: handle
		});
		this.refs.modal.toggle();
	},
	handleOkClick: function handleOkClick(e) {
		// 做相应的处理
		var tabIndex = this.refs.tab.getTabIndex();
		var images = this.state.images[tabIndex];
		var strImgs = "";
		if (images.length > 0 && this.state.handle) {
			for (var i = 0; i < images.length; i++) {
				var src = images[i].src;
				var str = "<img src='" + src + "' />";
				strImgs += str;
			}
			this.state.handle(e, strImgs);
		}
		this.close();
	},
	handleChange: function handleChange(index, imgs) {
		var images = this.state.images;
		images[index] = imgs;
		this.setState({
			images: images
		});
	},
	render: function render() {
		var uploader = this.props.uploader;
		var buttons = [{ name: "btn-ok", content: "确定", onClick: this.handleOkClick }, { name: "btn-cancel", content: "取消", onClick: this.close }];
		var tabs = [{ title: "本地上传", component: React.createElement(ImageUpload, { ref: 'image', onChange: this.handleChange, request: uploader.request, type: uploader.type, name: uploader.name, url: uploader.url, qiniu: uploader.qiniu }) }, { title: "网络图片", component: React.createElement(ImageSearch, { ref: 'image', onChange: this.handleChange }) }];
		if (this.props.hidden) {
			return React.createElement('div', null);
		} else {
			return React.createElement(
				Dialog,
				{ ref: 'modal', className: 'image-dialog', width: 700, height: 508, title: '图片', buttons: buttons, onClose: this.close },
				React.createElement(TabGroup, { tabs: tabs, ref: 'tab' })
			);
		}
	}
});

module.exports = ImageDialog;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../utils/FileUpload":30,"../base/Dialog.react":5,"../base/TabGroup.react":7,"react-dom":undefined}],19:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ComboBox = require('../base/ComboBox.react');

var ParagraphDropdown = React.createClass({
	displayName: 'ParagraphDropdown',

	getInitialState: function getInitialState() {
		return {
			handle: function handle() {}
		};
	},
	open: function open(position, handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.open(position);
	},
	close: function close() {
		if (this.refs.root) this.refs.root.close();
	},
	toggle: function toggle(position, handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.toggle(position);
	},
	handleSelect: function handleSelect(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var value = target.getAttribute('data-value');
		if (this.state.handle) {
			this.state.handle(e, value);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	render: function render() {
		var handleSelect = this.handleSelect;
		var paragraph = this.props.paragraph ? this.props.paragraph : [];
		var props = this.props;
		if (this.props.hidden) {
			return React.createElement('div', null);
		} else {
			return React.createElement(
				ComboBox,
				{ ref: 'root', className: 'paragraph-combobox' },
				React.createElement(
					'ul',
					null,
					paragraph.map(function (ele, pos) {
						return React.createElement(
							'li',
							{ className: ele.value == props.value ? "active" : "", key: pos, 'data-value': ele.value, onClick: handleSelect },
							React.createElement(ele.value, { "data-value": ele.value }, ele.name)
						);
					})
				)
			);
		}
	}
});

module.exports = ParagraphDropdown;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../base/ComboBox.react":4}],20:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');

var TabGroup = require('../base/TabGroup.react');
var Dialog = require('../base/Dialog.react');

var _require = require('../../constants/EditorConstants');

var SpecialChars = _require.SpecialChars;

var SCChars = React.createClass({
	displayName: 'SCChars',

	handleClick: function handleClick(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var char = target.getAttribute("data-char");
		var id = 'char-' + new Date().valueOf();
		if (this.props.onSelectChar) {
			this.props.onSelectChar(e, char);
		}
	},
	render: function render() {
		var chars = this.props.chars;
		var handleClick = this.handleClick;
		return React.createElement(
			'ul',
			{ className: "special-chars " + this.props.name },
			chars.map(function (ele, pos) {
				return React.createElement(
					'li',
					{ className: 'special-char', key: pos, 'data-char': ele, onClick: handleClick },
					ele
				);
			})
		);
	}
});

var SpecialCharsDialog = React.createClass({
	displayName: 'SpecialCharsDialog',

	getInitialState: function getInitialState() {
		return {
			handle: function handle() {}
		};
	},
	open: function open(handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.open();
	},
	close: function close() {
		if (this.refs.root) this.refs.root.close();
	},
	toggle: function toggle(handle) {
		this.setState({
			handle: handle
		});
		this.refs.root.toggle();
	},
	handleSelectChar: function handleSelectChar(e, char) {
		e = e || event;
		if (this.state.handle) {
			this.state.handle(e, char);
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		this.close();
	},
	render: function render() {
		var tabs = [];
		for (var i = 0; i < SpecialChars.length; i++) {
			tabs.push({
				title: SpecialChars[i].title,
				chars: SpecialChars[i].chars,
				component: React.createElement(SCChars, { chars: SpecialChars[i].chars, name: 'common-chars', onSelectChar: this.handleSelectChar })
			});
		}
		var buttons = [];
		if (this.props.hidden) {
			return React.createElement('div', null);
		} else {
			return React.createElement(
				Dialog,
				{ ref: 'root', className: 'special-chars-dialog', width: 700, height: 508, title: '特殊字符', buttons: buttons, onClose: this.close },
				React.createElement(TabGroup, { tabs: tabs })
			);
		}
	}
});

module.exports = SpecialCharsDialog;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../constants/EditorConstants":22,"../base/Dialog.react":5,"../base/TabGroup.react":7,"react-dom":undefined}],21:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Dropdown = require('../base/Dropdown.react');

var TablePickerDropdown = React.createClass({
    displayName: 'TablePickerDropdown',

    getInitialState: function getInitialState() {
        return {
            row: 0,
            column: 0,
            handle: function handle() {}
        };
    },
    open: function open(position, handle) {
        this.setState({
            handle: handle
        });
        this.refs.root.open(position);
    },
    close: function close() {
        if (this.refs.root) this.refs.root.close();
    },
    toggle: function toggle(position, handle) {
        this.setState({
            handle: handle
        });
        this.refs.root.toggle(position);
    },
    handleMouseEvent: function handleMouseEvent(e) {
        e = e || event;
        var target = e.target || e.srcElement;
        var parentPostion = target.getBoundingClientRect();
        var row = Math.ceil((e.clientX - parentPostion.left) / 22);
        var column = Math.ceil((e.clientY - parentPostion.top) / 22);
        if (row < 0) row = 0;
        if (column < 0) column = 0;

        if (row > 10) row = 10;
        if (column > 10) column = 10;
        this.setState({
            row: row,
            column: column
        });
    },
    handleMouseOut: function handleMouseOut(e) {
        this.setState({
            row: 0,
            column: 0
        });
    },
    handleClick: function handleClick(e) {
        // insert table
        var Table = document.createElement("table");
        Table.className = "editor-table";
        var TBody = Table.createTBody();
        for (var i = 0; i < this.state.row; i++) {
            var Tr = TBody.insertRow();
            for (var j = 0; j < this.state.column; j++) {
                var Td = Tr.insertCell();
                Td.width = 200;
            }
        }
        this.state.handle(e, Table);
        this.refs.root.close();
    },
    render: function render() {
        var row = this.state.row;
        var column = this.state.column;
        if (this.props.hidden) {
            return React.createElement('div', null);
        } else {
            return React.createElement(
                Dropdown,
                { ref: 'root', className: 'tablepicker-dropdown' },
                React.createElement(
                    'div',
                    { className: 'infoarea' },
                    ' ',
                    React.createElement(
                        'span',
                        null,
                        column + "列 x " + row + "行"
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'pickarea', onMouseOver: this.handleMouseEvent, onMouseMove: this.handleMouseEvent,
                        onMouseOut: this.handleMouseOut, onClick: this.handleClick },
                    React.createElement('div', { className: 'overlay', style: { width: row * 22, height: column * 22 } })
                )
            );
        }
    }
});

module.exports = TablePickerDropdown;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../base/Dropdown.react":6}],22:[function(require,module,exports){
"use strict";

var EditorIconTypes = {
	"source": {
		title: "源代码",
		disabled: false
	},
	"separator": {
		disabled: false
	},
	"undo": {
		title: "撤销",
		disabled: false
	},
	"redo": {
		title: "重做",
		disabled: false
	},
	"bold": {
		title: "加粗",
		disabled: false
	},
	"italic": {
		title: "斜线",
		disabled: false
	},
	"underline": {
		title: "下划线",
		disabled: false
	},
	"strikethrough": {
		title: "删除线",
		disabled: false
	},
	"superscript": {
		title: "上标",
		disabled: false
	},
	"subscript": {
		title: "下标",
		disabled: false
	},
	"forecolor": {
		title: "字体颜色",
		disabled: false
	},
	"backcolor": {
		title: "背景色",
		disabled: false
	},
	"removeformat": {
		title: "清除格式",
		disabled: false
	},
	"insertunorderedlist": {
		title: "无序列表",
		disabled: false
	},
	"insertorderedlist": {
		title: "有序列表",
		disabled: false
	},
	"selectall": {
		title: "全选",
		disabled: false
	},
	"cleardoc": {
		title: "清空文档",
		disabled: false
	},
	"paragraph": {
		title: "段落格式",
		disabled: false
	},
	"fontfamily": {
		title: "字体",
		disabled: false
	},
	"fontsize": {
		title: "字号",
		disabled: false
	},
	"justifyleft": {
		title: "居左对齐",
		disabled: false
	},
	"justifycenter": {
		title: "居中对齐",
		disabled: false
	},
	"justifyright": {
		title: "居右对齐",
		disabled: false
	},
	"link": {
		title: "超链接",
		disabled: false
	},
	"unlink": {
		title: "取消链接",
		disabled: false
	},
	"emotion": {
		title: "表情",
		disabled: false
	},
	"image": {
		title: "图片",
		disabled: false
	},
	"video": {
		title: "视频",
		disabled: false
	},
	"map": {
		title: "百度地图",
		disabled: false
	},
	"horizontal": {
		title: "分隔线",
		disabled: false
	},
	"print": {
		title: "打印",
		disabled: false
	},
	"preview": {
		title: "预览",
		disabled: false
	},
	"drafts": {
		title: "草稿箱",
		disabled: false
	},
	"formula": {
		title: "数学公式",
		disabled: false
	},
	"inserttable": {
		title: "插入表格",
		disabled: false
	},
	"touppercase": {
		title: "转换大写",
		disabled: false
	},
	"tolowercase": {
		title: "转换小写",
		disabled: false
	},
	"indent": {
		title: "增加缩进",
		disabled: false
	},
	"outdent": {
		title: "减少缩进",
		disabled: false
	},
	"spechars": {
		title: "特殊符号",
		disabled: false
	},
	"fontborder": {
		title: "字体边框",
		disabled: false
	},
	"date": {
		title: "插入日期",
		disabled: false
	},
	"time": {
		title: "插入时间",
		disabled: false
	},
	"emphasis": {
		title: "着重号",
		disabled: false
	}
};
var ColorTypes = {
	themeColors: [["#fff", "#000", "#eeece1", "#1f497d", "#4f81bd", "#c0504d", "#9bbb59", "#8064a2", "#4bacc6", "#f79646"], ["#f2f2f2", "7f7f7f", "#ddd9c3", "#c6d9f0", "#dbe5f1", "#f2dcdb", "#ebf1dd", "#e5e0ec", "#dbeef3", "#fdeada"], ["#d8d8d8", "#595959", "#c4bd97", "#8db3e2", "#b8cce4", "#e5b9b7", "#d7e3bc", "#ccc1d9", "#b7dde8", "#fbd5b5"], ["#bfbfbf", "#3f3f3f", "#938953", "#548dd4", "#95b3d7", "#d99694", "#c3d69b", "#b2a2c7", "#92cddc", "#fac08f"], ["#a5a5a5", "#262626", "#494429", "#17365d", "#366092", "#953734", "#76923c", "#5f497a", "#31859b", "#e36c09"], ["#7f7f7f", "#0c0c0c", "#1d1b10", "#0f243e", "#244061", "#632423", "#4f6128", "#3f3151", "#205867", "#974806"]],
	standardColors: ["#c00000", "#ff0000", "#ffc000", "#ffff00", "#92d050", "#00b050", "#00b0f0", "#0070c0", "#002060", "#7030a0"]
};
var FormulaTypes = {
	commonFormulas: [{ backgroundPosition: "-0px -0px", latex: "\\frac{ }{ }" }, { backgroundPosition: "-30px -0px", latex: "^{ }/_{ }" }, { backgroundPosition: "-60px -0px", latex: "x^{ }" }, { backgroundPosition: "-90px -0px", latex: "x_{ }" }, { backgroundPosition: "-120px -0px", latex: "x^{ }_{ }" }, { backgroundPosition: "-150px -0px", latex: "\\bar{ }" }, { backgroundPosition: "-180px -0px", latex: "\\sqrt{ }" }, { backgroundPosition: "-210px -0px", latex: "\\nthroot{ }{ }" }, { backgroundPosition: "-0px -30px", latex: "\\sum^{ }_{n=}" }, { backgroundPosition: "-60px -30px", latex: "\\log_{ }" }, { backgroundPosition: "-90px -30px", latex: "\\ln" }, { backgroundPosition: "-120px -30px", latex: "\\int_{ }^{ }" }, { backgroundPosition: "-150px -30px", latex: "\\oint_{ }^{ }" }],
	symbolFormulas: [{ backgroundPosition: "-0px -60px", latex: "+" }, { backgroundPosition: "-30px -60px", latex: "-" }, { backgroundPosition: "-60px -60px", latex: "\\pm" }, { backgroundPosition: "-90px -60px", latex: "\\times" }, { backgroundPosition: "-120px -60px", latex: "\\ast" }, { backgroundPosition: "-150px -60px", latex: "\\div" }, { backgroundPosition: "-180px -60px", latex: "/" }, { backgroundPosition: "-210px -60px", latex: "\\bigtriangleup" }, { backgroundPosition: "-0px -90px", latex: "=" }, { backgroundPosition: "-30px -90px", latex: "\\ne" }, { backgroundPosition: "-60px -90px", latex: "\\approx" }, { backgroundPosition: "-90px -90px", latex: ">" }, { backgroundPosition: "-120px -90px", latex: "<" }, { backgroundPosition: "-150px -90px", latex: "\\ge" }, { backgroundPosition: "-180px -90px", latex: "\\le" }, { backgroundPosition: "-210px -90px", latex: "\\infty" }, { backgroundPosition: "-0px -120px", latex: "\\cap" }, { backgroundPosition: "-30px -120px", latex: "\\cup" }, { backgroundPosition: "-60px -120px", latex: "\\because" }, { backgroundPosition: "-90px -120px", latex: "\\therefore" }, { backgroundPosition: "-120px -120px", latex: "\\subset" }, { backgroundPosition: "-150px -120px", latex: "\\supset" }, { backgroundPosition: "-180px -120px", latex: "\\subseteq" }, { backgroundPosition: "-210px -120px", latex: "\\supseteq" }, { backgroundPosition: "-0px -150px", latex: "\\nsubseteq" }, { backgroundPosition: "-30px -150px", latex: "\\nsupseteq" }, { backgroundPosition: "-60px -150px", latex: "\\in" }, { backgroundPosition: "-90px -150px", latex: "\\ni" }, { backgroundPosition: "-120px -150px", latex: "\\notin" }, { backgroundPosition: "-150px -150px", latex: "\\mapsto" }, { backgroundPosition: "-180px -150px", latex: "\\leftarrow" }, { backgroundPosition: "-210px -150px", latex: "\\rightarrow" }, { backgroundPosition: "-0px -180px", latex: "\\Leftarrow" }, { backgroundPosition: "-30px -180px", latex: "\\Rightarrow" }, { backgroundPosition: "-60px -180px", latex: "\\leftrightarrow" }, { backgroundPosition: "-90px -180px", latex: "\\Leftrightarrow" }],
	arabicFormulas: [{ backgroundPosition: "-0px -210px", latex: "\\alpha" }, { backgroundPosition: "-30px -210px", latex: "\\beta" }, { backgroundPosition: "-60px -210px", latex: "\\gamma" }, { backgroundPosition: "-90px -210px", latex: "\\delta" }, { backgroundPosition: "-120px -210px", latex: "\\varepsilon" }, { backgroundPosition: "-150px -210px", latex: "\\varphi" }, { backgroundPosition: "-180px -210px", latex: "\\lambda" }, { backgroundPosition: "-210px -210px", latex: "\\mu" }, { backgroundPosition: "-0px -240px", latex: "\\rho" }, { backgroundPosition: "-30px -240px", latex: "\\sigma" }, { backgroundPosition: "-60px -240px", latex: "\\omega" }, { backgroundPosition: "-90px -240px", latex: "\\Gamma" }, { backgroundPosition: "-120px -240px", latex: "\\Delta" }, { backgroundPosition: "-150px -240px", latex: "\\Theta" }, { backgroundPosition: "-180px -240px", latex: "\\Lambda" }, { backgroundPosition: "-210px -240px", latex: "\\Xi" }, { backgroundPosition: "-0px -270px", latex: "\\Pi" }, { backgroundPosition: "-30px -270px", latex: "\\Sigma" }, { backgroundPosition: "-60px -270px", latex: "\\Upsilon" }, { backgroundPosition: "-90px -270px", latex: "\\Phi" }, { backgroundPosition: "-120px -270px", latex: "\\Psi" }, { backgroundPosition: "-150px -270px", latex: "\\Omega" }]
};
var toArray = function toArray(str) {
	return str.split(",");
};
var SpecialChars = [{ name: "tsfh", title: "特殊字符", chars: toArray("、,。,·,ˉ,ˇ,¨,〃,々,—,～,‖,…,‘,’,“,”,〔,〕,〈,〉,《,》,「,」,『,』,〖,〗,【,】,±,×,÷,∶,∧,∨,∑,∏,∪,∩,∈,∷,√,⊥,∥,∠,⌒,⊙,∫,∮,≡,≌,≈,∽,∝,≠,≮,≯,≤,≥,∞,∵,∴,♂,♀,°,′,″,℃,＄,¤,￠,￡,‰,§,№,☆,★,○,●,◎,◇,◆,□,■,△,▲,※,→,←,↑,↓,〓,〡,〢,〣,〤,〥,〦,〧,〨,〩,㊣,㎎,㎏,㎜,㎝,㎞,㎡,㏄,㏎,㏑,㏒,㏕,︰,￢,￤,℡,ˊ,ˋ,˙,–,―,‥,‵,℅,℉,↖,↗,↘,↙,∕,∟,∣,≒,≦,≧,⊿,═,║,╒,╓,╔,╕,╖,╗,╘,╙,╚,╛,╜,╝,╞,╟,╠,╡,╢,╣,╤,╥,╦,╧,╨,╩,╪,╫,╬,╭,╮,╯,╰,╱,╲,╳,▁,▂,▃,▄,▅,▆,▇,�,█,▉,▊,▋,▌,▍,▎,▏,▓,▔,▕,▼,▽,◢,◣,◤,◥,☉,⊕,〒,〝,〞") }, { name: "lmsz", title: "罗马字符", chars: toArray("ⅰ,ⅱ,ⅲ,ⅳ,ⅴ,ⅵ,ⅶ,ⅷ,ⅸ,ⅹ,Ⅰ,Ⅱ,Ⅲ,Ⅳ,Ⅴ,Ⅵ,Ⅶ,Ⅷ,Ⅸ,Ⅹ,Ⅺ,Ⅻ") }, { name: "szfh", title: "数学字符", chars: toArray("⒈,⒉,⒊,⒋,⒌,⒍,⒎,⒏,⒐,⒑,⒒,⒓,⒔,⒕,⒖,⒗,⒘,⒙,⒚,⒛,⑴,⑵,⑶,⑷,⑸,⑹,⑺,⑻,⑼,⑽,⑾,⑿,⒀,⒁,⒂,⒃,⒄,⒅,⒆,⒇,①,②,③,④,⑤,⑥,⑦,⑧,⑨,⑩,㈠,㈡,㈢,㈣,㈤,㈥,㈦,㈧,㈨,㈩") }, { name: "rwfh", title: "日文字符", chars: toArray("ぁ,あ,ぃ,い,ぅ,う,ぇ,え,ぉ,お,か,が,き,ぎ,く,ぐ,け,げ,こ,ご,さ,ざ,し,じ,す,ず,せ,ぜ,そ,ぞ,た,だ,ち,ぢ,っ,つ,づ,て,で,と,ど,な,に,ぬ,ね,の,は,ば,ぱ,ひ,び,ぴ,ふ,ぶ,ぷ,へ,べ,ぺ,ほ,ぼ,ぽ,ま,み,む,め,も,ゃ,や,ゅ,ゆ,ょ,よ,ら,り,る,れ,ろ,ゎ,わ,ゐ,ゑ,を,ん,ァ,ア,ィ,イ,ゥ,ウ,ェ,エ,ォ,オ,カ,ガ,キ,ギ,ク,グ,ケ,ゲ,コ,ゴ,サ,ザ,シ,ジ,ス,ズ,セ,ゼ,ソ,ゾ,タ,ダ,チ,ヂ,ッ,ツ,ヅ,テ,デ,ト,ド,ナ,ニ,ヌ,ネ,ノ,ハ,バ,パ,ヒ,ビ,ピ,フ,ブ,プ,ヘ,ベ,ペ,ホ,ボ,ポ,マ,ミ,ム,メ,モ,ャ,ヤ,ュ,ユ,ョ,ヨ,ラ,リ,ル,レ,ロ,ヮ,ワ,ヰ,ヱ,ヲ,ン,ヴ,ヵ,ヶ") }, { name: "xlzm", title: "希腊字符", chars: toArray("Α,Β,Γ,Δ,Ε,Ζ,Η,Θ,Ι,Κ,Λ,Μ,Ν,Ξ,Ο,Π,Ρ,Σ,Τ,Υ,Φ,Χ,Ψ,Ω,α,β,γ,δ,ε,ζ,η,θ,ι,κ,λ,μ,ν,ξ,ο,π,ρ,σ,τ,υ,φ,χ,ψ,ω") }, { name: "ewzm", title: "俄文字符", chars: toArray("А,Б,В,Г,Д,Е,Ё,Ж,З,И,Й,К,Л,М,Н,О,П,Р,С,Т,У,Ф,Х,Ц,Ч,Ш,Щ,Ъ,Ы,Ь,Э,Ю,Я,а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я") }, { name: "pyzm", title: "拼音字母", chars: toArray("ā,á,ǎ,à,ē,é,ě,è,ī,í,ǐ,ì,ō,ó,ǒ,ò,ū,ú,ǔ,ù,ǖ,ǘ,ǚ,ǜ,ü") }, { name: "yyyb", title: "英语音标", chars: toArray("i:,i,e,æ,ʌ,ə:,ə,u:,u,ɔ:,ɔ,a:,ei,ai,ɔi,əu,au,iə,εə,uə,p,t,k,b,d,g,f,s,ʃ,θ,h,v,z,ʒ,ð,tʃ,tr,ts,dʒ,dr,dz,m,n,ŋ,l,r,w,j,") }, { name: "zyzf", title: "其它", chars: toArray("ㄅ,ㄆ,ㄇ,ㄈ,ㄉ,ㄊ,ㄋ,ㄌ,ㄍ,ㄎ,ㄏ,ㄐ,ㄑ,ㄒ,ㄓ,ㄔ,ㄕ,ㄖ,ㄗ,ㄘ,ㄙ,ㄚ,ㄛ,ㄜ,ㄝ,ㄞ,ㄟ,ㄠ,ㄡ,ㄢ,ㄣ,ㄤ,ㄥ,ㄦ,ㄧ,ㄨ") }];

var EmotionImages = {
	DemoUrl: "http://img.baidu.com/hi/tsj/t_0001.gif",
	BaseUrl: "http://img.baidu.com/hi/",
	SmileyInfor: {
		tab0: ['Kiss', 'Love', 'Yeah', '啊！', '背扭', '顶', '抖胸', '88', '汗', '瞌睡', '鲁拉', '拍砖', '揉脸', '生日快乐', '大笑', '瀑布汗~', '惊讶', '臭美', '傻笑', '抛媚眼', '发怒', '打酱油', '俯卧撑', '气愤', '?', '吻', '怒', '胜利', 'HI', 'KISS', '不说', '不要', '扯花', '大心', '顶', '大惊', '飞吻', '鬼脸', '害羞', '口水', '狂哭', '来', '发财了', '吃西瓜', '套牢', '害羞', '庆祝', '我来了', '敲打', '晕了', '胜利', '臭美', '被打了', '贪吃', '迎接', '酷', '微笑', '亲吻', '调皮', '惊恐', '耍酷', '发火', '害羞', '汗水', '大哭', '', '加油', '困', '你NB', '晕倒', '开心', '偷笑', '大哭', '滴汗', '叹气', '超赞', '??', '飞吻', '天使', '撒花', '生气', '被砸', '吓傻', '随意吐'],
		tab1: ['Kiss', 'Love', 'Yeah', '啊！', '背扭', '顶', '抖胸', '88', '汗', '瞌睡', '鲁拉', '拍砖', '揉脸', '生日快乐', '摊手', '睡觉', '瘫坐', '无聊', '星星闪', '旋转', '也不行', '郁闷', '正Music', '抓墙', '撞墙至死', '歪头', '戳眼', '飘过', '互相拍砖', '砍死你', '扔桌子', '少林寺', '什么？', '转头', '我爱牛奶', '我踢', '摇晃', '晕厥', '在笼子里', '震荡'],
		tab2: ['大笑', '瀑布汗~', '惊讶', '臭美', '傻笑', '抛媚眼', '发怒', '我错了', 'money', '气愤', '挑逗', '吻', '怒', '胜利', '委屈', '受伤', '说啥呢？', '闭嘴', '不', '逗你玩儿', '飞吻', '眩晕', '魔法', '我来了', '睡了', '我打', '闭嘴', '打', '打晕了', '刷牙', '爆揍', '炸弹', '倒立', '刮胡子', '邪恶的笑', '不要不要', '爱恋中', '放大仔细看', '偷窥', '超高兴', '晕', '松口气', '我跑', '享受', '修养', '哭', '汗', '啊~', '热烈欢迎', '打酱油', '俯卧撑', '?'],
		tab3: ['HI', 'KISS', '不说', '不要', '扯花', '大心', '顶', '大惊', '飞吻', '鬼脸', '害羞', '口水', '狂哭', '来', '泪眼', '流泪', '生气', '吐舌', '喜欢', '旋转', '再见', '抓狂', '汗', '鄙视', '拜', '吐血', '嘘', '打人', '蹦跳', '变脸', '扯肉', '吃To', '吃花', '吹泡泡糖', '大变身', '飞天舞', '回眸', '可怜', '猛抽', '泡泡', '苹果', '亲', '', '骚舞', '烧香', '睡', '套娃娃', '捅捅', '舞倒', '西红柿', '爱慕', '摇', '摇摆', '杂耍', '招财', '被殴', '被球闷', '大惊', '理想', '欧打', '呕吐', '碎', '吐痰'],
		tab4: ['发财了', '吃西瓜', '套牢', '害羞', '庆祝', '我来了', '敲打', '晕了', '胜利', '臭美', '被打了', '贪吃', '迎接', '酷', '顶', '幸运', '爱心', '躲', '送花', '选择'],
		tab5: ['微笑', '亲吻', '调皮', '惊讶', '耍酷', '发火', '害羞', '汗水', '大哭', '得意', '鄙视', '困', '夸奖', '晕倒', '疑问', '媒婆', '狂吐', '青蛙', '发愁', '亲吻', '', '爱心', '心碎', '玫瑰', '礼物', '哭', '奸笑', '可爱', '得意', '呲牙', '暴汗', '楚楚可怜', '困', '哭', '生气', '惊讶', '口水', '彩虹', '夜空', '太阳', '钱钱', '灯泡', '咖啡', '蛋糕', '音乐', '爱', '胜利', '赞', '鄙视', 'OK'],
		tab6: ['男兜', '女兜', '开心', '乖乖', '偷笑', '大笑', '抽泣', '大哭', '无奈', '滴汗', '叹气', '狂晕', '委屈', '超赞', '??', '疑问', '飞吻', '天使', '撒花', '生气', '被砸', '口水', '泪奔', '吓傻', '吐舌头', '点头', '随意吐', '旋转', '困困', '鄙视', '狂顶', '篮球', '再见', '欢迎光临', '恭喜发财', '稍等', '我在线', '恕不议价', '库房有货', '货在路上']
	},
	EmotionTabs: {
		tab0: { name: "精选", prefix: "j_00", path: "jx2/" },
		tab1: { name: "兔斯基", prefix: "t_00", path: "tsj/" },
		tab2: { name: "绿豆蛙", prefix: "w_00", path: "ldw/" },
		tab3: { name: "BOBO", prefix: "B_00", path: "bobo/" },
		tab4: { name: "baby猫", prefix: "C_00", path: "babycat/" },
		tab5: { name: "泡泡", prefix: "i_f", path: "face/" },
		tab6: { name: "有啊", prefix: "y_00", path: "youa/" }
	}
};

module.exports = {
	EditorIconTypes: EditorIconTypes,
	ColorTypes: ColorTypes,
	FormulaTypes: FormulaTypes,
	SpecialChars: SpecialChars,
	EmotionImages: EmotionImages
};


},{}],23:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');
var EditorCore = require('./components/core/EditorCore.react');
var EditorEventEmitter = require('./utils/EditorEventEmitter');

if (!Date.prototype.Format) {
	Date.prototype.Format = function (n) {
		var i = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			S: this.getMilliseconds()
		},
		    t;
		/(y+)/.test(n) && (n = n.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
		for (t in i) new RegExp("(" + t + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? i[t] : ("00" + i[t]).substr(("" + i[t]).length)));
		return n;
	};
}

var Editor = React.createClass({
	displayName: 'Editor',

	getInitialState: function getInitialState() {
		return {
			loaded: false,
			reload: true
		};
	},
	propTypes: {
		"plugins": React.PropTypes.object,
		"fontFamily": React.PropTypes.array,
		"fontSize": React.PropTypes.array,
		"paragraph": React.PropTypes.array
	},
	getDefaultProps: function getDefaultProps() {
		return {
			"plugins": {
				"image": {
					"uploader": {
						type: "default", // qiniu
						name: "file",
						url: "/upload",
						qiniu: {
							app: {
								Bucket: "qtestbucket",
								AK: "iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV",
								SK: "6QTOr2Jg1gcZEWDQXKOGZh5PziC2MCV5KsntT70j"
							},
							key: null,
							upload_token: null,
							domain: "http://o9sa2vijj.bkt.clouddn.com",
							genKey: function genKey(options) {
								return options.file.type + "-" + options.file.size + "-" + options.file.lastModifiedDate.valueOf() + "-" + new Date().valueOf() + "-" + options.file.name;
							}
						}
					}
				}
			},
			"fontFamily": [{ "name": "宋体", value: "宋体, SimSun", defualt: true }, { "name": "隶书", value: "隶书, SimLi" }, { "name": "楷体", value: "楷体, SimKai" }, { "name": "微软雅黑", value: "微软雅黑, Microsoft YaHei" }, { "name": "黑体", value: "黑体, SimHei" }, { "name": "arial", value: "arial, helvetica, sans-serif" }, { "name": "arial black", value: "arial black, avant garde" }, { "name": "omic sans ms", value: "omic sans ms" }, { "name": "impact", value: "impact, chicago" }, { "name": "times new roman", value: "times new roman" }, { "name": "andale mono", value: "andale mono" }],
			"fontSize": [{ "name": "10px", value: "1" }, { "name": "12px", value: "2" }, { "name": "16px", value: "3", defualt: true }, { "name": "18px", value: "4" }, { "name": "24px", value: "5" }, { "name": "32px", value: "6" }, { "name": "38px", value: "7" }],
			"paragraph": [{ "name": "段落", value: "p", defualt: true }, { "name": "标题1", value: "h1" }, { "name": "标题2", value: "h2" }, { "name": "标题3", value: "h3" }, { "name": "标题4", value: "h4" }, { "name": "标题5", value: "h5" }, { "name": "标题6", value: "h6" }],
			"icons": [
			// video map print preview drafts link unlink
			"source | undo redo | bold italic underline strikethrough fontborder emphasis | ", "paragraph fontfamily fontsize | superscript subscript | ", "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ", "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ", "horizontal date time  | image emotion formula spechars | inserttable"]
		};
	},
	componentDidMount: function componentDidMount() {
		this.index = EditorEventEmitter.editorSum;
		EditorEventEmitter.addStartListener("start-" + this.index, this.handleChange);
	},
	componentWillUnmount: function componentWillUnmount() {
		var index = this.index;
		EditorEventEmitter.removeStartListener("start-" + index, this.handleChange);
	},
	componentDidUpdate: function componentDidUpdate() {
		if (this.state.loaded && this.state.reload) {
			this.refs.editor.setContent(this.props.value || this.props.defaultValue);
		}
	},
	handleChange: function handleChange() {
		this.setState({
			loaded: true
		});
	},
	handleMountSuccess: function handleMountSuccess() {
		EditorEventEmitter.mountEditorSuccess();
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		var currentValue = this.props.value || this.props.defaultValue;
		var editorValue = this.getContent();
		var nextValue = nextProps.value || nextProps.defaultValue;

		if (currentValue == editorValue && (nextValue == currentValue || nextValue == editorValue)) {
			this.setState({
				reload: false
			});
		} else {
			this.setState({
				reload: true
			});
		}
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		// reload判断当前是否可以允许刷新
		// loaded状态变化时，务必重新刷新
		return nextState.reload || this.state.loaded != nextState.loaded;
	},
	getContent: function getContent() {
		return this.refs.editor ? this.refs.editor.getContent() : "";
	},
	setContent: function setContent(content) {
		return this.refs.editor ? this.refs.editor.setContent(content) : "";
	},
	focusEditor: function focusEditor() {
		return this.refs.editor ? this.refs.editor.focusEditor() : "";
	},
	findDOMNode: function findDOMNode(refName) {
		return this.refs.editor ? this.refs.editor.findDOMNode(refName) : "";
	},
	render: function render() {
		var loaded = this.state.loaded;
		var _props = this.props;
		var value = _props.value;
		var defaultValue = _props.defaultValue;

		var props = _objectWithoutProperties(_props, ['value', 'defaultValue']);

		if (!this.state.loaded) {
			return React.createElement(
				'div',
				{ id: props.id, className: 'editor-contenteditable-div', style: { "minHeight": "30px", "border": "1px solid #ddd" } },
				'正在加载...'
			);
		} else {
			return React.createElement(EditorCore, _extends({ ref: 'editor' }, props, { onEditorMount: this.handleMountSuccess }));
		}
	}
});

module.exports = Editor;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/core/EditorCore.react":9,"./utils/EditorEventEmitter":25,"react-dom":undefined}],24:[function(require,module,exports){
"use strict";

var EditorDOM = {
	stopPropagation: function stopPropagation(e) {
		e = e || event;
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},
	isTextNode: function isTextNode(node) {
		if (!node) return false;
		return node.nodeType == 3 || node.nodeName == "#text";
	},
	isSpanNode: function isSpanNode(node) {
		if (!node) return false;
		return node.nodeType == 1 && node.nodeName == "SPAN";
	},
	isNullOfTextNode: function isNullOfTextNode(node) {
		if (this.isTextNode(node)) {
			return node.nodeValue == "";
		} else {
			return false;
		}
	},
	getOffsetRootParentPosition: function getOffsetRootParentPosition(target, root) {
		var position = { x: 0, y: 0, w: 0, h: 0 };

		position.w = target.offsetWidth;
		position.h = target.offsetHeight;
		position.x = target.offsetLeft;
		position.y = target.offsetTop;
		var offsetParent = target.offsetParent;
		while (offsetParent && offsetParent != root && offsetParent.offsetParent != root.offsetParent) {
			position.x += offsetParent.offsetLeft;
			position.y += offsetParent.offsetTop;
			offsetParent = offsetParent.offsetParent;
		}
		if (offsetParent == root) {
			position.x = position.x - parseFloat(offsetParent.style.paddingLeft || 0);
			position.y = position.y - parseFloat(offsetParent.style.paddingTop || 0);
		}
		return position;
	},
	createTextNode: function createTextNode(text) {
		return document.createTextNode(text);
	},
	createNodeByTag: function createNodeByTag(tag, html) {
		var node = document.createElement(tag);
		node.innerHTML = html;
		return node;
	},
	createHR: function createHR() {
		var node = document.createElement('hr');
		return node;
	},
	createBR: function createBR() {
		var node = document.createElement('br');
		return node;
	}
};
module.exports = EditorDOM;


},{}],25:[function(require,module,exports){
'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var EditorEventEmitter = assign({}, EventEmitter.prototype, {
	editorSum: 0,
	editorStack: [],
	isStart: false,
	startTime: null,
	addStartListener: function addStartListener(type, callback) {
		if (this.editorStack.length == 0 && this.isStart == false) {
			this.startTime = this.startTime || new Date();
		}
		this.editorSum = this.editorSum + 1;
		this.editorStack.push(type);
		this.on(type, callback);

		this.emitNextListener();
	},
	removeStartListener: function removeStartListener(type, callback) {
		this.removeListener(type, callback);
		var index = this.editorStack.indexOf(type);
		this.editorStack.splice(index, 1);
	},
	mountEditorSuccess: function mountEditorSuccess() {
		this.isStart = false;
		this.emitNextListener();
	},
	emitNextListener: function emitNextListener() {
		if (this.editorStack.length == 0) this.isStart = false;else if (this.isStart == false) {
			this.isStart = true;
			var type = this.editorStack.shift();
			this.emit(type);
			var mountTime = new Date();
			this.startTime = this.startTime || new Date();
			console.log("emitNextListener:" + type + " " + (mountTime.valueOf() - this.startTime.valueOf()) + "ms");
		}
	}
});
EditorEventEmitter.setMaxListeners(1000);
module.exports = EditorEventEmitter;


},{"events":3,"object-assign":2}],26:[function(require,module,exports){
"use strict";

var EditorSelection = require('./EditorSelection');
var EditorHistory = {
	curCommand: null,
	commandStack: [],
	commandIndex: -1,
	canUndo: function canUndo() {
		return this.commandStack.length > 0 && this.commandIndex != -1;
	},
	canRedo: function canRedo() {
		return this.commandStack.length > 0 && this.commandIndex != this.commandStack.length - 1;
	},
	undo: function undo() {
		if (this.canUndo()) {
			this.commandIndex = this.commandIndex - 1;
			this.curCommand = this.commandStack[this.commandIndex];
			document.execCommand("undo");
		}
		return this.canUndo();
	},
	redo: function redo() {
		if (this.canRedo()) {
			this.commandIndex = this.commandIndex + 1;
			this.curCommand = this.commandStack[this.commandIndex];
			document.execCommand("redo");
		}
		return this.canRedo();
	},
	execCommand: function execCommand(command, flag, args) {
		switch (command) {
			case "inserthtml":
				var selection = EditorSelection.getSelection();
				if (selection.pasteHTML) selection.pasteHTML(args);else document.execCommand(command, flag, args);
				break;
			default:
				document.execCommand(command, flag, args);
				break;
		}

		if (command == "selectall") return;
		this.commandIndex = this.commandIndex + 1;
		this.curCommand = { command: command, flag: flag, args: args };
		// 必需移除index后的command
		this.commandStack.splice(this.commandIndex, this.commandStack.length - this.commandIndex);
		this.commandStack[this.commandIndex] = { command: command, flag: flag, args: args };
	},
	getCurCommand: function getCurCommand() {
		return this.curCommand;
	},
	getCommandStack: function getCommandStack() {
		return this.commandStack;
	},
	getCommandIndex: function getCommandIndex() {
		return this.commandIndex;
	},
	clear: function clear() {
		this.curCommand = null;
		this.commandStack = [];
		this.commandIndex = -1;
	}
};
module.exports = EditorHistory;


},{"./EditorSelection":28}],27:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = require('react-dom');
var EditorDOM = require('./EditorDOM');
// resize context
var minWidth = 12;
var minHeight = 12;
var EditorResize = React.createClass({
	displayName: 'EditorResize',

	getInitialState: function getInitialState() {
		return {
			target: null,
			position: {
				x: 0, y: 0
			},
			width: 0,
			height: 0,
			startPosition: {
				x: 0, y: 0
			},
			curPosition: {
				x: 0, y: 0
			}
		};
	},
	setTarget: function setTarget(target) {
		var root = ReactDOM.findDOMNode(this.refs.root);
		var position = EditorDOM.getOffsetRootParentPosition(target, root.parentElement);
		var width = position.w;
		var height = position.h;
		var offsetPosition = { x: position.x, y: position.y };
		this.setState({
			target: target,
			width: width,
			height: height,
			show: true,
			position: offsetPosition
		});
	},
	getTarget: function getTarget() {
		return this.state.target;
	},
	clearTarget: function clearTarget() {
		this.setState({
			target: null,
			show: false
		});
	},
	stopPropagation: function stopPropagation(e) {
		if (e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;
	},
	clearSelect: function clearSelect(e) {
		if (window.getSelection) {
			window.getSelection().removeAllRanges();
		} else {
			document.selection.empty();
		}
	},
	getMousePosition: function getMousePosition(e) {
		e = e || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;

		var x = parseFloat(e.pageX || e.clientX + scrollX);
		var y = parseFloat(e.pageY || e.clientY + scrollY);

		return { x: x, y: y };
	},
	handleMouseDown: function handleMouseDown(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		var className = target.className;
		var startPosition = this.getMousePosition(e);
		this.clearSelect();
		if (className.indexOf("nw-resize") != -1) {
			this.setState({
				direction: "nw-resize",
				startPosition: startPosition
			});
		}
		if (className.indexOf("ne-resize") != -1) {
			this.setState({
				direction: "ne-resize",
				startPosition: startPosition
			});
		}
		if (className.indexOf("sw-resize") != -1) {
			this.setState({
				direction: "sw-resize",
				startPosition: startPosition
			});
		}
		if (className.indexOf("se-resize") != -1) {
			this.setState({
				direction: "se-resize",
				startPosition: startPosition
			});
		}

		window.removeEventListener("mouseup", this.handleMouseUp);
		window.removeEventListener("mousemove", this.handleMouseMove);
		window.addEventListener("mouseup", this.handleMouseUp);
		window.addEventListener("mousemove", this.handleMouseMove);

		this.stopPropagation(e);
	},
	handleMouseMove: function handleMouseMove(e) {
		if (!this.state.direction) return;
		this.clearSelect();
		e = e || event;
		var target = e.target || e.srcElement;
		var curPosition = this.getMousePosition(e);
		var startPosition = this.state.startPosition;
		var dx = curPosition.x - startPosition.x;
		var dy = curPosition.y - startPosition.y;
		var width = this.state.width;
		var height = this.state.height;

		switch (this.state.direction) {
			case "nw-resize":
				width -= dx;
				height -= dy;
				break;
			case "ne-resize":
				width += dx;
				height -= dy;
				break;
			case "sw-resize":
				width -= dx;
				height += dy;
				break;
			case "se-resize":
				width += dx;
				height += dy;
				break;
		}
		startPosition = curPosition;
		if (width < minWidth) width = minWidth;
		if (height < minHeight) height = minHeight;

		if (this.state.target) {
			this.state.target.style.width = width + "px";
			this.state.target.style.height = height + "px";
		}

		this.setState({
			startPosition: startPosition,
			width: width,
			height: height
		});

		this.stopPropagation(e);
	},
	handleMouseUp: function handleMouseUp(e) {
		if (!this.state.direction) return;
		this.clearSelect();
		e = e || event;
		var target = e.target || e.srcElement;
		var curPosition = this.getMousePosition(e);
		var startPosition = this.state.startPosition;
		var dx = curPosition.x - startPosition.x;
		var dy = curPosition.y - startPosition.y;
		var width = this.state.width;
		var height = this.state.height;

		switch (this.state.direction) {
			case "nw-resize":
				width -= dx;
				height -= dy;
				break;
			case "ne-resize":
				width += dx;
				height -= dy;
				break;
			case "sw-resize":
				width -= dx;
				height += dy;
				break;
			case "se-resize":
				width += dx;
				height += dy;
				break;
		}
		startPosition = curPosition;

		if (width < minWidth) width = minWidth;
		if (height < minHeight) height = minHeight;

		window.removeEventListener("mouseup", this.handleMouseUp);
		window.removeEventListener("mousemove", this.handleMouseMove);
		if (this.state.target) {
			this.state.target.style.width = width + "px";
			this.state.target.style.height = height + "px";
		}
		this.setState({
			startPosition: startPosition,
			height: height,
			width: width,
			direction: null
		});

		this.stopPropagation(e);
	},
	render: function render() {
		var style = {
			width: this.state.width,
			height: this.state.height,
			left: this.state.position.x,
			top: this.state.position.y,
			display: this.state.show ? "block" : "none",
			positoin: "absolute"
		};
		return React.createElement(
			'div',
			{ className: 'editor-resize-container', ref: 'root' },
			React.createElement(
				'div',
				{ className: 'editor-resize', style: style },
				React.createElement('div', { className: 'block-resize nw-resize', onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp }),
				React.createElement('div', { className: 'block-resize ne-resize', onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp }),
				React.createElement('div', { className: 'block-resize sw-resize', onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp }),
				React.createElement('div', { className: 'block-resize se-resize', onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp })
			)
		);
	}
});

module.exports = EditorResize;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./EditorDOM":24,"react-dom":undefined}],28:[function(require,module,exports){
"use strict";

var EditorDOM = require('./EditorDOM');

NodeList.prototype.toArray = function () {
	var nodes = [];
	for (var i = 0; i < this.length; i++) {
		nodes.push(this[i]);
	}
	return nodes;
};

var EditorSelection = {
	range: null,
	selection: null,
	storedRange: false,
	getSelection: function getSelection() {
		if (window.getSelection) return window.getSelection();else if (document.getSelection) return document.getSelection();else if (document.selection) return document.selection.createRange();else return null;
	},
	cloneRange: function cloneRange() {
		// cloneRange
		if (this.storedRange) return;
		this.selection = this.getSelection();
		this.selection.removeAllRanges();
		if (this.selection && this.range) {
			this.selection.addRange(this.range.cloneRange());
			this.range = this.range.cloneRange();
		}
	},
	getTextNodes: function getTextNodes() {
		if (!this.range) return [];
		if (this.range.collapsed) return [];
		var parent = this.range.commonAncestorContainer;
		var startNode = this.range.startContainer;
		var startOffset = this.range.startOffset;
		var endNode = this.range.endContainer;
		var endOffset = this.range.endOffset;
		var textNodes = [];

		if (startNode === endNode && EditorDOM.isTextNode(startNode)) {
			textNodes.push({
				childNode: startNode,
				startOffset: startOffset,
				endOffset: endOffset
			});
		} else {
			var childNodes = parent.childNodes.toArray(),
			    startFlag = false;
			var childNode = childNodes.shift();
			while (childNode) {
				if (EditorDOM.isTextNode(childNode)) {
					if (childNode === startNode) {
						textNodes.push({
							childNode: childNode,
							startOffset: startOffset,
							endOffset: childNode.length
						});
						startFlag = true;
					} else if (childNode === endNode) {
						textNodes.push({
							childNode: childNode,
							startOffset: 0,
							endOffset: endOffset
						});
					} else if (textNodes.length > 0) {
						textNodes.push({
							childNode: childNode,
							startOffset: 0,
							endOffset: childNode.length
						});
					}
				}
				if (childNode == endNode) {
					break;
				}
				var newChildNodes = childNode.childNodes.toArray();

				childNodes = newChildNodes.concat(childNodes);
				childNode = childNodes.shift();
			}
		}
		return textNodes;
	},
	getSpanNodes: function getSpanNodes() {
		if (!this.range) return [];
		if (this.range.collapsed) return [];
		var parent = this.range.commonAncestorContainer;
		if (parent.nodeType == 3) parent = parent.parentNode;
		var startNode = this.range.startContainer;
		var endNode = this.range.endContainer;
		var spanNodes = [];

		if (EditorDOM.isSpanNode(parent)) {
			spanNodes.push(parent);
		}
		if (startNode === endNode && EditorDOM.isSpanNode(startNode)) {
			spanNodes.push(startNode);
		} else {
			var childNodes = parent.childNodes.toArray(),
			    i = 0,
			    startFlag = false;
			var childNode = childNodes.shift();
			while (childNode) {
				if (childNode === startNode) {
					startFlag = true;
					if (EditorDOM.isSpanNode(childNode.parentNode)) {
						spanNodes.push(childNode.parentNode);
					}
				}
				if (EditorDOM.isSpanNode(childNode) && startFlag) {
					spanNodes.push(childNode);
				}
				if (childNode == endNode) {
					break;
				}
				var newChildNodes = childNode.childNodes.toArray();

				childNodes = newChildNodes.concat(childNodes);
				childNode = childNodes.shift();
			}
		}

		var resultNodes = [];
		for (var i = 0; i < spanNodes.length; i++) {
			if (resultNodes.indexOf(spanNodes[i]) == -1) {
				resultNodes.push(spanNodes[i]);
			}
		}

		return resultNodes;
	},
	getParagraphs: function getParagraphs() {
		var textNodes = this.getTextNodes();
		var parents = [];
		for (var i = 0; i < textNodes.length; i++) {
			var currentNode = null;
			var tagName = textNodes[i].childNode.parentNode.tagName || textNodes[i].childNode.parentNode.nodeName;
			switch (tagName.toUpperCase()) {
				case "FONT":
					currentNode = textNodes[i].childNode.parentNode;
					break;
				default:
					currentNode = textNodes[i].childNode;
					break;
			}

			if (parents.indexOf(currentNode.parentNode) == -1) parents.push(currentNode.parentNode);
		}
		return parents;
	},
	getCommonAncestor: function getCommonAncestor() {
		if (this.range.collapsed) return null;
		var parent = this.range.commonAncestorContainer;
		return parent;
	},
	addRange: function addRange(startContainer, startOffset, endContainer, endOffset) {
		// addRange
		this.selection = this.getSelection();
		this.selection.removeAllRanges();
		if (this.selection && this.range && startContainer instanceof Node && endContainer instanceof Node) {
			this.range.setStart(startContainer, startOffset);
			this.range.setEnd(endContainer, endOffset);
			this.selection.addRange(this.range.cloneRange());
			this.range = this.range.cloneRange();
		}
	},
	createRange: function createRange() {
		if (this.storedRange) return;
		this.selection = this.getSelection();
		if (this.selection && this.selection.rangeCount > 0) {
			this.range = this.selection.getRangeAt(0).cloneRange();
		} else {
			this.range = null;
		}
	},
	clearRange: function clearRange() {
		if (this.storedRange) return;
		this.selection = this.getSelection();
		this.selection.removeAllRanges();
	},
	getRangeState: function getRangeState() {
		var rangeState = {};
		// init icons state
		var canActiveIcons = "bold italic underline strikethrough fontborder superscript subscript justifycenter justifyleft justifyright";
		var icons = canActiveIcons.split(" ");
		for (var i = 0; i < icons.length; i++) {
			rangeState[icons[i]] = { icon: icons[i], active: false };
		}
		// change  icons state
		if (this.range) {
			// IE 没有parentElement 固修改成parentNode
			var parentElement = this.range.startContainer.parentNode;
			while ((parentElement.tagName || parentElement.nodeName).toUpperCase() != "DIV") {
				var tagName = parentElement.tagName || parentElement.nodeName;
				switch (tagName.toUpperCase()) {
					case "I":
						rangeState["italic"] = { active: true, icon: "italic" };
						break;
					case "B":
						rangeState["bold"] = { active: true, icon: "bold" };
						break;
					case "U":
						rangeState["underline"] = { active: true, icon: "underline" };
						break;
					case "STRIKE":
						rangeState["strikethrough"] = { active: true, icon: "strikethrough" };
						break;
					case "SUP":
						rangeState["superscript"] = { active: true, icon: "superscript" };
						break;
					case "SUB":
						rangeState["subscript"] = { active: true, icon: "subscript" };
						break;
					case "FONT":
						rangeState["forecolor"] = { color: parentElement.color, icon: "forecolor" };
						rangeState["backcolor"] = { color: parentElement.style.backgroundColor, icon: "backcolor" };
						rangeState["fontsize"] = { value: parentElement.size, icon: "fontsize" };
						rangeState["fontfamily"] = { value: parentElement.face, icon: "fontfamily" };
						break;
					case "P":
					case "H1":
					case "H2":
					case "H3":
					case "H5":
					case "H6":
						var textAlign = parentElement.style.textAlign ? parentElement.style.textAlign : "left";
						var fontFamily = parentElement.style.fontFamily ? parentElement.style.fontFamily : "宋体,SimSun";
						var fontSize = parentElement.style.fontSize ? parentElement.style.fontSize : "12px";
						rangeState["justifycenter"] = { active: textAlign == "center", icon: "subscript" };
						rangeState["justifyleft"] = { active: textAlign == "left", icon: "subscript" };
						rangeState["justifyright"] = { active: textAlign == "right", icon: "subscript" };
						rangeState["paragraph"] = { value: parentElement.tagName.toLowerCase(), icon: "paragraph" };
						break;
					case "BLOCKQUOTE":
						rangeState["indent"] = { active: true, icon: "indent" };
						rangeState["outdent"] = { active: false, icon: "outdent" };
						break;
					case "SPAN":
						var className = parentElement.className || "";
						if (className.indexOf("font-border") != -1) {
							rangeState["fontborder"] = { active: true, icon: "fontborder" };
						}
						break;
				}
				parentElement = parentElement.parentNode;
			}
		}

		if (!rangeState["forecolor"]) rangeState["forecolor"] = { color: 'transparent', icon: "forecolor" };
		if (!rangeState["backcolor"]) rangeState["backcolor"] = { color: 'transparent', icon: "backcolor" };
		if (!rangeState["fontsize"] || !rangeState["fontsize"].value) rangeState["fontsize"] = { value: "3", icon: "fontsize" };
		if (!rangeState["paragraph"] || !rangeState["paragraph"].value) rangeState["paragraph"] = { value: "p", icon: "fontsize" };
		if (!rangeState["fontfamily"] || !rangeState["fontfamily"].value) rangeState["fontfamily"] = { value: "宋体, SimSun", icon: "fontfamily" };
		if (!rangeState["indent"]) {
			rangeState["outdent"] = { active: true, icon: "outdent" };
			rangeState["indent"] = { active: false, icon: "indent" };
		}
		return rangeState;
	},
	storeRange: function storeRange() {
		this.storedRange = this.range ? this.range.cloneRange() : null;
	},
	restoreRange: function restoreRange() {
		this.range = this.storedRange ? this.storedRange.cloneRange() : null;
		this.storedRange = null;
		this.cloneRange();
	},
	insertNode: function insertNode(node) {
		if (this.range) {
			EditorSelection.range.insertNode(node);
			var lastNode = node.lastChild || node;
			if (lastNode) {
				// this.range.setEndAfter(lastNode);
				this.range.setStartAfter(lastNode);
				this.range.setEndAfter(lastNode);
			}
			this.selection.removeAllRanges();
			this.selection.addRange(this.range);
		}
	}
};
module.exports = EditorSelection;


},{"./EditorDOM":24}],29:[function(require,module,exports){
"use strict";

var INTERVAL_MS = 1000 / 60;
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = function (callback) {
		setTimeout(callback, INTERVAL_MS);
	};
}

var timeouts = [];
var intervals = [];
var animites = [];
var running = false;
var count = 0;

var EditorTimer = {
	addCount: function addCount() {
		count = count + 1;
	},
	setTimeout: function setTimeout(callback, ms) {
		callback.prototype.ms = ms ? ms : INTERVAL_MS;
		callback.prototype.key = "timeout" + new Date().valueOf() + "-" + Math.round(Math.random() * 1000);
		callback.prototype.startTime = new Date().valueOf();
		callback.prototype.endTime = new Date().valueOf();
		timeouts.push(callback);
		return callback.prototype.key;
	},
	clearTimeout: function clearTimeout(key) {
		var _timeouts = timeouts.filter(function (ele, pos) {
			return ele.prototype.key == key;
		});
		if (_timeouts.length > 0) {
			var index = timeouts.indexOf(_timeouts[0]);
			if (index != -1) timeouts.disabled = true;
			return _timeouts[0];
		} else {
			return null;
		}
	},
	setInterval: function setInterval(callback, ms) {
		callback.prototype.ms = ms ? ms : INTERVAL_MS;
		callback.prototype.key = "interval" + new Date().valueOf() + "-" + Math.round(Math.random() * 1000);
		callback.prototype.startTime = new Date().valueOf();
		callback.prototype.endTime = new Date().valueOf();
		callback.prototype.lastTime = new Date().valueOf();
		intervals.push(callback);
		return callback.prototype.key;
	},
	clearInterval: function clearInterval(key) {
		var _intervals = intervals.filter(function (ele, pos) {
			return ele.prototype.key == key;
		});
		if (_intervals.length > 0) {
			var index = intervals.indexOf(_intervals[0]);
			if (index != -1) intervals.disabled = true;
			return _intervals[0];
		} else {
			return null;
		}
	},
	animate: function animate(callback) {
		window.requestAnimationFrame(EditorTimer.animate);
		if (running) {
			for (var i = 0; i < animites.length; i++) {
				animites[i]({
					count: count
				});
			}
			EditorTimer.addCount(); // count++
		}
		for (var i = 0; i < timeouts.length; i++) {
			timeouts[i].prototype.endTime = new Date().valueOf();
			if (timeouts[i].prototype.endTime - timeouts[i].prototype.startTime >= timeouts[i].prototype.ms && !timeouts[i].prototype.disabled) {
				timeouts[i].prototype.disabled = true;
				timeouts[i].call(timeouts[i].prototype, timeouts[i].prototype.endTime);
			}
		}
		for (var i = 0; i < intervals.length; i++) {
			intervals[i].prototype.endTime = new Date().valueOf();
			if (intervals[i].prototype.endTime - intervals[i].prototype.lastTime >= intervals[i].prototype.ms && !intervals[i].prototype.disabled) {
				intervals[i].prototype.lastTime = intervals[i].prototype.endTime;
				intervals[i].call(intervals[i].prototype, intervals[i].prototype.endTime);
			}
		}
		timeouts = timeouts.filter(function (ele, pos) {
			return !ele.prototype.disabled;
		});
		intervals = intervals.filter(function (ele, pos) {
			return !ele.prototype.disabled;
		});
	},
	startAnimation: function startAnimation() {
		running = true;
	},
	stopAnimation: function stopAnimation() {
		running = false;
	},
	addAnimationHandler: function addAnimationHandler(handler) {
		var _running = running;
		EditorTimer.stopAnimation(handler);
		window.requestAnimationFrame(function () {
			animites.push(handler);
			if (_running) EditorTimer.startAnimation(handler);
		});
	},
	removeAnimationHandler: function removeAnimationHandler(handler) {
		var _running = running;
		EditorTimer.stopAnimation(handler);
		window.requestAnimationFrame(function () {
			var index = animites.indexOf(handler);
			if (index != -1) animites.splice(handler, index);
			if (_running) EditorTimer.startAnimation(handler);
		});
	}
};

EditorTimer.animate();

module.exports = EditorTimer;


},{}],30:[function(require,module,exports){
'use strict';

var QiniuUtils = require('./QiniuUtils');

var getError = function getError(options, xhr) {
    var msg = 'cannot post ' + options.url + ":" + xhr.status;
    var err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = options.url;
    return err;
};
var getBody = function getBody(xhr) {
    var text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
};
var Uploader = {
    post: function post(options) {
        if (typeof XMLHttpRequest === 'undefined') {
            return;
        }

        var xhr = new XMLHttpRequest();
        if (xhr.upload) {
            xhr.upload.onprogress = function (e) {
                if (e.total > 0) {
                    e.percent = e.loaded / e.total * 100;
                }
                options.onLoad(e);
            };
        }
        var formData = new FormData();

        if (options.data) {
            for (var i in options.data) {
                formData.append(i, options.data[i]);
            }
        }
        if (options.type == "qiniu") {
            var key = options.qiniu.key || options.qiniu.genKey(options);
            formData.append("token", options.qiniu.upload_token ? options.qiniu.upload_token : QiniuUtils.Utils.genUploadToken(key, options.qiniu.app));
            if (options.qiniu.key) formData.append("key", options.qiniu.key);
            options.filename = "file";
        }
        formData.append(options.filename, options.file);

        xhr.onerror = function (e) {
            options.onEnd(e);
            options.onError(e);
        };
        xhr.onload = function (e) {
            if (xhr.status !== 200) {
                options.onEnd(e);
                return options.onError(getError(options, xhr), getBody(xhr));
            }
            options.onEnd(e);
            if (options.type == "qiniu") {
                var res = getBody(xhr);
                var body = {
                    status: "success",
                    data: {
                        image_src: options.qiniu.domain + "/" + res.key
                    }
                };
                options.onSuccess(body);
            } else {
                options.onSuccess(getBody(xhr));
            }
        };

        xhr.open('post', options.url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(formData);
    }
};

module.exports = {
    uploadFile: function uploadFile(options) {
        options.url = options.url || "/upload";
        options.filename = options.filename || "file";
        options.beforeUpload = options.beforeUpload || function (e) {
            return true;
        };
        options.onSuccess = options.onSuccess || function (e) {};
        options.onError = options.onError || function (e) {};
        options.onLoad = options.onLoad || function (e) {};
        options.onStart = options.onStart || function (e) {};
        options.onEnd = options.onEnd || function (e) {};

        if (options.beforeUpload(options)) {
            options.onStart(options);
            // 开始上传文件
            Uploader.post(options);
        }
    },
    uploadFiles: function uploadFiles(options) {}
};


},{"./QiniuUtils":31}],31:[function(require,module,exports){
"use strict";

var HmacSHA1 = require('hmacsha1');
// var CryptoJS = require("crypto-js");

var QiniuApp = {
    Bucket: "qtestbucket",
    //qiniu test account
    AK: "iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV",
    SK: "6QTOr2Jg1gcZEWDQXKOGZh5PziC2MCV5KsntT70j"
};

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
var Base = {
    utf16to8: function utf16to8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x0001 && c <= 0x007F) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
                out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
                out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
            } else {
                out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
                out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
            }
        }
        return out;
    },
    utf8to16: function utf8to16(str) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = str.length;
        i = 0;
        while (i < len) {
            c = str.charCodeAt(i++);
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += str.charAt(i - 1);
                    break;
                case 12:
                case 13:
                    // 110x xxxx 10xx xxxx
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
                    break;
                case 14:
                    // 1110 xxxx 10xx xxxx 10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
                    break;
            }
        }
        return out;
    },
    base64encode: function base64encode(str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
            out += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    },
    safe64: function safe64(base64) {
        base64 = base64.replace(/\+/g, "-");
        base64 = base64.replace(/\//g, "_");
        return base64;
    }
};

var QiniuUtils = {
    genPutPolicy: function genPutPolicy(bucket, key, deadline, returnBody) {
        return {
            "scope": key ? bucket : bucket + ":" + key,
            "deadline": deadline ? deadline : new Date().valueOf() + 3600 * 24,
            "returnBody": returnBody ? returnBody : '{"key": $(key), "hash": $(etag), "w": $(imageInfo.width), "h": $(imageInfo.height)}'
        };
    },
    genToken: function genToken(accessKey, secretKey, putPolicy) {
        //SETP 2
        var put_policy = JSON.stringify(putPolicy);
        console.log("put_policy = ", put_policy);
        //SETP 3
        var encoded = Base.base64encode(Base.utf16to8(put_policy));
        console.log("encoded = ", encoded);
        //SETP 4
        var encoded_signed = HmacSHA1(secretKey, encoded);
        //        var hash = CryptoJS.HmacSHA1(encoded, secretKey);
        //        var encoded_signed = hash.toString(CryptoJS.enc.Base64);
        console.log("encoded_signed = ", encoded_signed);
        //SETP 5
        var upload_token = accessKey + ":" + Base.safe64(encoded_signed) + ":" + encoded;
        console.log("upload_token = ", upload_token);
        return upload_token;
    },
    genUploadToken: function genUploadToken(Key, App) {
        var App = App ? App : QiniuApp;
        return QiniuUtils.genToken(App.AK, App.SK, QiniuUtils.genPutPolicy(App.Bucket, Key));
    }
};

module.exports = {
    Utils: QiniuUtils
};


},{"hmacsha1":1}]},{},[23])(23)
});