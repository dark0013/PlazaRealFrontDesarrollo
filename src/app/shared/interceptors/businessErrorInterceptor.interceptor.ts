import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../components/notification/notification.service';

export const businessErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const notification = inject(NotificationService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 400) {
                const backendMessage = error.error?.message;

                let finalMessage = 'Error en la solicitud';

                if (backendMessage && typeof backendMessage === 'object') {
                    finalMessage = Object.values(backendMessage)
                        .flat()
                        .map((m) => `• ${m}`)
                        .join('\n');
                }

                if (typeof backendMessage === 'string') {
                    finalMessage = backendMessage;
                }

                notification.show('error', 'Error de validación', finalMessage);
            }

            return throwError(() => error);
        })
    );
};
