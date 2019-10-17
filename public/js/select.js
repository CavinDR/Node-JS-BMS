class Select {
  constructor (tbodySelector) {
    this.tbody = document.querySelector(tbodySelector)
    this.getData()
  }
  getData () {
    // 路径：虽然写在js里，但是发送从index发送的，所以路径应该以index为出发点
    tools.fetch('api/v1/shop/select').then(resp => {
      if (resp.code === 200) {
        // const list = resp.body.list
        const { list } = resp.body
        this.render(list)
  
      } else {
        alert('网络错误，请重试')
      }
    })
  }
  render (list) {
    // let str = ''
    // list.forEach(shop => {
    //   str += `<tr>
    //     <td>${shop.Id}</td>
    //     <td><span>${shop.name}</span><input type="text"></td>
    //     <td><span>${shop.price}</span><input type="text"></td>
    //     <td><span>${shop.num}</span><input type="text"></td>
    //     <td>
    //       <button class="btn btn-xs btn-edit btn-info">编辑</button>
    //       <button class="btn btn-xs btn-del btn-danger">删除</button>
    //       <button class="btn btn-xs btn-ok btn-success">确定</button>
    //       <button class="btn btn-xs btn-cancel btn-warning">取消</button>
    //     </td>
    //   </tr>`
    // })
    // this.tbody.innerHTML = str


    // reduce ???
    //这个是每行开头的序号
    var index=0
    this.tbody.innerHTML = list.reduce((str, shop) => {
      index++
      //绑定自定义属性
      str += `<tr data-id=${shop._id}>
        <td>${index}</td>
        <td><span>${shop.name}</span><input type="text"></td>
        <td><span>${shop.price}</span><input type="text"></td>
        <td><span>${shop.num}</span><input type="text"></td>
        <td>
          <button class="btn btn-xs btn-edit btn-info">编辑</button>
          <button class="btn btn-xs btn-del btn-danger">删除</button>
          <button class="btn btn-xs btn-ok btn-success">确定</button>
          <button class="btn btn-xs btn-cancel btn-warning">取消</button>
        </td>
      </tr>`
      return str
    }, '')

    
  }
}

const sel = new Select('#tbody-list')