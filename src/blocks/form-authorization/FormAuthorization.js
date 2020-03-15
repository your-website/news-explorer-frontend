
import { TITLE_LOGIN, TITLE_REGISTRATION, PARAGRAPH_LOGIN, PARAGRAPH_REGISTRATION, SUCCESS } from '../../js/constants/titleForm';
import BaseComponent from '../../js/components/BaseComponent';
const validator = require('validator');

class FormAuthorization {
    constructor(container, buttonClose, form) {
        this.container = container;
        this.form = form;
        this.formTitle = this.form.classList.value;

        this.contentParagraph = this.container.querySelector('.form-authorization__span_log');
        this.successParagraph = this.container.querySelector('.form-authorization__paragraph_success')
        this.inputsContainer = this.container.querySelectorAll('.form-authorization__container');
        this.submit = this.container.querySelector('.form-authorization__submit');
        this.buttonClose = buttonClose;
        this.inputs = document.querySelectorAll('.form-authorization__input');
        this.inputNameContainer = this.container.querySelector('.form-authorization__container_registration');

        this.inputEmail = this.form.querySelector(`.${this.formTitle}__input_email`);
        this.inputEmailError = this.form.querySelector(`.${this.formTitle}__error_email`);
        this.inputPassword = this.form.querySelector(`.${this.formTitle}__input_password`);
        this.inputPasswordError = this.form.querySelector(`.${this.formTitle}__error_password`);
        this.inputName = this.form.querySelector(`.${this.formTitle}__input_name`);
        this.inputNameError = this.form.querySelector(`.${this.formTitle}__error_name`);

        this.inputServerError = this.form.querySelector(`.${this.formTitle}__error_server`);

        this.validateEmail = false;
        this.validatePassword = false;
        this.validateName = false;

        this.errorServer = false;

        const elementHandlersInput = [ 
            {
                name: this.inputEmail,
                handler: this._validateIsEmail.bind(this)
            },
            {
                name: this.inputPassword,
                handler: this._validatePassword.bind(this)
            },
            {
                name: this.inputName,
                handler: this._validateName.bind(this)
            }
        ];
        
        const inputHandlers = new BaseComponent(elementHandlersInput);

        const elementHandlersClick = [ 
            {
                name: this.container,
                handler: this.close.bind(this)
            },
            {
                name: this.contentParagraph,
                handler: this.setContent.bind(this)
            },
            {
                name: this.successParagraph,
                handler: this.open.bind(this)
            },
            {
                name: this.buttonClose,
                handler: this.close.bind(this)
            }
        ];
        const clickHandlers = new BaseComponent(elementHandlersClick);

        const elementHandlersKeydown = [ 
            {
                name: document,
                handler: this.close.bind(this)
            }
        ];
        const keydownHandlers = new BaseComponent(elementHandlersKeydown);

        inputHandlers._setHandlers('input');
        clickHandlers._setHandlers('click');
        keydownHandlers._setHandlers('keydown');
    }

    setContent() {
        this.form.reset();
        this.validateEmail = false;
        this.validatePassword = false;
        this.validateName = false;
        this._validateForm();
        this.contentTitle = this.container.querySelector('.authorization__content-title');
        if(this.contentParagraph.textContent === PARAGRAPH_LOGIN) {
            this.contentParagraph.textContent = PARAGRAPH_REGISTRATION;
            this.contentTitle.textContent = TITLE_REGISTRATION;
            this.inputNameContainer.style.display = 'flex';
            this.submit.textContent = PARAGRAPH_LOGIN;
        } else {
            this.contentParagraph.textContent = PARAGRAPH_LOGIN;
            this.contentTitle.textContent = TITLE_LOGIN;
            this.inputNameContainer.style.display = 'none';
            this.submit.textContent = PARAGRAPH_REGISTRATION;
        }
    }

    open() {
        this.form.reset();
        this.contentTitle = this.container.querySelector('.authorization__content-title');
        const paragraph = this.container.querySelector('.form-authorization__paragraph');
        this.submit.style.display = 'block';
        this.successParagraph.style.display = 'none';
        paragraph.style.display = 'block'
        this.contentParagraph.textContent = PARAGRAPH_REGISTRATION;
        Array.from(this.inputsContainer).forEach((item) => {
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
        const paragraph = this.container.querySelector('.form-authorization__paragraph');
        this.submit.style.display = 'none';
        this.successParagraph.style.display = 'block';
        paragraph.style.display = 'none'
        this.contentTitle.textContent = SUCCESS;
        Array.from(this.inputsContainer).forEach((item) => {
            item.style.display = 'none';
        });
    }

    disabledForm(data) {
        if (data) {
            Array.from(this.inputs).forEach((item) => {
                item.setAttribute('disabled', true);
            });
            this.submit.setAttribute('disabled', true);
        } else {
            Array.from(this.inputs).forEach((item) => {
                item.removeAttribute('disabled');
            });
            this.submit.removeAttribute ('disabled');
        }
    }

    setServerError(errorServer, string) {
        this.errorServer = errorServer;
        if (this.errorServer) {
            this.inputServerError.style.display = 'block';
            this.inputServerError.textContent = string;
        } else this.inputServerError.style.display = 'none';
    }

    _validateIsEmail() {
        this._clear();
        if (validator.isEmail(this.inputEmail.value) || this.inputEmail.value === '') {
            this.inputEmailError.style.display = 'none';
            this.submit.removeAttribute ('disabled');
            this.validateEmail = true;
        } else {
            this.inputEmailError.style.display = 'block';
            this.submit.setAttribute('disabled', true);
            this.validateEmail = false;
        }
        this._validateForm();
    }

    _validatePassword() {
        this._clear();
        if (validator.isLength(this.inputPassword.value, {min:8, max: undefined}) || this.inputPassword.value === '') {
            this.inputPasswordError.style.display = 'none';
            this.submit.removeAttribute ('disabled');
            this.validatePassword = true;
        } else {
            this.inputPasswordError.style.display = 'block';
            this.submit.setAttribute('disabled', true);
            this._validateForm(false)
            this.validatePassword = false;
        }
        this._validateForm();
    }

    _validateName() {
        this._clear();
        if (validator.isEmpty(this.inputName.value)) {
            this.inputNameError.style.display = 'block';
            this.submit.setAttribute('disabled', true);
            this.validateName = false;
        } else {
            this.inputNameError.style.display = 'none';
            this.submit.removeAttribute ('disabled');
            this.validateName = true;
        }
        this._validateForm();
    }

    _validateForm() {
        this._clear();
        if (this.inputNameContainer.style.display === 'flex') {
            if (this.validateEmail && this.validatePassword && this.validateName) {
                this.submit.classList.remove('form-authorization__submit_disabled');
            } else {
                this.submit.classList.add('form-authorization__submit_disabled');
            }
        } else {
            if (this.validateEmail && this.validatePassword) {
                this.submit.classList.remove('form-authorization__submit_disabled');
            } else {
                this.submit.classList.add('form-authorization__submit_disabled');
            }
        }
    }

    _clear() {
        this.errorServer = false;
        this.setServerError();
    }
}

export default FormAuthorization;