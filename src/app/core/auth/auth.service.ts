import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'app/environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    //private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);
    private readonly baseUrl = `${environment.baseUrl}`;

    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    set authenticated(authenticated: string) {
        localStorage.setItem('authenticated', authenticated);
    }

    get authenticated(): string {
        return localStorage.getItem('authenticated');
    }

    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    signIn(credentials: { email: string; password: string }): Observable<any> {
        //return this._httpClient.post('api/auth/sign-in', credentials).pipe(
        return this._httpClient.post(`${this.baseUrl}/login`, credentials).pipe(
            switchMap((response: any) => {
                console.log('response login', response);
                this.accessToken = response.accessToken;

                this.authenticated = "true";

                this._userService.user = response.user;

                console.log('response', response);
                return of(response);
            })
        );
    }

    signOut(): Observable<any> {
        localStorage.removeItem('accessToken');

        this.authenticated = "false";

        return of(true);
    }

    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    check(): Observable<boolean> {
        if (this.authenticated === 'true') {
            return of(true);
        }

        if (!this.accessToken) {
            return of(false);
        }

        /* console.log(
            'Is Token Expired:',
            AuthUtils.isTokenExpired(this.accessToken)
        );
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        } */
        return of(false);
    }
}
