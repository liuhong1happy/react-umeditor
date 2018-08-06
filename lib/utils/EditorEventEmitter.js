'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EditorEventEmitter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditorEventEmitter = exports.EditorEventEmitter = function (_EventEmitter) {
	_inherits(EditorEventEmitter, _EventEmitter);

	function EditorEventEmitter() {
		_classCallCheck(this, EditorEventEmitter);

		var _this = _possibleConstructorReturn(this, (EditorEventEmitter.__proto__ || Object.getPrototypeOf(EditorEventEmitter)).call(this));

		_this.editorStack = [];
		_this.isStart = false;
		_this.startTime = null;
		_this.editorIndex = null;
		return _this;
	}

	_createClass(EditorEventEmitter, [{
		key: 'addStartListener',
		value: function addStartListener(type, callback) {
			if (this.editorStack.length == 0 && this.isStart == false) {
				this.startTime = this.startTime || new Date();
			}
			this.editorIndex = EditorEventEmitter.EditorIndex++;
			this.editorStack.push(type);
			this.on(type, callback);

			this.emitNextListener();
		}
	}, {
		key: 'emitNextListener',
		value: function emitNextListener() {
			if (this.editorStack.length == 0) this.isStart = false;else if (this.isStart == false) {
				this.isStart = true;
				var type = this.editorStack.shift();
				this.emit(type);
				this.startTime = this.startTime || new Date();
			}
		}
	}, {
		key: 'removeStartListener',
		value: function removeStartListener(type, callback) {
			this.removeListener(type, callback);
			var index = this.editorStack.indexOf(type);
			this.editorStack.splice(index, 1);
		}
	}, {
		key: 'mountEditorSuccess',
		value: function mountEditorSuccess() {
			this.isStart = false;
			this.emitNextListener();
		}
	}]);

	return EditorEventEmitter;
}(_events2.default);

EditorEventEmitter.EditorIndex = 0;


var editorEventEmitter = new EditorEventEmitter();
editorEventEmitter.setMaxListeners(10000);

exports.default = editorEventEmitter;