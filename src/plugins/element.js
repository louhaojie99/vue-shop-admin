// element ui按需引入
import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}

// 和所有组件一样，一并进行use
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Message)
