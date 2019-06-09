const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');
const fs = require('fs');
global.APP_ROOT = path.resolve(__dirname);
global.PATHS = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/paths.json'), 'utf8'));

//let mainWindow;
let controlWindow;
let inputWindow;
let historyWindow;
let applyWindow;

//let iconPath = __dirname + '/img/icon.png'; //Путь к иконке
//let iconPath = __dirname + '/img/g1085.png'; //Путь к иконке
let iconPath = __dirname + global.PATHS.projectIcon;

//Главное окно
function createMainWindow(){
  global.mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true, },
    icon: iconPath,
    //icon: '../img/g1085.png',
    width: 800,
    height: 600
  });

  global.mainWindow.setMenu(null);

  global.mainWindow.loadURL(url.format({
    pathname: path.join(APP_ROOT, PATHS.mainPage),
    protocol: 'file',
    slashes: true
  }));

  //win1.webContents.openDevTools();

  global.mainWindow.on('closed', () => {
    mainWindow = null
  });
}

//окно управления
function createControlWindow(){
  global.controlWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true, },
    width: 700,
    height: 500,
    icon: iconPath
  });

  global.controlWindow.loadURL(url.format({
    pathname: path.join(APP_ROOT, PATHS.controlPage),
    protocol: 'file',
    slashes: true
  }));



  global.controlWindow.on('closed', () => {
    controlWindow = null
  });
  global.controlWindow.webContents.openDevTools();
  //controlWindow.setMenu(null);
}

//Окно ввода баллов
function createInputWindow(){
  inputWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true, },
    parent: controlWindow,
    modal: true,
    show: false,
    frame: false,
    width: 200,
    height: 300,
    icon: iconPath
  });

  inputWindow.loadURL(url.format({
    pathname: path.join(APP_ROOT, PATHS.inputPage),
    protocol: 'file',
    slashes: true,
  }));
}

//Окно истории
function createHistoryWindow(){
  historyWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true, },
    parent: controlWindow,
    modal: true,
    show: false,
    width: 500,
    height: 700,
    icon: iconPath
  });

  historyWindow.loadURL(url.format({
    pathname: path.join(APP_ROOT, PATHS.historyPage),
    protocol: 'file',
    slashes: true
  }));
}

//Окно добавления/изменения команд
function createAddEditWindow(){
  global.addEditWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true, },
    parent: controlWindow,
    modal: true,
    show: false,
    //frame: false,
    width: 500,
    height: 500,
    icon: iconPath
  });

  global.addEditWindow.loadURL(url.format({
    pathname: path.join(APP_ROOT, PATHS.addEditPage),
    protocol: 'file',
    slashes: true
  }));
}

//Окно потдверждения
function createApplyWindow(){
  applyWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true, },
    parent: controlWindow,
    modal: true,
    show: false,
    frame: false,
    transparent: true,
    width: 330,
    height: 330,
    icon: iconPath
  });

  applyWindow.loadURL(url.format({
    pathname: path.join(APP_ROOT, PATHS.applyPage),
    protocol: 'file',
    slashes: true
  }));
}

app.on('ready', createMainWindow);
app.on('ready', createControlWindow);
//app.on('ready', createInputWindow);
//app.on('ready', createHistoryWindow);
//app.on('ready', createAddEditWindow);
//app.on('ready', createApplyWindow);

app.on('window-all-closed', () => {
  app.quit();
});
