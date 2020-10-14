/* global __dirname */
const path = require('path');
const webpack = require('webpack');
const Fiber = require('fibers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// webpack 配置
module.exports = {
  mode: 'production',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../../static'), // 出口目录，dist文件
    publicPath: "../",
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].chunk.[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]-[hash:base64:10]',
                getLocalIdent: (context, localIdentName, localName) => {
                  const path = context._module.context;
                  if (/^((?!node_modules).)*(src){1}.*(components){1}.*$/.test(path)) {
                    return;
                  } else {
                    return localName;
                  }
                },
              },
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'), // 使用dart-sass去编译
              fiber: Fiber // 同步的库，使用dart-sass同步编译的速度是异步编译的2倍
            }
          }, {
            loader: 'sass-resources-loader', // 全局scss变量插件
            options: {
              resources: path.join(__dirname, '../src/styles/variable.scss')
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]-[hash:base64:10]',
                getLocalIdent: (context, localIdentName, localName) => {
                  const path = context._module.context;
                  if (/^((?!node_modules).)*(src){1}.*(components){1}.*$/.test(path)) {
                    return;
                  } else {
                    return localName;
                  }
                },
              },
            },
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        // use: [{
        //   loader: "style-loader"
        // }, {
        //   loader: "css-loader", options: {
        //     sourceMap: true
        //   }
        // }, {
        //   loader: "less-loader",
        //   options: {
        //     lessOptions: {
        //       javascriptEnabled: true,
        //     },
        //     sourceMap: true
        //   }
        // }]
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]-[hash:base64:10]',
                getLocalIdent: (context, localIdentName, localName) => {
                  const path = context._module.context;
                  if (/^((?!node_modules).)*(src){1}.*(components){1}.*$/.test(path)) {
                    return;
                  } else {
                    return localName;
                  }
                },
              },
            },
          },
          "postcss-loader",
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#0743b0',
                  'link-color': '#0743b0',
                  'breadcrumb-height': '30px',
                  'breadcrumb-shadow': 'none'
                },
                javascriptEnabled: true,
              },
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出的路径
            limit: 10 * 1024 // <10kb 使用base64
          }
        }
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: "@svgr/webpack",
          options: {
            icon: true
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
    alias: {
      '@root': path.resolve(__dirname, '../'),
      '@src': path.resolve(__dirname, '../', 'src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/template.html',
      filename: 'index.html',
      favicon: "./favicon.ico"
    }),
    new CleanWebpackPlugin({ verbose: true }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[contenthash].css"
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production')
    }),
    new CompressionPlugin({
      test: new RegExp(
        '\\.(js|css)$' // 压缩 js 与 css
      )
    })
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: [
      // 压缩js
      new TerserPlugin({
        parallel: true
      }),
      // 压缩css
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
