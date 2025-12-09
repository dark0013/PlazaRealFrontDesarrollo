import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { User } from 'app/model/user.model';
import { BaseCrudService } from 'app/services/basecrud.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseCrudService<User> {
    constructor(http: HttpClient) {
        super(http, `${environment.baseUrl}/users`);
    }

    /* updatePartial(id: number, changes: Partial<User>): Observable<User> {
        return this.http.patch<User>(`${this.baseUrl}/${id}`, changes);
    } */
}
