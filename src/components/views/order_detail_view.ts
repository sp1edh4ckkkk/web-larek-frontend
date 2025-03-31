import { TOrderDetail } from "../../types";
import { IEvents } from "../base/events";
import { FormView } from "./form_view";


export class OrderDetailView extends FormView<TOrderDetail> {
    protected _paymentCardBtn: HTMLButtonElement;
    protected _paymentCashBtn: HTMLButtonElement;
    protected _address: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._paymentCardBtn = container.querySelector('button[name="card"]');
        this._paymentCashBtn = container.querySelector('button[name="cash"]');
        this._address = container.querySelector('input[name="address"]');

        if (this._paymentCardBtn) {
            this._paymentCardBtn.addEventListener('click', () => {
                this.toggleClass(this._paymentCardBtn, 'button_alt-active', true);
                this.toggleClass(this._paymentCashBtn, 'button_alt-active', false);
                this.onInputChange('payment', 'card');
            });
        }

        if (this._paymentCashBtn) {
            this._paymentCashBtn.addEventListener('click', () => {
                this.toggleClass(this._paymentCashBtn, 'button_alt-active', true);
                this.toggleClass(this._paymentCardBtn, 'button_alt-active', false);
                this.onInputChange('payment', 'cash');
            });
        }
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }

    resetPaymentData() {
        this.toggleClass(this._paymentCardBtn, 'button_alt-active', false);
        this.toggleClass(this._paymentCashBtn, 'button_alt-active', false);
    }
}
