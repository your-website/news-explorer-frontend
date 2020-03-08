import Header from './Header';
import NewsCard from './NewsCard';
import MainApi from '../api/MainApi';
const newsCard = new NewsCard();
const mainApi = new MainApi();
const header = new Header('red');

mainApi.getUserData();

const form = document.forms.authorization;
const submit = form.elements.submit;
const authorization__container_registration = document.querySelector('.authorization__container_registration');
const authorization__contentTitle = document.querySelector('.authorization__content-title');
const authorization__paragraph = document.querySelector('.authorization__paragraph');
const authorization__paragraph_success = document.querySelector('.authorization__paragraph_success');
const menu__item_toggle = document.querySelector('.menu__item_toggle');

class Popup {
    constructor(container, headerButtonLogin, headerButtonExit, contentSpan) {
        this.container = container;
        this.headerButtonLogin = headerButtonLogin;
        this.headerButtonExit = headerButtonExit;

        this.contentSpan = contentSpan;

        this.containerToggle = document.querySelector(container);

        this.openPopUp = this.openPopUp.bind(this);
        this.close = this.close.bind(this);
        this.setContent = this.setContent.bind(this);
        this.changeButton = this.changeButton.bind(this);
        this.login = this.login.bind(this);

        this.popupOpenLogin = document.querySelector(this.headerButtonLogin)
        this.popupOpenLogin.addEventListener('click', this.changeButton);
        
        this.popupOpenExit = document.querySelector(this.headerButtonExit)
        this.popupOpenExit.addEventListener('click', this.openPopUp);
        
        this.popupClose
            document.querySelector(this.container)
            .addEventListener('click', this.close);

        this.contentSpan = document.querySelector(this.contentSpan);
        this.contentSpan.addEventListener('click', this.setContent);

        this.paragraphSuccess = document.querySelector('.authorization__paragraph_success');
        this.paragraphSuccess.addEventListener('click', this.setContent);

        this.submit = form.elements.submit;
        this.submit.addEventListener('click', this.login);
    }

    setContent() {
        form.elements.password.value = '';
        submit.setAttribute('disabled', true);
        if (this.contentSpan.textContent === 'Зарегистрироваться') {
            authorization__container_registration.style.display = 'flex';
            this.contentSpan.textContent = 'Войти';
            authorization__contentTitle.textContent = 'Регистрация';
            menu__item_toggle.classList.toggle('menu__item_toggle');
            this.containerToggle.style.display = 'flex';
            submit.classList.add('form-authorization__submit_disabled');
            authorization__paragraph_success.style.display = 'none';
            authorization__paragraph.style.display = 'block';
            submit.setAttribute('disabled', true);
            form.elements.password.value = '';
            submit.textContent = 'Зарегистрироваться';
        } else {
            authorization__container_registration.style.display = 'none';
            this.contentSpan.textContent = 'Зарегистрироваться';
            authorization__contentTitle.textContent = 'Войти';
            menu__item_toggle.classList.toggle('menu__item_toggle');
            form.style.display = 'flex';
            submit.textContent = 'Войти';
        }
    }

    openPopUp() {
        form.style.display = 'flex';
        this.containerToggle.style.display = 'flex';
        authorization__container_registration.style.display = 'none';
        this.contentSpan.textContent = 'Зарегистрироваться';
        submit.classList.add('form-authorization__submit_disabled');
        authorization__contentTitle.textContent = 'Войти';
        authorization__paragraph_success.style.display = 'none';
        authorization__paragraph.style.display = 'block';
        submit.setAttribute('disabled', true);
        form.elements.password.value = '';
    }

    changeButton() {
        header.render({ isLoggedIn: false, userName: ''});
        localStorage.setItem('token', '');
        newsCard.renderIcon();
    }

    close(event) {
        const container = this.container.substr(1,);
        if (
            event.target.classList.value === container || 
            event.target.classList.value === `${container}__svg` || 
            event.target.classList.value === `${container}__path`
        )   {
                this.containerToggle.style.display = 'none';
            }
    }

    login() {
        const name = form.elements.name.value;
        const password = form.elements.password.value;
        const email = form.elements.email.value;
        if (authorization__contentTitle.textContent === 'Войти') {
            mainApi.signin(email, password);
            newsCard.renderIcon();
            this.containerToggle.style.display = 'none';
        } else if (authorization__contentTitle.textContent === 'Регистрация') {
            mainApi.signup(name, email, password)
        }
    }
}
const popup = new Popup('.authorization', '.header__button_login', '.header__button_exit', '.authorization__span');

export default Popup;

export { header };