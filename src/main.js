import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 引入全局样式表
import './assets/css/global.css'
import './assets/css/scrollbar.css'
// 导入阿里字体图标
import './assets/fonts/iconfont.css'

// 插件
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)

// 阻止显示生产模式的消息
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
