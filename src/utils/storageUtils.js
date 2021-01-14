// store.js公开了一个用于跨浏览器本地存储的简单API
/*
  验证是否登录, 储存用户信息
  yarn add store
*/
import store from 'store' // 引入第三方插件

const USER_KEY = 'token' // 定义常量
export default {
  // 保存
  saveUser(user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user));
    store.set(USER_KEY, user)
  },
  // 获取
  getUser() {
    // return localStorage.getItem(JSON.parse(USER_KEY)) || '{}'
    return store.get(USER_KEY) || {}
  },
  // 删除
  removeUser() {
    // localStorage.removeItem(USER_KEY);
    store.remove(USER_KEY)
  }
}
