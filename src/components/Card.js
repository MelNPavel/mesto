export default class Card {
	constructor(item, template, handleCardClick) {
		this._name = item.name;
		this._link = item.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._largeImg = document.querySelector('.popup_image_background');
  	};

  _getElement() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element__card')
      .cloneNode(true);

    return cardElement;
  };

_setEventListeners() {
  this._elementLike = this._element.querySelector('.element__like')
  this._elementLike.addEventListener('click', () => {
    this._handleLikeClick()
    });
  this._element.querySelector('.element__card-remove').addEventListener('click', () => {this._handleRemoveCard()
    });
  this._elementImg.addEventListener('click', () => this._handleCardClick(this._largeImg, this._name, this._link));
  };

  _handleLikeClick() {
    this._elementLike.classList.toggle('element__like_black')
  };

  _handleRemoveCard() {
   this._element.remove();
   this._element = '';
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