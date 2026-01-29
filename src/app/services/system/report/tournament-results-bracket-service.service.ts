import { Injectable } from '@angular/core';
import signOutRoutes from 'app/modules/auth/sign-out/sign-out.routes';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TournamentResultsBracketServiceService {
    constructor() {}

    getBracket(filters: any): Observable<any[]> {
        console.log('Filters received in service:', filters);
        return of([
            {
                round: 'Quarterfinal',
                player1: 'Equipo 1',
                player2: 'Equipo 2',
                score: '6-4 / 6-3',
                winner: 'Equipo 1',
            },
            {
                round: 'Semifinal',
                player1: 'Equipo 1',
                player2: 'Equipo 3',
                score: '7-5 / 6-2',
                winner: 'Equipo 1',
            },
            {
                round: 'Final',
                player1: 'Equipo 1',
                player2: 'Equipo 4',
                score: '6-3 / 6-4',
                winner: 'Equipo 1',
            },
        ]);
    }
}
