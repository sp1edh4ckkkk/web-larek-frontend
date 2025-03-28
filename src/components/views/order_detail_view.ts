import { TOrderDetail } from "../../types";
import { IEvents } from "../base/events";
import { FormView } from "./form_view";


export class OrderDetailView extends FormView<TOrderDetail> {
    protected _paymentCardBtn: HTMLButtonElement;
    protected _paymentCashBtn: HTMLButtonElement;
    protected _address: HTMLInputElement;
    protected container: HTMLFormElement;
    protected events: IEvents;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._paymentCardBtn = container.querySelector('button[name="card"]');
        this._paymentCashBtn = container.querySelector('button[name="cash"]');
        this._address = container.querySelector('input[name="address"]');

        if (this._paymentCardBtn) {
            this._paymentCardBtn.addEventListener('click', () => {
                this._paymentCardBtn.classList.add('button_alt-active');
                this._paymentCashBtn.classList.remove('button_alt-active');
            })
        }

        if (this._paymentCashBtn) {
            this._paymentCashBtn.addEventListener('click', () => {
                this._paymentCashBtn.classList.add('button_alt-active');
                this._paymentCardBtn.classList.remove('button_alt-active');
            })
        }
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}
