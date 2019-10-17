# 接口文档

### 查询所有商品接口



url：api/v1/shop/select.php

method：get

query：null

dataType：json

response：{

​	code: 200,

​	body: {

​		list: [

​			{ Id, name, price, num }

​		]

​	}

}



### 添加商品接口

url：api/v1/shop/add.php

method：get

query： { name, price, num }

dataType ：json

response： {

​	code: 200,

​	body: {

​		msg: '添加成功'

​	}

}

