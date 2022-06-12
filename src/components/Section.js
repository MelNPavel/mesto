export default class Section{
    constructor({items, renderer}, elementTemplate){
        this._rendeeredItems = items;
        this._renderer = renderer;
        this._elementTemplate = elementTemplate;
    }

    renderInitialItems() {
        this._rendeeredItems.forEach(item => this._renderer(item));
    }

    addItem(element){
        this._elementTemplate.append(element);
    }

    prependItem(element){
        this._elementTemplate.prepend(element);
    }
}

