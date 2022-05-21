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
  this._elementLike = this._element.querySelector('.element__like')
  this._elementLike.addEventListener('click', () => {
      this._handleLikeClick()});
    this._element.querySelector('.element__card-remove').addEventListener('click', () => {
      this._handleRemoveCard()});
    this._elementImg.addEventListener('click', () => 
      this._openLargeImg(this._name, this._link));
  };

  _handleLikeClick() {
    this._elementLike.classList.toggle('element__like_black')
  };

  _handleRemoveCard() {
   this._element.remove();
  };

  generate() {
    this._element = this._getElement();
    this._elementImg = this._element.querySelector('.element__img')
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;