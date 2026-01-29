import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Catalog } from 'app/model/catalog.model';
import { MatchesService } from 'app/services/system/operation/matches.service';
import { CatalogService } from 'app/services/system/shared/catalog.service';
import { AlertService } from 'app/shared/components/alert/alert.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';

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
    tournament: Catalog[] = [];
    rounds: Round[] = [];
    isConfirming = false;

    constructor(
        private _alertService: AlertService,
        private _notificationService: NotificationService,
        private _catalogService: CatalogService,
        private _matchesService: MatchesService
    ) {}

    ngOnInit(): void {
        this.loadTournament();
    }

    loadTournament() {
        this._catalogService.getTournament().subscribe({
            next: (resp: any) => {
                this.tournament = resp.data;

                if (this.tournament.length > 0) {
                    this.selectedTournament = this.tournament[0].value_key;
                }
            },
        });
    }

    generateMatches() {
        if (true) {
            if (!this.selectedTournament) return;

            this._matchesService
                .generateMatches(this.selectedTournament)
                .subscribe({
                    next: () => {
                        this.loadBrackets();
                    },
                    error: (err) => {
                        console.error(err);
                        this.loadBrackets();
                    },
                });
        } else {
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
                        {
                            id: 7,
                            player1: 'Ganador SF1',
                            player2: 'Ganador SF2',
                        },
                    ],
                },
            ];
            this.loadBrackets();
        }
    }

    loadBrackets(): void {
        if (!this.selectedTournament) return;

        this._matchesService.getBrackets(this.selectedTournament).subscribe({
            next: (resp) => {
                const apiRounds = resp.data.rounds;
                this.rounds = this.mapBackendRoundsToUI(apiRounds);
            },
            error: (err) => {
                console.error(err);
                this.rounds = [];
            },
        });
    }

    private mapBackendRoundsToUI(apiRounds: any[]): UIRound[] {
        const totalRounds = apiRounds.length;

        return apiRounds.map((roundData, index) => {
            const roundNumber = roundData.round;

            return {
                name: this.getRoundName(roundNumber, totalRounds),
                matches: roundData.matches.map((m: any) => ({
                    id: m.match_id,
                    player1: m.player1_team,
                    player2: m.player2_team,
                })),
            };
        });
    }

    private getRoundName(round: number, totalRounds: number): string {
        if (round === totalRounds) {
            return 'Final';
        }

        if (round === totalRounds - 1) {
            return 'Semifinal';
        }

        if (round === totalRounds - 2) {
            return 'Cuartos de final';
        }

        return `Ronda ${round}`;
    }

    confirmMatches(): void {
        if (!this.selectedTournament) return;

        this.isConfirming = true;

        this._matchesService.confirmMatches(this.selectedTournament).subscribe({
            next: () => {
                this._notificationService.show(
                    'success',
                    'Confirmado',
                    'Los encuentros fueron confirmados correctamente'
                );

                this.loadBrackets();

                this.isConfirming = false;
            },
            error: (err) => {
                console.error(err);
                this._notificationService.show(
                    'warning',
                    'Atención',
                    'Encuentros ya habían sido confirmados'
                );
                this.isConfirming = false;
            },
        });
    }

    ///========================================================================0
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

interface UIRound {
    name: string;
    matches: {
        id: number;
        player1: string | null;
        player2: string | null;
    }[];
}
