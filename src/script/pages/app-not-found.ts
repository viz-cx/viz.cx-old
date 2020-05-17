import { LitElement, customElement, html, css } from 'lit-element';


@customElement('app-not-found')
export class AppNotFound extends LitElement {
	static get styles() {
		return css`
		`;
	  }
	
	  constructor() {
		super();
	  }
	
	  render() {
		return html`
		  <div>
			<h2>Page not found</h2>
		  </div>
		`;
	  }
}
