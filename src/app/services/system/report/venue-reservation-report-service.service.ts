import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root',
})
export class VenueReservationReportServiceService {
    constructor() {}

    getReservations(filters: any): Observable<any[]> {
        return of([
            {
                reservation_id: 1,
                scenario_id: 1,
                scenario_name: 'Cancha Central',
                reservation_date: '2026-01-18',
                time: '08:00',
                responsable_person: 'Juan Pérez',
            },
            {
                reservation_id: 2,
                scenario_id: 2,
                scenario_name: 'Cancha Norte',
                reservation_date: '2026-01-19',
                time: '09:00 - 11:00',
                responsable_person: 'María López',
            },
            {
                reservation_id: 3,
                scenario_id: 3,
                scenario_name: 'Cancha Sur',
                reservation_date: '2026-01-20',
                time: '14:00',
                responsable_person: 'Carlos Andrade',
            },
            {
                reservation_id: 4,
                scenario_id: 1,
                scenario_name: 'Cancha Central',
                reservation_date: '2026-01-21',
                time: '10:00 - 12:00',
                responsable_person: 'Ana Torres',
            },
            {
                reservation_id: 5,
                scenario_id: 2,
                scenario_name: 'Cancha Norte',
                reservation_date: '2026-01-22',
                time: '16:00',
                responsable_person: 'Luis Vega',
            },
            {
                reservation_id: 6,
                scenario_id: 3,
                scenario_name: 'Cancha Sur',
                reservation_date: '2026-01-23',
                time: '07:00 - 09:00',
                responsable_person: 'Pedro Molina',
            },
            {
                reservation_id: 7,
                scenario_id: 1,
                scenario_name: 'Cancha Central',
                reservation_date: '2026-01-24',
                time: '18:00',
                responsable_person: 'Sofía Ruiz',
            },
            {
                reservation_id: 8,
                scenario_id: 2,
                scenario_name: 'Cancha Norte',
                reservation_date: '2026-01-25',
                time: '08:00 - 10:00',
                responsable_person: 'Diego Salazar',
            },
            {
                reservation_id: 9,
                scenario_id: 3,
                scenario_name: 'Cancha Sur',
                reservation_date: '2026-01-26',
                time: '11:00',
                responsable_person: 'Andrea Paz',
            },

            // 🔴 HOY
            {
                reservation_id: 10,
                scenario_id: 1,
                scenario_name: 'Cancha Central',
                reservation_date: '2026-01-27',
                time: '09:00 - 12:00',
                responsable_person: 'n/a',
            },
            {
                reservation_id: 11,
                scenario_id: 2,
                scenario_name: 'Cancha Norte',
                reservation_date: '2026-01-27',
                time: '13:00',
                responsable_person: 'Fernando Mora',
            },

            // 🔵 FUTURAS
            {
                reservation_id: 12,
                scenario_id: 3,
                scenario_name: 'Cancha Sur',
                reservation_date: '2026-01-28',
                time: '08:00 - 10:00',
                responsable_person: 'Paola Herrera',
            },
            {
                reservation_id: 13,
                scenario_id: 1,
                scenario_name: 'Cancha Central',
                reservation_date: '2026-01-29',
                time: '15:00',
                responsable_person: 'Ricardo León',
            },
            {
                reservation_id: 14,
                scenario_id: 2,
                scenario_name: 'Cancha Norte',
                reservation_date: '2026-01-30',
                time: '10:00 - 12:00',
                responsable_person: 'Valeria Ortiz',
            },
            {
                reservation_id: 15,
                scenario_id: 3,
                scenario_name: 'Cancha Sur',
                reservation_date: '2026-02-01',
                time: '17:00',
                responsable_person: 'Marco Díaz',
            },
            {
                reservation_id: 16,
                scenario_id: 1,
                scenario_name: 'Cancha Central',
                reservation_date: '2026-02-02',
                time: '07:00 - 09:00',
                responsable_person: 'Lucía Paredes',
            },
            {
                reservation_id: 17,
                scenario_id: 2,
                scenario_name: 'Cancha Norte',
                reservation_date: '2026-02-03',
                time: '18:00',
                responsable_person: 'Esteban Cruz',
            },
            {
                reservation_id: 18,
                scenario_id: 3,
                scenario_name: 'Cancha Sur',
                reservation_date: '2026-02-04',
                time: '11:00 - 13:00',
                responsable_person: 'Daniela Ríos',
            },
            {
                reservation_id: 19,
                scenario_id: 1,
                scenario_name: 'Cancha Central',
                reservation_date: '2026-02-05',
                time: '14:00',
                responsable_person: 'José Cedeño',
            },
            {
                reservation_id: 20,
                scenario_id: 2,
                scenario_name: 'Cancha Norte',
                reservation_date: '2026-02-06',
                time: '09:00 - 11:00',
                responsable_person: 'Mónica Silva',
            },
            {
                reservation_id: 21,
                scenario_id: 3,
                scenario_name: 'Cancha Sur',
                reservation_date: '2026-02-07',
                time: '16:00',
                responsable_person: 'Andrés Luna',
            },
            {
                reservation_id: 22,
                scenario_id: 1,
                scenario_name: 'Cancha Central',
                reservation_date: '2026-02-08',
                time: '10:00 - 12:00',
                responsable_person: 'Natalia Vera',
            },
        ]);
    }

    exportToExcel(data: any[]): void {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; 

        const worksheet = XLSX.utils.json_to_sheet(
            data.map((r) => ({
                Cancha: r.scenario_name,
                Fecha: new Date(r.reservation_date).toLocaleDateString('es-ES'),
                Horario: r.time,
                Responsable: r.responsable_person ?? '—',
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reservas');

        XLSX.writeFile(workbook, `reporte_reservas_${formattedDate}.xlsx`);
    }
}
