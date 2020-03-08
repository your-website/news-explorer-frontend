class Section {
  constructor({selector, handlers = [] }) {
    this._element = document.querySelector(selector) || document.createElement('div');
  }
}
