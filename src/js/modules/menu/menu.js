const burgerMenu = document.querySelector('.burger-menu');
const header__nav = document.querySelector('.header__nav');

function menuActive() {
    burgerMenu.classList.toggle('burger-menu_active');
    header__nav.classList.toggle('header__nav_toggle');
}
burgerMenu.addEventListener('click', menuActive);