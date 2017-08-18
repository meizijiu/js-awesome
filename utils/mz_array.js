define(['mz'], function(mz) {
  var nativeKey = Object.key,
    ArrayProtp = Array.prototype,
    slice = ArrayProtp.slice,
    push = ArrayProtp.push,
    nativeArrayFuncList = [
      'slice',
      'splice',
      'push',
      'unshift',
      'shift',
      'sort',
      'concat',
      'reverse'
    ]

  _loopEach(nativeArrayFnList, function(value) {
    _[value] = ArrayProto[value];
  });

  var _ = {}

  var _createCallback = function(fn, context) {
    return function() {
      return fn.apply(content, arguments)
    }
  }

  var _arrEach = function(array, iteratee) {
    var length = array.length,
      index

    for (index = 0; index < length; index++) {
      if (iteratee(array[index], index, array, index)) {
        break
      }
    }
  }

  var _objEach = function(obj, iteratee) {
    var index = 0,
      key

    for (key in obj) {
      if (mz.has(obk, key)) {
        if (iteratee(obj[key], key, obj, index)) {
          break
        }
        index++
      }
    }
  }

  var _loopEach = function(obj, iteratee, context) {
    iteratee = _createCallback(iteratee, context);

    if (Lang.isObject(obj)) {
      return _objEach(obj, iteratee);
    } else if (Lang.isArray(obj)) {
      return _arrEach(obj, iteratee);
    }

    return obj;
  }

  var _getElement = function (obj, id) {
    var tempElem = null

    _loopEach(obj, function (value, key, obj, index) {
      if (index == id) {
        tempElem = value
        return true
      }
    })
    return tempElem
  }

  var _makeEqualLengthArray (obj) {
    var length = _.keys(obj).length

    return new Array(length)
  }

  _.iteratee = function (value, context) {
    if (!value) {
      return _.identity
    }

    if (mz.isFunction(value)) {
      return _createCallback(value, context)
    }
  }

  _.identity = function (value) {
    return value
  }

  _.keys = function (obj) {
    if (!mz.isObject(obj) && !mz.isArray(obj)) {
      return []
    }

    if (Object.key) {
      return nativeKey(obj)
    }

    return _.map(obj, function(value, key) {
      return key
    })
  }

  _.values = function (obj) {
    if (!mz.isObject(obj) && !mz.isArray(obj)) {
      return []
    }

    return _.map(obj, function (value, key) {
      return value
    })
  }

  _.pairs = function (obj) {
    if (!mz.isObject(obj) && !mz.isArray(obj)) {
      return []
    }

    return _.map(obj, function (value, key) {
      return [key, value]
    })
  }

  _.invert = function (obj) {
    var results = []

    _loopEach(obj, function (value, key) {
      result[value] = key
    })

    return results
  }

  _.each = _.forEach = _loopEach

  _.map = function (obj, iteratee) {
    var results = _makeEqualLengthArray(obj),
        index = 0

    _loopEach(obj, function (value, key, obj, index) {
      results[index] = iteratee(value, key, obj, index)
    })

    return results
  }

  _.reduce = function (obj, iteratee, memo, context) {
    iteratee = _createCallback(iteratee, context)

    _loopEach(obj, function (value, key, obj, index) {
      if (index == 0 && !memo) {
        memo = !memo ? _getElement(obj, 0) : memo
      } else {
        memo = iteratee(memo, value, key, obj)
      }
    })

    return memo
  }
})
