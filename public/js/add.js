class Add {
  constructor () {
    this.inputName = document.querySelector('#inputName')
    this.inputPrice = document.querySelector('#inputPrice')
    this.inputNum = document.querySelector('#inputNum')
    this.btnCancel = document.querySelector('#btn-add-cancel')
    this.btnOk = document.querySelector('#btn-add-ok')
    this.showMsg = document.querySelector('#show-msg')
    this.addShop()
  }

  addShop () {
    this.btnOk.onclick = () => {
      const name = this.inputName.value
      const price = this.inputPrice.value
      const num = this.inputNum.value

      tools.fetch('api/v1/shop/add', { name, price, num }).then(resp => {
        // 判断是否添加成功
        if (resp.code === 200) {
          this.showMsg.innerHTML = resp.body.msg
          this.showMsg.className = 'text-success'
          setTimeout(() => {
            // 模态框隐藏，重新请求一次所有数据
            $('#addModal').modal('hide')
            this.showMsg.innerHTML = ''
            this.inputName.value = ''
            this.inputPrice.value = ''
            this.inputNum.value = ''
            sel.getData()
          }, 1000)
          
        } else {
          this.showMsg.className = 'text-danger'
          this.showMsg.innerHTML = resp.body.msg
          setTimeout(() => {
            // 把提示消息清空
            this.showMsg.innerHTML = ''
          }, 2000)
        }
      })
    }
  }
}
new Add()