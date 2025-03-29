import { ICardActions, IProduct } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { Component } from "../base/components";

export const categories = new Map([
    ['софт-скил', 'card__category_soft'],
    ['хард-скил', 'card__category_hard'],
    ['кнопка', 'card__category_button'],
    ['другое', 'card__category_other'],
    ['дополнительное', 'card__category_additional'],
]);


export class ProductView extends Component<IProduct> {
    protected _id: string;
    protected _title: HTMLElement;
    protected _description: HTMLElement;
    protected _image: HTMLImageElement;
    protected _price: HTMLElement;
    protected _category: HTMLElement;
    protected _itemIndex: HTMLElement;
    protected _productBtn: HTMLElement;
    protected _productDelBtn: HTMLElement;
    protected _cdn = CDN_URL;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = this.container.querySelector('.card__title');
        this._description = this.container.querySelector('.card__text');
        this._image = this.container.querySelector('.card__image');
        this._price = this.container.querySelector('.card__price');
        this._category = this.container.querySelector('.card__category');
        this._itemIndex = this.container.querySelector('.basket__item-index');
        this._productBtn = this.container.querySelector('.card__button');
        this._productDelBtn = this.container.querySelector('.basket__item-delete');

        if (actions?.onClick) {
            if (this._productBtn) {
                this._productBtn.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    set image(value: string) {
        this.setImage(this._image, `${this._cdn}/${value}`, this.title)
    }

    set price(value: number | null) {
        if (value == null) {
            this.setText(this._price, '0 синапсов');
            this.setText(this._productBtn, 'Товар закончился');
            this.setDisabled(this._productBtn, true);
        } else {
            this.setText(this._price, `${value} синапсов`);
            this.setDisabled(this._productBtn, false);
        }
    }

    set category(value: string) {
        this.setText(this._category, value);
        this.toggleClass(this._category, categories.get(value), true)
    }

    set itemIndex(value: number) {
        this.setText(this._itemIndex, value);
    }

    set productBtn(value: string) {
        this.setText(this._productBtn, value);
    }
}
