const path = require('path')
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.ts/, use: 'ts-loader' }
    ]
  }
}