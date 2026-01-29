import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MatchesService {
    private readonly baseUrl = `${environment.baseUrl}/ramas`;

    constructor(private http: HttpClient) {}

    generateMatches(tournamentId: number): Observable<any> {
        return this.http.post(
            `${this.baseUrl}/${tournamentId}/generate-matches`,
            {}
        );
    }

    getBrackets(tournamentId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${tournamentId}/brackets`);
    }

    confirmMatches(tournamentId: number): Observable<any> {
        return this.http.post(
            `${this.baseUrl}/${tournamentId}/confirm-matches`,
            {}
        );
    }

    setMatchResult(
        tournamentId: number,
        round: number,
        payload: {
            id_round: number;
            winner_id: number;
            loser_id: number;
        }
    ): Observable<any> {
        return this.http.put(
            `${this.baseUrl}/tournaments/${tournamentId}/matches/${round}/result`,
            payload
        );
    }

    nextRoundVersus(tournamentId: number) {
        return this.http.get(
            `${this.baseUrl}/tournaments/${tournamentId}/next-round-versus`
        );
    }
}
