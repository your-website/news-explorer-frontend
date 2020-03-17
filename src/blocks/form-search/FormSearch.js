const validator = require('validator');
import BaseComponent from '../../js/components/BaseComponent';

import { ENTER__KEY__WORDS } from '../../js/constants/error';

class FormSearch extends BaseComponent {
    constructor(form) {
        super();
        this.form = form;
        this.formTitle = this.form.classList.value;
        this.submit = this.form.querySelector(`.${this.formTitle}__submit`);
        this.inputSearchError = this.form.querySelector(`.${this.formTitle}__error_search`);
        this.errorServer = false;
        this.inputSearch = this.form.querySelector(`.${this.formTitle}__input_search`);

        this.elementHandlersInput = [ 
            {
                name: this.inputSearch,
                handler: this._validateSearch.bind(this)
            }
        ];
        this._setHandlers('input', this.elementHandlersInput);
    }

    setServerError(errorServer, string) {
        this.errorServer = errorServer;
        if (this.errorServer) {
            this.inputSearchError.style.display = 'block';
            this.inputSearchError.textContent = string;
        } else {
            this.inputSearchError.textContent = ENTER__KEY__WORDS;
            this.inputSearchError.style.display = 'none';
        }
    }

    _validateSearch() {
        this._clear();
        if (validator.isEmpty(this.inputSearch.value)) {
            this.inputSearchError.style.display = 'block';
            this.submit.setAttribute('disabled', true);
        } else {
            this.inputSearchError.style.display = 'none';
            this.submit.removeAttribute ('disabled');
        }
    }

    _clear() {
        this.errorServer = false;
        this.setServerError();
    }

    _getInfo() {
        
    }

    disabledForm(data) {
        if (data) {
            this.inputSearch.setAttribute('disabled', true);
            this.submit.setAttribute('disabled', true);
        } else {
            this.inputSearch.removeAttribute('disabled');
            this.submit.removeAttribute ('disabled');
        }
    }
}

export default FormSearch;