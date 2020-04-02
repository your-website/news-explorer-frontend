import Header from '../blocks/header/Header';
import FormAuthorization from '../blocks/form-authorization/FormAuthorization';
import Results from '../blocks/results/Results';
import NewsApi from './api/NewsApi';
import MainApi from './api/MainApi';
import Cards from '../blocks/cards/Cards';
import FormSearch from '../blocks/form-search/FormSearch';

import { today, lastWeek } from './utils/date';
import { apiKey, searchPlace, searchCategory } from './utils/paramsSearch';
import { TITLE_LOGIN } from './constants/titleForm';
import bookmarkIconFocus from '../images/bookmark_focus.png';
import { ERROR__DATA_AUTHORIZATION, ERROR__INTERNET, PERSON__CREATE } from './constants/error';

const headerContainer = document.querySelector('.header');

const showMoreButton = document.querySelector('.results__button');

const popupContainer = document.querySelector('.authorization');
const popupButtonOpen = document.querySelector('.header__button_login');
const popupButtonExit = document.querySelector('.header__button_exit');
const popupClose = document.querySelector('.authorization__svg');

const formAuthorizationContainer = document.querySelector('.form-authorization');
const buttonSubmitAuthorization = formAuthorizationContainer.querySelector('.form-authorization__submit');
const inputEmail = formAuthorizationContainer.querySelector('.form-authorization__input_email');
const inputPassword = formAuthorizationContainer.querySelector('.form-authorization__input_password');
const inputName = formAuthorizationContainer.querySelector('.form-authorization__input_name');
const titleAuthorization = document.querySelector('.authorization__content-title');

const formSearchContainer = document.querySelector('.form-search');
const buttonSearch = formSearchContainer.querySelector('.form-search__submit');
const inputSearch = formSearchContainer.querySelector('.form-search__input_search')

const results = new Results(false);
const mainApi = new MainApi();
const header = new Header('red', headerContainer);
const formAuthorization = new FormAuthorization(popupContainer, popupClose, formAuthorizationContainer);
const formSearch = new FormSearch(formSearchContainer);

const newsApi = new NewsApi(inputSearch.value, 100, today, lastWeek, apiKey, searchPlace, searchCategory);
const newsIcon = new Cards();

mainApi.getUserData(localStorage.getItem('token'))
    .then((res) => {
        header.render({ isLoggedIn: true, userName: res.data.name});
    })
    .catch(err => header.render({ isLoggedIn: false, userName: ''}));

buttonSearch.addEventListener('click', function() {
    event.preventDefault();
    formSearch.disabledForm(true);
    newsApi.https(inputSearch.value);
    results.renderLoader(true);
    newsApi.getNews()
        .then((res) => {
            const { articles } = res;
            if (articles.length === 0) {
                results.noResults();
                return;
            }
            results.cards = articles;
            localStorage.setItem('keyword', inputSearch.value);
            results.renderLoader(false);
            results.count = 0;
            results.clearCardsItem();
            results.renderResults();
            newsIcon.renderIcon(header.isLoggedIn);
        })
        .catch((err) => {
            formSearch.setServerError(true, ERROR__INTERNET);
        })
        .finally(() => formSearch.disabledForm(false));
});

buttonSubmitAuthorization.addEventListener('click', function() {
    event.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;

    if (titleAuthorization.textContent === TITLE_LOGIN) {
        formAuthorization.disabledForm(true);
        mainApi.signin(email, password)
            .then((res) => {
                localStorage.setItem('token', res.token);
                mainApi.getUserData(localStorage.getItem('token'))
                    .then((res) => {
                        header.render({ isLoggedIn: true, userName: res.data.name});
                        newsIcon.renderIcon(header.isLoggedIn);
                        formAuthorization.submitOk();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                if (err.indexOf(4) === '-1') {
                    formAuthorization.setServerError(true, ERROR__INTERNET);
                } else formAuthorization.setServerError(true, ERROR__DATA_AUTHORIZATION);
            })
            .finally(() => formAuthorization.disabledForm(false));
    } else {
        const name = inputName.value;
        formAuthorization.disabledForm(true);
        mainApi.signup(name, email, password)
            .then((res) => {
                formAuthorization.success();
                formAuthorization._validateName(false)
            })
            .catch((err) => {
                if (err.indexOf(400) === '-1' || err.indexOf(500) === '-1') {
                    formAuthorization.setServerError(true, ERROR__INTERNET);
                } else formAuthorization.setServerError(true, PERSON__CREATE);
            })
            .finally(() => formAuthorization.disabledForm(false));
    }
});

showMoreButton.addEventListener('click', function() {
    results.showMore();
    newsIcon.renderIcon(header.isLoggedIn);
});

popupButtonOpen.addEventListener('click', function() {
    formAuthorization.open();
    formAuthorization._validateName(false);
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
            mainApi.removeArticle(item.id, localStorage.getItem('token'))
                .then((res) => {
                    item.removeAttribute('id');
                    icon.src = '';
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

            mainApi.createArticle(keyword, contentTitle, text, date, source, linkUrl, linkUrlImg, localStorage.getItem('token'))
                .then((res) => {
                    icon.src = bookmarkIconFocus;
                    item.id = res.data._id;
                })
                .catch(err => console.log(err));
        }
    }
});