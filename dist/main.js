import { createApp, } from 'vue';
export class VueCustomElement extends HTMLElement {
    component = {};
    app;
    constructor() {
        super();
        this.innerHTML = '';
        this.app = createApp(this.component, {
            $webcomponent: this,
        });
    }
    #is_disconnected_in_microtask = false;
    connectedCallback() {
        if (this.#is_disconnected_in_microtask === true) {
            this.#is_disconnected_in_microtask = false;
        }
        else {
            this.app.mount(this);
        }
    }
    disconnectedCallback() {
        this.#is_disconnected_in_microtask = true;
        queueMicrotask(() => {
            this.#is_disconnected_in_microtask = false;
            if (this.isConnected === false) {
                this.app.unmount();
            }
        });
    }
}
/**
 * Defines a custom element.
 * @param tag_name Custom element tag name.
 * @param VueCustomElementClass Copper component class.
 * @param [css] CSS code.
 */
export function defineElement(tag_name, VueCustomElementClass, css) {
    if (typeof css === 'string') {
        const element = document.createElement('style');
        element.dataset.element = tag_name;
        element.textContent = css;
        document.head.append(element);
    }
    window.customElements.define(tag_name, VueCustomElementClass);
}
