import { IProduct, IProductData } from '../../types/index.ts';
import { IEvents } from '../base/events.ts';

export class ProductModel implements IProductData {
    protected products: IProduct[];
    protected preview: string | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    getProduct(productId: string): IProduct {
        return this.products.find((product) => product.id === productId);
    }

    setProducts(products: IProduct[]): void {
        this.products = products;
        this.events.emit('product:change');
    }

    setPreview(product: IProduct): void {
        this.preview = product.id;
        this.events.emit('preview:change', product);
    }

    get getProducts() {
        return this.products;
    }

    get getPreview() {
        return this.preview;
    }
}
