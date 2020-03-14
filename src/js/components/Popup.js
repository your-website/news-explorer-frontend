
import { TITLE_LOGIN, TITLE_REGISTRATION, PARAGRAPH_LOGIN, PARAGRAPH_REGISTRATION, SUCCESS } from '../constants/titleForm';

class Popup {
    constructor(container, buttonClose) {
        this.container = container;
        this.container.addEventListener('click', this.close.bind(this));

        this.contentParagraph = this.container.querySelector('.form-authorization__span_log');
        this.contentParagraph.addEventListener('click', this.setContent.bind(this));

        this.successParagraph = this.container.querySelector('.form-authorization__paragraph_success')
        this.successParagraph.addEventListener('click', this.open.bind(this));
        
        this.inputs = this.container.querySelectorAll('.form-authorization__container');

        this.submit = this.container.querySelector('.form-authorization__submit');

        document.addEventListener('keydown', this.close.bind(this));

        this.buttonClose = buttonClose;
        this.buttonClose.addEventListener('click', this.close.bind(this));

        this.inputNameContainer = this.container.querySelector('.form-authorization__container_registration');
    }

    setContent() {
        this.contentTitle = this.container.querySelector('.authorization__content-title');
        if(this.contentParagraph.textContent === PARAGRAPH_LOGIN) {
            this.contentParagraph.textContent = PARAGRAPH_REGISTRATION;
            this.contentTitle.textContent = TITLE_REGISTRATION;
            this.inputNameContainer.style.display = 'flex';
        } else {
            this.contentParagraph.textContent = PARAGRAPH_LOGIN;
            this.contentTitle.textContent = TITLE_LOGIN;
            this.inputNameContainer.style.display = 'none';
        }
    }

    open() {
        this.contentTitle = this.container.querySelector('.authorization__content-title');
        const paragraph = this.container.querySelector('.form-authorization__paragraph');
        this.submit.style.display = 'block';
        this.successParagraph.style.display = 'none';
        paragraph.style.display = 'block'
        this.contentParagraph.textContent = PARAGRAPH_REGISTRATION;
        Array.from(this.inputs).forEach((item) => {
            item.style.display = 'flex';
        });
        this.container.style.display = 'flex';
        this.setContent();
    }

    close(event) {
        const valueContainer = this.container.classList.value;
        const valueButtonClose = this.buttonClose.classList.value;
        const eventValue = event.target.classList.value;
        if (eventValue === valueContainer || 
            eventValue === valueButtonClose || 
            eventValue === `${valueContainer}__svg` || 
            eventValue === `${valueContainer}__path` ||
            event.key === "Escape") 
            {
                this.container.style.display = 'none';
        }
    }

    submitOk() {
        this.container.style.display = 'none';
    }

    success() {
        this.contentTitle = this.container.querySelector('.authorization__content-title');
        const submit = this.container.querySelector('.form-authorization__submit');
        const paragraph = this.container.querySelector('.form-authorization__paragraph');
        this.submit.style.display = 'none';
        this.successParagraph.style.display = 'block';
        paragraph.style.display = 'none'
        this.contentTitle.textContent = SUCCESS;
        Array.from(this.inputs).forEach((item) => {
            item.style.display = 'none';
        });
    }
}

export default Popup;