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
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
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
import { SportsmanService } from 'app/services/system/admin/sportsman.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';

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
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    templateUrl: './modal-sportsman.component.html',
    styleUrl: 'modal-sportsman.component.scss',
    providers: [
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'dd/MM/yyyy',
                },
                display: {
                    dateInput: 'dd/MM/yyyy',      // 👈 INPUT LIMPIO
                    monthYearLabel: 'MMM yyyy',   // 👈 HEADER OK
                    dateA11yLabel: 'dd/MM/yyyy',
                    monthYearA11yLabel: 'MMMM yyyy',
                },
            },

        },
    ],
})
export class ModalSportsmanComponent implements OnInit {
    dataFormDinamicModal: UntypedFormGroup;
    readonlyMode: boolean = false;
    categories: Catalog[] = [];
    today = new Date();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: UntypedFormBuilder,
        private _sportsmanService: SportsmanService,
        private _notificationService: NotificationService
    ) {
        this.categories = data.categories || [];

        this.dataFormDinamicModal = this._formBuilder.group({
            name: [
                this.data.register ? this.data.register.name : '',
                Validators.required,
            ],
            surname: [
                this.data.register ? this.data.register.surname : '',
                Validators.required,
            ],
            identification: [
                this.data.register ? this.data.register.identification : '',
                Validators.required,
            ],
            birthdate: [
                this.data.register ? this.data.register.birthdate : '',
                Validators.required,
            ],
            gender: [
                this.data.register ? this.data.register.gender : '',
                Validators.required,
            ],
            telephone: [
                this.data.register ? this.data.register.telephone : '',
                Validators.required,
            ],
            email: [
                this.data.register ? this.data.register.email : '',
                [Validators.required, Validators.email],
            ],

            category: [
                this.data.register?.category_id
                    ? Number(this.data.register.category_id)
                    : (this.categories?.[0]?.value_key ?? null),
                Validators.required,
            ],

            current_ranking: ['99'],
        });
    }
    ngOnInit(): void {
        this.initAction(this.data.register);
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
        if (this.dataFormDinamicModal.valid) {
            if (
                this.data.register &&
                Object.keys(this.data.register).length === 0
            ) {
                this._sportsmanService
                    .create(this.dataFormDinamicModal.value)
                    .subscribe((resp) => {
                        this._notificationService.show(
                            'success',
                            'Transacción exitosa',
                            'Registro creado correctamente'
                        );
                    });
            } else {
                this._sportsmanService
                    .update(
                        this.data.register.id,
                        this.dataFormDinamicModal.value
                    )
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
