const electron = require('electron')
const Menu =electron.Menu;// 获取菜单对象
// app对象
const app = electron.app
// 定义窗口
const BrowserWindow = electron.BrowserWindow
const {export_file, open_file, save_as, save_file} = require('./operation');
const path = require('path')
const url = require('url')

const menuTemplate = [
  {
    label:"文件",
    submenu:[
      
      {
        label: '打开',
        accelerator: 'CommandOrControl+O',
        click: open_file
      },
      {
        label: '保存',
        accelerator: "CommandOrControl+S",
        click: save_file
      },
      {
        label: '另存为',
        accelerator: "CommandOrControl+Shift+S",
        click: save_as
      },
      {
        type: 'separator'
      },
      {
        label: 'Export',
        submenu: [
          {
            label: 'JSON',
            click: export_file
          },
          {
            label: 'Plain Text',
            click: export_file
          },
          {
            label: 'Markdown',
            click: export_file
          },
          {
            label: 'SVG',
            click: export_file
          },
          {
            label: 'PNG',
            click: export_file
          }
        ]
      },
      {
        type: 'separator'
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'F12',
        click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
      },
    ],
   
  }
  
]

// 定义一个全局window对象，不然窗口会被关闭（js Garbage Collection）
let mainWindow;
// 默认打开debug页面的flag；
// const debug = (process.argv.indexOf("--debug")>=0) 
// 创建窗口
// console.log(Menu);
var menu = Menu.buildFromTemplate(menuTemplate);
function createWindow () {
  // Create the browser window.
  Menu.setApplicationMenu(menu);
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

