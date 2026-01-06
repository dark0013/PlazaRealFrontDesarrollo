import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Scenario } from 'app/model/Scenario.model';
import { User } from 'app/model/user.model';
import { BaseCrudService } from 'app/services/basecrud.service';

@Injectable({
    providedIn: 'root',
})
export class PlayAreaService extends BaseCrudService<Scenario> {
    constructor(http: HttpClient) {
        super(http, `${environment.baseUrl}/scenarios`);
    }
}
