import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Role } from 'app/model/Role.model';
import { BaseCrudService } from 'app/services/basecrud.service';

@Injectable({
    providedIn: 'root',
})
export class RoleService extends BaseCrudService<Role> {
    constructor(http: HttpClient) {
        super(http, `${environment.securityService}/roles`);
    }
}
