const url = require('url');
const path = require('path');
const remote = require('electron');
const addEditWindow = require('electron').remote.getGlobal('addEditWindow');//Подключение electron к модулю
const mainWindow = require('electron').remote.getGlobal('mainWindow');
const $ = window.jQuery = require('jquery');//Подключение jQuery к модулю

let status = false;
let fullscreenStatus = false;

//Функции показаны для примера
$('#add').click(function(){//Обработка клика по кнопке
  //addEditWindow.show();//Функция открытия
  let win = new remote.remote.BrowserWindow({
    parent: remote.remote.getCurrentWindow(),
    modal: true,
    show: true,
    //frame: false,
    width: 500,
    height: 500
    //icon: iconPath
  });

  win.loadURL(url.format({
    pathname: path.join('../', 'pages/addEditPage.html'),
    //pathname: '../pages/addEditPage.html',
    protocol: 'file',
    slashes: true
  }));
});

$('#minimize').click(function(){
  //addEditWindow.hide();//Функция скрытия
  if(status){
    mainWindow.minimize();
    mainWindow.setFullScreen(false);
    fullscreenStatus = false;
    status = false;
  }
  else {
    mainWindow.maximize();
    //mainWindow.setFullScreen(true);
    //fullscreenStatus = false;
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

function openModal(){

}
