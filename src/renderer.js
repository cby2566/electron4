/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
// import './renderer/resources/test.scss';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import appVue from "./renderer/app.vue"

// const electron = require('electron')
// import electron from 'electron'
// const ipcRenderer = electron.ipcRenderer;
// console.log('ipcRenderer', electron)
console.log(window.myAPI)
window.myAPI.ipcRenderer.send('ping', 'test')
window.myAPI.on('ping-res', function(event, message){
  console.log('收到:', message)
})

new Vue({
  render: h => h(appVue),
}).$mount('#vue')