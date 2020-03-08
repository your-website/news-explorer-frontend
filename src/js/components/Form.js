const authorization__container_registration = document.querySelector('.authorization__container_registration');
const formAuthorization__submit = document.querySelector('.form-authorization__submit');
const authorization__contentTitle = document.querySelector('.authorization__content-title');
const authorization__paragraph = document.querySelector('.authorization__paragraph');
const authorization__paragraph_success = document.querySelector('.authorization__paragraph_success');
const form = document.forms.authorization;
const submit = form.elements.submit;
const name = form.elements.name;
const password = form.elements.password;
const email = form.elements.email;
const formAuthorization__error_name = document.querySelector('.form-authorization__error_name');
const formAuthorization__error_email = document.querySelector('.form-authorization__error_email')
const formAuthorization__error_passwrod = document.querySelector('.form-authorization__error_password');
const validator = require('validator');
const formSearch = document.forms.search;
const search = formSearch.elements.search;
const submitSearch = formSearch.elements.submit;
const formSearch__error = document.querySelector('.form-search__error');


class Form {
    constructor() {

    }

    setServerError() {

    }

    _validateInputElement() {

    }

    _validateForm() {

    }

    _clear() {

    }

    _getInfo() {
        
    }
}


function submitDisabled() {
    if (authorization__container_registration.style.display === 'flex') {
        submitDisabledPlusName();
        return;
    }
    if (!validateEmail() || !validatePassword()) {
        formAuthorization__submit.classList.add('form-authorization__submit_disabled');
    } else {
        formAuthorization__submit.classList.remove('form-authorization__submit_disabled');
    }
}

function submitDisabledPlusName() {
    if (!validateEmail() || !validatePassword() || !validateName()) {
        formAuthorization__submit.classList.add('form-authorization__submit_disabled');
    } else {
        formAuthorization__submit.classList.remove('form-authorization__submit_disabled');
    }
}

function validateEmail() {
    if (!validator.isEmail(email.value)) {
        formAuthorization__error_email.style.display = 'block';
        submit.setAttribute('disabled', true);
        return false;
    } else {
        formAuthorization__error_email.style.display = 'none';
        submit.removeAttribute ('disabled');
        return true;
    }
}

function validatePassword() {
    if (!validator.isLength(password.value, {min:2, max: undefined})) {
        formAuthorization__error_passwrod.style.display = 'block';
        submit.setAttribute('disabled', true);
        return false;
    } else {
        formAuthorization__error_passwrod.style.display = 'none';
        submit.removeAttribute ('disabled');
        return true;
    }
}

function validateName() {
    if (validator.isEmpty(name.value)) {
        formAuthorization__error_name.style.display = 'block';
        submit.setAttribute('disabled', true);
        return false;
    } else {
        formAuthorization__error_name.style.display = 'none';
        submit.removeAttribute ('disabled');
        return true;
    }
}

function success() {
    form.style.display = 'none';
    authorization__contentTitle.textContent = 'Пользователь успешно зарегистрирован!';
    authorization__paragraph_success.style.display = 'block';
    authorization__paragraph.style.display = 'none';
};

function validate() {
    if (validator.isEmpty(search.value)) {
        formSearch__error.style.display = 'block';
        submitSearch.setAttribute('disabled', true);
    } else {
        formSearch__error.style.display = 'none';
        submitSearch.removeAttribute ('disabled');
    }

}

search.addEventListener('input', validate);
search.addEventListener('focus', validate);

formSearch.addEventListener('submit', function () {
    event.preventDefault();
});

email.addEventListener('input', submitDisabled);
password.addEventListener('input', submitDisabled);
name.addEventListener('input', submitDisabledPlusName);

form.addEventListener('submit', function () {
    event.preventDefault();
    success();
});