import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Catalog } from 'app/model/catalog.model';
import { TournamentResultsBracketServiceService } from 'app/services/system/report/tournament-results-bracket-service.service';
import { CatalogService } from 'app/services/system/shared/catalog.service';
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
        MatPaginatorModule,
    ],
    templateUrl: './tournament-results-bracket-component.component.html',
    styleUrl: './tournament-results-bracket-component.component.scss',
})
export class TournamentResultsBracketComponentComponent implements OnInit {
    tournaments: any[] = [];
    matches: any[] = [];
    tournament: Catalog[] = [];

    displayedColumns: string[] = [
        'round',
        'player1',
        'player2',
        'score',
        'winner',
    ];

    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    filters = {
        tournamentId: null,
    };

    constructor(
        private _bracketService: TournamentResultsBracketServiceService,
        private _catalogService: CatalogService
    ) {}

    ngOnInit(): void {
        this.loadTournaments();
        this.loadBracket();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    loadTournaments(): void {
        this._catalogService.getTournament().subscribe({
            next: (resp: any) => {
                this.tournament = resp.data;
                if (this.tournament.length > 0) {
                    this.filters.tournamentId = this.tournament[0].value_key;
                }
            },
        });
    }

    loadBracket(): void {
        this._bracketService.getBracket(this.filters).subscribe((data) => {
            this.dataSource.data = data;
        });
    }

    exportToExcel(): void {
        const data = this.dataSource.data.map((m, i) => ({
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
