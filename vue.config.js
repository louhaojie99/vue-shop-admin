'use strict' // 严格模式
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 构建时的输出目录
  assetsDir: 'static', // 放置静态资源的目录
  indexPath: 'index.html', //  html 的输出路径
  // 配置反向代理，解决跨域
  devServer: {
    hot: true,
    port: 9000,
    open: true, // 自动打开浏览器
    proxy: {
      '/api': {
        target: 'https://www.liulongbin.top:8888/', // 项目测试环境服务接口地址
        // target: 'http://127.0.0.1:8000/api/w6', // 本地测试环境服务接口地址
        ws: true, // websocket
        changeOrigin: true, // 发送请求头中host会设置成target·
        pathRewrite: {
          '^/api': '/api' // 请求路径进行重定向以匹配到正确路径，可以忽略，配置出来   http://XX.XX.XX.XX:8000/api/login
        }
        // secure: false,  // 如果是https接口，需要配置这个参数
      }
    }
  },
  // 配置别名
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
  // 打包优化
  // ...
}
