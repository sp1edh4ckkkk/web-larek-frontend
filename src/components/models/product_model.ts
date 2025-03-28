import { IProduct, IProductData } from '../../types';
import { IEvents } from '../base/events';


export class ProductModel implements IProductData {
    protected _products: IProduct[];
    protected _preview: string | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    get products(): IProduct[] {
        return this._products;
    }

    get preview(): string | null {
        return this._preview;
    }

    getProduct(productId: string): IProduct {
        return this._products.find((product) => {
            product.id === productId
        });
    }

    setProducts(products: IProduct[]): void {
        this._products = products;
        this.events.emit('products:change');
    }

    setPreview(product: IProduct): void {
        this._preview = product.id;
        this.events.emit('preview:change', product);
    }
}
