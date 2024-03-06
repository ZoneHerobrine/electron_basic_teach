const {ipcRenderer, contextBridge} = require('electron')

contextBridge.exposeInMainWorld('ChildAPI', {
    SimpleInvoke:()=>{
        ipcRenderer.invoke('simple-invoke')
    },
    
    openDialog: async (options) => {
        return await ipcRenderer.invoke('open-dialog', options);
    },
    saveDialog: async (options) => {
        return await ipcRenderer.invoke('save-dialog', options);
    },
    messageBox: async (options) => {
        return await ipcRenderer.invoke('message-box', options);
    },
    readClipboard: async () => {
        return await ipcRenderer.invoke('read-clipboard');
    },
    writeClipboard: async (text) => {
        return await ipcRenderer.invoke('write-clipboard', text);
    }
})
