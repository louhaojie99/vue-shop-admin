'use strict'
/* =================打包优化(未测试成功)================= */
// const isProduction = process.env.NODE_ENV !== 'development' // 是否为生产环境
// const devNeedCdn = false // 本地环境是否需要使用cdn
// cdn链接
// const cdn = {
//   externals: {
//     vue: 'Vue',
//     vuex: 'Vuex',
//     'vue-router': 'VueRouter',
//     'axios': 'axios'
//   },
//   css: [],
//   js: [
//     'https://cdn.bootcdn.net/ajax/libs/vue/2.6.9/vue.min.js',
//     'https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js',
//     'https://cdn.bootcdn.net/ajax/libs/vue-router/3.4.8/vue-router.min.js',
//     'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js'
//   ]
// }
/* end */

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // ============注入cdn start============
  // chainWebpack: config => {
  //   config.plugin('html').tap(args => {
  //     args[0].cdn = cdn
  //     return args
  //   })
  // },
  // ============注入cdn start============
  publicPath: './', // 基本路径
  outputDir: 'dist', // 构建时的输出目录
  assetsDir: 'static', // 放置静态资源的目录
  indexPath: 'index.html', //  html 的输出路径
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  productionSourceMap: false, // 可以减少包大小，也可以加密源码
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  // 配置反向代理，解决跨域
  devServer: {
    hot: true,
    port: 9000,
    open: true, // 自动打开浏览器
    proxy: {
      '/api': {
        target: 'https://www.liulongbin.top:8888/', // 测试环境
        // target: 'http://127.0.0.1:8000/api/w6',  // 本地环境
        ws: true, // websocket
        changeOrigin: true, // 发送请求头中host会设置成target·
        pathRewrite: {
          '^/api': '/api' // 请求路径进行重定向以匹配到正确路径
        }
        // secure: false,  // 如果是https接口，需要配置这个参数
      }
    }
  },
  configureWebpack: {
    // 配置别名
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
