
class Cards {
    constructor() {

    }

    renderIcon(isLoggedIn) {
        const cardsBookmark = document.querySelectorAll('.cards__bookmark');
        if (isLoggedIn) {
            Array.from(cardsBookmark).forEach((element) => {
                element.classList.add('cards__bookmark_focus');
                element.classList.add('cards__bookmark__search');
            });
        } else {
            Array.from(cardsBookmark).forEach((element) => {
                element.classList.remove('cards__bookmark_focus');
                element.classList.add('cards__bookmark__search');
            });
        }
    }

    renderIconSavedArticles() {
        const cardsBookmark = document.querySelectorAll('.cards__bookmark');

        Array.from(cardsBookmark).forEach((element) => {
            element.classList.add('cards__bookmark_focus');
            element.classList.add('cards__bookmark_saved-articles');
        });
    }
}

export default Cards;