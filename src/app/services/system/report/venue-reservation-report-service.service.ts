import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Observable, of } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root',
})
export class VenueReservationReportServiceService {
    private readonly baseUrl = environment.baseUrl;

    constructor(private _http: HttpClient) {}

    getReservationReport(
        scenarioId: number,
        startDate: string,
        endDate: string
    ): Observable<any> {
        return this._http.post(
            `${this.baseUrl}/reporteria/reporte-reservacion`,
            {
                scenario_id: scenarioId,
                start_date: startDate,
                end_date: endDate,
            }
        );
    }

    exportToExcel(data: any[]): void {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const worksheet = XLSX.utils.json_to_sheet(
            data.map((r) => ({
                Cancha: r.scenario_name,
                Fecha: new Date(r.reservation_date).toLocaleDateString('es-ES'),
                Horario: r.reservation_time,
                Responsable: r.sportsman_name ?? '—',
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reservas');

        XLSX.writeFile(workbook, `reporte_reservas_${formattedDate}.xlsx`);
    }
}
