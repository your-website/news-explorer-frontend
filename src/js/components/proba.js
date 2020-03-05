import Header from './Header';

const form = document.forms.authorization;
const submit = form.elements.submit;
const authorization__container_registration = document.querySelector('.authorization__container_registration');
const authorization__contentTitle = document.querySelector('.authorization__content-title');
const authorization__paragraph = document.querySelector('.authorization__paragraph');
const authorization__paragraph_success = document.querySelector('.authorization__paragraph_success');

class Popup {
    constructor(container, headerButton, contentSpan) {
        this.container = container;
        this.headerButton = headerButton;
        this.contentSpan = contentSpan;

        this.containerToggle = document.querySelector(container);

        this.openPopUp = this.openPopUp.bind(this);
        this.close = this.close.bind(this);
        this.setContent = this.setContent.bind(this);
        this.exitProfile = this.exitProfile.bind(this);

        this.popupOpen
            document.querySelector(this.headerButton)
            .addEventListener('click', this.openPopUp);
        
        this.popupClose
            document.querySelector(this.container)
            .addEventListener('click', this.close);

        this.contentSpan = document.querySelector(this.contentSpan);
        this.contentSpan.addEventListener('click', this.setContent);
    }

    setContent() {
        form.elements.password.value = '';
        submit.setAttribute('disabled', true);
        if (this.contentSpan.textContent === 'Зарегистрироваться') {
            authorization__container_registration.style.display = 'flex';
            this.contentSpan.textContent = 'Войти';
            authorization__contentTitle.textContent = 'Регистрация';
        } else {
            authorization__container_registration.style.display = 'none';
            this.contentSpan.textContent = 'Зарегистрироваться';
            authorization__contentTitle.textContent = 'Войти';
        }
    }

    openPopUp() {
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

    close(event) {
        const container = this.container.substr(1,);
        if (
            event.target.classList.value === container || 
            event.target.classList.value === `${container}__svg` || 
            event.target.classList.value === `${container}__path`
            ) 
            {
                this.containerToggle.style.display = 'none';
            }
    }

    exitProfile() {
        if (this.headerButton.textContent != 'Авторизоваться') {
            const header = new Header();
            header.render({ isLoggedIn: false, userName: "Roman"})
        }
    }
}

const popup = new Popup('.authorization', '.header__button', '.authorization__span');

