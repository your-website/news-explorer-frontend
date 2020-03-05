import { today, lastWeek } from '../utils/date';

class NewsApi {
    constructor(searchWord, pageSize, dateToday, dateLastWeek, apiKey, placeSearch, sortBy) {
        this.searchWord = searchWord;
        this.pageSize = pageSize;
        this.dateToday = dateToday;
        this.dateLastWeek = dateLastWeek;
        this.apiKey = apiKey;
        this.placeSearch = placeSearch;
        this.sortBy = sortBy;
        this.httpApi = `http://newsapi.org/v2/${placeSearch}?q=${this.searchWord}&from=${dateLastWeek}&to=${dateToday}&sortBy=${sortBy}?&pageSize=${this.pageSize}&apiKey=${apiKey}`;
    }

    getNews() {
        this.data = [];
        fetch(this.httpApi)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return this.data[0] = data.articles;
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            });
        return this.data;
    }
}

const news = new NewsApi('witcher', 6, today, lastWeek, '2cbbb55ee51445e3bbfe9b4180d20e16', 'everything', 'popularity');

console.log(news.getNews());
