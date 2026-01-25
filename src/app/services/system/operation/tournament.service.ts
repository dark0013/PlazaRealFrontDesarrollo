import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Tournament } from 'app/model/Tournament.model';
import { BaseCrudService } from 'app/services/basecrud.service';

@Injectable({
    providedIn: 'root',
})
export class TournamentService extends BaseCrudService<Tournament> {
    constructor(http: HttpClient) {
        super(http, `${environment.baseUrl}/admin/tournaments`);
    }

    addParticipant(
        tournamentId: number,
        sportsmanId: number,
        partnerId?: number
    ) {
        const url = `${this.baseUrl}/${tournamentId}/participants`;

        const body: any = {
            sportsman_id: sportsmanId,
        };

        if (partnerId) {
            body.partner_id = partnerId;
        }

        return this.http.post(url, body);
    }
}
