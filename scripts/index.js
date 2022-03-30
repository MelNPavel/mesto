let editBtnPopup = document.querySelector ('.profile__edit-button');
let popupOpen = document.querySelector ('.popup');
let closeBtnPopup = document.querySelector ('.popup__close')
let profileName = document.querySelector ('.profile__info-name')
let profileSpec = document.querySelector ('.profile__info-about')
let inputName = document.querySelector ('.popup__input_name');
let inputSpec = document.querySelector ('.popup__input_about');
let formElement = document.querySelector ('.popup__form');

function togglePopup () {
    popupOpen.classList.toggle ('popup_opened');
    inputName.value = profileName.textContent;
    inputSpec.value = profileSpec.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileSpec.textContent = inputSpec.value;
    togglePopup ();
}

editBtnPopup.addEventListener ('click', togglePopup);
closeBtnPopup.addEventListener ('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);

// function clickOverlay (event) {
//     if (event.target === event.currentTarget) {
//         togglePopup ();
//     }
// }
// popupOpen.addEventListener ('click', clickOverlay);