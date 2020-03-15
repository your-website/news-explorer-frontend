class BaseComponent {
    constructor(handlers) {
        this.handlers = handlers;
    }

    _setHandlers(event) {
        this.handlers.forEach(element => {
            element.name.addEventListener(event, element.handler);
        });
    }
}

export default BaseComponent;