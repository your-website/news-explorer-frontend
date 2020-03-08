class Card {
  constructor({data, removeHandlerCallback, openHandlerCallback, likeHandlerCallback}, createCard) {
    // Слушатели событий
    this._removeCallback = removeHandlerCallback || (() => {});
    this._openCallback = openHandlerCallback || (() => {});
    this._likeCallback = likeHandlerCallback || (() => {});

    this._handleDeleteIcon = this._handleDeleteIcon.bind(this);
    this._handleOpenPopup = this._handleOpenPopup.bind(this);
    this._handleLike = this._handleLike.bind(this);

    // Экземпляр карточки
    this._element = createCard(data);

    // Like-icon
    this._buttonElementToLike = this._element.querySelector('.place-card__like-icon');

    // Количество лайков, проверка оунера карточки.
    this.setView(data);

    // Слушатели событий
    this._bind();
  }

  // Обработчики событий.
  _handleDeleteIcon() {
    if (typeof this._removeCallback === `function`) {
      return this._removeCallback(this);
    }
  }
  _handleLike() {
    if (typeof this._likeCallback === `function`) {
      return this._likeCallback(this);
    }
  }
  _handleOpenPopup() {
    if (typeof this._openCallback() === `function`) {
      return this._openCallback();
    }
  }

  // Геттеры, отдающие данные текущего инстанса - его структуру, ID, наша ли это карточка.
  get node() {
    return this._element;
  }
  get id() {
    return this.data._id;
  }
  get isLiked() {
    return Boolean(this.data.likes.find(item => item._id === this.data.currentUserId));
  }


  // Собственные методы класса:
  // Проверка лайка и владельца карточки
  setLike() {
    if (this.isLiked) this._buttonElementToLike.classList.add('place-card__like-icon_liked');
    else this._buttonElementToLike.classList.remove('place-card__like-icon_liked');
  }
  setView(data) {
    this.data = data;
    this._element.querySelector('.place-card__like-count').textContent = data.likes.length;
    this._element.querySelector('.place-card__delete-icon').style.display = data.currentUserId === data.owner._id ? 'block' : 'none';
    this.setLike();
  }

  // Удаление карточки
  remove() {
    this._unbind();
    this._element.remove();
  }

  // Обработчики событий.
  _bind() {
    this._element.querySelector('.place-card__image').addEventListener('click', this._handleOpenPopup);
    this._element.querySelector('.place-card__delete-icon').addEventListener('click', this._handleDeleteIcon);
    this._buttonElementToLike.addEventListener('click', this._handleLike)
  }
  _unbind() {
    this._element.querySelector('.place-card__image').removeEventListener('click', this._handleOpenPopup);
    this._element.querySelector('.place-card__delete-icon').removeEventListener('click', this._handleDeleteIcon);
    this._buttonElementToLike.removeEventListener('click', this._handleLike)
  }
}

