import { Component } from "../base/components";
import { IEvents } from "../base/events";
import { IForm } from "../../types";


export class FormView<T> extends Component<IForm> {
    protected _subBtn: HTMLButtonElement;
    protected _errors: HTMLElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this._subBtn = this.container.querySelector('button[type=submit]');
        this._errors = this.container.querySelector('.form__errors');

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.container.name}:submit`);
        });
    }

    set valid(value: boolean) {
        this.setDisabled(this._subBtn, !value);
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }

    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`order.${String(field)}:change`, { field, value });
    }

    render(state: Partial<T> & IForm) {
        const { valid, errors, ...inputs } = state;
        super.render({ valid, errors });
        Object.assign(this, inputs);
        return this.container;
    }
}
