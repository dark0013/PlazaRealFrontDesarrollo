import { NgClass, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface AlertData {
    title?: string;
    message?: string;
    icon?: {
        show: boolean;
        name: string;
        color: 'primary' | 'warn' | 'success';
    };
    actions?: {
        confirm?: {
            show: boolean;
            label: string;
            color: 'primary' | 'warn' | 'success';
        };
        cancel?: { show: boolean; label: string };
    };
    dismissible?: boolean;
}

@Component({
    selector: 'app-alert',
    imports: [NgIf, MatButtonModule, MatDialogModule, MatIconModule, NgClass],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.scss',
})
export class AlertComponent {
    dataConfig: AlertData;

    private defaultConfig: AlertData = {
        title: 'Solicitud de Confirmación',
        message: '¿Está seguro que desea continuar?',
        icon: {
            show: true,
            name: 'heroicons_outline:exclamation-triangle',
            color: 'warn',
        },
        actions: {
            confirm: { show: true, label: 'Confirmar', color: 'warn' },
            cancel: { show: true, label: 'Cancelar' },
        },
        dismissible: false,
    };
    constructor(@Inject(MAT_DIALOG_DATA) public data: AlertData) {
        this.dataConfig = { ...this.defaultConfig, ...data };
    }
}
