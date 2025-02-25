import { DEFAULT, DEFAULT_SELECT_VERSION_SETTINGS } from './default';
import Messages from './messages';
import Choices from "choices.js";

const FileSystem = require('fs');
const Path = require('path');

class Settings {
    constructor() {
        this.path = Path.resolve(DEFAULT.config.folder, DEFAULT.config.file);
    }

    loadSettings() {
        if(!this.issetFile()) {
            this.createFile();
            return false;
        }
        
        let config = this.getSettingsConfig();
        if(!config) {
            this.createFile(); //Если конфиг не валидный или что-то пошло не так, лучше пересоздать его
            return false;
        }

        return config;
    }

    issetFile() {
        return FileSystem.existsSync(this.path);
    }

    createFile() {            
        FileSystem.open(this.path, 'w', (err, file) => { //Странный способ, но мне похуй
            if (err) {
                throw err;
            }
        });
    }

    getSettingsConfig() {
        let data = FileSystem.readFileSync(this.path, DEFAULT.config.charset);
        if(data.length === 0) {
            return false;
        }

        let localConfig = JSON.parse(data);
        if(!this.validateConfig(localConfig)) {
            return false;
        }

        return localConfig;
    }

    setSettingsConfig(login, password, version) {
        if(!this.issetFile()) {
            this.createFile();
        }

        let schema = DEFAULT.config.schema;

        schema.username = login;
        schema.password = password;
        schema.version = version;
        
        FileSystem.writeFileSync(this.path, JSON.stringify(schema));
    }

    validateConfig(config) {
        if(!(config instanceof Object)) {
            return false;
        }

        let localConfigSize = 0;
        let defaultConfigSize = 0;
        
        var firstCheckConfigSize = false;

        for(let defkey in DEFAULT.config.schema) {
            let match = false;
            defaultConfigSize++;
            
            for(let key in config) {
                if(firstCheckConfigSize !== true) {
                    localConfigSize++;    
                }
                
                if(key === defkey) {
                    match = true;
                }
            }

            if(!match) {
                return false;
            }

            firstCheckConfigSize = true;
        }

        if(defaultConfigSize !== localConfigSize) {
            return false;
        }

        return true;
    }
}

export class User extends Settings {
    constructor() {
        super();

        this.container = document.querySelector('.login-form');

        this.login = this.container.querySelector('label#login input[name="login"]');
        this.password = this.container.querySelector('label#password input[name="password"]');

        this.version = this.container.querySelector('select[name="version"]');
        this.choices = new Choices(document.getElementById('version-select'), DEFAULT_SELECT_VERSION_SETTINGS);

        this.settingsData = this.loadSettings();
    }

    init() {
        this.onFocusTextbox();
        this.onFocusChoices();

        this.buttonHandler();
        
        if(this.settingsData !== false && !(this.settingsData instanceof Boolean)) {
            this.login.value = this.settingsData.username;
            this.password.value = this.settingsData.password;
            this.choices.setChoiceByValue(this.settingsData.version);
        }
    }

    onFocusTextbox() {
        this.container.addEventListener("focusin", () => this.changeFocusTextbox(event));
        this.container.addEventListener("focusout", () => this.changeFocusTextbox(event));
    }

    onFocusChoices() {
        let observerInput = new MutationObserver(mutationRecords => {
            mutationRecords.forEach((mutation) => {
                if(mutation.attributeName == "class") {
                    if(mutation.target.classList.contains("is-focused")) {
                        document.getElementById('version').classList.add('focused');  
                    } else {
                        document.getElementById('version').classList.remove('focused');
                    }
                } 
            })
        },);

        observerInput.observe(document.querySelector('.choices'), {
            attributes: true,
        });
    }

    changeFocusTextbox(event) {
        let parent = event.target.parentElement;
        parent.classList.toggle('focused');
    }

    saveUserData() {
        let errorMessages = [];

        let login = this.login.value;
        if(login.match("^(\\w|-){1,16}$") === null || login.length < 3) {
            errorMessages.push('Поле с ником введено не верно!');
        }

        let password = this.password.value;
        if(password.match("^(\\w|-){1,16}$") === null) {
            errorMessages.push('Поле с паролем введено не верно!');
        }

        let version = this.choices.getValue(true);

        if(errorMessages.length > 0) {
            errorMessages.push("Не используйте спецсимволы/латиницу в полях");
            Messages.send(errorMessages);
            
            errorMessages = [];
            return;
        }

        return this.setSettingsConfig(login, password, version);
    }

    buttonHandler() {
        let button = this.container.querySelector('button#start-button');
        button.addEventListener('click', (event) => {
            let target = event.target;

            this.saveUserData();
        });
    }
}