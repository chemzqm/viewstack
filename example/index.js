var classes = require('classes')
var ontap = require('ontap')
var domify = require('domify')
require('../viewstack.css')
var ViewStack = require('..')

var header = document.querySelector('header')
var body = document.querySelector('.viewstack-body')

var st = new ViewStack(header, body, {
  create: function (e) {
    console.log(e)
  }
})
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

ontap(document.body, function (e) {
  var target = e.target
  var back = target.getAttribute('data-back') == 1 ? '返回' : ''
  if (classes(target).has('push')) {
    st.push({
      bgColor: '#111',
      back: back,
      text: target.getAttribute('data-title') || 'title',
      icon: back ? 'icon-plus' : null,
      action: back ? 'create' : null
    }, createDiv())
  }
})
