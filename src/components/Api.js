class Api{
    constructor (url, token) {
        this.url = url,
        this.token = token
    }

    getTasks (){
        return fetch (this.url, {
              headers: {
                authorization: this.token,
                'Content-type': 'application.json'
              }
        })
        .then ((res) => {
            if (res.ok) {
                return res.json();
            }else{
                return Promise.reject('Возникла ошибка');
            }
        })
    }
}