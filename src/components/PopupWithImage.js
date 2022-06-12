import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popup){
        super(popup);
    }

    open(name, link) {
        super.open();
        this._popup.querySelector('.popup__foto').src = link;
        this._popup.querySelector('.popup__foto').alt = name;
        this._popup.querySelector('.popup__foto-name').textContent = name;;
    }
}