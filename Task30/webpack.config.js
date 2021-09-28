const path = require('path')

module.exports = {
  mode: 'development',
  entry: './public/script.js',
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:8080'
    },
    static: path.join(__dirname, 'public'), // boolean | string | array | object, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false // true for self-signed, object for cert authority
    // ...
  }
}
