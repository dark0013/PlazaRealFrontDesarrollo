import { Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    constructor() {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            this._user.next(JSON.parse(savedUser));
        }
    }

    set user(value: User) {
        this._user.next(value);
        localStorage.setItem('user', JSON.stringify(value));
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }
}
