import { LitElement, css, html, customElement } from 'lit-element';
import { UserService } from '../utils/userService';
import { Router } from '@vaadin/router';


@customElement('app-logout')
export class AppLogout extends LitElement {

  static get styles() {
    return css`
    `;
  }

  constructor(userService = new UserService()) {
    super();
    userService.forgetUser();
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
