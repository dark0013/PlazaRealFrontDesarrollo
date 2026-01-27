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

    selectedCategory: string | null = null;
    selectedGender: string | null = null;

    categories = ['Junior', 'Senior'];
    genders = ['Masculino', 'Femenino'];

    constructor(private _rankingService: AthleteRankingServiceService) {}

    ngOnInit(): void {
        this.loadRanking();
    }

    loadRanking(): void {
        this._rankingService
            .getRanking({
                category: this.selectedCategory || undefined,
                gender: this.selectedGender || undefined,
            })
            .subscribe((data) => {
                this.rankings = data;
            });
    }

    onFilterChange(): void {
        this.loadRanking();
    }
}
