const mongoose = require('../util (tools)/db')


//先定义类型
const userSchema = mongoose.Schema({
    username: String,
    password: String
})
//在数据库中创建或者找到users这个表格
const User = mongoose.model('users', userSchema)


const isUserExist = (userinfo) => {
    return new Promise((resolve, reject) => {
        User.find(userinfo, (err, docs) => {
            if(err) throw err
            else {
                //查到数据就then，catch就代表没有数据
                if (docs.length > 0) {
                    resolve()
                }else{
                    reject()
                }
            }
        })
    })
}

const saveOneUser = (userinfo) => {
    const user = new User(userinfo)
// 因为user.save在不写回调的时候返回的就是一个promise，所以继续返回给controller
       return user.save()

    
}

module.exports = {
    isUserExist,
    saveOneUser
}