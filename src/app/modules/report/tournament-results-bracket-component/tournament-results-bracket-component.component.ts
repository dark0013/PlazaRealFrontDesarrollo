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

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    ) { }

    ngOnInit(): void {
        this.loadTournaments();
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
                    this.loadBracket();
                }
            },
        });
    }

    loadBracket(): void {
        this.dataSource.data = [];
        this._bracketService
            .getBracketResults(this.filters.tournamentId)
            .subscribe({
                next: (resp) => {
                    this.dataSource.data = resp.data;
                },
                error: (err) => {
                    console.error('Error al obtener cuadro de resultados', err);
                },
            });
    }

    exportToExcel(): void {
        const data = this.dataSource.data.map((m, i) => ({
            '#': i + 1,
            Round: m.fase,
            Player1: m.jugador_1,
            Player2: m.jugador_2,
            Score: m.marcador,
            Winner: m.ganador,
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



    exportToPDF(): void {

        if (!this.dataSource.data?.length) return;

        const doc = new jsPDF();

        const tableData = this.dataSource.data.map((m, i) => ([
            i + 1,
            m.fase,
            m.jugador_1,
            m.jugador_2,
            m.marcador,
            m.ganador,
        ]));

        const pageWidth = doc.internal.pageSize.getWidth();
        const marginLeft = 14;

        doc.setFontSize(16);
        doc.text('URBANIZACIÓN PLAZA REAL', pageWidth / 2, 15, {
            align: 'center'
        });

        doc.setFontSize(14);
        doc.text('Reporte Cuadro de Resultados del Torneo', pageWidth / 2, 23, {
            align: 'center'
        });

        doc.setFontSize(10);
        doc.text(`Generado: ${new Date().toLocaleDateString()}`, marginLeft, 31);

        autoTable(doc, {
            startY: 39,
            head: [[
                '#',
                'Fase',
                'Equipo/Jugador 1',
                'Equipo/Jugador 2',
                'Marcador',
                'Ganador'
            ]],
            body: tableData,
            styles: {
                fontSize: 9
            },
            headStyles: {
                fillColor: [41, 128, 185] // azul elegante
            }
        });

        doc.save(`resultado_torneo_${new Date().toISOString().slice(0, 10)}.pdf`);
    }
}
