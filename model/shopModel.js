//对数据库进行访问（控制数据），调用Control
const mongoose = require('../util (tools)/db')

const shopSchema = new mongoose.Schema({
    name: String,
    price: Number,
    num:Number
})
 
const Shop = mongoose.model('Shop', shopSchema)

// const shop=new Shop({name:'飞机',price:89,num:3})

// shop.save((err,docs)=>{
//     if(err) console.error(err)
//     else console.log(docs)
// })

// console.log(Shop)
//封装一个操作数据库的方法，需要异步方法
const findAll = () => {
    //用 promise 来处理异步，用controller层通过resolve拿数据
    return new Promise((resolve,reject) => {
        Shop.find((err, docs) =>{
            if(err) reject()
            else resolve(docs)
            console.log(1)
            console.log(docs)
        })
    })
}

const saveOne = (shopinfo) => {
    const shop = new Shop(shopinfo)
    return new Promise((resolve,reject) => {
        shop.save((err,doc) => {
            if (err) reject()
            else resolve(doc)
        })
    })
}
module.exports = {
    findAll,
    saveOne
}