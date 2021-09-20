`electron-forge`框架是集成了webpack，但是想使用vue和ui框架还是要手动构建开发环境。  
- Vue  
为了使用 Vue 单文件组件，我们需要对 .vue 文件进行处理，使用 vue-loader。  
首先安装 vue-loader、css-loader、vue-style-loader 和 vue-template-compiler，后者也是必不可少的，少了会报错。  
```
npm i vue-loader css-loader vue-style-loader vue-template-compiler -D
```
到这步，我出现了两个错误。第一个问题是，要转ES6的文件在此项目中使用。由于electron是有node环境一些内置语法可以使用，所以很容易误认为已经转义了。

- 转ES6  
首先安装 babel-loader、babel-preset-env 和 babel-core。需要注意的是，如果你的 babel-loader 是 7.x 版本的话，你的 babel-core 必须是 6.x 版本；如果你的 babel-loader 是 8.x 版本的话，你的 babel-core 必须是 7.x 版本。如果不这样的话，Webpack 会报错。  
```
npm i babel-loader@7 babel-core babel-preset-env -D
```
然后在 webpack.rules.js 的 配置中 中新增如下对象：
```
{
  test: /\.js$/,
  use: 'babel-loader',
  exclude: /node_modules/
}
```
我们还需要添加一个配置文件（.babelrc）在根目录下：
```
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }]
  ]
}
```
这就是 babel-preset-env 的作用，帮助我们配置 babel。我们只需要告诉它我们要兼容的情况（目标运行环境），它就会自动把代码转换为兼容对应环境的代码。  

---

然后第二个问题是，关于加载.css的。我开始以为是 css-loader 版本不对。我将其指定版本重新安装了。结果还是不行
```
npm install css-loader@5.0.2 -D

// 报错 - 错误备份
Electron Forge was terminated:
ModuleBuildError: Module build failed (from ./node_modules/vue-loader/lib/loaders/stylePostLoader.js):
```
在排查问题期间我还发现，忘记装vue。`npm install vue`

- style-loader  
最后我在查看文档及对比`sass`引入顺序时，定位到原因是由于第一步安装对应`Loader`时，缺少了`style-loader`。导致webpack无法装载css文件。



