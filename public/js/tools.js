var tools = {
  /**
   * 获取元素的某个样式值
   * @param obj <DOM object> 要获取样式的元素对象 
   * @param attr <string>  要获取的属性名
   * @return <string> 得到的样式值 
   */
  getStyle: function (obj, attr) {
    // if (obj.currentStyle) {
    //   return obj.currentStyle[attr];
    // } else {
    //   return getComputedStyle(obj, false)[attr];
    // }

    // return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];

    try {
      return obj.currentStyle[attr];
    } catch (e) {
      return getComputedStyle(obj, false)[attr];
    }
  },

  /** 给DOM对象设置多条样式
   * @param obj <DOM object> 要设置样式的元素对象 
   * @param attr <object>  要设置的样式的键值对
   */
  setStyle: function (obj, attr) {
    for (var key in attr) {
      obj.style[key] = attr[key]
    }
  },

  /** 获取浏览器的宽高
   * @return <object>  {width, height} 
   */
  getBodySize: function () {
    return {
      width: document.documentElement.clientWidth || document.body.clientWidth,
      height: document.documentElement.clientHeight || document.body.clientHeight
    };
  },

  /** 给元素添加事件监听
   * @param obj <DOM object> 要添加事件的DOM对象
   * @param type <string> 事件句柄（不带‘on’）
   * @param `fn <function> 事件处理函数`
   * @param [isCapture] <boolean> 是否捕获，true代表在捕获阶段处理事件，false代表冒泡阶段处理事件，默认为false
   */
  on: function (obj, type, fn, isCapture) {
    // isCapture = isCapture === undefined ? false : isCapture;
    if (isCapture === undefined) isCapture = false;
    if (obj.attachEvent) {
      obj.attachEvent('on' + type, fn);
    } else {
      obj.addEventListener(type, fn, isCapture);
    }
  },

  /** 给元素移出事件监听
   * @param obj <DOM object> 要添加事件的DOM对象
   * @param type <string> 事件句柄（不带‘on’）
   * @param `fn <function> 事件处理函数`
   * @param [isCapture] <boolean> 是否捕获，true代表在捕获阶段处理事件，false代表冒泡阶段处理事件，默认为false
   */
  off: function (obj, type, fn, isCapture) {
    if (isCapture === undefined) isCapture = false;
    if (obj.detachEvent) {
      obj.detachEvent('on' + type, fn);
    } else {
      obj.removeEventListener(type, fn, isCapture);
    }
  },

  /** 让元素的某个属性匀速运动到终点值
   * obj <DOM Object> 运动的元素对象
   * attr <string> 运动的属性
   * end <number> 运动的终点值
   * duration <number> 运动持续时间,单位是ms
   * [fn] <Function>  回调函数，动画结束之后调用的函数
   */
  move: function (obj, attr, end, duration, fn) {
    // 把定时器写给obj的自定义属性，每一次进入move的时候先把上一次的定时器清除，避免效果叠加
    clearInterval(obj.timer);
    // 获取起点值，获取obj当前的attr属性值
    var start = parseInt(this.getStyle(obj, attr));
    // 计算距离
    var distance = end - start;
    // 计算运动的总步数
    var steps = parseInt(duration / 30)
    // 计算速度（px/步）（px/30ms）
    var speed = distance / steps;
    // 声明变量记录当前步数
    var n = 0
    obj.timer = setInterval(() => {
      n++;
      obj.style[attr] = start + n * speed + 'px';
      if (n === steps) {
        // 步数走完了，到达终点了
        clearInterval(obj.timer);
        // 由于js计算小数不是特别精确，所以有可能这里不能刚好到达终点
        obj.style[attr] = end + 'px';
        // 利用逻辑短路，fn有值才会被调用（回调函数一般都这么写）
        fn && fn();
      }
    }, 30);
  },

  /** 让元素的某个属性缓冲运动到终点值
   * obj <DOM Object> 运动的元素对象
   * attr <string> 运动的属性
   * end <number> 运动的终点值
   * [fn] <Function>  回调函数，动画结束之后调用的函数
   */
  move2: function (obj, attr, end, fn) {
    clearInterval(obj.timer);
    // 获取起点值
    var start = parseInt(this.getStyle(obj, attr))
    end = parseInt(end);
    obj.timer = setInterval(() => {
      var distance = end - start;
      var speed = distance > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10);
      start += speed;
      obj.style[attr] = start + 'px';
      if (start === end) {
        clearInterval(obj.timer);
        fn && fn();
      }
    }, 30)
  },

  /** 获取cookie
   * @param key <string> 要获取的cookie名称
   * @return <string>  这个cookie的值
   */
  getCookie (key) {
    // 先构造对象
    var cookie = document.cookie
    var arr = cookie.split('; ')
    // var obj = {}
    // arr.forEach(str => {
    //   var subArr = str.split('=')
    //   // 解码取
    //   obj[subArr[0]] = decodeURIComponent(subArr[1])
    // })

    var obj = arr.reduce((res, item) => {
      var subArr = item.split('=')
      res[subArr[0]] = decodeURIComponent(subArr[1])
      return res
    }, {})

    return obj[key]
  },

  /** 存cookie
   * @param key <string> 存的cookie的名称 
   * @param value  <string> 要存的cookie的值
   * @param [option]  <object>  例如：{ expires: 7, path: '/' }
   */
  setCookie (key, value, option) {
    // 编码之后存
    var str = `${key}=${encodeURIComponent(value)}`
    if (option) {
      // option如果传递了再判断有哪些值
      if (option.path) {
        str += `;path=${option.path}`
      }
      if (option.expires) {
        var date = new Date()
        date.setDate(date.getDate() + option.expires)
        str += `;expires=${date.toUTCString()}`
      }
    }
    document.cookie = str
  },

  /** ajax get方法
   * @param url    <string>   请求地址
   * @param query  <object>   请求要携带的参数
   * @param fn     <function> 请求成功之后的回调函数
   * @param isJson <boolean>  返回数据是否为json，默认值为true
   */
  get: function (url, query, fn, isJson = true) {
    // 判断参数，在url后面拼接
    if (query) {
      url += '?'
      for (var key in query) {
        url += `${key}=${query[key]}&`
      }
      url = url.slice(0, -1)
    }
    // 1、创建核心对象
    var xhr = new XMLHttpRequest()
    // 2、打开连接
    xhr.open('GET', url)
    // 3、发送请求
    xhr.send()
    // 4、监听状态改变
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var resp = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
          fn && fn(resp)
        }
      }
    }
  },

  /** ajax post方法 --- 陈江
   * @param url    <string>   请求地址
   * @param query  <object>   请求要携带的参数
   * @param fn     <function> 请求成功之后的回调函数
   * @param isJson <boolean>  返回数据是否为json，默认值为true
   */
  post: function (url, query, fn, isJson = true) {
    // 判断参数
    let queryStr = '' 
    if(query){
      for (var key in query) {
        queryStr += `${key}=${query[key]}&`
      }
      queryStr = queryStr.slice(0, -1)
    }
    // 1、创建核心对象
    var xhr = new XMLHttpRequest()
     // 2、打开连接
     xhr.open('POST', url)
   // 3、发送请求
     xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
     xhr.send(queryStr)
     // 4、监听状态改变
     xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var resp = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
          fn && fn(resp)
        }
      }
    }
  },

  /** jsonp跨域请求
   * @param url   <string>   请求地址
   * @param cb    <string>   回调函数名
   * @param query <object>   要携带的其他参数
   */
  jsonp: function (url, cb, query) {
    url += `?cb=${cb}`
    if (query) {
      for (var key in query) {
        url += `&${key}=${query[key]}`
      }
    }
    // 创建script标签
    var script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
    document.body.removeChild(script) // 过河拆桥
  },

  /** 发送基于promise的get请求
   * @param url <string> 接口地址
   * @param query <object> 请求携带的参数
   * @param isJson <boolean>  返回数据是否为json，默认值为true
   */
  fetch: function (url, query, isJson = true) {
    if (query) {
      url += '?'
      for (var key in query) {
        url += `${key}=${query[key]}&`
      }
      url = url.slice(0, -1)
    }
    // 要返回promise实例，这样调用fetch之后才能.then
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.send()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 ) {
          if (xhr.status === 200) {
            var resp = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
            resolve(resp)
          } else {
            reject()
          }
        }
      }
    })
  }

}
