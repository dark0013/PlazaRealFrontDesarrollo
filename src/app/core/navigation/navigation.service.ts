import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { UserService } from 'app/core/user/user.service';
import { Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);
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
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                // Filtra la navegación según el rol del usuario
                const filteredNavigation =
                    this._filterNavigationByRole(navigation);
                this._navigation.next(filteredNavigation);
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filtra los items de navegación según el rol del usuario logueado
     */
    private _filterNavigationByRole(navigation: Navigation): Navigation {
        const roleId = this._getRoleId();

        const filterItems = (
            items: FuseNavigationItem[]
        ): FuseNavigationItem[] => {
            return items
                .map((item) => ({
                    ...item,
                    // Filtrar recursivamente los children si existen
                    children: item.children
                        ? filterItems(item.children)
                        : undefined,
                }))
                .filter((item) => {
                    // Si el item tiene un array 'roles' y el rol actual no está incluido, filtrarlo
                    if (item.roles && !item.roles.includes(roleId)) {
                        return false;
                    }

                    // Si el item tiene children, pero después del filtrado están vacíos, ocultarlo
                    if (item.children && item.children.length === 0) {
                        return false;
                    }

                    return true;
                });
        };

        return {
            ...navigation,
            default: filterItems(navigation.default),
            compact: filterItems(navigation.compact),
            futuristic: filterItems(navigation.futuristic),
            horizontal: filterItems(navigation.horizontal),
        };
    }

    /**
     * Obtiene el ID del rol del usuario de varias fuentes posibles
     */
    private _getRoleId(): number {
        // Intenta obtener el rol del UserService
        console.log('UserService user:', this._userService.user);
        if (this._userService.user?.role) {
            return Number(this._userService.user.role);
        }

        // Si no está disponible en UserService, intenta desde localStorage
        try {
            const storedUser = localStorage.getItem('user');
            console.log('Stored user from localStorage:', storedUser);
            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user?.role) {
                    console.log('User role from localStorage:', user.role);
                    return Number(user.role);
                }
            }
        } catch (error) {
            console.warn('Error reading user from localStorage:', error);
        }

        // Fallback a rol por defecto (1 = Admin)
        return 1;
    }
}
