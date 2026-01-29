import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TournamentResultsBracketServiceService {
    private _http = inject(HttpClient);
    private baseUrl = environment.baseUrl;
    constructor() {}

    getBracketResults(tournamentId: number): Observable<any> {
        return this._http.post(
            `${this.baseUrl}/reporteria/reporte-cuadro-resultados`,
            {
                tournament_id: tournamentId,
            }
        );
    }
}
