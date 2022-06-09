import Popup from "./Popup.js";

 export default class PopupWithForm extends Popup {
    constructor (popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._submitForm = handleFormSubmit;
        this._formAdd =  this._popup.querySelector('.popup__form');
        this._formInputs = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValue = {};
        this._formInputs.forEach((input) => {this._formValue [input.name] = input.value});
        return this._formValue;
    };

    setEventListeners() {
        super.setEventListeners();
        this._formAdd.addEventListener('submit', this._submitFormData);
    }

    close() {
        super.close();
        this._formAdd.reset();
        this._formAdd.removeEventListener('submit', this._submitFormData);
    }

    _submitFormData = (evt) => {
        evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.close();
    }

}
