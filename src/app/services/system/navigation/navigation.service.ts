import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation/public-api';
import { environment } from 'app/environments/environment';
import { BaseCrudService } from 'app/services/basecrud.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NavigationService extends BaseCrudService<FuseNavigationItem> {

  constructor(http: HttpClient) {
    super(http, `${environment.baseUrl}/navigation`);
  }

  getMenuByRol(rolId: number): Observable<FuseNavigationItem[]> {
    return this.http.get<FuseNavigationItem[]>(
      `${this.baseUrl}?rol_id=${rolId}`
    );
  }
}
