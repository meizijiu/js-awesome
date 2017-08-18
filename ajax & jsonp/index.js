// ajajx: url, type, data, success, error
// jsonp: jsonp url data success error time
var request = function (json) {
  json = json || {}

  json.data = json.data || {}
  var params = json.jsonp ? jsonp(json) : ajax(json)
}

// ajax 请求
var ajax = function (params) {
  params.type = params.type.toUpperCase() || 'GET'
  params.data = formatParams(params.data)

  var xhr

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status

      // 状态响应码 在 200 和 300 之间
      if (status >= 200 && status < 300) {
        var response = ''

        var type = xhr.getResponseHeader('Content-type')

        if (type.indexOf('xml') !== -1 && xhr.responseXML) {
          response = xhr.responseXML
        } else if (type === 'application/json') {
          response = JSON.parse(xhr.responseText)
        } else {
          response = xhr.responseText
        }

        // 成功回调
        params.success && params.success(response)
      } else {
        // 失败回调
        params.error && params.error(status)
      }
    }
  }

  if (params.type === 'GET') {
    xhr.open(params.type, params.url + '?' + params.data, true)

    xhr.send(null)
  } else {
    xhr.open(params.type, params.url)

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')

    xhr.send(params.data)
  }
}

// jsonp 请求
var jsonp = function (params) {
  var callbackName = params.jsonp

  var script = document.createElement('script')

  var head = document.getElementsByTagName('head')[0]

  // 设置传递给后台的回调参数名
  params.data['callback'] = callbackName

  var data = formatParams(params.data)

  head.appendChild(script)

  // 创建jsonp回调函数
  window[callbackName] = function (result) {
    head.removeChild(script)

    clearTimeout(script.timer)

    window.callbackName = null

    params.success && params.success(result)
  }

  script.src = params.url + '?' + data

  // 超时处理
  var time = params.time || 1000

  script.timer = setTimeout(function () {
    window[callbackName] = null

    head.removeChild(script)

    params.error && params.error({
      message: 'timeout'
    })
  }, time)
}

function formatParams (data) {
  var arr = []

  for (var i in data) {
    arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
  }

  // 添加随机数
  arr.push('v=' + Math.floor(Math.random() * 10000 + 100))

  return arr.join('&')
}
