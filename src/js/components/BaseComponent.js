class BaseComponent {
    constructor() {
    }

    _setHandlers(event, handler) {
        handler.forEach(element => {
            element.name.addEventListener(event, element.handler);
        });
    }
}

export default BaseComponent;