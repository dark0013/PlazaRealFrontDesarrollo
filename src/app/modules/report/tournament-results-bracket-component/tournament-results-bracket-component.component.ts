import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TournamentResultsBracketServiceService } from 'app/services/system/report/tournament-results-bracket-service.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-tournament-results-bracket-component',
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './tournament-results-bracket-component.component.html',
    styleUrl: './tournament-results-bracket-component.component.scss',
})
export class TournamentResultsBracketComponentComponent implements OnInit {
    tournaments: any[] = [];
    matches: any[] = [];

    displayedColumns: string[] = [
        'round',
        'player1',
        'player2',
        'score',
        'winner',
    ];

    filters = {
        tournamentId: null,
        category: 'ALL',
    };

    constructor(
        private _bracketService: TournamentResultsBracketServiceService
    ) {}

    ngOnInit(): void {
        this.loadTournaments();
        this.loadBracket();
    }

    loadTournaments(): void {
        this._bracketService.getTournaments().subscribe((data) => {
            this.tournaments = data;
        });
    }

    loadBracket(): void {
        this._bracketService.getBracket(this.filters).subscribe((data) => {
            this.matches = data;
        });
    }

    exportToExcel(): void {
        const data = this.matches.map((m, i) => ({
            '#': i + 1,
            Round: m.round,
            Player1: m.player1,
            Player2: m.player2,
            Score: m.score,
            Winner: m.winner,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);

        worksheet['!cols'] = [
            { wch: 5 },
            { wch: 15 },
            { wch: 25 },
            { wch: 25 },
            { wch: 15 },
            { wch: 25 },
        ];

        const workbook: XLSX.WorkBook = {
            Sheets: { 'Tournament Bracket': worksheet },
            SheetNames: ['Tournament Bracket'],
        };

        XLSX.writeFile(workbook, 'tournament_results_bracket.xlsx');
    }
}
