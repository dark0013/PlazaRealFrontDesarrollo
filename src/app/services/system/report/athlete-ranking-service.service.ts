import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AthleteRankingServiceService {
    private readonly baseUrl = environment.baseUrl;

    constructor(private _http: HttpClient) {}

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

    getRanking_(filters: RankingFilters): Observable<any[]> {
        console.log('Filters applied:', filters);
        return of(this.MOCK_DATA).pipe(
            delay(400),
            map((data) => null)
        );
    }

    getAthleteClassification(
        category: string,
        gender: string
    ): Observable<any> {
        const payload = {
            category,
            gender,
        };

        return this._http.post(
            `${this.baseUrl}/reporteria/reporte-clasificacion-deportistas`,
            payload
        );
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
