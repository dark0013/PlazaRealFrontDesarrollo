import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
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
import { MatTableModule } from '@angular/material/table';

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
    ],
    templateUrl: './modal-rol.component.html',
    styleUrl: './modal-rol.component.scss',
})
export class ModalRolComponent {
    formFieldHelpers: string[] = [''];
    accountForm: UntypedFormGroup;
    readonlyMode: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: UntypedFormBuilder,
    ) {
        this.accountForm = this._formBuilder.group({
            nombre: [this.data ? this.data.NOMBRE : '', Validators.required],
            descripcion: [this.data ? this.data.DESCRIPCION : ''],
        });

        console.table(data);
        this.initAcciones(data);
    }

    initAcciones(data?: any) {
        if (data != null) {
            if (data.accion == 'I') {
                this.readonlyMode = true;
            } else {
                this.readonlyMode = false;
            }
        }
        console.log(this.readonlyMode);
    }

    guardarDatos() {
        if (this.accountForm.valid) {
            let opcion: string;
            if (this.data != null) {
                if (this.data.accion == 'I') {
                    opcion = 'IN';
                } else {
                    opcion = 'AC';
                }
            } else {
                opcion = 'IN';
            }
         
            this._dialogRef.close(null);
        }
    }

    close() {
        this._dialogRef.close();
    }
}
