import { LitElement, css, html, customElement } from 'lit-element';
import { UserStorage } from '../utils/userStorage';
import { Router } from '@vaadin/router';


@customElement('app-logout')
export class AppLogout extends LitElement {

  static get styles() {
    return css`
    `;
  }

  constructor(userStorage = new UserStorage()) {
    super();
    userStorage.forgetUser();
    Router.go('/login');
  }

  render() {
    return html`
      <div>
        <h2>Logout page</h2>
      </div>
    `;
  }
}
