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
import { MatTableModule } from '@angular/material/table';
import { RoleService } from 'app/services/system/configuration/role.service';

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
export class ModalRolComponent implements OnInit {
    dataFormDinamicModal: UntypedFormGroup;
    readonlyMode: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: UntypedFormBuilder,
        private _roleService: RoleService
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
                    .subscribe();
            } else {
                this._roleService
                    .update(this.data.id, this.dataFormDinamicModal.value)
                    .subscribe();
            }

            this._dialogRef.close(null);
        }
    }

    close() {
        this._dialogRef.close();
    }
}
