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

        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

addUser (inputsUserHandle){
    const body = {about: inputsUserHandle.about, name: inputsUserHandle.name}
    return fetch (this.url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(body)
            }
    )
    .then ((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

addCard (inputsValue){
    const body = {name: inputsValue.name, link: inputsValue.link}
    return fetch (this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
            }
    )
    .then ((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

deleteCard (cardId){
    return fetch (`${this.url}/${cardId}`,{
        method: 'DELETE',
        headers: this.headers,
    })
    .then ((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

likePut (cardId){
    return fetch (`${this.url}/${cardId}/likes`,{
        method: 'PUT',
        headers: this.headers,
    })
    .then ((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

likeUnPut (cardId){
    return fetch (`${this.url}/${cardId}/likes`,{
        method: 'DELETE',
        headers: this.headers,
    })
    .then ((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

}