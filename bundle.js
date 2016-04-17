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
	__webpack_require__(7)
	var ViewStack = __webpack_require__(11)
	
	var header = document.querySelector('header')
	var body = document.querySelector('.viewstack-body')
	
	var st = new ViewStack(header, body)
	
	function createDiv() {
	  var div = document.createElement('div')
	  var push = document.createElement('div')
	  push.className = 'push'
	  push.setAttribute('data-title', 'Another')
	  div.appendChild(push)
	  div.style.height = '500px'
	  return div
	}
	
	ontap(document.body, function (e) {
	  var target = e.target
	  var back = target.getAttribute('data-back') == 1 ? '返回' : ''
	  if (classes(target).has('push')) {
	    st.push({
	      bgColor: '#111',
	      back: back,
	      text: target.getAttribute('data-title') || 'title',
	      icon: 'icon-plus'
	    }, createDiv())
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
	    e.preventDefault()
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
	    e.preventDefault()
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
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, ".viewstack-header {\n  height: 41px;\n  position: fixed;\n  line-height: 40px;\n  border-bottom: 1px solid #ebebeb;\n  background-color: #111;\n  text-align: center;\n  font-size: 13px;\n  color: #fff;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  z-index: 99;\n}\n.viewstack-header .viewstack-left {\n  position: absolute;\n  top: 0;\n  left: 8px;\n  z-index: 999;\n}\n.viewstack-header .viewstack-backicon {\n  display: inline-block;\n  width: 10px;\n  height: 30px;\n  background-repeat: no-repeat;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDkuMTQzIDMwOS4xNDMiPjxwYXRoIGQ9Ik0xMTIuODU1IDE1NC41N0wyNDAuNDggMjYuOTQ3YTcuNSA3LjUgMCAwIDAgMC0xMC42MDZMMjI2LjM0IDIuMTk3YTcuNDk3IDcuNDk3IDAgMCAwLTEwLjYwNyAwTDY4LjY2IDE0OS4yNjdhNy41IDcuNSAwIDAgMCAwIDEwLjYwN2wxNDcuMDcyIDE0Ny4wN2E3LjQ5NyA3LjQ5NyAwIDAgMCAxMC42MDYgMGwxNC4xNDItMTQuMTQyYTcuNSA3LjUgMCAwIDAgMC0xMC42MDZMMTEyLjg1NSAxNTQuNTd6IiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+Cg==);\n  background-position: center;\n}\n.viewstack-header .viewstack-left > *{\n  display: inline-block;\n  vertical-align: middle;\n}\n.viewstack-header .viewstack-backtext{\n  min-width: 20px;\n  height: 40px;\n  white-space: pre;\n}\n.viewstack-header .viewstack-left:focus,\n.viewstack-header .viewstack-left:active {\n  -webkit-filter: brightness(0.6);\n  filter: brightness(0.6);\n}\n.viewstack-header .viewstack-action,\n.viewstack-header .viewstack-title,\n.viewstack-header .viewstack-backicon,\n.viewstack-header .viewstack-backtext{\n  transition: all 400ms linear;\n}\n.viewstack-header {\n  transition: transform 400ms linear;\n}\n.viewstack-header.fadeout .viewstack-left{\n  -webkit-filter: brightness(0.6);\n  filter: brightness(0.6);\n}\n.viewstack-body {\n  position: fixed;\n  top: 41px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  transition: transform 400ms linear;\n  background-color: #fff;\n}\n.viewstack-body.fadeout {\n  transform: translateX(-100px);\n}\n", ""]);
	
	// exports


/***/ },
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var event = __webpack_require__(5)
	var closest = __webpack_require__(12)
	var domify = __webpack_require__(15)
	var computedStyle = __webpack_require__(16)
	var ontap = __webpack_require__(3)
	var classes = __webpack_require__(1)
	var detect = __webpack_require__(17)
	var transitionEnd = detect.transitionend
	var transform = detect.transform
	var headerTemplate = __webpack_require__(23)
	
	function ViewStack(head, body, delegate) {
	  this.originHead = head
	  this.parent = body.parentNode
	  // title body
	  this.stack = []
	  this.current = {
	    bgColor: computedStyle(head, 'background-color'),
	    title: head,
	    body: body
	  }
	  this.stack.push(this.current)
	  this.titleEl = domify(headerTemplate)
	  this.titleEl.style.display = 'none'
	  this.delegate = delegate
	  this.ontap = ontap(this.originHead.parentNode, this.ontap.bind(this))
	}
	
	ViewStack.prototype.ontap = function (e) {
	  var target = e.target
	  if (/viewstack-back/.test(target.className)) {
	    this.back()
	  }
	  var action = closest(target, '.viewstack-action')
	  if (!action || !action.firstElementChild) return
	  var name = action.firstElementChild.getAttribute('on-tap')
	  var fn = this.delegate[name]
	  if (typeof fn  === 'function') {
	    fn.call(this.delegate, e)
	  }
	}
	/**
	 * Push title object {back, bgColor, text, icon}
	 *
	 * @public
	 * @param {Object} title
	 * @param {Element} body
	 */
	ViewStack.prototype.push = function (title, body) {
	  if (this.animating) return
	  // Fadein titleEl
	  var titleEl = this.titleFadeIn(title)
	  var bgColor = title.bgColor
	  titleEl.style.backgroundColor = 'rgba(0,0,0,0)'
	  this.originHead.parentNode.appendChild(titleEl)
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
	    restore: restore
	  }
	  this.stack.push(current)
	}
	
	ViewStack.prototype.titleFadeIn = function (config) {
	  var el = domify(headerTemplate)
	  var back = el.querySelector('.viewstack-backtext')
	  var title = el.querySelector('.viewstack-title')
	  var action = el.querySelector('.viewstack-action')
	  back.textContent = config.back || '  '
	  title.textContent = config.text
	  var span = document.createElement('span')
	  span.className = config.icon || 'icon-empty'
	  action.appendChild(span)
	  back.style.opacity = 0
	  title.style[transform] = 'translateX(200px)'
	  title.style.opacity = 0
	  action.style.opacity = 0
	  setTimeout(function () {
	    back.style.opacity = 1
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
	  if (back) back.style.opacity = 0
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
	  }, 100)
	  classes(title).add('fadeout')
	  classes(body).add('fadeout')
	  body.style.boxShadow = 'inset 0px 1px 21px rgba(0,0,0,0.3)'
	  var selectors = ['.viewstack-backtext', '.viewstack-title', '.viewstack-action']
	  selectors.forEach(function (selector) {
	    var el = title.querySelector(selector)
	    if (!el) return
	    el.style.opacity = 0
	    if (selector === '.viewstack-title') {
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
	      classes(body).remove('fadeout')
	      selectors.forEach(function (selector) {
	        var el = title.querySelector(selector)
	        if (!el) return
	        el.style.opacity = 1
	        if (selector === '.viewstack-title') {
	          el.style[transform] = 'translateX(0px)'
	        }
	      })
	    })
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
	  }, 100)
	  // fadeout current body
	  body.style[transform] = 'translateX(100%)'
	  body.style.boxShadow = '0 7px 21px rgba(0,0,0,0.3)';
	  this.animating = true
	  //restore old title and body
	  current.restore()
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */
	
	try {
	  var matches = __webpack_require__(13)
	} catch (err) {
	  var matches = __webpack_require__(13)
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	try {
	  var query = __webpack_require__(14);
	} catch (err) {
	  var query = __webpack_require__(14);
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
/* 14 */
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
/* 15 */
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

	exports.transition = __webpack_require__(18)
	
	exports.transform = __webpack_require__(19)
	
	exports.touchAction = __webpack_require__(20)
	
	exports.transitionend = __webpack_require__(21)
	
	exports.has3d = __webpack_require__(22)


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
/* 20 */
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
/* 21 */
/***/ function(module, exports) {

	/**
	 * Transition-end mapping
	 */
	
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
	    module.exports = map[transition];
	    break;
	  }
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	
	var prop = __webpack_require__(19);
	
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
/* 23 */
/***/ function(module, exports) {

	module.exports = "<div class=\"viewstack-header\">\n  <div class=\"viewstack-left\">\n    <span class=\"viewstack-backicon\"></span>\n    <span class=\"viewstack-backtext\"></span>\n  </div>\n  <div class=\"viewstack-title\">\n  </div>\n  <div class=\"viewstack-action\">\n  </div>\n</div>\n";

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map