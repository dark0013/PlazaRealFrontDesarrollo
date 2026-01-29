import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'example' },

    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },

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
            {
                path: 'match-scheduling',
                loadChildren: () =>
                    import(
                        'app/modules/operation/match-scheduling/matches-scheduling.module'
                    ).then((m) => m.MatchesSchedulingComponentModule),
            },
            {
                path: 'match-results',
                loadChildren: () =>
                    import(
                        'app/modules/operation/match-results/matches-results.module'
                    ).then((m) => m.MatchesResultsComponentModule),
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
