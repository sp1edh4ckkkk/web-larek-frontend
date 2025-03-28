import { ICart, ICartData, IProduct } from "../../types/index.ts";
import { IEvents } from '../base/events.ts';

export class CartModel implements ICartData {
    protected products: IProduct[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    addProduct(product: IProduct): void {
        
    }

    getTotalPrice(): number | null {
        
    }

    deleteProduct(productId: string): void {
        
    }

    clearCart(): void {
        
    }

    
}
