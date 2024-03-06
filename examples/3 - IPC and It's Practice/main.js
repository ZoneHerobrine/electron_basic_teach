const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
let mainWindow;

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: 'preload.js'
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', ()=>{
    ipcMain.handle('simple-invoke', ()=>{
       dialog.showMessageBox({message: 'Simple Invoke'})
    });
    createMainWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
    })