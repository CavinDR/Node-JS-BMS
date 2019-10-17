//控制器 
//写商品相关的逻辑
//api来调这里面的代码
//接收Model导出的
const {
    findAll,
    saveOne
} =  require('../model/shopModel')

const allShopContoller = (req, resp) => {
    //查询数据库里的所有数据返回给前端json
    //需要依赖model的方法
        findAll().then(docs => {
            resp.json({
                code:200,
                body:{
                    list:docs
                }
            })
        }).catch(() => {
            resp.json({
                code:201,
                body:{
                    list:[]
                }
            })
        })
}

//添加商品
const addShopContoller = (req, resp) => {
    console.log(req.query);
    const {name, price, num} = req.query
    saveOne({
        name,
        price:Number(price),
        num:Number(num)
    }).then(doc => {
        resp.json({
            code:200,
            body:{
                msg:'添加商品成功',
                doc
            }
        })
    }).catch(() => {
        resp.json({
            code:200,
            body:{
                msg:'没网络，别来买东西，浪费时间~'
            }
        })
    })
}
//在control层里要拿到model的异步请求
module.exports = {
    allShopContoller,
    addShopContoller
}