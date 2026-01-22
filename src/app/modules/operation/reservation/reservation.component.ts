import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Catalog } from 'app/model/catalog.model';
import { ReservationService } from 'app/services/system/control/reservation.service';
import { CatalogService } from 'app/services/system/shared/catalog.service';
import { AlertService } from 'app/shared/components/alert/alert.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';
import { ModalReservacionComponent } from './modal-reservacion/modal-reservacion.component';

@Component({
    selector: 'app-reservation',
    imports: [
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    templateUrl: './reservation.component.html',
    styleUrl: './reservation.component.scss',
})
export class ReservationComponent {
    selectedCancha: number = 0;
    selectedCanchaText!: string;
    selectedFecha: Date | null = new Date();
    scenario: Catalog[] = [];
    sportsmenCatalog: Array<{ id: number; full_name: string }> = [];

    constructor(
        private _dialog: MatDialog,
        private reservationService: ReservationService,
        private _alertService: AlertService,
        private _notificationService: NotificationService,
        private _catalogService: CatalogService
    ) {}

    ngOnInit(): void {
        this.loadScenario();
        this.loadGetCatalogoSportman();
    }

    displayedColumns: string[] = ['columna2', 'columna3', 'columna4', 'accion'];

    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadScenario() {
        this._catalogService.getScenarios().subscribe({
            next: (resp: any) => {
                this.scenario = resp.data;

                if (this.scenario.length > 0) {
                    this.selectedCancha = this.scenario[0].value_key;
                    this.selectedCanchaText = this.scenario[0].option_value;
                    this.applyAdvancedFilters();
                }
            },
        });
    }

    loadGetCatalogoSportman() {
        this._catalogService.getSportsmen().subscribe({
            next: (resp: any) => {
                this.sportsmenCatalog = resp.data;
            },
            error: (err) => {
                console.error(err);
            },
        });
    }

    openDialogCrud(datoParamOpci?: any, accion?: string) {
        if (accion != 'new-register') {
            datoParamOpci.accion = accion;
        }

        let dialogRef: any = this._dialog.open(ModalReservacionComponent, {
            width: '50%',
            data: {
                register: datoParamOpci,
                idScenario: this.selectedCancha,
                nameScenario: this.selectedCanchaText,
                dateSelected: this.selectedFecha,
                sportsmen: this.sportsmenCatalog,
            },
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.applyAdvancedFilters();
            }
        });
    }

    deleteReservation(id) {
        const date = this.formatDate(this.selectedFecha);

        this.reservationService.deleteByScenarioAndDate(id, date).subscribe({
            next: () => {
                this._notificationService.show(
                    'success',
                    'Horario liberado',
                    'La reserva fue liberada correctamente'
                );
                this.applyAdvancedFilters();
            },
            error: (err) => {
                console.error(err);
                this._notificationService.show(
                    'error',
                    'Error',
                    'No se pudo liberar el horario'
                );
            },
        });
    }
    onCanchaChange(event: MatSelectChange) {
        this.selectedCancha = event.value;

        const option = event.source.selected as MatOption;

        this.selectedCanchaText = option.viewValue;

        this.applyAdvancedFilters();

        console.log('ID:', this.selectedCancha);
        console.log('Texto:', this.selectedCanchaText);
    }

    onFechaChange(fecha: Date) {
        this.selectedFecha = fecha;
        this.applyAdvancedFilters();
    }

    applyAdvancedFilters() {
        if (!this.selectedCancha || !this.selectedFecha) {
            return;
        }
        console.log('se envía fecha');
        console.log(this.selectedFecha);
        const date = this.formatDate(this.selectedFecha);
        console.log('fecha formateada');
        console.log(date);
        this.reservationService
            .getSchedulesByDate(this.selectedCancha, date)
            .subscribe({
                next: (resp) => {
                    this.dataSource.data = resp.data;
                },
                error: (err) => {
                    console.error(err);
                    this._notificationService.show(
                        'error',
                        'Error',
                        'No se pudo cargar la disponibilidad'
                    );
                },
            });
    }

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}
