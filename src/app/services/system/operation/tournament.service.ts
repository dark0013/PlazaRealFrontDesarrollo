import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Tournament } from 'app/model/Tournament.model';
import { TournamentByIdResponse } from 'app/model/tournamentInfo.model';
import { BaseCrudService } from 'app/services/basecrud.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TournamentService extends BaseCrudService<Tournament> {
    constructor(http: HttpClient) {
        super(http, `${environment.baseUrl}/admin/tournaments`);
    }

    addParticipant(
          teamName: string,
        tournamentId: number,
        sportsmanId: number,
        partnerId?: number
    ) {
        const url = `${this.baseUrl}/participants`;

        const body: any = {
            tournament_id: tournamentId,
            sportsman_id: sportsmanId,
            teamName: teamName,
        };

        if (partnerId) {
            body.partner_id = partnerId;
        }

        return this.http.post(url, body);
    }

    getTournamentDetail(id: number): Observable<TournamentByIdResponse> {
        return this.http.get<TournamentByIdResponse>(
            `${this.baseUrl}/by-id/${id}`
        );
    }
}
