export module StorageHelper {
    export interface IStorageItem {
        key: string;
        value: any;
    }

    export class StorageItem {
        key: string;
        value: any;

        constructor(data: IStorageItem) {
            this.key = data.key;
            this.value = data.value;
        }
    }

    export class LocalStorageWorker {
        localStorageSupported: boolean;

        constructor() {
            this.localStorageSupported = typeof window['localStorage'] != "undefined" && window['localStorage'] != null;
        }

        add(key: string, item: string) {
            if (this.localStorageSupported) {
                localStorage.setItem(key, item);
            }
        }

        getAllItems(): Array<StorageItem> {
            var list = new Array<StorageItem>();
            for (var i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                if (key) {
                    let value = localStorage.getItem(key);
                    list.push(new StorageItem({
                        key: key,
                        value: value
                    }));
                }
            }
            return list;
        }

        get(key: string): string | null {
            if (this.localStorageSupported) {
                var item = localStorage.getItem(key);
                return item;
            } else {
                return null;
            }
        }

        remove(key: string) {
            if (this.localStorageSupported) {
                localStorage.removeItem(key);
            }
        }

        clearAll() {
            if (this.localStorageSupported) {
                localStorage.clear();
            }
        }
    }
}
