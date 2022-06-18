export default class Api{
    constructor ({url, headers}) {
        this.url = url,
        this.headers = headers
    }

    getTasks (){
        return fetch (this.url, {
              headers: this.headers
        })
        .then ((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Возникла ошибка');
        })
    }

    addTasks ({inputsUserHandle}){
        const body = {
            name: inputsUserHandle.nameProfile,
            about: inputsUserHandle.aboutProfile
        };
        
        return fetch (this.url, {
              headers: this.headers,
              method: 'PACH',
              body: JSON.stringify(body.name, body.about),
            })
        .then ((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Возникла ошибка');
        })
    }
}