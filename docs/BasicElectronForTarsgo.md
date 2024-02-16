

# 1 - Quick Start
## Electron基本原理
- 三大法宝：Node.js - V8 - NativeAPI
- 两大进程： Main - Render

## 环境配置
- 由于npm在安装electron的时候能不能下载下来纯属看脸，所以这里推荐用yarn下载更加稳定
- 为了方便动态调试，我们推荐安装一下nodemon这个库


```bash
npm install yarn
npm install -g nodemon
yarn add electron
```


## 编写package.json
添加运行指令即可（记得加逗号）

```json
"start": "electron ."
"electron": "nodemon --watch main.js --exec yarn start"
```

## 编写index.html

## 编写main.js


## 总结：最简三步走
- 初始化三步走
    - yarn add electron
    - 写package.json和index.html
    - 写main.js
- main.js 三步走
    - createMainWindow
    - ready
    - window-all-closed



# 2 - Basic Functions

- BroswerWindow
- Devtools
- Shortcut
- Menu
- Dialog
- Notification
- Clipboard


# 3 - Practice of Customic Window




# 4 - IPC und It's Practice

- IPC 原理