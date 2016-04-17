var classes = require('classes')
var ontap = require('ontap')
require('../viewstack.css')
var ViewStack = require('..')

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
