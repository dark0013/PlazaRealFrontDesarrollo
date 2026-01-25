import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Catalog } from 'app/model/catalog.model';
import { TournamentService } from 'app/services/system/operation/tournament.service';
import { CatalogService } from 'app/services/system/shared/catalog.service';
import { NotificationService } from 'app/shared/components/notification/notification.service';
import { ModalRegistrationsComponent } from './modal-registrations/modal-registrations.component';

@Component({
    selector: 'app-registrations',
    imports: [
        MatSortModule,
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
        MatDatepickerModule,
        MatNativeDateModule,
        CommonModule,
    ],
    templateUrl: './registrations.component.html',
    styleUrl: './registrations.component.scss',
})
export class RegistrationsComponent {
    selectedTournament: number = 0;
    selectedTournamentText!: string;
    tournament: Catalog[] = [];
    sportsmenCatalog: Array<{ id: number; full_name: string }> = [];
    isTeam: boolean = false;

    tournamentDetail: any = null;
    participants: any[] = [];

    displayedColumns: string[] = [];
    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _dialog: MatDialog,
        private _notificationService: NotificationService,
        private _catalogService: CatalogService,
        private _tournamentService: TournamentService
    ) {}

    ngOnInit(): void {
        this.loadTournament();
        this.loadGetCatalogoSportman();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadTournament() {
        this._catalogService.getTournament().subscribe({
            next: (resp: any) => {
                this.tournament = resp.data;

                if (this.tournament.length > 0) {
                    this.selectedTournament = this.tournament[0].value_key;
                    this.selectedTournamentText =
                        this.tournament[0].option_value;
                    this.loadTournamentById(this.selectedTournament);
                }
            },
        });
    }

    loadGetCatalogoSportman() {
        this._catalogService.getSportsmen().subscribe({
            next: (resp: any) => {
                this.sportsmenCatalog = resp.data;
            },
            error: (err) => {
                console.error(err);
            },
        });
    }

    openDialogCrud(datoParamOpci?: any, accion?: string) {
        if (accion != 'new-register') {
            datoParamOpci.accion = accion;
        }

        let dialogRef: any = this._dialog.open(ModalRegistrationsComponent, {
            width: '50%',
            data: {
                register: datoParamOpci,
                idScenario: this.selectedTournament,
                nameScenario: this.selectedTournamentText,
                sportsmen: this.sportsmenCatalog,
                isTeam: this.isTeam,
            },
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.loadTournamentById(this.selectedTournament);
            }
        });
    }

    onTournamentChange(event: MatSelectChange) {
        this.selectedTournament = event.value;

        const option = event.source.selected as MatOption;
        this.selectedTournamentText = option.viewValue;

        this.loadTournamentById(this.selectedTournament);
    }

    loadTournamentById(tournamentId: number) {
        if (!tournamentId) {
            return;
        }

        this._tournamentService.getTournamentDetail(tournamentId).subscribe({
            next: (tournament) => {
                this.tournamentDetail = tournament;
                this.isTeam = tournament.isTeam === 1;

                this.participants = tournament.participants || [];
                this.configureTableByMode(tournament.isTeam);
            },
            error: () => {
                this._notificationService.show(
                    'error',
                    'Operación errónea',
                    'No se pudo cargar el torneo'
                );
            },
        });
    }

    configureTableByMode(isTeam: number) {
        this.displayedColumns =
            isTeam === 1
                ? ['player1', 'player2', 'team']
                : ['participant', 'team'];

        this.dataSource.data = this.participants;
    }
}
