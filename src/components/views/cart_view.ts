import { ensureElement, createElement } from "../../utils/utils";
import { Component } from "../base/components";
import { IEvents } from "../base/events";
import { ICartData } from "../../types";


export class CartView extends Component<ICartData> {
    protected _products: HTMLElement;
    protected _total: HTMLElement;
    protected _btn: HTMLElement;
    protected events: IEvents;
    protected container: HTMLElement;

    constructor(container: HTMLElement) {
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
}
