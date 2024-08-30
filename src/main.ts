import {
	createApp,
	type App,
	// type Component,
} from 'vue';

interface Component {
	name: string;
	props: Record<string, unknown> | undefined;
}

export class VueCustomElement extends HTMLElement {
	app: App<Element>;

	constructor(component: Component) {
		super();

		this.innerHTML = '';

		const props_data: Record<string, unknown> = {};
		if (
			component.props
			&& 'customElement' in component.props
		) {
			props_data.customElement = this;
		}

		this.app = createApp(
			component,
			props_data,
		);
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
export function defineElement(
	tag_name: string,
	VueCustomElementClass: typeof VueCustomElement,
	css?: string,
) {
	if (typeof css === 'string') {
		const element = document.createElement('style');
		element.dataset.element = tag_name;
		element.textContent = css;
		document.head.append(element);
	}

	window.customElements.define(
		tag_name,
		VueCustomElementClass,
	);
}
