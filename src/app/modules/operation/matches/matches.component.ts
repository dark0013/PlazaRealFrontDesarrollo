import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

interface Match {
    id: number;
    player1: string;
    player2: string;
    date?: string;
    court?: string;
}

interface Round {
    name: string;
    matches: Match[];
}

@Component({
    selector: 'app-matches',
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './matches.component.html',
    styleUrl: './matches.component.scss',
})
export class MatchesComponent {
    selectedTournament: number | null = null;

    rounds: Round[] = [];

    generateMatches() {
        this.rounds = [
            {
                name: 'Cuartos de final',
                matches: [
                    { id: 1, player1: 'Equipo A', player2: 'Equipo B' },
                    { id: 2, player1: 'Equipo C', player2: 'Equipo D' },
                    { id: 3, player1: 'Equipo E', player2: 'Equipo F' },
                    { id: 4, player1: 'Equipo G', player2: 'Equipo H' },
                ],
            },
            {
                name: 'Semifinal',
                matches: [
                    { id: 5, player1: 'Ganador M1', player2: 'Ganador M2' },
                    { id: 6, player1: 'Ganador M3', player2: 'Ganador M4' },
                ],
            },
            {
                name: 'Final',
                matches: [
                    { id: 7, player1: 'Ganador SF1', player2: 'Ganador SF2' },
                ],
            },
        ];
    }

    openMatch(match: Match) {
        // aquí abres modal de:
        // - fecha
        // - cancha
        // - hora
        console.log('Match seleccionado:', match);
    }

    getRoundClass(index: number): string {
        switch (index) {
            case 0: // Cuartos
                return 'gap-y-6 pt-0';

            case 1: // Semifinal
                return 'gap-y-20 pt-12';

            case 2: // Final
                return 'gap-y-40 pt-28';

            default:
                return '';
        }
    }
}
