let editBtnPopup = document.querySelector ('.edit-button');
let popupOpen = document.querySelector ('.popup');
let closeBtnPopup = document.querySelector ('.popup__close')
let ProfileName = document.querySelector ('.profile-info__name')
let ProfileSpec = document.querySelector ('.profile-info__about')
let inputName = document.querySelector ('.popup__input-name');
let inputSpec = document.querySelector ('.popup__input-about');
let submitPopup = document.querySelector ('.popup__button')


function togglePopup () {
    popupOpen.classList.toggle ('popup_opened');
    inputName.value = ProfileName.textContent;
    inputSpec.value = ProfileSpec.textContent;
}
editBtnPopup.addEventListener ('click', togglePopup);
closeBtnPopup.addEventListener ('click', togglePopup);


function clickOverlay (event) {
    if (event.target === event.currentTarget) {
        togglePopup ();
    }
}
popupOpen.addEventListener ('click', clickOverlay);


let formElement = document.querySelector ('.popup__form');
function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = document.querySelector ('.popup__input-name');
    let jobInput = document.querySelector ('.popup__input-about');
    ProfileName.textContent = nameInput.value;
    ProfileSpec.textContent = jobInput.value;
    togglePopup ();
}
formElement.addEventListener('submit', formSubmitHandler);


let like = document.querySelector('.element__like');
function likeBlack () {
    like.classList.toggle ('element__like_black');
}
like.addEventListener('click', likeBlack);