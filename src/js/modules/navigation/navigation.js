const header__link = document.querySelector('.header__link');

function mouseOverHeaderLink() {
    header__link.classList.add('header__link_hover');
}

function mouseOutHeaderLink() {
    header__link.classList.remove('header__link_hover');
}

header__link.addEventListener('mouseover', mouseOverHeaderLink);
header__link.addEventListener('mouseout', mouseOutHeaderLink);
