import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Role } from 'app/model/Role.model';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    private readonly baseUrl = `${environment.securityService}/roles`;
    // private readonly baseUrl = `https://690419fad0f10a340b26b43f.mockapi.io/api/generico/role`;

    // Flag para usar mock data
    private useMock = false;

    private roles: Role[] = [
        { id: 1, name: 'Admin', description: 'Administrador', state: true },
        { id: 2, name: 'User', description: 'Usuario normal', state: true },
        { id: 3, name: 'Guest', description: 'Invitado', state: false },
    ];

    private rolesSubject = new BehaviorSubject<Role[]>(this.roles);

    constructor(private http: HttpClient) {}

    // ---------- READ ----------
    getAll(): Observable<Role[]> {
        if (this.useMock) {
            return this.rolesSubject.asObservable().pipe(delay(300));
        }
        return this.http.get<Role[]>(this.baseUrl);
    }

    getById(id: number): Observable<Role> {
        if (this.useMock) {
            const role = this.roles.find((r) => r.id === id);
            return of(role!).pipe(delay(200));
        }
        return this.http.get<Role>(`${this.baseUrl}/${id}`);
    }

    // ---------- CREATE ----------
    create(role: Partial<Role>): Observable<Role> {
        if (this.useMock) {
            const newRole: Role = {
                id: this.roles.length + 1,
                name: role.name || 'Sin nombre',
                description: role.description || '',
                state: role.state ?? true,
            };
            this.roles.push(newRole);
            this.rolesSubject.next(this.roles);
            return of(newRole).pipe(delay(300));
        }
        return this.http.post<Role>(this.baseUrl, role);
    }

    // ---------- UPDATE ----------
    update(id: number, changes: Partial<Role>): Observable<Role> {
        if (this.useMock) {
            const index = this.roles.findIndex((r) => r.id === id);
            if (index === -1) throw new Error('Rol no encontrado');
            this.roles[index] = { ...this.roles[index], ...changes };
            this.rolesSubject.next(this.roles);
            return of(this.roles[index]).pipe(delay(300));
        }
        return this.http.put<Role>(`${this.baseUrl}/${id}`, changes);
    }

    activate(id: number, changes: Partial<Role>): Observable<Role> {
        if (this.useMock) {
            return this.toggleState(id);
        }
        return this.http.put<Role>(`${this.baseUrl}/${id}`, changes);
    }

    deActivate(id: number, changes: Partial<Role>): Observable<Role> {
        if (this.useMock) {
            return this.toggleState(id);
        }
        return this.http.put<Role>(`${this.baseUrl}/${id}`, changes);
    }
    // ---------- DELETE ----------
    delete(id: number): Observable<void> {
        if (this.useMock) {
            this.roles = this.roles.filter((r) => r.id !== id);
            this.rolesSubject.next(this.roles);
            return of(undefined).pipe(delay(200));
        }
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    // Cambiar state
    toggleState(id: number): Observable<Role> {
        if (this.useMock) {
            const index = this.roles.findIndex((r) => r.id === id);
            if (index === -1) throw new Error('Rol no encontrado');
            this.roles[index].state = !this.roles[index].state;
            this.rolesSubject.next(this.roles);
            return of(this.roles[index]).pipe(delay(300));
        }
        // En el backend real podrías tener un endpoint PATCH o PUT
        return this.http.put<Role>(`${this.baseUrl}/${id}/toggle-state`, {});
    }
}
