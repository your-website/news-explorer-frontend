
const isLoggedIn = document.querySelector('.isLoggedIn');
const isLoggedOut = document.querySelector('.isLoggedOut');
const header__container = document.querySelector('.header__container');

class Header {
    constructor(color) {
      this.color = color;
    }

    render(props) {
      this.clear();

      if (props.isLoggedIn) {
        header__container.append(isLoggedIn.content.cloneNode(true))
        const header__button_login = document.querySelector('.header__button_login');
        header__button_login.textContent = props.userName;
      } else {
        header__container.append(isLoggedOut.content.cloneNode(true));
      }
    }

    clear() {
      if (document.querySelector('.header__nav')) {
        const header__nav = document.querySelector('.header__nav');
        header__nav.remove();
      }
    }
}

const head = new Header('red');

head.render({ isLoggedIn: true, userName: "Roman"})

export default Header;