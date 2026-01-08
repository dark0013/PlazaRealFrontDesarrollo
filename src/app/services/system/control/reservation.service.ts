import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Reservation } from 'app/model/Reservation.model';
import { BaseCrudService } from 'app/services/basecrud.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends BaseCrudService<Reservation> {
    constructor(http: HttpClient) {
        super(http, `${environment.baseUrl}/reservations`);
    }
}