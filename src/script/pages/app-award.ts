import { LitElement, css, html, customElement } from 'lit-element';

declare var viz: any;

@customElement('app-award')
export class AppAward extends LitElement {

    static get styles() {
        return css`
        `;
    }

    constructor() {
        super();
        viz.config.set('websocket', 'https://node.viz.plus/');
        
    }

    render() {
        return html`
            <div>
                <h2>Link: ${this._getLink()}</h2>
                <h2>User: ${this._getUser()}</h2>
                <h2>Changeable: ${this._getChangable()}</h2>
                Accounts: ${this._getAccounts()}
            </div>
        `;
    }

    _getLink(): string {
        return new URLSearchParams(location.search).get('link') || '';
    }

    _getUser(): string {
        return new URLSearchParams(location.search).get('user') || '';
    }

    _getChangable(): boolean {
        let changeable = (new URLSearchParams(location.search).get('changeable') || '') == 'true';
        return changeable || this._getLink().length == 0 || this._getUser().length == 0;
    }

    _getAccounts(): string {
        viz.api.getAccounts(['id'], function(err: any, result: any) {
            console.log(err, result);
        });
        return "accounts";
    }

}
