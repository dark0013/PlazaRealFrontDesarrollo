import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Sportsman } from 'app/model/Sportsman';
import { BaseCrudService } from 'app/services/basecrud.service';

@Injectable({
  providedIn: 'root'
})
export class SportsmanService extends BaseCrudService<Sportsman> {
    constructor(http: HttpClient) {
        super(http, `${environment.baseUrl}/sportsman`);
    }
}