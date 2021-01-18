import axios from 'axios'
import Qs from 'qs'
import storageUtils from './storageUtils'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    // baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    baseURL: '/api',
    timeout: 60000
  })

  // 设置 post 默认 Content-Type
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

  // 2.axios拦截器
  instance.interceptors.request.use(
    function(config) {
      // 判断请求方式是否为POST，进行转换格式，请求发送前进行处理
      config.method === 'post'
        ? config.data = Qs.stringify({ ...config.data })
        : config.params = { ...config.params }

      // 如果有的话存入请求头，方便请求接口
      if (storageUtils.getUser()) {
        config.headers.Authorization = storageUtils.getUser()
      }
      return config
    },
    function(error) {
      // 请求错误
      return Promise.reject(error)
    }
  )

  // 2.2 响应拦截器
  instance.interceptors.response.use(
    function(res) {
      // return res.data    // 第一种可以解决一级data
      return res
    },
    function(error) {
      // 当服务器返回401状态码的时候 跳转到登录页
      if (error && error.response && error.response.status === 401) {
        this.$message.warning('登录信息失效，请重新登录')
        const timer = setTimeout(() => {
          window.location.href = '/login'
          clearTimeout(timer)
        }, 2000)
      }
      return Promise.reject(error)
    }
  )
  // 3.发送真正的网路请求
  return instance(config)
}

/*
{"username":"admin","password":"123456"} 没有序列化
username=admin&password=123456           qs 序列化之后
*/
