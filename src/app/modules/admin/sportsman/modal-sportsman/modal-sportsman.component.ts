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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SportsmanService } from 'app/services/system/admin/sportsman.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-sportsman',
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
         MatDialogModule,
    ],
    templateUrl: './modal-sportsman.component.html',
    styleUrl: 'modal-sportsman.component.scss'
})
export class ModalSportsmanComponent implements OnInit {
    dataFormDinamicModal: UntypedFormGroup;
    readonlyMode: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: UntypedFormBuilder,
        private _sportsmanService: SportsmanService,
        private _notificationService: NotificationService
    ) {
        this.dataFormDinamicModal = this._formBuilder.group({
            name: [this.data ? this.data.name : '', Validators.required],
            surname: [this.data ? this.data.surname : '', Validators.required],
            identification: [this.data ? this.data.identification : '', Validators.required],
            birthdate: [this.data ? this.data.birthdate : '', Validators.required],
            gender: [this.data ? this.data.gender : '', Validators.required],
            telephone: [this.data ? this.data.telephone : '', Validators.required],
            email: [this.data ? this.data.email : '', [Validators.required, Validators.email]],
            category: [this.data ? this.data.category : '', Validators.required],
            current_ranking: [this.data ? this.data.current_ranking : '', Validators.required],
            /* status: [this.data ? this.data.status : '', Validators.required], */
        });

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
        debugger;
        if (this.dataFormDinamicModal.valid) {
            /* if (this.data == null) { */
            if (this.data && Object.keys(this.data).length === 0) {
                this._sportsmanService
                    .create(this.dataFormDinamicModal.value)
                    .subscribe((resp) => {
                        this._notificationService.show(
                            'success',
                            'Transacción exitosa',
                            'Usuario creado correctamente'
                        );
                    });
            } else {
                this._sportsmanService
                    .update(this.data.id, this.dataFormDinamicModal.value)
                    .subscribe((resp) => {
                        this._notificationService.show(
                            'success',
                            'Transacción exitosa',
                            'Usuario actualziado correctamente'
                        );
                    });
            }

            this._dialogRef.close(this.dataFormDinamicModal.value);
        }
    }

    close() {
        this._dialogRef.close();
    }
}

