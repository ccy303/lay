const path = require('path');
const webpack = require('webpack');
const cfg = require('./index');
console.log(path.join(__dirname, '../dist'));
module.exports = {
  mode: 'development',
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: path.join(__dirname, '../dist'), // 出口目录，dist文件
    publicPath: "/dist/",
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
        use: [
          "style-loader",
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
          },
          {
            loader: "style-resources-loader",
            options: {
              patterns: path.resolve(__dirname, '../src/styles/variable.less')
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
  plugins: [
    // new BundleAnalyzerPlugin()
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development')
    })
  ],
  resolve: {
    // 自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
    extensions: ['.js', '.json', '.css'],
    alias: {
      '@root': path.resolve(__dirname, '../'),
      '@src': path.resolve(__dirname, '../', 'src')
    }
  },
  devServer: {
    port: cfg.webport, // 端口
    host: 'localhost',
    hot: true,
    // historyApiFallback: {
    //   disableDotRule: true
    // },
    // compress: true,
    // // 反代配置
    // proxy: {
    //   '/admin': {
    //     target: cfg.apiHost,
    //     changeOrigin: true
    //   }
    // }
  }
};
