import { today, lastWeek } from '../utils/date';
import NewsCardList from '../components/NewsCardList';

const newsCardList = new NewsCardList([]);
newsCardList.beforeSearch();

class NewsApi {
    constructor(searchWord, pageSize, dateToday, dateLastWeek, apiKey, placeSearch, sortBy) {
        this.searchWord = searchWord;
        this.pageSize = pageSize;
        this.dateToday = dateToday;
        this.dateLastWeek = dateLastWeek;
        this.apiKey = apiKey;
        this.placeSearch = placeSearch;
        this.sortBy = sortBy;
        this.httpApi = `https://newsapi.org/v2/${this.placeSearch}?q=${this.searchWord}&from=${this.dateLastWeek}&to=${this.dateToday}&sortBy=${this.sortBy}?&pageSize=${this.pageSize}&apiKey=${this.apiKey}`;
    }

    getNews() {
        newsCardList.renderLoader(true);

        this.data = [];
        fetch(this.httpApi)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.articles.length === 0) {
                    newsCardList.noResults();
                    return;
                } else
                newsCardList.renderLoader(false);
                data.articles.forEach(element => {
                    this.data.push(element);
                });
                localStorage.setItem('keyword', this.searchWord);
                newsCardList.cards = this.data;
                newsCardList.clearCardsItem();
                newsCardList.renderResults();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
        return this.data;
    }

    http(searchWord) {
        return this.httpApi = `https://newsapi.org/v2/${this.placeSearch}?q=${searchWord}&from=${this.dateLastWeek}&to=${this.dateToday}&sortBy=${this.sortBy}?&pageSize=${this.pageSize}&apiKey=${this.apiKey}`;
    }
}
const formSearch__buttonSubmit = document.querySelector('.form-search__button-submit');
const formSearch__input = document.querySelector('.form-search__input');

const news = new NewsApi('apple', 100, today, lastWeek, '2cbbb55ee51445e3bbfe9b4180d20e16', 'everything', 'popularity');



formSearch__buttonSubmit.addEventListener('click', function() {
    event.preventDefault();
    news.searchWord = formSearch__input.value;
    news.http(news.searchWord);
    news.getNews();
})

export default NewsApi;
