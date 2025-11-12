import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { User } from 'app/model/user.model';
import { BaseCrudService } from 'app/services/basecrud.service';

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseCrudService<User> {
    constructor(http: HttpClient) {
        super(http, `${environment.securityService}/users`);
    }
}
