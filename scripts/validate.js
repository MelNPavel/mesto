const config = { 
  formSelector: '.popup__form', 
  inputType: '.popup__input', 
  buttonSelector: '.popup__button', 
  inactiveButtonClass: 'popup__button_disable', 
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

// enableValidation({ 
//   formSelector: '.popup__form_add_type', 
//   inputType: '.popup__input', 
//   buttonSelector: '.popup__button_place_add', 
//   inactiveButtonClass: 'popup__button_disable', 
// }); 
