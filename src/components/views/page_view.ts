import { ensureElement } from "../../utils/utils";
import { Component } from "../base/components";
import { IEvents } from "../base/events";
import { IPage } from "../../types";


export class PageView extends Component<IPage> {
    protected _wrapper: HTMLElement;
    protected _gallery: HTMLElement;
    protected _cart: HTMLElement;
    protected _counter: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._gallery = ensureElement<HTMLElement>('.gallery');
        this._cart = ensureElement<HTMLElement>('.header__basket');
        this._counter = ensureElement<HTMLElement>('.header__basket-counter');

        this._cart.addEventListener('click', () => {
            this.events.emit('cart:open')
        });
    }

    set gallery(products: HTMLElement[]) {
        this._gallery.replaceChildren(...products);
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set locked(value: boolean) {
        this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
    }
}