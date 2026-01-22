import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { CreateReservationPayload } from 'app/model/CreateReservationPayload.model';
import { Reservation } from 'app/model/Reservation.model';
import { ScheduleResponse } from 'app/model/ScheduleResponse.model';
import { BaseCrudService } from 'app/services/basecrud.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ReservationService extends BaseCrudService<Reservation> {
    constructor(http: HttpClient) {
        super(http, `${environment.baseUrl}/reservationsx`);
    }

    getSchedulesByDate(
        scenarioId: number,
        date: string
    ): Observable<ScheduleResponse> {
        const url = `${this.baseUrl}/by-date/${scenarioId}/${date}`;
        return this.http.get<ScheduleResponse>(url);
    }

    createReservation(payload: CreateReservationPayload): Observable<any> {
        return this.http.post<any>(this.baseUrl, payload);
    }

    deleteByScenarioAndDate(scenarioId: number, date: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${scenarioId}/${date}`);
    }
}
