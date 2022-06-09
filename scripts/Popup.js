export default class Popup {
    constructor(popupSelector){
        this._popup = popupSelector;
        this._buttonClosePopup = this._popup.querySelector('.popup__close');
    }

    open() {
        this._popup.classList.add ('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._clickOverlay);
    }

    close() {
        this._popup.classList.remove ('popup_opened');
        document.removeEventListener ('keydown', this._handleEscClose);
        this._popup.removeEventListener ('mousedown', this._clickOverlay);
        // this._buttonClose.removeEventListener('click', this.close);
        this._buttonClosePopup.removeEventListener ('click', this._handleButtonClose);
    }

    _handleButtonClose = (evt) => {
        evt.preventDefault();
        this.close();
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


    setEventListeners() {
        this._buttonClosePopup.addEventListener ('click', this._handleButtonClose);
    }
}