
import './index.css';
import Card from '../components/Card.js';
import initialCards from '../components/initialCards.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const cardsContainer = document.querySelector ('.element');
const popupImage = document.querySelector('.popup_image_background');
const popupEditBtn = document.querySelector ('.profile__edit-button');
const popupEdit = document.querySelector ('.popup_edit_place');
const imgClosePopup = document.querySelector('.popup__close_place_foto');
const nameInput = document.querySelector ('.popup__input_type_name');
const specializationInput = document.querySelector ('.popup__input_type_about');
const formEditElement = document.querySelector ('.popup__form_edit_type');
const formAddElement = document.querySelector ('.popup__form_add_type');
const popupAddBtn = document.querySelector ('.profile__add-button');
const popupAddOpen = document.querySelector ('.popup_add_place');
const config = {
    formSelector: '.popup__form',
    inputType: '.popup__input',
    buttonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};
const userName ='.profile__info-name';
const userAbout ='.profile__info-about';
const userData = {
    name: userName,
    about: userAbout
};

const userHandleData = {
  name: nameInput,
  about: specializationInput
};

const formValidators = {};

const cardCreate = new Section({
  items: initialCards,
  renderer: (item) => {
    const cards = new Card (item, '.element__template', handleCardClick);
    const cardsElement = cards.generate();
    cardCreate.addItem(cardsElement);
    },
  },
  cardsContainer
);

cardCreate.createCard();

const cardAddHandle = new PopupWithForm (popupAddOpen, {
  handleFormSubmit: (item) => {
    const inputsValue = [{name: item.nameCard, link: item.linkCard}];

    const cardHandleCreate = new Section({
      items: inputsValue,
      renderer: (item) => {
        const cards = new Card (item, '.element__template', handleCardClick);
        const cardsElement = cards.generate();
        cardCreate.prependItem(cardsElement);
        },
      },
      cardsContainer
    );
    cardHandleCreate.createCard();
}});

function openHandleCardAdd (){
    formAddElement.reset();
    formValidators['formPopupAdd'].resetInputError();
    const popupOpen = new Popup(popupAddOpen);
    popupOpen.open();
    cardAddHandle.setEventListeners();
}

function enableValidation (config){
    const formAll = Array.from (document.querySelectorAll(config.formSelector));
    formAll.forEach((formElement) => {
      const button = formElement.querySelector(config.buttonSelector);
      const formValidator = new FormValidator(config, formElement, button);
      const name = formElement.getAttribute('name');
      formValidators [name] = formValidator;
      formValidator.enableValidation(config, formElement);
    });
};

function handleCardClick (popupImage, name, link) {
    const imageLarge = new PopupWithImage(popupImage, name, link);
    imageLarge.open();
}

const profileAddHandle = new PopupWithForm (popupEdit, {
  handleFormSubmit: (item) => {
    const inputsUserHandle = {nameProfile: item.nameProfile, aboutProfile: item.aboutProfile};
    const userDataInfo = new UserInfo ({name: userData.name, about: userData.about});
    userDataInfo.setUserInfo(inputsUserHandle);
  }});

function openProfileHandler() {
    const userDataInfo = new UserInfo({name: userData.name, about: userData.about});
    const userGetInfo = userDataInfo.getUserInfo();
    nameInput.value = userGetInfo.name;
    specializationInput.value = userGetInfo.about;
    profileAddHandle.setEventListeners();
    const popupOpen = new Popup(popupEdit);
    popupOpen.open();
    popupOpen.setEventListeners();
};

enableValidation(config);

imgClosePopup.addEventListener('click', () => {
    const popupClose = new Popup(popupImage);
    popupClose.close()
  }
);

popupAddBtn.addEventListener('click', openHandleCardAdd);
popupEditBtn.addEventListener('click', openProfileHandler);