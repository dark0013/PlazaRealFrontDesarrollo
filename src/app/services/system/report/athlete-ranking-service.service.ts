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
