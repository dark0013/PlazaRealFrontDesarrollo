import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'example' },

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.routes'
                    ),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.routes'
                    ),
            },

            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.routes'),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.routes'),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.routes'
                    ),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.routes'
                    ),
            },
        ],
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/landing/home/home.routes'),
            },
        ],
    },

    // Admin routes
    /*  {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'example',
                loadChildren: () =>
                    import('app/modules/admin/example/example.routes'),
            },
             {
                path: 'sportsman',
                loadChildren: () =>
                    import('app/modules/admin/sportsman/sportsman.module'),
            }
        ],
    }, */
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'example',
                loadChildren: () =>
                    import('app/modules/admin/example/example.routes'),
            },
            {
                path: 'sportsman',
                loadChildren: () =>
                    import('app/modules/admin/sportsman/sportsman.module').then(
                        (m) => m.SportsmanModule
                    ),
            },
        ],
    },

    {
        path: 'configuracion',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'roles',
                loadChildren: () =>
                    import(
                        'app/modules/system/configuration/roles/roles.module'
                    ).then((m) => m.RolesModule),
            },
        ],
    },

    {
        path: 'access-securtiy',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'users',
                loadChildren: () =>
                    import(
                        'app/modules/system/access-securtiy/user/user.module'
                    ).then((m) => m.UserModule),
            },
        ],
    },

    {
        path: 'configuracion-administracion',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'areas',
                loadChildren: () =>
                    import('app/modules/admin/playarea/playarea.module').then(
                        (m) => m.PlayAreaModule
                    ),
            },
            {
                path: 'categorias',
                loadChildren: () =>
                    import(
                        'app/modules/admin/categories/categories.module'
                    ).then((m) => m.CategoriesModule),
            },
            {
                path: 'deportes',
                loadChildren: () =>
                    import('app/modules/admin/sports/sports.module').then(
                        (m) => m.SportsModule
                    ),
            },
        ],
    },

    {
        path: 'operation-administracion',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'reservaciones',
                loadChildren: () =>
                    import(
                        'app/modules/operation/reservation/reservation.module'
                    ).then((m) => m.ReservationModule),
            },
            {
                path: 'torneos',
                loadChildren: () =>
                    import(
                        'app/modules/operation/tournament/tournament.module'
                    ).then((m) => m.TournamentModule),
            },
            {
                path: 'registrations',
                loadChildren: () =>
                    import(
                        'app/modules/operation/registrations/registrations.module'
                    ).then((m) => m.RegistrationsModule),
            },
            {
                path: 'matches',
                loadChildren: () =>
                    import('app/modules/operation/matches/matches.module').then(
                        (m) => m.MatchesComponentModule
                    ),
            },
        ],
    },

    {
        path: 'reportes',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'ranking-deportistas',
                loadChildren: () =>
                    import(
                        'app/modules/report/athlete-ranking-component/athlete-ranking-component.module'
                    ).then((m) => m.AthleteRankingModule),
            },
            {
                path: 'reservas-escenarios',
                loadChildren: () =>
                    import(
                        'app/modules/report/venue-reservation-report-component/venue-reservation-report-component.module'
                    ).then((m) => m.VenueReservationReportModule),
            },
             {
                path: 'resultados-torneos',
                loadChildren: () =>
                    import(
                        'app/modules/report/tournament-results-bracket-component/tournament-results-bracket-component.module'
                    ).then((m) => m.TournamentResultsBracketModule),
            },
        ],
    },
];
