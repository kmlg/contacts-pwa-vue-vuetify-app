const path = require('path')
const webpack = require('webpack')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const StringReplacePlugin = require('string-replace-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const config = require('../config/' + (process.env.NODE_ENV || 'development') + '.js')

const commonPlugins = [
  new StringReplacePlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(config.nodeEnv),
    'PRODUCTION': config.isProduction
  }),
  new StyleLintPlugin({
    files: ['src/**/*.scss'] // ['src/**/*.vue', 'src/**/*.scss']
  })
]

module.exports = {
  devtool: config.isProduction
    ? false
    : 'inline-source-map',

  entry: {
    app: './src/entry-client.js'
  },

  node: {
    fs: "empty"
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: config.isProduction ? '/' : '/dist/',
    filename: 'js/[name].[chunkhash:16].js'
  },

  resolve: {
    alias: {
      'assets': path.resolve(__dirname, '../assets'),
      'src': path.resolve(__dirname, '../src'),
      '@': path.resolve(__dirname, '../src'),
      'components': path.resolve(__dirname, '../src/components'),
      'images': path.resolve(__dirname, '../src/images'),
      'router': path.resolve(__dirname, '../src/router'),
      'store': path.resolve(__dirname, '../src/store'),
      'services': path.resolve(__dirname, '../src/services'),
      'styles': path.resolve(__dirname, '../src/styles'),
      'mixins': path.resolve(__dirname, '../src/mixins'),
      'middleware': path.resolve(__dirname, '../src/middleware'),
      'views': path.resolve(__dirname, '../src/views'),
      'config': path.resolve(__dirname, `../config/${process.env.NODE_ENV}`)
    },
    extensions: ['.js', '.vue', '.scss']
  },
  resolveLoader: {
    alias: {
      'scss-loader': 'sass-loader'
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
          postcss: [
            require('autoprefixer')({ browsers: ['last 3 versions'] }),
            require('cssnano')
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:16].[ext]'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000'
      }
    ]
  },

  performance: {
    maxEntrypointSize: 250000,
    hints: config.isProduction ? 'warning' : false
  },

  plugins: config.isProduction ? commonPlugins : commonPlugins.concat([
    new FriendlyErrorsPlugin()
  ])
}
