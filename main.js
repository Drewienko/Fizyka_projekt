//Domyslny plik konfiguracyjny electron, wylaczylem tylko menu i console
const electron = require('electron')

const app = electron.app
const Menu = electron.Menu

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')


let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({width: 1280, height: 720})


  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  }))


  //mainWindow.webContents.openDevTools()


  mainWindow.on('closed', function () {

    mainWindow = null
  })

    Menu.setApplicationMenu(null)
}


app.on('ready', createWindow)


app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {

  if (mainWindow === null) {
    createWindow()
  }
})
