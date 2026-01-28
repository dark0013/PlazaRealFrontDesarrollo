import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TournamentResultsBracketServiceService {
    constructor() {}

    getBracket(filters: any): Observable<any[]> {
        return of([
            {
                round: 'Quarterfinal',
                player1: 'Carlos Pérez',
                player2: 'Juan Gómez',
                score: '6-4 / 6-3',
                winner: 'Carlos Pérez',
            },
            {
                round: 'Semifinal',
                player1: 'Carlos Pérez',
                player2: 'Luis Andrade',
                score: '7-5 / 6-2',
                winner: 'Carlos Pérez',
            },
            {
                round: 'Final',
                player1: 'Carlos Pérez',
                player2: 'Miguel Torres',
                score: '6-3 / 6-4',
                winner: 'Carlos Pérez',
            },
        ]);
    }
}
