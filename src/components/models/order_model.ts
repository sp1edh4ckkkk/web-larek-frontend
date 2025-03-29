import { IOrder, IOrderData, TFormErrors, TOrderForm } from "../../types";
import { IEvents } from "../base/events";


export class OrderModel implements IOrderData {
    protected _order: Partial<IOrder> = {
        paymentType: '',
        address: '',
        email: '',
        phone: ''
    }
    protected _formErrors: TFormErrors;

    constructor(protected events: IEvents) {
        this.events = events;
    }

    get order(): Partial<IOrder> {
        return this._order;
    }

    setOrderField(field: keyof TOrderForm, value: string) {
        this._order[field] = value;
        this.validateOrder();
    }

    validateOrder() {
        const errors: typeof this._formErrors = {};

        if (!this._order.paymentType) {
            errors.paymentType = "Вы не выбрали способ оплаты.";
        }
        if (!this._order.address) {
            errors.address = "Вы не указали адрес доставки.";
        }
        if (!this._order.email) {
            errors.email = "Вы не указали почту.";
        }
        if (!this._order.phone) {
            errors.phone = "Вы не указали телефон.";
        }

        console.log(11);
        this._formErrors = errors;
        console.log(this._formErrors);
        console.log(12);
        this.events.emit('errors:change', this._formErrors);

        console.log(13);
        return Object.keys(errors).length === 0;
    }

    createOrder(items: string[], total: number): IOrder {
        return {
            items,
            total,
            paymentType: this._order.paymentType,
            address: this._order.address,
            email: this._order.email,
            phone: this._order.phone
        }
    }

    clearOrder() {
        this._order = {
            paymentType: '',
            address: '',
            email: '',
            phone: ''
        }
    }
}
