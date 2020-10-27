/* Подключаем стили к проекту */
import './assets/styles/main.scss';

/* Подключаем js-логику к проекту */
import Login from './assets/scripts/system/login';
import News from './assets/scripts/system/news';

const login = new Login
login.init();

const news = new News;
news.init();