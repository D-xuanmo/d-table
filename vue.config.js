const path = require('path')

module.exports = {
  lintOnSave: true,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack: {
    entry: {
      app: path.resolve(__dirname, './example/main.js')
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@doc': path.resolve(__dirname, './example')
      }
    }
  },
  productionSourceMap: false
}
