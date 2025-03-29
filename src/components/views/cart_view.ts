import { ensureElement, createElement, formatNumber } from "../../utils/utils";
import { Component } from "../base/components";
import { IEvents } from "../base/events";
import { TCartItem } from "../../types";


export class CartView extends Component<TCartItem> {
    protected _products: HTMLElement;
    protected _totalPrice: HTMLElement;
    protected _btn: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._products = ensureElement<HTMLElement>('.basket__list', this.container);
        this._totalPrice = this.container.querySelector('.basket__price');
        this._btn = this.container.querySelector('.button');

        if (this._btn) {
            this._btn.addEventListener('click', () => {
                events.emit('order:open')
            });
        }

        this.products = [];
    }

    set totalPrice(value: number) {
        this.setText(this._totalPrice, `${formatNumber(value)} синапсов`);
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
