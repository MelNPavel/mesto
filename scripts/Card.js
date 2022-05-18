class Card {
	constructor(name, link, openLargeImg) {
		this._name = name;
		this._link = link;
    this._openLargeImg = openLargeImg;
	};

  _getElement() {
    const cardElement = document
      .querySelector('.element__template')
      .content
      .querySelector('.element__card')
      .cloneNode(true);

    return cardElement;
  };

_setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick()});
    this._element.querySelector('.element__card-remove').addEventListener('click', () => {
      this._handleRemoveCard()});
    this._element.querySelector('.element__img').addEventListener('click', () => 
      this._openLargeImg());
  };

  _handleLikeClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_black')
  };

  _handleRemoveCard() {
   this._element.remove();
  };

  generate() {
    this._element = this._getElement();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;