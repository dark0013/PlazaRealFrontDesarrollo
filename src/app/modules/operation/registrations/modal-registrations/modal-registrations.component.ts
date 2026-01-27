import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { NotificationService } from 'app/shared/components/notification/notification.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { TournamentService } from 'app/services/system/operation/tournament.service';
@Component({
    selector: 'app-modal-registrations',
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
    templateUrl: './modal-registrations.component.html',
    styleUrl: './modal-registrations.component.scss',
})
export class ModalRegistrationsComponent {
    dataFormDinamicModal: FormGroup;
    readonlyMode: boolean = false;
    isTeam: boolean = false;
    sportsmenCatalog: Array<{ id: number; full_name: string }> = [];

    constructor(
        private fb: FormBuilder,
        private _tournamentService: TournamentService,
        private _notificationService: NotificationService,
        private dialogRef: MatDialogRef<ModalRegistrationsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.isTeam = data.isTeam;
        this.sportsmenCatalog = data.sportsmen;

        this.dataFormDinamicModal = this.fb.group({
            teamName: ['', Validators.required],
            sportman: ['', Validators.required],
            partner: [''],
        });

        if (this.isTeam) {
            this.dataFormDinamicModal
                .get('partner')
                ?.setValidators(Validators.required);
            this.dataFormDinamicModal.get('partner')?.updateValueAndValidity();
        }
    }

    saveData(): void {
        if (this.dataFormDinamicModal.invalid) {
            this.dataFormDinamicModal.markAllAsTouched();
            return;
        }

        const sportman = this.dataFormDinamicModal.value.sportman;
        const partner = this.dataFormDinamicModal.value.partner;

        if (this.isTeam && sportman === partner) {
            this._notificationService.show(
                'warning',
                'Operación errónea',
                'Los deportistas no pueden ser el mismo'
            );
            return;
        }

        this._tournamentService
            .addParticipant(
                this.dataFormDinamicModal.value.teamName,
                this.data.idScenario,
                sportman,
                this.isTeam ? partner : undefined
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
                        'No se pudo crear el registro'
                    );
                },
            });
    }

    close(): void {
        this.dialogRef.close(false);
    }
}
