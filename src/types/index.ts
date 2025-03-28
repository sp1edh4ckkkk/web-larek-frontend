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

export interface ICart {
    id: string;
    title: string;
    price: number | null;
    count: number;
}

export interface ICartData {
    products: IProduct[];
    addProduct(product: IProduct): void;
    getTotalPrice(): number | null;
    deleteProduct(productId: string): void;
    clearCart(): void;
}

export interface IOrder {
    paymentType: string;
    address: string;
    email: string;
    phone: string;
}

export interface IOrderData {
    order: IOrder;
    validatedOrder(): boolean;
    setOrderField(field: keyof IOrder, value: IOrder[keyof IOrder]): void;
    clearOrder(): void;
}

export type TFormErrors = Partial<Record<keyof IOrder, string>>;
