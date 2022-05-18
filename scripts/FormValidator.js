class FormValidator {
    constructor(config, formItem) {
        this._formSelector = config.formSelector;
        this._inputType = config.inputType;
        this._buttonSelector = config.buttonSelector;
        
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formItem = formItem;

    }

_toggleButton (formElement, button, config) {
  button.disabled = !formElement.checkValidity();
  button.classList.toggle(this._inactiveButtonClass, !formElement.checkValidity());
}

_handleInputForm(inputElement, formElement, button, config){

  if (inputElement.validity.valid){
    hideInputError (inputElement, config)
  } else {
    showInputError (inputElement, config)
  }
  toggleButton (formElement, button, config);
}


_showInputError (inputElement, config){
  const errorNode = document.querySelector(`#${inputElement.id}-error`);
  errorNode.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
};


_hideInputError (inputElement, config) {
    const errorNode = document.querySelector(`#${inputElement.id}-error`);
    errorNode.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
};
}

// enableValidation(config);

export default FormValidator;