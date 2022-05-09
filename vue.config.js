 const { defineConfig } = require('@vue/cli-service')
 module.exports = defineConfig({
   transpileDependencies: true,

 })

// 内网穿透设置
// module.exports = {
//   devServer: {
//     allowedHosts: 'all'
//   }
// }

module.exports = {
 // publicPath:'./'
}

