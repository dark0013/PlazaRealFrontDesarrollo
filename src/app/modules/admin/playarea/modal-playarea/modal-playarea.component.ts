import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
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
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { PlayAreaService } from 'app/services/system/admin/playarea.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';

@Component({
    selector: 'app-modal-user',
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
    templateUrl: './modal-playarea.component.html',
})
export class ModalPlayareaComponent {
    dataFormDinamicModal: UntypedFormGroup;
    readonlyMode: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: UntypedFormBuilder,
        private _playAreaService: PlayAreaService,
        private _notificationService: NotificationService
    ) {
        this.dataFormDinamicModal = this._formBuilder.group({
            name: [this.data ? this.data.name : '', Validators.required],
            description: [this.data ? this.data.description : ''],
            location: [this.data ? this.data.location : ''],
            surface_type: [this.data ? this.data.surface_type : ''],
            available_schedule: [
                this.data ? this.data.available_schedule : '0',
            ],
            ability: [this.data ? this.data.ability : ''],
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
        if (!this.dataFormDinamicModal.valid) return;

        const payload = this.normalizeEmptyFields(
            this.dataFormDinamicModal.value
        );

        console.log(payload);
        console.log("----");
        if (this.data == null) {
            this._playAreaService
                .create(payload)
                .subscribe({
                    next: (resp) => {
                        this._notificationService.show(
                            'success',
                            'Transacción exitosa',
                            'Registro creado correctamente'
                        );
                        this._dialogRef.close(payload);
                    },
                    error: (e) => {
                        console.log('error:', e);
                    },
                });
        } else {
            this._playAreaService
                .update(this.data.id, payload)
                .subscribe({
                    next: (resp) => {
                        this._notificationService.show(
                            'success',
                            'Transacción exitosa',
                            'Registro actualizado correctamente'
                        );
                        this._dialogRef.close(payload);
                    },
                    error: (e) => {
                        console.log('error:', e);
                    },
                });
        }
    }

    close() {
        this._dialogRef.close();
    }

    private normalizeEmptyFields(data: any): any {
        const normalized = { ...data };

        Object.keys(normalized).forEach((key) => {
            if (
                normalized[key] === null ||
                normalized[key] === undefined ||
                normalized[key] === ''
            ) {
                normalized[key] = 'N/A';
            }
        });

        return normalized;
    }
}
