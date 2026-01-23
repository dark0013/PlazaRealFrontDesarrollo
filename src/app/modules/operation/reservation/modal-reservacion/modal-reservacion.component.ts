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
    timeOptions: string[] = [];
    endTimeOptions: string[] = [];
    reservationTypeOptions = [
        { value: 'SINGLE', label: 'Una sola hora' },
        { value: 'RANGE', label: 'Rango de horas' },
    ];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: UntypedFormBuilder,
        private _reservationService: ReservationService,
        private _notificationService: NotificationService,
        private datePipe: DatePipe
    ) {
        this.sportsmenCatalog = this.data.sportsmen;

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
            start_time: [null, Validators.required],
            end_time: [{ value: null, disabled: true }],
            notes: [' '],
            time_type: ['SINGLE'],
        });
    }
    ngOnInit(): void {
        this.generateTimeOptions();
        this.dataFormDinamicModal
            .get('time_type')
            ?.valueChanges.subscribe((type: string) => {
                this.handleTimeTypeChange(type);
            });

        this.dataFormDinamicModal
            .get('start_time')
            ?.valueChanges.subscribe((startTime: string) => {
                this.updateEndTimeOptions(startTime);
            });
    }

    saveData() {
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

    private generateTimeOptions(): void {
        for (let hour = 9; hour <= 19; hour++) {
            const formattedHour = hour.toString().padStart(2, '0');
            this.timeOptions.push(`${formattedHour}:00`);
        }
    }

    private updateEndTimeOptions(startTime: string): void {
        if (!startTime) {
            this.endTimeOptions = [];
            return;
        }

        const startHour = parseInt(startTime.split(':')[0], 10);

        this.endTimeOptions = [];

        for (let hour = startHour + 1; hour <= 19; hour++) {
            const formattedHour = hour.toString().padStart(2, '0');
            this.endTimeOptions.push(`${formattedHour}:00`);
        }

        this.dataFormDinamicModal.get('end_time')?.reset();
    }

    private handleTimeTypeChange(type: string): void {
        const endTimeControl = this.dataFormDinamicModal.get('end_time');

        if (type === 'SINGLE') {
            endTimeControl?.disable();
            endTimeControl?.reset();
        }

        if (type === 'RANGE') {
            endTimeControl?.enable();
        }
    }
}
