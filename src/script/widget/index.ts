import { LitElement, css, html, customElement } from 'lit-element';

import './home';

import { Router } from '@vaadin/router';

declare let viz: any;

@customElement('widget-index')
export class WidgetIndex extends LitElement {

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    // TODO: сделать переключение между нодами при недоступности
    viz.config.set('websocket', 'https://node.viz.plus/');
  }

  firstUpdated() {
    // For more info on using the @vaadin/router check here https://vaadin.com/router
    const router = new Router(this.shadowRoot?.querySelector('#routerOutlet'));
    router.setRoutes([
        { path: '/', component: 'widget-home' },
        {
          path: "/widget-button-award",
          component: "widget-button-award",
          action: async() => {
            await import('./button-award.js');
          },
        }
      ]);
  }

  render() {
    return html`
      <div>
        <div id="routerOutlet"></div>
      </div>
    `;
  }
}
