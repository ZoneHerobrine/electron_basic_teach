# Electron框架入门


- P1 Quick Start
  - 基本原理
  - 构建Electron项目
- P2 Basic Functions
  - 窗口-菜单-快捷键
  - 通知-剪切板-文件窗口
- P3 IPC und It's Practice
  - IPC通信原理 - invoke - handle
  - 应用 - 右键菜单 - 新建子窗口
- P4 Practice of Customic Window
  - 顶部布局
  - 最小化-最大化-关闭



# P1 Quick Start


## Electron基本原理
- 三个组分
- 两大进程
## 构建一个Electron项目
- 三步走


## 框架概念
Electron 框架能使用 Web 技术（HTML, CSS, JavaScript）为三大操作系统（Windows, macOS, Linux）构建跨平台的桌面应用程序。


## 三大组分
1. Chromium V8
2. Node.js
3. NativeAPI


## 主进程与渲染进程
Electron应用基于两种进程：
- **主进程** (Main Process)
- **渲染进程** (Renderer Process)

主进程管理Web页面和相应的渲染进程

而渲染进程负责在`BrowserWindow`中渲染Web页面。


### 主进程

- 负责应用生命周期、窗口管理、系统事件的监听和响应。
- 可以直接调用Node.js和Electron的API。
- 使用`BrowserWindow`创建和管理窗口。


### 渲染进程

- 每个`BrowserWindow`实例都有其独立的渲染进程。
- 负责页面的交互逻辑和UI渲染。
- 出于安全考虑，默认无法直接访问Node.js的API。


## 环境配置
- 由于npm在安装electron的时候能不能下载下来纯属看脸，所以这里推荐用yarn下载更加稳定
- 为了方便动态调试，我们推荐安装一下nodemon这个库

```bash
npm install yarn
npm install -g nodemon
```

- 然后进入我们创建好的项目文件夹
```bash
npm init
yarn add electron
```


## 编写package.json
添加运行指令即可（记得加逗号）

```json
"start": "electron ."
"electron": "nodemon --watch main.js --exec yarn start"
```

写好main.js之后在终端输入`yarn electron`即可运行项目

---
## 编写index.html
简单写一个就行


## 编写main.js
```javascript
const { app, BrowserWindow } = require('electron');

let mainWindow;

function createMainWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  // 并且为你的应用加载index.html
  mainWindow.loadFile('index.html');
}

app.on('ready',createMainWindow)
//app.whenReady().then(createMainWindow); // 也是可行的

app.on('window-all-closed',app.quit())
```


## 总结：最简三步走
- 初始化三步走
    - yarn add electron
    - 写package.json和index.html
    - 写main.js
- main.js 三步走
    - createMainWindow
    - ready
    - window-all-closed


## 1.3 生命周期

Electron的生命周期主要围绕几个核心事件和概念展开，主要可分为三类：
1. 应用初始化： ready、window-all-closed、activate
2. 窗口管理：create、close、minimize、maximize
3. 应用退出：before-quit、will-quit、quit

---
```javascript
app.on('ready',createMainWindow)
mainWindow.on('close', () => {
  mainWindow = null;
});
```


1. **应用初始化（App Initialization）**：
    - `app`模块是控制Electron应用生命周期的核心。`app`事件包括：
        - `ready`：当Electron初始化完成，并准备创建浏览器窗口时触发。大多数应用在此事件后创建窗口。
        - `window-all-closed`：当所有窗口都被关闭时触发。在MacOS上，应用及其菜单通常保持激活，直到用户明确通过Cmd + Q退出。
        - `activate`：当应用被激活（例如，点击应用的图标）时触发，常用于在应用已打开窗口被全部关闭后重新创建窗口。


2. **窗口管理（Window Management）**：
    - 使用`BrowserWindow`类来创建和管理应用窗口。每个`BrowserWindow`实例运行在自己的渲染进程中。
    - 窗口事件如`close`, `minimize`, `maximize`可以用来管理窗口状态或在窗口关闭前执行清理任务。


3. **应用退出（App Termination）**：
    - `before-quit`：在应用开始关闭窗口之前触发。
    - `will-quit`：当所有窗口已关闭，应用即将退出时触发，此时可以执行最终的清理任务。
    - `quit`：当应用退出时触发。


在开发Electron应用时，合理管理这些事件和状态对于保证应用的稳定性和响应性非常重要。

例如，你可能希望
1. 在`ready`事件触发后立即加载或初始化应用的主界面，
2. 在`window-all-closed`事件中根据操作系统的不同处理应用退出的逻辑等。

通过细致地管理这些生命周期事件，可以构建出既高效又用户友好的桌面应用。


## 优雅地显示窗口

https://www.electronjs.org/zh/docs/latest/api/browser-window


总结：参照官方文档或者借助GPT解决需求

1. 法一：隐藏窗口，等到ready-to-show再显示
  - 适合加载较快的项目
2. 法二：立即显示，预设使窗口的背景颜色与页面的背景颜色一致
  - 适合加载较慢的项目


# P2 Basic Functions

- 窗口设置
- 菜单-托盘-快捷键
- 通知-会话-剪切板


### 2.1 窗口


#### 窗口属性

窗口的常见属性可分为几个常见的大类：

如长宽、位置、显示、行为、样式、父子关系等

```javascript
mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true
    }
});

```


- 长宽
  - width-height - 设置窗口的宽度和高度
  - minWidth-minHeight - 设置窗口的最小宽度和高度
  - maxWidth-maxHeight - 设置窗口的最大宽度和高度
- 位置
  - x-y - 设置窗口生成的x和y坐标
- 显示
  - show-hide - 显示或隐藏窗口
  - isVisible - 设置窗口是否可见


- 行为
  - resizable - 设置窗口是否可调整大小
  - movable - 设置窗口是否可移动
  - minimizable - 设置窗口是否可最小化
  - maximizable - 设置窗口是否可最大化
  - closable - 设置窗口是否可关闭
  - alwaysOnTop - 设置窗口是否总是在最顶层
  - fullscreen - 设置窗口是否全屏 
  - fullscreenable - 设置窗口是否可全屏
  - kiosk - 设置窗口是否启用kiosk模式，kiosk模式下窗口将全屏并且无法退出


- 样式
  - icon - 设置窗口的图标
  - title - 设置窗口的标题
  - backgroundColor - 设置窗口的背景颜色
  - transparent - 设置窗口是否透明
  - frame - 设置窗口是否有边框
- 父子关系
  - parent - 设置窗口的父窗口
  - modal - 设置窗口是否为模态窗口


#### webPreferences

webPreferences的常见配置可分为几个大类：

如node集成、安全性、缓存、界面设置等，

下面仅列举讲解一些常用的配置项。


- node集成
  - nodeIntegration - 设置是否集成Node.js
  - contextIsolation - 设置是否启用上下文隔离
  - preload - 设置预加载脚本
- 安全性
  - sandbox - 设置是否启用沙箱
  - enableRemoteModule - 设置是否启用remote模块（新版已移除）


- 缓存
  - webSecurity - 设置是否启用web安全
  - allowRunningInsecureContent - 设置是否允许运行不安全的内容
  - session - 设置Session
- 界面设置
  - devTools - 设置是否启用开发者工具
  - zoomFactor - 设置缩放因子
  - scrollBounce - 设置是否启用弹性滚动
  - enableLargerThanScreen - 设置是否允许窗口大于屏幕
  - spellcheck - 设置是否启用拼写检查


以下是一个复杂窗口的创建示例：

```javascript
const { app, BrowserWindow } = require('electron');

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    maxWidth: 1200,
    maxHeight: 900,
    x: 100,
    y: 100,
    show: false,
    resizable: true,
    movable: true,
    minimizable: true,
    maximizable: true,
    closable: true,
    alwaysOnTop: false,
    fullscreen: false,
    fullscreenable: true,
    kiosk: false,
    title: 'Electron App',
    backgroundColor: '#fff',
    transparent: false,
    frame: true,
    parent: null,
    modal: false,
    menu: null,
    icon: null,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
    }
  });
  mainWindow.loadFile('index.html');
  mainWindow.show();
}

app.on('ready',createMainWindow)

app.on('window-all-closed',app.quit())

```


### 2.2 菜单


在Electron中，菜单能够通过`Menu`类来创建和管理。

- Menu
  - 用于创建菜单栏、上下文菜单和子菜单。
  - 方法
    - buildFromTemplate-setApplicationMenu


代码实现主要分为四步：
1. 引入模块
2. 写菜单模板
3. 创建菜单
4. 设置菜单


常见的菜单项设置有
- label - 设置菜单项的标签
- submenu - 设置菜单项的子菜单
- accelerator - 设置菜单项的快捷键
- click - 设置菜单项的点击事件


- type - 设置菜单项的类型
  - normal-separator-checkbox-radio
- role - 设置菜单项的角色（一些常见预设）
  - copy-paste-cut-selectall
  - undo-redo-quit-about
  - reload-zoomin-zoomout
  - minimize-close
  - front-back


```javascript
// 1. 引入模块
const { Menu } = require('electron');

// 2. 写菜单模板
  const template = [
    {
      // 子菜单项
      label: 'File',
      submenu: [
        {
          // 常规菜单项
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            console.log('New File');
          }
        },
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            console.log('Open File');
          }
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            console.log('Save File');
          }
        },
        {
          // 分隔符
          type: 'separator'
        },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          // 预设菜单项
          role: 'copy'
        },
        {
          role: 'paste'
        }
      ]
    }
  ];
// 3. 创建菜单
  const menu = Menu.buildFromTemplate(template);
// 4. 设置菜单
  Menu.setApplicationMenu(menu);
```


### 2.3 托盘


在Electron中，托盘能够通过`Tray`类来创建和管理。

- Tray
  - 用于创建和管理系统托盘图标。
  - 属性
    - title-tooltip-icon
    - contextMenu
  - 方法
    - setToolTip-setContextMenu


代码实现主要分为五步：
1. 引入模块
2. 创建托盘
3. 创建托盘菜单
4. 设置托盘菜单
5. 设置托盘提示


```javascript
// 1. 引入模块
const {Menu, Tray } = require('electron');
// 2. 创建托盘
  const tray = new Tray('icon.png');
  
// 3. 创建托盘菜单
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Item1',
      type: 'normal',
      click: () => {
        console.log('Item1 clicked');
      }
    },
    {
      label: 'Item2',
      type: 'normal',
      click: () => {
        console.log('Item2 clicked');
      }
    },
    {
      label: 'Item3',
      type: 'normal',
      click: () => {
        console.log('Item3 clicked');
      }
    }
  ]);
// 4. 设置托盘菜单
  tray.setContextMenu(trayMenu);
// 5. 设置托盘提示
  tray.setToolTip('This is my application.');

```


### 2.4 快捷键


在Electron中，快捷键能够通过`globalShortcut`模块来注册和注销。

- globalShortcut
  - 用于注册和注销全局快捷键。
  - 方法
    - register-unregister-isRegistered


代码实现上主要分为三部分：
1. 引入模块
2. 注册快捷键
3. 注销快捷键
  
```javascript
// 1. 引入模块
const { globalShortcut } = require('electron');

// 2. 注册快捷键
  globalShortcut.register('CmdOrCtrl+Shift+I', () => {
    mainWindow.webContents.openDevTools();
  });

// 3. 注销快捷键 ,推荐在will-quit注销
  globalShortcut.unregister('CmdOrCtrl+Shift+I');
  // 也可以偷懒一点直接注销全部
  globalShortcut.unregisterAll();

```


### 2.5 通知


在Electron中，通知能够通过`Notification`类来创建和管理。

- Notification
  - 用于创建和管理系统通知。
  - 属性
    - title-body-icon-tag
    - timeoutType-silent-requireInteraction
  - 方法
    - onclick-onshow-onerror-onclose


Notification类的使用不需要require，直接使用即可。

```javascript
let myNotification = new Notification('孩子', {
    body: '这并不不好笑',
    icon: 'icons/kobi.jpg',
    tag: 'unique-tag', 
    timeoutType : 'default',
    silent: true, 
    requireInteraction: true, 
});

```


### 2.6 会话


在Electron中，文件窗口能够通过`dialog`模块来打开和保存文件。

- dialog
  - 用于打开和保存文件。
  - 属性
    - title-defaultPath-buttonLabel-filters-properties
  - 方法
    - showOpenDialog-showSaveDialog-showMessageBox


- 配置属性
  - title - 设置标题
  - defaultPath - 设置默认路径
  - buttonLabel - 设置按钮标签
  - filters - 设置文件类型
  - properties - 设置文件属性


```javascript
const { dialog } = require('electron');

  dialog.showOpenDialog({
    title: 'Open File',
    defaultPath: '.',
    buttonLabel: 'Open',
    filters: [
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile', 'multiSelections']
  }).then(result => {
    console.log(result.filePaths);
  });

  dialog.showSaveDialog({
    title: 'Save File',
    defaultPath: '.',
    buttonLabel: 'Save',
    filters: [
      { name: 'All Files', extensions: ['*'] }
    ]
  }).then(result => {
    console.log(result.filePath);
  });

  dialog.showMessageBox({
    title: 'Message',
    message: 'Hello, Electron!',
    type: 'info',
    buttons: ['OK']
  }).then(result => {
    console.log(result.response);
  });
```


### 2.7 剪切板


在Electron中，剪切板能够通过`clipboard`模块来读写剪切板内容。

- clipboard
  - 用于读写剪切板内容。
  - 属性
    - availableFormats
  - 方法
    - readText-writeText
    - readHTML-writeHTML
    - readImage-writeImage


引入clipboard模块后，就可以开始读写剪切板了

```javascript
const { clipboard } = require('electron');

clipboard.writeText('Hello, Electron!');
clipboard.readText();

```


# P3 IPC und It's Practice

### 进程间通信（IPC）

- **ipcMain** 和 **ipcRenderer** 模块支持主进程和渲染进程之间的通信。
- 主进程使用`ipcMain`接收和发送消息。
- 渲染进程使用`ipcRenderer`发送消息并接收回复。

---


#### IPC示例：主进程
```javascript
// 使用ipcMain接收渲染进程的消息
const { ipcMain } = require('electron');

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg);  // 打印消息
  event.reply('asynchronous-reply', 'pong');  // 回复渲染进程
})

```

---
#### IPC示例：渲染进程
```javascript
// 使用ipcRenderer发送消息到主进程并接收回复
const { ipcRenderer } = require('electron');

ipcRenderer.send('asynchronous-message', 'ping');
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg);  // 打印主进程的回复
})

```
---


### 总结

- Electron应用的强大功能源自于主进程和渲染进程的协作。
- 通过IPC机制，两种进程可以有效地通信，实现复杂的应用逻辑。