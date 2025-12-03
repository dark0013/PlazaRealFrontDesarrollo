import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Sport } from 'app/model/Sport.model';
import { User } from 'app/model/user.model';
import { BaseCrudService } from 'app/services/basecrud.service';

@Injectable({
    providedIn: 'root',
})
export class SportsService extends BaseCrudService<Sport> {
    constructor(http: HttpClient) {
        super(http, `${environment.baseUrl}/sports`);
    }
}
