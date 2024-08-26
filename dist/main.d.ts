import { type App, type Component } from 'vue';
export declare class VueCustomElement extends HTMLElement {
    #private;
    component: Component;
    app: App<Element>;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
}
