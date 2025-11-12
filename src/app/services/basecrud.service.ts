import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseCrudService<T> {
    constructor(
        protected http: HttpClient,
        protected baseUrl: string
    ) {}

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.baseUrl);
    }

    getById(id: number): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${id}`);
    }

    create(entity: Partial<T>): Observable<T> {
        return this.http.post<T>(this.baseUrl, entity);
    }

    update(id: number, changes: Partial<T>): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${id}`, changes);
    }

    activate(id: number): Observable<T> {
        return this.http.patch<T>(`${this.baseUrl}/${id}/active`, {});
    }

    deActivate(id: number): Observable<T> {
        return this.http.patch<T>(`${this.baseUrl}/${id}/deactive`, {});
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
