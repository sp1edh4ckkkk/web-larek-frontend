import { IOrder, IOrderData, TPaymentType } from "../../types";
import { IEvents } from "../base/events";


export class Order implements IOrderData {
    protected _paymentType: TPaymentType;
    protected _address: string;
    protected _email: string;
    protected _phone: string;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    set paymentType(paymentType: TPaymentType) {
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

    setOrderDetails(paymentType: TPaymentType, address: string): void {
        this._paymentType = paymentType;
        this._address = address;
    }

    setContactDetail(email: string, phone: string): void {
        this._email = email;
        this._phone = phone;
    }

    getUserData(): IOrder {
        return { paymentType: this._paymentType, address: this._address, email: this._email, phone: this._phone }
    }
}
