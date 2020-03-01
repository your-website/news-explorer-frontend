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

const name = form.elements.name;
const password = form.elements.password;
const email = form.elements.email;
const formAuthorization__error_name = document.querySelector('.form-authorization__error_name');
const formAuthorization__error_email = document.querySelector('.form-authorization__error_email')
const formAuthorization__error_passwrod = document.querySelector('.form-authorization__error_password');
const validator = require('validator');

function validateEmail() {
    if (!validator.isEmail(email.value)) {
        formAuthorization__error_email.style.display = 'block';
        return false;
    } else {
        formAuthorization__error_email.style.display = 'none';
        return true;
    }
}

function validatePassword() {
    if (!validator.isLength(password.value, {min:2, max: undefined})) {
        formAuthorization__error_passwrod.style.display = 'block';
        return false;
    } else {
        formAuthorization__error_passwrod.style.display = 'none';
        return true;
    }
}

function validateName() {
    if (validator.isEmpty(name.value)) {
        formAuthorization__error_name.style.display = 'block';
        return false;
    } else {
        formAuthorization__error_name.style.display = 'none';
        return true;
    }
}

function success() {
    form.style.display = 'none';
    authorization__contentTitle.textContent = 'Пользователь успешно зарегистрирован!';
    authorization__paragraph_success.style.display = 'block';
    authorization__paragraph.style.display = 'none';
};


form.addEventListener('submit', function () {
    event.preventDefault();
    if (authorization__container_registration.style.display === 'flex') {
        if (validateEmail() && validatePassword() && validateName()) {
            success();
        } else return
    } else if (validateEmail() && validatePassword()) {
        success();
    } else return;
});

function openPopUp() {
    form.style.display = 'flex';
    authorization.style.display = 'flex';
    authorization__container_registration.style.display = 'none';
    authorization__span.textContent = 'Зарегистрироваться';
    formAuthorization__submit.classList.add('form-authorization__submit_disabled');
    authorization__contentTitle.textContent = 'Войти';
    authorization__paragraph_success.style.display = 'none';
    authorization__paragraph.style.display = 'block';
}

function closePopUp() {
    authorization.style.display = 'none';
}

function changePopUp() {

    if (authorization__span.textContent === 'Зарегистрироваться') {
        authorization__container_registration.style.display = 'flex';
        authorization__span.textContent = 'Войти';
        formAuthorization__submit.classList.remove('form-authorization__submit_disabled');
        authorization__contentTitle.textContent = 'Регистрация';
    } else {
        authorization__container_registration.style.display = 'none';
        authorization__span.textContent = 'Зарегистрироваться';
        formAuthorization__submit.classList.add('form-authorization__submit_disabled');
        authorization__contentTitle.textContent = 'Войти';
    }
    
}

authorization__svg.addEventListener('click', closePopUp);
header__button.addEventListener('click', openPopUp);
authorization__span.addEventListener('click', changePopUp);
authorization__paragraph_success.addEventListener('click', openPopUp);