import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popup){
        super(popup);
        this._popupFoto = this._popup.querySelector('.popup__foto');
        this._popupName = this._popup.querySelector('.popup__foto-name');
    }

    open(name, link) {
        super.open();
        this._popupFoto.src = link;
        this._popupFoto.alt = name;
        this._popupName.textContent = name;;
    }
}