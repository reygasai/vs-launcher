/* Подключаем стили к проекту */
import './assets/styles/main.scss';

/* Подключаем js-логику к проекту */
import LoginForm from './assets/scripts/system/loginform';
import News from './assets/scripts/system/news';

const loginform = new LoginForm
loginform.init();

const news = new News;
news.init();