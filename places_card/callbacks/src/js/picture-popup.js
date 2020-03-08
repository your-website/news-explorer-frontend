class PicturePopup extends Popup {
  open(src) {
    this._element.querySelector('.popup__content').style.backgroundImage = `url(${src})`;
    super.open();
  }
}
