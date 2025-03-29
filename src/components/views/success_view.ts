import { Component } from "../base/components";
import { ISuccess, ISuccessActions } from "../../types";


export class SuccessView extends Component<ISuccess> {
    protected _totalPrice: HTMLElement;
    protected _closeBtn: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ISuccessActions) {
        super(container);

        this._totalPrice = this.container.querySelector('.order-success__description');
        this._closeBtn = this.container.querySelector('.order-success__close');

        if (actions.onClick) {
            this._closeBtn.addEventListener('click', actions.onClick);
        }
    }

    set totalPrice(value: number) {
        this.setText(this._totalPrice, `Списано ${value} синапсов`)
    }
}
