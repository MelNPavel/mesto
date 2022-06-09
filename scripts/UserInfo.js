export default class UserInfo {
    constructor({name, about}) {
       this._userName = document.querySelector(name);
       this._userAbout = document.querySelector(about);
    }

    getUserInfo() {
        return{
            name: this._userName.textContent,
            about: this._userAbout.textContent
        }
    }

    setUserInfo(userData) {
        this._userName.textContent = userData.nameProfile;
        this._userAbout.textContent = userData.aboutProfile;

    }
}