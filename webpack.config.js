
//各种相关配置如项目入口
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',

    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
        // {
        //     test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
        //     loader: 'file-loader',
        //     // query: {
        //     //     limit: 8192,
        //     //     name: 'resourse/[name].[ext]'
        //     // },
        //     options: {
        //         name: '[name].[ext]?[hash]'
        //     }
        // },
        // {
        //     test: /\.(woff|woff2|eot|ttf|svg|jpg|png|gif)\??.*$/,
        //     loader: 'url-loader',
        //     query: {
        //         limit: 1,
        //         name: 'resourse/[name].[ext]'
        //     }
        // },
        {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
