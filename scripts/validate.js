function enableValidation (config){
    const form = document.querySelector(config.formSelector);
    const inputs = form.querySelectorAll(config.inputType);

    inputs.forEach((element) => {
        element.addEventListener('input', (event) => handleInputForm(event, form, config));
    })

    // form.addEventListener ('submit', (event) => handleSubmitForm(event, form));

    toggleButton(form, config);
}


function toggleButton (form, config) {
    const button = document.querySelector(config.buttonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}


// function handleSubmitForm(event, form){
//     event.preventDefault();
//     if (form.checkValidity()){
//         alert ('формавалидна')
//     } else {
//         alert ('форма не валидня')
//     };
// }


function handleInputForm(event, form, config){
    const input = event.target;
    const errorNode = document.querySelector(`#${input.id}-error`);
    if (input.validity.valid){
        errorNode.textContent = '';
    } else {
        errorNode.textContent = input.validationMessage;
    }

    toggleButton (form, config);
}


enableValidation({
    formSelector: '.popup__form_edit_type',
    inputType: '.popup__input',
    buttonSelector: '.popup__button',
    // submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disable',
    // inputErrorClass: 'popup__input_type_error',
    // errorClass: 'popup__error_visible'
  }); 


  enableValidation({
    formSelector: '.popup__form_add_type',
    inputType: '.popup__input',
    buttonSelector: '.popup__button_place_add',
    // submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disable',
    // inputErrorClass: 'popup__input_type_error',
    // errorClass: 'popup__error_visible'
  }); 
