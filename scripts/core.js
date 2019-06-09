const url = require('url');
const path = require('path');
const electron = require('electron');
//const fs = require('fs');
const addEditWindow = electron.remote.getGlobal('addEditWindow');//Подключение electron к модулю
const mainWindow = electron.remote.getGlobal('mainWindow');
const PATHS = electron.remote.getGlobal('PATHS');//Подключение файла с путями
const $ = window.jQuery = require('jquery');//Подключение jQuery к модулю

const APP_ROOT = electron.remote.getGlobal('APP_ROOT');//Путь к корневой директории

let iconPath = APP_ROOT + PATHS.projectIcon;
//alert(iconPath);

//const PATHS = JSON.parse(fs.readFileSync('paths.json', 'utf8'));

let status = false;
let fullscreenStatus = false;

//Функции показаны для примера
$('#add').click(function(){//Обработка клика по кнопке
  //addEditWindow.show();//Функция открытия
  let win = new electron.remote.BrowserWindow({
    parent: electron.remote.getCurrentWindow(),
    //icon: __dirname + PATHS.projectIcon,
    icon: iconPath,
    modal: true,
    show: true,
    //frame: false,
    width: 500,
    height: 500
    //icon: iconPath
  });

  win.loadURL(url.format({
    pathname: path.join(APP_ROOT, PATHS.addEditPage),
    protocol: 'file',
    slashes: true
  }));
});

//Функция скрытия
$('#minimize').click(function(){
  if(status){
    mainWindow.setFullScreen(false);
    mainWindow.minimize();
    fullscreenStatus = false;
    status = false;
  }
  else {
    mainWindow.maximize();
    status = true;
  }
  console.log('status = ' + status);
  console.log('fullscreenStatus = ' + fullscreenStatus);
});

$('#fullscreen').click(function(){
  if(fullscreenStatus){
    mainWindow.setFullScreen(false);
    fullscreenStatus = false;
  }
  else{
    mainWindow.maximize();
    status = true;
    mainWindow.setFullScreen(true);
    fullscreenStatus = true;
  }
  console.log('status = ' + status);
  console.log('fullscreenStatus = ' + fullscreenStatus);
})
