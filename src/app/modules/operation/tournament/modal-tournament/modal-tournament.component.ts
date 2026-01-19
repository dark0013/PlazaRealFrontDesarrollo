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
import { Category } from 'app/model/Category.model';
import { TournamentService } from 'app/services/system/operation/tournament.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';

@Component({
    selector: 'app-modal-tournament',
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
    templateUrl: './modal-tournament.component.html',
    styleUrl: './modal-tournament.component.scss',
})
export class ModalTournamentComponent {
    dataFormDinamicModal: UntypedFormGroup;
    readonlyMode = false;
    isNewRegister: boolean = false;
    categories: Category[] = [];

    tournamentTypes = ['TENIS', 'FUTBOL', 'BASKET', 'VOLEY'];
    modes = ['ELIMINATION', 'GROUPS', 'MIXED'];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<any>,
        private fb: UntypedFormBuilder,
        private tournamentService: TournamentService,
        private notificationService: NotificationService
    ) {
        this.categories = data.categories || [];
        this.dataFormDinamicModal = this.fb.group({
            name: [data.register?.name || '', Validators.required],
            start_date: [data.register?.start_date || '', Validators.required],
            end_date: [data.register?.end_date || '', Validators.required],
            tournament_type: [
                data.register?.tournament_type || '',
                Validators.required,
            ],
            //mode: [data.register?.mode || '', Validators.required],
            mode: [''],
            category_id: [
                this.data.register
                    ? this.data.register.category_id
                    : this.categories.length > 0
                      ? this.categories[0].id
                      : '',
                Validators.required,
            ],
            description: [data.register?.description || ''],
        });
    }

    ngOnInit(): void {
        this.initAction(this.data);
    }

    initAction(data?: any) {
        this.isNewRegister = false;

        if (data.register != null) {
            if (data.register.accion == 'information') {
                this.readonlyMode = true;
            } else {
                this.readonlyMode = false;
            }
        } else {
            this.isNewRegister = true;
        }
    }

    saveData() {
        if (this.dataFormDinamicModal.invalid) return;

        const payload = this.dataFormDinamicModal.value;
        if (!this.data.register?.id) {
            console.log('Creando torneo...');
            this.tournamentService.create(payload).subscribe({
                next: () => {
                    this.notificationService.show(
                        'success',
                        'Éxito',
                        'Torneo creado'
                    );
                    this.dialogRef.close(payload);
                },
                error: (e) => console.error(e),
            });
        } else {
            console.log('Actualizando torneo...');
            this.tournamentService
                .update(this.data.register.id, payload)
                .subscribe({
                    next: () => {
                        this.notificationService.show(
                            'success',
                            'Éxito',
                            'Torneo actualizado'
                        );
                        this.dialogRef.close(payload);
                    },
                    error: (e) => console.error(e),
                });
        }
    }

    close() {
        this.dialogRef.close();
    }
}
