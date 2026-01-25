import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    private baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {}

    getSports(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/catalogs/sports`);
    }

    getSportsmen(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/catalogs/sportsmen`);
    }

    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/catalogs/categories`);
    }

    getScenarios(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/catalogs/scenarios`);
    }

    getTournament(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/catalogs/tournaments`);
    }
}
