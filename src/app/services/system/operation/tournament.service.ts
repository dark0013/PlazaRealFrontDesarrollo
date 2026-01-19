import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Sport } from 'app/model/Sport.model';
import { Tournament } from 'app/model/Tournament.model';
import { BaseCrudService } from 'app/services/basecrud.service';

@Injectable({
    providedIn: 'root',
})
export class TournamentService extends BaseCrudService<Tournament> {
    constructor(http: HttpClient) {
        super(http, `${environment.baseUrl}/admin/tournaments`);
    }
}
