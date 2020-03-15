
import { HTTPS } from '../constants/https';
import { ERROR } from '../constants/error';
import { AUTHENTICATION_SCHEME } from '../constants/auth';

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
                return Promise.reject(`${ERROR} ${res.status}`);
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
                return Promise.reject(`${ERROR} ${res.status}`);
            }
            return res.json();
        })
    }

    getUserData(token) {
        return fetch(`${HTTPS}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `${AUTHENTICATION_SCHEME} ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`${ERROR} ${res.status}`);
            }
            return res.json();
        })
    }

    getArticles(token) {
        return fetch(`${HTTPS}/articles`, {
            method: 'GET',
            headers: {
                authorization: `${AUTHENTICATION_SCHEME} ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`${ERROR} ${res.status}`);
            }
            return res.json();
        })
    }

    createArticle(keyword, title, text, date, source, link, image, token) {
        return fetch(`${HTTPS}/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `${AUTHENTICATION_SCHEME} ${token}`
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
                return Promise.reject(`${ERROR} ${res.status}`);
            }
            return res.json();
        });
    }

    removeArticle(id, token) {
        return fetch(`${HTTPS}/articles/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${AUTHENTICATION_SCHEME} ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`${ERROR} ${res.status}`);
            }
            return res.json();
        });
    }
}

export default MainApi;