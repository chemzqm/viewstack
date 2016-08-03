var event = require('event')
var closest = require('closest')
var domify = require('domify')
var computedStyle = require('computed-style')
var ontap = require('ontap')
var classes = require('classes')
var detect = require('prop-detect')
var transitionEnd = detect.transitionend
var transform = detect.transform
var headerTemplate = require('./header.html')
var Iscroll = require('iscroll')
var Emitter = require('emitter')

function ViewStack(head, body, delegate, history) {
  if (!(this instanceof ViewStack)) return new ViewStack(head, body, delegate)
  this.parent = body.parentNode
  this.history = history
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
    if (this.history) {
      history.back()
    } else {
      this.back()
    }
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
ViewStack.prototype.push = function (title, body, useIscroll, immediately, path) {
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
    path: path,
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

ViewStack.prototype.back = function (refresh) {
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
  var last = this.stack[this.stack.length - 1]
  if (refresh && last && last.component) {
    if (typeof last.component.refresh === 'function') {
      last.component.refresh()
    }
  }
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
