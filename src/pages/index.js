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

import {
    cardsContainer,
    popupImage,
    popupEditBtn,
    popupEdit,
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
    config,
    configApi,
    userData
} from "../utils/constants.js"



const api = new Api ({
    url: configApi.baseUrl,
    headers: configApi.headers
  }
)

const imageLarge = new PopupWithImage(popupImage);

const userDataInfo = new UserInfo ({name: userData.name, about: userData.about, avatar: userData.avatar});

const formValidators = {};

const popupConfirm = new PopupWithConfirmation (popupWithConfirm);


const cardsContainerSection = new Section({
    renderer: (item) => {
      const card = createCard (item);
      cardsContainerSection.addItem(card);
    },
  },
  cardsContainer
);


//функция отрисовки карточки
function createCard (item) {
  const cards = new Card (item, '.element__template', handleCardClick, userDataInfo.getIdClient (), deleteCard,{ 
  likeHandle: (item) => {
    api.likePut(item._id)
    .then((res) => {cards.checkHandleLike(res)}) 
    .catch((err) => {console.log('Ошибка' + err)})
  },
  unHandleLike: (item) => {
    api.likeUnPut(item._id)
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
      cardAddHandle.download(true);
      api.addCard(inputsValue)
      .then((tasks) => {
          const cardHandle = createCard (tasks);
          cardsContainerSection.prependItem(cardHandle);
          cardAddHandle.close();
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
  popupConfirm.requestDeleteCard( () =>   {
    api.deleteCard(card.idCard)
      .then (() => {
        card.handleRemoveCard();
        popupConfirm.close();
      })
      .catch ((err) => {
        console.log ('Ошибка' + err);
      })
    })
    
    popupConfirm.open();
  }

//Ручное добавление данных пользователя
const profileAddHandle = new PopupWithForm (popupEdit, {
  handleFormSubmit: (item) => {
    const inputsUserHandle = {name: item.nameProfile, about: item.aboutProfile};
    profileAddHandle.download(true);
        api.addUser(inputsUserHandle)
        .then ((task) => {
            userDataInfo.setUserInfo(inputsUserHandle);
            profileAddHandle.close();
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
    handleAddAvatarForm.download(true);
    api.avatar({avatar: data.avatar})
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
Promise.all([api.getTasksUser(), api.getTasksCards()])
  .then (([userInfo, cards]) => {
    userDataInfo.setUserInfo({name: userInfo.name, about: userInfo.about});
    userDataInfo.setUserAvatar({avatar: userInfo.avatar})
    userDataInfo.setIdClient(userInfo._id);
    cardsContainerSection.renderInitialItems(cards)
          const card = createCard (item);
          cardsContainerSection.addItem(card);
        },
        cardsContainer
    )

  .catch((err) => {
    console.log ('Ошибка' + err);
  })

popupAddBtn.addEventListener('click', openHandleCardAdd);
popupEditBtn.addEventListener('click', openProfileHandler);
profileAvatarImg.addEventListener('click', handleOpenAddAvatar);

cardAddHandle.setEventListeners();
profileAddHandle.setEventListeners();
handleAddAvatarForm.setEventListeners();
popupConfirm.setEventListener();

enableValidation(config);