import Header from './components/Header';
import NewsCardList from './components/NewsCardList';
import MainApi from './api/MainApi';
import NewsIcon from './components/NewsIcon';
import SavedNews from './components/SavedNews';

const headerContainer = document.querySelector('.header');

const showMoreButton = document.querySelector('.results__button');

const popupButtonExit = document.querySelector('.header__button_exit');
const title = document.querySelector('.saved__content-title');
const spanTitle = document.querySelector('.saved__span_title');
const spanOther = document.querySelector('.saved__span_other');
const spanSymbol = document.querySelector('.saved__span_symbol');

const newsCardList = new NewsCardList(true);
const mainApi = new MainApi();
const header = new Header('red', headerContainer);
const newsIcon = new NewsIcon();
const savedNews = new SavedNews(title, spanTitle, spanOther, spanSymbol);

mainApi.getUserData()
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
    newsCardList.showMore();
    newsIcon.renderIconSavedArticles();
});

popupButtonExit.addEventListener('click', function() {
    header.render({ isLoggedIn: false, userName: ''});
    localStorage.removeItem('token');
    document.location.href = './index.html';
});
const results = document.querySelector('.news');

mainApi.getArticles()
    .then((res) => {
        const { data } = res;
        localStorage.setItem('articles', data.length);
        const keyword = [];
        data.forEach(element => {
            keyword.push(element.keyword);
        });

        savedNews.setKeywords(keyword);

        if (data.length === 0) {
            newsCardList.noResults(results);
        } else {
            newsCardList.cards = data;
            newsCardList.count = 0;
            newsCardList.clearCardsItem();
            newsCardList.renderResults();
            newsIcon.renderIconSavedArticles();
        }
    })
    .catch(err => console.log(err));

document.addEventListener('click', function(event) {
    const target = event.target.classList;
    if (target.contains('cards__icon') || target.contains('cards__bookmark')) {
        const card = event.target.closest('.cards__item');
        const deleteCard = card.id;
        mainApi.removeArticle(deleteCard)
            .then((res) => {
                card.remove();
                newsCardList.renderResults();
                newsIcon.renderIconSavedArticles();
            })
            .catch(err => console.log(err));
    };
});