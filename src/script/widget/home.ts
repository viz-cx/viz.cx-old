import { LitElement, css, html, customElement } from 'lit-element';


@customElement('widget-home')
export class WidgetHome extends LitElement {

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
        <h2>Home widgets page</h2>
        <ul>
            <li><a href="/widget-button-award">Award button</a>
        </ul>
      </div>
    `;
  }
}
