const electron = require('electron')
const url = require('url')
const path = require('path')
const { protocol } = require('electron')
// const createLayout = require('./app.js')



const {app,BrowserWindow} = electron
let mainWindow
app.on('ready',function(){
    //preferences added so require('fs') works
    mainWindow = new BrowserWindow({webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    }})
    //loading html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }))
    // mainWindow.loadFile('mainWindow.html')
    
})

