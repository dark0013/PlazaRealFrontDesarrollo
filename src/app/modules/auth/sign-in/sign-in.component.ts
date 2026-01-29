import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        RouterLink,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
    ],
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            email: [
                'alain0013@example.com',
                [Validators.required, Validators.email],
            ],
            password: ['Password123!', Validators.required],
            rememberMe: [''],
        });
        localStorage.clear();
    }

    signIn(): void {
        if (this.signInForm.invalid) {
            return;
        }

        this.signInForm.disable();

        this.showAlert = false;

        this._authService.signIn(this.signInForm.value).subscribe(
            (response) => {
                let redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/signed-in-redirect';

                if (response.user.is_temporal) {
                    this._router.navigate(['/reset-password'], {
                        state: {
                            email: this.signInForm.value.email,
                            password: this.signInForm.value.password,
                            userId: response.user.id,
                        },
                    });
                    return;
                }
                this._router.navigateByUrl(redirectURL);
            },
            (response) => {
                this.signInForm.enable();

                this.signInNgForm.resetForm();

                this.alert = {
                    type: 'error',
                    message: 'Correo electrónico o contraseña incorrectos',
                };

                this.showAlert = true;
            }
        );
    }
}
