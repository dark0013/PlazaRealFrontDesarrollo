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
import { Role } from 'app/model/Role.model';
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
    isNewRegister: boolean = false;
    hidePassword = true;

    roles: Role[] = [];

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
        this.roles = data.roles;

        this.dataFormDinamicModal = this._formBuilder.group({
            first_name: [
                this.data.register ? this.data.register.first_name : '',
                Validators.required,
            ],
            primary_surname: [
                this.data.register ? this.data.register.primary_surname : '',
                Validators.required,
            ],
            secondary_surname: [
                this.data.register ? this.data.register.secondary_surname : '',
                Validators.required,
            ],
            identification_number: [
                this.data.register
                    ? this.data.register.identification_number
                    : '',
                Validators.required,
            ],
            email: [
                this.data.register ? this.data.register.email : '',
                Validators.required,
            ],
            telephone: [
                this.data.register ? this.data.register.telephone : '',
                Validators.required,
            ],
            avatar: [
                this.data.register
                    ? this.data.register.avatar
                    : 'images/avatars/ninguno.png',
                Validators.required,
            ],
            role: [
                this.data.register
                    ? this.data.register.role
                    : this.roles.length > 0
                      ? this.roles[0].id
                      : '',
                Validators.required,
            ],
            password: [''],
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
        if (!this.dataFormDinamicModal.valid) return;

        if (this.data.register == null) {
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
                .update(this.data.register.id, this.dataFormDinamicModal.value)
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
