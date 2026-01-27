import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root',
})
export class VenueReservationReportServiceService {
    constructor() {}
    getVenues(): Observable<any[]> {
        return of([
            { id: 1, name: 'Cancha Central' },
            { id: 2, name: 'Cancha Norte' },
        ]);
    }

    getReservations(filters: any): Observable<any[]> {
        // 🔥 aquí luego solo conectas backend con filtros
        return of([
            {
                venue: 'Cancha Central',
                date: new Date(2026, 5, 12),
                time: '10:00 - 11:30',
                match: 'Equipo A vs Equipo B',
                category: 'Senior',
            },
            {
                venue: 'Cancha Norte',
                date: new Date(2026, 5, 13),
                time: '14:00 - 15:30',
                match: 'Jugador 1 vs Jugador 2',
                category: 'U18',
            },
        ]);
    }

    exportToExcel(data: any[]): void {
        const worksheet = XLSX.utils.json_to_sheet(
            data.map((r) => ({
                Escenario: r.venue,
                Fecha: new Date(r.date).toLocaleDateString('es-ES'),
                Horario: r.time,
                Encuentro: r.match,
                Categoría: r.category,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reservas');

        XLSX.writeFile(workbook, 'venue_reservations.xlsx');
    }
}
