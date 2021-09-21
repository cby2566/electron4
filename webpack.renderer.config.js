const rules = require('./webpack.rules');
const path = require('path')
let fs = require('fs')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },

  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    // 如果确认需要node polyfill，设置resolve.fallback安装对应的依赖
    // fallback: {
    //   crypto: require.resolve('crypto-browserify'),
    //   path: require.resolve('path-browserify'),
    //   vm: require.resolve('vm-browserify'),
    //   url: require.resolve('url'),
    //   buffer: require.resolve('buffer/'),
    //   util: require.resolve('util/'),
    //   stream: require.resolve("stream-browserify"),
    //   fs: false,
    // },
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src'),
    }
  }
};
