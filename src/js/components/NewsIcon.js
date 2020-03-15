
import union from '../../images/Union.png';
import union_hover from '../../images/Union_hover.png';
import bookmark from '../../images/bookmark.png';
import bookmark_hover from '../../images/bookmark_hover.png';

class NewsIcon {
    constructor() {

    }

    renderIcon(isLoggedIn) {
        const cards__icon = document.querySelectorAll('.cards__icon');
        const cards__bookmark = document.querySelectorAll('.cards__bookmark');
        Array.from(cards__icon).forEach((element) => {
            if (element.src === '') {
                element.src = `${bookmark}`;
            }
        });

        if (isLoggedIn) {
            Array.from(cards__bookmark).forEach((element) => {
                element.classList.add('cards__bookmark_focus');
            });
        } else {
            Array.from(cards__bookmark).forEach((element) => {
                element.classList.remove('cards__bookmark_focus');
            });
        }
    }

    renderIconSavedArticles() {
        const cards__icon = document.querySelectorAll('.cards__icon');
        const cards__bookmark = document.querySelectorAll('.cards__bookmark');

        Array.from(cards__icon).forEach((element) => {
            element.src = `${union}`
            element.addEventListener('mouseover', function() {
                element.src = `${union_hover}`
            });
            element.addEventListener('mouseout', function() {
                element.src = `${union}`
            })
        });
        Array.from(cards__bookmark).forEach((element) => {
            element.classList.add('cards__bookmark_focus');
        });
    }
}

export default NewsIcon;