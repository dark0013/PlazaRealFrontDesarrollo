import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserSecurityService {
    private readonly baseUrl = environment.baseUrl;

    constructor(private _http: HttpClient) {}

    forgotPassword(usuarioId: number, password: string, email: string): Observable<any> {
        return this._http.post(`${this.baseUrl}/forgot-password`, {
            usuario_id: String(usuarioId),
            password: password,
            email: email,
        });
    }
}
