import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { TournamentService } from 'app/services/system/operation/tournament.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';

@Component({
    selector: 'app-modal-registrations',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
    ],
    templateUrl: './modal-registrations.component.html',
    styleUrl: './modal-registrations.component.scss',
})
export class ModalRegistrationsComponent {
    form: FormGroup;
    isTeam: boolean = false;

    constructor(
        private fb: FormBuilder,
        private tournamentService: TournamentService,
        private _notificationService: NotificationService,
        private dialogRef: MatDialogRef<ModalRegistrationsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.isTeam = data.isTeam;

        this.form = this.fb.group({
            sportsman_id: [null, Validators.required],
            partner_id: [null],
        });

        if (this.isTeam) {
            this.form.get('partner_id')?.setValidators(Validators.required);
        }
    }

    save(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const { sportsman_id, partner_id } = this.form.value;

        // Validación: no mismo deportista
        if (this.isTeam && sportsman_id === partner_id) {
            this._notificationService.show(
                'error',
                'Operación errónea',
                'Los deportistas no pueden ser el mismo'
            );
            return;
        }

        this.tournamentService
            .addParticipant(
                this.data.idScenario,
                sportsman_id,
                this.isTeam ? partner_id : undefined
            )
            .subscribe({
                next: () => {
                    this._notificationService.show(
                        'success',
                        'Transacción exitosa',
                        'Registro creado correctamente'
                    );
                    this.dialogRef.close(true);
                },
                error: () => {
                    this._notificationService.show(
                        'error',
                        'Operación errónea',
                        'No se pudo registrar el deportista'
                    );
                },
            });
    }

    close(): void {
        this.dialogRef.close(false);
    }
}
