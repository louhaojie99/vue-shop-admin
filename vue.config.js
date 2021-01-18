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
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  productionSourceMap: false, // 可以减少包大小，也可以加密源码
  // lintOnSave: process.env.NODE_ENV === 'development', // eslint-loader 是否在保存的时候检查
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  // 配置反向代理，解决跨域
  devServer: {
    hot: true,
    port: 9000,
    open: true, // 自动打开浏览器
    proxy: {
      // 开发环境路径
      '/api': {
        target: 'https://www.liulongbin.top:8888/', // 项目测试环境服务接口地址
        // target: 'http://127.0.0.1:8000/api/w6', // 本地测试环境服务接口地址
        ws: true, // websocket
        changeOrigin: true, // 发送请求头中host会设置成target·
        pathRewrite: {
          '^/api': '/' // 请求路径进行重定向以匹配到正确路径，可以忽略，配置出来   http://XX.XX.XX.XX:8000/api/login
        }
        // secure: false,  // 如果是https接口，需要配置这个参数
      }
      // 生产环境路径
      // '/online': {
      //   target: 'https://www.xxxxxxx.com/',
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '/api'
      //   }
      //   // secure: false,
      // }
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
