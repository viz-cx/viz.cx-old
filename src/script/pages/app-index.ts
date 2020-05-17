import { LitElement, css, html, customElement } from 'lit-element';

import './app-home';

import { Router } from '@vaadin/router';

import '../components/header';

declare var viz: any;

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
    viz.config.set('websocket', 'https://node.viz.plus/');
  }

  firstUpdated() {
    // For more info on using the @vaadin/router check here https://vaadin.com/router
    const router = new Router(this.shadowRoot?.querySelector('#routerOutlet'));
    router.setRoutes([
      { path: '/', component: 'app-home' },
      {
        path: "/about",
        component: "app-about",
        action: async() => {
          await import('./app-about.js');
        },
      },
      {
        path: "/wallet",
        component: "app-wallet",
        action: async() => {
          await import('./app-wallet.js');
        },
      },
      {
        path: "/award",
        component: "app-award",
        action: async() => {
          await import('./app-award.js');
        },
      },
      {
        path: '(.*)', 
        component: 'app-not-found',
        action: async() => {
          await import('./app-not-found.js');
        },
    ]);
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