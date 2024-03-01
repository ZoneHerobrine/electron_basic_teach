const {app ,BrowserWindow, Menu, Tray, globalShortcut, dialog,clipboard } = require('electron');

let mainWindow;

let template = [
    {
        label: 'Clipboard',
        submenu:[
            {
                label: 'Copy to Clipboard',
                click: () => {
                    clipboard.writeText('Hello World');
                }
            }
            ,{
                label: 'Read from Clipboard',
                click: () => {
                    console.log(clipboard.readText());
                }
            }
        ]
    },
    {
        label: 'Dialog',
        submenu:[
            {
                label: 'Show Open Dialog',
                click: () => {
                    dialog.showOpenDialog(mainWindow, {
                        properties: ['openFile', 'multiSelections']
                    }).then(result => {
                        console.log(result.filePaths);
                    });
                }
            },
            {
                label: 'Show Save Dialog',
                click: () => {
                    dialog.showSaveDialog(mainWindow, {
                        title: 'Save your file',
                        defaultPath: 'example.txt',
                        buttonLabel: 'Save',
                        filters: [
                            { name: 'Text Files', extensions: ['txt'] },
                            { name: 'All Files', extensions: ['*'] }
                        ]
                    }).then(result => {
                        console.log(result.filePath);
                    });
                }
            },
            {
                label: 'Show Message Box',
                click: () => {
                    dialog.showMessageBox(mainWindow, {
                        type: 'info',
                        message: 'This is a message box',
                        detail: 'This is some details regarding the message box',
                        buttons: ['Button1', 'Button2'],
                        defaultId: 0
                    }).then(result => {
                        console.log(result);
                    });
                }
            },{
                label: 'Show Error Box',
                click: () => {
                    dialog.showErrorBox('Error Title', 'Error Content');
                }
            }
        ]
    },
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