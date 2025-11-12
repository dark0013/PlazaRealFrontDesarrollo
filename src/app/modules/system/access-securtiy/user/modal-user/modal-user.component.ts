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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    ],
    templateUrl: './modal-user.component.html',
    styleUrl: './modal-user.component.scss',
})
export class ModalUserComponent implements OnInit {
    dataFormDinamicModal: UntypedFormGroup;
    readonlyMode: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<any>,
        private _formBuilder: UntypedFormBuilder,
        private _userService: UserService,
        private _notificationService: NotificationService
    ) {
        this.dataFormDinamicModal = this._formBuilder.group({
            name: [this.data ? this.data.name : '', Validators.required],
            description: [this.data ? this.data.description : ''],
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
        if (this.dataFormDinamicModal.valid) {
            if (this.data == null) {
                this._userService
                    .create(this.dataFormDinamicModal.value)
                    .subscribe((resp) => {
                        this._notificationService.show(
                            'success',
                            'Transacción exitosa',
                            'Usuario creado correctamente'
                        );
                    });
            } else {
                this._userService
                    .update(this.data.id, this.dataFormDinamicModal.value)
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
