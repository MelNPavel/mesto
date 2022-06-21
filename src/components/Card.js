export default class Card {
	constructor(item, template, handleCardClick, idClient, removeCard, {likeHandle, unHandleLike}) {
		this._name = item.name;
		this._link = item.link;
    this._idOwner = item.owner._id;
    this.idCard = item._id;
    this._idClient = idClient;
    this.like = item.likes;
    this.item = item;
    
    this._template = template;
    this._handleCardClick = handleCardClick;
    
    this.removeCard = removeCard;
    this.handleLike = likeHandle;
    this.unHandleLike = unHandleLike;
    this._likeCount = document.querySelector('.element__like-count');
  };

  _getElement() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element__card')
      .cloneNode(true);

    return cardElement;
  };

  // getIdCard () {
  //   return this.idCard;
  // }
  
  // owner_id = 49abbf663692e5e96a895e13

_setEventListeners() {
  this._elementLike = this._element.querySelector('.element__like')
  this._elementLike.addEventListener('click', () => {
    this.checkLike ()
    });
  this._element.querySelector('.element__card-remove').addEventListener('click', () => {this.removeCard(this)
    });
  this._elementImg.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  };



  checkHandleLike (item) {
    this._elementLike.classList.add('element__like_black');
    this._likeCount.textContent = String(item.likes.length);
    // this.like = item.likes;
  }

  deleteHandleLike (item) {
    this._elementLike.classList.remove('element__like_black');
    this._likeCount.textContent = String(item.likes.length);
    // this.like = item.likes;
  }

  isLiked = () => this.like.some((item) => item._id === this._idClient);

  checkLike = () => {
    if (this.isLiked()) {
      this.unHandleLike (this.item);
    } else {
      this.handleLike (this.item);
    }
  }

  _cardOwner () {
  if (this.isLiked ()) {
    this.checkHandleLike (this.item);
  }
  }

  // handleLikeClick() {
  //   this._elementLike.classList.toggle('element__like_black')
  // };



  handleRemoveCard() {
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
    if (this._idOwner !== this._idClient){
      this._element.querySelector('.element__card-remove').style.display = 'none'; 
    }
    this._cardOwner();
    // this._likeCount.textContent = item.like.length;

    return this._element;
  }
}