//引入一个express得到一个express的实例
// const express = require('express')
// const router = express.Router()
//简化写法 
 const router = require('express').Router()
 //这里的路径不用写根路径，因为它本身就是后端的代码
//  const shopController = require('../controller/shopController')
//另外一种写法
const {
    allShopContoller, 
    addShopContoller
} = require('../controller/shopController')
const {
    register,
    login
} = require('../controller/userController')

//写路由处理来自前端的请求 
//这个findAll去处理请求，方法就不在这里定义了
 router.get('/v1/shop/select', allShopContoller)
 router.get('/v1/shop/add', addShopContoller)
 router.post('/v1/user/register', register)
 router.post('/v1/user/login', login)
//将router导出出去
module.exports = router 