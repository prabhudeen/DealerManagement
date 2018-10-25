import { SessionStorageService } from "angular-web-storage";
import { Injectable } from "@angular/core";

@Injectable()
export class SessionService {
    constructor(private local: SessionStorageService) {}

    set(key: string, value: any) {
        this.local.set(key, value);
    }

    remove(key: string) {
        this.local.remove(key);
    }

    get(key: string) {
        return this.local.get(key);
    }

    clear() {
        this.local.clear();
    }

}