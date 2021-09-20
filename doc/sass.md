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

- file-loader  
使用图片音频等静态资源时，也需要配置loader。在webpack.rules添加对应配置即可。先要按照，可用。  
```
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
```
要配置当文件大于多少MB时，才转base64，也是在此处配置。   
在引入UI框架之前还有一步，就是为各种字体文件添加配置。因为各个UI框架他们自带了一下后缀为ttf的文字文件。需要webpack识别并打包。
```
{
  test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
  use: [ {loader: 'file-loader'} ]
},
```


- element-ui  
在渲染函数中引入他的css报错，暂无法解决
```
import 'element-ui/lib/theme-chalk/index.css';

///
Electron Forge was terminated:
ModuleBuildError: Module build failed (from ./node_modules/css-loader/dist/cjs.js):
CssSyntaxError

(1:4) E:\work_work\project3\electron4\src\index.css Unknown word

> 1 | // style-loader: Adds some css to the DOM by adding a <style> tag
    |    ^
  2 |
  3 | // load the styles
```
但我发现scss格式 是可以引入的。所以我就用这种方式先引入element了
```
<style lang="scss" scoped>
@import 'element-ui/lib/theme-chalk/index.css';
```
