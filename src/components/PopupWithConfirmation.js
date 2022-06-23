import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup{
    constructor(popup){
        super(popup);
        this.butonYes = this._popup.querySelector('.popup__button_type_consent');
    }

    open() {
        super.open();
        // this.butonYes.addEventListener('click', this.close());
    }

    close() {
        super.close();
        // this.butonYes.removeEventListener('click', this.close());
    }
}