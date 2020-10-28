/* css */
import './assets/styles/main.scss';

/* js */
const { remote, app, shell} = require('electron')

import { DEFAULT } from './assets/scripts/system/default';
import { User } from './assets/scripts/system/user';
import News from './assets/scripts/system/news';

/* Выводим случайное сообщение из DEFAULT конфига */
let descriptionContainer = document.getElementById("description");
descriptionContainer.innerHTML = DEFAULT.description[Math.floor(Math.random() * DEFAULT.description.length)];

/* Грузим юзерменджер с конфиглоадером внутри */
const userManager = new User;
userManager.init();

/* Грузим новости */
const newsManager = new News;
newsManager.init();

/* Закрываем и скрываем приложение */
let closeButton = document.getElementById("close-window");
closeButton.addEventListener('click', () => {
    remote.getCurrentWindow().close();
});

let hideButton = document.getElementById("hide-window");
hideButton.addEventListener('click', () => {
    remote.getCurrentWindow().minimize();
});

/* Обрабатываем все кнопки с атрибутом link как ссылки и открываем их в другом браузере*/
document.querySelector('#app').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.hasAttribute('link')) {
        shell.openExternal(event.target.getAttribute('link'));
    }
});