const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const 一个api路由，获取routes下的api.js文件
const apiRouter = require('./routes/api');

const proxy = require('http-proxy-middleware');
const app = express();

//引入cors
// const cors = require('cors')
// //限制域名跨域，如果不设置，谁都可以跨域访问
// const corsOptions = {
//     origin: 'http://127.0.0.1:5500',   //
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
// app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//前端的请求到这里分流   处理前端的静态资源
app.use(express.static(path.join(__dirname, 'public')));
//处理ajax接口地址，进入apiRouter
app.use('/api', apiRouter);

// 代理跨域的参数设置
var options = {
    target: 'https://apiv2.pinduoduo.com', // 要代理的目标源
    changeOrigin: true, // 修改虚拟源
    ws: true, // 长连接
    pathRewrite: {
      '^/bxx/api': '/api', // 路径重写  一般只留一个就行了 '^': 这个是开头
    },
    router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'http://www.example.org' to 'http://localhost:8000'
      'dev.localhost:3000': 'http://localhost:8000'
    }
  }
   
  // 根据配置创建一个代理的实例
  var exampleProxy = proxy(options)
  // 来自bxx的请求使用这个代理
  app.use('/bxx', exampleProxy)


module.exports = app;
