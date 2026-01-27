import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AthleteRankingServiceService {
    constructor() {}

    private readonly MOCK_DATA: AthleteRanking[] = [
        {
            position: 1,
            name: 'Juan Pérez',
            categoryId: 2,
            category: 'Senior',
            genderId: 'M',
            gender: 'Masculino',
            points: 1200,
            tournaments: 6,
        },
        {
            position: 2,
            name: 'Carlos Gómez',
            categoryId: 2,
            category: 'Senior',
            genderId: 'M',
            gender: 'Masculino',
            points: 980,
            tournaments: 5,
        },
        {
            position: 3,
            name: 'María López',
            categoryId: 2,
            category: 'Senior',
            genderId: 'F',
            gender: 'Femenino',
            points: 1100,
            tournaments: 6,
        },
        {
            position: 4,
            name: 'Ana Torres',
            categoryId: 1,
            category: 'Junior',
            genderId: 'F',
            gender: 'Femenino',
            points: 900,
            tournaments: 4,
        },
    ];

    getRanking(filters: RankingFilters): Observable<AthleteRanking[]> {
        console.log('Filters applied:', filters);
        return of(this.MOCK_DATA).pipe(
            delay(400), // simula latencia
            map((data) => this.applyFilters(data, filters)),
            map((data) => this.recalculatePositions(data))
        );
    }

    private applyFilters(
        data: AthleteRanking[],
        filters: RankingFilters
    ): AthleteRanking[] {
        let result = [...data];

        if (filters.category !== '0') {
            result = result.filter(
                (r) => r.categoryId === Number(filters.category)
            );
        }

        if (filters.gender !== '0') {
            result = result.filter((r) => r.genderId === filters.gender);
        }

        return result;
    }

    private recalculatePositions(data: AthleteRanking[]): AthleteRanking[] {
        const grouped = new Map<string, AthleteRanking[]>();

        data.forEach((item) => {
            const key = `${item.categoryId}-${item.genderId}`;
            if (!grouped.has(key)) {
                grouped.set(key, []);
            }
            grouped.get(key)!.push(item);
        });

        const result: AthleteRanking[] = [];

        grouped.forEach((group) => {
            group
                .sort((a, b) => b.points - a.points)
                .forEach((item, index) => {
                    result.push({
                        ...item,
                        position: index + 1,
                    });
                });
        });

        return result;
    }
}

export interface AthleteRanking {
    position: number;
    categoryId: number;
    genderId: string;
    name: string;
    category: string;
    gender: string;
    points: number;
    tournaments: number;
}

export interface RankingFilters {
    category?: string;
    gender?: string;
}
