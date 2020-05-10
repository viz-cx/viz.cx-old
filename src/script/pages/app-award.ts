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
    }

    firstUpdated() {
        this.shadowRoot?.querySelector('#viz')?.value = this.shadowRoot?.querySelector('#energy')?.value;
    }

    render() {
        return html`
            <p>
                <label>
                    <span>Получатель:</span>
                    <input type="text" name="awardee" value="${this._getAwardee()}" />
                </label>
            </p>
            <p>
                <label>
                    <span>Энергия:</span>
                    <input id="energy" name="energy" type="range" min="1" max="${this._getEnergy()}" step="1" value="${this._getEnergy() / 10}" @change=${this.updateEnergy} />
                    <input id="viz" value=""></span>
                </label>
            </p>
            <p>
                <label>
                    <span>Пояснение:</span>
                    <input type="text" name="memo" value="${this._getMemo()}"  />
                </label>
            </p>
            <p>
                <input type="button" value="Наградить" @click="${this.sendAward}" />
            </p>
        `;
    }

    updateEnergy(elem: any) {
        this.shadowRoot?.querySelector('#viz')?.value = elem.srcElement.value;
    }

    sendAward(): void {
        alert(123);
    }

    _getEnergy(): number {
        return 5450 / 100;
    }

    _getMemo(): string {
        return new URLSearchParams(location.search).get('link') || '';
    }

    _getAwardee(): string {
        return new URLSearchParams(location.search).get('user') || '';
    }

    _getChangable(): boolean {
        let changeable = (new URLSearchParams(location.search).get('changeable') || '') == 'true';
        return changeable || this._getMemo().length == 0 || this._getAwardee().length == 0;
    }
}
