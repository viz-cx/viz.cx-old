import { LitElement, css, html, customElement } from 'lit-element';

declare let viz: any;

@customElement('app-award')
export class AppAward extends LitElement {

    private defaultDivider = 20;

    static get styles() {
        return css`
        `;
    }

    constructor() {
        super();
    }

    firstUpdated() {
        let vizContainer = this.shadowRoot?.querySelector('#viz');
        let energyInput = this.shadowRoot?.querySelector('#energy') as HTMLInputElement;
        if (energyInput) {
            this.getEnergy().then(value => {
                let maxAttr = document.createAttribute('max');
                maxAttr.value = value.toString();
                energyInput.attributes.setNamedItem(maxAttr);
                let valueAttr = document.createAttribute('value');
                valueAttr.value = (value / this.defaultDivider).toString();
                energyInput.attributes.setNamedItem(valueAttr);
                if (vizContainer) {
                    vizContainer.innerHTML = energyInput.value + '%';
                }
            }, rejected => {
                console.log(rejected);
                if (vizContainer) {
                    vizContainer.innerHTML = energyInput.value + '%';
                }
            });
        }

        if (!this.getIsChangeble()) {
            let receiverInput = this.shadowRoot?.querySelector('input#receiver');
            if (receiverInput) {
                let readOnlyAttr = document.createAttribute('readOnly');
                readOnlyAttr.value = 'readOnly';
                receiverInput.attributes.setNamedItem(readOnlyAttr);
            }
            let memoInput = this.shadowRoot?.querySelector('input#memo');
            if (memoInput) {
                let readOnlyAttr = document.createAttribute('readOnly');
                readOnlyAttr.value = 'readOnly';
                memoInput.attributes.setNamedItem(readOnlyAttr);
            }
        }
    }

    render() {
        return html`
            <p>
                <label>
                    <span>Получатель:</span>
                    <input id="receiver" name="receiver" type="text" value="${this.getReceiver()}" />
                </label>
            </p>
            <p>
                <label>
                    <span>Энергия:</span>
                    <input id="energy" name="energy" type="range" min="0.01" step="0.01" @change=${this.updateEnergy} @input=${this.updateEnergy} />
                    <span id="viz"></span>
                </label>
            </p>
            <p>
                <label>
                    <span>Пояснение:</span>
                    <input id="memo" name="memo" type="text" value="${this.getMemo()}"  />
                </label>
            </p>
            <p>
                <input type="button" value="Наградить" @click="${this.sendAward}" />
            </p>
        `;
    }

    private updateEnergy(event: any): void {
        let vizContainer = this.shadowRoot?.querySelector('#viz');
        if (vizContainer) {
            vizContainer.innerHTML = event.srcElement.value + '%';
        }
    }

    private sendAward(): void {
        let initiator: string, wif: string; // TODO: Get from storage

        let receiverInput = this.shadowRoot?.querySelector('input#receiver') as HTMLInputElement;
        if (!receiverInput || receiverInput.value.trim().length === 0) {
            console.log('Receiver is not valid');
            return;
        }
        let receiver = receiverInput.value.trim();

        let energyInput = this.shadowRoot?.querySelector('input#energy') as HTMLInputElement;
        if (!energyInput || energyInput.value.trim().length === 0) {
            console.log('Energy is not valid');
            return;
        }
        let energy = Number(energyInput.value.trim()) * 100;

        let memoInput = this.shadowRoot?.querySelector('input#memo') as HTMLInputElement;
        if (!memoInput || memoInput.value.trim().length === 0) {
            console.log('Memo is not valid');
            return;
        }
        let memo = memoInput.value.trim();
        
        let custom_sequence = 0;
        let beneficiaries: string[] = [];

        viz.broadcast.award(wif, initiator, receiver, energy, custom_sequence, memo, beneficiaries, function (err: any, result: any) {
            console.log(err, result)
        });
    }

    private async getEnergy(): Promise<number> {
        let accounts: string[] = [];
        return new Promise(resolve => {
            viz.api.getAccounts(accounts, function(err: any, result: any) {
                var minEnergy = 10000;
                if (!err && result) {
                    for (var account of result) {
                        let energy: number = account['energy'];
                        if (energy && energy < minEnergy) {
                            minEnergy = energy;
                        }
                    }
                } else {
                    minEnergy = 0;
                }
                resolve(minEnergy / 100);
            });
        });
    }

    private getMemo(): string {
        return new URLSearchParams(location.search).get('memo') || '';
    }

    private getReceiver(): string {
        return new URLSearchParams(location.search).get('user') || '';
    }

    private getIsChangeble(): boolean {
        let changeable = (new URLSearchParams(location.search).get('changeable') || '') == 'true';
        return changeable || this.getMemo().length == 0 || this.getReceiver().length == 0;
    }
}
