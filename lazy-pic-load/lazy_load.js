window.Echo = (function(window, document, undefined) {
  'use strict'

  var store = [],
    offset,
    throttle,
    poll

  var _inView = function(el) {
    var rect = el.getBoundingClientRect()

    return ((rect.top >= 0 && rect.left >= 0 && rect.top) < (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset))
  }

  var _isDeal = function(el) {
    return el.getAttribute('src') === el.getAttribute('data-echo')
  }

  var _pollImage = function() {
    for (var i = 0; i < store.length; i++) {
      var self = store[i]

      if (!_isDeal(self) && _inView(self)) {
        self.src = self.getAttribute('data-echo')
        store.splice(i, 1)

        self.className += ' hasLoad'
      }
    }
  }

  var _throttle = function() {
    clearTimeout(poll)

    poll = setTimeout(_pollImage, throttle)
  }

  var init = function(obj) {
    var nodes = document.querySelectorAll('[data-echo]')

    var opts = obj || {}
    offset = opts.offset || 0
    throttle = opts.throttle || 100

    for (var i = 0; i < nodes.length; i++) {
      store.push(nodes[i])
    }

    _throttle()

    if (document.addEventListener) {
      window.addEventListener('scroll', _throttle, false)
    } else {
      window.attachEvent('onscroll', _throttle)
    }
  }

  var concat = function (obj) {
    store.push(obj)

    _throttle()
  }

  return {init: init, render: _throttle, concat: concat}

})(window, document)
