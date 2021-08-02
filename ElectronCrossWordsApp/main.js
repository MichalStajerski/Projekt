const electron = require('electron')
const url = require('url')
const path = require('path')
const { app, BrowserWindow } = electron
let mainWindow

app.on('ready', function () {
  // preferences added so require('fs') works
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  // loading html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file',
    slashes: true
  }))
  // mainWindow.loadFile('mainWindow.html')
})
