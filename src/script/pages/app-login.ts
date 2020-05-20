import { LitElement, css, html, customElement, property } from 'lit-element';
import { UserService, VizUser } from '../utils/userService';
import { Router } from '@vaadin/router';


@customElement('app-login')
export class AppLogin extends LitElement {

  static get styles() {
    return css`
    form {
      border: 3px solid #f1f1f1;
    }
    
    /* Full-width inputs */
    input[type=text], input[type=password] {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
    
    button {
      background-color: #4CAF50;
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      cursor: pointer;
      width: 100%;
    }
    
    button:hover {
      opacity: 0.8;
    }
    `;
  }

  private userService: UserService;

  @property({ type : VizUser })
  private user: VizUser | null;

  constructor(userService: UserService = new UserService()) {
    super();
    this.userService = userService;
    this.user = this.userService.getCurrentUser();

    this.updateComplete.then(() => {
      this.shadowRoot?.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (event) => {
          if (event.keyCode == 13) {
            event.preventDefault();
            this.login();
          }
        });
      })
    });
  }

  private logout(event: any) {
    event.preventDefault();
    this.userService.forgetUser();
    this.user = null;
  }

  render() {
    if (this.user) {
      return html`
        <div>
          You're already logged in as <a href="https://info.viz.plus/accounts/${this.user.username}/">${this.user.username}</a>. 
          Want to <a href="/login" @click="${this.logout}">log out</a>?
        </div>
      `;
    }
    return html`
      <div>
          <label for="username"><b>Username</b></label>
          <input id="username" name="username" type="text" placeholder="Enter username" required>
        
          <label for="wif"><b>Private key</b></label>
          <input id="wif" name="wif" type="password" placeholder="Enter private key" required>

          <button type="submit" @click="${this.login}">Login</button>

          <span id="result"></span>
      </div>
    `;
  }

  private login() {
    let username = (this.shadowRoot?.querySelector('input#username') as HTMLInputElement).value.trim().toLowerCase();
    let wif = (this.shadowRoot?.querySelector('input#wif') as HTMLInputElement).value.trim();
    this.userService.auth(username, wif)
      .then(_ => {
        // TODO: взять параметры для редиректа из урла
        Router.go('/award');
      }, rejectReason => {
        let resultContainer = this.shadowRoot?.querySelector('span#result') as HTMLElement;
        if (resultContainer) {
          resultContainer.innerHTML = rejectReason;
        }
      });
  }
}