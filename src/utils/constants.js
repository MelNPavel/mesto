const cardsContainer = document.querySelector('.element');
const popupImage = document.querySelector('.popup_image_background');
const popupEditBtn = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit_place');
const imgClosePopup = document.querySelector('.popup__close_place_foto');
const nameInput = document.querySelector('.popup__input_type_name');
const specializationInput = document.querySelector('.popup__input_type_about');
const formEditElement = document.querySelector('.popup__form_edit_type');
const formAddElement = document.querySelector('.popup__form_add_type');
const popupAddBtn = document.querySelector('.profile__add-button');
const popupAddOpen = document.querySelector('.popup_add_place');
const popupWithConfirm = document.querySelector('.popup_consent_type');
const profileAvatarImg = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup_avatar_type');
const popupFormAvatar = document.querySelector('.popup__form_type_avatar');
const buttonDeletePopup = document.querySelector('.popup__button_type_avatar')
const buttonPopupWithConfirm = document.querySelector('.popup__button_type_consent');

const config = {
    formSelector: '.popup__form',
    inputType: '.popup__input',
    buttonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

const configApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43/',
  headers: {
    authorization: '86b10ee1-81f7-46f9-8c08-51d061f72e78',
    'Content-Type': 'application/json'
  },
};

const userAvatar = '.profile__avatar'
const userName ='.profile__info-name';
const userAbout ='.profile__info-about';
const userData = {
  name: userName,
  about: userAbout,
  avatar: userAvatar
};


export {
    cardsContainer,
    popupImage,
    popupEditBtn,
    popupEdit,
    imgClosePopup,
    nameInput,
    specializationInput,
    formEditElement,
    formAddElement,
    popupAddBtn,
    popupAddOpen,
    popupWithConfirm,
    profileAvatarImg,
    popupAvatar,
    popupFormAvatar,
    buttonDeletePopup,
    buttonPopupWithConfirm,
    config,
    configApi,
    userAvatar,
    userName,
    userAbout,
    userData
}