
import './index.css';
import Card from '../components/Card.js';
import initialCards from '../components/initialCards.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'

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
// const userName ='.profile__info-name';
// const userAbout ='.profile__info-about';
// const userData = 
//   fetch ('https://nomoreparties.co/v1/cohort-43/users/me', {
//   headers: {
//     authorization: '86b10ee1-81f7-46f9-8c08-51d061f72e78'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   })
const apiUser = new Api ('https://nomoreparties.co/v1/cohort-43/users/me', {
    headers: {
      authorization: '86b10ee1-81f7-46f9-8c08-51d061f72e78'
    }
  }
)

const userData = {}

apiUser.getTasks()
  .then((tasks) => {
    // userData = {name: tasks.name, about: tasks.about};
    console.log(tasks)
  })
  .catch((err) => {
    console.log ('Ошибка' + err)
  })



const imageLarge = new PopupWithImage(popupImage);
const userDataInfo = new UserInfo ({name: userData.name, about: userData.about});
const formValidators = {};

function createCard (item) {
  const cards = new Card (item, '.element__template', handleCardClick);
  const cardsElement = cards.generate();
  return cardsElement;
};

const cardsContainerSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard (item);
    cardsContainerSection.addItem(card);
  },
},
  cardsContainer
);

cardsContainerSection.renderInitialItems();


const cardAddHandle = new PopupWithForm (popupAddOpen, {
  handleFormSubmit: (item) => {
    const inputsValue = {name: item.nameCard, link: item.linkCard};
        const cardHandle = createCard (inputsValue);
        cardsContainerSection.prependItem(cardHandle);
      },
    },
      cardsContainer
    );

function openHandleCardAdd (){
  formAddElement.reset();
  formValidators['formPopupAdd'].resetInputError();
  cardAddHandle.open();
}

const profileAddHandle = new PopupWithForm (popupEdit, {
  handleFormSubmit: (item) => {
    const inputsUserHandle = {nameProfile: item.nameProfile, aboutProfile: item.aboutProfile};
    userDataInfo.setUserInfo(inputsUserHandle);
  }});

function openProfileHandler() {
    const userGetInfo = userDataInfo.getUserInfo();
    nameInput.value = userGetInfo.name;
    specializationInput.value = userGetInfo.about;
    formValidators['formPopupEdit'].resetInputError(formEditElement);
    profileAddHandle.open();
};

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

function handleCardClick (name, link) {
    imageLarge.open(name, link);
}

enableValidation(config);

imgClosePopup.addEventListener('click', () => {
    imageLarge.close()
  }
);

cardAddHandle.setEventListeners();
profileAddHandle.setEventListeners();

popupAddBtn.addEventListener('click', openHandleCardAdd);
popupEditBtn.addEventListener('click', openProfileHandler);