~~遇到棘手的问题，webpack 5.0剥离了node核心包，导致electron的ipc通信无法使用，暂未找到解决方案。~~


已找到解决方案。以下记录排查过程。    
当我在渲染进程的renderer.js引入electron。首先是提示`require`无法使用等问题。    
我在mian.js主进程配置，用于前台使用node语法，如下：
```
const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // 允许node
    }
  });
```
然后报错：
```
Module not found: Error: Can't resolve 'path' in 'E:\work_work\project3\electron4\node_modules\electron'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
        - add a fallback 'resolve.fallback: { "path": require.resolve("path-browserify") }'
        - install 'path-browserify'
If you don't want to include a polyfill, you can use an empty module like this:
        resolve.fallback: { "path": false }

Electron Forge was terminated:
ModuleNotFoundError: Module not found: Error: Can't resolve 'fs' in 'E:\work_work\project3\electron4\node_modules\electron',ModuleNotFoundError: Module not found: Error: Can't resolve 'path' in 'E:\work_work\project3\electron4\node_modules\electron'lectron4\node_modules\electron'

```
根据报错指引我排查，electron-forge所构建的项目，最新版使用的组合搭配是：`electron 14.0.1` + `webpack 5.37.0`。    
搜索各个网站的electronForge相关问题，结果`stackoverflow`上都只有7提问，而回答更是寥寥无几。（冷门框架...）。   
遍历git上的的相关项目，结果大多数人都是只有一两个commit（就一个创建，启动，没了）。只有一个ts-react的，我参考了一下`https://github.com/koakh/TypescriptElectronForgeReactStarter`，当我正疑惑为什么他可以在渲染进程里直接引入electron，才发现这个项目是旧版本的electron-forge，使用的是webpack 4，我心里就凉了半截。
随后我又将角度伸向webpack 5查看是否有突破口，正如报错信息中所指的。我去翻阅webpack 5的全部文档，虽然移除了node核心，但还是可使用polyfill垫片的方式兼容。
`https://blog.csdn.net/qq_39807732/article/details/110089893`
```
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "./"
  },
  target: "web",
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      url: require.resolve("url"),
      buffer: require.resolve("buffer/"),
      util: require.resolve("util/"),
      stream: require.resolve("stream-browserify/")
    },
    alias: {
      "nanoid/non-secure": path.resolve(
        __dirname,
        "../node_modules/nanoid/non-secure/index.js"
      )
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
      filename: "index.html"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_DEBUG": JSON.stringify(false)
      // Buffer: JSON.stringify(require("buffer/").Buffer)
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"]
    })
  ]
}
```
其中fallback项是关键，我逐个安装了依赖。顺利运行，减少了很多报错。
然还是报错说，fs模块未找到。我就去npm上找浏览器可以用的fs包。大失所望，只有一个7年前更新的。   
我按照之前的方式将fs模块引入。果不其然还是不行。     

---

当我决定放弃这electron-forge，使用旧的`electron/electron-quick-start`来构建。我选择了之前我曾搭建的用`electron/electron-quick-start`的一个项目。准备在它的基础上搭建。
把不需要的模块剥离，然后当做基础框架来写。   
但是我发现我当时居然是在html上引入的electron。
```
<body>
    <div id="app"></div>
    <script>
        // require('electron-connect').client.create();//用于热加载
        var electron = require('electron')
        var ipcRenderer = electron.ipcRenderer;
        var fs = require("fs");
        var path = require('path');
        var mysql = require('mysql');
    </script>
    <script src="./dist/build.js"></script>
</body>
```
于是我使用webpack 4 的方式想在渲染进程中使用node。也就是把上面的代码移动到renderer.js。
`https://blog.csdn.net/otter1010/article/details/104603168/`
```
// 如果关于fs，tls，net等组件Can’t resolve 的情况，该安装的包都安装了但是还是报错，可以尝试在webpack.config.js文件里添加上：
node: {
	fs: 'empty',
	net:'empty',
	tls:'empty',
}
```
结果居然不可以用！查阅文档发现可以使用预加载的方式引入的electron。
```
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      plugins: true,
      javascript: true,
      webSecurity: false,
      preload: path.join(__dirname, './renderer.js'), // 预加载js
    }
  });
```
报错。提示说不可以在预加载js中引入外部脚本。报错行数定位在我的`import Vue from "vue";`。   
`Unable to load preload script`。   
于是继续查阅资料 翻看文档。   
我想到可以在根目录建一个`test.js`把它挂载上去。实践后可行，且挂载的js运行顺序在最开始。然后我在test.js中使用`window.obj = 123;`，然后在渲染进程中获取。   
结果没获取到，是`undefined`。   
```
preload: path.join(__dirname, './test.js'), // 预加载js
```
继续查阅资料 翻看文档。   
是electron将脚本进行了安全隔离，可以使用contextBridge在预加载脚本和渲染进程脚本直接进行交互。   
成功了。
```
// test.js
const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('myAPI', {desktop: true})
// renderer.js
console.log(window.myAPI)
```
以上。

---

到这里，茅塞顿开意识到最开始或许并不是 webpack 5 导致问题的最根本的原因，而且新版 `electron` 隔离的上下文的策略导致的。   
遂切换到`electron-forge`项目实践想法，成功。





---

ipcRenderer.on

https://stackoverflow.com/questions/66913598/ipcrenderer-on-is-not-a-function

https://stackoverflow.com/questions/59993468/electron-contextbridge

