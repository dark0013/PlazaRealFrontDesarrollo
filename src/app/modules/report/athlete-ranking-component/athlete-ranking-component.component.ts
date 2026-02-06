import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AthleteRankingServiceService } from 'app/services/system/report/athlete-ranking-service.service';

import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Catalog } from 'app/model/catalog.model';
import { Category } from 'app/model/Category.model';
import { CatalogService } from 'app/services/system/shared/catalog.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-athlete-ranking-component',
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatPaginatorModule,
    ],
    templateUrl: './athlete-ranking-component.component.html',
    styleUrl: './athlete-ranking-component.component.scss',
})
export class AthleteRankingComponentComponent implements OnInit, AfterViewInit {
    dataSource = new MatTableDataSource<any>([]);

    displayedColumns = [
        'position',
        'name',
        'category',
        'gender',
        'points',
        'tournaments',
    ];

    selectedCategory: string = '0';
    selectedGender: string = '0';
    categoryMap: Record<string, string> = {};
    categories: Category[] = [];

    tournaments: any[] = [];
    selectedTournamentId: string = '0';

    startDate!: string;
    endDate!: string;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private _rankingService: AthleteRankingServiceService,
        private _catalogService: CatalogService
    ) {}

    ngOnInit(): void {
        this.loadCategories();
        this.loadTournaments();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    loadTournaments(): void {
        this._catalogService.getTournament().subscribe({
            next: (resp: any) => {
                this.tournaments = resp.data;

                if (this.tournaments.length > 0) {
                    //this.selectedTournamentId = this.tournaments[0].value_key;
                    this.loadRanking();
                }
            },
        });
    }

    loadCategories() {
        this._catalogService.getCategories().subscribe({
            next: (resp: any) => {
                this.categories = resp.data;
                const categoriesCatalog = resp.data as Catalog[];

                this.categoryMap = categoriesCatalog.reduce(
                    (acc, cat) => {
                        acc[cat.value_key] = cat.option_value;
                        return acc;
                    },
                    {} as Record<string, string>
                );
            },
        });
    }

    loadRanking(): void {
        if (!this.selectedTournamentId || !this.startDate || !this.endDate) {
            return;
        }

        const request = {
            category: this.selectedCategory,
            gender: this.selectedGender,
            tournamentId: Number(this.selectedTournamentId),
            startDate: this.startDate,
            endDate: this.endDate,
        };

        this._rankingService.getAthleteClassification(request).subscribe({
            next: (resp) => {
                this.dataSource.data = resp.data
                    .sort((a, b) => {
                        const puntosDiff =
                            Number(b.puntos_totales) - Number(a.puntos_totales);

                        if (puntosDiff !== 0) {
                            return puntosDiff;
                        }

                        return (
                            Number(b.torneos_participados) -
                            Number(a.torneos_participados)
                        );
                    })
                    .map((item, index) => ({
                        ...item,
                        position: index + 1,
                    }));
            },
            error: (err) => {
                console.error('Error al obtener reporte', err);
            },
        });
    }

    onFilterChange(): void {
        this.loadRanking();
    }

    exportToExcel(): void {
        if (!this.dataSource.data || this.dataSource.data.length === 0) {
            return;
        }

        const data = this.dataSource.data.map((item) => ({
            '#': item.position,
            Deportista: item.deportista,
            Categoría: this.categoryMap[item.categoria] || item.categoria,
            Género:
                item.genero === 'M'
                    ? 'Masculino'
                    : item.genero === 'F'
                      ? 'Femenino'
                      : 'Otro',
            Puntos: Number(item.puntos_totales),
            'Torneos Jugados': item.torneos_participados,
        }));

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = {
            Sheets: { Ranking: worksheet },
            SheetNames: ['Ranking'],
        };

        XLSX.writeFile(
            workbook,
            `ranking_deportistas_${new Date().toISOString().slice(0, 10)}.xlsx`
        );
    }

    onStartDateChange(date: Date): void {
        this.startDate = this.formatDate(date);
        this.loadRanking();
    }

    onEndDateChange(date: Date): void {
        this.endDate = this.formatDate(date);
        this.loadRanking();
    }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0]; // YYYY-MM-DD
    }
}
