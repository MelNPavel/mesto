import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup{
    constructor(popup){
        super(popup);
        this.butonYes = this._popup.querySelector('.popup__button_type_consent');
    }

    requestDeleteCard(delReq) {
        this._delRequest = delReq;
    }

    setEventListener() {
    this.butonYes.addEventListener('click', () => this._delRequest());
    }
}