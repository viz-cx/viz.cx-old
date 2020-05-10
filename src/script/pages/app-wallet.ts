import { LitElement, css, html, customElement } from 'lit-element';


@customElement('app-wallet')
export class AppWallet extends LitElement {

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
        <h2>Wallet</h2>
      </div>
    `;
  }
}