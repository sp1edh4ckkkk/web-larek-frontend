import { ICartData, TCartItem } from "../../types";
import { IEvents } from '../base/events';


export class CartModel implements ICartData {
    protected _products: TCartItem[] = [];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    get products(): TCartItem[] {
        return this._products;
    }

    addProduct(product: TCartItem): void {
        const productInCart = this.products.some((item) => item.id === product.id);
        if (productInCart) {
            this.deleteProduct(product);
        } else {
            this._products.push(product);
        }
        this.events.emit('cart:change');
    }

    deleteProduct(product: TCartItem): void {
        this._products = this._products.filter((item) => item.id !== product.id);
        this.events.emit('cart:change');
    }

    getTotalPrice(): number {
        let totalPrice = 0
        this._products.forEach((product) => totalPrice += product.price);
        return totalPrice;
    }

    getCounter(): number {
        return this._products.length;
    }

    getButton(product: TCartItem) {
        if (product.price === null) {
            return 'Товар нельзя купить';
        }
        const productInCart = this._products.some((item) => item.id === product.id);
        return productInCart ? 'Убрать' : 'Купить';
    }

    clearCart(): void {
        this._products = [];
        this.events.emit('cart:change');
    }
}
