
import BaseComponent from '../../js/components/BaseComponent';

class Header extends BaseComponent {
    constructor(color, container) {
        super();
        this.color = color;
        this.isLoggedIn = false;
        this.container = container;
        this.buttonLogin = this.container.querySelector('.header__button_login');
        this.buttonExit = this.container.querySelector('.header__button_exit');
        this.navigation = this.container.querySelector('.header__nav');
        this.menu = this.container.querySelector('.menu');
        this.menuToggle = this.container.querySelector('.menu__item_toggle');
        this.burgerMenu = this.container.querySelector('.burger-menu');

        this.elementHandlersClick = [ 
            {
                name: this.burgerMenu,
                handler: this.menuToggleBurger.bind(this)
            }
        ];
        
        this._setHandlers('click', this.elementHandlersClick);
    }

    render(props) {
        if (props.isLoggedIn) {
            this.isLoggedIn = true;
            this.buttonExit.textContent = props.userName;
            this.buttonExit.style.display = 'block';
            this.buttonLogin.style.display = 'none';
            this.menuToggle.style.display = 'block';
            this.navigation.classList.add('header__nav_login');
            this.menu.classList.add('menu_login');
        } else {
            this.isLoggedIn = false;
            this.buttonLogin.style.display = 'block';
            this.buttonExit.style.display = 'none';
            this.menuToggle.style.display = 'none';
            this.navigation.classList.remove('header__nav_login');
            this.menu.classList.remove('menu_login');
        }
    }

    menuToggleBurger() {
        this.navigation.classList.toggle('header__nav_toggle');
        this.burgerMenu.classList.toggle('burger-menu_active');
    }
}

export default Header;