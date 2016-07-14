/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var classes = __webpack_require__(1)
	var ontap = __webpack_require__(3)
	var domify = __webpack_require__(7)
	__webpack_require__(8)
	var ViewStack = __webpack_require__(12)
	
	var header = document.querySelector('header')
	var body = document.querySelector('.viewstack-body')
	
	var st = new ViewStack(header, body)
	st.on('back', function (level) {
	  console.log(level)
	})
	
	var n = 0
	function createDiv() {
	  n ++
	  var div = document.createElement('div')
	  var push = document.createElement('div')
	  //div.innerHTML = 'page ' + n
	  push.className = 'push'
	  push.setAttribute('data-title', 'Another')
	  div.appendChild(push)
	  div.appendChild(domify('<div>page ' + n + '</div>'))
	  div.style.height = '500px'
	  return div
	}
	
	function createComponent() {
	  var div = createDiv()
	  return {
	    el: div,
	    create: function (e) {
	      st.push({
	        back: '列表',
	        text: '编辑',
	        icon: 'icon-submit'
	      }, createDiv())
	    },
	    remove: function () {
	      div.parentNode.removeChild(div)
	    }
	  }
	}
	
	ontap(document.body, function (e) {
	  var target = e.target
	  var back = target.getAttribute('data-back') == 1 ? '返回' : ''
	  var body = back ? createComponent() : createDiv()
	  if (classes(target).has('push')) {
	    st.push({
	      bgColor: '#111',
	      back: back,
	      text: target.getAttribute('data-title') || '列表',
	      icon: back ? 'icon-plus' : null,
	      action: back ? 'create' : null
	    }, body)
	  }
	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	try {
	  var index = __webpack_require__(2);
	} catch (err) {
	  var index = __webpack_require__(2);
	}
	
	/**
	 * Whitespace regexp.
	 */
	
	var re = /\s+/;
	
	/**
	 * toString reference.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Wrap `el` in a `ClassList`.
	 *
	 * @param {Element} el
	 * @return {ClassList}
	 * @api public
	 */
	
	module.exports = function(el){
	  return new ClassList(el);
	};
	
	/**
	 * Initialize a new ClassList for `el`.
	 *
	 * @param {Element} el
	 * @api private
	 */
	
	function ClassList(el) {
	  if (!el || !el.nodeType) {
	    throw new Error('A DOM element reference is required');
	  }
	  this.el = el;
	  this.list = el.classList;
	}
	
	/**
	 * Add class `name` if not already present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.add = function(name){
	  // classList
	  if (this.list) {
	    this.list.add(name);
	    return this;
	  }
	
	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (!~i) arr.push(name);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	/**
	 * Remove class `name` when present, or
	 * pass a regular expression to remove
	 * any which match.
	 *
	 * @param {String|RegExp} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.remove = function(name){
	  if ('[object RegExp]' == toString.call(name)) {
	    return this.removeMatching(name);
	  }
	
	  // classList
	  if (this.list) {
	    this.list.remove(name);
	    return this;
	  }
	
	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (~i) arr.splice(i, 1);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	/**
	 * Remove all classes matching `re`.
	 *
	 * @param {RegExp} re
	 * @return {ClassList}
	 * @api private
	 */
	
	ClassList.prototype.removeMatching = function(re){
	  var arr = this.array();
	  for (var i = 0; i < arr.length; i++) {
	    if (re.test(arr[i])) {
	      this.remove(arr[i]);
	    }
	  }
	  return this;
	};
	
	/**
	 * Toggle class `name`, can force state via `force`.
	 *
	 * For browsers that support classList, but do not support `force` yet,
	 * the mistake will be detected and corrected.
	 *
	 * @param {String} name
	 * @param {Boolean} force
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.toggle = function(name, force){
	  // classList
	  if (this.list) {
	    if ("undefined" !== typeof force) {
	      if (force !== this.list.toggle(name, force)) {
	        this.list.toggle(name); // toggle again to correct
	      }
	    } else {
	      this.list.toggle(name);
	    }
	    return this;
	  }
	
	  // fallback
	  if ("undefined" !== typeof force) {
	    if (!force) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  } else {
	    if (this.has(name)) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return an array of classes.
	 *
	 * @return {Array}
	 * @api public
	 */
	
	ClassList.prototype.array = function(){
	  var className = this.el.getAttribute('class') || '';
	  var str = className.replace(/^\s+|\s+$/g, '');
	  var arr = str.split(re);
	  if ('' === arr[0]) arr.shift();
	  return arr;
	};
	
	/**
	 * Check if class `name` is present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.has =
	ClassList.prototype.contains = function(name){
	  return this.list
	    ? this.list.contains(name)
	    : !! ~index(this.array(), name);
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var hasTouch = __webpack_require__(4)
	var event = __webpack_require__(5)
	var tap = __webpack_require__(6)
	
	function now() {
	  return (new Date()).getTime()
	}
	var ms = now()
	
	module.exports = function (el, handler) {
	  if (hasTouch) {
	    return BindTouch(el, handler)
	  } else {
	    return BindDesktop(el, handler)
	  }
	}
	
	function BindTouch(el, handler) {
	  var clickHandler = function (e) {
	    if (now() - ms > 300) {
	      handler.call(this, e)
	    }
	  }
	  var tapHandler = tap(function (e) {
	    ms = now()
	    handler.call(this, e)
	  })
	  event.bind(el, 'click', clickHandler)
	  event.bind(el, 'touchstart', tapHandler)
	  return {
	    unbind: function () {
	      event.unbind(el, 'click', clickHandler)
	      event.unbind(el, 'touchstart', tapHandler)
	    }
	  }
	}
	
	function BindDesktop(el, handler) {
	  var clickHandler = function (e) {
	    handler.call(this, e)
	  }
	  event.bind(el, 'click', clickHandler)
	  return {
	    unbind: function () {
	      event.unbind(el, 'click', clickHandler)
	    }
	  }
	}
	


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = 'ontouchstart' in global || (global.DocumentTouch && document instanceof DocumentTouch)
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
	    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
	    prefix = bind !== 'addEventListener' ? 'on' : '';
	
	/**
	 * Bind `el` event `type` to `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.bind = function(el, type, fn, capture){
	  el[bind](prefix + type, fn, capture || false);
	  return fn;
	};
	
	/**
	 * Unbind `el` event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.unbind = function(el, type, fn, capture){
	  el[unbind](prefix + type, fn, capture || false);
	  return fn;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	var endEvents = [
	  'touchend'
	]
	
	module.exports = Tap
	
	// default tap timeout in ms
	Tap.timeout = 200
	
	function Tap(callback, options) {
	  options = options || {}
	  // if the user holds his/her finger down for more than 200ms,
	  // then it's not really considered a tap.
	  // however, you can make this configurable.
	  var timeout = options.timeout || Tap.timeout
	
	  // to keep track of the original listener
	  listener.handler = callback
	
	  return listener
	
	  // el.addEventListener('touchstart', listener)
	  function listener(e1) {
	    // tap should only happen with a single finger
	    if (!e1.touches || e1.touches.length > 1) return
	
	    var el = e1.target
	    var context = this
	    var args = arguments;
	
	    var timeout_id = setTimeout(cleanup, timeout)
	
	    el.addEventListener('touchmove', cleanup)
	
	    endEvents.forEach(function (event) {
	      el.addEventListener(event, done)
	    })
	
	    function done(e2) {
	      // since touchstart is added on the same tick
	      // and because of bubbling,
	      // it'll execute this on the same touchstart.
	      // this filters out the same touchstart event.
	      if (e1 === e2) return
	
	      cleanup()
	
	      // already handled
	      if (e2.defaultPrevented) return
	
	      // overwrite these functions so that they all to both start and events.
	      var preventDefault = e1.preventDefault
	      var stopPropagation = e1.stopPropagation
	
	      e1.stopPropagation = function () {
	        stopPropagation.call(e1)
	        stopPropagation.call(e2)
	      }
	
	      e1.preventDefault = function () {
	        preventDefault.call(e1)
	        preventDefault.call(e2)
	      }
	
	      // calls the handler with the `end` event,
	      // but i don't think it matters.
	      callback.apply(context, args)
	    }
	
	    // cleanup end events
	    // to cancel the tap, just run this early
	    function cleanup(e2) {
	      // if it's the same event as the origin,
	      // then don't actually cleanup.
	      // hit issues with this - don't remember
	      if (e1 === e2) return
	
	      clearTimeout(timeout_id)
	
	      el.removeEventListener('touchmove', cleanup)
	
	      endEvents.forEach(function (event) {
	        el.removeEventListener(event, done)
	      })
	    }
	  }
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	
	/**
	 * Expose `parse`.
	 */
	
	module.exports = parse;
	
	/**
	 * Tests for browser support.
	 */
	
	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}
	
	/**
	 * Wrap map from jquery.
	 */
	
	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};
	
	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];
	
	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];
	
	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */
	
	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');
	
	  // default to the global `document` object
	  if (!doc) doc = document;
	
	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);
	
	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace
	
	  var tag = m[1];
	
	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }
	
	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;
	
	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }
	
	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }
	
	  return fragment;
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./viewstack.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./viewstack.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports
	
	
	// module
	exports.push([module.id, ".viewstack-header {\n  height: 41px;\n  position: fixed;\n  line-height: 40px;\n  border-bottom: 1px solid #ebebeb;\n  background-color: #111;\n  text-align: center;\n  font-size: 14px;\n  color: #fff;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  z-index: 99;\n  user-select: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n}\n.viewstack-header .viewstack-left {\n  position: absolute;\n  top: 0;\n  left: 8px;\n  z-index: 999;\n}\n.viewstack-header .viewstack-backicon {\n  display: inline-block;\n  width: 14px;\n  height: 40px;\n  background-repeat: no-repeat;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDkuMTQzIDMwOS4xNDMiPjxwYXRoIGQ9Ik0xMTIuODU1IDE1NC41N0wyNDAuNDggMjYuOTQ3YTcuNSA3LjUgMCAwIDAgMC0xMC42MDZMMjI2LjM0IDIuMTk3YTcuNDk3IDcuNDk3IDAgMCAwLTEwLjYwNyAwTDY4LjY2IDE0OS4yNjdhNy41IDcuNSAwIDAgMCAwIDEwLjYwN2wxNDcuMDcyIDE0Ny4wN2E3LjQ5NyA3LjQ5NyAwIDAgMCAxMC42MDYgMGwxNC4xNDItMTQuMTQyYTcuNSA3LjUgMCAwIDAgMC0xMC42MDZMMTEyLjg1NSAxNTQuNTd6IiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+Cg==);\n  background-position: center;\n}\n.viewstack-header .viewstack-left > *{\n  display: inline-block;\n  vertical-align: middle;\n}\n.viewstack-header .viewstack-backtext{\n  min-width: 40px;\n  text-align: left;\n  height: 40px;\n  white-space: pre;\n}\n.viewstack-header .viewstack-left:focus,\n.viewstack-header .viewstack-left:active {\n  opacity: 0.6;\n}\n.viewstack-header .viewstack-left,\n.viewstack-header .viewstack-action,\n.viewstack-header .viewstack-title,\n.viewstack-header .viewstack-backicon,\n.viewstack-header .viewstack-backtext{\n  transition: all 300ms linear;\n}\n.viewstack-header {\n  transition: transform 300ms linear;\n}\n.viewstack-header.fadeout .viewstack-left{\n  opacity: 0.6;\n}\n.viewstack-body {\n  position: fixed;\n  top: 41px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  transition: transform 300ms linear;\n  background-color: #fff;\n  overflow-y: scroll;\n  -webkit-overflow-scrolling: touch;\n}\n.viewstack-action {\n  opacity: 1;\n  position: absolute;\n  bottom: 0px;\n  width: 40px;\n  right: 0px;\n  top: 0;\n}\n\n", ""]);
	
	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var event = __webpack_require__(5)
	var closest = __webpack_require__(13)
	var domify = __webpack_require__(7)
	var computedStyle = __webpack_require__(16)
	var ontap = __webpack_require__(3)
	var classes = __webpack_require__(1)
	var detect = __webpack_require__(17)
	var transitionEnd = detect.transitionend
	var transform = detect.transform
	var headerTemplate = __webpack_require__(22)
	var Iscroll = __webpack_require__(23)
	var Emitter = __webpack_require__(25)
	
	function ViewStack(head, body, delegate) {
	  if (!(this instanceof ViewStack)) return new ViewStack(head, body, delegate)
	  this.parent = body.parentNode
	  // title body
	  this.stack = []
	  this.current = {
	    bgColor: computedStyle(head, 'background-color'),
	    title: head,
	    body: body
	  }
	  var headContainer = this.headContainer = document.createElement('div')
	  head.parentNode.appendChild(headContainer)
	  this.stack.push(this.current)
	  this.titleEl = domify(headerTemplate)
	  this.titleEl.style.display = 'none'
	  this.delegate = delegate
	  this.ontap = ontap(headContainer, this.ontap.bind(this))
	}
	
	Emitter(ViewStack.prototype)
	
	ViewStack.prototype.unbind = function () {
	  this.ontap.unbind()
	  this.stack = []
	}
	
	ViewStack.prototype.ontap = function (e) {
	  var target = e.target
	  if (/viewstack-(back|left)/.test(target.className)) {
	    this.back()
	    return
	  }
	  var action = closest(target, '.viewstack-action')
	  if (!action || !action.firstElementChild) return
	  var name = action.firstElementChild.getAttribute('on-tap')
	  var component = this.current.component
	  if (this.delegate) {
	    var fn = this.delegate[name]
	    if (typeof fn  === 'function') {
	      fn.call(this.delegate, e)
	    }
	  } else if (component){
	    var handler = component[name]
	    if (typeof handler !== 'function') throw new Error('handler ' + name + ' not found on current component')
	    handler.call(component, e)
	  } else {
	    throw new Error('handler ' + name + ' not found')
	  }
	}
	/**
	 * Push title object {back, bgColor, text, icon}
	 *
	 * @public
	 * @param {Object} title
	 * @param {Element|Component} body
	 * @param {Boolean} useIscroll
	 */
	ViewStack.prototype.push = function (title, body, useIscroll) {
	  if (this.animating) return
	  var component
	  if (body.el && body.el.nodeType == 1 && typeof body.remove === 'function') {
	    component = body
	    body = component.el.parentNode || component.el
	    title.text = title.text || component.title
	  }
	  title.bgColor = title.bgColor || this.current.bgColor
	  // Fadein titleEl
	  var titleEl = this.titleFadeIn(title)
	  var bgColor = title.bgColor
	  titleEl.style.backgroundColor = 'rgba(0,0,0,0)'
	  this.headContainer.appendChild(titleEl)
	  // Fadeout current title and body
	  var restore = this.fadeout(bgColor, titleEl)
	  // Fadein new body
	  var el = document.createElement('div')
	  el.className = 'viewstack-body'
	  el.style[transform] = 'translateX(100%)'
	  el.style.boxShadow = '0 7px 50px rgba(0,0,0,0.3)';
	  el.appendChild(body)
	  this.parent.appendChild(el)
	  transition(el, function () {
	    el.style.boxShadow = 'none'
	  })
	  setTimeout(function () {
	    el.style[transform] = 'translateX(0%)'
	  }, 20)
	
	  var current = this.current = {
	    bgColor: bgColor,
	    title: titleEl,
	    body: el,
	    restore: restore,
	    component: component
	  }
	  if (useIscroll) {
	    current.iscroll = new Iscroll(el, {handlebar: true})
	  }
	  this.stack.push(current)
	}
	
	ViewStack.prototype.titleFadeIn = function (config) {
	  var el = domify(headerTemplate)
	  var back = el.querySelector('.viewstack-backtext')
	  var backicon = el.querySelector('.viewstack-backicon')
	  var title = el.querySelector('.viewstack-title')
	  var action = el.querySelector('.viewstack-action')
	  back.textContent = config.back || '  '
	  if (config.text) {
	    title.appendChild(domify(config.text))
	  }
	  var span = document.createElement('span')
	  span.className = config.icon || 'icon-empty'
	  if (config.action) span.setAttribute('on-tap', config.action)
	  action.appendChild(span)
	  backicon.style.opacity = 0
	  back.style.opacity = 0
	  back.style[transform] = 'translateX(100%)'
	  title.style[transform] = 'translateX(200px)'
	  title.style.opacity = 0
	  action.style.opacity = 0
	  setTimeout(function () {
	    backicon.style.opacity = 1
	    back.style.opacity = 1
	    back.style[transform] = 'translateX(0px)'
	    title.style[transform] = 'translateX(0px)'
	    title.style.opacity = 1
	    action.style.opacity = 1
	  }, 20)
	  return el
	}
	
	ViewStack.prototype.titleFadeRight = function (el) {
	  var back = el.querySelector('.viewstack-backtext')
	  var title = el.querySelector('.viewstack-title')
	  var action = el.querySelector('.viewstack-action')
	  if (back) {
	    back.style.opacity = 0
	    back.style[transform] = 'translateX(100%)'
	  }
	  if (title) {
	    title.style[transform] = 'translateX(200px)'
	    title.style.opacity = 0
	  }
	  if (action) action.style.opacity = 0
	}
	
	/**
	 * Fadeout current title and body, return resotre function
	 *
	 * @public
	 * @param {String} bgColor
	 * @param {Element} newTitle
	 * @returns {Function}
	 */
	ViewStack.prototype.fadeout = function (bgColor, newTitle) {
	  // fade out current
	  var title = this.current.title
	  var body = this.current.body
	  var origColor = this.current.bgColor
	  var self = this
	  title.style.backgroundColor = bgColor
	  transition(title, function () {
	    self.animating = false
	    newTitle.style.backgroundColor = bgColor
	    title.style.display = 'none'
	    body.style.display = 'none'
	    body.style.boxShadow = 'none'
	  }, 10)
	  classes(title).add('fadeout')
	  body.style.boxShadow = 'inset 0px 1px 21px rgba(0,0,0,0.3)'
	  body.style[transform] = 'translateX(-100px)'
	  var selectors = ['.viewstack-backtext', '.viewstack-title', '.viewstack-action']
	  selectors.forEach(function (selector) {
	    var el = title.querySelector(selector)
	    if (!el) return
	    el.style.opacity = 0
	    if (selector === '.viewstack-title'|| selector === '.viewstack-backtext') {
	      el.style[transform] = 'translateX(-100px)'
	    }
	  })
	  this.animating = true
	  return function () {
	    title.style.display = 'block'
	    body.style.display = 'block'
	    setTimeout(function () {
	      title.style.backgroundColor = origColor
	      classes(title).remove('fadeout')
	      body.style[transform] = 'translateX(0px)'
	      selectors.forEach(function (selector) {
	        var el = title.querySelector(selector)
	        if (!el) return
	        el.style.opacity = 1
	        if (selector === '.viewstack-title' || selector === '.viewstack-backtext') {
	          el.style[transform] = 'translateX(0px)'
	        }
	      })
	    }, 20)
	  }
	}
	
	ViewStack.prototype.back = function () {
	  if (this.animating) return
	  this.stack.pop()
	  var l = this.stack.length
	  if (l === 0) return
	  var current = this.current
	  var old = this.stack[l - 1]
	  var title = current.title
	  var body = current.body
	  var self = this
	  // fadeout current title
	  title.style.backgroundColor = 'rgba(0,0,0,0)'
	  this.titleFadeRight(title)
	  transition(body, function () {
	    if (body.parentNode) body.parentNode.removeChild(body)
	    if (title.parentNode) title.parentNode.removeChild(title)
	    self.animating = false
	    self.current = old
	  }, 20)
	  // fadeout current body
	  body.style[transform] = 'translateX(100%)'
	  body.style.boxShadow = '0 7px 21px rgba(0,0,0,0.3)';
	  this.animating = true
	  if (current.component) {
	    current.component.remove()
	  }
	  if (current.iscroll) {
	    current.iscroll.unbind()
	  }
	  //restore old title and body
	  current.restore()
	  this.emit('back', current.body, this.stack.length)
	}
	
	function transition(el, handler, delay) {
	  event.bind(el, transitionEnd, end)
	  delay = delay || 0
	  function end(e) {
	    setTimeout(function () {
	      event.unbind(el, transitionEnd, end)
	      handler.call(el, e)
	    }, delay)
	  }
	}
	
	module.exports = ViewStack


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */
	
	try {
	  var matches = __webpack_require__(14)
	} catch (err) {
	  var matches = __webpack_require__(14)
	}
	
	/**
	 * Export `closest`
	 */
	
	module.exports = closest
	
	/**
	 * Closest
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {Element} scope (optional)
	 */
	
	function closest (el, selector, scope) {
	  scope = scope || document.documentElement;
	
	  // walk up the dom
	  while (el && el !== scope) {
	    if (matches(el, selector)) return el;
	    el = el.parentNode;
	  }
	
	  // check scope for match
	  return matches(el, selector) ? el : null;
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	try {
	  var query = __webpack_require__(15);
	} catch (err) {
	  var query = __webpack_require__(15);
	}
	
	/**
	 * Element prototype.
	 */
	
	var proto = Element.prototype;
	
	/**
	 * Vendor function.
	 */
	
	var vendor = proto.matches
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;
	
	/**
	 * Expose `match()`.
	 */
	
	module.exports = match;
	
	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */
	
	function match(el, selector) {
	  if (!el || el.nodeType !== 1) return false;
	  if (vendor) return vendor.call(el, selector);
	  var nodes = query.all(selector, el.parentNode);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	function one(selector, el) {
	  return el.querySelector(selector);
	}
	
	exports = module.exports = function(selector, el){
	  el = el || document;
	  return one(selector, el);
	};
	
	exports.all = function(selector, el){
	  el = el || document;
	  return el.querySelectorAll(selector);
	};
	
	exports.engine = function(obj){
	  if (!obj.one) throw new Error('.one callback required');
	  if (!obj.all) throw new Error('.all callback required');
	  one = obj.one;
	  exports.all = obj.all;
	  return exports;
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	// DEV: We don't use var but favor parameters since these play nicer with minification
	function computedStyle(el, prop, getComputedStyle, style) {
	  getComputedStyle = window.getComputedStyle;
	  style =
	      // If we have getComputedStyle
	      getComputedStyle ?
	        // Query it
	        // TODO: From CSS-Query notes, we might need (node, null) for FF
	        getComputedStyle(el) :
	
	      // Otherwise, we are in IE and use currentStyle
	        el.currentStyle;
	  if (style) {
	    return style
	    [
	      // Switch to camelCase for CSSOM
	      // DEV: Grabbed from jQuery
	      // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
	      // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
	      prop.replace(/-(\w)/gi, function (word, letter) {
	        return letter.toUpperCase();
	      })
	    ];
	  }
	}
	
	module.exports = computedStyle;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var transform = null
	;(function () {
	  var styles = [
	    'webkitTransform',
	    'MozTransform',
	    'msTransform',
	    'OTransform',
	    'transform'
	  ];
	
	  var el = document.createElement('p');
	
	  for (var i = 0; i < styles.length; i++) {
	    if (null != el.style[styles[i]]) {
	      transform = styles[i];
	      break;
	    }
	  }
	})()
	
	/**
	 * Transition-end mapping
	 */
	var transitionEnd = null
	;(function () {
	  var map = {
	    'WebkitTransition' : 'webkitTransitionEnd',
	    'MozTransition' : 'transitionend',
	    'OTransition' : 'oTransitionEnd',
	    'msTransition' : 'MSTransitionEnd',
	    'transition' : 'transitionend'
	  };
	
	  /**
	  * Expose `transitionend`
	  */
	
	  var el = document.createElement('p');
	
	  for (var transition in map) {
	    if (null != el.style[transition]) {
	      transitionEnd = map[transition];
	      break;
	    }
	  }
	})()
	
	exports.transitionend = transitionEnd
	
	exports.transition = __webpack_require__(18)
	
	exports.transform = transform
	
	exports.touchAction = __webpack_require__(19)
	
	exports.has3d = __webpack_require__(20)


/***/ },
/* 18 */
/***/ function(module, exports) {

	var styles = [
	  'webkitTransition',
	  'MozTransition',
	  'OTransition',
	  'msTransition',
	  'transition'
	]
	
	var el = document.createElement('p')
	var style
	
	for (var i = 0; i < styles.length; i++) {
	  if (null != el.style[styles[i]]) {
	    style = styles[i]
	    break
	  }
	}
	el = null
	
	module.exports = style


/***/ },
/* 19 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 */
	
	module.exports = touchActionProperty();
	
	/**
	 * Returns "touchAction", "msTouchAction", or null.
	 */
	
	function touchActionProperty(doc) {
	  if (!doc) doc = document;
	  var div = doc.createElement('div');
	  var prop = null;
	  if ('touchAction' in div.style) prop = 'touchAction';
	  else if ('msTouchAction' in div.style) prop = 'msTouchAction';
	  div = null;
	  return prop;
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	
	var prop = __webpack_require__(21);
	
	// IE <=8 doesn't have `getComputedStyle`
	if (!prop || !window.getComputedStyle) {
	  module.exports = false;
	
	} else {
	  var map = {
	    webkitTransform: '-webkit-transform',
	    OTransform: '-o-transform',
	    msTransform: '-ms-transform',
	    MozTransform: '-moz-transform',
	    transform: 'transform'
	  };
	
	  // from: https://gist.github.com/lorenzopolidori/3794226
	  var el = document.createElement('div');
	  el.style[prop] = 'translate3d(1px,1px,1px)';
	  document.body.insertBefore(el, null);
	  var val = getComputedStyle(el).getPropertyValue(map[prop]);
	  document.body.removeChild(el);
	  module.exports = null != val && val.length && 'none' != val;
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	
	var styles = [
	  'webkitTransform',
	  'MozTransform',
	  'msTransform',
	  'OTransform',
	  'transform'
	];
	
	var el = document.createElement('p');
	var style;
	
	for (var i = 0; i < styles.length; i++) {
	  style = styles[i];
	  if (null != el.style[style]) {
	    module.exports = style;
	    break;
	  }
	}


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<div class=\"viewstack-header\">\n  <div class=\"viewstack-left\">\n    <span class=\"viewstack-backicon\"></span>\n    <span class=\"viewstack-backtext\"></span>\n  </div>\n  <div class=\"viewstack-title\">\n  </div>\n  <div class=\"viewstack-action\">\n  </div>\n</div>\n";

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _customEvent = __webpack_require__(24);
	
	var _customEvent2 = _interopRequireDefault(_customEvent);
	
	var _propDetect = __webpack_require__(17);
	
	var _emitter = __webpack_require__(25);
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	var _events = __webpack_require__(26);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _tween = __webpack_require__(28);
	
	var _tween2 = _interopRequireDefault(_tween);
	
	var _raf = __webpack_require__(33);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	var _throttleit = __webpack_require__(34);
	
	var _throttleit2 = _interopRequireDefault(_throttleit);
	
	var _debounce = __webpack_require__(35);
	
	var _debounce2 = _interopRequireDefault(_debounce);
	
	var _handlebar = __webpack_require__(37);
	
	var _handlebar2 = _interopRequireDefault(_handlebar);
	
	var _mouseWheelEvent = __webpack_require__(38);
	
	var _mouseWheelEvent2 = _interopRequireDefault(_mouseWheelEvent);
	
	var _hasTouch = __webpack_require__(4);
	
	var _hasTouch2 = _interopRequireDefault(_hasTouch);
	
	var _computedStyle = __webpack_require__(16);
	
	var _computedStyle2 = _interopRequireDefault(_computedStyle);
	
	var _resizelistener = __webpack_require__(39);
	
	var _resizelistener2 = _interopRequireDefault(_resizelistener);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var max = Math.max;
	var min = Math.min;
	var now = Date.now || function () {
	  return new Date().getTime();
	};
	
	var defineProperty = Object.defineProperty;
	
	/**
	 * Init iscroll with el and optional options
	 * options.handlebar show handlebar if is true
	 *
	 * @param  {Element}  el
	 * @param {Object} opts
	 * @api public
	 */
	
	var Iscroll = function () {
	  function Iscroll(el, opts) {
	    _classCallCheck(this, Iscroll);
	
	    this.y = 0;
	    this.scrollable = el;
	    el.style.overflow = 'hidden';
	    opts = opts || {};
	    this.el = el.firstElementChild;
	    this.margin = parseInt((0, _computedStyle2['default'])(this.el, 'margin-bottom'), 10) + parseInt((0, _computedStyle2['default'])(this.el, 'margin-top'), 10);
	    this.touchAction('none');
	    this.refresh(true);
	    this.bind();
	    var self = this;
	    if (defineProperty) {
	      defineProperty(this.scrollable, 'scrollTop', {
	        set: function set(v) {
	          return self.scrollTo(-v, 400);
	        },
	        get: function get() {
	          return -self.y;
	        }
	      });
	    }
	    this.on('scroll', function () {
	      var e = new _customEvent2['default']('scroll');
	      if (e) el.dispatchEvent(e);
	    });
	    this.max = opts.max || 80;
	    if (opts.handlebar !== false) {
	      this.handlebar = new _handlebar2['default'](el, opts.barClass);
	      if (!_hasTouch2['default']) this.resizeHandlebar();
	    }
	    this._refresh = this.refresh.bind(this);
	    this._unbindresize = (0, _resizelistener2['default'])(this.el, this._refresh);
	    this.onScrollEnd = (0, _debounce2['default'])(this.onScrollEnd, 30);
	    this.transformHandlebar = (0, _throttleit2['default'])(this.transformHandlebar, 100);
	  }
	
	  /**
	   * Bind events
	   *
	   * @api private
	   */
	
	
	  Iscroll.prototype.bind = function bind() {
	    this.events = (0, _events2['default'])(this.scrollable, this);
	    this.docEvents = (0, _events2['default'])(document, this);
	
	    // W3C touch events
	    this.events.bind('touchstart');
	    this.events.bind('touchmove');
	    this.events.bind('touchleave', 'ontouchend');
	    this.docEvents.bind('touchend');
	    this.docEvents.bind('touchcancel', 'ontouchend');
	    this._wheelUnbind = (0, _mouseWheelEvent2['default'])(this.scrollable, this.onwheel.bind(this), true);
	  };
	
	  /**
	   * Recalculate the height
	   *
	   * @api public
	   */
	
	
	  Iscroll.prototype.refresh = function refresh(noscroll) {
	    var sh = this.viewHeight = this.scrollable.getBoundingClientRect().height;
	    var ch = this.height = this.el.getBoundingClientRect().height + this.margin;
	    this.minY = min(0, sh - ch);
	    if (noscroll === true) return;
	    if (this.y < this.minY) {
	      this.scrollTo(this.minY, 300);
	    } else if (this.y > 0) {
	      this.scrollTo(0, 300);
	    }
	  };
	
	  /**
	   * Unbind all event listeners, and remove handlebar if necessary
	   *
	   * @api public
	   */
	
	
	  Iscroll.prototype.unbind = function unbind() {
	    this._unbindresize();
	    this.off();
	    this.events.unbind();
	    this.docEvents.unbind();
	    this._wheelUnbind();
	    if (this.handlebar) this.scrollable.removeChild(this.handlebar.el);
	  };
	
	  Iscroll.prototype.onwheel = function onwheel(dx, dy) {
	    if (Math.abs(dx) > Math.abs(dy)) return;
	    if (this.handlebar) this.resizeHandlebar();
	    var y = this.y - dy;
	    if (y > 0) y = 0;
	    if (y < this.minY) y = this.minY;
	    if (y === this.y) return;
	    this.scrollTo(y, 20, 'linear');
	  };
	
	  /**
	   * touchstart event handler
	   *
	   * @param  {Event}  e
	   * @api private
	   */
	
	
	  Iscroll.prototype.ontouchstart = function ontouchstart(e) {
	    var _target = e.target || e.srcElement;
	
	    this.speed = null;
	    if (this.tween) this.tween.stop();
	    this.refresh(true);
	    var start = this.y;
	    if (_target === this.scrollable) {
	      start = min(start, 0);
	      start = max(start, this.minY);
	      // fix the invalid start position
	      if (start !== this.y) return this.scrollTo(start, 200);
	      return;
	    }
	
	    var touch = this.getTouch(e);
	    var sx = touch.clientX;
	    var sy = touch.clientY;
	    var at = now();
	
	    this.onstart = function (x, y) {
	      // no moved up and down, so don't know
	      if (sy === y) return;
	      this.onstart = null;
	      var dx = Math.abs(x - sx);
	      var dy = Math.abs(y - sy);
	      // move left and right
	      if (dx > dy) return;
	      this.clientY = touch.clientY;
	      this.dy = 0;
	      this.ts = now();
	      this.down = {
	        x: sx,
	        y: sy,
	        start: start,
	        at: at
	      };
	      if (this.handlebar) this.resizeHandlebar();
	      this.emit('start', this.y);
	      return true;
	    };
	  };
	
	  /**
	   * touchmove event handler
	   *
	   * @param  {Event}  e
	   * @api private
	   */
	
	
	  Iscroll.prototype.ontouchmove = function ontouchmove(e) {
	    e.preventDefault ? e.preventDefault() : e.returnValue = false;
	    if (!this.down && !this.onstart) return;
	    var touch = this.getTouch(e);
	    var x = touch.clientX;
	    var y = touch.clientY;
	    if (this.onstart) {
	      var started = this.onstart(x, y);
	      if (started !== true) return;
	    }
	    var down = this.down;
	    var dy = this.dy = y - down.y;
	
	    //calculate speed every 100 milisecond
	    this.calcuteSpeed(touch.clientY, down.at);
	    var start = this.down.start;
	    var dest = start + dy;
	    dest = min(dest, this.max);
	    dest = max(dest, this.minY - this.max);
	    this.translate(dest);
	  };
	
	  /**
	   * Calcute speed by clientY
	   *
	   * @param {Number} y
	   * @api priavte
	   */
	
	
	  Iscroll.prototype.calcuteSpeed = function calcuteSpeed(y, start) {
	    var ts = now();
	    var dt = ts - this.ts;
	    if (ts - start < 100) {
	      this.distance = y - this.clientY;
	      this.speed = Math.abs(this.distance / dt);
	    } else if (dt > 100) {
	      this.distance = y - this.clientY;
	      this.speed = Math.abs(this.distance / dt);
	      this.ts = ts;
	      this.clientY = y;
	    }
	  };
	
	  /**
	   * Event handler for touchend
	   *
	   * @param  {Event}  e
	   * @api private
	   */
	
	
	  Iscroll.prototype.ontouchend = function ontouchend(e) {
	    if (!this.down) return;
	    var at = this.down.at;
	    this.down = null;
	    var touch = this.getTouch(e);
	    this.calcuteSpeed(touch.clientY, at);
	    var m = this.momentum();
	    this.scrollTo(m.dest, m.duration, m.ease);
	    this.emit('release', this.y);
	  };
	
	  /**
	   * Calculate the animate props for moveon
	   *
	   * @return {Object}
	   * @api private
	   */
	
	
	  Iscroll.prototype.momentum = function momentum() {
	    var deceleration = 0.001;
	    var speed = this.speed;
	    speed = min(speed, 2);
	    var y = this.y;
	    var rate = (4 - Math.PI) / 2;
	    var destination = y + rate * (speed * speed) / (2 * deceleration) * (this.distance < 0 ? -1 : 1);
	    var duration = speed / deceleration;
	    var ease = void 0;
	    var minY = this.minY;
	    if (y > 0 || y < minY) {
	      duration = 500;
	      ease = 'out-circ';
	      destination = y > 0 ? 0 : minY;
	    } else if (destination > 0) {
	      destination = 0;
	      ease = 'out-back';
	    } else if (destination < minY) {
	      destination = minY;
	      ease = 'out-back';
	    }
	    return {
	      dest: destination,
	      duration: duration,
	      ease: ease
	    };
	  };
	
	  /**
	   * Scroll to potions y with optional duration and ease function
	   *
	   * @param {Number} y
	   * @param {Number} duration
	   * @param {String} easing
	   * @api public
	   */
	
	
	  Iscroll.prototype.scrollTo = function scrollTo(y, duration, easing) {
	    if (this.tween) this.tween.stop();
	    var transition = duration > 0 && y !== this.y;
	    if (!transition) {
	      this.direction = 0;
	      this.translate(y);
	      return this.onScrollEnd();
	    }
	
	    this.direction = y > this.y ? -1 : 1;
	
	    easing = easing || 'out-circ';
	    var tween = this.tween = (0, _tween2['default'])({
	      y: this.y
	    }).ease(easing).to({
	      y: y
	    }).duration(duration);
	
	    var self = this;
	    tween.update(function (o) {
	      self.translate(o.y);
	    });
	    var promise = new Promise(function (resolve) {
	      tween.on('end', function () {
	        resolve();
	        self.animating = false;
	        animate = function animate() {}; // eslint-disable-line
	        if (!tween.stopped) {
	          // no emit scrollend if tween stopped
	          self.onScrollEnd();
	        }
	      });
	    });
	
	    function animate() {
	      (0, _raf2['default'])(animate);
	      tween.update();
	    }
	
	    animate();
	    this.animating = true;
	    return promise;
	  };
	
	  /**
	   * Gets the appropriate "touch" object for the `e` event. The event may be from
	   * a "mouse", "touch", or "Pointer" event, so the normalization happens here.
	   *
	   * @api private
	   */
	
	  Iscroll.prototype.getTouch = function getTouch(e) {
	    // "mouse" and "Pointer" events just use the event object itself
	    var touch = e;
	    if (e.changedTouches && e.changedTouches.length > 0) {
	      // W3C "touch" events use the `changedTouches` array
	      touch = e.changedTouches[0];
	    }
	    return touch;
	  };
	
	  /**
	   * Translate to `x`.
	   *
	   *
	   * @api private
	   */
	
	  Iscroll.prototype.translate = function translate(y) {
	    var s = this.el.style;
	    if (isNaN(y)) return;
	    y = Math.floor(y);
	    //reach the end
	    if (this.y !== y) {
	      this.y = y;
	      this.emit('scroll', -y);
	      if (this.handlebar) this.transformHandlebar();
	    }
	    if (_propDetect.has3d) {
	      s[_propDetect.transform] = 'translate3d(0, ' + y + 'px, 0)';
	    } else {
	      if (_propDetect.transform) {
	        s[_propDetect.transform] = 'translateY(' + y + 'px)';
	      } else {
	        s.top = y + 'px';
	      }
	    }
	  };
	
	  /**
	   * Sets the "touchAction" CSS style property to `value`.
	   *
	   * @api private
	   */
	
	  Iscroll.prototype.touchAction = function touchAction(value) {
	    var s = this.el.style;
	    if (_propDetect.touchAction) {
	      s[_propDetect.touchAction] = value;
	    }
	  };
	
	  /**
	   * show the handlebar and size it
	   * @api public
	   */
	
	
	  Iscroll.prototype.resizeHandlebar = function resizeHandlebar() {
	    var vh = this.viewHeight;
	    var h = vh * vh / this.height;
	    this.handlebar.resize(h);
	  };
	
	  /**
	   * Hide handlebar
	   *
	   * @api private
	   */
	
	
	  Iscroll.prototype.hideHandlebar = function hideHandlebar() {
	    if (this.handlebar) this.handlebar.hide();
	  };
	
	  /**
	  * Scrollend
	  *
	  * @api private
	  */
	
	
	  Iscroll.prototype.onScrollEnd = function onScrollEnd() {
	    if (this.animating) return;
	    if (_hasTouch2['default']) this.hideHandlebar();
	    var y = this.y;
	    this.emit('scrollend', {
	      top: y >= 0,
	      bottom: y <= this.minY
	    });
	  };
	
	  /**
	  * Transform handlebar
	  *
	  * @api private
	  */
	
	
	  Iscroll.prototype.transformHandlebar = function transformHandlebar() {
	    var vh = this.viewHeight;
	    var h = this.height;
	    var y = Math.round(-(vh - vh * vh / h) * this.y / (h - vh));
	    this.handlebar.translateY(y);
	  };
	
	  return Iscroll;
	}();
	
	(0, _emitter2['default'])(Iscroll.prototype);
	
	exports['default'] = Iscroll;
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var NativeCustomEvent = global.CustomEvent;
	
	function useNative () {
	  try {
	    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
	    return  'cat' === p.type && 'bar' === p.detail.foo;
	  } catch (e) {
	  }
	  return false;
	}
	
	/**
	 * Cross-browser `CustomEvent` constructor.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
	 *
	 * @public
	 */
	
	module.exports = useNative() ? NativeCustomEvent :
	
	// IE >= 9
	'function' === typeof document.createEvent ? function CustomEvent (type, params) {
	  var e = document.createEvent('CustomEvent');
	  if (params) {
	    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
	  } else {
	    e.initCustomEvent(type, false, false, void 0);
	  }
	  return e;
	} :
	
	// IE <= 8
	function CustomEvent (type, params) {
	  var e = document.createEventObject();
	  e.type = type;
	  if (params) {
	    e.bubbles = Boolean(params.bubbles);
	    e.cancelable = Boolean(params.cancelable);
	    e.detail = params.detail;
	  } else {
	    e.bubbles = false;
	    e.cancelable = false;
	    e.detail = void 0;
	  }
	  return e;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	if (true) {
	  module.exports = Emitter;
	}
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	try {
	  var events = __webpack_require__(5);
	} catch(err) {
	  var events = __webpack_require__(5);
	}
	
	try {
	  var delegate = __webpack_require__(27);
	} catch(err) {
	  var delegate = __webpack_require__(27);
	}
	
	/**
	 * Expose `Events`.
	 */
	
	module.exports = Events;
	
	/**
	 * Initialize an `Events` with the given
	 * `el` object which events will be bound to,
	 * and the `obj` which will receive method calls.
	 *
	 * @param {Object} el
	 * @param {Object} obj
	 * @api public
	 */
	
	function Events(el, obj) {
	  if (!(this instanceof Events)) return new Events(el, obj);
	  if (!el) throw new Error('element required');
	  if (!obj) throw new Error('object required');
	  this.el = el;
	  this.obj = obj;
	  this._events = {};
	}
	
	/**
	 * Subscription helper.
	 */
	
	Events.prototype.sub = function(event, method, cb){
	  this._events[event] = this._events[event] || {};
	  this._events[event][method] = cb;
	};
	
	/**
	 * Bind to `event` with optional `method` name.
	 * When `method` is undefined it becomes `event`
	 * with the "on" prefix.
	 *
	 * Examples:
	 *
	 *  Direct event handling:
	 *
	 *    events.bind('click') // implies "onclick"
	 *    events.bind('click', 'remove')
	 *    events.bind('click', 'sort', 'asc')
	 *
	 *  Delegated event handling:
	 *
	 *    events.bind('click li > a')
	 *    events.bind('click li > a', 'remove')
	 *    events.bind('click a.sort-ascending', 'sort', 'asc')
	 *    events.bind('click a.sort-descending', 'sort', 'desc')
	 *
	 * @param {String} event
	 * @param {String|function} [method]
	 * @return {Function} callback
	 * @api public
	 */
	
	Events.prototype.bind = function(event, method){
	  var e = parse(event);
	  var el = this.el;
	  var obj = this.obj;
	  var name = e.name;
	  var method = method || 'on' + name;
	  var args = [].slice.call(arguments, 2);
	
	  // callback
	  function cb(){
	    var a = [].slice.call(arguments).concat(args);
	    obj[method].apply(obj, a);
	  }
	
	  // bind
	  if (e.selector) {
	    cb = delegate.bind(el, e.selector, name, cb);
	  } else {
	    events.bind(el, name, cb);
	  }
	
	  // subscription for unbinding
	  this.sub(name, method, cb);
	
	  return cb;
	};
	
	/**
	 * Unbind a single binding, all bindings for `event`,
	 * or all bindings within the manager.
	 *
	 * Examples:
	 *
	 *  Unbind direct handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * Unbind delegate handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * @param {String|Function} [event]
	 * @param {String|Function} [method]
	 * @api public
	 */
	
	Events.prototype.unbind = function(event, method){
	  if (0 == arguments.length) return this.unbindAll();
	  if (1 == arguments.length) return this.unbindAllOf(event);
	
	  // no bindings for this event
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  // no bindings for this method
	  var cb = bindings[method];
	  if (!cb) return;
	
	  events.unbind(this.el, event, cb);
	};
	
	/**
	 * Unbind all events.
	 *
	 * @api private
	 */
	
	Events.prototype.unbindAll = function(){
	  for (var event in this._events) {
	    this.unbindAllOf(event);
	  }
	};
	
	/**
	 * Unbind all events for `event`.
	 *
	 * @param {String} event
	 * @api private
	 */
	
	Events.prototype.unbindAllOf = function(event){
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  for (var method in bindings) {
	    this.unbind(event, method);
	  }
	};
	
	/**
	 * Parse `event`.
	 *
	 * @param {String} event
	 * @return {Object}
	 * @api private
	 */
	
	function parse(event) {
	  var parts = event.split(/ +/);
	  return {
	    name: parts.shift(),
	    selector: parts.join(' ')
	  }
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	try {
	  var closest = __webpack_require__(13);
	} catch(err) {
	  var closest = __webpack_require__(13);
	}
	
	try {
	  var event = __webpack_require__(5);
	} catch(err) {
	  var event = __webpack_require__(5);
	}
	
	/**
	 * Delegate event `type` to `selector`
	 * and invoke `fn(e)`. A callback function
	 * is returned which may be passed to `.unbind()`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.bind = function(el, selector, type, fn, capture){
	  return event.bind(el, type, function(e){
	    var target = e.target || e.srcElement;
	    e.delegateTarget = closest(target, selector, true, el);
	    if (e.delegateTarget) fn.call(el, e);
	  }, capture);
	};
	
	/**
	 * Unbind event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @api public
	 */
	
	exports.unbind = function(el, type, fn, capture){
	  event.unbind(el, type, fn, capture);
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var Emitter = __webpack_require__(29);
	var clone = __webpack_require__(30);
	var type = __webpack_require__(31);
	var ease = __webpack_require__(32);
	
	/**
	 * Expose `Tween`.
	 */
	
	module.exports = Tween;
	
	/**
	 * Initialize a new `Tween` with `obj`.
	 *
	 * @param {Object|Array} obj
	 * @api public
	 */
	
	function Tween(obj) {
	  if (!(this instanceof Tween)) return new Tween(obj);
	  this._from = obj;
	  this.ease('linear');
	  this.duration(500);
	}
	
	/**
	 * Mixin emitter.
	 */
	
	Emitter(Tween.prototype);
	
	/**
	 * Reset the tween.
	 *
	 * @api public
	 */
	
	Tween.prototype.reset = function(){
	  this.isArray = 'array' === type(this._from);
	  this._curr = clone(this._from);
	  this._done = false;
	  this._start = Date.now();
	  return this;
	};
	
	/**
	 * Tween to `obj` and reset internal state.
	 *
	 *    tween.to({ x: 50, y: 100 })
	 *
	 * @param {Object|Array} obj
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.to = function(obj){
	  this.reset();
	  this._to = obj;
	  return this;
	};
	
	/**
	 * Set duration to `ms` [500].
	 *
	 * @param {Number} ms
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.duration = function(ms){
	  this._duration = ms;
	  return this;
	};
	
	/**
	 * Set easing function to `fn`.
	 *
	 *    tween.ease('in-out-sine')
	 *
	 * @param {String|Function} fn
	 * @return {Tween}
	 * @api public
	 */
	
	Tween.prototype.ease = function(fn){
	  fn = 'function' == typeof fn ? fn : ease[fn];
	  if (!fn) throw new TypeError('invalid easing function');
	  this._ease = fn;
	  return this;
	};
	
	/**
	 * Stop the tween and immediately emit "stop" and "end".
	 *
	 * @return {Tween}
	 * @api public
	 */
	
	Tween.prototype.stop = function(){
	  this.stopped = true;
	  this._done = true;
	  this.emit('stop');
	  this.emit('end');
	  return this;
	};
	
	/**
	 * Perform a step.
	 *
	 * @return {Tween} self
	 * @api private
	 */
	
	Tween.prototype.step = function(){
	  if (this._done) return;
	
	  // duration
	  var duration = this._duration;
	  var now = Date.now();
	  var delta = now - this._start;
	  var done = delta >= duration;
	
	  // complete
	  if (done) {
	    this._from = this._to;
	    this._update(this._to);
	    this._done = true;
	    this.emit('end');
	    return this;
	  }
	
	  // tween
	  var from = this._from;
	  var to = this._to;
	  var curr = this._curr;
	  var fn = this._ease;
	  var p = (now - this._start) / duration;
	  var n = fn(p);
	
	  // array
	  if (this.isArray) {
	    for (var i = 0; i < from.length; ++i) {
	      curr[i] = from[i] + (to[i] - from[i]) * n;
	    }
	
	    this._update(curr);
	    return this;
	  }
	
	  // objech
	  for (var k in from) {
	    curr[k] = from[k] + (to[k] - from[k]) * n;
	  }
	
	  this._update(curr);
	  return this;
	};
	
	/**
	 * Set update function to `fn` or
	 * when no argument is given this performs
	 * a "step".
	 *
	 * @param {Function} fn
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.update = function(fn){
	  if (0 == arguments.length) return this.step();
	  this._update = fn;
	  return this;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var type;
	try {
	  type = __webpack_require__(31);
	} catch (_) {
	  type = __webpack_require__(31);
	}
	
	/**
	 * Module exports.
	 */
	
	module.exports = clone;
	
	/**
	 * Clones objects.
	 *
	 * @param {Mixed} any object
	 * @api public
	 */
	
	function clone(obj){
	  switch (type(obj)) {
	    case 'object':
	      var copy = {};
	      for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	          copy[key] = clone(obj[key]);
	        }
	      }
	      return copy;
	
	    case 'array':
	      var copy = new Array(obj.length);
	      for (var i = 0, l = obj.length; i < l; i++) {
	        copy[i] = clone(obj[i]);
	      }
	      return copy;
	
	    case 'regexp':
	      // from millermedeiros/amd-utils - MIT
	      var flags = '';
	      flags += obj.multiline ? 'm' : '';
	      flags += obj.global ? 'g' : '';
	      flags += obj.ignoreCase ? 'i' : '';
	      return new RegExp(obj.source, flags);
	
	    case 'date':
	      return new Date(obj.getTime());
	
	    default: // string, number, boolean, …
	      return obj;
	  }
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * toString ref.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */
	
	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }
	
	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';
	
	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)
	
	  return typeof val;
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	
	// easing functions from "Tween.js"
	
	exports.linear = function(n){
	  return n;
	};
	
	exports.inQuad = function(n){
	  return n * n;
	};
	
	exports.outQuad = function(n){
	  return n * (2 - n);
	};
	
	exports.inOutQuad = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n;
	  return - 0.5 * (--n * (n - 2) - 1);
	};
	
	exports.inCube = function(n){
	  return n * n * n;
	};
	
	exports.outCube = function(n){
	  return --n * n * n + 1;
	};
	
	exports.inOutCube = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n;
	  return 0.5 * ((n -= 2 ) * n * n + 2);
	};
	
	exports.inQuart = function(n){
	  return n * n * n * n;
	};
	
	exports.outQuart = function(n){
	  return 1 - (--n * n * n * n);
	};
	
	exports.inOutQuart = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n;
	  return -0.5 * ((n -= 2) * n * n * n - 2);
	};
	
	exports.inQuint = function(n){
	  return n * n * n * n * n;
	}
	
	exports.outQuint = function(n){
	  return --n * n * n * n * n + 1;
	}
	
	exports.inOutQuint = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n * n;
	  return 0.5 * ((n -= 2) * n * n * n * n + 2);
	};
	
	exports.inSine = function(n){
	  return 1 - Math.cos(n * Math.PI / 2 );
	};
	
	exports.outSine = function(n){
	  return Math.sin(n * Math.PI / 2);
	};
	
	exports.inOutSine = function(n){
	  return .5 * (1 - Math.cos(Math.PI * n));
	};
	
	exports.inExpo = function(n){
	  return 0 == n ? 0 : Math.pow(1024, n - 1);
	};
	
	exports.outExpo = function(n){
	  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
	};
	
	exports.inOutExpo = function(n){
	  if (0 == n) return 0;
	  if (1 == n) return 1;
	  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
	  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
	};
	
	exports.inCirc = function(n){
	  return 1 - Math.sqrt(1 - n * n);
	};
	
	exports.outCirc = function(n){
	  return Math.sqrt(1 - (--n * n));
	};
	
	exports.inOutCirc = function(n){
	  n *= 2
	  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
	  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
	};
	
	exports.inBack = function(n){
	  var s = 1.70158;
	  return n * n * (( s + 1 ) * n - s);
	};
	
	exports.outBack = function(n){
	  var s = 1.70158;
	  return --n * n * ((s + 1) * n + s) + 1;
	};
	
	exports.inOutBack = function(n){
	  var s = 1.70158 * 1.525;
	  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );
	  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );
	};
	
	exports.inBounce = function(n){
	  return 1 - exports.outBounce(1 - n);
	};
	
	exports.outBounce = function(n){
	  if ( n < ( 1 / 2.75 ) ) {
	    return 7.5625 * n * n;
	  } else if ( n < ( 2 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
	  } else if ( n < ( 2.5 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
	  } else {
	    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
	  }
	};
	
	exports.inOutBounce = function(n){
	  if (n < .5) return exports.inBounce(n * 2) * .5;
	  return exports.outBounce(n * 2 - 1) * .5 + .5;
	};
	
	// aliases
	
	exports['in-quad'] = exports.inQuad;
	exports['out-quad'] = exports.outQuad;
	exports['in-out-quad'] = exports.inOutQuad;
	exports['in-cube'] = exports.inCube;
	exports['out-cube'] = exports.outCube;
	exports['in-out-cube'] = exports.inOutCube;
	exports['in-quart'] = exports.inQuart;
	exports['out-quart'] = exports.outQuart;
	exports['in-out-quart'] = exports.inOutQuart;
	exports['in-quint'] = exports.inQuint;
	exports['out-quint'] = exports.outQuint;
	exports['in-out-quint'] = exports.inOutQuint;
	exports['in-sine'] = exports.inSine;
	exports['out-sine'] = exports.outSine;
	exports['in-out-sine'] = exports.inOutSine;
	exports['in-expo'] = exports.inExpo;
	exports['out-expo'] = exports.outExpo;
	exports['in-out-expo'] = exports.inOutExpo;
	exports['in-circ'] = exports.inCirc;
	exports['out-circ'] = exports.outCirc;
	exports['in-out-circ'] = exports.inOutCirc;
	exports['in-back'] = exports.inBack;
	exports['out-back'] = exports.outBack;
	exports['in-out-back'] = exports.inOutBack;
	exports['in-bounce'] = exports.inBounce;
	exports['out-bounce'] = exports.outBounce;
	exports['in-out-bounce'] = exports.inOutBounce;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Expose `requestAnimationFrame()`.
	 */
	
	exports = module.exports = window.requestAnimationFrame
	  || window.webkitRequestAnimationFrame
	  || window.mozRequestAnimationFrame
	  || fallback;
	
	/**
	 * Fallback implementation.
	 */
	
	var prev = new Date().getTime();
	function fallback(fn) {
	  var curr = new Date().getTime();
	  var ms = Math.max(0, 16 - (curr - prev));
	  var req = setTimeout(fn, ms);
	  prev = curr;
	  return req;
	}
	
	/**
	 * Cancel.
	 */
	
	var cancel = window.cancelAnimationFrame
	  || window.webkitCancelAnimationFrame
	  || window.mozCancelAnimationFrame
	  || window.clearTimeout;
	
	exports.cancel = function(id){
	  cancel.call(window, id);
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = throttle;
	
	/**
	 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
	 *
	 * @param {Function} func Function to wrap.
	 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
	 * @return {Function} A new function that wraps the `func` function passed in.
	 */
	
	function throttle (func, wait) {
	  var ctx, args, rtn, timeoutID; // caching
	  var last = 0;
	
	  return function throttled () {
	    ctx = this;
	    args = arguments;
	    var delta = new Date() - last;
	    if (!timeoutID)
	      if (delta >= wait) call();
	      else timeoutID = setTimeout(call, wait - delta);
	    return rtn;
	  };
	
	  function call () {
	    timeoutID = 0;
	    last = +new Date();
	    rtn = func.apply(ctx, args);
	    ctx = null;
	    args = null;
	  }
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var now = __webpack_require__(36);
	
	/**
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 *
	 * @source underscore.js
	 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
	 * @param {Function} function to wrap
	 * @param {Number} timeout in ms (`100`)
	 * @param {Boolean} whether to execute at the beginning (`false`)
	 * @api public
	 */
	
	module.exports = function debounce(func, wait, immediate){
	  var timeout, args, context, timestamp, result;
	  if (null == wait) wait = 100;
	
	  function later() {
	    var last = now() - timestamp;
	
	    if (last < wait && last > 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      if (!immediate) {
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      }
	    }
	  };
	
	  return function debounced() {
	    context = this;
	    args = arguments;
	    timestamp = now();
	    var callNow = immediate && !timeout;
	    if (!timeout) timeout = setTimeout(later, wait);
	    if (callNow) {
	      result = func.apply(context, args);
	      context = args = null;
	    }
	
	    return result;
	  };
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = Date.now || now
	
	function now() {
	    return new Date().getTime()
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _propDetect = __webpack_require__(17);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Handlebar contructor
	 *
	 * @param {Element} scrollable
	 * @contructor
	 * @api public
	 */
	
	var handlebar = function () {
	  function handlebar(scrollable, className) {
	    _classCallCheck(this, handlebar);
	
	    var el = this.el = document.createElement('div');
	    el.className = className || 'iscroll-handlebar';
	    scrollable.appendChild(el);
	  }
	
	  /**
	   * Show the handlebar and resize it
	   *
	   * @param {Number} h
	   * @api public
	   */
	
	
	  handlebar.prototype.resize = function resize(h) {
	    var s = this.el.style;
	    s.height = h + 'px';
	    s.backgroundColor = 'rgba(0,0,0,0.4)';
	  };
	
	  /**
	   * Hide this handlebar
	   *
	   * @api public
	   */
	
	
	  handlebar.prototype.hide = function hide() {
	    this.el.style.backgroundColor = 'transparent';
	  };
	
	  /**
	   * Move handlebar by translateY
	   *
	   * @param {Number} y
	   * @api public
	   */
	
	
	  handlebar.prototype.translateY = function translateY(y) {
	    var s = this.el.style;
	    if (!_propDetect.transform) {
	      s.top = y + 'px';
	    } else {
	      if (_propDetect.has3d) {
	        s[_propDetect.transform] = 'translate3d(0, ' + y + 'px, 0)';
	      } else {
	        s[_propDetect.transform] = 'translateY(' + y + 'px)';
	      }
	    }
	  };
	
	  return handlebar;
	}();
	
	exports['default'] = handlebar;
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	var event = __webpack_require__(5)
	
	// detect available wheel event
	var support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
	        document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
	        'DOMMouseScroll'
	
	module.exports = function( elem, callback, useCapture ) {
	  // handle MozMousePixelScroll in older Firefox
	  if( support == 'DOMMouseScroll' ) {
	    return _addWheelListener( elem, 'MozMousePixelScroll', callback, useCapture )
	  } else {
	    return _addWheelListener( elem, support, callback, useCapture )
	  }
	}
	
	function _addWheelListener( elem, eventName, callback, noscroll ) {
	  var lineHeight = getLineHeight(elem)
	  function cb(e) {
	    if (noscroll) e.preventDefault ?  e.preventDefault() : e.returnValue = false
	    if (support == 'wheel') return callback(e.deltaX, e.deltaY, e.deltaZ, e)
	    !e && ( e = window.event )
	    var dx = e.deltaX || 0
	    var dy = e.deltaY || 0
	    var dz = e.deltaZ || 0
	
	    var mode = e.deltaMode
	    var scale = 1
	    switch(mode) {
	      case 1:
	        scale = lineHeight
	      break
	      case 2:
	        scale = window.innerHeight
	      break
	    }
	    dx *= scale
	    dy *= scale
	    dz *= scale
	
	    // calculate deltaY (and deltaX) according to the event
	    if ( support == 'mousewheel' ) {
	        dy = - 1/40 * e.wheelDelta
	        // Webkit also support wheelDeltaX
	        dx && ( e.deltaX = - 1/40 * e.wheelDeltaX )
	    } else if (dy === 0) {
	        dy = e.detail
	    }
	
	    // it's time to fire the callback
	    return callback(dx, dy, dz, e)
	  }
	  event.bind(elem, eventName, cb, false)
	  return function () {
	    event.unbind(elem, eventName, cb, false)
	  }
	}
	
	function getLineHeight(element){
	  if (element.parentNode == null) return 18
	  var temp = document.createElement(element.nodeName)
	  temp.setAttribute('style', 'margin:0px;padding:0px;font-size:' + element.style.fontSize)
	  temp.innerHTML = 't'
	  temp = element.parentNode.appendChild(temp)
	  var h = temp.clientHeight
	  temp.parentNode.removeChild(temp)
	  return h
	}


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var attachEvent = document.attachEvent
	var once = __webpack_require__(40)
	var raf = __webpack_require__(33)
	
	var cancelFrame = (function(){
	  var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
	          window.clearTimeout
	  return function(id){ return cancel(id); }
	})()
	
	function resizeListener(e){
	  var win = e.target || e.srcElement
	  if (win.__resizeRAF__) cancelFrame(win.__resizeRAF__)
	  win.__resizeRAF__ = raf(function(){
	    var trigger = win.__resizeTrigger__
	    trigger.__resizeListeners__.forEach(function(fn){
	      fn.call(trigger, e)
	    })
	  })
	}
	
	function objectLoad(e){
	  this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
	  this.contentDocument.defaultView.addEventListener('resize', resizeListener)
	}
	
	function removeListener (element, fn) {
	  var trigger = element.__resizeTrigger__
	  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
	  if (!element.__resizeListeners__.length) {
	    if (attachEvent) element.detachEvent('onresize', resizeListener)
	    else if (trigger.contentDocument) {
	      trigger.contentDocument.defaultView.removeEventListener('resize', resizeListener)
	      element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__)
	    }
	  }
	}
	module.exports = function(element, fn){
	  if (!element.__resizeListeners__) {
	    element.__resizeListeners__ = []
	    if (attachEvent) {
	      element.__resizeTrigger__ = element
	      element.attachEvent('onresize', resizeListener)
	    }
	    else {
	      if (getComputedStyle(element).position == 'static') element.style.position = 'relative'
	      var obj = element.__resizeTrigger__ = document.createElement('object');
	      obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;')
	      obj.__resizeElement__ = element
	      obj.onload = objectLoad
	      obj.type = 'text/html'
	      obj.data = 'about:blank'
	      element.appendChild(obj)
	    }
	  }
	  element.__resizeListeners__.push(fn)
	  return once(removeListener.bind(null, element, fn))
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var wrappy = __webpack_require__(41)
	module.exports = wrappy(once)
	
	once.proto = once(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once(this)
	    },
	    configurable: true
	  })
	})
	
	function once (fn) {
	  var f = function () {
	    if (f.called) return f.value
	    f.called = true
	    return f.value = fn.apply(this, arguments)
	  }
	  f.called = false
	  return f
	}


/***/ },
/* 41 */
/***/ function(module, exports) {

	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	module.exports = wrappy
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)
	
	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')
	
	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k]
	  })
	
	  return wrapper
	
	  function wrapper() {
	    var args = new Array(arguments.length)
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i]
	    }
	    var ret = fn.apply(this, args)
	    var cb = args[args.length-1]
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k]
	      })
	    }
	    return ret
	  }
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map