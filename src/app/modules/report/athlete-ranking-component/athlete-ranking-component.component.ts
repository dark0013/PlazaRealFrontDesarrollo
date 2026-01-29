import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AthleteRankingServiceService } from 'app/services/system/report/athlete-ranking-service.service';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
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
    ],
    templateUrl: './athlete-ranking-component.component.html',
    styleUrl: './athlete-ranking-component.component.scss',
})
export class AthleteRankingComponentComponent implements OnInit {
    rankings: any[] = [];
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
    constructor(
        private _rankingService: AthleteRankingServiceService,
        private _catalogService: CatalogService
    ) {}

    ngOnInit(): void {
        this.loadRanking();
        this.loadCategories();
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
        this.rankings = [];

        this._rankingService
            .getAthleteClassification(
                this.selectedCategory,
                this.selectedGender
            )
            .subscribe({
                next: (resp) => {
                    this.rankings = resp.data
                        .sort((a, b) => {
                            const puntosDiff =
                                Number(b.puntos_totales) -
                                Number(a.puntos_totales);

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
        if (!this.rankings || this.rankings.length === 0) {
            return;
        }

        const data = this.rankings.map((item) => ({
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
}
