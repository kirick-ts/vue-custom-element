import { type App, type Component } from '@vue/runtime-dom';
export declare class VueCustomElement extends HTMLElement {
    #private;
    component: Component;
    app: App<Element>;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
}
/**
 * Defines a custom element.
 * @param tag_name Custom element tag name.
 * @param VueCustomElementClass Copper component class.
 * @param [css] CSS code.
 */
export declare function defineElement(tag_name: string, VueCustomElementClass: typeof VueCustomElement, css?: string): void;
