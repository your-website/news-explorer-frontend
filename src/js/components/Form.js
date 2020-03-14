const validator = require('validator');

class Form {
    constructor(from) {
        this.form = from;
        this.formTitle = this.form.classList.value;

        this.submit = this.form.querySelector(`.${this.formTitle}__submit`);

        this.validateEmail = false;
        this.validatePassword = false;
        this.validateName = false;
        this.validateSearch = false;
    }

    setServerError() {

    }

    _validateIsEmail() {
        this.inputEmail = this.form.querySelector(`.${this.formTitle}__input_email`);
        this.inputEmailError = this.form.querySelector(`.${this.formTitle}__error_email`);
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
        this.inputPassword = this.form.querySelector(`.${this.formTitle}__input_password`);
        this.inputPasswordError = this.form.querySelector(`.${this.formTitle}__error_password`);
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

    _validateName(person) {
        this.inputName = this.form.querySelector(`.${this.formTitle}__input_name`);
        this.inputNameError = this.form.querySelector(`.${this.formTitle}__error_name`);
        const name = 'name';
        if (person) {
            this.inputNameError.style.display = 'block';
            this.submit.setAttribute('disabled', true);
            this.validateName = false;
        } else {
            this.inputNameError.style.display = 'none';
            this.submit.removeAttribute ('disabled');
            this.validateName = true;
        }
        this._validateForm(name);
    }

    _validateSearch() {
        this.inputSearch = this.form.querySelector(`.${this.formTitle}__input_search`);
        this.inputSearchError = this.form.querySelector(`.${this.formTitle}__error_search`);
        const search = 'search';
        if (validator.isEmpty(this.inputSearch.value)) {
            this.inputSearchError.style.display = 'block';
            this.submit.setAttribute('disabled', true);
            this.validateSearch = false;
        } else {
            this.inputSearchError.style.display = 'none';
            this.submit.removeAttribute ('disabled');
            this.validateSearch = true;
        }
        this._validateForm(search);
    }

    _validateForm(props) {
        this.inputNameContainer = this.form.querySelector(`.${this.formTitle}__container_registration`);
        if (props === 'search') {
            
        } else if (props === 'name') {
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

    }

    _getInfo() {
        
    }
}

export default Form;