import Card from './Card.js';
import initialCards from './initialCards.js';
import FormValidator from './FormValidator.js';

const cardsContainer = document.querySelector ('.element');
const popupImage = document.querySelector('.popup_image_background');

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

const config = {
    formSelector: '.popup__form',
    inputType: '.popup__input',
    buttonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

const inputOutEnableValidation = {};

initialCards.forEach((item) => {
    const cards = new Card (item.name, item.link, () => openLargeImg(item.name, item.link));
    const cardElement = cards.generate();
    cardsContainer.append(cardElement);
});

function enableValidation (config){
  const formAll = Array.from (document.querySelectorAll(config.formSelector));
  formAll.forEach((formElement) => {
    const button = formElement.querySelector(config.buttonSelector);
    const inputs = new FormValidator(config, formElement, button);
  const name = formElement.getAttribute('name');
  inputOutEnableValidation [name] = inputs;
  inputs.enableValidation(config, formElement);
  })
};

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

function openLargeImg(name, link) {
    const popupFoto = document.querySelector('.popup__foto');
    const popupTitleFoto = document.querySelector('.popup__foto-name');
    popupFoto.src = link;
    popupFoto.alt = name;
    popupTitleFoto.textContent = name;
    openPopup(popupImage);

}
function openProfileHandler() {
    nameInput.value = profileName.textContent;
    specializationInput.value = profileSpec.textContent;
    inputOutEnableValidation['formPopupEdit'].resetInputError(formEditElement);
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
    inputOutEnableValidation['formPopupAdd'].resetInputError();
    openPopup(popupAddOpen);
}


function handleCardAdd (evt) {
    evt.preventDefault();
    const cardAddItem = new Card (titleInput.value, imageInput.value, openLargeImg);
    const cardElement = cardAddItem.generate();
    cardsContainer.prepend(cardElement);
    }

enableValidation(config);

imgClosePopup.addEventListener('click', () => closePopup(popupImage));
popupAddBtn.addEventListener('click', openHandleCardAdd);
popupEditBtn.addEventListener('click', openProfileHandler);
popupCloseEdit.addEventListener('click', () => closePopup(popupEdit));
popupCloseAdd.addEventListener('click', () => closePopup(popupAddOpen));
formEditElement.addEventListener('submit', editProfileHandler);
formAddElement.addEventListener('submit', handleCardAdd);
buttonAddCard.addEventListener('click' , () => closePopup(popupAddOpen));

