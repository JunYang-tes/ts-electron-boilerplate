const path = require('path')
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  context: path.resolve(__dirname,'src'),
  resolve:{
    extensions:['.ts','.js']
  },
  module: {
    rules: [
      { test: /\.ts/, use: 'ts-loader' }
    ]
  }
}