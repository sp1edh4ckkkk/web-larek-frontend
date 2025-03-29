import { Component } from "../base/components";
import { IEvents } from "../base/events";
import { IModal } from "../../types";


export class ModalView extends Component<IModal> {
    protected _content: HTMLElement;
    protected _closeBtn: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._content = this.container.querySelector('.modal__content');
        this._closeBtn = this.container.querySelector('.modal__close');

        this._closeBtn.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', (event) =>
            event.stopPropagation()
        );
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
    }

    render(data: IModal): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}
