const electron = require('electron');

export const DEFAULT = {
    description: [
        "Купи лицуху!",
        "Теперь банановый",
        "На electron!",
        "Пиратство - плохо!",
        "Первый раз пишу программу на JS!",
        "Инструменты можно делать из обсидиана",
        "Что будет после осени?",
        "О всех багах сообщайте никуда",
        "Мы старались, но получилось это..",
        "Cделано после рабочих будней!"
    ],

    config: {
        folder: (electron.app || electron.remote.app).getPath('userData'),
        file: "settings.json",
        charset: "UTF-8",
        schema: {
            username: '',
            password: '',
            version: ''
        }
    }
};