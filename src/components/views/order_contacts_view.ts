import { TOrderContacts } from "../../types";
import { IEvents } from "../base/events";
import { FormView } from "./form_view";


export class OrderContactsView extends FormView<TOrderContacts> {
    protected container: HTMLFormElement;
    protected events: IEvents;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }
}
