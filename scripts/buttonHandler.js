const addEditWindow = require('electron').remote.getGlobal('addEditWindow');//Подключение electron к модулю
const $ = window.jQuery = require('jquery');//Подключение jQuery к модулю

//Функции показаны для примера
$('#add').click(function(){//Обработка клика по кнопке
  addEditWindow.show();//Функция открытия
});

$('#minimize').click(function(){
  addEditWindow.hide();//Функция скрытия
});
