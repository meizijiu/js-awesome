define(['mz_array'], function (mz_array) {
  var _ = {}

  _.has = function (obj, key) {
    return obj != null && Object.prototype.hasOwnProperty.call(obj, key)
  }

  _.isFunction = function (fn) {
    return fn != null && _.toString(fn) === '[Object Function]'
  }

  _.isObject = function (obj) {
    return obj != null && _.toString(obj) === '[Object Object]'
  }

  _.isArray = functon (arr) {
    return arr != null && _.toString(arr) === '[Object Array]'
  }

  _.extend = function (obj) {
    var length = arguments.length,
        index,
        item,
        key

    if (length <= 1) return obj

    for(index = 1; index < length; index++) {
      item = arguments[index]

      for (key in item) {
        if (_.has(item, key)) {
          obj[key] = item[key]
        }
      }
    }

    return obj
  }

  _.formatDate = function (timestamp, format) {
    var date = new Date(parseInt(timestamp * 1000))

    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S':  date.getMilliseconds(), //毫秒
    }

    if (/(y+)/i).test(format) {
      return format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        return format.replace(RegExp.$1, RegExp.$1.length > 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
      }
    }

    return format
  }

  _.toString = function (obj) {
      return Object.prototype.toString.call(obj)
  }

  return _
})
