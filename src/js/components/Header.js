

const header__button_exit = document.querySelector('.header__button_exit');
const header__button_login = document.querySelector('.header__button_login');
const menu__item_toggle = document.querySelector('.menu__item_toggle');
const header__nav = document.querySelector('.header__nav');
const menu = document.querySelector('.menu');
const headerButton = document.querySelector('.header__button_login')

class Header {
    constructor(color) {
      this.color = color;
      this.isLoggedIn = false;
    }

    render(props) {
      this.clear();

      if (props.isLoggedIn) {
        this.isLoggedIn = true;
        headerButton.textContent = props.userName;
        header__button_login.style.display = 'block';
        header__button_exit.style.display = 'none';
        menu__item_toggle.style.display = 'block';
        header__nav.classList.add('header__nav_login');
        menu.classList.add('menu_login');
      } else {
        this.isLoggedIn = false;
        header__button_exit.style.display = 'block';
        header__button_login.style.display = 'none';
        menu__item_toggle.style.display = 'none';
        header__nav.classList.remove('header__nav_login');
        menu.classList.remove('menu_login');
      }
    }

    clear() {
   
    }
}

export default Header;