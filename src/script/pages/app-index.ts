import { LitElement, css, html, customElement } from 'lit-element';

import { Router } from '@vaadin/router';

import '../components/header';
import { routes } from '../components/routes';

declare let viz: any;

@customElement('app-index')
export class AppIndex extends LitElement {

  static get styles() {
    return css`
      main {
        padding: 16px;
      }
    `;
  }

  constructor() {
    super();
    // TODO: сделать переключение между нодами при недоступности
    viz.config.set('websocket', 'https://node.viz.plus/');
  }

  firstUpdated() {
    // For more info on using the @vaadin/router check here https://vaadin.com/router
    const router = new Router(this.shadowRoot?.querySelector('#routerOutlet'));
    router.setRoutes(routes);
  }

  render() {
    return html`
      <div>
        <app-header></app-header>
        <main>
          <div id="routerOutlet"></div>
        </main>
      </div>
    `;
  }
}