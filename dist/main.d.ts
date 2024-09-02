import { type App } from 'vue';
interface Component {
    name: string;
    props: Record<string, unknown> | undefined;
}
export declare class VueCustomElement extends HTMLElement {
    #private;
    app: App<Element>;
    constructor(component: Component, props_data?: Record<string, unknown>);
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
export {};
