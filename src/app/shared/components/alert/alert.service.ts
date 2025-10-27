import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertComponent, AlertData } from './alert.component';

@Injectable({ providedIn: 'root' })
export class AlertService {
    constructor(private dialog: MatDialog) {}

    confirm(data: Partial<AlertData>): Observable<'confirmed' | 'cancelled'> {
        const dialogRef = this.dialog.open(AlertComponent, {
            // width: '400px',
            autoFocus: false,
            data,
            panelClass: 'fuse-confirmation-dialog-panel',
        });

        return dialogRef.afterClosed();
    }

    confirmacionSimple(
        mensaje: string,
        color: 'warn' | 'primary' = 'warn'
    ): Observable<'confirmed' | 'cancelled'> {
        return this.confirm({
            title: 'Confirmación',
            message: mensaje,
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation-triangle',
                color,
            },
            actions: {
                confirm: { label: 'Confirmar', color, show: true },
                cancel: { label: 'Cancelar', show: true },
            },
        });
    }
}

/*

las dos formas de llamar al services: 
abrirDialogEstado(dato?: any, accion?: string) {

  const accionDes = accion === 'AC' ? 'Activar' : 'Inactivar';
  const colorAcc  = accion === 'AC' ? 'primary' : 'warn';

  this._alertService
    .confirmacionSimple(`¿Está seguro que desea ${accionDes} el registro?`, colorAcc)
    .subscribe(res => {
      if (res === 'confirmed') {
        this.guardarDatos(dato, accion);
      }
    });
}




    abrirDialogEstado(datoParamOpci?: any, accion?: string) {
        let accionDes = accion === 'AC' ? 'Activar' : 'Inactivar';
        let colorAcc: 'warn' | 'primary' = accion === 'AC' ? 'primary' : 'warn';

        this._alertService
            .confirm({
                title: 'Confirmación',
                message: `¿Está seguro que desea ${accionDes} el registro?`,
                icon: {
                    show: true,
                    name: 'heroicons_outline:exclamation-triangle',
                    color: colorAcc,
                },
                actions: {
                    confirm: {
                        label: 'Confirmar',
                        color: colorAcc,
                        show: true,
                    },
                    cancel: { label: 'Cancelar', show: true },
                },
            })
            .subscribe((result) => {
                if (result === 'confirmed') {
                    this.guardarDatos(datoParamOpci, accion);
                }
            });
    }
            
*/
