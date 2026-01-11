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
import { ReservationService } from 'app/services/system/control/reservation.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-reservacion',
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
    templateUrl: './modal-reservacion.component.html',
    styleUrl: './modal-reservacion.component.scss'
})
export class ModalReservacionComponent implements OnInit {
    dataFormDinamicModal: UntypedFormGroup;
    readonlyMode: boolean = false;
    sportsmenCatalog: Array<{ id: number; full_name: string }> = [];
    scenariosCatalog: Array<{ value_key: number; option_value: string; }> = [];


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: UntypedFormBuilder,
        private _reservationService: ReservationService,
        private _notificationService: NotificationService
    ) {
        this.dataFormDinamicModal = this._formBuilder.group({
            sportman: [this.data ? this.data.sportman : '', Validators.required],
            category: [this.data ? this.data.category : '', Validators.required],
            reservation_date: [this.data ? this.data.reservation_date : '', Validators.required],
            start_time: [this.data ? this.data.start_time : '', Validators.required],
            end_time: [this.data ? this.data.end_time : '', Validators.required],
            notes: [this.data ? this.data.notes : '', Validators.required]
        });

    }
    ngOnInit(): void {
        this.initAction(this.data);
        this.loadGetCatalogoSportman();
        this.loadGetCatalogoScenario();
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
        if (!this.dataFormDinamicModal.valid) {
            this.dataFormDinamicModal.markAllAsTouched();
            return;
        }

        if (!this.data?.id) {
            // CREATE
            const payload = this.buildPayload();

            this._reservationService.create(payload).subscribe(() => {
                this._notificationService.show(
                    'success',
                    'Transacción exitosa',
                    'Registro creado correctamente'
                );
                this._dialogRef.close(payload);
            });

        } else {
            // RESCHEDULE (PATCH)
            const payload = this.buildReschedulePayload();

            this._reservationService.reschedule(this.data.id, payload).subscribe(() => {
                this._notificationService.show(
                    'success',
                    'Transacción exitosa',
                    'Horario reprogramado correctamente'
                );
                this._dialogRef.close(payload);
            });
        }
    }


    loadGetCatalogoSportman() {
        this._reservationService.getCatalogs('sportsmen').subscribe({
            next: (resp: any) => {
                this.sportsmenCatalog = resp.data;
            },
            error: (err) => {
                console.error(err);
            },
        });
    }

    loadGetCatalogoScenario() {
        this._reservationService.getCatalogs('scenarios').subscribe({
            next: (resp: any) => {
                this.scenariosCatalog = resp.data;
            },
            error: (err) => {
                console.error(err);
            },
        });
    }



    close() {
        this._dialogRef.close();
    }


    private buildPayload() {
        const formValue = this.dataFormDinamicModal.value;

        return {
            sportsman_id: Number(formValue.sportman),
            court_id: Number(formValue.category),
            reservation_date: formValue.reservation_date,
            start_time: formValue.start_time,
            end_time: formValue.end_time,
            notes: formValue.notes
        };
    }

    private buildReschedulePayload() {
        const formValue = this.dataFormDinamicModal.value;

        return {
            start_time: formValue.start_time?.substring(0, 5),
            end_time: formValue.end_time?.substring(0, 5)
        };
    }


}


