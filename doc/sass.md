- sass-loader  
为了避免反复犯错误，我认为`ass-loader`应该单独用一个文档来记录步骤。
```
// npm install --save-dev sass
// npm install --save-dev sass-loader@7.x
// 注意安装的版本
```
首先是指定版本安装；我原本以为要锁版本，结果直接能用。
在webpack.rules加上配置。
顺便记录一下，目前加的所有配置都算是渲染进程的配置(webpack.renderer.config.js)。所以我才能够把`new VueLoaderPlugin()`写在此文件中，千万不要将其和渲染进程的配置弄混。
```
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
```
或许是我记错了，当使用到node-sass时才需要针对版本严格要求。