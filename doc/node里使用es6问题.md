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