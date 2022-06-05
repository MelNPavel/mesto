import Popup from "./Popup.js";

 export default class PopupWithForm extends Popup {
    constructor (popupSelector, handleCardAdd) {
        super(popupSelector);
        this.submitForm = handleCardAdd;
        this._formAdd = document.querySelector('.popup__form_add_type');
    }

    close(){
        super.close();
    }

    _getInputValues() {
        this._formInputs = Array.from(this._popup.querySelectorAll('.popup__form_add_type'));
        this._formValue = {};
        this._formInputs.forEach((input) => {this._formValue [input.name] = input.value});
        return this._formValue;
        };

    setEventListeners() {
        super._setEventListeners();
        this._formAdd.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitForm(this._getInputValues());
        })
    }
}
