写在前面，electron开发对于我们来说的第一个门槛就是安装electron的包，有个zip文件包在国外的服务器上，并且很大。
使用`yarn create electron-app my-new-app --template=webpack`，等了很久，构建多次失败。
切换网络，使用`npx create-electron-app my-new-app --template=webpack`，同样等了很久，构建成功。


- 启动项目  
npm start
`npm run package`: 打包。  
`npm run make`: 打包，同时build出应用程序包  

- 关于打包  
`make`，还可以打多个平台的包，其中就包括win安装程序的包，需要`npm i --save-dev electron-wix-msi`, 然后再在`package.json`里配置。config.forge.makers这个对象。`https://www.electronforge.io/config/makers/wix-msi`.(但是没成功)  
然后在使用`make`打默认的包时，出来的Setup.exe，直接点击会更新+安装，然后同时在桌面上生成快捷方式。  