import Card from './Card.js';
import initialCards from './initialCards.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const template = document.querySelector ('.element__template');
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

const popupFoto = document.querySelector('.popup__foto');
const popupTitleFoto = document.querySelector('.popup__foto-name');

const config = {
    formSelector: '.popup__form',
    inputType: '.popup__input',
    buttonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

const formValidators = {};


const cardCreate = new Section({
  items: initialCards,
  renderer: (item) => {
    const cards = new Card (item, '.element__template', openLargeImg);
    const cardsElement = cards.generate();
    cardCreate.addItem(cardsElement);
    },
  },
  cardsContainer
);

cardCreate.createCard();

const cardAdd = new PopupWithForm (formAddElement, handleCardAdd);

function handleCardAdd (items) {
  console.log(items);
  const cardHandle = {items:name, items:link}
  console.log(cardHandle);
  // const cardHandleCreate = new Section({
  //   items: initialCards,
  //   renderer: (item) => {
  //     const cards = new Card (item, '.element__template', openLargeImg);
  //     const cardsElement = cards.generate();
  //     cardHandleCreate.addItem(cardsElement);
  //     },
  //   },
  //   cardsContainer
  // );

}

function enableValidation (config){
  const formAll = Array.from (document.querySelectorAll(config.formSelector));
  formAll.forEach((formElement) => {
    const button = formElement.querySelector(config.buttonSelector);
    const formValidator = new FormValidator(config, formElement, button);
  const name = formElement.getAttribute('name');
  formValidators [name] = formValidator;
  formValidator.enableValidation(config, formElement);
  })
};

function openLargeImg (popupImage, name, link) {
  const imageLarge = new PopupWithImage(popupImage, name, link);
  imageLarge.open();
}

function openProfileHandler() {
    nameInput.value = profileName.textContent;
    specializationInput.value = profileSpec.textContent;
    formValidators['formPopupEdit'].resetInputError(formEditElement);
    const popupOpen = new Popup(popupEdit);
    popupOpen.open();
}

function editProfileHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileSpec.textContent = specializationInput.value;
    const popupClose = new Popup(popupEdit);
    popupClose.close();
}

function openHandleCardAdd (){
    // formAddElement.reset();
    formValidators['formPopupAdd'].resetInputError();
    cardAdd.setEventListeners();
    const popupOpen = new Popup(popupAddOpen);
    popupOpen.open();
}

enableValidation(config);

imgClosePopup.addEventListener('click', () => {
  const popupClose = new Popup(popupImage);
  popupClose.close()});

popupAddBtn.addEventListener('click', openHandleCardAdd);
popupEditBtn.addEventListener('click', openProfileHandler);

popupCloseEdit.addEventListener('click', () => {
  const popupClose = new Popup(popupEdit);
  popupClose.close();
});

popupCloseAdd.addEventListener('click', () => {
  const popupClose = new Popup(popupAddOpen);
  popupClose.close();
});

formEditElement.addEventListener('submit', editProfileHandler);
// formAddElement.addEventListener('submit', handleCardAdd);

// buttonAddCard.addEventListener('click' , () => {
//   const popupClose = new Popup(popupAddOpen);
//   popupClose.close()
// });