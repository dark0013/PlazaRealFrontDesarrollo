import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/environments/environment';
import { Category } from 'app/model/Category.model';
import { User } from 'app/model/user.model';
import { BaseCrudService } from 'app/services/basecrud.service';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService extends BaseCrudService<Category> {
    constructor(http: HttpClient) {
        super(http, `${environment.baseUrl}/categories`);
    }
}
