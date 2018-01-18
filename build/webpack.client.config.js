const baseConfig = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const clientConfig = Object.assign({}, baseConfig, {
  plugins: (baseConfig.plugins || []).concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'assets/js/[name].js'
    })
  ])
})

clientConfig.module.rules
  .filter(x => {
    return x.loader === 'vue-loader'
  })
  .forEach(x => {
    x.options.extractCSS = true
  })

clientConfig.plugins.push(
  new ExtractTextPlugin('assets/styles.css')
)

if (process.env.NODE_ENV === 'production') {
  clientConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = clientConfig
