import { LocalStorage } from "./localStorage";

declare let viz: any;

export class VizUser {
    username: string;
    wif: string;

    constructor(username: string, wif: string) {
        this.username = username;
        this.wif = wif;
    }
}

export class UserStorage {

    private storage: LocalStorage;
    private userKey = 'viz.username';
    private wifKey = 'viz.wif';

    constructor() {
        this.storage = new LocalStorage();
    }

    public auth(username: string, wif: string): Promise<VizUser> {
        return new Promise((resolve, reject) => {
            viz.api.getAccounts([username], (err: any, response: any) => {
                this.forgetUser();
                if (!err) {
                    if (typeof response[0] !== 'undefined') {
                        // TODO: viz.auth.wifIsValid(privWif, pubWif) по этому юзеру
                        if (viz.auth.isWif(wif)) {
                            let user = new VizUser(username, wif);
                            this.saveUser(user);
                            resolve(user);
                        } else {
                            reject('Wif is not valid');
                        }
                    } else {
                        reject(`Account ${username} not found`)
                    }
                } else {
                    reject(err);
                }
            });
        });
    }

    public getCurrentUser(): VizUser | null {
        let username = this.storage.get(this.userKey)
        let wif = this.storage.get(this.wifKey)
        if (username && wif) {
            return new VizUser(username, wif)
        }
        return null;
    }

    public forgetUser() {
        this.saveUser(null);
    }

    private saveUser(user: VizUser | null) {
        if (user) {
            this.storage.add(this.userKey, user.username);
            this.storage.add(this.wifKey, user.wif);
        } else {
            this.storage.remove(this.userKey);
            this.storage.remove(this.wifKey);
        }
    }
}
