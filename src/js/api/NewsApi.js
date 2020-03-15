
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
            return fetch(this.httpApi, {
                method: 'GET',
            })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
                return res.json();
            })
    }

    https(searchWord) {
        return this.httpApi = `https://newsapi.org/v2/${this.placeSearch}?q=${searchWord}&from=${this.dateLastWeek}&to=${this.dateToday}&sortBy=${this.sortBy}?&pageSize=${this.pageSize}&apiKey=${this.apiKey}`;
    }
}

export default NewsApi;
