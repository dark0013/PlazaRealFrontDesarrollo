import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AthleteRankingServiceService {
    private readonly baseUrl = environment.baseUrl;

    constructor(private _http: HttpClient) {}

    getAthleteClassification(
        request: AthleteClassificationRequest
    ): Observable<any> {
        return this._http.post(
            `${this.baseUrl}/reporteria/reporte-clasificacion-deportistas`,
            request
        );
    }
}

export interface AthleteClassificationRequest {
    category: string;
    gender: string;
    tournamentId: number;
    startDate: string;
    endDate: string;
}
