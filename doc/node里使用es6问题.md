我在引入mysql时遇到，async/await无法使用的问题一直报错。
```
ReferenceError: regeneratorRuntime is not defined
```
根据网上的指引去配置.babelrc。
依然不行，尤其是安装 @babel/plugin-transform-runtime 的时候，说我babel - core核心版本不对。
https://www.kelen.cc/posts/613ac9487dc2a046b257e7f2
https://babeljs.io/docs/en/babel-plugin-transform-runtime#corejs
https://www.cnblogs.com/tw6668/p/11684441.html
```
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```
然后@babel/core又无法指定版本安装。   
暂无思路，遂手动删除所有async/await代码，改为promise形式。

- 收到思路   
和运行中的@babel-runtime 配置没有关系，就是千万千万不要用babel转义主进程中需要使用的js代码。
当我去排查与搜索node中如何转换ES6语法的时候，在 https://webpack.docschina.org/loaders/babel-loader/ 文档。
其中有一段：
```
// 排除不应参与转码的库
// core-js 和 webpack/buildin 如果被 Babel 转码会发生错误。
// 你需要在 babel-loader 中排除它们：
{
  "loader": "babel-loader",
  "options": {
    "exclude": [
      // \\ for Windows, \/ for Mac OS and Linux
      /node_modules[\\\/]core-js/,
      /node_modules[\\\/]webpack[\\\/]buildin/,
    ],
    "presets": [
      "@babel/preset-env"
    ]
  
```
我意识到是不是nodejs不需要转换，强行去转义反而会报错，我尝试排除使用了ES6语法的node模块，结果成功启动。
```
{
    test: /\.js$/,
    use: 'babel-loader',
    exclude: [
      /node_modules/,
      /src[\\\/]main/,
      /src[\\\/]main.js/
    ]
}
```