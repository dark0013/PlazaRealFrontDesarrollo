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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { Catalog } from 'app/model/catalog.model';
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
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    templateUrl: './modal-tournament.component.html',
    styleUrl: './modal-tournament.component.scss',
})
export class ModalTournamentComponent {
    dataFormDinamicModal: UntypedFormGroup;
    readonlyMode = false;
    isNewRegister: boolean = false;
    categories: Catalog[] = [];
    sport: Catalog[] = [];
    minEndDate?: Date;

    modes = ['ELIMINATION', 'GROUPS', 'MIXED'];
    tournamentTypes = [
        { value: 0, label: 'INDIVIDUAL' },
        { value: 1, label: 'EN EQUIPOS' },
    ];

    teamAmountOptions = [
        { value: 2, label: '2 equipos (Final directa)' },
        { value: 4, label: '4 equipos (Semifinales)' },
        { value: 8, label: '8 equipos (Cuartos de final)' },
        { value: 16, label: '16 equipos (Tabla completa)' },
        { value: 32, label: '32 equipos (Torneo grande)' },
    ];

    tournamentStatusOptions = [
        { value: 'ACTIVADO', label: 'ACTIVO' },
        { value: 'FINALIZADO', label: 'FINALIZADO' },
        { value: 'CANCELADO', label: 'CANCELADO' },
    ];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<any>,
        private fb: UntypedFormBuilder,
        private tournamentService: TournamentService,
        private notificationService: NotificationService
    ) {
        this.categories = data.categories || [];
        this.sport = data.sport || [];

        this.dataFormDinamicModal = this.fb.group({
            name: [data.register?.name || '', Validators.required],
            start_date: [data.register?.start_date || '', Validators.required],
            end_date: [data.register?.end_date || '', Validators.required],
            tournament_type: [
                this.data.register
                    ? this.data.register.tournament_type
                    : this.sport.length > 0
                      ? this.sport[0].option_value
                      : 1,
                Validators.required,
            ],

            mode: ['NA'],
            category_id: [
                this.data.register
                    ? this.data.register.category_id
                    : this.categories.length > 0
                      ? this.categories[0].value_key
                      : '',
                Validators.required,
            ],
            description: [data.register?.description || ''],
            isTeam: [data.register?.isTeam || 0, Validators.required],
            partitioning_amount: [
                data.register?.partitioning_amount || 2,
                Validators.required,
            ],
            status: [data.register?.status || 'ACTIVO', Validators.required],
        });
    }

    ngOnInit(): void {
        this.initAction(this.data);

        this.dataFormDinamicModal
            .get('start_date')
            ?.valueChanges.subscribe((date: Date) => {
                this.minEndDate = date;
            });
    }

    initAction(data?: any) {
        this.isNewRegister = false;

        if (data.register != null) {
            if (data.register.accion == 'information') {
                this.readonlyMode = true;
                this.dataFormDinamicModal.disable();
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
