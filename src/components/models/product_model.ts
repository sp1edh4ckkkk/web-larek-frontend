import { IProduct, IProductData } from '../../types';
import { IEvents } from '../base/events';


export class ProductModel implements IProductData {
    protected _products: IProduct[];
    protected _preview: string | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    get products() {
        return this._products;
    }

    get preview() {
        return this._preview;
    }

    getProduct(productId: string) {
        return this._products.find((item) => item.id === productId);
    }

    setProducts(products: IProduct[]) {
        this._products = products;
        this.events.emit('products:change');
    }

    setPreview(product: IProduct) {
        this._preview = product.id;
        this.events.emit('preview:change', product);
    }
}
