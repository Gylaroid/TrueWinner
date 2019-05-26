const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');

let mainWindow;
let controlWindow;
let inputWindow;
let historyWindow;
let addEditWindow;
let applyWindow;

//Главное окно
function createMainWindow(){
  mainWindow = new BrowserWindow({
    icon: __dirname + '/img/icon.png',
    fullscreen: true
  });

  mainWindow.setMenu(null);

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainPage.html'),
    protocol: 'file',
    slashes: true
  }));

  //win1.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null
  });
}

//окно управления
function createControlWindow(){
  controlWindow = new BrowserWindow({
    width: 700,
    height: 500,
    icon: __dirname + '/img/icon.png'
  });

  //controlWindow.setMenu(null);

  controlWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'controlPage.html'),
    protocol: 'file',
    slashes: true
  }));

  //win2.webContents.openDevTools();

  controlWindow.on('closed', () => {
    controlWindow = null
  });
}

//Окно ввода баллов
function createInputWindow(){
  inputWindow = new BrowserWindow({
    parent: controlWindow,
    modal: true,
    show: false,
    frame: false,
    width: 200,
    height: 300,
    icon: __dirname + '/img/icon.png'
  });

  inputWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'inputPage.html'),
    protocol: 'file',
    slashes: true,
  }));
}

//Окно истории
function createHistoryWindow(){
  historyWindow = new BrowserWindow({
    parent: controlWindow,
    modal: true,
    show: false,
    width: 500,
    height: 700,
    icon: __dirname + '/img/icon.png'
  });

  historyWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'historyPage.html'),
    protocol: 'file',
    slashes: true
  }));
}

//Окно добавления/изменения команд
function createAddEditWindow(){
  addEditWindow = new BrowserWindow({
    parent: controlWindow,
    modal: true,
    show: false,
    //frame: false,
    width: 500,
    height: 500,
    icon: __dirname + '/img/icon.png'
  });

  addEditWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addEditPage.html'),
    protocol: 'file',
    slashes: true
  }));
}

//Окно потдверждения
function createApplyWindow(){
  applyWindow = new BrowserWindow({
    parent: controlWindow,
    modal: true,
    show: false,
    frame: false,
    transparent: true,
    width: 330,
    height: 330,
    icon: __dirname + '/img/icon.png'
  });

  applyWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'applyPage.html'),
    protocol: 'file',
    slashes: true
  }));
}

app.on('ready', createMainWindow);
app.on('ready', createControlWindow);
app.on('ready', createInputWindow);
app.on('ready', createHistoryWindow);
app.on('ready', createAddEditWindow);
app.on('ready', createApplyWindow);

app.on('window-all-closed', () => {
  app.quit();
});
