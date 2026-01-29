import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Catalog } from 'app/model/catalog.model';
import { MatchesService } from 'app/services/system/operation/matches.service';
import { CatalogService } from 'app/services/system/shared/catalog.service';
import { AlertService } from 'app/shared/components/alert/alert.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';
import { ModalSchedulingComponent } from './modal-scheduling/modal-scheduling.component';

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
    selector: 'app-match-scheduling',
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
    ],
    templateUrl: './match-scheduling.component.html',
    styleUrl: './match-scheduling.component.scss',
})
export class MatchSchedulingComponent {
    selectedTournament: number | null = null;
    tournament: Catalog[] = [];
    rounds: Round[] = [];
    isConfirming = false;
    scenario: Catalog[] = [];

    constructor(
        private _alertService: AlertService,
        private _notificationService: NotificationService,
        private _catalogService: CatalogService,
        private _matchesService: MatchesService,
        private _dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadTournament();
        this.loadScenario();
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

    loadScenario() {
        this._catalogService.getScenarios().subscribe({
            next: (resp: any) => {
                this.scenario = resp.data;
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

    openMatch(match: Match) {
        console.log('Match seleccionado:', match);
        let dialogRef: any = this._dialog.open(ModalSchedulingComponent, {
            width: '50%',
            data: {
                register: match,
                scenario: this.scenario,
            },
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.loadBrackets();
            }
        });
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
