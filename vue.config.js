//  const { defineConfig } = require('@vue/cli-service')
//  module.exports = defineConfig({
//    transpileDependencies: true,

//  })

// 内网穿透设置
// module.exports = {
//   devServer: {
//     allowedHosts: 'all'
//   }
// }

//module.exports = {
 // publicPath:'./'
//}
const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/poll': {
        target: 'https://poll.kuaidi100.com/poll',
        changeOrigin: true, // 允许websockets跨域
        // ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    } // 代理转发配置，用于调试环境
  },
}



