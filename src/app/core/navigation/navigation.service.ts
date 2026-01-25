import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    private _httpClient = inject(HttpClient);
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
get(): Observable<Navigation> {
    const idRol = 1;  // Aquí se debe obtener el rol del usuario logueado
    return this._httpClient.get<Navigation>(`http://127.0.0.1:8000/api/navigation?rol_id=${idRol}`).pipe(
        tap((navigation) => {
            console.log('Respuesta del GET /navigation:'); // <-- aquí
            console.log(navigation); // <-- aquí
            this._navigation.next(navigation);
        })
    );
}

}
