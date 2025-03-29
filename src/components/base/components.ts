export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {}

    toggleClass(item: HTMLElement, className: string, force?: boolean) {
        item.classList.toggle(className, force);
    }

    protected setText(item: HTMLElement, value: unknown) {
        if (item) {
            item.textContent = String(value);
        }
    }

    setDisabled(item: HTMLElement, state: boolean) {
        if (item) {
            if (state) {
                item.setAttribute('disabled', 'disabled');
            } else {
                item.removeAttribute('disabled');
            }
        }
    }

    protected setImage(item: HTMLImageElement, src: string, alt?: string) {
        if (item) {
            item.src = src;
            if (alt) {
                item.alt = alt;
            }
        }
    }

    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}