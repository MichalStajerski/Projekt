const electron = require('electron')
const url = require('url')
const path = require('path')
const { protocol } = require('electron')
// const createLayout = require('./app.js')


const {app,BrowserWindow} = electron
let mainWindow

app.on('ready',function(){
    mainWindow = new BrowserWindow({})
    //loading html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }))
    // mainWindow.loadFile('mainWindow.html')
    
})

