import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const urlApiCard = 'https://mesto.nomoreparties.co/v1/cohort-43/cards';
const urlApiHandle = 'https://mesto.nomoreparties.co/v1/cohort-43/users/me';
const urlApi = 'https://nomoreparties.co/v1/cohort-43/users/me';
const headersAPi = {
   authorization: '86b10ee1-81f7-46f9-8c08-51d061f72e78',
   'Content-Type': 'application/json'
};
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
const popupWithConfirm = document.querySelector('.popup__consent_type_consent');
const profileAvatarImg = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup__avatar_type_avatar');
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

const userAvatar = '.profile__avatar'
const userName ='.profile__info-name';
const userAbout ='.profile__info-about';
const userData = {
  name: userName,
  about: userAbout,
  avatar: userAvatar
};

const apiUser = new Api ({
    url: urlApi,
    headers: headersAPi
  }
)

const apiCard = new Api ({
  url: urlApiCard,
  headers: headersAPi
})

const imageLarge = new PopupWithImage(popupImage);

const userDataInfo = new UserInfo ({name: userData.name, about: userData.about, avatar: userData.avatar});

const formValidators = {};

const popupConfirm = new PopupWithConfirmation (popupWithConfirm);

//функция отрисовки карточек
function createCard (item) {
  const cards = new Card (item, '.element__template', handleCardClick, userDataInfo.getIdClient (), deleteCard,{ 
  likeHandle: (item) => {
    apiCard.likePut(item._id)
    .then((res) => {cards.checkHandleLike(res)}) 
    .catch((err) => {console.log('Ошибка' + err)})
  },
  unHandleLike: (item) => {
    apiCard.likeUnPut(item._id)
    .then((res) => {cards.deleteHandleLike(res)})
    .catch((err) => {console.log('Ошибка' + err)})
  }});

  const cardsElement = cards.generate();
  return cardsElement;
};

//Ручное добавление карточек
const cardAddHandle = new PopupWithForm (popupAddOpen, {
  handleFormSubmit: (item) => {
    const inputsValue = {name: item.nameCard, link: item.linkCard};
    const apiCardHandle = new Api ({
      url: urlApiCard,
      headers: headersAPi})
      cardAddHandle.download(true);
      apiCardHandle.addCard(inputsValue)
      .then((tasks) => {
          const cardHandle = createCard (tasks)
          cardsContainer.prepend(cardHandle)
      })
      .catch((err) => {
        console.log ('Ошибка' + err)
      })
      .finally(() => {
        cardAddHandle.download(false)
      })
  },
},
cardsContainer);

//открытие попапа добавления карточек
function openHandleCardAdd (){
  formAddElement.reset();
  formValidators['formPopupAdd'].resetInputError(formAddElement);
  cardAddHandle.open();
}

//удаление карточки
function deleteCard (card) {
  
  popupConfirm.reqDelCard(() => {
    apiCard.deleteCard(card.idCard)
      .then ((res) => {
        card.handleRemoveCard();
        popupConfirm.close();
      })
      .catch ((err) => {
        console.log ('Ошибка' + err);
      })
    });
    popupConfirm.open();

}

// function deleteCardDownload(card) {
    
// }

//Ручное добавление данных пользователя
const profileAddHandle = new PopupWithForm (popupEdit, {
  handleFormSubmit: (item) => {
    const inputsUserHandle = {name: item.nameProfile, about: item.aboutProfile};
    profileAddHandle.download(true);
    const apiUserHandle = new Api ({
        url: urlApiHandle,
        headers: headersAPi})
        apiUserHandle.addUser(inputsUserHandle)
        .then ((task) => {
            userDataInfo.setUserInfo(inputsUserHandle);
        })
        .catch((err) => {
            console.log ('Ошибка' + err);
        })
        .finally(()=>{
          profileAddHandle.download(false);
        })
  }});

//открытие попапа редактирования профиля
function openProfileHandler() {
    const userGetInfo = userDataInfo.getUserInfo();
    nameInput.value = userGetInfo.name;
    specializationInput.value = userGetInfo.about;
    formValidators['formPopupEdit'].resetInputError(formEditElement);
    profileAddHandle.open();
};

//ручное добавление аватара
const handleAddAvatarForm = new PopupWithForm (popupAvatar, {
  handleFormSubmit: (data) => {
    const apiUserAvatarHandle = new Api ({
        url: urlApiHandle,
        headers: headersAPi})
    handleAddAvatarForm.download(true);
    apiUserAvatarHandle.avatar({avatar: data.avatar})
      .then((res) => {
        profileAvatarImg.style.backgroundImage = `url(${res.avatar})`;
        handleAddAvatarForm.close();
      })
      .catch((err) => {
        console.log ('Ошибка' + err);
      })
      .finally (() => {
        handleAddAvatarForm.download(false);
      })
  }
}
);

//открытие попапа добавление аватара
function handleOpenAddAvatar() {
  formValidators['formPopupAvatar'].resetInputError(popupFormAvatar);
  handleAddAvatarForm.open();
}



//валидация формы
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

//открытие большой картинки при клике
function handleCardClick (name, link) {
    imageLarge.open(name, link);
}

//Первоначальная инициализация карточек и данных пользователя
Promise.all([apiUser.getTasks(), apiCard.getTasks()])
  .then (([userInfo, cards]) => {
    userDataInfo.setUserInfo({name: userInfo.name, about: userInfo.about});
    userDataInfo.setUserAvatar({avatar: userInfo.avatar})
    userDataInfo.setIdClient(userInfo._id);
    const cardsContainerSection = new Section({
        items: cards,
        renderer: (item) => {
          const card = createCard (item);
          cardsContainerSection.addItem(card);
        },
    },
        cardsContainer
    );
    cardsContainerSection.renderInitialItems();
  })
  .catch((err) => {
    console.log ('Ошибка' + err);
  })




imgClosePopup.addEventListener('click', () => {
    imageLarge.close()
});

popupAddBtn.addEventListener('click', openHandleCardAdd);
popupEditBtn.addEventListener('click', openProfileHandler);
profileAvatarImg.addEventListener('click', handleOpenAddAvatar);

cardAddHandle.setEventListeners();
profileAddHandle.setEventListeners();
handleAddAvatarForm.setEventListeners();
popupConfirm.setEventListener();

enableValidation(config);
