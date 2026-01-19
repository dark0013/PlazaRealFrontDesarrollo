import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Category } from 'app/model/Category.model';
import { Sport } from 'app/model/Sport.model';
import { TournamentService } from 'app/services/system/operation/tournament.service';
import { CatalogService } from 'app/services/system/shared/catalog.service';
import { AlertService } from 'app/shared/components/alert/alert.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';
import { ModalTournamentComponent } from './modal-tournament/modal-tournament.component';

@Component({
    selector: 'app-tournament',
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
    ],
    templateUrl: './tournament.component.html',
    styleUrl: './tournament.component.scss',
})
export class TournamentComponent {
    categories: Category[] = [];
    sport: Sport[] = [];

    constructor(
        private _dialog: MatDialog,
        private _tournamentService: TournamentService,
        private _alertService: AlertService,
        private _notificationService: NotificationService,
        private _catalogService: CatalogService
    ) {}

    ngOnInit(): void {
        this.loadAllData();
        this.loadCategories();
        this.loadSport();
    }

    displayedColumns: string[] = [
        'id',
        'columna1',
        'columna2',
        'columna3',
        'estado',
        'accion',
    ];

    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(e: any) {
        this.dataSource.filter = e.target.value.trim().toLowerCase();
    }

    loadAllData() {
        this.dataSource.data = null;
        this._tournamentService.getAll().subscribe({
            next: (data: any) => {
                console.log(data);
                this.dataSource.data = data.data;
            },
            error: (err) => {
                console.error(err);
            },
        });
    }

    loadSport() {
        this._catalogService.getSports().subscribe({
            next: (resp: any) => {
                this.sport = resp.data;
            },
        });
    }

    loadCategories() {
        this._catalogService.getCategories().subscribe({
            next: (resp: any) => {
                this.categories = resp.data;
            },
        });
    }

    openDialogCrud(datoParamOpci?: any, accion?: string) {
        if (accion != 'new-register') {
            datoParamOpci.accion = accion;
        }

        let dialogRef: any = this._dialog.open(ModalTournamentComponent, {
            width: '50%',
            data: {
                register: datoParamOpci,
                categories: this.categories,
                sport: this.sport,
            },
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                if (result) {
                    this.loadAllData();
                }
            }
        });
    }

    openConfirmationDialog(data?: any, action?: string) {
        const actionDes = action === 'AC' ? 'Activar' : 'Inactivar';
        const colorAcc = action === 'AC' ? 'primary' : 'warn';

        this._alertService
            .confirmacionSimple(
                `¿Está seguro que desea ${actionDes} el registro?`,
                colorAcc
            )
            .subscribe((res) => {
                if (res === 'confirmed') {
                    this.updateState(data, action);
                }
            });
    }

    updateState(data: any, opcion: string) {
        if (opcion === 'activate') {
            this._tournamentService.activate(data.id).subscribe({
                next: (resp) => {
                    this.loadAllData();
                },
                error: (err) => {
                    console.error(err);
                    this._notificationService.show(
                        'error',
                        'Operación errónea',
                        'No se pudo actualizar el estado del registro'
                    );
                },
            });
        } else {
            this._tournamentService.deActivate(data.id).subscribe({
                next: (resp) => {
                    this.loadAllData();
                },
                error: (err) => {
                    console.error(err);
                    this._notificationService.show(
                        'error',
                        'Operación errónea',
                        'No se pudo actualizar el estado del registro'
                    );
                },
            });
        }
    }
}
