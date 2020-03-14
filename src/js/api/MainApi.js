
import { HTTPS } from '../constants/https';

class MainApi {
    constructor() {

    }

    signup(name, email, password) {
        return fetch(`${HTTPS}/signup`, {
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
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        });
    }

    signin(email, password) {
        return fetch(`${HTTPS}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
    }

    getUserData() {
        return fetch(`${HTTPS}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
    }

    getArticles() {
        return fetch(`${HTTPS}/articles`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
    }

    createArticle(keyword, title, text, date, source, link, image, links) {
        return fetch('https://www.api.your-news-explorer.tk/articles', {
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
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        });
    }

    removeArticle(id) {
        return fetch(`${HTTPS}/articles/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        });
    }
}

export default MainApi;