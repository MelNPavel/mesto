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
    const body = {name: inputsUserHandle.name, about: inputsUserHandle.about}
    return fetch (this.url, {
            method: 'PATCH',    
            headers: this.headers,
            body: JSON.stringify({name: body.name, about: body.about})})
    .then ((res) => {
        if (res.ok) {
            return res.json();
        }

        // return Promise.reject('Возникла ошибка');
    })
}
}