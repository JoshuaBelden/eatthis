import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { NotificationService } from './notification.service';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { Recipe } from '../models/recipe';

@Injectable()
export class RecipeService {
  constructor(
    private http: HttpClient
  ) { }

  async getAsync(): Promise<Array<Recipe>> {
    const result = await this.http.get<Array<Recipe>>(`${environment.apiEndpoint}/recipe`).toPromise();
    return result;
  }
}
