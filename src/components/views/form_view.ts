import { Component } from "../base/components";
import { IEvents } from "../base/events";
import { IForm } from "../../types";

export class FormView<T> extends Component<IForm> {
    protected _subBtn: HTMLButtonElement;
    protected _errors: HTMLElement;
    protected container: HTMLFormElement;
    protected events: IEvents;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container);

        this._subBtn = this.container.querySelector('button[type="submit"]');
        this._errors = this.container.querySelector('.form__errors');

        this.container.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            this.onInputChange(target.name as keyof T, target.value);
        });
        this.container.addEventListener('submit', (e) => {
            e.preventDefault();
            this.events.emit(`${this.container.name}:submit`)
        });
    }

    set validSubBtn(value: boolean) {
        this._subBtn.disabled = !value;
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }

    onInputChange(name: keyof T, value: string) {
        this.events.emit(`order:${String(name)}:change`, { name, value })
    }
}
