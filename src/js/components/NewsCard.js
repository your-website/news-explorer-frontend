import { mainApi, addCard } from '../components/NewsCardList';

import union from '../../images/Union.png';
import union_hover from '../../images/Union_hover.png';
import bookmark from '../../images/bookmark.png';
import bookmark_hover from '../../images/bookmark_hover.png';

class NewsCard {
    constructor(isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
    }

    renderIcon() {
        const cards__icon = document.querySelectorAll('.cards__icon');
        const cards__bookmark = document.querySelectorAll('.cards__bookmark');
        if (this.isLoggedIn) {
            Array.from(cards__icon).forEach((e) => {
                e.src = `${bookmark}`;
                e.classList.add('cards__bookmark_focus');
                
            });
            Array.from(cards__bookmark).forEach((e) => {
                e.classList.add('cards__bookmark_focus');
            });
        } else {
            Array.from(cards__icon).forEach((e) => {
                e.src = `${bookmark}`
                e.removeEventListener('click', addCard);
            });
            Array.from(cards__bookmark).forEach((e) => {
                e.classList.remove('cards__bookmark_focus');
            });
        }
    }

    renderIconSavedArticles() {
        const cards__icon = document.querySelectorAll('.cards__icon');
        const cards__bookmark = document.querySelectorAll('.cards__bookmark');

        Array.from(cards__icon).forEach((e) => {
            e.src = `${union}`
            e.addEventListener('mouseover', function() {
                e.src = `${union_hover}`
            });
            e.addEventListener('mouseout', function() {
                e.src = `${union}`
            })
        });
        Array.from(cards__bookmark).forEach((e) => {
            e.classList.add('cards__bookmark_focus');
        });
    }
}

export default NewsCard;