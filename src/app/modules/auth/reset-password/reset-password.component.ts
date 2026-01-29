import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'reset-password-classic',
    templateUrl: './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        RouterLink,
    ],
})
export class ResetPasswordClassicComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    resetPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;
    userId!: number;
    email!: string;
    oldPassword!: string;
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        const nav = history.state;

        this.userId = nav.userId;
        this.email = nav.email;
        this.oldPassword = nav.password;

        if (!this.userId || !this.oldPassword) {
            this._router.navigate(['/sign-in']);
        }

        this.resetPasswordForm = this._formBuilder.group(
            {
                password: ['', Validators.required],
                passwordConfirm: ['', Validators.required],
            },
            {
                validators: FuseValidators.mustMatch(
                    'password',
                    'passwordConfirm'
                ),
            }
        );
    }

    resetPassword(): void {
        if (this.resetPasswordForm.invalid) return;

        this._authService
            .changePassword(
                this.userId,
                this.email,
                this.oldPassword,
                this.resetPasswordForm.value.password
            )
            .subscribe({
                next: () => {
                    localStorage.clear();
                    this._router.navigate(['/sign-in']);
                },
                error: (err) => {
                    console.error(err);
                },
            });
    }
}
