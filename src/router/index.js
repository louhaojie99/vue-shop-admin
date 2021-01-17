import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'
import Welcome from '@/views/welcome/Welcome.vue'
import Users from '@/views/users/Users.vue'
import Rights from '@/views/power/Rights.vue'
import Roles from '@/views/power/Roles.vue'
import Goods from '@/views/goods/Goods.vue'
import Params from '@/views/goods/Params.vue'
import Categories from '@/views/goods/Categories.vue'
import Orders from '../views/order/Orders.vue'
import Reports from '../views/data/Reports.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  // 登录页
  { path: '/login', name: 'Login', component: Login },
  // 主页
  {
    path: '/home', name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      // 欢迎页面
      {
        path: '/welcome', name: 'Welcome', component: Welcome
      },
      // 用户管理
      {
        path: '/users', name: 'Users', component: Users
      },
      // 权限管理 权限列表
      {
        path: '/rights', name: 'Rights', component: Rights
      },
      // 权限管理 角色列表
      {
        path: '/roles', name: 'Roles', component: Roles
      },
      // 商品管理 商品列表
      {
        path: '/goods', name: 'Goods', component: Goods
      },
      // 商品管理 分类参数
      {
        path: '/params', name: 'Params', component: Params
      },
      // 商品管理 商品分类
      {
        path: '/categories', name: 'Categories', component: Categories
      },
      // 订单管理 订单列表
      {
        path: '/orders', name: 'Orders', component: Orders
      },
      // 数据统计 数据报表
      {
        path: '/reports', name: 'Reports', component: Reports
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next('/login') // token失效返回登录页
  next()
})

export default router
