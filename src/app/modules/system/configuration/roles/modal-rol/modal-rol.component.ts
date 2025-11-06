import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RoleService } from 'app/services/system/configuration/role.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';

@Component({
    selector: 'app-modal-rol',
    imports: [
        CommonModule,
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
        MatOptionModule,
        MatChipsModule,
        MatDatepickerModule,
        MatSnackBarModule,
    ],
    templateUrl: './modal-rol.component.html',
    styleUrl: './modal-rol.component.scss',
})
export class ModalRolComponent implements OnInit {
    dataFormDinamicModal: UntypedFormGroup;
    readonlyMode: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: UntypedFormBuilder,
        private _snackBar: MatSnackBar,
        private _roleService: RoleService,
        private _notificationService: NotificationService
    ) {
        this.dataFormDinamicModal = this._formBuilder.group({
            name: [this.data ? this.data.name : '', Validators.required],
            description: [this.data ? this.data.description : ''],
        });
        console.log(this.data);
    }
    ngOnInit(): void {
        this.initAction(this.data);
    }

    initAction(data?: any) {
        if (data != null) {
            if (data.accion == 'information') {
                this.readonlyMode = true;
            } else {
                this.readonlyMode = false;
            }
        }
    }

    saveData() {
        if (this.dataFormDinamicModal.valid) {
            if (this.data == null) {
                this._roleService
                    .create(this.dataFormDinamicModal.value)
                    .subscribe((resp) => {
                        this._notificationService.show(
                            'success',
                            'Transacción exitosa',
                            'Rol creado correctamente'
                        );
                    });
            } else {
                this._roleService
                    .update(this.data.id, this.dataFormDinamicModal.value)
                    .subscribe((resp) => {
                        this._notificationService.show(
                            'success',
                            'Transacción exitosa',
                            'Rol actualziado correctamente'
                        );
                    });
            }

            this._dialogRef.close(this.dataFormDinamicModal.value);
        }
    }

    close() {
        this._dialogRef.close();
    }

    showSnackbar(mensaje: string, txtBoton: string = '') {
        this._snackBar.open(mensaje, txtBoton, {
            duration: 3000, // Duración en milisegundos (opcional)
            horizontalPosition: 'center', // Posición horizontal ('start' | 'center' | 'end' | 'left' | 'right')
            verticalPosition: 'bottom', // Posició vertical ('top' | 'bottom')
        });
    }
}
