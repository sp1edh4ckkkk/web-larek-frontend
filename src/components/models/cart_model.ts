import { ICartData, IProduct } from "../../types";
import { IEvents } from '../base/events';


export class CartModel implements ICartData {
    protected _products: IProduct[];
    protected _count: number;
    protected _total: number;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
        this.count = 0;
        this.total = 0;
    }

    set products(products: IProduct[]) {
        this._products = products || [];
    }

    get products() {
        return this._products;
    }

    set count(value: number) {
        this._count = value;
    }

    get count() {
        return this._count;
    }

    set total(value: number) {
        this._total = value;
    }

    get total() {
        return this._total;
    }

    addProduct(product: IProduct): void {
        this._products.push(product);
        this._count++;
        this._total += product.price;
        this.events.emit('cart:change');
    }

    deleteProduct(product: IProduct): void {
        this._products = this._products.filter((item) => {
            item.id !== product.id;
        });
        this.count--;
        this.total -= product.price;
    }

    clearCart(): void {
        this._products = [];
        this._count = 0;
        this._total = 0;
    }
}
