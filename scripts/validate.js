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

  inputs.forEach((element) => {
      element.addEventListener('input', (event) => handleInputForm(event, formElement, config));
  })
  toggleButton(formElement, config);
})};


function toggleButton (formElement, config) {
  const button = formElement.querySelector(config.buttonSelector);
  button.disabled = !formElement.checkValidity();
  button.classList.toggle(config.inactiveButtonClass, !formElement.checkValidity());
}

function handleInputForm(event, formElement, config){
  const input = event.target;
  const errorNode = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid){
      errorNode.textContent = '';
  } else {
      errorNode.textContent = input.validationMessage;
  }
  toggleButton (formElement, config);
}

enableValidation(config);