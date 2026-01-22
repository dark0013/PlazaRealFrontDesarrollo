import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, DatePipe } from '@angular/common';
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
import { CreateReservationPayload } from 'app/model/CreateReservationPayload.model';
import { ReservationService } from 'app/services/system/control/reservation.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';

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
    styleUrl: './modal-reservacion.component.scss',
    providers: [DatePipe],
})
export class ModalReservacionComponent implements OnInit {
    dataFormDinamicModal: UntypedFormGroup;
    readonlyMode: boolean = false;
    sportsmenCatalog: Array<{ id: number; full_name: string }> = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: UntypedFormBuilder,
        private _reservationService: ReservationService,
        private _notificationService: NotificationService,
        private datePipe: DatePipe
    ) {
        this.sportsmenCatalog = this.data.sportsmen;
        console.log(this.sportsmenCatalog);
        this.dataFormDinamicModal = this._formBuilder.group({
            sportman: [this.sportsmenCatalog[0]?.id, Validators.required],
            scenario_name_display: [this.data.nameScenario],
            date_reservation_display: [
                this.datePipe.transform(this.data.dateSelected, 'dd/MM/yyyy'),
            ],
            category: [this.data.register ? this.data.register.category : ''],
            reservation_date: [
                this.data.register
                    ? this.datePipe.transform(
                          this.data.dateSelected,
                          'yyyy/MM/dd'
                      )
                    : '',
            ],
            start_time: ['', Validators.required],
            end_time: [''],
            notes: [' '],
        });
    }
    ngOnInit(): void {}

    saveData() {
        console.log(this.dataFormDinamicModal);
        console.log(this.dataFormDinamicModal.value);
        if (!this.dataFormDinamicModal.valid) {
            this.dataFormDinamicModal.markAllAsTouched();
            return;
        }

        const formValue = this.dataFormDinamicModal.value;

        const payload: CreateReservationPayload = {
            scenario_id: this.data.idScenario,
            id_sportmen: formValue.sportman,
            reservation_date: this.formatDate(this.data.dateSelected),
            start_time: formValue.start_time,
            end_time: formValue.end_time || ' ',
            responsable_person: 'n/a',
        };

        this._reservationService.createReservation(payload).subscribe({
            next: () => {
                this._notificationService.show(
                    'success',
                    'Reserva creada',
                    'La reserva se registró correctamente'
                );
                this._dialogRef.close(true);
            },
            error: (err) => {
                console.error(err);
                this._notificationService.show(
                    'error',
                    'Error',
                    'No se pudo registrar la reserva'
                );
            },
        });
    }

    close() {
        this._dialogRef.close();
    }

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}
