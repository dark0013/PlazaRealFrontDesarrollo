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
import { UserService } from 'app/services/system/access-security/user.service';
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
    templateUrl: './modal-user.component.html',
})
export class ModalUserComponent implements OnInit {
    dataFormDinamicModal: UntypedFormGroup;
    readonlyMode: boolean = false;

    images = [
        { name: 'Ninguno', url: 'images/avatars/ninguno.png' },
        { name: 'Avatar m01', url: 'images/avatars/male-01.png' },
        { name: 'Avatar m02', url: 'images/avatars/male-02.png' },
        { name: 'Avatar m03', url: 'images/avatars/male-03.png' },
        { name: 'Avatar m04', url: 'images/avatars/male-04.png' },
        { name: 'Avatar f05', url: 'images/avatars/female-01.png' },
        { name: 'Avatar f06', url: 'images/avatars/female-02.png' },
        { name: 'Avatar f07', url: 'images/avatars/female-03.png' },
        { name: 'Avatar f08', url: 'images/avatars/female-04.png' },
    ];
    selectedImage: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: UntypedFormBuilder,
        private _userService: UserService,
        private _notificationService: NotificationService
    ) {
        this.dataFormDinamicModal = this._formBuilder.group({
            first_name: [
                this.data ? this.data.first_name : '',
                Validators.required,
            ],
            last_name: [
                this.data ? this.data.last_name : '',
                Validators.required,
            ],
            identification_number: [
                this.data ? this.data.identification_number : '',
                Validators.required,
            ],
            email: [this.data ? this.data.email : '', Validators.required],
            telephone: [
                this.data ? this.data.telephone : '',
                Validators.required,
            ],
            avatar: [
                this.data ? this.data.avatar : 'images/avatars/ninguno.png',
                Validators.required,
            ],
            role: [this.data ? this.data.role : '', Validators.required],
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
            this._userService
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
            this._userService
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
