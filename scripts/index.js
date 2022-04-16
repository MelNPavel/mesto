let popupImage = document.querySelector('.popup__image_place_background');
let popupFoto = document.querySelector('.popup__foto');
let popupTitleFoto = document.querySelector('.popup__foto-name');

let popupEditBtn = document.querySelector ('.profile__edit-button');
let popupEditOpen = document.querySelector ('.popup__edit_place_profile');

let popupCloseEdit = document.querySelector ('.popup__close_edit_type');
let popupCloseAdd = document.querySelector ('.popup__close_add_type');
let imgClosePopup = document.querySelector('.popup__close_place_foto');

let profileName = document.querySelector ('.profile__info-name');
let profileSpec = document.querySelector ('.profile__info-about');

let inputName = document.querySelector ('.popup__input_type_name');
let inputSpec = document.querySelector ('.popup__input_type_about');

let formEditElement = document.querySelector ('.popup__form_edit_type');
let formAddElement = document.querySelector ('.popup__form_add_type');

let buttonAddCard = document.querySelector('.popup__button_place_add');

let addBtnPopup = document.querySelector ('.profile__add-button');
let popupAddOpen = document.querySelector ('.popup__add_place_card');

const template = document.querySelector ('.element__template');
const cards = document.querySelector ('.element');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function cardCheck() {
    const cardMassive = initialCards.map(getElement);
    cards.append(...cardMassive);
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
  toggleImgPopup();
}

function toggleImgPopup () {
  popupImage.classList.toggle ('popup_opened');
}

function likeHandler (evt){
  const likeBlack = evt.target.closest('.element__like');
  likeBlack.classList.toggle('element__like_black');  
}

function removeHandler(evt){
  const remCard = evt.target.closest('.element__card');
  remCard.remove();
}

function toggleEditPopup () {
    popupEditOpen.classList.toggle ('popup_opened');
    inputName.value = profileName.textContent;
    inputSpec.value = profileSpec.textContent;
}

function editProfileHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileSpec.textContent = inputSpec.value;
    toggleEditPopup ();
}

function toggleAddPopup () {
  popupAddOpen.classList.toggle ('popup_opened');
}

function handleCardAdd (evt) {
  evt.preventDefault();
  const inputTitleValue = document.querySelector (".popup__input_type_title").value;
  let inputImageValue = document.querySelector (".popup__input_type_image").value;
  const cardAddItem = getElement({name: inputTitleValue, link: inputImageValue});
  cards.prepend(cardAddItem);
}

imgClosePopup.addEventListener('click', toggleImgPopup);
addBtnPopup.addEventListener('click', toggleAddPopup);
popupEditBtn.addEventListener('click', toggleEditPopup);
popupCloseEdit.addEventListener('click', toggleEditPopup);
popupCloseAdd.addEventListener('click', toggleAddPopup);
formEditElement.addEventListener('submit', editProfileHandler);
formAddElement.addEventListener('submit', handleCardAdd);
buttonAddCard.addEventListener('click', toggleAddPopup);

cardCheck();


// let elementLike = document.querySelector ('.element__like');
// function likeBlack(evt){
// evt.target.elementLike.classList.toggle ('.element__like_black');
// };
// elementLike.addEventListener('click', likeBlack(evt));

// // // function clickOverlay (event) {
// // //     if (event.target === event.currentTarget) {
// // //         togglePopup ();
// // //     }
// // // }
// // // popupOpen.addEventListener ('click', clickOverlay);