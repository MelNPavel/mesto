
import './index.css';
import Card from '../components/Card.js';
// import initialCards from '../components/initialCards.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const likePutUrl = 'https://mesto.nomoreparties.co/v1/cohort-43/cards';
const urlApiCardHandle = 'https://mesto.nomoreparties.co/v1/cohort-43/cards';
const urlApiCard = 'https://mesto.nomoreparties.co/v1/cohort-43/cards';
const urlApiHandle = 'https://mesto.nomoreparties.co/v1/cohort-43/users/me';
const urlApi = 'https://nomoreparties.co/v1/cohort-43/users/me';
const headersAPi = {
   authorization: '86b10ee1-81f7-46f9-8c08-51d061f72e78',
   'Content-Type': 'application/json'
};
// const bodyApiHandle = JSON.stringify({
//   name: 'Marie Skłodowska Curie',
//   about: 'Physicist and Chemist'});
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
const popupWithConfirm = document.querySelector('.popup__consent_type_consent');
 
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
const userDataInfo = new UserInfo ({name: userData.name, about: userData.about});
const formValidators = {};

const popupConfirm = new PopupWithConfirmation (popupWithConfirm);

function createCard (item) {
  const cards = new Card (item, '.element__template', handleCardClick, userDataInfo.getIdClient (), deleteCard,{ 
  likeHandle: (item) => {
    apiCard.likePut(item._id)
    .then((res) => {cards.checkHandleLike(res)}) 
    .catch((err) => {console.log('Ошибка')})
  },
  unHandleLike: (item) => {
    apiCard.likeUnPut(item._id)
    .then((res) => {cards.deleteHandleLike(res)})
    .catch((err) => {console.log('Ошибка')})
  }});

  const cardsElement = cards.generate();
  return cardsElement;
};


//Первоначальная инициализация карточек
// apiCard.getTasks()
// .then((tasks) => {
//   const cardsContainerSection = new Section({
//     items: tasks,
//     renderer: (item) => {
//       const card = createCard (item);
//       cardsContainerSection.addItem(card);
//       const itemsCrd = item;
//       const like = itemsCrd.likes.length;
//       const likeCount = document.querySelector ('.element__like-count');
//       likeCount.textContent = like;
//     },
//   },
//     cardsContainer
//   );
//   cardsContainerSection.renderInitialItems();
// })



//Ручное добавление карточек
const cardAddHandle = new PopupWithForm (popupAddOpen, {
  handleFormSubmit: (item) => {
    const inputsValue = {name: item.nameCard, link: item.linkCard};
    const apiCardHandle = new Api ({
      url: urlApiCardHandle,
      headers: headersAPi})
      apiCardHandle.addCard(inputsValue)
      .then((tasks)=>{
          const cardHandle = createCard (tasks);
          cardsContainer.prepend(cardHandle);
      })
  },
},
cardsContainer);

function openHandleCardAdd (){
  formAddElement.reset();
  formValidators['formPopupAdd'].resetInputError();
  cardAddHandle.open();
}





function deleteCard (card) {
  popupConfirm.open();
  apiCard.deleteCard(card.idCard)
    .then ((res) => {
      if (res.ok){
        card.handleRemoveCard();

      }
    })
    .catch ((err) => {
      console.log ('Ошибка');
    })
}

//первоначальная инициализация данных пользователя
// apiUser.getTasks()
// .then((tasks) => {
//   userDataInfo.setUserInfo({name: tasks.name, about: tasks.about});
//   userDataInfo.setIdClient(tasks._id);
// })
// .catch((err) => {
//   console.log ('Ошибка' + err)
// })

//Ручное добавление данных пользователя
const profileAddHandle = new PopupWithForm (popupEdit, {
  handleFormSubmit: (item) => {
    const inputsUserHandle = {name: item.nameProfile, about: item.aboutProfile};

  const apiUserHandle = new Api ({
      url: urlApiHandle,
      headers: headersAPi})
  apiUserHandle.addUser(inputsUserHandle)
  .then ((task) => {
      userDataInfo.setUserInfo(inputsUserHandle)
      console.log(task)
      })
  .catch((err) => {
      console.log ('Ошибка' + err)
      })
  // userDataInfo.setUserInfo(inputsUserHandle);
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



//Первоначальная инициализация карточек и данных пользователя
Promise.all([apiUser.getTasks(), apiCard.getTasks()])
  .then (([userInfo, cards]) => {
    userDataInfo.setUserInfo({name: userInfo.name, about: userInfo.about});
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
    console.log ('Ошибка' + err)})




cardAddHandle.setEventListeners();
profileAddHandle.setEventListeners();

popupAddBtn.addEventListener('click', openHandleCardAdd);
popupEditBtn.addEventListener('click', openProfileHandler);