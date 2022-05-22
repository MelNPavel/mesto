class FormValidator {
    constructor(config, formElement, button) {
        this._formSelector = config.formSelector;
        this._inputType = config.inputType;
        this._buttonSelector = config.buttonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._formElement = formElement;
        this._button = formElement.querySelector(config.buttonSelector);
        this._inputList = this._formElement.querySelectorAll(this._inputType);
    }

  enableValidation () {
  this._inputList.forEach((_inputElement) => {
    _inputElement.addEventListener('input', () => this._handleInputForm(_inputElement));
 });
  this._toggleButton();
};

_toggleButton (_formElement, _button) {
  this._button.disabled = !this._formElement.checkValidity();
  this._button.classList.toggle(this._inactiveButtonClass, !this._formElement.checkValidity());
};

_handleInputForm(_inputElement, _formElement, _button){
  if (_inputElement.validity.valid){
    this._hideInputError (_inputElement)
  } else {
    this._showInputError (_inputElement)
  }
  this._toggleButton (_formElement, _button);
}


_showInputError (_inputElement){
  const errorNode = document.querySelector(`#${_inputElement.id}-error`);
  errorNode.textContent = _inputElement.validationMessage;
  _inputElement.classList.add(this._inputErrorClass);
};


_hideInputError (_inputElement) {
    const errorNode = document.querySelector(`#${_inputElement.id}-error`);
    errorNode.textContent = '';
    _inputElement.classList.remove(this._inputErrorClass);
};

resetInputError(formElement, _button) {
  this._inputList.forEach((_inputElement) => {
    this._hideInputError(_inputElement)});
  this._toggleButton(formElement, _button);
};

}
export default FormValidator;