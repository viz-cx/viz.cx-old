import { LitElement, css, html, customElement } from 'lit-element';


@customElement('app-award')
export class AppAward extends LitElement {

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
                <h2>Link: ${this._getLink()}</h2>
                <h2>User: ${this._getUser()}</h2>
                <h2>Changeable: ${this._getChangable()}</h2>
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

}
