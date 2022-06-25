import Popup from "./Popup.js";

 export default class PopupWithForm extends Popup {
    constructor (popup, {handleFormSubmit}) {
        super(popup);
        this._submitForm = handleFormSubmit;
        this._formAdd =  this._popup.querySelector('.popup__form');
        this._formInputs = this._popup.querySelectorAll('.popup__input');
        this.buttonSave = this._popup.querySelector('.popup__button');
    }

    _getInputValues() {
        this._formValue = {};
        this._formInputs.forEach((input) => {this._formValue [input.name] = input.value});
        return this._formValue;
    };

    setEventListeners() {
        this._formAdd.addEventListener('submit', this._submitFormData);
    }

    open() {
        super.open();
    }

    close() {
        super.close();
        this._formAdd.reset();
    }

    _submitFormData = (evt) => {
        evt.preventDefault();
            this._submitForm(this._getInputValues());
    }

    download(loadTrue) {
        if (loadTrue) {
            this.buttonSave.textContent = "Сохранение...";
        } else {
            this.buttonSave.textContent = "Сохранить";
        }
    }

}
