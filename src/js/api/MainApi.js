
import Header from '../components/Header';
const header = new Header('red');
import NewsCardList from '../components/NewsCardList';
const newsCardList = new NewsCardList([]);

class MainApi {
    constructor() {

    }

    signup(name, email, password) {
        fetch('https://www.api.your-news-explorer.tk/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
        });
    }

    signin(email, password) {
        fetch('https://www.api.your-news-explorer.tk/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then((data) => {
            localStorage.setItem('token', data.token);
            this.getUserData();
        });
    }

    getUserData() {
        fetch('https://www.api.your-news-explorer.tk/users/me', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then((data) => {
            header.render({ isLoggedIn: true, userName: data.data.name});
            localStorage.setItem('name', data.data.name);
        })
        .catch((e) => {
            header.render({ isLoggedIn: false, userName: ''});
        })
    }

    getArticles() {
        fetch('https://www.api.your-news-explorer.tk/articles', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then((data) => {
            localStorage.setItem('articles', data.data.length);
            newsCardList.cards = data.data;
            newsCardList.clearCardsItem();
            newsCardList.renderSavedArticles();
        })
     
    }

    createArticle(keyword, title, text, date, source, link, image, links) {
        fetch('https://www.api.your-news-explorer.tk/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                keyword: keyword,
                title: title,
                text: text,
                date: date,
                source: source,
                link: link,
                image: image
            })
        })
        .then(res => res.json())
        .then((data) => {
            if (links) {
                links.setAttribute('id', data.data._id)
            }
        });
    }

    removeArticle(id) {
        fetch(`https://www.api.your-news-explorer.tk/articles/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        });
    }
}

const mainApi = new MainApi();

export { mainApi, header };

export default MainApi;