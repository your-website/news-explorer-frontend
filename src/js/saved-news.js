import Header from '../blocks/header/Header';
import Results from '../blocks/results/Results';
import MainApi from './api/MainApi';
import Cards from '../blocks/cards/Cards';
import Saved from '../blocks/saved/Saved';

const headerContainer = document.querySelector('.header');

const showMoreButton = document.querySelector('.results__button');

const popupButtonExit = document.querySelector('.header__button_exit');
const title = document.querySelector('.saved__content-title');
const spanTitle = document.querySelector('.saved__span_title');
const spanOther = document.querySelector('.saved__span_other');
const spanSymbol = document.querySelector('.saved__span_symbol');

const results = new Results(true);
const mainApi = new MainApi();
const header = new Header('red', headerContainer);
const newsIcon = new Cards();
const savedNews = new Saved(title, spanTitle, spanOther, spanSymbol);

mainApi.getUserData(localStorage.getItem('token'))
    .then((res) => {
        header.render({ isLoggedIn: true, userName: res.data.name});
        savedNews.setTitle(res.data.name);
        popupButtonExit.classList.add('header__button_saved-news');
    })
    .catch(err => {
        header.render({ isLoggedIn: false, userName: ''})
        document.location.href = './index.html';
    });

showMoreButton.addEventListener('click', function() {
    results.showMore();
    newsIcon.renderIconSavedArticles();
});

popupButtonExit.addEventListener('click', function() {
    header.render({ isLoggedIn: false, userName: ''});
    localStorage.removeItem('token');
    document.location.href = './index.html';
});

mainApi.getArticles(localStorage.getItem('token'))
    .then((res) => {
        const { data } = res;
        localStorage.setItem('articles', data.length);
        const keyword = [];
        data.forEach(element => {
            keyword.push(element.keyword);
        });

        savedNews.setKeywords(keyword);

        if (data.length === 0) {
            results.noResults(results);
        } else {
            results.cards = data;
            results.count = 0;
            results.clearCardsItem();
            results.renderResults();
            newsIcon.renderIconSavedArticles();
        }
    })
    .catch(err => console.log(err));

document.addEventListener('click', function(event) {
    const target = event.target.classList;
    if (target.contains('cards__icon') || target.contains('cards__bookmark')) {
        const card = event.target.closest('.cards__item');
        const deleteCard = card.id;
        mainApi.removeArticle(deleteCard, localStorage.getItem('token'))
            .then((res) => {
                card.remove();
                results.renderResults();
                newsIcon.renderIconSavedArticles();
            })
            .catch(err => console.log(err));
    };
});