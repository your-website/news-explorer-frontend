class CardListSection extends Section {
  constructor(...props) {
    super(...props);
    this._cardContainerElement = this._element;
  }

  // Рендер карточки на страницу
  setData(data, onCreate, erase) {
    if (erase) {
      this._cardContainerElement.innerHTML = '';
    }
    this._cardContainerElement.appendChild(onCreate(data));
  }
}

