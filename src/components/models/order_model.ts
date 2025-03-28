import { IOrder, IOrderData, TFormErrors } from "../../types";
import { IEvents } from "../base/events";


export class OrderModel implements IOrderData {
    protected _paymentType: string;
    protected _address: string;
    protected _email: string;
    protected _phone: string;
    protected _errors: TFormErrors;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    set paymentType(paymentType: string) {
        this._paymentType = paymentType;
    }

    set address(address: string) {
        this._address = address;
    }

    set email(email: string) {
        this._email = email;
    }

    set phone(phone: string) {
        this._phone = phone;
    }

    setOrderDetails(paymentType: string, address: string): void {
        this._paymentType = paymentType;
        this._address = address;
    }

    setContactDetail(email: string, phone: string): void {
        this._email = email;
        this._phone = phone;
    }

    validateOrder() {
        const errors: typeof this._errors = {};

        if (!this._paymentType) {
            errors.paymentType = "Вы не выбрали способ оплаты.";
        }
        if (!this._address) {
            errors.address = "Вы не указали адрес доставки.";
        }
        if (!this._email) {
            errors.email = "Вы не указали почту.";
        }
        if (!this._phone) {
            errors.phone = "Вы не указали телефон.";
        }

        this._errors = errors;
        this.events.emit('errors:change', this._errors);

        return Object.keys(errors).length === 0;
    }

    getUserData(): IOrder {
        return { paymentType: this._paymentType, address: this._address, email: this._email, phone: this._phone }
    }
}
