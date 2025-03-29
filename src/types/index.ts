export interface IProduct {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number | null;
    category: string;
    cartBtn: string | null;
}

export interface IProductData {
    products: IProduct[];
    preview: string | null;
    getProduct(productId: string): IProduct;
    setProducts(products: IProduct[]): void;
    setPreview(product: IProduct): void;
}

export interface ICartData {
    products: TCartItem[];
    addProduct(product: TCartItem): void;
    deleteProduct(product: TCartItem): void;
    getTotalPrice(): number;
    getCounter(): number;
    getButton(product: TCartItem): string;
    clearCart(): void;
}

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export interface IOrder {
    items: string[];
    total: number;
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface IOrderData {
    order: Partial<IOrder>;
    setOrderField(field: keyof IOrder, value: IOrder[keyof IOrder]): void;
    validateOrder(): boolean;
    createOrder(items: string[], total: number): IOrder;
    clearOrder(): void;
}

export interface IPage {
    gallery: HTMLElement[];
    counter: number;
    locked: boolean;
}

export interface ISuccess {
    totalPrice: number;
}

export interface ISuccessActions {
    onClick: () => void;
}

export interface IModal {
    content: HTMLElement;
}

export interface IForm {
    valid: boolean;
    errors: string[];
}

export interface IOrderResult {
    id: string;
    total: number;
}

export type TOrderDetail = Pick<IOrder, 'payment' | 'address'>;
export type TOrderContacts = Pick<IOrder, 'email' | 'phone'>;
export type TFormErrors = Partial<Record<keyof IOrder, string>>;
export type TOrderForm = Pick<IOrder, 'payment' | 'address' | 'email' | 'phone'>
export type TCartItem = Pick<IProduct, 'id' | 'title' | 'price'>;
