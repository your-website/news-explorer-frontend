import NewsCard from './NewsCard';
const newsCard = new NewsCard();
import { mainApi, header } from '../api/MainApi';

const preloader = document.querySelector('.preloader');
const results = document.querySelector('.results');
const noResults = document.querySelector('.no-results');

import bookmark from '../../images/bookmark.png';
import bookmark_hover from '../../images/bookmark_hover.png';

class NewsCardList {
    constructor(cards) {
        this.cards = cards;
        
        this.renderResults = this.renderResults.bind(this);
        this.renderSavedArticles = this.renderSavedArticles.bind(this);
        this.showMore = this.showMore.bind(this);
        this.buttonToggle = this.buttonToggle.bind(this);

        this.count = 0;
        this.button = document.querySelector('.results__button');
        this.button.addEventListener('click', this.showMore);

        this.savedNews = false;

        this.monthNames = [ "Января",
                            "Февраля",
                            "Марта",
                            "Апреля",
                            "Мая",
                            "Июня",
                            "Июля",
                            "Августя",
                            "Сентября",
                            "Октября",
                            "Ноября",
                            "Декабря"
                          ];
    }

    renderResults() {
        this.savedNews = false;
        results.style.display = 'grid';
        preloader.style.display = 'none';
        const container = document.querySelector('.cards')
        this.button.before(container);

        this.buttonToggle();

        for (let i = 0; i < 3; i ++) {
            const cardItem = document.createElement('div');
            const cardButtonElement = document.createElement('button');
            const imgCard = document.createElement('img');
            const cardContainer = document.createElement('div');
            const paragraphDate = document.createElement('p');
            const cardContentTitle = document.createElement('h3');
            const paragraphCard = document.createElement('p');
            const sourceCard = document.createElement('p');
            const icon = document.createElement('img');
            const link = document.createElement('link');
            link.href = this.cards[this.count].url;

            icon.src = `${bookmark}`;

            cardItem.classList.add('cards__item');
            cardButtonElement.classList.add('cards__bookmark');
            imgCard.classList.add('cards__img')
            cardContainer.classList.add('cards__container');
            paragraphDate.classList.add('cards__date');
            cardContentTitle.classList.add('cards__content-title');
            paragraphCard.classList.add('cards__paragraph');
            sourceCard.classList.add('cards__source');
            icon.classList.add('cards__icon');
            link.classList.add('cards__link');

            cardContainer.appendChild(paragraphDate);
            cardContainer.appendChild(cardContentTitle);
            cardContainer.appendChild(paragraphCard);

            cardButtonElement.appendChild(icon);
            link.appendChild(imgCard);

            cardItem.appendChild(cardButtonElement);
            cardItem.appendChild(link);
            cardItem.appendChild(cardContainer);
            cardItem.appendChild(sourceCard);

            sourceCard.textContent =  this.cards[this.count].source.name;
            cardContentTitle.textContent = this.cards[this.count].title
            paragraphCard.textContent = this.cards[this.count].description;
            const date = new Date(this.cards[this.count].publishedAt);
            paragraphDate.textContent = date.getDate() + ' ' + this.monthNames[date.getMonth()] + ' ' + date.getFullYear();
            imgCard.src = this.cards[this.count].urlToImage;
            container.append(cardItem)

            
            icon.addEventListener('click', addCard);
            this.count += 1;
            this.buttonToggle();
            newsCard.isLoggedIn = header.isLoggedIn;
            newsCard.renderIcon();
        }
    }

    renderSavedArticles() {
        this.savedNews = true;
        results.style.display = 'grid';
        preloader.style.display = 'none';
        const container = document.querySelector('.cards')
        this.button.before(container);
        this.buttonToggle();

        for (let i = 0; i < 3; i ++) {
            const cardItem = document.createElement('div');
            const cardButtonElement = document.createElement('button');
            const imgCard = document.createElement('img');
            const cardContainer = document.createElement('div');
            const paragraphDate = document.createElement('p');
            const cardContentTitle = document.createElement('h3');
            const paragraphCard = document.createElement('p');
            const sourceCard = document.createElement('p');
            const icon = document.createElement('img');
            const link = document.createElement('link');
            const containerParagraph = document.createElement('div');
            const paragraphTitle = document.createElement('p');
            link.href = this.cards[this.count].image;

            icon.src = `${bookmark}`;

            cardItem.classList.add('cards__item');
            cardButtonElement.classList.add('cards__bookmark');
            imgCard.classList.add('cards__img')
            cardContainer.classList.add('cards__container');
            paragraphDate.classList.add('cards__date');
            cardContentTitle.classList.add('cards__content-title');
            paragraphCard.classList.add('cards__paragraph');
            sourceCard.classList.add('cards__source');
            icon.classList.add('cards__icon');
            link.classList.add('cards__link');
            containerParagraph.classList.add('cards__container-paragraph');
            paragraphTitle.classList.add('cards__paragraph') ;
            paragraphTitle.classList.add('cards__paragraph_title');

            containerParagraph.appendChild(paragraphTitle);
            cardContainer.appendChild(paragraphDate);
            cardContainer.appendChild(cardContentTitle);
            cardContainer.appendChild(paragraphCard);

            cardButtonElement.appendChild(icon);
            link.appendChild(imgCard);

            cardItem.appendChild(containerParagraph);
            cardItem.appendChild(cardButtonElement);
            cardItem.appendChild(link);
            cardItem.appendChild(cardContainer);
            cardItem.appendChild(sourceCard);


            cardItem.setAttribute('id', this.cards[this.count]._id);
            sourceCard.textContent =  this.cards[this.count].source;
            cardContentTitle.textContent = this.cards[this.count].title
            paragraphCard.textContent = this.cards[this.count].text;
            paragraphDate.textContent = this.cards[this.count].date;
            imgCard.src = this.cards[this.count].link;
            paragraphTitle.textContent = this.cards[this.count].keyword;
            container.append(cardItem)
            icon.addEventListener('click', function(event) {
                const card = event.target.closest('.cards__item');
                const deleteCard = card.id;
                card.remove();
                mainApi.removeArticle(deleteCard);
            })
            this.count += 1;
            this.buttonToggle();
            newsCard.renderIconSavedArticles();
        }

    }

    renderLoader(isLoading) {
        if (isLoading) {
            preloader.style.display = 'flex';
            results.style.display = 'none';
            noResults.style.display = 'none';
        } else {
            preloader.style.display = 'none';
            results.style.display = 'grid';
        }
    }

    beforeSearch() {
        results.style.display = 'none';
        preloader.style.display = 'none';
        noResults.style.display = 'none';
    }

    noResults() {
        results.style.display = 'none';
        preloader.style.display = 'none';
        noResults.style.display = 'flex';
    }

    renderError() {

    }

    showMore() {
        if (this.savedNews) {
            this.renderSavedArticles();
        } else this.renderResults();
    }

    clearCardsItem() {
        const cardsItem = document.querySelectorAll('.cards__item');
        cardsItem.forEach((e) => {
            e.remove();
        })
    }

    buttonToggle() {
        if (this.cards.length > this.count) {
            this.button.style.display = 'block'
        } else {
            this.button.style.display = 'none'
        }
    }

    addCard() {
        
    }
}

function addCard(event) {
    const links = event.target.closest('.cards__item');
    const icon = links.querySelector('.cards__icon');
    if (links.hasAttribute('id')) {
        mainApi.removeArticle(links.id);
        links.removeAttribute('id');
        icon.src = bookmark;
    } else {
    const keyword = localStorage.getItem('keyword');
    const linkUrlImg = links.querySelector('.cards__link').href;
    const linkUrl = links.querySelector('.cards__img').src;
    const data = event.target.closest('.cards__item').querySelector('.cards__container');
    const date = data.querySelector('.cards__date').textContent;
    const contentTitle = data.querySelector('.cards__content-title').textContent;
    const text = data.querySelector('.cards__paragraph').textContent;
    const source = links.querySelector('.cards__source').textContent;
    icon.src = bookmark_hover;
    mainApi.createArticle(keyword, contentTitle, text, date, source, linkUrl, linkUrlImg, links);
    }
}

export { mainApi, addCard };

export default NewsCardList;
