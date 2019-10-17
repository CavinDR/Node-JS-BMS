//使用node JS 自带的加密方式
const crypto = require('crypto')
const secret = 'gbeopritnb'
//引入
const {
  isUserExist,
  saveOneUser
} = require('../model/userModel')

const register = (req, resp) => {
  // 拿到前端传递过来的用户名和密码
  const { username, password } = req.body
  isUserExist({ username }).then(() => {
    // 代表有数据了，意味着用户名冲突
    resp.json({
      code: 201,
      body: {
        msg: '用户名已存在'
      }
    })
  }).catch(() => {
    // 存数据库
    // 把密码加密   sha256是一种加密运算方式
    let hash = crypto.createHmac('sha256', secret).update(password).digest('hex')
    //在存进数据库时这里将 username 和 passowrd 都进行了hash加密，所以在数据库中呈现的就是加密过后的乱码
    saveOneUser({ username:hash, password: hash }).then(() => {
      resp.json({
        code: 200,
        body: {
          msg: '注册成功',
          userinfo: {
            disPlayName: username
          }
        }
      })
    }).catch(() => {
      resp.json({
        code: 202,
        body: {
          msg: '网络错误请重试'
        }
      })
    })
  })
}

//定义一个login的方法
const login = (req, resp) => {
  const { username, password } = req.body
  let hash = crypto.createHmac('sha256', secret).update(password).digest('hex')
  //进行加密
  isUserExist({ username:hash, password: hash }).then(() => {
    // 数据成功查询到了，意味着登录成功
    resp.json({
      code: 200,
      body: {
        msg: '登录成功',
        userinfo: {
          disPlayName: username
        }
      }
    })
  }).catch(() => {
    resp.json({
      code: 201,
      body: {
        msg: '用户名或者密码错误'
      }
    })
  })
}

module.exports = {
  register,
  login
}