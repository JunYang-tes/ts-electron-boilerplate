const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  plugins:[
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma:6
      }
    }
    )
  ]
}