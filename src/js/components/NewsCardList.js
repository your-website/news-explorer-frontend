const preloader = document.querySelector('.preloader');
const results = document.querySelector('.results');
const noResults = document.querySelector('.no-results');
import { monthNames } from '../utils/date';

class NewsCardList {
    constructor(savedNews) {
        this.cards = '';
        this.count = 0;
        this.button = document.querySelector('.results__button');
        this.savedNews = savedNews;
        this.monthNames = monthNames;
    }

    renderResults() {
        results.style.display = 'grid';
        preloader.style.display = 'none';
        const container = document.querySelector('.cards')
        this.button.before(container);
        this.buttonToggle();
        this.maxArticlesPage = 3;
        const articlesPage = this.cards.length - this.count;
        if (articlesPage < this.maxArticlesPage) {
            this.maxArticlesPage = articlesPage;
        }

        for (let i = 0; i < this.maxArticlesPage; i ++) {
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

            if (!this.savedNews) {
                sourceCard.textContent =  this.cards[this.count].source.name;
                cardContentTitle.textContent = this.cards[this.count].title
                paragraphCard.textContent = this.cards[this.count].description;
                const date = new Date(this.cards[this.count].publishedAt);
                paragraphDate.textContent = date.getDate() + ' ' + this.monthNames[date.getMonth()] + ' ' + date.getFullYear();
                imgCard.src = this.cards[this.count].urlToImage;
                container.append(cardItem)
            } else {
                const paragraphTitle = document.createElement('p');
                const containerParagraph = document.createElement('div');
                containerParagraph.classList.add('cards__container-paragraph');
                paragraphTitle.classList.add('cards__paragraph') ;
                paragraphTitle.classList.add('cards__paragraph_title');
                containerParagraph.appendChild(paragraphTitle);
                cardItem.appendChild(containerParagraph);
                cardItem.setAttribute('id', this.cards[this.count]._id);
                sourceCard.textContent =  this.cards[this.count].source;
                cardContentTitle.textContent = this.cards[this.count].title
                paragraphCard.textContent = this.cards[this.count].text;
                paragraphDate.textContent = this.cards[this.count].date;
                imgCard.src = this.cards[this.count].link;
                paragraphTitle.textContent = this.cards[this.count].keyword;
                container.append(cardItem)
            }
            
            this.count += 1;
            this.buttonToggle();
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

    showMore() {
        this.renderResults();
    }

    clearCardsItem() {
        const cardsItem = document.querySelectorAll('.cards__item');
        cardsItem.forEach((element) => {
            element.remove();
        })
    }

    buttonToggle() {
        if (this.cards.length > this.count) {
            this.button.style.display = 'block'
        } else {
            this.button.style.display = 'none'
        }
    }
}

export default NewsCardList;
