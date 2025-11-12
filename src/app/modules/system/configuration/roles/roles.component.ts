import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RoleService } from 'app/services/system/configuration/role.service';
import { AlertService } from 'app/shared/components/alert/alert.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';
import { ModalRolComponent } from './modal-rol/modal-rol.component';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.scss',
    imports: [
        MatSortModule,
        NgIf,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatDatepickerModule,
    ],
})
export class RolesComponent {
    constructor(
        private _dialog: MatDialog,
        private _roleService: RoleService,
        private _alertService: AlertService,
        private _notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.loadAllData();
    }

    displayedColumns: string[] = [
        'id',
        'columna1',
        'columna2',
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
        this._roleService.getAll().subscribe({
            next: (data: any) => {
                this.dataSource.data = data.data;
            },
            error: (err) => {
                console.error('');
                this._notificationService.show(
                    'error',
                    'Operación errónea',
                    'No se pudo cargar la lista de roles'
                );
            },
        });
    }

    openDialogCrud(datoParamOpci?: any, accion?: string) {
        if (accion != 'new-register') {
            datoParamOpci.accion = accion;
        }

        let dialogRef: any = this._dialog.open(ModalRolComponent, {
            width: '50%',
            data: datoParamOpci,
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
            this._roleService.activate(data.id).subscribe({
                next: (resp) => {
                    this.loadAllData();
                },
                error: (err) => {
                    console.error(err);
                    this._notificationService.show(
                        'error',
                        'Operación errónea',
                        'No se pudo actualizar el estado del rol'
                    );
                },
            });
        } else {
            this._roleService.deActivate(data.id).subscribe({
                next: (resp) => {
                    this.loadAllData();
                },
                error: (err) => {
                    console.error(err);
                    this._notificationService.show(
                        'error',
                        'Operación errónea',
                        'No se pudo actualizar el estado del rol'
                    );
                },
            });
        }
    }
}
