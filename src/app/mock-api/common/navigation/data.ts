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
        id: '0',
        title: 'Inicio',
        subtitle: 'Inicio del sistema',
        type: 'group',
        icon: 'heroicons_outline:home',

        children: [
            {
                id: '1',
                title: 'Perfil', //Panel Control
                subtitle: 'Información relevante',
                icon: 'heroicons_outline:home',
                type: 'basic',
                link: '/home',
            },
        ],
    },

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
                    {
                        id: '2',
                        title: 'Gestión de accesos',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-document-check',
                        link: '/acceso/asignacionrol',
                    },
                    {
                        id: '3',
                        title: 'Gestión de usuarios',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-document-check',
                        link: '/access-securtiy/users',
                    },
                    {
                        id: '4',
                        title: 'Bloqueos y contraseñas',
                        type: 'basic',
                        icon: 'heroicons_outline:list-bullet',
                        link: '/acceso/asignacionmodulo',
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
                icon: 'heroicons_outline:cog-6-tooth',
                type: 'collapsable',

                children: [
                    {
                        id: '0',
                        title: 'Administración de Deportistas (Socios)',
                        type: 'basic',
                        icon: 'heroicons_outline:list-bullet',
                        /* link: '/configuraciones/catalogo', */
                        link: '/sportsman/catalogo',
                    },
                    {
                        id: '1',
                        title: 'Administración de Escenarios',
                        type: 'basic',
                        icon: 'heroicons_outline:building-office',
                        link: '/configuracion-administracion/areas',
                    },
                    {
                        id: '2',
                        title: 'Administración de Categorías',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-document-check',
                        link: '/configuracion-administracion/categorias',
                    },
                    {
                        id: '3',
                        title: 'Administración de Deportes',
                        type: 'basic',
                        icon: 'heroicons_outline:information-circle',
                        link: '/configuracion-administracion/deportes',
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
        icon: 'heroicons_outline:clipboard-document-check',

        children: [
            {
                id: '1',
                title: 'Control y Reservas',
                subtitle: 'Control de reservaciones',
                icon: 'heroicons_outline:banknotes',
                type: 'collapsable',

                children: [
                    {
                        id: '0',
                        title: 'Administración de Reservas',
                        type: 'basic',
                        icon: 'heroicons_outline:document-plus',
                        link: '/operation-administracion/reservaciones/reservaciones',
                    },
                    {
                        id: '1',
                        title: 'Administración de Cuotas Societarias',
                        type: 'basic',
                        icon: 'heroicons_outline:list-bullet',
                        link: '/soporte/historial',
                    },
                ],
            },

            {
                id: '2',
                title: 'Reportes',
                subtitle: 'Informes y reportería',
                icon: 'heroicons_outline:book-open',
                type: 'collapsable',
                children: [
                    {
                        id: '3',
                        title: 'Reporte de Deportistas',
                        type: 'basic',
                        icon: 'heroicons_outline:phone',
                        link: '/seguimiento/soporte',
                    },
                    {
                        id: '3',
                        title: 'Reporte de Escenarios',
                        type: 'basic',
                        icon: 'heroicons_outline:document-check',
                        link: '/seguimiento/asignacion',
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
