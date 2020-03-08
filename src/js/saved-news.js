import Header from './components/Header';
import MainApi from './api/MainApi';
import { header } from './api/MainApi';

const mainApi = new MainApi();

mainApi.getArticles();
mainApi.getUserData();

const title = document.querySelector('.saved__content-title');


class SavedNews {
    constructor() {

    }

    setTitle(title) {
        title.textContent = localStorage.getItem('name') + ', у вас ' + localStorage.getItem('articles') + ' сохраненных статей';
    }

    setArticles() {
        const d = document.querySelectorAll('.cards__paragraph_title');
        Array.from(d).forEach((e) => {
            console.log(e);
        })
    }

    setKeywords() {

    }
}

const savedNews = new SavedNews();
savedNews.setTitle(title);
savedNews.setArticles();

