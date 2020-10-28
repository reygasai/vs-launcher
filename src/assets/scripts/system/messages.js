export default class Messages {
    static get defaultTimer() {
        return 5 * 1000;
    }

    static get contentContainer() {
        return this.container.querySelector('.error-content');
    }

    static get container() {
        return document.getElementById("error");
    }

    static get displayClass() {
        return 'display';
    }

    static createList(data) {
        if(document.isDisplayMessageBox === true) {
            return false;
        }

        let list = document.createElement('ul');
        let messages = [''];

        if(!(data instanceof Array)) {
            messages[0] = data;
        } else {
            messages = data;
        }

        messages.forEach(message => {            
            var element = document.createElement('li');
                element.innerHTML = message;

            list.appendChild(element);
        });

        return list;
    }

    static show() {
        this.container.classList.add(this.displayClass);
        document.isDisplayMessageBox = true;

        setTimeout(()=> {
            this.contentContainer.innerHTML = '';
            this.container.classList.remove(this.displayClass);
            document.isDisplayMessageBox = false;
        }, this.defaultTimer);
    }
    
    static send(messages) {
        let list = this.createList(messages);
        
        if(!list) {
            return;
        }

        this.contentContainer.appendChild(list);
        this.show();
    }
}