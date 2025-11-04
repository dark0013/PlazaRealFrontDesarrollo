import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface NotificationData {
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
    duration?: number;
}

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private notificationSubject = new Subject<NotificationData>();
    notification$ = this.notificationSubject.asObservable();

    show(
        type: 'success' | 'error' | 'warning',
        title: string,
        message: string,
        duration: number = 4000
    ): void {
        this.notificationSubject.next({ type, title, message, duration });
    }
}
