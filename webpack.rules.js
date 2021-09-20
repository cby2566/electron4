module.exports = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules\/.+\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  // es6转义
  {
    test: /\.js$/,
    use: 'babel-loader',
    exclude: /node_modules/
  },
  // 引入vue单文件
  {
    test: /\.css$/,
    use: ["style-loader", 'vue-style-loader', 'css-loader']
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader'
  },
  // vue end

  {
    // 处理预编译的css
    // 处理sass
    test: /\.s[ac]ss$/i,
    use: [
      // 将 JS 字符串生成为 style 节点
      "style-loader",
      // 将 CSS 转化成 CommonJS 模块
      "css-loader",
      // 将 Sass 编译成 CSS
      "sass-loader",
    ],
  },

  {
    test: /\.(png|jpg|gif)$/i,
    use: [
      // 要选择对应的loader
      {
        // url是将图像转成base64
        loader: 'url-loader',
        // file是将图像打包发送过去
        // loader: 'file-loader',

      },
    ],
  },

  // Put your webpack loader rules in this array.  This is where you would put
  // your ts-loader configuration for instance:
  /**
   * Typescript Example:
   *
   * {
   *   test: /\.tsx?$/,
   *   exclude: /(node_modules|.webpack)/,
   *   loaders: [{
   *     loader: 'ts-loader',
   *     options: {
   *       transpileOnly: true
   *     }
   *   }]
   * }
   */
];
