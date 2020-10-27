export default class LoginForm {
    constructor() {
        this.container = document.querySelector('.login-form');
    }

    init() {
        console.log(this.container);
        this.onFocusTextbox();
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