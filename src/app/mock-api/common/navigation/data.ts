/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    /*typos:
    group
    basic
    divider
    collapsable
    
    'aside'
    'spacer'
    */

    {
        id: '1',
        title: 'SISTEMA',
        subtitle: 'Seguridad, accesos y configuraciones del sistema',
        type: 'group',
        icon: 'heroicons_outline:calculator',

        children: [
            {
                id: '1',
                title: 'Configuración',
                subtitle: 'Configuración Sistema',
                icon: 'heroicons_outline:cog-6-tooth',
                type: 'collapsable',

                children: [
                    {
                        id: '3',
                        title: 'Rol',
                        type: 'basic',
                        icon: 'heroicons_outline:identification',
                        link: '/configuracion/roles',
                        roles: [1], 
                    },
                ],
            },

            {
                id: '2',
                title: 'Accesos y Seguridad',
                subtitle: 'Administración Accesos',
                icon: 'heroicons_outline:check-circle',
                type: 'collapsable',
                children: [
                  /*   {
                        id: '2',
                        title: 'Asignación de pantallas por rol',
                        type: 'basic',
                        icon: 'heroicons_outline:shield-check',
                        link: '/access-securtiy/asignacionrol',
                        roles: [1], 
                    }, */

                    {
                        id: '3',
                        title: 'Gestión de usuarios',
                        type: 'basic',
                        icon: 'heroicons_outline:users',
                        link: '/access-securtiy/users',
                        roles: [1], 
                    },
                    {
                        id: '4',
                        title: 'Restablecer contraseña',
                        type: 'basic',
                        icon: 'heroicons_outline:key',
                        link: '/access-securtiy/reset-password',
                        roles: [1], 
                    },
                ],
            },
        ],
    },

    {
        id: '2',
        title: 'ADMINISTRACIÓN',
        subtitle: 'Administración y configuraciones de operaciones',
        type: 'group',
        icon: 'heroicons_outline:circle-stack',

        children: [
            {
                id: '1',
                title: 'Configuración',
                subtitle: 'Configuración Operaciones',
                icon: 'heroicons_outline:wrench-screwdriver',
                type: 'collapsable',

                children: [
                    {
                        id: '0',
                        title: 'Administración de Deportistas (Socios)',
                        type: 'basic',
                        icon: 'heroicons_outline:user-group',
                        link: '/sportsman/catalogo',
                        roles: [1, 2], 
                    },
                    {
                        id: '1',
                        title: 'Administración de Escenarios',
                        type: 'basic',
                        icon: 'heroicons_outline:building-office',
                        link: '/configuracion-administracion/areas',
                        roles: [1, 2], 
                    },
                    {
                        id: '2',
                        title: 'Administración de Categorías',
                        type: 'basic',
                        icon: 'heroicons_outline:squares-2x2',
                        link: '/configuracion-administracion/categorias',
                        roles: [1, 2], 
                    },
                    {
                        id: '3',
                        title: 'Administración de Deportes',
                        type: 'basic',
                        icon: 'heroicons_outline:trophy',
                        link: '/configuracion-administracion/deportes',
                        roles: [1, 2], 
                    },
                ],
            },
        ],
    },

    {
        id: '3',
        title: 'OPERACIÓN',
        subtitle: 'Operaciones comerciales',
        type: 'group',
        icon: 'heroicons_outline:x-mark',

        children: [
            {
                id: '1',
                title: 'Control y Reservas',
                subtitle: 'Control de reservaciones',
                icon: 'heroicons_outline:calendar',
                type: 'collapsable',

                children: [
                    {
                        id: '0',
                        title: 'Administración de Reservas',
                        type: 'basic',
                        icon: 'heroicons_outline:calendar-days',
                        link: '/operation-administracion/reservaciones/reservaciones',
                        roles: [1, 2, 3], 
                    },
                ],
            },

            {
                id: '2',
                title: 'Torneos',
                subtitle: 'Control de Torneos',
                icon: 'heroicons_outline:trophy',
                type: 'collapsable',

                children: [
                    {
                        id: '0',
                        title: 'Administración de Torneos',
                        type: 'basic',
                        icon: 'heroicons_outline:cube-transparent',
                        link: '/operation-administracion/torneos',
                        roles: [1, 2], 
                    },
                    {
                        id: '1',
                        title: 'Inscripción de Deportistas',
                        type: 'basic',
                        icon: 'heroicons_outline:user-group',
                        link: '/operation-administracion/registrations',
                        roles: [1, 2], 
                    },
                    {
                        id: '1',
                        title: 'Generación de Enfrentamientos',
                        type: 'basic',
                        icon: 'heroicons_outline:rectangle-group',
                        link: '/operation-administracion/matches',
                        roles: [1, 2], 
                    },
                    /*{
                        id: '1',
                        title: 'Programación de Partidos',
                        type: 'basic',
                        icon: 'heroicons_outline:calendar-days',
                        link: '/operation-administracion/match-scheduling',
                    },*/
                    {
                        id: '2',
                        title: 'Registrar Resultado',
                        type: 'basic',
                        icon: 'heroicons_outline:trophy',
                        link: '/operation-administracion/match-results',
                        roles: [1, 2], 
                    },
                ],
            },

            {
                id: '3',
                title: 'Reportes',
                subtitle: 'Informes y reportería',
                icon: 'heroicons_outline:book-open',
                type: 'collapsable',
                children: [
                    {
                        id: '3',
                        title: 'Clasificación de Deportistas',
                        type: 'basic',
                        icon: 'heroicons_outline:trophy',
                        link: '/reportes/ranking-deportistas',
                        roles: [1, 2, 3], 
                    },
                    {
                        id: '4',
                        title: 'Reservas de Escenarios',
                        type: 'basic',
                        icon: 'heroicons_outline:calendar-days',
                        link: '/reportes/reservas-escenarios',
                        roles: [1, 2, 3], 
                    },
                    {
                        id: '5',
                        title: 'Fases y Resultados de Torneos',
                        type: 'basic',
                        icon: 'heroicons_outline:squares-2x2',
                        link: '/reportes/resultados-torneos',
                        roles: [1, 2, 3], 
                    },
                ],
            },
        ],
    },
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
