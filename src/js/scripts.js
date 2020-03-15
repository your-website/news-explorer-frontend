import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';
import NewsCardList from './components/NewsCardList';
import NewsApi from './api/NewsApi';
import MainApi from './api/MainApi';
import NewsIcon from './components/NewsIcon';

import { today, lastWeek } from './utils/date';
import { apiKey, searchPlace, searchCategory } from './utils/paramsSearch';

import { TITLE_LOGIN, TITLE_REGISTRATION, PARAGRAPH_LOGIN, PARAGRAPH_REGISTRATION } from './constants/titleForm';

import bookmark from '../images/bookmark.png';
import bookmark_hover from '../images/bookmark_hover.png';

const headerContainer = document.querySelector('.header');

const showMoreButton = document.querySelector('.results__button');

const popupContainer = document.querySelector('.authorization');
const popupButtonOpen = document.querySelector('.header__button_login');
const popupButtonExit = document.querySelector('.header__button_exit');
const popupClose = document.querySelector('.authorization__svg');

const formAuthorization = document.querySelector('.form-authorization');
const buttonSubmitAuthorization = formAuthorization.querySelector('.form-authorization__submit');
const inputEmail = formAuthorization.querySelector('.form-authorization__input_email');
const inputPassword = formAuthorization.querySelector('.form-authorization__input_password');
const inputName = formAuthorization.querySelector('.form-authorization__input_name');
const titleAuthorization = document.querySelector('.authorization__content-title');

const formSearch = document.querySelector('.form-search');
const buttonSearch = formSearch.querySelector('.form-search__submit');
const inputSearch = document.querySelector('.form-search__input_search')

const newsCardList = new NewsCardList(false);
const mainApi = new MainApi();
const header = new Header('red', headerContainer);
const popup = new Popup(popupContainer, popupClose);
const formValidateAuthorization = new Form(formAuthorization);
const formValidateSearch = new Form(formSearch);
const newsApi = new NewsApi(inputSearch.value, 100, today, lastWeek, apiKey, searchPlace, searchCategory);
const newsIcon = new NewsIcon();

mainApi.getUserData()
    .then((res) => {
        header.render({ isLoggedIn: true, userName: res.data.name});
    })
    .catch(err => header.render({ isLoggedIn: false, userName: ''}));

inputEmail.addEventListener('input', formValidateAuthorization._validateIsEmail.bind(formValidateAuthorization));
inputPassword.addEventListener('input', formValidateAuthorization._validatePassword.bind(formValidateAuthorization));
inputSearch.addEventListener('input', formValidateSearch._validateSearch.bind(formValidateSearch));

buttonSearch.addEventListener('click', function() {
    event.preventDefault();
    newsApi.https(inputSearch.value);
    newsCardList.renderLoader(true)
    newsApi.getNews()
        .then((res) => {
            const { articles } = res;
            if (articles.length === 0) {
                newsCardList.noResults();
                return;
            }
            newsCardList.cards = articles;
            localStorage.setItem('keyword', inputSearch.value);
            newsCardList.renderLoader(false);
            newsCardList.count = 0;
            newsCardList.clearCardsItem();
            newsCardList.renderResults();
            newsIcon.renderIcon(header.isLoggedIn);
        })
        .catch(err => console.log(err));
});

buttonSubmitAuthorization.addEventListener('click', function() {
    event.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;

    if (titleAuthorization.textContent === TITLE_LOGIN) {
        mainApi.signin(email, password)
            .then((res) => {
                localStorage.setItem('token', res.token);
                mainApi.getUserData()
                    .then((res) => {
                        header.render({ isLoggedIn: true, userName: res.data.name});
                        newsIcon.renderIcon(header.isLoggedIn);
                        popup.submitOk();
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    } else {
        const name = inputName.value;
        mainApi.signup(name, email, password)
            .then((res) => {
                popup.success();
                formValidateAuthorization._validateName(false)
            })
            .catch(err => formValidateAuthorization._validateName(true));
    }
});

showMoreButton.addEventListener('click', function() {
    newsCardList.showMore();
    newsIcon.renderIcon(header.isLoggedIn);
});

popupButtonOpen.addEventListener('click', function() {
    popup.open();
    formValidateAuthorization._validateName(false);
});

popupButtonExit.addEventListener('click', function() {
    header.render({ isLoggedIn: false, userName: ''});
    localStorage.removeItem('token');
    newsIcon.renderIcon(header.isLoggedIn);
});

document.addEventListener('click', function(event) {
    const target = event.target.classList;
    if (target.contains('cards__icon') || target.contains('cards__bookmark')) {
        const item = event.target.closest('.cards__item');
        const icon = item.querySelector('.cards__icon');
        if (item.hasAttribute('id')) {
            mainApi.removeArticle(item.id)
                .then((res) => {
                    item.removeAttribute('id');
                    icon.src = bookmark;
                })
                .catch(err => console.log(err));

        } else {
            const keyword = localStorage.getItem('keyword');
            const linkUrlImg = item.querySelector('.cards__link').href;
            const linkUrl = item.querySelector('.cards__img').src;
            const data = event.target.closest('.cards__item').querySelector('.cards__container');
            const date = data.querySelector('.cards__date').textContent;
            const contentTitle = data.querySelector('.cards__content-title').textContent;
            const text = data.querySelector('.cards__paragraph').textContent;
            const source = item.querySelector('.cards__source').textContent;

            mainApi.createArticle(keyword, contentTitle, text, date, source, linkUrl, linkUrlImg, item)
                .then((res) => {
                    icon.src = bookmark_hover;
                    item.id = res.data._id;
                })
                .catch(err => console.log(err));
        }
    }
})
