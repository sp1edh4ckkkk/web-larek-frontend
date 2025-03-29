import { IOrder, IOrderData, TFormErrors, TOrderForm } from "../../types";
import { IEvents } from "../base/events";


export class OrderModel implements IOrderData {
    protected _order: Partial<IOrder> = {
        payment: '',
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

        if (!this._order.payment) {
            errors.payment = "Вы не выбрали способ оплаты.";
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

        this._formErrors = errors;
        this.events.emit('formErrors:change', this._formErrors);

        return Object.keys(errors).length === 0;
    }

    createOrder(items: string[], total: number): IOrder {
        return {
            items,
            total,
            payment: this._order.payment,
            address: this._order.address,
            email: this._order.email,
            phone: this._order.phone
        }
    }

    clearOrder() {
        this._order = {
            payment: '',
            address: '',
            email: '',
            phone: ''
        }
    }
}
