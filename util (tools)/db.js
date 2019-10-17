//连接数据库
// 引入mongoose
//一般第三方的代码，都会代码var 改为 const
const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/1908', {useNewUrlParser: true})

// 取到集合
const db = mongoose.connection
// 处理错误信息
db.on('error', console.error.bind(console, 'connection error:'))
// 打开连接的事件
db.once('open', function() {
  console.log("we're connected!")  //可有可无
})
//导出mongoose
module.exports = mongoose
// =============================>>>>>>>>>>>>>>>>>>>>>>>>>

// schema的作用就是把非关系型转成关系型，定义表结构,他是一个抽象
//mongodb是一个非关系性数据库
// var userSchema = new mongoose.Schema({
//   username: String,
//   password: String
// })

// 基于schema创建了一个model，model是一个class
// var User = mongoose.model('user', userSchema)

// // new一个model的实例，存数据
// var cxk = new User({ username: 'Lydia', password: '8009' })
// cxk.save((err, userinfo) => {
//   if (err) console.error(err)
//   else console.log(userinfo)
//   db.close()
// })

// // 查数据
// User.find({password: 'rap'}, (err, users) => {
//   if (err) console.error(err)
//   else console.log(users)
//   // 数据操作做完以后可以在这里关闭连接
//   db.close()
// })

// // 删除
// User.deleteOne({username: '蔡大哥'}, err => {
//   if (err) console.error(err)
//   else console.log('done.')
//   db.close()
// })

// // 更新
// User.findOneAndUpdate({password: 'rap'}, {username: '小坤坤'}, {new: true}, (err, doc) => {
//   if (err) console.error(err)
//   else console.log(doc)
//   db.close()
// })

