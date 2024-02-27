const {app, BrowserWindow} = require('electron');

let mainWindow;

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    show:false
});

  mainWindow.loadFile('index.html');
    // mainWindow.loadURL('https://ciallo.cc');
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  } );
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createMainWindow);
// app.whenReady().then(createMainWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
