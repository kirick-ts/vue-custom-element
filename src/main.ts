import {
	createApp,
	type App,
	type Component,
} from 'vue';

export class VueCustomElement extends HTMLElement {
	component: Component = {};
	app: App<Element>;

	constructor() {
		super();

		this.app = createApp(this.component);
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
