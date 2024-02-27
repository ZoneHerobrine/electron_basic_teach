const {app ,BrowserWindow, Menu, Tray, globalShortcut } = require('electron');

let mainWindow;

let template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Window',
                accelerator: 'CmdOrCtrl+N',
                click: () => {
                    createMainWindow();
                }
            },
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                click: () => {
                    mainWindow.close();
                }
            }
        ]
    },{
        label: 'Edit',
        submenu: [
            {
                label: 'Undo',
                role: 'undo'
            },
            {
                label: 'Redo',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: 'Cut',
                role: 'cut'
            },
            {
                label: 'Copy',
                role: 'copy'
            },
            {
                label: 'Paste',
                role: 'paste'
            }
        ]
    }]

let trayMenu = Menu.buildFromTemplate([
    {
        label: 'Quit',
        click: () => {
            app.quit();
        }
    }
]);

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function createMainWindow(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools();
}

app.on('ready', ()=>{
    createMainWindow();
    const tray = new Tray('miku200.png');
    tray.setContextMenu(trayMenu);
    tray.setToolTip('My Electron App');
    globalShortcut.register('CmdOrCtrl+Y', () => {
        mainWindow.show();
    });
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('will-quit',()=>{
    globalShortcut.unregisterAll();
})