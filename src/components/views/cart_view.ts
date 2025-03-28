import { ensureElement, createElement } from "../../utils/utils";
import { Component } from "../base/components";
import { IEvents } from "../base/events";
import { ICartData } from "../../types";


export class CartView extends Component<ICartData> {
    protected _products: HTMLElement;
    protected _total: HTMLElement;
    protected _btn: HTMLElement;
    protected container: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._products = ensureElement<HTMLElement>('.basket__list');
        this._total = ensureElement<HTMLElement>('.basket__price');
        this._btn = ensureElement<HTMLElement>('.button');

        if (this._btn) {
            this._btn.addEventListener('click', () => {
                this.events.emit('order:open')
            });
        }
    }

    set total(value: number) {
        this.setText(this._total, `${value} синапсов`);
    }

    set products(products: HTMLElement[]) {
        if (products.length) {
            this._products.replaceChildren(...products);
            this.setDisabled(this._btn, false);
        } else {
            this._products.replaceChildren(createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' }));
            this.setDisabled(this._btn, true);
        }
    }
}
