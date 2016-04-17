# ViewStack

Flexible view switch component build with lightweight components.

[demo](chemzqm.github.io/viewstack/)

**WIP** use with caution.

## Install

     npm i viewstack -S

## Example

``` js
var header = document.querySelector('header')
var body = document.querySelector('.viewstack-body')

var vs = new ViewStack(header, body)
// push a view
vs.push({
  text 'title',
  back: 'back',
  bgColor: '#111',
  icon: 'icon-more',
  action: 'showMore'
}, el)
// transtion back
vs.back()
```

## API

### new ViewStack(head, body ,[delegate])

Init ViewStack with head element, body element, and optional delegate object.

* `head` should be Dom element for current head.
* `body` should be Dom element for current body.
* `delegate` should be object contains handlers for icon tap.

### .push(title, body)

Add a new view with title config and body as content element.

* `title.text` for title text.
* `title.back` [optional] for back text.
* `title.bgColor` [optional] background color of new title.
* `title.icon` [optional] icon className for right icon.
* `title.action` [optional] action key of delegate object to handle icon tap.

### .back()

Return to previous view.

## LICENSE

  Copyright 2016 chemzqm@gmail.com

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the "Software"),
  to deal in the Software without restriction, including without limitation
  the rights to use, copy, modify, merge, publish, distribute, sublicense,
  and/or sell copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included
  in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
  OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
