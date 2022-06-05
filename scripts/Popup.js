export default class Popup {
    constructor(popupSelector){
        this._popup = popupSelector;
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._clickOverlay);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener ('mousedown', this._clickOverlay);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
                this.close();
          }
    }

    _clickOverlay = (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            this.close();
            }
    }

    _setEventListeners(){
        const buttonClose = document.querySelector ('.popup__close_add_type');
        buttonClose.addEventListener('click', this.close);
    }
}