import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'
import Welcome from '@/views/welcome/Welcome.vue'
import Users from '@/views/users/Users.vue'
import Rights from '@/views/power/Rights.vue'

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
      // 权限管理
      {
        path: '/rights', name: 'Rights', component: Rights
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
