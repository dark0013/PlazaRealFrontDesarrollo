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
            category: 'Senior',
            gender: 'Masculino',
            points: 1200,
            tournaments: 6,
        },
        {
            position: 2,
            name: 'Carlos Gómez',
            category: 'Senior',
            gender: 'Masculino',
            points: 980,
            tournaments: 5,
        },
        {
            position: 1,
            name: 'María López',
            category: 'Senior',
            gender: 'Femenino',
            points: 1100,
            tournaments: 6,
        },
        {
            position: 1,
            name: 'Ana Torres',
            category: 'Junior',
            gender: 'Femenino',
            points: 900,
            tournaments: 4,
        },
    ];

    /**
     * ✔ Método definitivo
     * ✔ Backend-ready
     * ✔ Solo este método cambiará cuando exista API real
     */
    getRanking(filters: RankingFilters): Observable<AthleteRanking[]> {
        return of(this.MOCK_DATA).pipe(
            delay(400), // simula latencia
            map((data) => this.applyFilters(data, filters)),
            map((data) => this.recalculatePositions(data))
        );
    }

    // =========================
    // Helpers (no tocarán en prod)
    // =========================

    private applyFilters(
        data: AthleteRanking[],
        filters: RankingFilters
    ): AthleteRanking[] {
        let result = [...data];

        if (filters.category) {
            result = result.filter((r) => r.category === filters.category);
        }

        if (filters.gender) {
            result = result.filter((r) => r.gender === filters.gender);
        }

        return result;
    }

    /**
     * Recalcula posiciones por categoría + género
     * (igual que lo hará el backend)
     */
    private recalculatePositions(data: AthleteRanking[]): AthleteRanking[] {
        const grouped = new Map<string, AthleteRanking[]>();

        data.forEach((item) => {
            const key = `${item.category}-${item.gender}`;
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
