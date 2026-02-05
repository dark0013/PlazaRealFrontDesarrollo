import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Catalog } from 'app/model/catalog.model';
import { VenueReservationReportServiceService } from 'app/services/system/report/venue-reservation-report-service.service';
import { CatalogService } from 'app/services/system/shared/catalog.service';

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
        MatPaginatorModule,
    ],
    templateUrl: './venue-reservation-report-component.component.html',
    styleUrl: './venue-reservation-report-component.component.scss',
})
export class VenueReservationReportComponentComponent implements OnInit {
    scenarios: Catalog[] = [];
    displayedColumns: string[] = ['venue', 'date', 'time', 'match', 'availability'];

    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    filters = {
        venueId: 0,
        fromDate: new Date(),
        toDate: new Date(),
    };

    constructor(
        private _reservationService: VenueReservationReportServiceService,
        private _catalogService: CatalogService
    ) {}

    ngOnInit(): void {
        this.loadScenarios();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    loadScenarios() {
        this._catalogService.getScenarios().subscribe({
            next: (resp: any) => {
                this.scenarios = resp.data;

                if (this.scenarios.length > 0) {
                    this.filters.venueId = this.scenarios[0].value_key;
                    this.loadReservations();
                }
            },
        });
    }

    loadReservations(): void {
        this.dataSource.data = [];

        this._reservationService
            .getReservationReport(
                this.filters.venueId,
                this.formatDate(this.filters.fromDate),
                this.formatDate(this.filters.toDate)
            )
            .subscribe({
                next: (resp) => {
                    this.dataSource.data = resp.data;
                },
                error: (err) => {
                    console.error(
                        'Error al obtener reporte de reservaciones',
                        err
                    );
                },
            });
    }

    exportToExcel(): void {
        this._reservationService.exportToExcel(this.dataSource.data);
    }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }
}
