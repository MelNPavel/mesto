export default class UserInfo {
    constructor({name, about}) {
       this._userName = document.querySelector(name);
       this._userAbout = document.querySelector(about);
       this._idClient = null;
    //    this._userAvatar = document.querySelector(avatar)
    }

    getUserInfo() {
        return{
            name: this._userName.textContent,
            about: this._userAbout.textContent
        }
    }

    setUserInfo(userData) {
        this._userName.textContent = userData.name;
        this._userAbout.textContent = userData.about;
        // this._userAvatar.src = userData.avatar

    }

    getIdClient () {
        return this._idClient;
    }

    setIdClient (idClient) {
        this._idClient = idClient
    }
}