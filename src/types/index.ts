export interface IProduct {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number | null;
    category: string;
}

export interface IProductData {
    products: IProduct[];
    preview: string | null;
    getProduct(productId: string): IProduct;
    setProducts(products: IProduct[]): void;
    setPreview(product: IProduct): void;
}

export interface ICartData {
    products: IProduct[];
    count: number | null;
    total: number | null;
    addProduct(product: IProduct): void;
    deleteProduct(product: IProduct): void;
    clearCart(): void;
}

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export interface IOrder {
    paymentType: TPaymentType;
    address: string;
    email: string;
    phone: string;
}

export interface IOrderData {
    setOrderDetails(paymentType: TPaymentType, address: string): void;
    setContactDetail(email: string, phone: string): void;
}

export interface IPage {
    gallery: HTMLElement[];
    counter: number;
    locked: boolean;
}

export type TPaymentType = 'cash' | 'card';
