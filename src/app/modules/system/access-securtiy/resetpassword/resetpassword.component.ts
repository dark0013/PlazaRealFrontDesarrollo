import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/services/system/access-security/user.service';

import { UserSecurityService } from 'app/services/system/access-security/usersecurity.service';

@Component({
    selector: 'app-resetpassword',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './resetpassword.component.html',
    styleUrl: './resetpassword.component.scss',
})
export class ResetpasswordComponent implements OnInit {
    hidePassword = true;
    unlockForm!: FormGroup;
    users: any[] = [];

    constructor(
        private _fb: FormBuilder,
        private _userService: UserService,
        private _forgotPasswordService: UserSecurityService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.buildForm();
        this.loadUsers();
    }

    private buildForm(): void {
        this.unlockForm = this._fb.group({
            usuario_id: ['', Validators.required],
            email: [''],
            password: ['123456789'],
        });
    }

    private loadUsers(): void {
        this._userService.getAll().subscribe({
            next: (resp: any) => {
                this.users = resp.data;
            },
            error: () => {
                this._snackBar.open('Error al cargar usuarios', 'Cerrar', {
                    duration: 3000,
                });
            },
        });
    }

    onUserChange(userId: number): void {
        const user = this.users.find((u) => u.id === userId);
        if (user) {
            this.unlockForm.patchValue({
                email: user.email,
            });
        }
    }

    unlockUser(): void {
        if (this.unlockForm.invalid) {
            return;
        }

        const payload = {
            usuario_id: this.unlockForm.value.usuario_id,
            password: this.unlockForm.value.password,
            email: this.unlockForm.value.email,
        };

        this._forgotPasswordService
            .forgotPassword(payload.usuario_id, payload.password, payload.email)
            .subscribe({
                next: () => {
                    this._snackBar.open(
                        'Usuario desbloqueado correctamente',
                        'Cerrar',
                        { duration: 3000 }
                    );
                    this.unlockForm.reset();
                },
                error: () => {
                    this._snackBar.open(
                        'Error al desbloquear usuario',
                        'Cerrar',
                        {
                            duration: 3000,
                        }
                    );
                },
            });
    }
}
