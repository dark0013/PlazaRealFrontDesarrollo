import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    AthleteRanking,
    AthleteRankingServiceService,
} from 'app/services/system/report/athlete-ranking-service.service';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
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
    rankings: AthleteRanking[] = [];
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
            },
        });
    }

    loadRanking(): void {
        this._rankingService
            .getRanking({
                category: this.selectedCategory || '0',
                gender: this.selectedGender || '0',
            })
            .subscribe((data) => {
                this.rankings = data;
            });
    }

    onFilterChange(): void {
        this.loadRanking();
    }

    exportToExcel(): void {
        if (!this.rankings || this.rankings.length === 0) {
            return;
        }

        const data = this.rankings.map((item, index) => ({
            '#': index + 1,
            Deportista: item.name,
            Categoría: item.category,
            Género: item.gender,
            Puntos: item.points,
            Posición: index + 1,
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
