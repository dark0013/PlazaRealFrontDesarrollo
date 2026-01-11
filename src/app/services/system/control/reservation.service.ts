import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationRescheduleDTO } from 'app/dto/ReservationRescheduleDTO.dto';
import { environment } from 'app/environments/environment';
import { Reservation } from 'app/model/Reservation.model';
import { BaseCrudService } from 'app/services/basecrud.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReservationService extends BaseCrudService<Reservation> {
    constructor(http: HttpClient) {
        super(http, `${environment.baseUrl}/reservations`);
    }


    reschedule(id: number, payload: ReservationRescheduleDTO): Observable<Reservation> {
        return this.http.patch<Reservation>(
            `${this.baseUrl}/${id}/reschedule`,
            payload
        );
    }

}