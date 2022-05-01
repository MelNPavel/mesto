const config = {
  formSelector: '.popup__form',
  inputType: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};


function enableValidation ({formSelector, inputType, ...config}){
  const formAll = Array.from (document.querySelectorAll(formSelector));

  formAll.forEach((formElement) => {
  const inputs = formElement.querySelectorAll(inputType);

  inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => handleInputForm(inputElement, formElement, config));
  })
  toggleButton(formElement, config);
})};


function toggleButton (formElement, config) {
  const button = formElement.querySelector(config.buttonSelector);
  button.disabled = !formElement.checkValidity();
  button.classList.toggle(config.inactiveButtonClass, !formElement.checkValidity());
}

function handleInputForm(inputElement, formElement, config){

  if (inputElement.validity.valid){
    hideInputError (inputElement, config)
  } else {
    showInputError (inputElement, config)
  }
  toggleButton (formElement, config);
}


function showInputError (inputElement, config){
  const errorNode = document.querySelector(`#${inputElement.id}-error`);
  errorNode.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
};


function hideInputError (inputElement, config) {
    const errorNode = document.querySelector(`#${inputElement.id}-error`);
    errorNode.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
};


enableValidation(config);