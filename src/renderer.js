/* css */
import './assets/styles/main.scss';

/* js */
const { remote, app } = require('electron')
import { DEFAULT } from './assets/scripts/system/default';
import { User } from './assets/scripts/system/user';

/* Выводим случайное сообщение из DEFAULT конфига */
let descriptionContainer = document.getElementById("description");
descriptionContainer.innerHTML = DEFAULT.description[Math.floor(Math.random() * DEFAULT.description.length)];

/* Грузим юзерменджер с конфиглоадером внутри */
const userManager = new User;
userManager.init();

/* Закрываем и скрываем приложение */
let closeButton = document.getElementById("close-window");
closeButton.addEventListener('click', () => {
    remote.getCurrentWindow().close();
});

let hideButton = document.getElementById("hide-window");
hideButton.addEventListener('click', () => {
    remote.getCurrentWindow().minimize();
});

/* Тест новых селектов */
import Choices from "choices.js";

const example = new Choices(document.getElementById('version-select'), {
    sorter: function(a, b) {
      return b.label.length - a.label.length;
    },
});
