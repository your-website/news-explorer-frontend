const authorization__svg = document.querySelector('.authorization__svg');
const authorization = document.querySelector('.authorization');
const header__button = document.querySelector('.header__button');
const authorization__span = document.querySelector('.authorization__span');
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

function openPopUp() {
    form.style.display = 'flex';
    authorization.style.display = 'flex';
    authorization__container_registration.style.display = 'none';
    authorization__span.textContent = 'Зарегистрироваться';
    formAuthorization__submit.classList.add('form-authorization__submit_disabled');
    authorization__contentTitle.textContent = 'Войти';
    authorization__paragraph_success.style.display = 'none';
    authorization__paragraph.style.display = 'block';
    submit.setAttribute('disabled', true);
    password.value = '';
}

function closePopUp() {
    authorization.style.display = 'none';
}

function changePopUp() {
    password.value = '';
    submit.setAttribute('disabled', true);
    if (authorization__span.textContent === 'Зарегистрироваться') {
        authorization__container_registration.style.display = 'flex';
        authorization__span.textContent = 'Войти';
        authorization__contentTitle.textContent = 'Регистрация';
    } else {
        authorization__container_registration.style.display = 'none';
        authorization__span.textContent = 'Зарегистрироваться';
        authorization__contentTitle.textContent = 'Войти';
    }
}

document.addEventListener('click', function(event) {
    if (event.target.classList.value === 'authorization') {
        closePopUp();
    }
});

authorization__svg.addEventListener('click', closePopUp);
header__button.addEventListener('click', openPopUp);
authorization__span.addEventListener('click', changePopUp);
authorization__paragraph_success.addEventListener('click', openPopUp);


email.addEventListener('input', submitDisabled);
password.addEventListener('input', submitDisabled);
name.addEventListener('input', submitDisabledPlusName);

form.addEventListener('submit', function () {
    event.preventDefault();
    success();
});