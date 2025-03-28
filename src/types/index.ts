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
    paymentType: string;
    address: string;
    email: string;
    phone: string;
}

export interface IOrderData {
    setOrderDetails(paymentType: string, address: string): void;
    setContactDetail(email: string, phone: string): void;
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

export type TOrderDetail = Pick<IOrder, 'paymentType' | 'address'>;
export type TOrderContacts = Pick<IOrder, 'email' | 'phone'>;
export type TFormErrors = Partial<Record<keyof IOrder, string>>;
