const electron = require('electron')
// app对象
const app = electron.app
// 定义窗口
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')


// 定义一个全局window对象，不然窗口会被关闭（js Garbage Collection）
let mainWindow;
// 默认打开debug页面的flag；
// const debug = (process.argv.indexOf("--debug")>=0) 
// 创建窗口
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})
  // 默认打开开发者工具
  // if (debug) {
  //   mainWindow.webContents.openDevTools()
  //   mainWindow.maximize()
  //   //require('devtron').install()
  // } //openDevTool
  // 确定路径加载index.html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// electron准备好后创建窗口
app.on('ready', createWindow)

// 退出时关闭
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

