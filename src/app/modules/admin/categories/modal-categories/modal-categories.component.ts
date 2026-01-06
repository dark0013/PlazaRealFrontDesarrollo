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
import { CategoriesService } from 'app/services/system/admin/categories.service';
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
    templateUrl: './modal-categories.component.html',
})
export class ModalCategoriesComponent {
    dataFormDinamicModal: UntypedFormGroup;
    readonlyMode: boolean = false;

   

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: UntypedFormBuilder,
        private _categoriesService: CategoriesService,
        private _notificationService: NotificationService
    ) {
        this.dataFormDinamicModal = this._formBuilder.group({
            name: [this.data ? this.data.name : '', Validators.required],
            description: [this.data ? this.data.description : ''],
            minimum_age: [this.data ? this.data.minimum_age : ''],
            maximum_age: [this.data ? this.data.maximum_age : ''],
            applicable_genre: [this.data ? this.data.applicable_genre : '']
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

        if (this.data == null) {
            this._categoriesService
                .create(this.dataFormDinamicModal.value)
                .subscribe({
                    next: (resp) => {
                        this._notificationService.show(
                            'success',
                            'Transacción exitosa',
                            'Registro creado correctamente'
                        );
                        this._dialogRef.close(this.dataFormDinamicModal.value);
                    },
                    error: (e) => {
                        console.log('error:', e);
                    },
                });
        } else {
            this._categoriesService
                .update(this.data.id, this.dataFormDinamicModal.value)
                .subscribe({
                    next: (resp) => {
                        this._notificationService.show(
                            'success',
                            'Transacción exitosa',
                            'Registro actualizado correctamente'
                        );
                        this._dialogRef.close(this.dataFormDinamicModal.value);
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
}
