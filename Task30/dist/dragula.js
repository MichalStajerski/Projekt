(function (f) { if (typeof exports === 'object' && typeof module !== 'undefined') { module.exports = f() } else if (typeof define === 'function' && define.amd) { define([], f) } else { let g; if (typeof window !== 'undefined') { g = window } else if (typeof global !== 'undefined') { g = global } else if (typeof self !== 'undefined') { g = self } else { g = this }g.dragula = f() } })(function () {
  let define, module, exports; return (function () { function r (e, n, t) { function o (i, f) { if (!n[i]) { if (!e[i]) { const c = typeof require === 'function' && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); const a = new Error("Cannot find module '" + i + "'"); throw a.code = 'MODULE_NOT_FOUND', a } const p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { const n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = typeof require === 'function' && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
    1: [function (require, module, exports) {
      'use strict'

      const cache = {}
      const start = '(?:^|\\s)'
      const end = '(?:\\s|$)'

      function lookupClass (className) {
        let cached = cache[className]
        if (cached) {
          cached.lastIndex = 0
        } else {
          cache[className] = cached = new RegExp(start + className + end, 'g')
        }
        return cached
      }

      function addClass (el, className) {
        const current = el.className
        if (!current.length) {
          el.className = className
        } else if (!lookupClass(className).test(current)) {
          el.className += ' ' + className
        }
      }

      function rmClass (el, className) {
        el.className = el.className.replace(lookupClass(className), ' ').trim()
      }

      module.exports = {
        add: addClass,
        rm: rmClass
      }
    }, {}],
    2: [function (require, module, exports) {
      (function (global) {
        'use strict'

        const emitter = require('contra/emitter')
        const crossvent = require('crossvent')
        const classes = require('./classes')
        const doc = document
        const documentElement = doc.documentElement

        function dragula (initialContainers, options) {
          const len = arguments.length
          if (len === 1 && Array.isArray(initialContainers) === false) {
            options = initialContainers
            initialContainers = []
          }
          let _mirror // mirror image
          let _source // source container
          let _item // item being dragged
          let _offsetX // reference x
          let _offsetY // reference y
          let _moveX // reference move x
          let _moveY // reference move y
          let _initialSibling // reference sibling when grabbed
          let _currentSibling // reference sibling now
          let _copy // item used for copying
          let _renderTimer // timer for setTimeout renderMirrorImage
          let _lastDropTarget = null // last container item was over
          let _grabbed // holds mousedown context until first mousemove

          const o = options || {}
          if (o.moves === void 0) { o.moves = always }
          if (o.accepts === void 0) { o.accepts = always }
          if (o.invalid === void 0) { o.invalid = invalidTarget }
          if (o.containers === void 0) { o.containers = initialContainers || [] }
          if (o.isContainer === void 0) { o.isContainer = never }
          if (o.copy === void 0) { o.copy = false }
          if (o.copySortSource === void 0) { o.copySortSource = false }
          if (o.revertOnSpill === void 0) { o.revertOnSpill = false }
          if (o.removeOnSpill === void 0) { o.removeOnSpill = false }
          if (o.direction === void 0) { o.direction = 'vertical' }
          if (o.ignoreInputTextSelection === void 0) { o.ignoreInputTextSelection = true }
          if (o.mirrorContainer === void 0) { o.mirrorContainer = doc.body }

          const drake = emitter({
            containers: o.containers,
            start: manualStart,
            end: end,
            cancel: cancel,
            remove: remove,
            destroy: destroy,
            canMove: canMove,
            dragging: false
          })

          if (o.removeOnSpill === true) {
            drake.on('over', spillOver).on('out', spillOut)
          }

          events()

          return drake

          function isContainer (el) {
            return drake.containers.indexOf(el) !== -1 || o.isContainer(el)
          }

          function events (remove) {
            const op = remove ? 'remove' : 'add'
            touchy(documentElement, op, 'mousedown', grab)
            touchy(documentElement, op, 'mouseup', release)
          }

          function eventualMovements (remove) {
            const op = remove ? 'remove' : 'add'
            touchy(documentElement, op, 'mousemove', startBecauseMouseMoved)
          }

          function movements (remove) {
            const op = remove ? 'remove' : 'add'
            crossvent[op](documentElement, 'selectstart', preventGrabbed) // IE8
            crossvent[op](documentElement, 'click', preventGrabbed)
          }

          function destroy () {
            events(true)
            release({})
          }

          function preventGrabbed (e) {
            if (_grabbed) {
              e.preventDefault()
            }
          }

          function grab (e) {
            _moveX = e.clientX
            _moveY = e.clientY

            const ignore = whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey
            if (ignore) {
              return // we only care about honest-to-god left clicks and touch events
            }
            const item = e.target
            const context = canStart(item)
            if (!context) {
              return
            }
            _grabbed = context
            eventualMovements()
            if (e.type === 'mousedown') {
              if (isInput(item)) { // see also: https://github.com/bevacqua/dragula/issues/208
                item.focus() // fixes https://github.com/bevacqua/dragula/issues/176
              } else {
                e.preventDefault() // fixes https://github.com/bevacqua/dragula/issues/155
              }
            }
          }

          function startBecauseMouseMoved (e) {
            if (!_grabbed) {
              return
            }
            if (whichMouseButton(e) === 0) {
              release({})
              return // when text is selected on an input and then dragged, mouseup doesn't fire. this is our only hope
            }

            // truthy check fixes #239, equality fixes #207, fixes #501
            if ((e.clientX !== void 0 && Math.abs(e.clientX - _moveX) <= (o.slideFactorX || 0)) &&
          (e.clientY !== void 0 && Math.abs(e.clientY - _moveY) <= (o.slideFactorY || 0))) {
              return
            }

            if (o.ignoreInputTextSelection) {
              const clientX = getCoord('clientX', e) || 0
              const clientY = getCoord('clientY', e) || 0
              const elementBehindCursor = doc.elementFromPoint(clientX, clientY)
              if (isInput(elementBehindCursor)) {
                return
              }
            }

            const grabbed = _grabbed // call to end() unsets _grabbed
            eventualMovements(true)
            movements()
            end()
            start(grabbed)

            const offset = getOffset(_item)
            _offsetX = getCoord('pageX', e) - offset.left
            _offsetY = getCoord('pageY', e) - offset.top

            classes.add(_copy || _item, 'gu-transit')
            renderMirrorImage()
            drag(e)
          }

          function canStart (item) {
            if (drake.dragging && _mirror) {
              return
            }
            if (isContainer(item)) {
              return // don't drag container itself
            }
            const handle = item
            while (getParent(item) && isContainer(getParent(item)) === false) {
              if (o.invalid(item, handle)) {
                return
              }
              item = getParent(item) // drag target should be a top element
              if (!item) {
                return
              }
            }
            const source = getParent(item)
            if (!source) {
              return
            }
            if (o.invalid(item, handle)) {
              return
            }

            const movable = o.moves(item, source, handle, nextEl(item))
            if (!movable) {
              return
            }

            return {
              item: item,
              source: source
            }
          }

          function canMove (item) {
            return !!canStart(item)
          }

          function manualStart (item) {
            const context = canStart(item)
            if (context) {
              start(context)
            }
          }

          function start (context) {
            if (isCopy(context.item, context.source)) {
              _copy = context.item.cloneNode(true)
              drake.emit('cloned', _copy, context.item, 'copy')
            }

            _source = context.source
            _item = context.item
            _initialSibling = _currentSibling = nextEl(context.item)

            drake.dragging = true
            drake.emit('drag', _item, _source)
          }

          function invalidTarget () {
            return false
          }

          function end () {
            if (!drake.dragging) {
              return
            }
            const item = _copy || _item
            drop(item, getParent(item))
          }

          function ungrab () {
            _grabbed = false
            eventualMovements(true)
            movements(true)
          }

          function release (e) {
            ungrab()

            if (!drake.dragging) {
              return
            }
            const item = _copy || _item
            const clientX = getCoord('clientX', e) || 0
            const clientY = getCoord('clientY', e) || 0
            const elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY)
            const dropTarget = findDropTarget(elementBehindCursor, clientX, clientY)
            if (dropTarget && ((_copy && o.copySortSource) || (!_copy || dropTarget !== _source))) {
              drop(item, dropTarget)
            } else if (o.removeOnSpill) {
              remove()
            } else {
              cancel()
            }
          }

          function drop (item, target) {
            const parent = getParent(item)
            if (_copy && o.copySortSource && target === _source) {
              parent.removeChild(_item)
            }
            if (isInitialPlacement(target)) {
              drake.emit('cancel', item, _source, _source)
            } else {
              drake.emit('drop', item, target, _source, _currentSibling)
            }
            cleanup()
          }

          function remove () {
            if (!drake.dragging) {
              return
            }
            const item = _copy || _item
            const parent = getParent(item)
            if (parent) {
              parent.removeChild(item)
            }
            drake.emit(_copy ? 'cancel' : 'remove', item, parent, _source)
            cleanup()
          }

          function cancel (revert) {
            if (!drake.dragging) {
              return
            }
            const reverts = arguments.length > 0 ? revert : o.revertOnSpill
            const item = _copy || _item
            const parent = getParent(item)
            const initial = isInitialPlacement(parent)
            if (initial === false && reverts) {
              if (_copy) {
                if (parent) {
                  parent.removeChild(_copy)
                }
              } else {
                _source.insertBefore(item, _initialSibling)
              }
            }
            if (initial || reverts) {
              drake.emit('cancel', item, _source, _source)
            } else {
              drake.emit('drop', item, parent, _source, _currentSibling)
            }
            cleanup()
          }

          function cleanup () {
            const item = _copy || _item
            ungrab()
            removeMirrorImage()
            if (item) {
              classes.rm(item, 'gu-transit')
            }
            if (_renderTimer) {
              clearTimeout(_renderTimer)
            }
            drake.dragging = false
            if (_lastDropTarget) {
              drake.emit('out', item, _lastDropTarget, _source)
            }
            drake.emit('dragend', item)
            _source = _item = _copy = _initialSibling = _currentSibling = _renderTimer = _lastDropTarget = null
          }

          function isInitialPlacement (target, s) {
            let sibling
            if (s !== void 0) {
              sibling = s
            } else if (_mirror) {
              sibling = _currentSibling
            } else {
              sibling = nextEl(_copy || _item)
            }
            return target === _source && sibling === _initialSibling
          }

          function findDropTarget (elementBehindCursor, clientX, clientY) {
            let target = elementBehindCursor
            while (target && !accepted()) {
              target = getParent(target)
            }
            return target

            function accepted () {
              const droppable = isContainer(target)
              if (droppable === false) {
                return false
              }

              const immediate = getImmediateChild(target, elementBehindCursor)
              const reference = getReference(target, immediate, clientX, clientY)
              const initial = isInitialPlacement(target, reference)
              if (initial) {
                return true // should always be able to drop it right back where it was
              }
              return o.accepts(_item, target, _source, reference)
            }
          }

          function drag (e) {
            if (!_mirror) {
              return
            }
            e.preventDefault()

            const clientX = getCoord('clientX', e) || 0
            const clientY = getCoord('clientY', e) || 0
            const x = clientX - _offsetX
            const y = clientY - _offsetY

            _mirror.style.left = x + 'px'
            _mirror.style.top = y + 'px'

            const item = _copy || _item
            const elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY)
            let dropTarget = findDropTarget(elementBehindCursor, clientX, clientY)
            const changed = dropTarget !== null && dropTarget !== _lastDropTarget
            if (changed || dropTarget === null) {
              out()
              _lastDropTarget = dropTarget
              over()
            }
            const parent = getParent(item)
            if (dropTarget === _source && _copy && !o.copySortSource) {
              if (parent) {
                parent.removeChild(item)
              }
              return
            }
            let reference
            const immediate = getImmediateChild(dropTarget, elementBehindCursor)
            if (immediate !== null) {
              reference = getReference(dropTarget, immediate, clientX, clientY)
            } else if (o.revertOnSpill === true && !_copy) {
              reference = _initialSibling
              dropTarget = _source
            } else {
              if (_copy && parent) {
                parent.removeChild(item)
              }
              return
            }
            if (
              (reference === null && changed) ||
          reference !== item &&
          reference !== nextEl(item)
            ) {
              _currentSibling = reference
              dropTarget.insertBefore(item, reference)
              drake.emit('shadow', item, dropTarget, _source)
            }
            function moved (type) { drake.emit(type, item, _lastDropTarget, _source) }
            function over () { if (changed) { moved('over') } }
            function out () { if (_lastDropTarget) { moved('out') } }
          }

          function spillOver (el) {
            classes.rm(el, 'gu-hide')
          }

          function spillOut (el) {
            if (drake.dragging) { classes.add(el, 'gu-hide') }
          }

          function renderMirrorImage () {
            if (_mirror) {
              return
            }
            const rect = _item.getBoundingClientRect()
            _mirror = _item.cloneNode(true)
            _mirror.style.width = getRectWidth(rect) + 'px'
            _mirror.style.height = getRectHeight(rect) + 'px'
            classes.rm(_mirror, 'gu-transit')
            classes.add(_mirror, 'gu-mirror')
            o.mirrorContainer.appendChild(_mirror)
            touchy(documentElement, 'add', 'mousemove', drag)
            classes.add(o.mirrorContainer, 'gu-unselectable')
            drake.emit('cloned', _mirror, _item, 'mirror')
          }

          function removeMirrorImage () {
            if (_mirror) {
              classes.rm(o.mirrorContainer, 'gu-unselectable')
              touchy(documentElement, 'remove', 'mousemove', drag)
              getParent(_mirror).removeChild(_mirror)
              _mirror = null
            }
          }

          function getImmediateChild (dropTarget, target) {
            let immediate = target
            while (immediate !== dropTarget && getParent(immediate) !== dropTarget) {
              immediate = getParent(immediate)
            }
            if (immediate === documentElement) {
              return null
            }
            return immediate
          }

          function getReference (dropTarget, target, x, y) {
            const horizontal = o.direction === 'horizontal'
            const reference = target !== dropTarget ? inside() : outside()
            return reference

            function outside () { // slower, but able to figure out any position
              const len = dropTarget.children.length
              let i
              let el
              let rect
              for (i = 0; i < len; i++) {
                el = dropTarget.children[i]
                rect = el.getBoundingClientRect()
                if (horizontal && (rect.left + rect.width / 2) > x) { return el }
                if (!horizontal && (rect.top + rect.height / 2) > y) { return el }
              }
              return null
            }

            function inside () { // faster, but only available if dropped inside a child element
              const rect = target.getBoundingClientRect()
              if (horizontal) {
                return resolve(x > rect.left + getRectWidth(rect) / 2)
              }
              return resolve(y > rect.top + getRectHeight(rect) / 2)
            }

            function resolve (after) {
              return after ? nextEl(target) : target
            }
          }

          function isCopy (item, container) {
            return typeof o.copy === 'boolean' ? o.copy : o.copy(item, container)
          }
        }

        function touchy (el, op, type, fn) {
          const touch = {
            mouseup: 'touchend',
            mousedown: 'touchstart',
            mousemove: 'touchmove'
          }
          const pointers = {
            mouseup: 'pointerup',
            mousedown: 'pointerdown',
            mousemove: 'pointermove'
          }
          const microsoft = {
            mouseup: 'MSPointerUp',
            mousedown: 'MSPointerDown',
            mousemove: 'MSPointerMove'
          }
          if (global.navigator.pointerEnabled) {
            crossvent[op](el, pointers[type], fn)
          } else if (global.navigator.msPointerEnabled) {
            crossvent[op](el, microsoft[type], fn)
          } else {
            crossvent[op](el, touch[type], fn)
            crossvent[op](el, type, fn)
          }
        }

        function whichMouseButton (e) {
          if (e.touches !== void 0) { return e.touches.length }
          if (e.which !== void 0 && e.which !== 0) { return e.which } // see https://github.com/bevacqua/dragula/issues/261
          if (e.buttons !== void 0) { return e.buttons }
          const button = e.button
          if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
            return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0)
          }
        }

        function getOffset (el) {
          const rect = el.getBoundingClientRect()
          return {
            left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
            top: rect.top + getScroll('scrollTop', 'pageYOffset')
          }
        }

        function getScroll (scrollProp, offsetProp) {
          if (typeof global[offsetProp] !== 'undefined') {
            return global[offsetProp]
          }
          if (documentElement.clientHeight) {
            return documentElement[scrollProp]
          }
          return doc.body[scrollProp]
        }

        function getElementBehindPoint (point, x, y) {
          point = point || {}
          const state = point.className || ''
          let el
          point.className += ' gu-hide'
          el = doc.elementFromPoint(x, y)
          point.className = state
          return el
        }

        function never () { return false }
        function always () { return true }
        function getRectWidth (rect) { return rect.width || (rect.right - rect.left) }
        function getRectHeight (rect) { return rect.height || (rect.bottom - rect.top) }
        function getParent (el) { return el.parentNode === doc ? null : el.parentNode }
        function isInput (el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || isEditable(el) }
        function isEditable (el) {
          if (!el) { return false } // no parents were editable
          if (el.contentEditable === 'false') { return false } // stop the lookup
          if (el.contentEditable === 'true') { return true } // found a contentEditable element in the chain
          return isEditable(getParent(el)) // contentEditable is set to 'inherit'
        }

        function nextEl (el) {
          return el.nextElementSibling || manually()
          function manually () {
            let sibling = el
            do {
              sibling = sibling.nextSibling
            } while (sibling && sibling.nodeType !== 1)
            return sibling
          }
        }

        function getEventHost (e) {
          // on touchend event, we have to use `e.changedTouches`
          // see http://stackoverflow.com/questions/7192563/touchend-event-properties
          // see https://github.com/bevacqua/dragula/issues/34
          if (e.targetTouches && e.targetTouches.length) {
            return e.targetTouches[0]
          }
          if (e.changedTouches && e.changedTouches.length) {
            return e.changedTouches[0]
          }
          return e
        }

        function getCoord (coord, e) {
          const host = getEventHost(e)
          const missMap = {
            pageX: 'clientX', // IE8
            pageY: 'clientY' // IE8
          }
          if (coord in missMap && !(coord in host) && missMap[coord] in host) {
            coord = missMap[coord]
          }
          return host[coord]
        }

        module.exports = dragula
      }).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {})
    }, { './classes': 1, 'contra/emitter': 5, crossvent: 6 }],
    3: [function (require, module, exports) {
      module.exports = function atoa (a, n) { return Array.prototype.slice.call(a, n) }
    }, {}],
    4: [function (require, module, exports) {
      'use strict'

      const ticky = require('ticky')

      module.exports = function debounce (fn, args, ctx) {
        if (!fn) { return }
        ticky(function run () {
          fn.apply(ctx || null, args || [])
        })
      }
    }, { ticky: 10 }],
    5: [function (require, module, exports) {
      'use strict'

      const atoa = require('atoa')
      const debounce = require('./debounce')

      module.exports = function emitter (thing, options) {
        const opts = options || {}
        let evt = {}
        if (thing === undefined) { thing = {} }
        thing.on = function (type, fn) {
          if (!evt[type]) {
            evt[type] = [fn]
          } else {
            evt[type].push(fn)
          }
          return thing
        }
        thing.once = function (type, fn) {
          fn._once = true // thing.off(fn) still works!
          thing.on(type, fn)
          return thing
        }
        thing.off = function (type, fn) {
          const c = arguments.length
          if (c === 1) {
            delete evt[type]
          } else if (c === 0) {
            evt = {}
          } else {
            const et = evt[type]
            if (!et) { return thing }
            et.splice(et.indexOf(fn), 1)
          }
          return thing
        }
        thing.emit = function () {
          const args = atoa(arguments)
          return thing.emitterSnapshot(args.shift()).apply(this, args)
        }
        thing.emitterSnapshot = function (type) {
          const et = (evt[type] || []).slice(0)
          return function () {
            const args = atoa(arguments)
            const ctx = this || thing
            if (type === 'error' && opts.throws !== false && !et.length) { throw args.length === 1 ? args[0] : args }
            et.forEach(function emitter (listen) {
              if (opts.async) { debounce(listen, args, ctx) } else { listen.apply(ctx, args) }
              if (listen._once) { thing.off(type, listen) }
            })
            return thing
          }
        }
        return thing
      }
    }, { './debounce': 4, atoa: 3 }],
    6: [function (require, module, exports) {
      (function (global) {
        'use strict'

        const customEvent = require('custom-event')
        const eventmap = require('./eventmap')
        const doc = global.document
        let addEvent = addEventEasy
        let removeEvent = removeEventEasy
        const hardCache = []

        if (!global.addEventListener) {
          addEvent = addEventHard
          removeEvent = removeEventHard
        }

        module.exports = {
          add: addEvent,
          remove: removeEvent,
          fabricate: fabricateEvent
        }

        function addEventEasy (el, type, fn, capturing) {
          return el.addEventListener(type, fn, capturing)
        }

        function addEventHard (el, type, fn) {
          return el.attachEvent('on' + type, wrap(el, type, fn))
        }

        function removeEventEasy (el, type, fn, capturing) {
          return el.removeEventListener(type, fn, capturing)
        }

        function removeEventHard (el, type, fn) {
          const listener = unwrap(el, type, fn)
          if (listener) {
            return el.detachEvent('on' + type, listener)
          }
        }

        function fabricateEvent (el, type, model) {
          const e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent()
          if (el.dispatchEvent) {
            el.dispatchEvent(e)
          } else {
            el.fireEvent('on' + type, e)
          }
          function makeClassicEvent () {
            let e
            if (doc.createEvent) {
              e = doc.createEvent('Event')
              e.initEvent(type, true, true)
            } else if (doc.createEventObject) {
              e = doc.createEventObject()
            }
            return e
          }
          function makeCustomEvent () {
            return new customEvent(type, { detail: model })
          }
        }

        function wrapperFactory (el, type, fn) {
          return function wrapper (originalEvent) {
            const e = originalEvent || global.event
            e.target = e.target || e.srcElement
            e.preventDefault = e.preventDefault || function preventDefault () { e.returnValue = false }
            e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true }
            e.which = e.which || e.keyCode
            fn.call(el, e)
          }
        }

        function wrap (el, type, fn) {
          const wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn)
          hardCache.push({
            wrapper: wrapper,
            element: el,
            type: type,
            fn: fn
          })
          return wrapper
        }

        function unwrap (el, type, fn) {
          const i = find(el, type, fn)
          if (i) {
            const wrapper = hardCache[i].wrapper
            hardCache.splice(i, 1) // free up a tad of memory
            return wrapper
          }
        }

        function find (el, type, fn) {
          let i, item
          for (i = 0; i < hardCache.length; i++) {
            item = hardCache[i]
            if (item.element === el && item.type === type && item.fn === fn) {
              return i
            }
          }
        }
      }).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {})
    }, { './eventmap': 7, 'custom-event': 8 }],
    7: [function (require, module, exports) {
      (function (global) {
        'use strict'

        const eventmap = []
        let eventname = ''
        const ron = /^on/

        for (eventname in global) {
          if (ron.test(eventname)) {
            eventmap.push(eventname.slice(2))
          }
        }

        module.exports = eventmap
      }).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {})
    }, {}],
    8: [function (require, module, exports) {
      (function (global) {
        const NativeCustomEvent = global.CustomEvent

        function useNative () {
          try {
            const p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } })
            return p.type === 'cat' && p.detail.foo === 'bar'
          } catch (e) {
          }
          return false
        }

        /**
     * Cross-browser `CustomEvent` constructor.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
     *
     * @public
     */

        module.exports = useNative() ? NativeCustomEvent

        // IE >= 9
          : typeof document !== 'undefined' && typeof document.createEvent === 'function' ? function CustomEvent (type, params) {
            const e = document.createEvent('CustomEvent')
            if (params) {
              e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail)
            } else {
              e.initCustomEvent(type, false, false, void 0)
            }
            return e
          }

          // IE <= 8
            : function CustomEvent (type, params) {
              const e = document.createEventObject()
              e.type = type
              if (params) {
                e.bubbles = Boolean(params.bubbles)
                e.cancelable = Boolean(params.cancelable)
                e.detail = params.detail
              } else {
                e.bubbles = false
                e.cancelable = false
                e.detail = void 0
              }
              return e
            }
      }).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {})
    }, {}],
    9: [function (require, module, exports) {
      // shim for using process in browser
      const process = module.exports = {}

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      let cachedSetTimeout
      let cachedClearTimeout

      function defaultSetTimout () {
        throw new Error('setTimeout has not been defined')
      }
      function defaultClearTimeout () {
        throw new Error('clearTimeout has not been defined')
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout
          } else {
            cachedSetTimeout = defaultSetTimout
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout
          } else {
            cachedClearTimeout = defaultClearTimeout
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout
        }
      }())
      function runTimeout (fun) {
        if (cachedSetTimeout === setTimeout) {
          // normal enviroments in sane situations
          return setTimeout(fun, 0)
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout
          return setTimeout(fun, 0)
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0)
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0)
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0)
          }
        }
      }
      function runClearTimeout (marker) {
        if (cachedClearTimeout === clearTimeout) {
          // normal enviroments in sane situations
          return clearTimeout(marker)
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout
          return clearTimeout(marker)
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker)
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker)
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker)
          }
        }
      }
      let queue = []
      let draining = false
      let currentQueue
      let queueIndex = -1

      function cleanUpNextTick () {
        if (!draining || !currentQueue) {
          return
        }
        draining = false
        if (currentQueue.length) {
          queue = currentQueue.concat(queue)
        } else {
          queueIndex = -1
        }
        if (queue.length) {
          drainQueue()
        }
      }

      function drainQueue () {
        if (draining) {
          return
        }
        const timeout = runTimeout(cleanUpNextTick)
        draining = true

        let len = queue.length
        while (len) {
          currentQueue = queue
          queue = []
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run()
            }
          }
          queueIndex = -1
          len = queue.length
        }
        currentQueue = null
        draining = false
        runClearTimeout(timeout)
      }

      process.nextTick = function (fun) {
        const args = new Array(arguments.length - 1)
        if (arguments.length > 1) {
          for (let i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i]
          }
        }
        queue.push(new Item(fun, args))
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue)
        }
      }

      // v8 likes predictible objects
      function Item (fun, array) {
        this.fun = fun
        this.array = array
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array)
      }
      process.title = 'browser'
      process.browser = true
      process.env = {}
      process.argv = []
      process.version = '' // empty string to avoid regexp issues
      process.versions = {}

      function noop () {}

      process.on = noop
      process.addListener = noop
      process.once = noop
      process.off = noop
      process.removeListener = noop
      process.removeAllListeners = noop
      process.emit = noop
      process.prependListener = noop
      process.prependOnceListener = noop

      process.listeners = function (name) { return [] }

      process.binding = function (name) {
        throw new Error('process.binding is not supported')
      }

      process.cwd = function () { return '/' }
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported')
      }
      process.umask = function () { return 0 }
    }, {}],
    10: [function (require, module, exports) {
      (function (setImmediate) {
        const si = typeof setImmediate === 'function'; let tick
        if (si) {
          tick = function (fn) { setImmediate(fn) }
        } else {
          tick = function (fn) { setTimeout(fn, 0) }
        }

        module.exports = tick
      }).call(this, require('timers').setImmediate)
    }, { timers: 11 }],
    11: [function (require, module, exports) {
      (function (setImmediate, clearImmediate) {
        const nextTick = require('process/browser.js').nextTick
        const apply = Function.prototype.apply
        const slice = Array.prototype.slice
        const immediateIds = {}
        let nextImmediateId = 0

        // DOM APIs, for completeness

        exports.setTimeout = function () {
          return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout)
        }
        exports.setInterval = function () {
          return new Timeout(apply.call(setInterval, window, arguments), clearInterval)
        }
        exports.clearTimeout =
    exports.clearInterval = function (timeout) { timeout.close() }

        function Timeout (id, clearFn) {
          this._id = id
          this._clearFn = clearFn
        }
        Timeout.prototype.unref = Timeout.prototype.ref = function () {}
        Timeout.prototype.close = function () {
          this._clearFn.call(window, this._id)
        }

        // Does not start the time, just sets up the members needed.
        exports.enroll = function (item, msecs) {
          clearTimeout(item._idleTimeoutId)
          item._idleTimeout = msecs
        }

        exports.unenroll = function (item) {
          clearTimeout(item._idleTimeoutId)
          item._idleTimeout = -1
        }

        exports._unrefActive = exports.active = function (item) {
          clearTimeout(item._idleTimeoutId)

          const msecs = item._idleTimeout
          if (msecs >= 0) {
            item._idleTimeoutId = setTimeout(function onTimeout () {
              if (item._onTimeout) { item._onTimeout() }
            }, msecs)
          }
        }

        // That's not how node.js implements it but the exposed api is the same.
        exports.setImmediate = typeof setImmediate === 'function' ? setImmediate : function (fn) {
          const id = nextImmediateId++
          const args = arguments.length < 2 ? false : slice.call(arguments, 1)

          immediateIds[id] = true

          nextTick(function onNextTick () {
            if (immediateIds[id]) {
              // fn.call() is faster so we optimize for the common use-case
              // @see http://jsperf.com/call-apply-segu
              if (args) {
                fn.apply(null, args)
              } else {
                fn.call(null)
              }
              // Prevent ids from leaking
              exports.clearImmediate(id)
            }
          })

          return id
        }

        exports.clearImmediate = typeof clearImmediate === 'function' ? clearImmediate : function (id) {
          delete immediateIds[id]
        }
      }).call(this, require('timers').setImmediate, require('timers').clearImmediate)
    }, { 'process/browser.js': 9, timers: 11 }]
  }, {}, [2])(2)
})
