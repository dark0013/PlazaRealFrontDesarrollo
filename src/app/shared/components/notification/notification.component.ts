import { Component, OnInit } from '@angular/core';
import { FuseAlertComponent } from '@fuse/components/alert';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';

@Component({
    selector: 'app-notification',
    imports: [FuseAlertComponent],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
    visible = false;
    type: 'success' | 'error' | 'warning' = 'success';
    title = '';
    message = '';
    private subscription?: Subscription;

    constructor(private notificationService: NotificationService) {}

    ngOnInit(): void {
        this.subscription = this.notificationService.notification$.subscribe(
            (data) => {
                this.type = data.type;
                this.title = data.title;
                this.message = data.message;
                this.visible = true;

                setTimeout(() => (this.visible = false), data.duration ?? 4000);
            }
        );
    }

    close(): void {
        this.visible = false;
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
