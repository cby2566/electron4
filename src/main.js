const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const sqlTode = require('./main/sqlTode.js');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      plugins: true,
      javascript: true,
      webSecurity: false,
      contextBridge: true,
      preload: path.join(__dirname, './test.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  return mainWindow
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on('ping', (event, args) => {
  console.log('ping', args)
  // app.webContents.send('ping-res', '答复')
  event.reply('ping-res', '答复')
})

ipcMain.handle('some-name', (event, someArgument) => {
  console.log(2222, someArgument)
  return '主程序值test'
})

ipcMain.on('allSelect', function (event, arg) {
  console.log('allSelect')
  // 这里传表名
  let result = sqlTode.allSelect('old_table')
  console.log('result：');
  result.then((res) => {
    console.log(typeof res)
    console.log(res);
    event.reply('allSelect-res', JSON.stringify(res))
  })
});

ipcMain.on('allSelect2', async function  (event, arg) {
  console.log('allSelect2')
  // 这里传表名
  let result = await sqlTode.allSelect('old_table')
  console.log(result)
  event.reply('allSelect-res', JSON.stringify(result))
});

