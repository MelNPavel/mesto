import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector, name, link){
        super(popupSelector);
        this._name = name;
        this._link = link;
    }

    open() {
        super.open();
        document.querySelector('.popup__foto').src = this._link;
        document.querySelector('.popup__foto').alt = this._name;
        document.querySelector('.popup__foto-name').textContent = this._name;;

    }
}