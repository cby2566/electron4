// 测试预加载模块
// var electron2 = window.electron
const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('myAPI', {
  desktop: true, ipcRenderer, on(eventName, callback) {
    ipcRenderer.on(eventName, callback)
  },
  removeAllListeners(channel) {
    ipcRenderer.removeAllListeners(channel)
  },
  
})
