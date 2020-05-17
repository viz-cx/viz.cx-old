import { LitElement, css, html, customElement } from 'lit-element';
import { UserStorage } from '../utils/userStorage';
import { Router } from '@vaadin/router';

declare let viz: any;

@customElement('app-award')
export class AppAward extends LitElement {

    private userStorage: UserStorage;

    private defaultEnergyDivider: number;

    static get styles() {
        return css`
          input {
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

    constructor(defaultEnergyDivider = 20, userStorage = new UserStorage()) {
        super();
        this.defaultEnergyDivider = defaultEnergyDivider;
        this.userStorage = userStorage;

        if (!userStorage.getCurrentUser()) {
            Router.go('/login' + '?redirect=/award');
        }

        this.updateComplete.then(() => {
            this.shadowRoot?.querySelectorAll('input').forEach(input => {
                input.addEventListener('keypress', (event) => {
                    if (event.keyCode == 13) {
                        event.preventDefault();
                        this.sendAward();
                    }
                });
            })
        });
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
                valueAttr.value = (value / this.defaultEnergyDivider).toString();
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
                <label for="receiver">Receiver:</label>
                <input id="receiver" name="receiver" type="text" value="${this.getReceiver()}" />
            </p>
            <p>
                <label for="energy">Energy:</span>
                <input id="energy" name="energy" type="range" min="0.01" step="0.01" @change=${this.updateEnergy} @input=${this.updateEnergy} />
                <span id="viz"></span>
            </p>
            <p>
                <label for="memo">Memo:</label>
                <input id="memo" name="memo" type="text" value="${this.getMemo()}" />
            </p>
            <p>
                <button type="submit" @click="${this.sendAward}">Award</button>
            </p>
            <p>
                <span id="result"></span>
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
        let currentUser = this.userStorage.getCurrentUser();
        let initiator = currentUser?.username;
        let wif = currentUser?.wif;
        if (!initiator || !wif) {
            this.showResult('Not authorized for send award', false);
            return;
        }
        let receiverInput = this.shadowRoot?.querySelector('input#receiver') as HTMLInputElement;
        if (!receiverInput || receiverInput.value.trim().length === 0) {
            this.showResult('Receiver is not valid', false);
            return;
        }
        let receiver = receiverInput.value.trim();

        let energyInput = this.shadowRoot?.querySelector('input#energy') as HTMLInputElement;
        if (!energyInput || energyInput.value.trim().length === 0) {
            this.showResult('Energy is not valid', false);
            return;
        }
        let energy = parseInt((parseFloat(energyInput.value.trim()) * 100).toString());

        let memoInput = this.shadowRoot?.querySelector('input#memo') as HTMLInputElement;
        if (!memoInput) {
            this.showResult('Memo is not valid', false);
            return;
        }
        let memo = memoInput.value.trim();

        let custom_sequence = 0;
        let beneficiaries: string[] = [];

        viz.broadcast.award(wif, initiator, receiver, energy, custom_sequence, memo, beneficiaries, (err: any, result: any) => {
            console.log(err, result);
            if (err) {
                this.showResult(err, false);
            } else {
                let obj = result['operations'][0][1];
                let initiator = obj['initiator'];
                let receiver = obj['receiver'];
                let memo = obj['memo'];
                let energy = (parseFloat(obj['energy']) / 100).toFixed(2);
                this.showResult(`
                Награждение <a href="https://info.viz.plus/accounts/${receiver}/">${receiver}</a>
                 энергией ${energy}%
                 от аккаунта <a href="https://info.viz.plus/accounts/${initiator}/">${initiator}</a>
                 с заметкой "${memo}"
                 прошло успешно!`);
            }
        });
    }

    private showResult(text: string, success = true) {
        let resultContainer = this.shadowRoot?.querySelector('span#result') as HTMLElement;
        if (resultContainer) {
            if (success) {
                resultContainer.innerHTML = `<div>${text}</div>`;
            } else {
                resultContainer.innerHTML = `<div style="color: red">${text}</div>`;
            }
        }
    }

    private async getEnergy(): Promise<number> {
        let user = this.userStorage.getCurrentUser();
        if (!user) {
            return Promise.reject('Not authorized');
        }
        let accounts: string[] = [user.username];
        return new Promise(resolve => {
            viz.api.getAccounts(accounts, function (err: any, result: any) {
                var minEnergy = 10000;
                if (!err && result) {
                    for (var account of result) {
                        let lastVoteTime = Date.parse(account.last_vote_time);
                        let deltaTime = (new Date().getTime() - lastVoteTime + (new Date().getTimezoneOffset() * 60000)) / 1000;
                        let energy = account.energy;
                        let regenerationTime = 24 * 5 * 60 * 60;
                        let calculatedEnergy = parseInt(energy + (deltaTime * 10000 / regenerationTime));
                        if (minEnergy > calculatedEnergy) {
                            minEnergy = calculatedEnergy;
                        }
                    }
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
