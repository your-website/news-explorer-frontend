const validator = require('validator');

const form = document.forms.search;
const search = form.elements.search;
const formSearch__error = document.querySelector('.form-search__error');

function validate() {
    if (validator.isEmpty(search.value)) {
        formSearch__error.style.display = 'block';
    } else formSearch__error.style.display = 'none';
}

search.addEventListener('input', validate);
search.addEventListener('focus', validate);

form.addEventListener('submit', function () {
    event.preventDefault();
});