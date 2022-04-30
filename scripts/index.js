const popupLay = document.querySelector('.popup')
const popupImage = document.querySelector('.popup_image_background');
const popupFoto = document.querySelector('.popup__foto');
const popupTitleFoto = document.querySelector('.popup__foto-name');

const popupEditBtn = document.querySelector ('.profile__edit-button');
const popupEdit = document.querySelector ('.popup_edit_place');

const popupCloseEdit = document.querySelector ('.popup__close_edit_type');
const popupCloseAdd = document.querySelector ('.popup__close_add_type');
const imgClosePopup = document.querySelector('.popup__close_place_foto');

const profileName = document.querySelector ('.profile__info-name');
const profileSpec = document.querySelector ('.profile__info-about');

const nameInput = document.querySelector ('.popup__input_type_name');
const specializationInput = document.querySelector ('.popup__input_type_about');

const formEditElement = document.querySelector ('.popup__form_edit_type');
const formAddElement = document.querySelector ('.popup__form_add_type');

const buttonAddCard = document.querySelector('.popup__button_place_add');

const popupAddBtn = document.querySelector ('.profile__add-button');
const popupAddOpen = document.querySelector ('.popup_add_place');

const titleInput = document.querySelector ('.popup__input_type_title');
const imageInput = document.querySelector ('.popup__input_type_image');

const template = document.querySelector ('.element__template');
const cardsContainer = document.querySelector ('.element');

function openPopup(popup) {
    document.addEventListener('keydown', closeBtnEsc);
    popup.addEventListener('click', clickOverlay);
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeBtnEsc);
    popup.removeEventListener('click', clickOverlay);

}

function clickOverlay (evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
    }
}

function closeBtnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function cardCheck() {
    const cardMassive = initialCards.map(getElement);
    cardsContainer.append(...cardMassive);
}

function getElement(item) {
    const clonElementTemplate = template.content.cloneNode(true);
    const title = clonElementTemplate.querySelector('.element__title');
    const imageCard = clonElementTemplate.querySelector('.element__img');
    const removeButton = clonElementTemplate.querySelector('.element__card-remove');
    const likeButton = clonElementTemplate.querySelector('.element__like');
    const elementImg = clonElementTemplate.querySelector('.element__img');
    title.textContent = item.name;
    imageCard.setAttribute ('src', item.link);
    imageCard.setAttribute ('alt', item.name);
    removeButton.addEventListener('click', removeHandler);
    likeButton.addEventListener('click', likeHandler);
    elementImg.addEventListener('click', () => openLargeImg(item.name, item.link));
    return clonElementTemplate;
}

function openLargeImg(name, link) {
  popupFoto.src = link;
  popupFoto.alt = name;
  popupTitleFoto.textContent = name;
  openPopup(popupImage)

}

function likeHandler (evt){
  const likeBlack = evt.target.closest('.element__like');
  likeBlack.classList.toggle('element__like_black');
}

function removeHandler(evt){
  const remCard = evt.target.closest('.element__card');
  remCard.remove();
}

function openProfileHandler() {
    nameInput.value = profileName.textContent;
    specializationInput.value = profileSpec.textContent;
    openPopup(popupEdit);
}

function editProfileHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileSpec.textContent = specializationInput.value;
    closePopup(popupEdit);
}

function openHandleCardAdd (){
  formAddElement.reset();
  openPopup(popupAddOpen);
  buttonAddCard.classList.add('popup__button_disable');
}

function handleCardAdd (evt) {
  evt.preventDefault();
  const cardAddItem = getElement({name: titleInput.value, link: imageInput.value});
  cardsContainer.prepend(cardAddItem);
}

imgClosePopup.addEventListener('click', () => closePopup(popupImage));
popupAddBtn.addEventListener('click', openHandleCardAdd);
popupEditBtn.addEventListener('click', openProfileHandler);
popupCloseEdit.addEventListener('click', () => closePopup(popupEdit));
popupCloseAdd.addEventListener('click', () => closePopup(popupAddOpen));
formEditElement.addEventListener('submit', editProfileHandler);
formAddElement.addEventListener('submit', handleCardAdd);
buttonAddCard.addEventListener('click', () => closePopup(popupAddOpen));

cardCheck();