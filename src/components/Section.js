export default class Section{
    constructor({renderer}, elementTemplate){
        this._renderer = renderer;
        this._elementTemplate = elementTemplate;
    }

    renderInitialItems(items) {
        items.forEach(item => this._renderer(item));
    }

    addItem(element){
        this._elementTemplate.append(element);
    }

    prependItem(element){
        this._elementTemplate.prepend(element);
    }
}

