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
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatchesService } from 'app/services/system/operation/matches.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-modal-results',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
    ],
    templateUrl: './modal-results.component.html',
    styleUrl: './modal-results.component.scss',
})
export class ModalResultsComponent {
    dataFormDinamicModal: UntypedFormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<ModalResultsComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _matchesService: MatchesService,
        private _notificationService: NotificationService
    ) {
        console.log('data received in modal:', data);
        this.dataFormDinamicModal = this._formBuilder.group({
            winner_id: [null, Validators.required],
            punto_player1: [null, [Validators.required, Validators.min(0)]],
            punto_player2: [null, [Validators.required, Validators.min(0)]],
        });
    }

    saveData(): void {
        if (!this.dataFormDinamicModal.valid) return;

        const { winner_id, punto_player1, punto_player2 } =
            this.dataFormDinamicModal.value;

        const loser_id =
            winner_id === this.data.player1_id
                ? this.data.player2_id
                : this.data.player1_id;

        const payload = {
            id_round: this.data.id, // match_id
            winner_id,
            loser_id,
            punto_player1,
            punto_player2,
        };

        this._matchesService
            .setMatchResult(
                this.data.tournament_id,
                this.data.id_round,
                payload
            )
            .pipe(
                switchMap(() =>
                    this._matchesService.nextRoundVersus(
                        this.data.tournament_id
                    )
                )
            )
            .subscribe({
                next: () => {
                    this._notificationService.show(
                        'success',
                        'Resultado registrado',
                        'El resultado fue guardado correctamente'
                    );
                    this._dialogRef.close(true);
                },
                error: (err) => {
                    console.error(err);
                    this._notificationService.show(
                        'error',
                        'Error',
                        'No se pudo completar la operación'
                    );
                },
            });
    }

    close(): void {
        this._dialogRef.close(false);
    }
}
