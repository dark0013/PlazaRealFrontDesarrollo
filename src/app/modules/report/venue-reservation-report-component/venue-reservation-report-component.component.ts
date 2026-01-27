import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { VenueReservationReportServiceService } from 'app/services/system/report/venue-reservation-report-service.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-venue-reservation-report-component',
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
    ],
    templateUrl: './venue-reservation-report-component.component.html',
    styleUrl: './venue-reservation-report-component.component.scss',
})
export class VenueReservationReportComponentComponent implements OnInit {
    venues: any[] = [];
    reservations: any[] = [];

    displayedColumns: string[] = ['venue', 'date', 'time', 'match', 'category'];

    filters = {
        venueId: '',
        fromDate: null,
        toDate: null,
    };

    constructor(
        private _reservationService: VenueReservationReportServiceService
    ) {}

    ngOnInit(): void {
        this.loadVenues();
        this.loadReservations();
    }

    loadVenues(): void {
        this._reservationService.getVenues().subscribe((data) => {
            this.venues = data;
        });
    }

    loadReservations(): void {
        this._reservationService
            .getReservations(this.filters)
            .subscribe((data) => {
                this.reservations = data;
            });
    }

    exportToExcel(): void {
        this._reservationService.exportToExcel(this.reservations);
    }
}
