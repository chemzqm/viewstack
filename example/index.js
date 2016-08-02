var classes = require('classes')
var ontap = require('ontap')
var domify = require('domify')
require('../viewstack.css')
var ViewStack = require('..')

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
    refresh: function () {
      console.log('refresh')
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
