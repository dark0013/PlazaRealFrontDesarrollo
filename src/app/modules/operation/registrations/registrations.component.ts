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
import { TournamentService } from 'app/services/system/operation/tournament.service';
import { CatalogService } from 'app/services/system/shared/catalog.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';
import { ModalRegistrationsComponent } from './modal-registrations/modal-registrations.component';

@Component({
    selector: 'app-registrations',
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
    templateUrl: './registrations.component.html',
    styleUrl: './registrations.component.scss',
})
export class RegistrationsComponent {
    selectedCancha: number = 0;
    selectedCanchaText!: string;
    scenario: Catalog[] = [];
    sportsmenCatalog: Array<{ id: number; full_name: string }> = [];
    isTeam: boolean = false;

    constructor(
        private _dialog: MatDialog,
        private reservationService: ReservationService,
        private _notificationService: NotificationService,
        private _catalogService: CatalogService,
        private _tournamentService: TournamentService
    ) {}

    ngOnInit(): void {
        this.loadTournament();
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

    loadTournament() {
        this._catalogService.getTournament().subscribe({
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

        let dialogRef: any = this._dialog.open(ModalRegistrationsComponent, {
            width: '50%',
            data: {
                register: datoParamOpci,
                idScenario: this.selectedCancha,
                nameScenario: this.selectedCanchaText,
                sportsmen: this.sportsmenCatalog,
                isTeam: this.isTeam,
            },
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.applyAdvancedFilters();
            }
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

    applyAdvancedFilters() {
        if (!this.selectedCancha) {
            return;
        }

        this._tournamentService.getById(this.selectedCancha).subscribe({
            next: (resp: any) => {
                const tournament = resp.data;

                console.log('Torneo byId:', tournament);
            },
            error: (err) => {
                console.error(err);
                this._notificationService.show(
                    'error',
                    'Operación errónea',
                    'No se pudo cargar el torneo'
                );
            },
        });
    }
}
