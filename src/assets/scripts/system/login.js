import {UserManager} from './utils';

export default class LoginForm {
    constructor() {
        this.container = document.querySelector('.login-form');
    }

    init() {
        this.onFocusTextbox();
        let abc = new UserManager;
        abc.defaultFolderCreate();
    }

    onFocusTextbox() {
        this.container.addEventListener("focusin", () => this.changeFocusTextbox(event));
        this.container.addEventListener("focusout", () => this.changeFocusTextbox(event));
    }

    changeFocusTextbox(event) {
        if(event.target.tagName === 'INPUT') {
            let parent = event.target.parentElement;
            parent.classList.toggle('focused');
        }
    }
}